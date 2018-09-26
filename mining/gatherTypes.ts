import { exportJson, getRequest } from "./ApiCrawler";

export interface Type {
  name: string;
  color: string;

  noDamageTo?: string[];
  halfDamageTo?: string[];
  doubleDamageTo?: string[];

  noDamageFrom?: string[];
  halfDamageFrom?: string[];
  doubleDamageFrom?: string[];
}

let illegalTypeNames = ["unknown", "shadow"];

let typeColors: { [key: string]: string } = {
  normal: "A8A77A",
  fire: "EE8130",
  water: "6390F0",
  electric: "F7D02C",
  grass: "7AC74C",
  ice: "96D9D6",
  fighting: "C22E28",
  poison: "A33EA1",
  ground: "E2BF65",
  flying: "A98FF3",
  psychic: "F95587",
  bug: "A6B91A",
  rock: "B6A136",
  ghost: "735797",
  dragon: "6F35FC",
  dark: "705746",
  steel: "B7B7CE",
  fairy: "D685AD"
};

(async () => {
  let typeList = await getRequest<Type[]>(
    "http://pokeapi.co/api/v2/type",
    async json => {
      let data = json.results as any[];
      let results = await Promise.all(
        data.map(async rawType => {
          if (illegalTypeNames.indexOf(rawType.name) > -1) {
            return;
          }

          let type: Type = {
            name: rawType.name,
            color: typeColors[rawType.name]
          };

          return await getRequest<Type>(rawType.url, async json => {
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

  typeList = typeList.filter(t => t != null);

  let typeDict: { [typeName: string]: Type } = {};

  typeList.forEach(t => {
    typeDict[t.name] = t;
  });

  console.log("parsing pokemen finished");
  exportJson("./src/data/typeList.json", typeList);
  exportJson("./src/data/typeDict.json", typeDict);

  return null;
})().catch(e => console.log(e));
