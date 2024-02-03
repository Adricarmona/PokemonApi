
////////////////// devuelve el pokemon en el array pokemonsTotales (completado) //////////
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

console.log(pokemonsTotales);
//////////////////////////////////////////////////////////////////////////////////////////

//////////// LO DE IR GENERANDO TEXTOS Y ESO /////////////////////////////////////////////

function imprimirPokemons(pokemonsTotales) {
    for (let index = 1; index <= pokemonsTotales; index++) {
        const h3 = document.createElement('h3');
        const img = document.createElement('img');
        h3.textContent = 'test'; // Assign text to h3 element
        
        let pokemons = document.getElementById('base');
        pokemons.appendChild(h3); // Append h3 to the 'base' element
    }
}

imprimirPokemons(151); // Call the function with the total number of Pokémon


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