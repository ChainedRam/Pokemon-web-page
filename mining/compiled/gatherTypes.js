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
let illegalTypeNames = ["unknown", "shadow"];
let types = [];
(() => __awaiter(this, void 0, void 0, function* () {
    let api = yield node_fetch_1.default("http://pokeapi.co/api/v2/type");
    let json = yield api.json();
    let data = json.results;
    let results = yield Promise.all(data.map((t) => __awaiter(this, void 0, void 0, function* () {
        if (illegalTypeNames.indexOf(t.name) > -1) {
            return;
        }
        let type = { name: t.name, weakness: [] };
        let tApi = yield node_fetch_1.default(t.url);
        let tJson = yield tApi.json();
        let tData = tJson.damage_relations.double_damage_from;
        type.weakness = tData.map(w => w.name);
        return type;
    })));
    console.log(results);
    console.log("parsing pokemen finished");
    console.log("Writing to file");
    fs_1.writeFileSync("./data/typeList.json", JSON.stringify(results, null, 2));
    console.log("Wrote successfully to: ./data/typeList.json");
    return null;
}))().catch(e => console.log(e));
//# sourceMappingURL=gatherTypes.js.map