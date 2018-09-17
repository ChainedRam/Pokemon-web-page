import fetch, { FetchError } from "node-fetch";
import { writeFileSync } from "fs";
import { join } from "path";
import { startCrawlingAsync, exportJson } from "./ApiCrawler";

interface Pokemon {
  name: string;
  types: string[];
  learnableMoves: string[];
}

let pokeList: Pokemon[] = [];

(async () => {
  let nextUrl = "http://pokeapi.co/api/v2/pokemon";
  let maxCount = null;

  while (nextUrl) {
    let r = await startCrawlingAsync<any>(nextUrl, json => json);
    maxCount = r.count;

    let pokemen = await Promise.all(
      (r.results as any[]).map(
        async p =>
          ({
            name: p.name,
            types: await startCrawlingAsync(p.url, json =>
              json.types.map(t => t.type.name as string)
            ),
            learnableMoves: []
          } as Pokemon)
      )
    );
    pokeList.push(...pokemen);

    console.log("%" + ((100 * pokeList.length) / maxCount).toFixed(2));
    nextUrl = r.next;
  }

  console.log("parsing pokemen finished");

  let pokeDict: { [pokemonName: string]: Pokemon } = {};

  pokeList.forEach(p => {
    pokeDict[p.name] = p;
  });

  let dir = "./src/data";

  exportJson(join(dir, "pokeList.json"), pokeList);
  exportJson(join(dir, "pokeDict.json"), pokeDict);

  return null;
})().catch(e => {
  console.log(e);
});
