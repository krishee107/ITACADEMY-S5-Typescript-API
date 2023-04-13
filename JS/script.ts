
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
    //Ocultar las estrellas
    document.getElementById("stars-box")!.style.display = "none";
    //Reiniciarlas a 0 votos
    if (check) {
        addRate();
        rateJoke(0);
        check = false;
        rate = null;
    }
    //Mostrar loading
    document.getElementById("loading")?.classList.remove("hidden")

    //Fetch
    const data = await fetch("http://icanhazdadjoke.com", {
        headers: {
            "Accept": "application/json"
        },
    });

    const newjoke = await data.json();
    //Quitar el loading
    document.getElementById("loading")?.classList.add("hidden")

    //Comprobamos errores 
    //Funciona
    if (newjoke.status === 200) {
        //Mostrar estrellas
        document.getElementById("stars-box")!.style.display = "flex";
        //Mostrar chiste
        document.getElementById("texto-chiste")!.innerHTML = newjoke.joke;
    }
    //No funciona
    else {
        console.log("No se ha podido cargar el chiste");
    }
};


/* EFECTO HOVER PARA LAS ESTRELLAS */

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

/* VOTAR UN CHISTE Y EFECTO CLICK DE LAS ESTRELLAS */
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

const addRate = () => {
    //Guardamos el chiste en el objeto
    joke.joke = document.getElementById("texto-chiste")!.innerHTML;
    //Guardamos la fecha
    const d = new Date();
    joke.date = d.toISOString();
    //Guardamos la puntuación
    joke.score = rate;
    reportAcudits.push({ joke });
    console.log(reportAcudits)
}