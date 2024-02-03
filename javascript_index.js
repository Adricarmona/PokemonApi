////////////////// devuelve el pokemon en el array pokemonsTotales (completado) //////////
const pokemonsTotales = [];

async function cargarPokemons() {
    for (let index = 1; index < 151; index++) {
        //damePokemonYa(index)
        await devolverArray(index);
    }

    // Imprime los nombres de todos los pokemons
    pokemonsTotales.forEach(pokemon => console.log(pokemon.name));
}

console.log(pokemonsTotales);

async function devolverArray(id) { // Coge la id del pokemon dado en el bucle encima
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`); // coge la informacion de la ap y la mete en response
    const pokemonJson = await response.text(); // la transforma en texto 
    const obj = JSON.parse(pokemonJson); // La transforma de json a objeto 
    pokemonsTotales[id] = obj; // lo pasa a un array donde estan todos los pokemons
}

cargarPokemons();

//////////////////////////////////////////////////////////////////////////////////////////


//////////// LO DE IR GENERANDO TEXTOS Y ESO /////////////////////////////////////////////
const listaPokemon = document.querySelector("#base");   

function imprimirPokemons(pokemonsTotales) {
    const div = document.createElement('div');
    div.classList.add('pokemons');
    div.innerHTML = `
    <img id="imagen" width="200px" src="./imagenes/pokemon_trabajando.jpg">
    <h2 id="name">${pokemon.name}</h2>
    <p id="codigo">codigo</p>`;
    listaPokemon.append(div);
}

//////////////////////////////////////////////////////////////////////////////////////////

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