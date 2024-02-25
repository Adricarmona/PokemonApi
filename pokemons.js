cargarPokemons(); // para iniciar la busqueda

////////////////// devuelve el pokemon en el array pokemonsTotales ///////////////////////
const pokemonsTotales = []; // array donde esta todos los pokemons
/// esta funcion coge todos los pokemons
async function cargarPokemons() {
    // coge los 151 y los mete en el array
    for (let index = 1; index <= 151; index++) {
        await devolverArray(index);
    }
    for (const pokemon of pokemonsTotales) {
        imprimirPokemons(pokemon)
    }
}
//////////////////////////////////////////////////////////////////////////////////////////

/// BARRRA DE BUSQUEDA ////
const barraBusqueda = document.getElementById('botonBuscar');
barraBusqueda.addEventListener("keyup", buscador);

// Buscador //
function buscador(da) {
    document.getElementById('Base').innerHTML = '';
    // coge la barra y comprueba si tiene datos para meterlos en minusculas a datos o mete nada ''
    const elemento = document.getElementById('botonBuscar');
    let dato;
    if (elemento) {
        dato = elemento.value.toLowerCase();
    } else {
        dato = "";
    }

    let nombre; // el nombre de cada poquemon para que pueda comprobarlos
    // coge los poquemos uno a uno y mete el que este utilizando en pokemon y lo mete en al funcion imprimir pokemons
    // asi hasta que se termine el forEach
    for(const pokemon of pokemonsTotales ){
        nombre = pokemon.name;
        if (dato == "") {
            imprimirPokemons(pokemon)
        } else {
            if (nombre.includes(`${dato}`)) {
                imprimirPokemons(pokemon)
            }
        }
    }
}
/////////////////////////

///////////////////////// esta es la funcion que devuelve el Json a el text array ////////////////////////////
async function devolverArray(id) { // Coge la id del pokemon dado en el bucle encima
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`); // coge la informacion de la ap y la mete en response
    const pokemonJson = await response.text(); // la transforma en texto 
    const obj = JSON.parse(pokemonJson); // La transforma de json a objeto 
    pokemonsTotales[id - 1] = obj; // lo pasa a un array donde estan todos los pokemons
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////// LO DE IR GENERANDO LOS POKEMONS CON LAS FOTOS ///////////////////////////////
/////////ESTE ES COMO ESTA PENSADO EL DIV pokemon POR AHORA ////////////////
function imprimirPokemons(pokemon) {
    let zonaPokemon = document.createElement('div');
    zonaPokemon.classList.add('pokemons');
    if(pokemon.types.length == 1){                                      // la "?" es para enviar el parrametro y "id=" es para indicar que variable es el dato y el pokemon id evidentemente es el numero
        zonaPokemon.innerHTML = 
        `<a id="linkPokemon" href="./vista_pokemon/vista_pokemon.html?id=${pokemon.id}">
            <img id="imagen" width="200px" src="${pokemon.sprites.other.home.front_default}">
            <h2 id="name">${pokemon.name}</h2>
            <p id="codigo">ID: ${(pokemon.id).toString().padStart(3,"00")}</p>
            <div>
                <p class="tipo" id="${pokemon.types[0].type.name}">${traductor(pokemon.types[0].type.name)}</p>
            </div>
        </a>`;
    } else {
        zonaPokemon.innerHTML = `<a id="linkPokemon" href="./vista_pokemon/vista_pokemon.html?id=${pokemon.id}">
            <img id="imagen" width="200px" src="${pokemon.sprites.other.home.front_default}">
            <h2 id="name">${pokemon.name}</h2>
            <p id="codigo">ID: ${(pokemon.id).toString().padStart(3,"00")}</p>
            <div>
                <p class="tipo" id="${pokemon.types[0].type.name}">${traductor(pokemon.types[0].type.name)}</p>
                <p class="tipo" id="${pokemon.types[1].type.name}">${traductor(pokemon.types[1].type.name)}</p>
            </div>
        </a>`;
    }
    document.getElementById('Base').appendChild(zonaPokemon);
    
}
//////////////////////////////////////////////////////////////////////////////////////////

//////////////////// TRADUCTOR DE LAS PALABRAS ///////////////////////////
function traductor(tipo) {
    switch (tipo) {
        case "grass":
            return "Planta";
        case "fire":
            return "Fuego";
        case "water":
            return "Agua";
        case "poison":
            return "Veneno";
        case "bug":
            return "Bicho";
        case "normal":
            return "Normal";
        case "flying":
            return "Volador";
        case "electric":
            return "Eléctrico";
        case "ground":
            return "Tierra";
        case "fairy":
            return "Hada";
        case "fighting":
            return "Lucha";
        case "psychic":
            return "Psíquico";
        case "rock":
            return "Roca";
        case "steel":
            return "Acero";
        case "ice":
            return "Hielo";
        case "ghost":
            return "Fantasma";
        default:
            return "Error";
    }
}
//////////////////////////////////////////////////////////////////////////