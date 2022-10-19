let componentesPc = [
	{
		nombre: 'Procesador',
		categoria: 2,
		subcategoria: -1,
		marca: -1,
		palabra: -1,
		producto: '',
		requerido: true,
		icono: 'iconoProcesador.png'
	},
	{
		nombre: 'Cooler',
		categoria: 7,
		subcategoria: -1,
		marca: -1,
		palabra: -1,
		producto: '',
		requerido: false,
		icono: 'iconoCooler.png'
	},
	{
		nombre: 'Placa Madre',
		categoria: 3,
		subcategoria: -1,
		marca: -1,
		palabra: -1,
		producto: '',
		requerido: true,
		icono: 'iconoMother.png'
	},
	{
		nombre: 'Memoria RAM 1',
		categoria: 4,
		subcategoria: 7,
		marca: -1,
		palabra: -1,
		producto: '',
		requerido: true,
		icono: 'iconoRam.png'
	},
	{
		nombre: 'Memoria RAM 2',
		categoria: 4,
		subcategoria: 7,
		marca: -1,
		palabra: -1,
		producto: '',
		requerido: false,
		icono: 'iconoRam.png'
	},
	{
		nombre: 'Placa de video',
		categoria: 5,
		subcategoria: -1,
		marca: -1,
		palabra: -1,
		producto: '',
		requerido: false,
		icono: 'iconoGPU.png'
	},
	{
		nombre: 'Almacenamiento 1',
		categoria: 6,
		subcategoria: 12,
		marca: -1,
		palabra: -1,
		producto: '',
		requerido: false,
		icono: 'iconoDisco.png'
	},
	{
		nombre: 'Almacenamiento 2',
		categoria: 6,
		subcategoria: 13,
		marca: -1,
		palabra: -1,
		producto: '',
		requerido: false,
		icono: 'iconoDisco.png'
	},
	{
		nombre: 'Fuente',
		categoria: 8,
		subcategoria: -1,
		marca: -1,
		palabra: -1,
		producto: '',
		requerido: true,
		icono: 'iconoFuente.png'
	},
	{
		nombre: 'Gabinete',
		categoria: 9,
		subcategoria: -1,
		marca: -1,
		palabra: -1,
		producto: '',
		requerido: true,
		icono: 'iconoGabinete.png'
	},
	{
		nombre: 'Teclado',
		categoria: 15,
		subcategoria: -1,
		marca: -1,
		palabra: -1,
		producto: '',
		requerido: false,
		icono: 'iconoTeclado.png'
	},
	{
		nombre: 'Mouse',
		categoria: 16,
		subcategoria: -1,
		marca: -1,
		palabra: -1,
		producto: '',
		requerido: false,
		icono: 'iconoMouse.png'
	},
	{
		nombre: 'Monitor',
		categoria: 21,
		subcategoria: -1,
		marca: -1,
		palabra: -1,
		producto: '',
		requerido: false,
		icono: 'iconoMonitor.png'
	}
];

let paso = -1;



//Elegir marca
function elegirMarca(){
	let arrayMarca = document.getElementsByClassName('marcaLogo');

	for( let i = 0; i < arrayMarca.length; i++ ){

		arrayMarca[i].addEventListener('click', ( e ) => {
			//modificamos la marca del componentePc[0] (procesador) y la subcategoria del componentesPc[2] (placa madre) para que sean de acuerdo a la marca que eligio
			componentesPc[0]['marca'] = Number(e.target.dataset.marca);
			componentesPc[2]['subcategoria'] = Number(e.target.dataset.subcategoria);

			siguienteComponente();
		});
	}
}

//siguiente componente a elegir
async function siguienteComponente(){
	cargarVistaComponentesSeleccionados();

	//aumentar componente ++
	paso ++;

	if( paso === componentesPc.length ){
		agregarComponentesAlCarrito();
		return;
	}

	//actualizar la vista del total y del paso
	cambiarPasoYTotal();

	//consultar
	const productosDB = await consultarProductos();

	//mostrar animacion
	mostrarAnimacionCargando();

	//ocultar animacion y mostrar los productos despues de 0.25 segundos
	setTimeout(() => {
		//cargarVistaComponentesAElegir
		cargarVistaComponentesAElegir( productosDB );

		//Poner evento de a los botones de agregarComponente
		agregarComponente();

		//agrega el evento modificar Componente
		modificarComponente();
	}, 250);


}
function cargarVistaComponentesSeleccionados(){
	const infoArmado = document.getElementsByClassName('infoArmado')[0];
    
	infoArmado.innerHTML = `
    <article class="d-flex align-items-center my-3 p-2 border-bottom">
        <img src="/assets/img/${componentesPc[0].icono}" class="img-small me-3">
        <div>
            <h6 id="infoPaso" class='mb-0'>Paso 1 de 14</h6>
            <p class='mb-0'>Total acumulado</p>
            <h5 class="textoVerdeOscuro mb-0" id="totalComponentes">ARS 0.00</h5>
        </div>
    </article>
    <h5 class="textoVerdeOscuro text-center my-5">COMPONENTES AGREGADOS</h5>
    `;

	for( let i = 0; i < componentesPc.length; i++ ){
		if( componentesPc[i].producto === ''){
			infoArmado.innerHTML += `
            <article class="d-flex align-items-center my-3 p-2 border-bottom paso">
                <img src="/assets/img/${componentesPc[i].icono}" class="img-small me-3"/>
                <div class='textoInstructivo'>
                    <h6 class='mb-1'>${componentesPc[i].nombre}</h6>
                    <p class="my-0">Todavia no seleccionaste tu ${componentesPc[i].nombre}</p>
                </div>
            </article>
            `;
		}else{
			infoArmado.innerHTML += `
            <article class="d-flex align-items-center my-3 p-2 border-bottom paso">
                <img src="${componentesPc[i].producto.img}" class="img-small me-3"/>
                <div>
                    <h6>${componentesPc[i].producto.nombre}</h6>
                    <p class="my-2 textoVerdeOscuro h5">ARS ${componentesPc[i].producto.precio}.00</p>
                    <a class="modificarComponente text-danger font-weight-bold" data-paso="${i}">
                        <i class='fas fa-marker'></i>
                        Modificar
                    </a>
                </div>
            </article>
            `;
		}

	}
}
//calcular total de los componentes
function calcularPrecioTotalDeComponentes() {
	let total = 0;

	for( let i = 0; i < componentesPc.length ; i++){
		//si no existe el producto es porque no hay producto seleccionado, por lo tanto no se le suma el precio
		if( componentesPc[i].producto === ''){
			continue;
		}

		total += componentesPc[i].producto.precio;
	}

	return total;
}
//modifica el paso y el total
function cambiarPasoYTotal(){
	//cambiamos y ponemos 'Estas en este paso'
	let pasoHTML = document.getElementsByClassName('paso')[paso];
	let cajaTexto = pasoHTML.getElementsByClassName('textoInstructivo')[0];
	cajaTexto.innerHTML = '<h5 class="textoVerdeOscuro">Estas en este paso</h5>';

	// ponemos el fondo verde

	//cambiamos Paso x de x
	infoPaso = document.getElementById('infoPaso');
	infoPaso.innerHTML = `Paso ${paso + 1} de ${componentesPc.length + 1}`;

	//cambiamos total
	let total = calcularPrecioTotalDeComponentes();
	document.getElementById('totalComponentes').innerHTML = `ARS ${total}.00`;

}
//realiza una peticion y trae los productos para ser elegidos por el usuario
async function consultarProductos(){
	let resultado = await fetch(`/producto/buscar/palabra=${componentesPc[paso].palabra}/idcat=${componentesPc[paso].categoria}/idsub=${componentesPc[paso].subcategoria}/idmarca=${componentesPc[paso].marca}/orden=ASC?JSON=true`);
	let respuesta = await resultado.json();

	const productosDB = respuesta.productos;
    
	return productosDB;
}
//Cargar productos en la pagina
function cargarVistaComponentesAElegir( productosDB ){
	let listaProducto = document.getElementsByClassName('listaProducto')[0];
    
	//muestra el titular y el spinner
	listaProducto.innerHTML = `
    <article class="col-12 d-flex align-items-center my-1 p-2">
        <img src="/assets/img/${componentesPc[paso].icono}" class="img-small me-3">
        <div>
            <h4>Seleccioná tu ${componentesPc[paso].nombre}</h4>
        </div>
    </article>
    `;
	//Si no es requerido el componente, agregar opcion saltar paso
	if( !componentesPc[paso].requerido ){
		listaProducto.innerHTML += `
        <article class="col-12 col-lg-6 d-flex flex-column flex-md-row align-items-center my-1 p-2 border">
            <img src="/assets/img/producto/no-imagen.jpg" class="img-mediano me-md-3"/>
            <div class='text-center text-md-start'>
                <h6 class="my-1 nombre">No agregar ${componentesPc[paso].nombre}</h6>
                <p class="my-2 textoVerdeOscuro h4">ARS <span class="precio">0</span></p>
                <button class="seleccionarComponente btn btn-violeta" data-id='-1'>Elegir</button>
            </div>
        </article>
        `;
	}


	//muestra los productos traidos de la base de datos
	for(let i = 0; i < productosDB.length; i++ ){
		listaProducto.innerHTML += `
        <article class="col-12 col-lg-6 d-flex flex-column flex-md-row align-items-center my-1 p-2 border">
            <img src="/assets/img/producto/${productosDB[i].img}" class="img-mediano me-md-3"/>
            <div class='text-center text-md-start'>
                <h6 class="my-1 nombre">${productosDB[i].nombre}</h6>
                <p class="my-2 textoVerdeOscuro h4">ARS <span class="precio">${productosDB[i].precio}</span></p>
                <button class="seleccionarComponente btn btn-violeta" data-id='${productosDB[i].idproducto}'>Elegir</button>
            </div>
        </article>
        `;
	}
}
//cargamos el evento click a los botones que agrega el Componente seleccionado
function agregarComponente( ){
	const botonesSeleccionarComponente = document.getElementsByClassName('seleccionarComponente');
    
	for( let i = 0; i< botonesSeleccionarComponente.length ; i++ ){
		botonesSeleccionarComponente[i].addEventListener('click', ( e ) =>{
			let elementoPadre = e.target.parentNode.parentNode;

			let componente = {
				id: Number(e.target.dataset.id),
				nombre: elementoPadre.querySelector('.nombre').innerHTML,
				precio: Number(elementoPadre.querySelector('.precio').innerHTML),
				img: elementoPadre.querySelector('img').src
			};

			//agregamos el componente seleccionado al usuario en el array de componentesPc
			componentesPc[paso]['producto'] = componente;
            
			//continuamos con el siguiente paso
			siguienteComponente();
		});
	}
}

//cargamos el evento click a los botones que modifica el Componente seleccionado
function modificarComponente(){
	const botonesModificarComponentes = document.getElementsByClassName('modificarComponente');

	for( let i = 0; i < botonesModificarComponentes.length ; i ++ ){
		botonesModificarComponentes[i].addEventListener('click', async ( e ) => {
			let pasoAModificar = e.target.dataset.paso;

			//borra todos los componentes elegidos que estan despues del que se quiere modificar ( poniendolos en "" )
			for ( let j = pasoAModificar; j < componentesPc.length ; j++ ){
				componentesPc[j]['producto'] = '';
			}

			//ponemos la variable paso, en el paso que queremos modificar -1 para ejecutar la funcion siguienteComponente
			paso = pasoAModificar - 1;

			siguienteComponente();  
		});
	}
}

function mostrarAnimacionCargando(){
	let listaProducto = document.getElementsByClassName('listaProducto')[0];

	listaProducto.innerHTML = `
    <div class="sk-chase" style="display:block">
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
    </div>
    `;
}

function agregarComponentesAlCarrito(){
	for( let i = 0; i < componentesPc.length; i++ ){
		// si es verdadero, el componente esta vacio
		if( componentesPc[i].producto.id === -1 || componentesPc[i].producto === '' ){
			continue;
		}

		carrito.añadirProducto( componentesPc[i].producto );
		guardarCarrito( carrito );
	}

	window.location.href = `${window.location.origin}/carrito`;
}

cargarVistaComponentesSeleccionados();
elegirMarca();