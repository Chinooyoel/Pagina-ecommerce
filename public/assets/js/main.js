window.onload = () => {
	funcionBuscadorGeneral();
	cerrarSesion();
	actualizarCarrito();
};

let carrito = leerCarrito();


// -------------------------------------------------- FUNCIONES DE PRODUCTOS--------------------------------------------
function funcionBuscarProductoParaTabla() {
	let buscadorTabla = document.getElementById('buscarProducto');

	buscadorTabla.addEventListener(
		'submit',
		(e) => {
			e.preventDefault();

			//obtenemos el valor del campo
			const valorDelBuscador = obtenerCampoDeFormulario(
				buscadorTabla,
				'nombre'
			);

			if (valorDelBuscador) {
				enviarPeticion(
					'GET',
					`${window.location.origin}/producto/admin/buscar/${valorDelBuscador}`,
					(respuesta) => {
						mostrarProductoEnTabla(respuesta.productos);
					}
				);
			}
		},
		false
	);
}
function mostrarProductoEnTabla(productoArray) {
	let tablaProducto = document.getElementById('tablaProducto');
	tablaProducto.innerHTML = '';

	//si no hay productos traidos de la DB
	if (productoArray.length === 0) {
		return (tablaProducto.innerHTML += '<th colspan="7">No hay resultados de la busqueda</th>');
	}

	productoArray.forEach((producto, index) => {
		tablaProducto.innerHTML += `<tr>
            <th class="d-none d-md-table-cell">${index + 1}</th>
            <th><a href="/producto/perfil/${producto.idproducto}">${
	producto.nombre
}</a></th>
            <th class="d-none d-md-table-cell">${
	producto.subcategoria.nombre
}</th>
            <th>${producto.stock}</th>
            <th>$${producto.precio}</th>
            <th class="d-none d-md-table-cell">$${producto.costo}</th>
            <th>
                <a href="/producto/actualizar/${
	producto.idproducto
}" class="btn btn-violeta">Editar</a>
        </tr>`;
	});
}

function funcionMostrarFoto() {
	let botonInputFileEstilizado = document.getElementById(
		'botonInputFileEstilizado'
	);
	let inputFile = document.getElementById('elegirFoto');
	let output = document.getElementById('imagenProducto');

	botonInputFileEstilizado.addEventListener('click', () => {
		inputFile.click();
	});

	inputFile.addEventListener('change', (event) => {
		let readerFile = new FileReader();

		readerFile.onload = (e) => {
			output.src = e.target.result;
		};

		readerFile.readAsDataURL(event.target.files[0]);
	});
}

//funcion para el buscador de productos
// -------------------------------------------------- FUNCIONES DEL BUSCADOR GENERAL --------------------------------------------
function funcionBuscadorGeneral() {
	const buscadoresGenerales =
    document.getElementsByClassName('buscadorGeneral');
	let valorBuscador;

	//recorremos los buscadores
	for (let i = 0; i < buscadoresGenerales.length; i++) {
		buscadoresGenerales[i].addEventListener('submit', (e) => {
			e.preventDefault();

			//obtemos el valor del campo nombre
			const palabra = obtenerCampoDeFormulario(
				buscadoresGenerales[i],
				'palabra'
			);

			//Si no hay escrito nada en el input, mandamos -1
			valorBuscador = palabra || -1;

			//buscamos el valor
			window.location.href = `/producto/buscar/palabra=${valorBuscador}/idcat=-1/idsub=-1/idmarca=-1/orden=-1`;
		});
	}
}

function obtenerCampoDeFormulario(formularioDOM, name) {
	//Creamos un objeto a partir del formulario que quizo ser enviado
	const formulario = new FormData(formularioDOM);

	//obtenemos el valor del input que tiene el valor de name
	const valorDelCampo = formulario.get(`${name}`);

	return valorDelCampo;
}

function copiarEnlace() {
	let botonCopiarEnlace = document.getElementById('botonCopiarEnlace');
	let modalCopiarEnlace = document.getElementById('modalCopiarEnlace');

	botonCopiarEnlace.addEventListener('click', () => {
		navigator.clipboard.writeText(window.location.href).then(
			() => {
				modalCopiarEnlace.childNodes[1].innerHTML = 'ENLACE COPIADO';
				abrirModal(modalCopiarEnlace);
				cerrarModalCuandoSeClickeeAfueraDelModal(modalCopiarEnlace);
			},
			() => {
				modalCopiarEnlace.childNodes[1].innerHTML =
          'NO SE PUDO COPIAR EL ENLACE, HACERLO MANUALMENTE';
				abrirModal(modalCopiarEnlace);
				cerrarModalCuandoSeClickeeAfueraDelModal(modalCopiarEnlace);
			}
		);
	});
}
function filtrarCategoria(idCategoria, arraySubcategoria) {
	//comparamos el atributo personalizado "categoria" de los elementos option(subcategoria)
	//con el parametro idCategoria q recibimos, si es el mismo mostramos la opcion(block)
	//y si no la ocultamos(none)
	for (let i = 0; i < arraySubcategoria.length; i++) {
		if (arraySubcategoria[i].dataset.categoria === idCategoria) {
			arraySubcategoria[i].style.display = 'block';
		} else {
			arraySubcategoria[i].style.display = 'none';
		}
	}
}
function ordenarProductos() {
	let opcionOrdenar = document.getElementById('ordenar');

	opcionOrdenar.addEventListener('input', (e) => {
		if (e.target.value != '')
			window.location.href = `${window.location.origin}${e.target.value}`;
	});
}
function eventoCategoria() {
	const selectCategoria = document.getElementById('categoria');

	const idCategoria = selectCategoria.value;
	const arraySubcategoria = document.getElementsByClassName('subcategoria');
	filtrarCategoria(idCategoria, arraySubcategoria);

	selectCategoria.addEventListener('change', (e) => {
		const idCategoria = selectCategoria.value;
		const arraySubcategoria = document.getElementsByClassName('subcategoria');
		filtrarCategoria(idCategoria, arraySubcategoria);
	});
}


// -------------------------------------------------- FUNCIONES DE USUARIO --------------------------------------------
function funcionBuscarUsuario() {
	const buscador = document.getElementById('buscarUsuario');

	buscador.addEventListener('submit', (e) => {
		e.preventDefault();

		//obtenemos el valor del buscador
		const valorDelBuscador = obtenerCampoDeFormulario(buscador, 'nombre');

		//si existe valor, enviamos la peticion
		if (valorDelBuscador) {
			enviarPeticion(
				'GET',
				`${window.location.origin}/usuario/buscar/${valorDelBuscador}`,
				(respuesta) => {
					const usuarioArray = respuesta.usuarios;

					mostrarUsuarioEnTabla(usuarioArray);
				}
			);
		}
	});
}
function mostrarUsuarioEnTabla(usuarioArray) {
	let tablaUsuario = document.getElementById('tablaUsuario');
	tablaUsuario.innerHTML = '';

	//si no hay usuarios traidos de la DB
	if (usuarioArray.length === 0) {
		return (tablaUsuario.innerHTML += '<th colspan="7">No hay resultados de la busqueda</th>');
	}

	usuarioArray.forEach((usuario, index) => {
		tablaUsuario.innerHTML += `<tr>
            <th scope='col' class="d-none d-md-table-cell">${usuario.idusuario}</th>
            <th scope='col'>${usuario.nombre}</th>
            <th scope='col'>${usuario.estado}</th>
            <th scope='col'>${usuario.email}</th>
            <th scope='col' class="d-none d-md-table-cell">0</th>
            <th scope='col'>
                <a href="/usuario/perfil/${usuario.idusuario}" class="btn btn-violeta">Mas info</a>
            </th>
        </tr>`;
	});
}

function actualizarRolUsuario() {
	const formUsuarioRol = document.getElementById('formUsuarioRol');

	//si no existe el form, porque el usuario no es admin
	if( !formUsuarioRol ) return;

	//elemento rol
	const rol = document.getElementById('rol');

	formUsuarioRol.addEventListener('submit', async e => {
		e.preventDefault();

		//obtenemos el id del usuario a actualizar
		const idusuario = formUsuarioRol.dataset.idusuario;

		// creamos la peticion
		const miPeticion = new Request(`/usuario/actualizar-rol/${idusuario}`, {
			method: 'POST',
			body: new FormData(formUsuarioRol),
		});

		//hacemos la peticion
		let resultado = await fetch(miPeticion);
		let respuesta = await resultado.json();

		//actualizamos el estado
		rol.innerHTML = respuesta.rolActualizado;

	});
}

// -------------------------------------------------- FUNCIONES DE VISTAS, RESPONSIVE --------------------------------------------
function enviarPeticion(metodo, url, callback) {
	let xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			let respuestaObj = JSON.parse(this.responseText);
			callback(respuestaObj);
		}
	};

	xhttp.open(metodo, url);
	xhttp.send();
}

// -------------------------------------------------- FUNCIONES DE LOGUEO --------------------------------------------
function usuarioLoguiadoRedirigir() {
	const token = leerCookie('token');
	//Si existe el token, el usuario esta loguiado por lo tanto redirigimos
	if (token !== null) {
		window.location.href = window.location.origin;
	}
}

function ingresoAutomatico() {
	const botonIngresoAutomatico = document.getElementById('ingresoAutomatico');
	let email = document.getElementById('email');
	let password = document.getElementById('password');

	botonIngresoAutomatico.addEventListener('click', () => {
		//escribimos el email y el password en el formulario loginForm
		email.value = 'espectador@espectador.com';
		password.value = '1234';

		const formulario = document.getElementById('loginForm');

		//enviamos el formulario
		enviarAutenticacion(formulario);
	});
}

function loguearse() {
	let formulario = document.getElementById('loginForm');

	formulario.addEventListener('submit', (e) => {
		e.preventDefault();

		enviarAutenticacion(formulario);
	});
}
function almacenarToken(token) {
	document.cookie = `token=${token}; path=/`;
}
function cerrarSesion() {
	let botonCerrarSesion = document.getElementsByClassName('botonCerrarSesion');

	//recorremos todos los botones con las clases botonCerrarSesion y le agregamos el evento
	for (let i = 0; i < botonCerrarSesion.length; i++) {
		botonCerrarSesion[i].addEventListener('click', (e) => {
			borrarToken();
			//redirigimos a la pagina principal
			window.location.href = `${window.location.origin}/`;
		});
	}
}
function borrarToken() {
	document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
}

async function enviarAutenticacion(formulario) {
	const formData = new FormData(formulario);
	const alertaLogin = document.getElementById('alertaLogin');

	const miPeticion = new Request('/login', {
		method: 'POST',
		body: formData,
	});

	//hacemos la peticion
	let resultado = await fetch(miPeticion);
	let respuesta = await resultado.json();

	//comprobamos si dio error el logueo
	if (resultado.status === 400) {
		let mensaje = '';

		//recorremos los mensajes de errores
		respuesta.errores.forEach((error) => {
			mensaje += `${error.msg} <br/>`;
		});

		mostrarAlerta(alertaLogin, mensaje);
		return;
	}

	//almecenamos el token y redigimos a la pagina principal
	almacenarToken(respuesta.token);
	window.location.href = window.location.origin;
}

function registrarse() {
	const usuarioForm = document.getElementById('usuarioForm');
	const alerta = document.getElementById('alerta');

	usuarioForm.addEventListener('submit', async (e) => {
		e.preventDefault();

		//validar que las 2 passwords sean iguales
		const password = obtenerCampoDeFormulario(usuarioForm, 'password');
		const segundaPassword = obtenerCampoDeFormulario(
			usuarioForm,
			'confirmarPassword'
		);

		if (password !== segundaPassword) {
			return mostrarAlerta(alerta, 'Las contraseñas escritas son diferentes');
		}

		const formData = new FormData(usuarioForm);

		const miPeticion = new Request('/usuario/crear', {
			method: 'POST',
			body: formData,
		});

		//hacemos la peticion
		let resultado = await fetch(miPeticion);
		let respuesta = await resultado.json();

		//comprobamos si dio error el logueo
		if (resultado.status === 400) {
			let mensaje = '';

			//recorremos los mensajes de errores
			respuesta.errores.forEach((error) => {
				mensaje += `${error.msg} <br/>`;
			});

			mostrarAlerta(alerta, mensaje);
			return;
		}

		//redirigimos al login
		window.location.href = window.location.origin + '/login';
	});
}

// -------------------------------------------------- FUNCIONES DEL CARRITO --------------------------------------------
function leerCarrito() {
	if (!localStorage.carrito) {
		return new Carrito([], 0, 0);
	} else {
		let carritoObj = JSON.parse(localStorage.carrito);
		return new Carrito(
			carritoObj.productos,
			carritoObj.total,
			carritoObj.cantidad
		);
	}
}
function guardarCarrito(carrito) {
	let carritoJSON = JSON.stringify(carrito);

	localStorage.carrito = carritoJSON;
}
function actualizarCarrito() {
	const totales = document.getElementsByClassName('total');

	//Actualizamos el total y cantidad en los elementos html carrito
	for (let i = 0; i < totales.length; i++) {
		totales[i].innerHTML = `( ${carrito.cantidad} )  $${carrito.total}.00`;
	}
}
function eventoAñadirProducto() {
	const botonAgregarProducto = document.getElementsByClassName(
		'botonAgregarProducto'
	);

	for (let i = 0; i < botonAgregarProducto.length; i++) {
		botonAgregarProducto[i].addEventListener('click', (e) => {
			const productoDOM = e.target.parentNode.parentNode.parentNode;
			const producto = carrito.leerProducto(productoDOM);
			carrito.añadirProducto(producto);
			guardarCarrito(carrito);
			actualizarCarrito();
		});
	}
}
function mostrarProductosDelCarrito() {
	const productos = carrito.productos;
	let listaCarrito = document.getElementById('listaCarrito');
	let subtitular = document.getElementById('subtitular');
	let interfazComprar = document.getElementById('interfazComprar');
	if (productos.length === 0) {
		subtitular.innerHTML = '<i class="fa fa-times-circle icono"></i>No hay producto en el carrito';
		return;
	}

	//mostramos los productos del carrito
	listaCarrito.innerHTML = `
  <div class='text-center mb-3'>
    <button id="botonVaciarCarrito" class="btn btn-danger"><i class="fa fa-times-circle me-2"></i>Vaciar Carrito</button>
  </div>`;

	for (let i = 0; i < productos.length; i++) {
		listaCarrito.innerHTML += `
    <figure class="row mb-3 border p-2">
        <div class="col-12 col-md-3 col-lg-2">
            <img src="${
	productos[i].img
}" name="imgProducto" class='img-thumbnail w-100 img-producto'>
        </div>
        <div class="col-12 col-md-6 col-lg-7 d-flex align-items-center text-center text-md-start ">
            <a href='/producto/perfil/${
	productos[i].id
}' class='h3 w-100' name="nombreProducto" data-id=${
	productos[i].id
}>${productos[i].nombre}</a>
        </div>
        <div class="col-12 col-md-3 d-flex align-items-center">
            <figcaption class='text-center text-md-start w-100'>
                <p class='my-0 w-100'><strong>P.Unitario: $<span name="precioProducto">${
	productos[i].precio
}</span>.00</strong></p>
                <p class='my-0 w-100'><strong>Cantidad: ${
	productos[i].cantidad
}</strong></p>
                <p class='my-0 w-100'><strong>P.Total: <span class="textoRojo">$${
	productos[i].precio * productos[i].cantidad
}.00</span></strong></p>
                <button class="btn btn-danger botonEliminarProducto mt-3">
                    <i class="fa fa-times-circle me-2"></i>Eliminar Producto
                </button>
            </figcaption>
        </div>
    </figure>`;
	}

	//mostramos la insterfaz para confirmar la compra
	interfazComprar.innerHTML = `
    <section class='row mt-3'>
        <form class="col-12 col-md-4" id='carritoForm' action="/pedido/crear" method="post">
            <h3 class='text-center'>Medios de pago</h3>
            <div class="form-check mb-4">
                <input class="form-check-input" type="radio" name="medio-pago" id="efectivo" value="1" checked>
                <label class="form-check-label" for="efectivo">
                    Efectivo
                </label>
            </div>
            <div class="form-check mb-4">
                <input class="form-check-input" type="radio" name="medio-pago" id="transferencia" value="1">
                <label class="form-check-label" for="transferencia">
                    Transferencia bancaria
                </label>
            </div>
            <div class="form-check mb-4">
                <input class="form-check-input" type="radio" name="medio-pago" id="mercado_pago" value="1">
                <label class="form-check-label" for="mercado_pago">
                    Mercado pago
                </label>
            </div>
        </form>
        <div class="col-12 col-md-4 text-center mb-3">
            <h3>Informacion del carrito</h3>
            <p class='my-0'>Cantidad de componentes: ${carrito.cantidad}</p>
            <h3 class="textoRojo">Total: $${carrito.total}.00</h3>
        </div>
        <div class="col-12 col-md-4 justify-content-center d-flex align-items-center">
            <button class='btn btn-violeta' form='carritoForm'>Confirmar compra</button>
        </div>
    </section>`;
}
function eventoEliminarProducto() {
	const botonEliminarProducto = document.getElementsByClassName(
		'botonEliminarProducto'
	);

	//recorremos los botones de eliminar de cada producto
	for (let i = 0; i < botonEliminarProducto.length; i++) {
		botonEliminarProducto[i].addEventListener('click', (e) => {
			//el producto DOM va a ser todos los elementos html que forman el producto
			const productoDOM = e.target.parentNode.parentNode.parentNode;

			//llamamos a leerProducto q va a obtener el nombre, precio, img, del los elementos htmls
			const producto = carrito.leerProducto(productoDOM);

			carrito.eliminarProducto(producto);
			guardarCarrito(carrito);
			actualizarCarrito();

			window.location.reload();
		});
	}
}
function eventoVaciarCarrito() {
	const botonVaciarCarrito = document.getElementById('botonVaciarCarrito');

	if (!botonVaciarCarrito) {
		return;
	}

	botonVaciarCarrito.addEventListener('click', () => {
		localStorage.removeItem('carrito');
		window.location.reload();
	});
}

function eventoEnviarCarrito() {
	let carritoForm = document.getElementById('carritoForm');

	if (!carritoForm) {
		return;
	}
	carritoForm.addEventListener('submit', async (e) => {
		e.preventDefault();

		//Agregamos al formulario un valor que va a especificar si quiere o no el envio
		// y otro valor que va a ser los productos del carrito pero transformado a un string
		let objetoFormulario = new FormData(carritoForm);

		objetoFormulario.append('envio', 'false');
		objetoFormulario.append('productos', JSON.stringify(carrito.productos));

		//Si el usuario no tiene el token no esta logueado, abrir ventana de logueo
		if (leerCookie('token') === null) {
			window.location.href = window.location.origin + '/login';
			return;
		}

		let miPeticion = new Request('/pedido/crear', {
			method: 'POST',
			body: objetoFormulario,
		});

		let resultado = await fetch(miPeticion);
		let respuesta = await resultado.json();

		//vaciamos el carrito, ya que ya se compraron los productos
		localStorage.removeItem('carrito');

		window.location.href = `/pedido/${respuesta.idPedido}`;
	});
}

function actualizarEstadoDelPedido() {
	const formEstadoPedido = document.getElementById('formEstadoPedido');

	//si no existe el form, porque el usuario no es admin
	if( !formEstadoPedido ) return;

	//elemento estado
	const estado = document.getElementById('estado');

	formEstadoPedido.addEventListener('submit', async e => {
		e.preventDefault();

		//obtenemos el id del pedido
		const idpedido = formEstadoPedido.dataset.idpedido;

		// creamos la peticion
		const miPeticion = new Request(`/pedido/actualizar-estado/${idpedido}`, {
			method: 'POST',
			body: new FormData(formEstadoPedido),
		});

		//hacemos la peticion
		let resultado = await fetch(miPeticion);
		let respuesta = await resultado.json();

		//actualizamos el estado
		estado.innerHTML = respuesta.estadoActualizado;

	});
}

// -------------------------------------------------- FUNCION DE PEDIDOS --------------------------------------------
function funcionBuscarPedidoParaTabla() {
	let buscadorTabla = document.getElementById('buscarPedido');

	buscadorTabla.addEventListener(
		'submit',
		(e) => {
			e.preventDefault();

			//obtenemos el valor del campo
			const valorDelBuscador = obtenerCampoDeFormulario(
				buscadorTabla,
				'codigo'
			);
			const filtroEstado = obtenerCampoDeFormulario(
				buscadorTabla,
				'estado'
			);

			enviarPeticion(
				'GET',
				`${window.location.origin}/pedido/obtener?id=${valorDelBuscador}&estado=${filtroEstado}`,
				(respuesta) => {
					mostrarPedidoEnTabla(respuesta.pedidos);
				}
			);
		},
		false
	);
}
function mostrarPedidoEnTabla(pedidoArray) {
	let tablaPedido = document.getElementById('tablaPedido');
	tablaPedido.innerHTML = '';

	//si no hay pedidos traidos de la DB
	if (pedidoArray.length === 0) {
		return (tablaPedido.innerHTML += '<th colspan="7">No hay resultados de la busqueda</th>');
	}

	pedidoArray.forEach((pedido) => {
		tablaPedido.innerHTML += `<tr>
            <th>${pedido.idpedido}</th>
            <th>${pedido.fecha}</th>
            <th class="d-none d-md-table-cell">Efectivo</th>
            <th>${pedido.estado.nombre}</th>
            <th>$${pedido.total}</th>
            <th>
                <a href="/pedido/${pedido.idpedido}" class="btn btn-violeta">Editar Pedido</a></th>
        </tr>`;
	});
}

//funcion para leerCookie
function leerCookie(nombre) {
	var nombreIgual = nombre + '=';
	var ca = document.cookie.split(';');

	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];

		while (c.charAt(0) == ' ') c = c.substring(1, c.length);

		if (c.indexOf(nombreIgual) == 0)
			return c.substring(nombreIgual.length, c.length);
	}
	return null;
}

// -------------------------------------------------- FUNCIONES DE ALERTAS--------------------------------------------
function mostrarAlerta(alertaDOM, mensaje) {
	//mostramos el alerta
	alertaDOM.style.display = 'block';

	alertaDOM.innerHTML = mensaje;

	//despues de 3 segundos ocultamos la alerta
	setTimeout(() => {
		alertaDOM.style.display = 'none';
	}, 3000);
}




