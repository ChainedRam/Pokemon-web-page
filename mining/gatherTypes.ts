import fetch from "node-fetch";
import { writeFileSync } from "fs";

let illegalTypeNames = ["unknown", "shadow"];

interface Type {
  name: string;
  weakness: string[];
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

      let type: Type = { name: t.name, weakness: [] };

      let tApi = await fetch(t.url);
      let tJson = await tApi.json();
      let tData = tJson.damage_relations.double_damage_from as any[];
      type.weakness = tData.map(w => w.name);

      return type;
    })
  );

  console.log(results);
  console.log("parsing pokemen finished");

  console.log("Writing to file");
  writeFileSync("./data/typeList.json", JSON.stringify(results, null, 2));

  console.log("Wrote successfully to: ./data/typeList.json");

  return null;
})().catch(e => console.log(e));
