// Funciones de vista
function funcionParaMostrarSubmenu () {
  const listSubmenu = document.getElementsByClassName('menu__submenu');

  for (const submenu of listSubmenu) {
    submenu.previousElementSibling.addEventListener('click', () => {
      if (submenu.style.display === 'none' || !submenu.style.display) {
        submenu.style.display = 'block';
      } else {
        submenu.style.display = 'none';
      }
    });
  }
}

function funcionParaQueElArticuloSeOpaqueYAparezcaMasInfo () {
  const elementoInteractivo = document.getElementsByClassName('producto__interaccionArticulo');

  for (let i = 0; i < elementoInteractivo.length; i++) {
    // evento mouseenter, ocurre cuando el raton entra o esta encima del elemento
    elementoInteractivo[i].addEventListener('mouseenter', () => {
      const hijosDelElementoInteractivo = elementoInteractivo[i].children;

      hijosDelElementoInteractivo[0].style.opacity = 0.5;
      hijosDelElementoInteractivo[1].style.display = 'block';
    });

    // evento mouseenter, ocurre cuando el raton sale o no esta encima del elemento
    elementoInteractivo[i].addEventListener('mouseleave', () => {
      const hijosDelElementoInteractivo = elementoInteractivo[i].children;
      hijosDelElementoInteractivo[0].style.opacity = 1;
      hijosDelElementoInteractivo[1].style.display = 'none';
    });
  }
}
function funcionAbrirMenuResponsive () {
  const boton = document.getElementById('botonMenuResponsive');
  const menu = document.getElementsByClassName('menu')[0];

  boton.addEventListener('click', () => {
    if (menu.style.display === 'none' || !menu.style.display) {
      menu.style.display = 'block';
    } else {
      menu.style.display = 'none';
    }
  });
}

function ocultarBotonAgregarProducto () {
  const botonAgregarProducto = document.getElementsByClassName('botonAgregarProducto');
  for (let i = 0; i < botonAgregarProducto.length; i++) {
    botonAgregarProducto[i].style.display = 'none';
  }
}
function mostrarBotonAgregarProducto () {
  const botonAgregarProducto = document.getElementsByClassName('botonAgregarProducto');
  for (let i = 0; i < botonAgregarProducto.length; i++) {
    botonAgregarProducto[i].style.display = 'inline-block';
  }
}
function eventoCambiarVistaProducto () {
  const botonVistaCuadricula = document.getElementById('botonVistaCuadricula');
  const botonVistaFila = document.getElementById('botonVistaFila');

  botonVistaCuadricula.addEventListener('click', () => {
    ponerProductosEnCuadricula();
  });
  botonVistaFila.addEventListener('click', () => {
    ponerProductosEnFila();
  });
}
function ponerProductosEnFila () {
  const productosDom = document.querySelectorAll('figure.producto');
  const img = document.querySelectorAll('.producto__img');
  const a = document.querySelectorAll('a.producto__interaccionArticulo');

  for (let i = 0; i < productosDom.length; i++) {
    productosDom[i].classList.remove('producto');
    productosDom[i].classList.add('productoFila');

    a[i].classList.add('productoFila__link');

    img[i].classList.remove('producto__img');
    img[i].classList.add('productoFila__link__img');
  }
  sessionStorage.vistaArticulos = 1;
  mostrarBotonAgregarProducto();
}
function ponerProductosEnCuadricula () {
  const productosDom = document.querySelectorAll('figure.productoFila');
  const img = document.querySelectorAll('img.productoFila__link__img');
  const a = document.querySelectorAll('a.productoFila__link');

  for (let i = 0; i < productosDom.length; i++) {
    productosDom[i].classList.remove('productoFila');
    productosDom[i].classList.add('producto');

    a[i].classList.remove('productoFila__link');

    img[i].classList.remove('productoFila__link__img');
    img[i].classList.add('producto__img');
  }

  sessionStorage.vistaArticulos = 2;
  ocultarBotonAgregarProducto();
}
function leerVistaDeArticulos () {
  const vistaArticulos = Number(sessionStorage.vistaArticulos);
  if (vistaArticulos === 1) {
    ponerProductosEnFila();
  }
}

function funcionMostrarYOcultarAyuda () {
  const botonMostrarYOcultar = document.getElementsByClassName('articuloAyuda__botonMostrar');
  const ayudaInf = document.getElementsByClassName('articuloAyuda__infoMostrar');

  for (let i = 0; i < botonMostrarYOcultar.length; i++) {
    ayudaInf[i].style.display = 'none';

    botonMostrarYOcultar[i].addEventListener('click', () => {
      if (ayudaInf[i].style.display === 'block') {
        ayudaInf[i].style.display = 'none';
      } else {
        ayudaInf[i].style.display = 'block';
      }
    });
  }
}

// FUNCIONes DE MODAL SUSTITUIDOS POR BOOTSTRAP
function funcionModal () {
  const abrirModalTelefonico = document.getElementsByClassName('abrirModalTelefonico');
  const abrirModalMediosDePago = document.getElementsByClassName('abrirModalMediosDePago');
  const abrirModalLogin = document.getElementsByClassName('abrirModalLogin');
  const abrirModalRegistrarse = document.getElementsByClassName('abrirModalRegistrarse');
  const modalMediosDePago = document.getElementById('modalMediosDePago');
  const modalTelefonico = document.getElementById('modalTelefonico');
  const modalLogin = document.getElementById('modalLogin');
  const modalRegistrarse = document.getElementById('modalRegistrarse');
  const botonCerrar = document.getElementsByClassName('modalVentana__cerrar');

  agregarEventoAlBotonAbrirYCerrarModal(abrirModalTelefonico, modalTelefonico);
  agregarEventoAlBotonAbrirYCerrarModal(abrirModalMediosDePago, modalMediosDePago);
  agregarEventoAlBotonAbrirYCerrarModal(abrirModalRegistrarse, modalRegistrarse);
  agregarEventoAlBotonAbrirYCerrarModal(abrirModalLogin, modalLogin);

  for (let i = 0; i < botonCerrar.length; i++) {
    botonCerrar[i].addEventListener('click', () => {
      // va a cerrar a poner el display none al abuelo del icono cerrar, en este caso seria el modal
      cerrarModal(botonCerrar[i].parentNode.parentNode);
    });
  }
}
function agregarEventoAlBotonAbrirYCerrarModal (botonModalArray, modal) {
  for (boton of botonModalArray) {
    boton.addEventListener('click', () => {
      abrirModal(modal);

      cerrarModalCuandoSeClickeeAfueraDelModal(modal);
    });
  }
}
function abrirModal (modalAMostrar) {
  modalAMostrar.style.display = 'flex';
}
function cerrarModal (modalACerrar) {
  modalACerrar.style.display = 'none';
}
function cerrarModalCuandoSeClickeeAfueraDelModal (modalACerrar) {
  document.body.addEventListener('click', (e) => {
    if (modalACerrar === e.target) {
      cerrarModal(modalACerrar);
    }
  }, false);
}

function mostrarCargando () {
  const spinner = document.getElementsByClassName('sk-chase')[0];

  spinner.style.display = 'block';
}
function ocultarCargando (posicion) {
  const spinner = document.getElementsByClassName('sk-chase')[0];

  spinner.style.display = 'none';
}
