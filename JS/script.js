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
let reportAcudits = [];
const generarChiste = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetch("http://icanhazdadjoke.com", {
        headers: {
            "Accept": "application/json"
        },
    });
    const joke = yield data.json();
    //Comprobamos errores 
    //Funciona
    if (joke.status === 200) {
        document.getElementById("texto-chiste").innerHTML = joke.joke;
    }
    //No funciona
    else {
        console.log("No se ha podido cargar el chiste");
    }
});
/* Hovers de las estrellas */
let check = false;
const hoverStars = (numStars, color) => {
    if (!check)
        switch (numStars) {
            case 1:
                document.getElementById("one-star").style.color = color;
                break;
            case 2:
                document.getElementById("one-star").style.color = color;
                document.getElementById("two-star").style.color = color;
                break;
            case 3:
                document.getElementById("one-star").style.color = color;
                document.getElementById("two-star").style.color = color;
                document.getElementById("three-star").style.color = color;
                break;
            default:
                break;
        }
};
const rateJoke = (numStars) => {
    check = true;
    switch (numStars) {
        case 1:
            document.getElementById("one-star").style.color = "yellow";
            document.getElementById("two-star").style.color = "gray";
            document.getElementById("three-star").style.color = "gray";
            break;
        case 2:
            document.getElementById("one-star").style.color = "yellow";
            document.getElementById("two-star").style.color = "yellow";
            document.getElementById("three-star").style.color = "gray";
            break;
        case 3:
            document.getElementById("one-star").style.color = "yellow";
            document.getElementById("two-star").style.color = "yellow";
            document.getElementById("three-star").style.color = "yellow";
            break;
        default:
            break;
    }
};
