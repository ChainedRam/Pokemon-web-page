import { exportJson } from "./ApiCrawler";
import fetch from "node-fetch";
import { join } from "path";

interface Pokemon {
  name: string;
  types: string[];
  moves: string[];
  abilities: string[];
}

let pokeList: Pokemon[] = [];

(async () => {
  let url = "https://pokeapi.co/api/v2/pokemon/";
  let response = await fetch(url);
  let json = await response.json();
  let results = json.results as any[];

  for (let i = 0; i < results.length; i++) {
    let pokemon = {
      name: results[i].name,
      types: [],
      moves: [],
      abilities: []
    };
    pokeList.push(pokemon);
    let url = results[i].url;
    let response = await fetch(url);
    let json = await response.json();
    let types = json.types as any[];
    let abilities = json.abilities as any[];
    let moves = json.moves as any[];

    for (let movesLoop = 0; movesLoop < moves.length; movesLoop++) {
      let move = json.moves[movesLoop].move.name;
      pokemon.moves.push(move);
    }

    for (let abilityLoop = 0; abilityLoop < abilities.length; abilityLoop++) {
      let ability = json.abilities[abilityLoop].ability.name;
      pokemon.abilities.push(ability);
    }
    for (let typeLoop = 0; typeLoop < types.length; typeLoop++) {
      let type = json.types[typeLoop].type.name;
      pokemon.types.push(type);
    }
    let outDir = "./src/data";

    exportJson(join(outDir, "pokemons.json"), pokeList);
  }
})().catch(e => {
  console.log(e);
});
