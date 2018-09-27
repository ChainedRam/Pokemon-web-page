import { exportJson } from "./ApiCrawler";
import fetch from "node-fetch";
import { join } from "path";

interface Move {
  name: string;
  type: string;
  damageClass: string;
  PP: number;
}

let moveList: Move[] = [];

(async () => {
  let url = "https://pokeapi.co/api/v2/move/";
  let response = await fetch(url);
  let json = await response.json();
  let results = json.results as any[];

  for (let i = 0; i < results.length; i++) {
    let url = results[i].url;
    let response = await fetch(url);
    let json = await response.json();
    let type = json.type as any;
    let damage_class = json.damage_class as any;
    let pp = json.pp as any;
    let moves: Move = {
      name: results[i].name,
      type: type.name,
      damageClass: damage_class.name,
      PP: pp
    };
    moveList.push(moves);
  }
  console.log(moveList);

  let outDir = "./src/data";

  exportJson(join(outDir, "moveList.json"), moveList);
})().catch(e => {
  console.log(e);
});
