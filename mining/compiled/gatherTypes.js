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
const fs_1 = require("fs");
const K = require("./ApiCrawler");
const ApiCrawler_1 = require("./ApiCrawler");
let illegalTypeNames = ["unknown", "shadow"];
(() => __awaiter(this, void 0, void 0, function* () {
    console.log(JSON.parse(fs_1.readFileSync("./src/data/pokeDict.json").toString()));
    let x = 0;
    if (x == 0)
        return;
    let typeList = yield K.startCrawlingAsync("http://pokeapi.co/api/v2/type", (json) => __awaiter(this, void 0, void 0, function* () {
        let data = json.results;
        let results = yield Promise.all(data.map((t) => __awaiter(this, void 0, void 0, function* () {
            if (illegalTypeNames.indexOf(t.name) > -1) {
                return;
            }
            let type = {
                name: t.name
            };
            return yield K.startCrawlingAsync(t.url, (json) => __awaiter(this, void 0, void 0, function* () {
                let dmgRel = json.damage_relations;
                type.noDamageTo = dmgRel.no_damage_to.map(w => w.name);
                type.halfDamageTo = dmgRel.half_damage_to.map(w => w.name);
                type.doubleDamageTo = dmgRel.double_damage_to.map(w => w.name);
                type.noDamageFrom = dmgRel.no_damage_from.map(w => w.name);
                type.halfDamageFrom = dmgRel.half_damage_from.map(w => w.name);
                type.doubleDamageFrom = dmgRel.double_damage_from.map(w => w.name);
                return type;
            }));
        })));
        return results;
    }));
    typeList = typeList.filter(r => r != null);
    let typeDict = {};
    typeList.forEach(t => {
        typeDict[t.name] = t;
    });
    console.log("parsing pokemen finished");
    ApiCrawler_1.exportJson("./src/data/typeList.json", typeList);
    ApiCrawler_1.exportJson("./src/data/typeDict.json", typeDict);
    return null;
}))().catch(e => console.log(e));
//# sourceMappingURL=gatherTypes.js.map