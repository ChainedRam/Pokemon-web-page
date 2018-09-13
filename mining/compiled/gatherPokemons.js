"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
const fs_1 = require("fs");
let pokeList = [];
let pageNumber = 1;
let parsedPokemenCount = 0;
(() => __awaiter(this, void 0, void 0, function* () {
    let nextUrl = "http://pokeapi.co/api/v2/pokemon";
    while (nextUrl) {
        let response = yield node_fetch_1.default(nextUrl);
        let json = yield response.json();
        let data = json.results;
        let count = json.count;
        console.log(`got ${data.length} pokemens`);
        let results = yield Promise.all(data.map((p) => __awaiter(this, void 0, void 0, function* () {
            let pokemon = {
                name: p.name,
                types: [],
                learnableMoves: []
            };
            let pRes = yield node_fetch_1.default(p.url);
            let pJson = yield pRes.json();
            let pData = pJson.types;
            pokemon.types = pData.map(t => t.type.name);
            console.log(`finished %${(100 * (++parsedPokemenCount / count)).toFixed(2)}`);
            return pokemon;
        })));
        pokeList.push(...results);
        console.log("done parsing page #" + pageNumber++);
        nextUrl = json.next;
    }
    console.log("parsing pokemen finished");
    console.log("Writing to file");
    fs_1.writeFileSync("./data/pokeList.json", JSON.stringify(pokeList, null, 2));
    console.log("Wrote successfully to: ./data/pokeList.json");
    return null;
}))().catch(e => {
    console.log(e);
});
//# sourceMappingURL=gatherPokemons.js.map