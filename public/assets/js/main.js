window.onload = () =>{

    funcionModal();
    funcionParaMostrarSubmenu();
    funcionBuscadorGeneral();
    funcionAbrirMenuResponsive();
    validarLogin();
    validarFormularioUsuario()
    cerrarSesion();
    actualizarCarrito();
}

let carrito = leerCarrito();

// ----------------------------------------FUNCIONES------------------------------------
//FUNCION DE MODAL
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


//FUNCION DE PRODUCTOS
function funcionBuscarProductoParaTabla() {
    let buscadorTabla = document.getElementById("buscarProducto");

    buscadorTabla.addEventListener("keypress", () => {
        if( buscadorTabla.value ){
            enviarPeticion("GET", `${ window.location.origin }/producto/admin/buscar/${ buscadorTabla.value }`, ( respuesta ) => {

            mostrarProductoEnTabla( respuesta.productos );
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
            <th class="tabla__campo tabla__campo--alignStart"><a href="product/profile/${ producto.idproducto }" class="tabla__campo__link">${ producto.nombre }</a></th>
            <th class="tabla__campo">${ producto.subcategoria.nombre }</th>
            <th class="tabla__campo tabla__campo--verde">${ producto.stock }</th>
            <th class="tabla__campo">$${ producto.precio }.00</th>
            <th class="tabla__campo">$${ producto.costo }.00</th>
            <th class="tabla__campo"><a href="/producto/actualizar/${ producto.idproducto }" class="tabla__campo__link">Editar</a> - <a href="/producto/borrar/${ producto.idproducto }" class="tabla__campo__link">Eliminar</a></th>
        </tr>`
    })
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
function funcionBuscadorGeneral(){
    let botonBuscador = document.getElementById("buscadorGeneral");
    let inputBuscador = document.getElementById("inputBuscar");
    let valorBuscador;

    botonBuscador.addEventListener("click", () => {
        valorBuscador = inputBuscador.value || -1;
        window.location.href=`/producto/buscar/palabra=${ valorBuscador }/idcat=-1/idsub=-1/idmarca=-1/orden=-1`;
    })

    inputBuscador.addEventListener("keydown", ( event ) => {
        if( event.keyCode === 13 ){
            valorBuscador = inputBuscador.value || -1;
            window.location.href=`/producto/buscar/palabra=${ valorBuscador }/idcat=-1/idsub=-1/idmarca=-1/orden=-1`;
        }
    })
}
function copiarEnlace(){
    let botonCopiarEnlace = document.getElementById("botonCopiarEnlace");
    let modalCopiarEnlace = document.getElementById("modalCopiarEnlace");

    botonCopiarEnlace.addEventListener("click", () => {
        navigator.clipboard.writeText( window.location.href ).then( 
            () => {
                modalCopiarEnlace.childNodes[1].innerHTML = "ENLACE COPIADO"
                abrirModal( modalCopiarEnlace );
                cerrarModalCuandoSeClickeeAfueraDelModal( modalCopiarEnlace );
            },() => {
                modalCopiarEnlace.childNodes[1].innerHTML = "NO SE PUDO COPIAR EL ENLACE, HACERLO MANUALMENTE"
                abrirModal( modalCopiarEnlace );
                cerrarModalCuandoSeClickeeAfueraDelModal( modalCopiarEnlace );
            })
    })
}
function filtrarCategoria( idCategoria, arraySubcategoria ){

    //comparamos el atributo personalizado "categoria" de los elementos option(subcategoria) 
    //con el parametro idCategoria q recibimos, si es el mismo mostramos la opcion(block)
    //y si no la ocultamos(none)
    for( let i = 0; i < arraySubcategoria.length; i++ ){
        if( arraySubcategoria[i].dataset.categoria === idCategoria ){
            arraySubcategoria[i].style.display = "block";
        }else{
            arraySubcategoria[i].style.display = "none";
        }
    }
}
function ordenarProductos(){
    let opcionOrdenar = document.getElementById("ordenar");

    opcionOrdenar.addEventListener("input", ( e ) => {
        if( e.target.value != "" )
        window.location.href = `${ window.location.origin}${ e.target.value }`;
    })
}
function eventoCategoria() {
    let selectCategoria = document.getElementById("categoria");

    let idCategoria = selectCategoria.value;
    let arraySubcategoria = document.getElementsByClassName("subcategoria");
    filtrarCategoria( idCategoria, arraySubcategoria )

    selectCategoria.addEventListener("change", ( e ) => {
  
        let idCategoria = selectCategoria.value;
        let arraySubcategoria = document.getElementsByClassName("subcategoria");
        filtrarCategoria( idCategoria, arraySubcategoria )

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

//FUNCION DE USUARIOS
function funcionBuscarUsuario () {
    let buscador = document.getElementById("buscarUsuario");

    buscador.addEventListener("keydown", () => {
        if( buscador.value ){
            enviarPeticion("GET", `${ window.location.origin }/usuario/buscar/${ buscador.value }`, ( respuesta ) => {
                let usuarioArray = respuesta.usuarios;

                mostrarUsuarioEnTabla( usuarioArray );
            })
        }       
    }, false)

}
function mostrarUsuarioEnTabla( usuarioArray ){
    let tablaUsuario = document.getElementById("tablaUsuario");
    tablaUsuario.innerHTML = "";

    usuarioArray.forEach( ( usuario, index ) => {
        tablaUsuario.innerHTML += 
        `<tr class="tabla__fila">
            <th class="tabla__campo">${ usuario.idusuario }</th>
            <th class="tabla__campo tabla__campo--alignStart">${ usuario.nombre}</th>
            <th class="tabla__campo tabla__campo--verde">${ usuario.estado }</th>
            <th class="tabla__campo">${ usuario.email }</th>
            <th class="tabla__campo">0</th>
            <th class="tabla__campo"><a href="/usuario/perfil/${ usuario.idusuario }" class="tabla__campo__link">Mas info</a></th>
        </tr>`
    })
}


//FUNCIONES DE VISTAS, RESPONSIVE
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
function funcionParaQueElArticuloSeOpaqueYAparezcaMasInfo( ) {
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

function ocultarBotonAgregarProducto(){
    let botonAgregarProducto = document.getElementsByClassName("botonAgregarProducto");
    for( let i = 0; i < botonAgregarProducto.length ; i++ ){
        botonAgregarProducto[i].style.display = "none";
    }
}
function mostrarBotonAgregarProducto(){
    let botonAgregarProducto = document.getElementsByClassName("botonAgregarProducto");
    for( let i = 0; i < botonAgregarProducto.length ; i++ ){
        botonAgregarProducto[i].style.display = "inline-block";
    }
}
function eventoCambiarVistaProducto(){
    let botonVistaCuadricula = document.getElementById("botonVistaCuadricula");
    let botonVistaFila = document.getElementById("botonVistaFila");

    botonVistaCuadricula.addEventListener("click", () => {
        ponerProductosEnCuadricula()
    })
    botonVistaFila.addEventListener("click", () => {
        ponerProductosEnFila()
    })
}
function ponerProductosEnFila(){
    let productosDom = document.querySelectorAll("figure.producto");
    let img = document.querySelectorAll(".producto__img")
    let a = document.querySelectorAll("a.producto__interaccionArticulo");

    for( let i = 0; i < productosDom.length ; i++ ){
        productosDom[i].classList.remove("producto");
        productosDom[i].classList.add("productoFila");

        a[i].classList.add("productoFila__link");

        img[i].classList.remove("producto__img");
        img[i].classList.add("productoFila__link__img");
    }
    sessionStorage.vistaArticulos = 1;
    mostrarBotonAgregarProducto()

}
function ponerProductosEnCuadricula(){
    let productosDom = document.querySelectorAll("figure.productoFila");
    let img = document.querySelectorAll("img.productoFila__link__img")
    let a = document.querySelectorAll("a.productoFila__link");

    for( let i = 0; i < productosDom.length ; i++ ){
        productosDom[i].classList.remove("productoFila");
        productosDom[i].classList.add("producto");

        a[i].classList.remove("productoFila__link");

        img[i].classList.remove("productoFila__link__img");
        img[i].classList.add("producto__img");
    }

    sessionStorage.vistaArticulos = 2;
    ocultarBotonAgregarProducto();
}
function leerVistaDeArticulos(){
    let vistaArticulos = Number(sessionStorage.vistaArticulos);
    if( vistaArticulos === 1 ){
        ponerProductosEnFila();
    }
}

function mostrarCargando(){
    let spinner = document.getElementsByClassName('sk-chase')[0];

    spinner.style.display="block"
}
function ocultarCargando( posicion ){
    let spinner = document.getElementsByClassName('sk-chase')[0];

    spinner.style.display="none"
}

//FUNCION DE VALIDACIONES
function validarFormularioProducto(){
    let formulario = document.getElementById("productForm");
    let elementoNombre = document.getElementById("nombre");
    let elementoCodigo = document.getElementById("codigo");
    let elementoGarantia = document.getElementById("garantia");
    let elementoStock = document.getElementById("stock");
    let elementoPrecio = document.getElementById("precio");
    let elementoCosto = document.getElementById("costo");
    let elementoSubcategoria = document.getElementById("subcategoria");
    let elementoMarca = document.getElementById("marca");
    let elementoProveedor = document.getElementById("proveedor");


    elementoNombre.addEventListener("keyup", ( e ) => {
        validarNombre( elementoNombre );
    })
    elementoCodigo.addEventListener("keyup", ( e ) => {
        validarCampoComun( elementoCodigo )
    })
    elementoGarantia.addEventListener("keyup", ( e ) => {
        validarCampoComun( elementoGarantia )
    })
    elementoStock.addEventListener("keyup", ( e ) => {
        validarCampoNumero( elementoStock );
    })
    elementoPrecio.addEventListener("keyup", ( e ) => {
        validarCampoNumero( elementoPrecio );
    } )
    elementoCosto.addEventListener("keyup", ( e ) => {
        validarCampoNumero( elementoCosto );
    } )
    elementoSubcategoria.addEventListener("change", ( e ) => {
        validarCampoNumero( elementoSubcategoria );
    } )
    elementoMarca.addEventListener("change", ( e ) => {
        validarCampoNumero( elementoMarca );
    } )
    elementoProveedor.addEventListener("change", ( e ) => {
        validarCampoNumero( elementoProveedor );
    } );


    formulario.addEventListener("submit", ( e ) => {
        e.preventDefault();

        let nombreValido = validarNombre( elementoNombre );
        let codigoValido = validarCampoComun( elementoCodigo )
        let garantiaValido = validarCampoComun( elementoGarantia )
        let stockValido = validarCampoNumero( elementoStock );
        let precioValido = validarCampoNumero( elementoPrecio );
        let costoValido = validarCampoNumero( elementoCosto );
        let subcategoriaValido = validarCampoNumero( elementoSubcategoria );
        let marcaValido = validarCampoNumero( elementoMarca );
        let proveedorValido = validarCampoNumero( elementoProveedor );
        
        if( nombreValido && codigoValido && garantiaValido && stockValido && precioValido && costoValido && subcategoriaValido && marcaValido && proveedorValido ){
            formulario.submit();
        }

    })

}
function validarFormularioUsuario(){
    let formulario = document.getElementById("usuarioForm");
    let elementoNombre = document.getElementById("nombre");
    let elementoApellido = document.getElementById("apellido");
    let elementoTelefono = document.getElementById("telefono");
    let elementoDocumento = document.getElementById("documento");
    let elementoEmail = document.getElementById("email");

    if( !formulario ){
        return
    }
    elementoNombre.addEventListener("keyup", ( e ) => {
        validarCampoComun( elementoNombre );
    })
    elementoApellido.addEventListener("keyup", ( e ) => {
        validarCampoComun( elementoApellido )
    })
    elementoTelefono.addEventListener("keyup", ( e ) => {
        validarCampoNumero( elementoTelefono );
    })
    elementoDocumento.addEventListener("keyup", ( e ) => {
        validarCampoNumero( elementoDocumento );
    } )
    elementoEmail.addEventListener("keyup", ( e ) => {
        validarEmail( elementoEmail );
    } )



    formulario.addEventListener("submit", ( e ) => {
        e.preventDefault();

        let nombreValido = validarCampoComun( elementoNombre );
        let apellidoValido = validarCampoComun( elementoApellido )
        let telefonoValido = validarCampoNumero( elementoTelefono );
        let documentoValido = validarCampoNumero( elementoDocumento );
        let emailValido = validarEmail( elementoEmail );
        if( nombreValido && apellidoValido && telefonoValido && documentoValido && emailValido ){
            formulario.submit();
        }

    })

}
function validarNombre( elementoNombre ) {
    let valor = elementoNombre.value;
    let errorMsj = "";

    if( excedeLongitud( valor, 5, 200 ) ){ 
        ponerInputEnColorRojo( elementoNombre );
        return false
    }
    ponerInputEnColorNormal(elementoNombre)
    return true
}
function validarEmail( elementoEmail ) {
    let valor = elementoEmail.value;
    let regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if( estaVacio(valor) ){
        ponerInputEnColorRojo( elementoEmail );
        return false
    }
    if( !regex.test( email ) ){
        ponerInputEnColorRojo( elementoEmail );
        return false
    };
    
    ponerInputEnColorNormal(elementoEmail);
    return true;
}
function validarCampoComun( elementoCodigo ) {
    let valor = elementoCodigo.value;
    let errorMsj = "";

    if( excedeLongitud( valor,  1, 45 ) ){
        ponerInputEnColorRojo( elementoCodigo );
        return false
    }
    ponerInputEnColorNormal(elementoCodigo);
    return true
}
function ponerInputEnColorRojo( input ){
    input.style.borderBottom = "2px solid red ";
    input.style.background = "#f0bfbb";
}
function ponerInputEnColorNormal( input ){
    input.style.borderBottom = "2px solid rgb(116, 114, 114)";
    input.style.background = "#eeeeee";
}
function validarCampoNumero( elementoCodigo ) {
    let valor = elementoCodigo.value;
    let errorMsj = "";

    if( estaVacio(valor)){
        ponerInputEnColorRojo( elementoCodigo );
        return false;
    }
    if( isNaN(Number(valor)) ){
        ponerInputEnColorRojo( elementoCodigo );
        return false;
    }

    ponerInputEnColorNormal( elementoCodigo );
    return true;
}

function estaVacio( campo ) {
    if( campo.trim() === '' ){
        return true;
    }

    return false;
}

function excedeLongitud( campo, min, max ){
    if( campo.length < min || campo.length > max ){
        return true;
    }
    return false;
}

//FUNCION DE LOGUEO
function validarLogin(){
    let formulario = document.getElementById("loginForm");
    let elementoEmail = document.getElementById("emailLogin");

    //si no existe el formulario, terminar funcion
    if( !formulario ){
        return;
    }
    formulario.addEventListener("submit", ( e ) => {
        e.preventDefault();
        let regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;

        if( estaVacio( elementoEmail.value )){
            return;
        }
        if( !regex.test( elementoEmail.value ) ){
            return;
        };

        enviarAutenticacion( formulario )

    })
}
function almacenarToken( token ){
    document.cookie = `token=${ token }; path=/`;
}
function cerrarSesion(){
    let botonCerrarSesion = document.getElementById("botonCerrarSesion");

    if( !botonCerrarSesion ){
        return;
    }

    botonCerrarSesion.addEventListener("click", ( e ) => {
        borrarToken();
        window.location.href = `${ window.location.origin }/`;
    })
}
function borrarToken(){
    document.cookie = `token=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

async function enviarAutenticacion( formulario ) {
    let formData = new FormData( formulario );
    let mensajeLogin = document.getElementById("mensajeLogin");
    mensajeLogin.innerHTML = '';

    const miPeticion =  new Request("/login", {
        method: "POST",
        body: formData
    })

    mostrarCargando()
    let resultado = await fetch(miPeticion)
    let respuesta = await resultado.json();

    setTimeout(() => {

        ocultarCargando();
        if( resultado.status === 400 ){
            mensajeLogin.innerHTML = respuesta.message;
            return;
        }
        
        mensajeLogin.innerHTML = "<i class='fas fa-check-circle icono'></i>";
        almacenarToken( respuesta.token );
        window.location.reload();

    }, 2000)

}


//FUNCIONES CARRITO
function leerCarrito(){
    if( !localStorage.carrito ){
        return new Carrito([], 0, 0)
    }else{
        let carritoObj = JSON.parse(localStorage.carrito);
        return new Carrito(carritoObj.productos, carritoObj.total, carritoObj.cantidad )
    }
}
function guardarCarrito( carrito ){
    let carritoJSON = JSON.stringify( carrito );

    localStorage.carrito = carritoJSON;
}
function actualizarCarrito(){
    let total = document.getElementById("total");
    total.innerHTML = `( ${ carrito.cantidad } )  $${ carrito.total }.00`
}
function eventoAñadirProducto(){
    const botonAgregarProducto = document.getElementsByClassName("botonAgregarProducto");

    for( let i = 0; i < botonAgregarProducto.length ; i++ ){
        botonAgregarProducto[i].addEventListener("click", ( e ) => {
            const productoDOM = e.target.parentNode.parentNode;
            const producto = carrito.leerProducto( productoDOM );
            carrito.añadirProducto( producto );
            guardarCarrito( carrito );
            actualizarCarrito();
        })
    }

}
function mostrarProductosDelCarrito(){
    const productos = carrito.productos;
    let listaCarrito = document.getElementById("listaCarrito");
    let subtitular = document.getElementById("subtitular");
    let interfazComprar = document.getElementById("interfazComprar");
    if( productos.length === 0 ){
        subtitular.innerHTML = `<i class="fa fa-times-circle icono"></i>No hay producto en el carrito`
        return;
    }

    //mostramos los productos del carrito
    listaCarrito.innerHTML = `<a id="botonVaciarCarrito" class="producto__interaccionArticulo"><i class="textoRojo fa fa-times-circle"></i>Vaciar Carrito</a>`;
    for( let i = 0; i < productos.length; i++ ){
        listaCarrito.innerHTML +=   `<figure class="productoEstandar productoFila">
                                        <a href="/product/profile/${ productos[i].id }" class="producto__interaccionArticulo productoFila__link">
                                            <img src="${ productos[i].img }" class="productoFila__link__img" name="imgProducto">
                                            <h4 name="nombreProducto" data-id=${ productos[i].id }>${ productos[i].nombre }</h4>
                                        </a>
                                        <figcaption class="productoFila__detalle">
                                            <h4>P.Unitario: $<span name="precioProducto">${ productos[i].precio }</span>.00</h4>
                                            <h4>Cantidad: ${ productos[i].cantidad }</h4>
                                            <h4>P.Total: <span class="textoRojo">$${ productos[i].precio * productos[i].cantidad }.00</span></h4>
                                            <a class="tabla__campo__link botonEliminarProducto"><i class="fa fa-times-circle textoRojo"></i>Eliminar Producto</a>
                                        </figcaption>
                                    </figure>`
    }

    //mostramos la insterfaz para confirmar la compra
    interfazComprar.innerHTML = `<section>
                                    <h2>Medios de pago</h2>
                                    <br/>
                                    <input type="radio" name="medio_pago" value="1" form="carritoForm" checked/>
                                    <label>Efectivo</label>
                                    <br/>
                                    <br/>
                                    <input type="radio" name="medio_pago" value="1" form="carritoForm"/>
                                    <label>Transferencia</label>
                                    <br/>
                                    <br/>
                                    <input type="radio" name="medio_pago" value="1" form="carritoForm"/>
                                    <label>Mercado Pago</label>
                                </section>
                                <section>
                                    <h2>Informacion del carrito</h2>
                                    <br/>
                                    <h4 class="textoRojo">Total: $${carrito.total}.00</h4>
                                    <br/>
                                    Cantidad de componentes: ${carrito.cantidad}
                                </section>
                                <section>
                                    <form id="carritoForm" action="/pedido/crear" method="post">
                                        <button type="submit" class="campoBoton campoBoton--verdeOscuro">Confirmar compra</button>
                                    </form>
                                </section>`


}
function eventoEliminarProducto(){
    const botonEliminarProducto = document.getElementsByClassName("botonEliminarProducto");

    for( let i = 0; i < botonEliminarProducto.length ; i++ ){
        botonEliminarProducto[i].addEventListener("click", ( e ) => {
            const productoDOM = e.target.parentNode.parentNode;
            const producto = carrito.leerProducto( productoDOM );

            carrito.eliminarProducto( producto );
            guardarCarrito( carrito );
            actualizarCarrito();

            window.location.reload();

        })
    }
}
function eventoVaciarCarrito(){
    const botonVaciarCarrito = document.getElementById("botonVaciarCarrito");

    if( !botonVaciarCarrito ){
        return;
    }

    botonVaciarCarrito.addEventListener("click", () => {
        localStorage.removeItem("carrito");
        window.location.reload();
    })
}

function eventoEnviarCarrito(){
    let carritoForm = document.getElementById("carritoForm");

    if( !carritoForm ){
        return;
    }
    carritoForm.addEventListener("submit", async ( e ) => {
        e.preventDefault();

        //Agregamos al formulario un valor que va a especificar si quiere o no el envio
        // y otro valor que va a ser los productos del carrito pero transformado a un string
        let objetoFormulario = new FormData( carritoForm );

        objetoFormulario.append("envio", "false");
        objetoFormulario.append("productos", JSON.stringify(carrito.productos));

        //Si el usuario no tiene el token no esta logueado, abrir ventana de logueo
        if( leerCookie('token') === null  ){
            abrirModal( document.getElementById("modalLogin") );
            return;
        }
        
        
        let miPeticion = new Request("/pedido/crear", {
            method : "POST",
            body: objetoFormulario
        });

        let resultado = await fetch(miPeticion);
        let respuesta = await resultado.json();
        
        //vaciamos el carrito, ya que ya se compraron los productos
        localStorage.removeItem("carrito");

        window.location.href=`/pedido/${ respuesta.idPedido }`;


    })
}

//funcion para leerCookie
function leerCookie(nombre) {
    var nombreIgual = nombre + "=";
    var ca = document.cookie.split(';');

    for(var i=0;i < ca.length;i++) {
        var c = ca[i];

        while (c.charAt(0)==' ') 
            c = c.substring(1,c.length);

        if (c.indexOf(nombreIgual) == 0) 
            return c.substring(nombreIgual.length,c.length);

    }
    return null;
}