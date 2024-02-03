
////////////////// devuelve el pokemon en el array pokemonsTotaless (completado) //////////
const pokemonsTotales = [];

for (let index = 1; index < 151; index++) {
    //damePokemonYa(index)
    devolverArray(index)
}

async function devolverArray(id) { // Coge la id del pokemon dado en el bucle encima
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`); // coge la informacion de la ap y la mete en response
    const pokemonJson = await response.text(); // la transforma en texto 
    const obj = JSON.parse(pokemonJson); // La transforma de json a objeto 
    pokemonsTotales[id] = obj; // lo pasa a un array donde estan todos los pokemons
    //console.log(pokemonsTotales[id]); // lo pasa a consola
}

//////////////////////////////////////////////////////////////////////////////////////////

console.log(pokemonsTotales);








/*
async function damePokemonYa(id) {
    console.log(123);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemonJson = await response.text();
    const obj = JSON.parse(pokemonJson);
    console.log(obj);
    console.log(obj.stats);
    document.getElementById('name').innerText = obj.name;
    document.getElementById('imagen').src = obj.sprites.front_default;
}
*/

// CODIGO PARA MODO OSCURO-CLARO
//*
//*
//*
//*
//*
//*
//*
document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const modoOscuroBtn = document.querySelector(".modoOscuro");
    modoOscuroBtn.addEventListener("click", toggleModoOscuro);

    function toggleModoOscuro() {
        if (body.classList.contains("modo-oscuro")) {
            body.classList.remove("modo-oscuro");
            fadeBackground("./imagenes/fondo_claro_pokeapi.jpg");
        } else {
            body.classList.add("modo-oscuro");
            fadeBackground("./imagenes/fondo_oscuro_pokeapi.jpg");
        }
    }

    function fadeBackground(nuevaImagen) {
        const fondoActual = body.style.backgroundImage;
        const nuevaFondo = `url('${nuevaImagen}')`;
        const transicionDuracion = 500; 
        const incrementoOpacidad = 0.02;
        let opacidad = 1;
        const intervalo = setInterval(function () {
        opacidad -= incrementoOpacidad;
        if (opacidad <= 0) {
            body.style.backgroundImage = nuevaFondo;
            clearInterval(intervalo);
        } else {
            body.style.backgroundImage = `linear-gradient(rgba(255, 255, 255, ${opacidad}), rgba(255, 255, 255, ${opacidad})), ${nuevaFondo}`;
        }
        }, transicionDuracion / (1 / incrementoOpacidad));
    }

});