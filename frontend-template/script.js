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
    fetch("http://127.0.0.1:8000", {
        method: "GET"
    })
        .then((response) => __awaiter(this, void 0, void 0, function* () {
        if (!response.ok) {
            const data = yield response.json();
            console.log(data.message);
            throw new Error(data.error);
        }
        return response.json();
    }))
        .then(data => {
        console.debug("--- GET: http://127.0.0.1:8000 ---");
        console.log(data.message);
    })
        .catch(error => {
        document.getElementById("bc-conn").style.visibility = "visible";
        console.debug(error);
    });
}
