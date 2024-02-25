///////// sacando la id del pokemon pedido //////////
const idURL = new URLSearchParams(window.location.search);
const id = idURL.get('id');
let descripcion;
dameDescripcionYa(id).then((pokemon) => {descripcion = Descripcion(pokemon);}); 
damePokemonYa(id).then((pokemon) => {imprimirPokemons(pokemon,descripcion);}); 
// cogemos el pokemon y con el then lo convertimos a sincrono metiendolo en "pokemon"
// y metiendolo en la funcion flecha, y lo metemos en la funcion "imprimir" dandole "pokemon"
/////////////////////////////////////////////////////


////////    devuelve el pokemon en concreto //////////
async function damePokemonYa(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemonJson = await response.text();
    const obj = JSON.parse(pokemonJson);
    return obj; // devuelve el objeto
}
//////////////////////////////////////////////////////


////////    devuelve la descripcion en concreto //////////
async function dameDescripcionYa(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    const pokemonJson = await response.text();
    const obj = JSON.parse(pokemonJson);
    return obj; // devuelve el objeto
}
//////////////////////////////////////////////////////


////////    imprimimos la descripcion por pantalla    //////////
function Descripcion(pokemon){
    return pokemon.flavor_text_entries[26].flavor_text;
}
////////////////////////////////////////////////////////////


//////////// LO DE IR GENERANDO LOS POKEMONS CON LAS FOTOS ///////////////////////////////
function imprimirPokemons(pokemon,descripcion) {
    let zonaPokemon = document.createElement('div');
    const peso = pokemon.weight / 10;
    const altura = pokemon.height / 10;
    zonaPokemon.classList.add('pokemons');
    if(pokemon.types.length == 1){                                  
        zonaPokemon.innerHTML = `<h1 id="Nombre">${pokemon.name}</h1>
        <img id="fotoPokemon" src="${pokemon.sprites.other.home.front_default}" alt="pokemon">
        <h3>ID: ${(pokemon.id).toString().padStart(3,"00")}</h3>
        <div class="tipos">
            <p class="tipo" id="${pokemon.types[0].type.name}">${traductor(pokemon.types[0].type.name)}</p>
        </div>
        <hr>
        <p class="iconos"><img class="iconosPequeno" src="../imagenes/peso.png" alt="peso">${peso}kg<img class="iconosPequeno" src="../imagenes/altura.png" alt="altura">${altura}m</p>
        <p id="descripcion">${descripcion}</p>
        <div><h4>ESTADISTICAS</h4></div>`;
    } else {
        zonaPokemon.innerHTML = `<h1 id="Nombre">${pokemon.name}</h1>
        <img id="fotoPokemon" src="${pokemon.sprites.other.home.front_default}" alt="pokemon">
        <h3>ID: ${(pokemon.id).toString().padStart(3,"00")}</h3>
        <div class="tipos">
            <span class="tipo" id="${pokemon.types[0].type.name}">${traductor(pokemon.types[0].type.name)}</span>
            <span class="tipo" id="${pokemon.types[1].type.name}">${traductor(pokemon.types[1].type.name)}</span>
        </div>
        <hr>
        <p class="iconos"><img class="iconosPequeno" src="../imagenes/peso.png" alt="peso">${peso}<img class="iconosPequeno" src="../imagenes/altura.png" alt="altura">${altura}m</p>
        <p id="descripcion">${descripcion}</p>
        <div><h4>ESTADISTICAS</h4></div>`;
    }
    document.getElementById('Base').appendChild(zonaPokemon);
    
}

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
            return "Psiquico";
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