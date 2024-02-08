cargarPokemons(); // para iniciar la busqueda

////////////////// devuelve el pokemon en el array pokemonsTotales ///////////////////////
const pokemonsTotales = []; // array donde esta todos los pokemons
/// esta funcion coge todos los pokemons
async function cargarPokemons() {
    // coge los 151 y los mete en el array
    for (let index = 1; index < 151; index++) {
        await devolverArray(index);
    }
    // coge los poquemos uno a uno y mete el que este utilizando en pokemon y lo mete en al funcion imprimir pokemons
    // asi hasta que se termine el forEach
    pokemonsTotales.forEach(pokemon => imprimirPokemons(pokemon));
}
//////////////////////////////////////////////////////////////////////////////////////////


///////////////////////// esta es la funcion que devuelve el Json a el text array ////////////////////////////
async function devolverArray(id) { // Coge la id del pokemon dado en el bucle encima
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`); // coge la informacion de la ap y la mete en response
    const pokemonJson = await response.text(); // la transforma en texto 
    const obj = JSON.parse(pokemonJson); // La transforma de json a objeto 
    pokemonsTotales[id] = obj; // lo pasa a un array donde estan todos los pokemons
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

console.log(pokemonsTotales)

//////////// LO DE IR GENERANDO LOS POKEMONS CON LAS FOTOS ///////////////////////////////
/////////ESTE ES COMO ESTA PENSADO EL DIV pokemon POR AHORA ////////////////
/*
<div class="pokemons">
    <a href="./vista_pokemon/vista_pokemon.html">
        <img id="imagen" width="200px" src="./imagenes/pokemon_trabajando.jpg">
        <h2 id="name">nombre</h2>
        <p id="codigo">codigo</p>
    </a>
</div>
*/
function imprimirPokemons(pokemon) {
    var zonaPokemon = document.createElement('div');
    zonaPokemon.classList.add('pokemons');
    zonaPokemon.innerHTML = `<a id="linkPokemon" href="./vista_pokemon/vista_pokemon.html"><img id="imagen" width="200px" src="${pokemon.sprites.other.home.front_default}"><h2 id="name">${pokemon.name}</h2><p id="codigo">ID: ${pokemon.id}</p></a>`;
    document.getElementById('Base').appendChild(zonaPokemon);
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