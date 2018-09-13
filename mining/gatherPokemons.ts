import fetch from "node-fetch";
//import * as Promise from "bluebird";

interface Pokemon {
  name: string;
  types: string[];
  learnableMoves: string[];
}

let pokeList: Pokemon[];

(async () => {
  let nextUrl = "http://pokeapi.co/api/v2/pokemon";

  while (nextUrl) {
    let response = await fetch(nextUrl);
    let json = await response.json();
    let data = json.results as any[];

    let results = await Promise.all(
      data.map(async p => {
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
      })
    );

    pokeList.push(...results);

    nextUrl = json.next;
  }

  console.log(pokeList);

  return null;
})();
