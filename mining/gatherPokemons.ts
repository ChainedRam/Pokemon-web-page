import { join } from "path";
import { startCrawlingAsync, exportJson } from "./ApiCrawler";

interface Pokemon {
  name: string;
  types: string[];
  moves: string[];
}

let pokeList: Pokemon[] = [];

(async () => {
  let nextUrl = "http://pokeapi.co/api/v2/pokemon";
  let maxCount = null;

  while (nextUrl) {
    let response = await startCrawlingAsync<any>(nextUrl, json => json);
    maxCount = response.count;

    let pokemen = await Promise.all(
      (response.results as any[]).map(
        async p =>
          ({
            name: p.name,
            types: await startCrawlingAsync(p.url, json =>
              json.types.map(t => t.type.name as string)
            ),
            moves: []
          } as Pokemon)
      )
    );
    pokeList.push(...pokemen);

    console.log("%" + ((100 * pokeList.length) / maxCount).toFixed(2));
    nextUrl = response.next;
  }

  console.log("parsing pokemen finished");

  let pokeDict: { [pokemonName: string]: Pokemon } = {};

  pokeList.forEach(p => {
    pokeDict[p.name] = p;
  });

  let outDir = "./src/data";

  exportJson(join(outDir, "pokeList.json"), pokeList);
  exportJson(join(outDir, "pokeDict.json"), pokeDict);

  return null;
})().catch(e => {
  console.log(e);
});
