"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function ping() {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch("http://127.0.0.1:8000", { method: "GET" });
        let data = (yield response.json());
        console.debug("--- GET: http://127.0.0.1:8000 ---");
        console.debug(data);
        if (data.status_code != 200) {
            document.getElementById("bc-conn").style.visibility = "visible";
            console.debug("Ballchasing API error: " + (data === null || data === void 0 ? void 0 : data.error));
        }
    });
}
