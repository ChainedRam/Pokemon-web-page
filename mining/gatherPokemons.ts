import fetch from "node-fetch";
//import * as Promise from "bluebird";

interface Pokemon {
  name: string;
  types: string[];
  learnableMoves: string[];
}

let pokeList: Promise<Pokemon[]>;

let x = (async () => {
  let response = await fetch(`http://pokeapi.co/api/v2/pokemon`);
  let json = await response.json();
  let data = json.results as any[];

  let results = await data.map(async p => {
    let pokemon: Pokemon = {
      name: p.name,
      types: [],
      learnableMoves: []
    };

    let pRes = await fetch(p.url);
    let pJson = await pRes.json();
    let pData = pJson.types as any[];

    pokemon.types = pData.map(t => t.type.name);

    return pokemon;
  });

  return results;
})();

//.then(async () => console.log(await pokeList));
