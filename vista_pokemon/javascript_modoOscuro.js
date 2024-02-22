document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const modoOscuroBtn = document.querySelector("#modoOscuro");
    modoOscuroBtn.addEventListener("click", toggleModoOscuro);
    function toggleModoOscuro() {
        modoOscuro = !modoOscuro; // Cambia el estado entre true y false
        if (modoOscuro) {
            body.classList.add("modo-oscuro");
            fadeBackground("../imagenes/fondo_oscuro_pokeapi.jpg");
        } else {
            body.classList.remove("modo-oscuro");
            fadeBackground("../imagenes/fondo_claro_pokeapi.jpg");
        }
    }

    function fadeBackground(nuevaImagen) {
        const fondoActual = body.style.backgroundImage;
        const nuevaFondo = `url('${nuevaImagen}')`;
        const transicionDuracion = 500; 
        const incrementoOpacidad = 0.02;
        let opacidad = 0;
        const intervalo = setInterval(function () {
            opacidad -= incrementoOpacidad;  
            if (opacidad <= 0) {
                body.style.backgroundImage = nuevaFondo;
                clearInterval(intervalo);
            } else {
                body.style.backgroundImage = `linear-gradient(rgba(255, 255, 255, ${opacidad}), rgba(255, 255, 255, ${opacidad})), ${fondoActual}`;
            }
        }, transicionDuracion / (1 / incrementoOpacidad));
    }
});
