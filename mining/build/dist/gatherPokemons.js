var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fetch from "node-fetch";
let pokeList = [];
(() => __awaiter(this, void 0, void 0, function* () {
    let response = yield fetch(`http://pokeapi.co/api/v2/pokemon`);
    let json = yield response.json();
    let data = json.results;
    let results = yield data.map((p) => __awaiter(this, void 0, void 0, function* () {
        let pokemon = {
            name: p.name,
            types: [],
            learnableMoves: []
        };
        let pRes = yield fetch(p.url);
        let pJson = yield pRes.json();
        let pData = pJson.types;
        //console.log(pData);
        pokemon.types = pData.map(t => t.type.name);
        return pokemon;
    }));
    let pokemen = yield Promise.all(results);
    pokeList = pokemen;
    //console.log(data);
    console.log(pokeList);
    return null;
}))();
//# sourceMappingURL=gatherPokemons.js.map