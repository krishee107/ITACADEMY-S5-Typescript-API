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
let check = false;
/* GENERAR UN NUEVO CHISTE */
const generarChiste = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    //Ocultar las estrellas
    document.getElementById("stars-box").style.display = "none";
    //Reiniciarlas a 0 votos
    rateJoke(0);
    check = false;
    //Mostrar loading
    (_a = document.getElementById("loading")) === null || _a === void 0 ? void 0 : _a.classList.remove("hidden");
    //Fetch
    const data = yield fetch("http://icanhazdadjoke.com", {
        headers: {
            "Accept": "application/json"
        },
    });
    const joke = yield data.json();
    //Quitar el loading
    (_b = document.getElementById("loading")) === null || _b === void 0 ? void 0 : _b.classList.add("hidden");
    //Comprobamos errores 
    //Funciona
    if (joke.status === 200) {
        //Mostrar estrellas
        document.getElementById("stars-box").style.display = "flex";
        //Mostrar chiste
        document.getElementById("texto-chiste").innerHTML = joke.joke;
    }
    //No funciona
    else {
        console.log("No se ha podido cargar el chiste");
    }
});
/* EFECTO HOVER PARA LAS ESTRELLAS */
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
                document.getElementById("one-star").style.color = "gray";
                document.getElementById("two-star").style.color = "gray";
                document.getElementById("three-star").style.color = "gray";
                break;
        }
};
/* VOTAR UN CHISTE Y EFECTO CLICK DE LAS ESTRELLAS */
const rateJoke = (numStars) => {
    check = true;
    let rate;
    switch (numStars) {
        case 1:
            document.getElementById("one-star").style.color = "yellow";
            document.getElementById("two-star").style.color = "gray";
            document.getElementById("three-star").style.color = "gray";
            rate = 1;
            break;
        case 2:
            document.getElementById("one-star").style.color = "yellow";
            document.getElementById("two-star").style.color = "yellow";
            document.getElementById("three-star").style.color = "gray";
            rate = 2;
            break;
        case 3:
            document.getElementById("one-star").style.color = "yellow";
            document.getElementById("two-star").style.color = "yellow";
            document.getElementById("three-star").style.color = "yellow";
            rate = 3;
            break;
        default:
            document.getElementById("one-star").style.color = "gray";
            document.getElementById("two-star").style.color = "gray";
            document.getElementById("three-star").style.color = "gray";
            break;
    }
};
