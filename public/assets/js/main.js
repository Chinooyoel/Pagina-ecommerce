window.onload = () =>{

    funcionModal();
    funcionMostrarYOcultarAyuda();
    funcionParaQueElArticuloSeOpaqueYAparezcaMasInfo();
}

// ----------------------------------------FUNCIONES------------------------------------
function funcionModal(){
    let abrirModalTelefonico = document.getElementsByClassName("abrirModalTelefonico");
    let abrirModalMediosDePago = document.getElementsByClassName("abrirModalMediosDePago")
    let abrirModalLogin = document.getElementsByClassName("abrirModalLogin");
    let abrirModalRegistrarse = document.getElementsByClassName("abrirModalRegistrarse");
    let modalMediosDePago = document.getElementById("modalMediosDePago");
    let modalTelefonico = document.getElementById("modalTelefonico");
    let modalLogin = document.getElementById("modalLogin");
    let modalRegistrarse = document.getElementById("modalRegistrarse");
    let botonCerrar = document.getElementsByClassName("modalVentana__cerrar");

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

    //agrega el evento click(con funcion abrir) a los elementos que tienen la clase abrirModalMediosDePago
    for(let i = 0; i<abrirModalRegistrarse.length ; i++){
        abrirModalRegistrarse[i].addEventListener("click", () => {
            abrirModal(modalRegistrarse);

            cerrarModalCuandoSeClickeeAfueraDelModal(modalRegistrarse);
        })
    } 

        //agrega el evento click(con funcion abrir) a los elementos que tienen la clase abrirModalLogin
        for(let i = 0; i<abrirModalLogin.length ; i++){
            abrirModalLogin[i].addEventListener("click", () => {
                abrirModal(modalLogin);
    
                cerrarModalCuandoSeClickeeAfueraDelModal(modalLogin);
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

function funcionMostrarYOcultarAyuda(){
    let botonMostrarYOcultar = document.getElementsByClassName("articuloAyuda__botonMostrar");
    let ayudaInf = document.getElementsByClassName("articuloAyuda__infoMostrar");


    for( let i=0; i < botonMostrarYOcultar.length; i++ ){

        ayudaInf[i].style.display="none";

        botonMostrarYOcultar[i].addEventListener("click", () => {
            if( ayudaInf[i].style.display === "block"){
                ayudaInf[i].style.display="none";
            }else{
                ayudaInf[i].style.display="block";
            }
        });
    }
}

function funcionParaQueElArticuloSeOpaqueYAparezcaMasInfo() {
    let elementoInteractivo = document.getElementsByClassName("producto__interaccionArticulo");

    for( let i = 0 ; i < elementoInteractivo.length; i++ ){
        
    //evento mouseenter, ocurre cuando el raton entra o esta encima del elemento
    elementoInteractivo[i].addEventListener("mouseenter", () => {
        let hijosDelElementoInteractivo = elementoInteractivo[i].children;
        console.log(hijosDelElementoInteractivo)

        hijosDelElementoInteractivo[0].style.opacity = 0.5;
        hijosDelElementoInteractivo[1].style.display = "block";

    })  
    
    //evento mouseenter, ocurre cuando el raton sale o no esta encima del elemento
    elementoInteractivo[i].addEventListener("mouseleave", () => {
        let hijosDelElementoInteractivo = elementoInteractivo[i].children;
        hijosDelElementoInteractivo[0].style.opacity = 1;
        hijosDelElementoInteractivo[1].style.display = "none";

    })
    }


}