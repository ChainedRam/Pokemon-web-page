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
const path_1 = require("path");
let pokeList = [];
let pageNumber = 1;
let parsedPokemenCount = 0;
(() => __awaiter(this, void 0, void 0, function* () {
    let nextUrl = "http://pokeapi.co/api/v2/pokemon";
    while (nextUrl) {
        let attempts = 5;
        let response;
        while (true) {
            try {
                response = yield node_fetch_1.default(nextUrl);
                break;
            }
            catch (e) {
                if (e instanceof node_fetch_1.FetchError && e.code === "ETIMEDOUT") {
                    if (attempts > 0)
                        console.log("Connection Time out, reattempting #" + attempts--);
                    else {
                        console.log("Out of attempts");
                        throw e;
                    }
                }
                else {
                    throw e;
                }
            }
        }
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
            let pAttempts = 5;
            let pRes;
            while (true) {
                try {
                    pRes = yield node_fetch_1.default(p.url);
                    break;
                }
                catch (e) {
                    if (e instanceof node_fetch_1.FetchError && e.code === "ETIMEDOUT") {
                        if (pAttempts > 0)
                            console.log("Connection Time out, reattempting #" + pAttempts--);
                        else {
                            console.log("Out of attempts");
                            throw e;
                        }
                    }
                    else {
                        throw e;
                    }
                }
            }
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
    let pokeDict = {};
    pokeList.forEach(p => {
        pokeDict[p.name] = p;
    });
    let dir = "./src/data";
    console.log("Writing to list to file...");
    let listFileName = "pokeList.json";
    let listFilePath = path_1.join(dir, listFileName);
    fs_1.writeFileSync(listFilePath, JSON.stringify(pokeList, null, 2));
    console.log("Wrote successfully to: " + listFilePath);
    console.log("Writing to dict to file...");
    let dictFileName = "pokeDict.json";
    let dictFilePath = path_1.join(dir, dictFileName);
    fs_1.writeFileSync(dictFilePath, JSON.stringify(pokeDict, null, 2));
    console.log("Wrote successfully to: " + dictFilePath);
    return null;
}))().catch(e => {
    console.log(e);
});
//# sourceMappingURL=gatherPokemons.js.map