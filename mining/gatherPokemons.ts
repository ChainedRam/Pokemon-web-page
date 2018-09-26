// import { join } from "path";
import { getRequest, exportJson } from "./ApiCrawler";
import fetch from "node-fetch";
import { join } from "path";

interface Pokemon {
  name: string;
  types: string[];
  moves: string[];
}

let pokeList: Pokemon[] = [];

(async () => {
  let url = "https://pokeapi.co/api/v2/pokemon/";
  let response = await fetch(url);
  let json = await response.json();
  let results = json.results as any[];

  for (let i = 0; i < results.length; i++) {
    let pokemon = { name: results[i].name, types: [], moves: [] };
    pokeList.push(pokemon);
    let url = results[i].url;
    let response = await fetch(url);
    let json = await response.json();
    let types = json.types as any[];

    for (let j = 0; j < types.length; j++) {
      let type = json.types[j].type.name;
      pokemon.types.push(type);
    }
    let outDir = "./src/data";

    let pokeDict: { [pokemonName: string]: Pokemon } = {};

    pokeList.forEach(p => {
      pokeDict[p.name] = p;
    });

    exportJson(join(outDir, "pokeDict.json"), pokeDict);
  }
})().catch(e => {
  console.log(e);
});
