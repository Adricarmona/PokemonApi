// MODO CLARO Y MODO OSCURO

document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const modoOscuroBtn = document.querySelector("#modoOscuro");
    modoOscuroBtn.addEventListener("click", toggleModoOscuro);

    function toggleModoOscuro() {
        if (body.classList.contains("modo-oscuro")) {
            body.classList.remove("modo-oscuro");
            fadeBackground("../imagenes/fondo_claro_pokeapi.jpg");
        } else {
            body.classList.add("modo-oscuro");
            fadeBackground("../imagenes/fondo_oscuro_pokeapi.jpg");
        }
    }

    function fadeBackground(nuevaImagen) {
        const transicionDuracion = 500; 
        const incrementoOpacidad = 0.02;
        let opacidad = 1;
        const intervalo = setInterval(function () {
            opacidad -= incrementoOpacidad;
            if (opacidad <= 0) {
                clearInterval(intervalo);
                body.style.backgroundImage = `url('${nuevaImagen}')`;
            } else {
                body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, ${opacidad}), rgba(0, 0, 0, ${opacidad})), url('${nuevaImagen}')`;
            }
        }, transicionDuracion / (1 / incrementoOpacidad));
    }
});