window.onload = () =>{

    funcionModal();
    funcionParaQueElArticuloSeOpaqueYAparezcaMasInfo();
    funcionParaMostrarSubmenu();
    funcionBuscadorGeneral();
    funcionAbrirMenuResponsive();

    
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


    agregarEventoAlBotonAbrirYCerrarModal( abrirModalTelefonico, modalTelefonico );
    agregarEventoAlBotonAbrirYCerrarModal( abrirModalMediosDePago, modalMediosDePago )
    agregarEventoAlBotonAbrirYCerrarModal( abrirModalRegistrarse, modalRegistrarse );
    agregarEventoAlBotonAbrirYCerrarModal( abrirModalLogin, modalLogin );


    for( let i = 0 ; i < botonCerrar.length ; i++ ){
        botonCerrar[i].addEventListener("click", () => {
            //va a cerrar a poner el display none al abuelo del icono cerrar, en este caso seria el modal
            cerrarModal( botonCerrar[i].parentNode.parentNode);
        });
    }
    
    
}
function agregarEventoAlBotonAbrirYCerrarModal( botonModalArray, modal ){

    for( boton of botonModalArray ) {
        boton.addEventListener("click", () => {
            abrirModal(modal);

            cerrarModalCuandoSeClickeeAfueraDelModal(modal);
        })
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

function mostrarUsuarioEnTabla( usuarioArray ){
    let tablaUsuario = document.getElementById("tablaUsuario");
    tablaUsuario.innerHTML = "";

    usuarioArray.forEach( ( usuario, index ) => {
        tablaUsuario.innerHTML += 
        `<tr class="tabla__fila">
            <th class="tabla__campo">${ index + 1 }</th>
            <th class="tabla__campo tabla__campo--alignStart">${ usuario.apellido}, ${ usuario.nombre}</th>
            <th class="tabla__campo tabla__campo--verde">${ usuario.estado}</th>
            <th class="tabla__campo">${ usuario.email }</th>
            <th class="tabla__campo">${ usuario.telefono }</th>
            <th class="tabla__campo">0</th>
            <th class="tabla__campo"><a href="/usuario/perfil/${ usuario._id }">Mas info</a></th>
        </tr>`
    })
}

function funcionBuscarProductoParaTabla() {
    let buscadorTabla = document.getElementById("buscarProducto");

    buscadorTabla.addEventListener("keypress", () => {
        if( buscadorTabla.value ){
            enviarPeticion("GET", `http://localhost:3000/producto/admin/buscar/${ buscadorTabla.value }`, ( respuesta ) => {

            mostrarProductoEnTabla( respuesta.productosDB );
            })
        }       
    }, false)
}


function mostrarProductoEnTabla( productoArray ){
    let tablaProducto = document.getElementById("tablaProducto");
    tablaProducto.innerHTML = "";

    productoArray.forEach( ( producto, index ) => {
        tablaProducto.innerHTML += 
        `<tr class="tabla__fila">
            <th class="tabla__campo">${ index + 1 }</th>
            <th class="tabla__campo tabla__campo--alignStart"><a href="product/profile/${ producto._id }">${ producto.nombre }</a></th>
            <th class="tabla__campo">${ producto.categoria }</th>
            <th class="tabla__campo tabla__campo--verde">${ producto.stock }</th>
            <th class="tabla__campo">$${ producto.precio }.00</th>
            <th class="tabla__campo"><a href="/product/update/${ producto._id }">Editar</a> - <a href="/product/remove/${ producto._id }">Eliminar</a></th>
        </tr>`
    })
}


function funcionBuscarUsuario () {
    let buscador = document.getElementById("buscarUsuario");

    buscador.addEventListener("keydown", () => {
        if( buscador.value ){
            enviarPeticion("POST", `http://localhost:3000/usuario/buscar/${ buscador.value }`, ( respuesta ) => {
                let usuarioArray = respuesta.usuariosDB;

                mostrarUsuarioEnTabla( usuarioArray );
            })
        }       
    }, false)

}


function enviarPeticion( metodo, url, callback ) {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {

        if( this.readyState == 4 && this.status == 200 ) {
            let respuestaObj = JSON.parse(this.responseText);
            
            callback(respuestaObj);            
        }
    }

    xhttp.open( metodo, url);
    xhttp.send();
}

function funcionMostrarFoto() {
    let botonInputFileEstilizado = document.getElementById("botonInputFileEstilizado")
    let inputFile = document.getElementById("elegirFoto");
    let output = document.getElementById("imagenProducto");

    botonInputFileEstilizado.addEventListener("click", () => {
        inputFile.click();
    })

    inputFile.addEventListener("change", ( event ) => {
        let readerFile = new FileReader();

        readerFile.onload = ( e ) => {
            output.src = e.target.result
        }

        readerFile.readAsDataURL( event.target.files[0] )
    })
}

function funcionParaMostrarSubmenu(){
    let listSubmenu = document.getElementsByClassName("menu__submenu");
    
    for( let submenu of listSubmenu){

        submenu.previousElementSibling.addEventListener("click", ( ) => {
            if( submenu.style.display === "none" || !submenu.style.display){
                submenu.style.display = "block"
            }else{
                submenu.style.display = "none";
            }        
        })
    }
    

}

function funcionBuscadorGeneral(){
    let botonBuscador = document.getElementById("buscadorGeneral");
    let inputBuscador = document.getElementById("inputBuscar");
    let valorBuscador;

    botonBuscador.addEventListener("click", () => {
        valorBuscador = inputBuscador.value || "a";
        window.location.href=`/producto/buscar/${ valorBuscador }`;
    })

    inputBuscador.addEventListener("keydown", ( event ) => {
        if( event.keyCode === 13 ){
            valorBuscador = inputBuscador.value || "a";
            window.location.href=`/producto/buscar/${ valorBuscador }`;
        }
    })
}

function funcionAbrirMenuResponsive(){
    let boton = document.getElementById("botonMenuResponsive");
    let menu = document.getElementsByClassName("menu")[0];

    boton.addEventListener("click", () => {
        if( menu.style.display === "none" || !menu.style.display ){
            menu.style.display = "block";
        }else{
            menu.style.display = "none"
        }
    })
}
/*
function funcionBuscarProducto(){
    let buscadorGeneral = document.getElementById("buscadorGeneral")
    let inputBuscar = document.getElementById("inputBuscar");
    
    buscadorGeneral.addEventListener("click", () => {
        funcionMostrarProducto( inputBuscar.value );
    });
}

function funcionMostrarProducto( dato ){

    console.log("llego")
    enviarPeticion("GET", `http://localhost:3000/producto/buscar/${ dato }`, ( resultado ) => {
        console.log(resultado);
    });

}
/*
function funcionSubirFoto(){
    let boton = document.getElementById("botonSubirFoto");
    let elementoImg = document.getElementById("imagenProducto");

    boton.addEventListener("click", ()=>{

        let formulario = document.getElementById("subirFoto");
        let formData = new FormData(formulario);

        let xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {

            if( this.readyState == 4 && this.status == 200 ){
                let respuesta = JSON.parse(this.responseText);

                elementoImg.src=respuesta.path;
            }
        }

        xhttp.open( "POST", "http://localhost:3000/aca" );
        xhttp.send(formData);
    })


}
*/
/*
function funcionSubirFoto( url ){
    let boton = document.getElementById("botonSubirFoto");
    let elementoImg = document.getElementById("imagenProducto");


    boton.addEventListener("click", ()=>{

        let formulario = document.getElementById("subirFoto");
        let formData = new FormData(formulario);

        console.log(formulario.action)

        let xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {

            if( this.readyState == 4 && this.status == 200 ){
                let respuesta = JSON.parse(this.responseText);

                elementoImg.src=respuesta.src;
            }else{
                console.log("error" +  this.responseText)
            }
        }

        xhttp.open( "POST", url );
        xhttp.send(formData);
    })


}

*/