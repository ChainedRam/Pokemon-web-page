import fetch from "node-fetch";
import { writeFileSync } from "fs";

interface Pokemon {
  name: string;
  types: string[];
  learnableMoves: string[];
}

let pokeList: Pokemon[] = [];
let pageNumber = 1;
let parsedPokemenCount = 0;

(async () => {
  let nextUrl = "http://pokeapi.co/api/v2/pokemon";

  while (nextUrl) {
    let response = await fetch(nextUrl);
    let json = await response.json();
    let data = json.results as any[];
    let count = json.count as number;

    console.log(`got ${data.length} pokemens`);

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

        console.log(
          `finished %${(100 * (++parsedPokemenCount / count)).toFixed(2)}`
        );

        return pokemon;
      })
    );

    pokeList.push(...results);

    console.log("done parsing page #" + pageNumber++);
    nextUrl = json.next;
  }
  console.log("parsing pokemen finished");

  console.log("Writing to file");
  writeFileSync("./data/pokeList.json", JSON.stringify(pokeList, null, 2));

  console.log("Wrote successfully to: ./data/pokeList.json");

  return null;
})().catch(e => {
  console.log(e);
});
