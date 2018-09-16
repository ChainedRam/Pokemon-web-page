import fetch from "node-fetch";
import { writeFileSync } from "fs";
import * as K from "./ApiCrawler";
import { exportJson } from "./ApiCrawler";

let illegalTypeNames = ["unknown", "shadow"];

interface Type {
  name: string;
  noDamageTo?: string[];
  halfDamageTo?: string[];
  doubleDamageTo?: string[];

  noDamageFrom?: string[];
  halfDamageFrom?: string[];
  doubleDamageFrom?: string[];
}

(async () => {
  let typeList = await K.startCrawlingAsync<Type[]>(
    "http://pokeapi.co/api/v2/type",
    async json => {
      let data = json.results as any[];
      let results = await Promise.all(
        data.map(async t => {
          if (illegalTypeNames.indexOf(t.name) > -1) {
            return;
          }

          let type: Type = {
            name: t.name
          };

          return await K.startCrawlingAsync<Type>(t.url, async json => {
            let dmgRel = json.damage_relations;
            type.noDamageTo = dmgRel.no_damage_to.map(w => w.name);
            type.halfDamageTo = dmgRel.half_damage_to.map(w => w.name);
            type.doubleDamageTo = dmgRel.double_damage_to.map(w => w.name);
            type.noDamageFrom = dmgRel.no_damage_from.map(w => w.name);
            type.halfDamageFrom = dmgRel.half_damage_from.map(w => w.name);
            type.doubleDamageFrom = dmgRel.double_damage_from.map(w => w.name);
            return type;
          });
        })
      );
      return results;
    }
  );

  typeList = typeList.filter(r => r != null);

  let typeDict: { [typeName: string]: Type } = {};

  typeList.forEach(t => {
    typeDict[t.name] = t;
  });

  console.log("parsing pokemen finished");

  exportJson("./src/data/typeList.json", typeList);
  exportJson("./src/data/typeDict.json", typeDict);

  return null;
})().catch(e => console.log(e));
