let reportAcudits: {
    joke: string,
    score: number,
    date: string
}[] = [];

const generarChiste = async () => {
    //Ocultar las estrellas
    document.getElementById("stars-box")!.style.display = "none";
    //Mostrar loading
    document.getElementById("loading")?.classList.remove("hidden")

    //Fetch
    const data = await fetch("http://icanhazdadjoke.com", {
        headers: {
            "Accept": "application/json"
        },
    });

    const joke = await data.json();
    //Quitar el loading
    document.getElementById("loading")?.classList.add("hidden")

    //Comprobamos errores 
    //Funciona
    if (joke.status === 200) {
        //Mostrar estrellas
        document.getElementById("stars-box")!.style.display = "flex";
        //Mostrar chiste
        document.getElementById("texto-chiste")!.innerHTML = joke.joke;
    }
    //No funciona
    else {
        console.log("No se ha podido cargar el chiste");
    }
};



/* Hovers de las estrellas */
let check = false;

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
                break;
        }
}

const rateJoke = (numStars: number) => {
    check = true;
    switch (numStars) {
        case 1:
            document.getElementById("one-star")!.style.color = "yellow"
            document.getElementById("two-star")!.style.color = "gray"
            document.getElementById("three-star")!.style.color = "gray"
            break;
        case 2:
            document.getElementById("one-star")!.style.color = "yellow"
            document.getElementById("two-star")!.style.color = "yellow"
            document.getElementById("three-star")!.style.color = "gray"
            break;
        case 3:
            document.getElementById("one-star")!.style.color = "yellow"
            document.getElementById("two-star")!.style.color = "yellow"
            document.getElementById("three-star")!.style.color = "yellow"
            break;

        default:
            break;
    }
};