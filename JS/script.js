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
;
let reportAcudits = [];
let check = false;
let rate;
let joke = {
    joke: "",
    score: undefined,
    date: ""
};
/* GENERAR UN NUEVO CHISTE */
const generarChiste = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    //Mostrar loading mientras cargamos el chiste
    (_a = document.getElementById("loading")) === null || _a === void 0 ? void 0 : _a.classList.remove("hidden");
    //Ocultamos las estrellas hasta que cargue el chiste
    document.getElementById("stars-box").style.display = "none";
    //Reiniciamos todas las variables para el nuevo chiste
    if (check) {
        addRate();
        rateJoke(0);
        check = false;
        rate = null;
    }
    //Fetch a la API
    const data = yield fetch("http://icanhazdadjoke.com", {
        headers: {
            "Accept": "application/json"
        },
    });
    const newjoke = yield data.json();
    //Quitar el loading
    (_b = document.getElementById("loading")) === null || _b === void 0 ? void 0 : _b.classList.add("hidden");
    //Comprobamos errores 
    //Funciona
    if (newjoke.status === 200) {
        //Mostrar estrellas
        document.getElementById("stars-box").style.display = "flex";
        //Mostrar chiste
        document.getElementById("texto-chiste").innerHTML = newjoke.joke;
    }
    //No funciona
    else {
        //Mostrar mensaje de error
        document.getElementById("texto-chiste").innerHTML = "No se ha podido cargar el chiste";
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
            rate = null;
            break;
    }
};
//GUARDAR LA VOTACION
const addRate = () => {
    //Guardamos el chiste en el objeto
    joke.joke = document.getElementById("texto-chiste").innerHTML;
    //Guardamos la fecha
    const d = new Date();
    joke.date = d.toISOString();
    //Guardamos la puntuación
    joke.score = rate;
    //Lo añadimos al array
    reportAcudits.push({ joke });
    //Resultado
    console.log(reportAcudits);
};
/* NIVELL 2 !!! */
const getWheather = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetch("https://www.el-tiempo.net/api/json/v2/provincias/08");
    const wheather = yield data.json();
    document.getElementById("wheather_title").innerHTML = wheather.title;
    document.getElementById("wheather_text").innerHTML = wheather.today.p;
    console.log(wheather);
});
getWheather();
