
interface Joke {
    joke: string,
    score: number | null | undefined,
    date: string
};

let reportAcudits: { joke: Joke }[] = [];
let check = false;
let rate: number | null;
let joke: Joke = {
    joke: "",
    score: undefined,
    date: ""
}

/* GENERAR UN NUEVO CHISTE */
const generarChiste = async () => {
    //Mostrar loading mientras cargamos el chiste y quitamos el chiste anterior
    document.getElementById("loading")?.classList.remove("hidden")
    document.getElementById("texto-chiste")!.style.display = "none ";
    //Desactivamos los emojis
    document.getElementById("emoji")!.style.display = "none ";


    //Reiniciamos todas las variables para el nuevo chiste
    if (check) {
        addRate();
        check = false;
        rate = null;
    }

    //Random api
    const randomNum = Math.floor(Math.random() * 10);
    let API: string = "";
    if (randomNum % 2 == 0) API = "https://v2.jokeapi.dev/joke/Any?lang=es&type=single";
    else API = "http://icanhazdadjoke.com";

    //Fetch a la API
    const data = await fetch(API, {
        headers: {
            "Accept": "application/json"
        },
    });
    const newjoke = await data.json();

    //Quitar el loading
    document.getElementById("loading")!.classList.add("hidden")
    //Mostramos los emojis
    document.getElementById("emoji")!.style.display = "flex";

    //Comprobamos errores 
    //Funciona
    if (newjoke.status === 200 || newjoke.error == false) {
        //Mostrar chiste
        document.getElementById("texto-chiste")!.innerHTML = newjoke.joke;
    }
    //No funciona
    else {
        //Mostrar mensaje de error
        document.getElementById("texto-chiste")!.innerHTML = "No se ha podido cargar el chiste";
    }


    //Mostramos el campo del chiste
    document.getElementById("texto-chiste")!.style.display = "block";
};


/* VOTAR UN CHISTE*/
const rateJoke = (num: number) => {
    switch (num) {
        case 1:
            rate = 1;
            break;
        case 2:
            rate = 2;
            break;
        case 3:
            rate = 3;
            break;
    }

    check = true;
}


//GUARDAR LA VOTACION
const addRate = () => {
    //Guardamos el chiste en el objeto
    joke.joke = document.getElementById("texto-chiste")!.innerHTML;
    //Guardamos la fecha
    const d = new Date();
    joke.date = d.toISOString();
    //Guardamos la puntuación
    joke.score = rate;
    //Lo añadimos al array
    reportAcudits.push({ joke });
    //Resultado
    console.log(reportAcudits)
}


/* NIVELL 2 !!! */


const getWheather = async () => {
    const data = await fetch("https://www.el-tiempo.net/api/json/v2/provincias/08");

    const wheather = await data.json();
    document.getElementById("wheather_text")!.innerHTML = wheather.ciudades[6].temperatures.max + " ºC";

}

getWheather();


/* EXTRA --> DESACTIVADO EN EL ULTIMO COMMIT POR LA MAQUETACION */
/*
const generarChiste = async () => {
    //Mostrar loading mientras cargamos el chiste
    document.getElementById("loading")?.classList.remove("hidden")
    //Ocultamos las estrellas hasta que cargue el chiste
    document.getElementById("stars-box")!.style.display = "none";
    //Reiniciamos todas las variables para el nuevo chiste
    if (check) {
        addRate();
        rateJoke(0);
        check = false;
        rate = null;
    }

    //Random api
    const randomNum = Math.floor(Math.random() * 10);
    console.log(randomNum)
    let API: string = "";
    if (randomNum % 2 == 0) API = "https://v2.jokeapi.dev/joke/Any?lang=es&type=single";
    else API = "http://icanhazdadjoke.com";

    //Fetch a la API
    const data = await fetch(API, {
        headers: {
            "Accept": "application/json"
        },
    });
    const newjoke = await data.json();

    //Quitar el loading
    document.getElementById("loading")?.classList.add("hidden")

    //Comprobamos errores 
    //Funciona
    if (newjoke.status === 200 || newjoke.error == false) {
        //Mostrar estrellas
        document.getElementById("stars-box")!.style.display = "flex";
        //Mostrar chiste
        document.getElementById("texto-chiste")!.innerHTML = newjoke.joke;
    }
    //No funciona
    else {
        //Mostrar mensaje de error
        document.getElementById("texto-chiste")!.innerHTML = "No se ha podido cargar el chiste";
    }
};


const hoverStars = (numStars: number, color: string) => {
    if (!check)
        switch (numStars) {
            case 1:
                document.getElementById("one-star")!.style.color = color;
                break;
            case 2:
                document.getElementById("one-star")!.style.color = color;
                document.getElementById("two-star")!.style.color = color;
                break;
            case 3:
                document.getElementById("one-star")!.style.color = color;
                document.getElementById("two-star")!.style.color = color;
                document.getElementById("three-star")!.style.color = color;
                break;

            default:
                document.getElementById("one-star")!.style.color = "gray";
                document.getElementById("two-star")!.style.color = "gray";
                document.getElementById("three-star")!.style.color = "gray";
                break;
        }
}

const rateJoke = (numStars: number) => {
    check = true;

    switch (numStars) {
        case 1:
            document.getElementById("one-star")!.style.color = "yellow";
            document.getElementById("two-star")!.style.color = "gray";
            document.getElementById("three-star")!.style.color = "gray";
            rate = 1;
            break;
        case 2:
            document.getElementById("one-star")!.style.color = "yellow";
            document.getElementById("two-star")!.style.color = "yellow";
            document.getElementById("three-star")!.style.color = "gray";
            rate = 2;
            break;
        case 3:
            document.getElementById("one-star")!.style.color = "yellow";
            document.getElementById("two-star")!.style.color = "yellow";
            document.getElementById("three-star")!.style.color = "yellow";
            rate = 3;
            break;

        default:
            document.getElementById("one-star")!.style.color = "gray";
            document.getElementById("two-star")!.style.color = "gray";
            document.getElementById("three-star")!.style.color = "gray";
            rate = null;
            break;
    }
};

const getWheather = async () => {
    const data = await fetch("https://www.el-tiempo.net/api/json/v2/provincias/08");

    const wheather = await data.json();
    document.getElementById("wheather_title")!.innerHTML = wheather.title;
    document.getElementById("wheather_text")!.innerHTML = wheather.today.p;
    console.log(wheather);
}

*/