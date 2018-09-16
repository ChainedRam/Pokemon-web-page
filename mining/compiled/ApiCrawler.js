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
function startCrawlingAsync(initUrl, extractJson) {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        let attempts = 5;
        while (true) {
            try {
                response = yield node_fetch_1.default(initUrl);
                break;
            }
            catch (e) {
                if (e.code === "ETIMEDOUT") {
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
        let data = yield extractJson(json);
        return data;
    });
}
exports.startCrawlingAsync = startCrawlingAsync;
function exportJson(dest, json, silance = false) {
    !silance && console.log(`Writing to ${dest}...`);
    fs_1.writeFileSync(dest, JSON.stringify(json, null, 2));
    !silance && console.log(`Wrote successfully to ${dest}`);
}
exports.exportJson = exportJson;
//# sourceMappingURL=ApiCrawler.js.map