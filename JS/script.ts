const generarChiste = async () => {


    const data = await fetch("http://icanhazdadjoke.com", {
        headers: {
            "Accept": "application/json"
        },
    });

    const joke = await data.json();

    //Comprobamos errores 
    //Funciona
    if (joke.status === 200) {
        document.getElementById("texto-chiste")!.innerHTML = joke.joke;
    }
    //No funciona
    else {
        console.log("No se ha podido cargar el chiste");
    }
};

