// Funciones de vista
function funcionParaMostrarSubmenu(){
	let listSubmenu = document.getElementsByClassName('menu__submenu');
    
	for( let submenu of listSubmenu){

		submenu.previousElementSibling.addEventListener('click', ( ) => {
			if( submenu.style.display === 'none' || !submenu.style.display){
				submenu.style.display = 'block';
			}else{
				submenu.style.display = 'none';
			}        
		});
	}
}

function funcionParaQueElArticuloSeOpaqueYAparezcaMasInfo( ) {
	let elementoInteractivo = document.getElementsByClassName('producto__interaccionArticulo');

	for( let i = 0 ; i < elementoInteractivo.length; i++ ){
        
		//evento mouseenter, ocurre cuando el raton entra o esta encima del elemento
		elementoInteractivo[i].addEventListener('mouseenter', () => {
			let hijosDelElementoInteractivo = elementoInteractivo[i].children;

			hijosDelElementoInteractivo[0].style.opacity = 0.5;
			hijosDelElementoInteractivo[1].style.display = 'block';
		});  
    
		//evento mouseenter, ocurre cuando el raton sale o no esta encima del elemento
		elementoInteractivo[i].addEventListener('mouseleave', () => {
			let hijosDelElementoInteractivo = elementoInteractivo[i].children;
			hijosDelElementoInteractivo[0].style.opacity = 1;
			hijosDelElementoInteractivo[1].style.display = 'none';
		});
	}
}
function funcionAbrirMenuResponsive(){
	let boton = document.getElementById('botonMenuResponsive');
	let menu = document.getElementsByClassName('menu')[0];

	boton.addEventListener('click', () => {
		if( menu.style.display === 'none' || !menu.style.display ){
			menu.style.display = 'block';
		}else{
			menu.style.display = 'none';
		}
	});
}

function ocultarBotonAgregarProducto(){
	let botonAgregarProducto = document.getElementsByClassName('botonAgregarProducto');
	for( let i = 0; i < botonAgregarProducto.length ; i++ ){
		botonAgregarProducto[i].style.display = 'none';
	}
}
function mostrarBotonAgregarProducto(){
	let botonAgregarProducto = document.getElementsByClassName('botonAgregarProducto');
	for( let i = 0; i < botonAgregarProducto.length ; i++ ){
		botonAgregarProducto[i].style.display = 'inline-block';
	}
}
function eventoCambiarVistaProducto(){
	let botonVistaCuadricula = document.getElementById('botonVistaCuadricula');
	let botonVistaFila = document.getElementById('botonVistaFila');

	botonVistaCuadricula.addEventListener('click', () => {
		ponerProductosEnCuadricula();
	});
	botonVistaFila.addEventListener('click', () => {
		ponerProductosEnFila();
	});
}
function ponerProductosEnFila(){
	let productosDom = document.querySelectorAll('figure.producto');
	let img = document.querySelectorAll('.producto__img');
	let a = document.querySelectorAll('a.producto__interaccionArticulo');

	for( let i = 0; i < productosDom.length ; i++ ){
		productosDom[i].classList.remove('producto');
		productosDom[i].classList.add('productoFila');

		a[i].classList.add('productoFila__link');

		img[i].classList.remove('producto__img');
		img[i].classList.add('productoFila__link__img');
	}
	sessionStorage.vistaArticulos = 1;
	mostrarBotonAgregarProducto();

}
function ponerProductosEnCuadricula(){
	let productosDom = document.querySelectorAll('figure.productoFila');
	let img = document.querySelectorAll('img.productoFila__link__img');
	let a = document.querySelectorAll('a.productoFila__link');

	for( let i = 0; i < productosDom.length ; i++ ){
		productosDom[i].classList.remove('productoFila');
		productosDom[i].classList.add('producto');

		a[i].classList.remove('productoFila__link');

		img[i].classList.remove('productoFila__link__img');
		img[i].classList.add('producto__img');
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


function funcionMostrarYOcultarAyuda(){
	let botonMostrarYOcultar = document.getElementsByClassName('articuloAyuda__botonMostrar');
	let ayudaInf = document.getElementsByClassName('articuloAyuda__infoMostrar');


	for( let i=0; i < botonMostrarYOcultar.length; i++ ){

		ayudaInf[i].style.display='none';

		botonMostrarYOcultar[i].addEventListener('click', () => {
			if( ayudaInf[i].style.display === 'block'){
				ayudaInf[i].style.display='none';
			}else{
				ayudaInf[i].style.display='block';
			}
		});
	}
}

//FUNCIONes DE MODAL SUSTITUIDOS POR BOOTSTRAP
function funcionModal(){
	let abrirModalTelefonico = document.getElementsByClassName('abrirModalTelefonico');
	let abrirModalMediosDePago = document.getElementsByClassName('abrirModalMediosDePago');
	let abrirModalLogin = document.getElementsByClassName('abrirModalLogin');
	let abrirModalRegistrarse = document.getElementsByClassName('abrirModalRegistrarse');
	let modalMediosDePago = document.getElementById('modalMediosDePago');
	let modalTelefonico = document.getElementById('modalTelefonico');
	let modalLogin = document.getElementById('modalLogin');
	let modalRegistrarse = document.getElementById('modalRegistrarse');
	let botonCerrar = document.getElementsByClassName('modalVentana__cerrar');


	agregarEventoAlBotonAbrirYCerrarModal( abrirModalTelefonico, modalTelefonico );
	agregarEventoAlBotonAbrirYCerrarModal( abrirModalMediosDePago, modalMediosDePago );
	agregarEventoAlBotonAbrirYCerrarModal( abrirModalRegistrarse, modalRegistrarse );
	agregarEventoAlBotonAbrirYCerrarModal( abrirModalLogin, modalLogin );


	for( let i = 0 ; i < botonCerrar.length ; i++ ){
		botonCerrar[i].addEventListener('click', () => {
			//va a cerrar a poner el display none al abuelo del icono cerrar, en este caso seria el modal
			cerrarModal( botonCerrar[i].parentNode.parentNode);
		});
	}
    
    
}
function agregarEventoAlBotonAbrirYCerrarModal( botonModalArray, modal ){

	for( boton of botonModalArray ) {
		boton.addEventListener('click', () => {
			abrirModal(modal);

			cerrarModalCuandoSeClickeeAfueraDelModal(modal);
		});
	}
}
function abrirModal( modalAMostrar ){
	modalAMostrar.style.display = 'flex';
}
function cerrarModal( modalACerrar ) {
	modalACerrar.style.display = 'none';
}
function cerrarModalCuandoSeClickeeAfueraDelModal(modalACerrar){
	document.body.addEventListener('click', ( e ) => {
		if( modalACerrar === e.target ){
			cerrarModal( modalACerrar );
		}
	},false);
}

function mostrarCargando() {
	let spinner = document.getElementsByClassName('sk-chase')[0];
  
	spinner.style.display = 'block';
}
function ocultarCargando(posicion) {
	let spinner = document.getElementsByClassName('sk-chase')[0];
  
	spinner.style.display = 'none';
}