import fetch, { FetchError } from "node-fetch";
import { writeFileSync } from "fs";
import { join } from "path";

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
    let attempts = 5;
    let response: any;

    while (true) {
      try {
        response = await fetch(nextUrl);
        break;
      } catch (e) {
        if (e instanceof FetchError && (e as any).code === "ETIMEDOUT") {
          if (attempts > 0)
            console.log("Connection Time out, reattempting #" + attempts--);
          else {
            console.log("Out of attempts");
            throw e;
          }
        } else {
          throw e;
        }
      }
    }

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

        let pAttempts = 5;
        let pRes: any;

        while (true) {
          try {
            pRes = await fetch(p.url);
            break;
          } catch (e) {
            if (e instanceof FetchError && (e as any).code === "ETIMEDOUT") {
              if (pAttempts > 0)
                console.log(
                  "Connection Time out, reattempting #" + pAttempts--
                );
              else {
                console.log("Out of attempts");
                throw e;
              }
            } else {
              throw e;
            }
          }
        }
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

  let pokeDict: { [pokemonName: string]: Pokemon } = {};

  pokeList.forEach(p => {
    pokeDict[p.name] = p;
  });

  let outputDirectory = "./data";
  console.log("Writing to list to file...");
  let listFileName = "pokeList.json";
  let listFilePath = join(outputDirectory, listFileName);
  writeFileSync(listFilePath, JSON.stringify(pokeList, null, 2));
  console.log("Wrote successfully to: " + listFilePath);

  console.log("Writing to dict to file...");
  let dictFileName = "pokeDict.json";
  let dictFilePath = join(outputDirectory, dictFileName);
  writeFileSync(dictFilePath, JSON.stringify(pokeDict, null, 2));
  console.log("Wrote successfully to: " + dictFilePath);

  return null;
})().catch(e => {
  console.log(e);
});
