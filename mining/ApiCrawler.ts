import fetch from "node-fetch";
import { writeFileSync } from "fs";

export async function startCrawlingAsync<T>(
  initUrl: string,
  extractJson: (json) => Promise<T>
): Promise<T> {
  let response;
  let attempts = 5;
  while (true) {
    try {
      response = await fetch(initUrl);
      break;
    } catch (e) {
      if ((e as any).code === "ETIMEDOUT") {
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
  let data = await extractJson(json);

  return data;
}

export function exportJson(dest: string, json: any, silance: boolean = false) {
  !silance && console.log(`Writing to ${dest}...`);
  writeFileSync(dest, JSON.stringify(json, null, 2));
  !silance && console.log(`Wrote successfully to ${dest}`);
}
