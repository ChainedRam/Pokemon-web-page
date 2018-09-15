import fetch from "node-fetch";
import { writeFileSync } from "fs";

let illegalTypeNames = ["unknown", "shadow"];

interface Type {
  name: string;
  noDamageTo: string[];
  halfDamageTo: string[];
  doubleDamageTo: string[];

  noDamageFrom: string[];
  halfDamageFrom: string[];
  doubleDamageFrom: string[];
}

let types: Type[] = [];

(async () => {
  let api = await fetch("http://pokeapi.co/api/v2/type");
  let json = await api.json();
  let data = json.results as any[];

  let results = await Promise.all(
    data.map(async t => {
      if (illegalTypeNames.indexOf(t.name) > -1) {
        return;
      }

      let type: Type = {
        name: t.name,
        noDamageTo: [],
        halfDamageTo: [],
        doubleDamageTo: [],
        noDamageFrom: [],
        halfDamageFrom: [],
        doubleDamageFrom: []
      };

      let tApi = await fetch(t.url);
      let tJson = await tApi.json();
      let tData = tJson.damage_relations as any;

      type.noDamageTo = tData.no_damage_to.map(w => w.name);
      type.halfDamageTo = tData.half_damage_to.map(w => w.name);
      type.doubleDamageTo = tData.double_damage_to.map(w => w.name);
      type.noDamageFrom = tData.no_damage_from.map(w => w.name);
      type.halfDamageFrom = tData.half_damage_from.map(w => w.name);
      type.doubleDamageFrom = tData.double_damage_from.map(w => w.name);

      return type;
    })
  );

  results = results.filter(r => r != null);

  let typeDict: { [typeName: string]: Type } = {};

  results.forEach(t => {
    typeDict[t.name] = t;
  });

  console.log("parsing pokemen finished");

  console.log("Writing to file");
  writeFileSync("./data/typeList.json", JSON.stringify(results, null, 2));
  writeFileSync("./data/typeDict.json", JSON.stringify(typeDict, null, 2));

  console.log("Wrote successfully to: ./data/typeList.json");

  return null;
})().catch(e => console.log(e));
