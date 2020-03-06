window.onload = () =>{

    funcionModal();
}

// ----------------------------------------FUNCIONES------------------------------------
function funcionModal(){
    let abrirModalTelefonico = document.getElementsByClassName("abrirModalTelefonico");
    let abrirModalMediosDePago = document.getElementsByClassName("abrirModalMediosDePago")
    let modalMediosDePago = document.getElementById("modalMediosDePago");
    let modalTelefonico = document.getElementById("modalTelefonico");
    let botonCerrar = document.getElementsByClassName("cerrar");

    //agrega el evento click(con funcion abrir) a los elementos que tienen la clase abrirModalTelefonico
    for(let i = 0; i<abrirModalTelefonico.length ; i++){
        abrirModalTelefonico[i].addEventListener("click", () => {
            abrirModal(modalTelefonico);

            cerrarModalCuandoSeClickeeAfueraDelModal(modalTelefonico);
        })
    }

    //agrega el evento click(con funcion abrir) a los elementos que tienen la clase abrirModalMediosDePago
    for(let i = 0; i<abrirModalMediosDePago.length ; i++){
        abrirModalMediosDePago[i].addEventListener("click", () => {
            abrirModal(modalMediosDePago);

            cerrarModalCuandoSeClickeeAfueraDelModal(modalMediosDePago);
        })
    } 


    //agrega el evento click(con funcion cerrar) a todos los elementos de clase cerrar
    for( let i = 0 ; i < botonCerrar.length ; i++ ){

        botonCerrar[i].addEventListener("click", () => {
            //va a cerrar a poner el display none al abuelo del icono cerrar, en este caso seria el modal
            cerrarModal( botonCerrar[i].parentNode.parentNode);
        });

    }
}

function abrirModal( modalAMostrar ){
    modalAMostrar.style.display = "flex";
}
function cerrarModal( modalACerrar ) {
    modalACerrar.style.display = "none";
}
function cerrarModalCuandoSeClickeeAfueraDelModal(modalACerrar){
    document.body.addEventListener("click", ( e ) => {
        if( modalACerrar === e.target ){
            cerrarModal( modalACerrar );
        }
    },false);
}