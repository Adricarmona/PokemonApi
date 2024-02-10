    // esto es solo para el boton de subir para arriba 
    const botonjs = document.querySelector("#botonPaArriba");
    botonjs.addEventListener("click", subirArriba);

    function subirArriba() {
        scrollTo(0,0) // mueve a la pagina a la 0,0 osea arriba a la izquierda
    }