///////// sacando la id del pokemon pedido //////////
const idURL = new URLSearchParams(window.location.search);
const id = idURL.get('id');
let pokemones;
damePokemonYa(id).then((pokemon) => {imprimirPokemons(pokemon),devolverPokemon(pokemon),comprobadorCadena(pokemon.name)});
dameDescripcionYa(id).then((pokemon) => {Descripcion(pokemon)}); 
// cogemos el pokemon y con el then lo convertimos a sincrono metiendolo en "pokemon"
// y metiendolo en la funcion flecha, y lo metemos en la funcion "imprimir" dandole "pokemon"
/////////////////////////////////////////////////////


////////    devuelve el pokemon en concreto //////////
async function damePokemonYa(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemonJson = await response.text();
    const obj = JSON.parse(pokemonJson)
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
    const descripcion = document.getElementById("descripcion");
    descripcion.innerHTML = `${pokemon.flavor_text_entries[26].flavor_text}`;
}
////////////////////////////////////////////////////////////


///////////////////////////////// ESTADISTICAS TABLA ////////////////////////////////////
function devolverPokemon(poke) {
    const estadisticasNumeros = [
        poke.stats[0].base_stat,
        poke.stats[1].base_stat,
        poke.stats[2].base_stat,
        poke.stats[3].base_stat,
        poke.stats[4].base_stat,
        poke.stats[5].base_stat
    ];

    const estadisticas = [
        {name: "hp", base_stat: estadisticasNumeros[0]},
        {name: "Ataque", base_stat: estadisticasNumeros[1]},
        {name: "Defensa", base_stat: estadisticasNumeros[2]},
        {name: "Ataque.esp", base_stat: estadisticasNumeros[3]},
        {name: "Defensa.esp", base_stat: estadisticasNumeros[4]},
        {name: "Velocidad", base_stat: estadisticasNumeros[5]}
    ];

    const tabla = document.getElementById("tablaEstadisticas");

    estadisticas.forEach(numeros => {
        const fila = tabla.insertRow(); // inserta una fila (por cada iteracion)

        const nombreCelda = fila.insertCell(); // añade una celda con los siguientes datos de los nombres
        nombreCelda.textContent = numeros.name.charAt(0).toUpperCase() + numeros.name.slice(1);

        const numeroEstadisticas = fila.insertCell();
        numeroEstadisticas.textContent = numeros.base_stat;
    });
}
////////////////////////////////////////////////////////////////////////////////////////////


///////////     CADENA EVOLUTIVA    /////////////////
// https://pokeapi.co/api/v2/evolution-chain/78/ este es el maximo

async function comprobadorCadena(nombre) {
    const cadenaEnHtml = document.getElementById("Cadena");
    for (let index = 1; index < 78; index++) {
        cadenaEvolutiva(index).then((cadena) => {
            try {
                if (cadena.chain.species.name === 'eevee' && (nombre === 'eevee' || nombre === 'vaporeon' || nombre ===  'jolteon' || nombre === 'flareon')) {
                    console.log(cadena.chain);
                    cadenaEnHtml.innerHTML = `
                    <h2>Cadena Evolutiva</h2>
                    <div id="cadenaEvoEve">
                        <div id="izquierdaEvo">
                        ${cadena.chain.species.name}
                        </div> 
                        <img id="flechaDerecha" src="../imagenes/flecha_derehca.png" alt="flecha a la derecha">
                        <div id="derechaEvo">
                            <p>${traductorEvo(cadena.chain.evolves_to[0].evolution_details[0].trigger.name)}: ${traductorEvo(cadena.chain.evolves_to[0].evolution_details[0].item.name)} ➜ ${cadena.chain.evolves_to[0].species.name}</p>
                            <p>${traductorEvo(cadena.chain.evolves_to[1].evolution_details[0].trigger.name)}: ${traductorEvo(cadena.chain.evolves_to[1].evolution_details[0].item.name)} ➜ ${cadena.chain.evolves_to[1].species.name} </p>
                        </div>
                    </div>`;
                } else if(cadena.chain.species.name === nombre
                    || cadena.chain.evolves_to[0].species.name === nombre 
                    || cadena.chain.evolves_to[0].evolves_to[0].species.name === nombre) 
                {
                    try {
                        if (cadena.chain.evolves_to[0].evolves_to[0].species.name) {
                            cadenaEnHtml.innerHTML = `
                            <h2>Cadena Evolutiva</h2>
                            <div id="cadenaEvo3">
                                <div>
                                    ${cadena.chain.species.name}
                                </div>
                                <div>
                                    <p><img id="flechaDerecha" src="../imagenes/flecha_derehca.png" alt="flecha a la derecha"></p>
                                    (${traductorEvo(cadena.chain.evolves_to[0].evolution_details[0].trigger.name)} ${nivelOQue(cadena.chain.evolves_to[0].evolution_details[0])})
                                </div>
                                <div>
                                    ${cadena.chain.evolves_to[0].species.name}
                                </div>
                                <div>
                                    <p><img id="flechaDerecha" src="../imagenes/flecha_derehca.png" alt="flecha a la derecha"></p>
                                    (${traductorEvo(cadena.chain.evolves_to[0].evolves_to[0].evolution_details[0].trigger.name)} ${nivelOQue(cadena.chain.evolves_to[0].evolves_to[0].evolution_details[0])})
                                </div>
                                <div>
                                    ${cadena.chain.evolves_to[0].evolves_to[0].species.name}
                                </div>
                            </div>`;
                        }
                    } catch (error) {
                        try {
                            if (cadena.chain.evolves_to[0].species.name) {
                                cadenaEnHtml.innerHTML = `
                                <h2>Cadena Evolutiva</h2>
                                <div id="cadenaEvo2">
                                    <div>
                                        ${cadena.chain.species.name} 
                                    </div>
                                    <div>
                                        <p><img id="flechaDerecha" src="../imagenes/flecha_derehca.png" alt="flecha a la derecha"></p>
                                        (${traductorEvo(cadena.chain.evolves_to[0].evolution_details[0].trigger.name)} ${nivelOQue(cadena.chain.evolves_to[0].evolution_details[0])})
                                    </div>
                                    <div>
                                    ${cadena.chain.evolves_to[0].species.name}
                                    </div>
                                </div>`;
                            }
                        } catch (error) {
                            cadenaEnHtml.innerHTML = `
                            <h2>Cadena Evolutiva</h2>
                            ${cadena.chain.species.name}`;
                        }
                    }
                }
            } catch (error) {
            }
        })
    }
}

function nivelOQue(pokemon) {
    if (pokemon.held_item) {
        return traductorEvo(pokemon.held_item.name);
    }
    if (pokemon.known_move) {
        return traductorEvo(pokemon.known_move.name);
    }
    if (pokemon.min_level) {
        return pokemon.min_level;
    }
    if (pokemon.min_happiness) {
        return pokemon.min_happiness;
    }
    if (pokemon.trigger.name == "use-item") {
        return traductorEvo(pokemon.item.name);
    }
}

async function cadenaEvolutiva(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`);
    const pokemonJson = await response.text();
    const obj = JSON.parse(pokemonJson);
    return obj;
}
/////////////////////////////////////////////////////


//////////// LO DE IR GENERANDO LOS POKEMONS CON LAS FOTOS ///////////////////////////////
function imprimirPokemons(pokemon) {
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
        <p id="descripcion"></p>
        <hr>
        <div><h4>ESTADISTICAS BASE</h4></div>
        <div class="tablaEstadisticas">
            <table id="tablaEstadisticas">               
            </table>
        </div>
        <hr>
        <div id="Cadena">
            <h2>Cadena Evolutiva</h2>
        </div>`;
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
        <p id="descripcion"></p>
        <hr>
        <h4>ESTADISTICAS BASE</h4>
        <div class="tablaEstadisticas">
            <table id="tablaEstadisticas">               
            </table>
        </div>
        <hr>
        <div id="Cadena">
            <h2>Cadena Evolutiva</h2>
        </div>`;
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
////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////    TRADUCTOR   ////////////////////////////////////////
function traductorEvo(palabra) {
    switch (palabra) {
        case "level-up":
            return "nivel";
        case "use-item":
            return "objeto";
        case "trade":
            return "Intercambio";
        case "moon-stone":
            return "piedra lunar"
        case "thunder-stone":
            return "piedra trueno";
        case "fire-stone":
            return "piedra fuego"
        case "leaf-stone":
            return "piedra hoja";
        case "water-stone":
            return "piedra agua";
        case "oval-stone":
            return "piedra oval";
        case "metal-coat":
            return ", rev. metálico";
        case "rollout":
            return ", desenrollar";
        case "ancient-power":
            return ", poder pasado";
        case "dragon-scale":
            return ", escama dragón";
        case "mimic":
            return ", mimético";
        case "electirizer":
            return ", electrizador";
        case "magmarizer":
            return ", magmatizador";
        case "up-grade":
            return ", mejora";
        case "dubious-disc":
            return ", discoextraño";
        default:
            return palabra;
    }
}
////////////////////////////////////////////////////////////////////////////////////////////X