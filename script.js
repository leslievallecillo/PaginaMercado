document.addEventListener('DOMContentLoaded', function() {
    // Slider de productos
    const sliderProductos = document.querySelector('.slider');
    const botonAnterior = document.querySelector('.boton-slider.anterior');
    const botonSiguiente = document.querySelector('.boton-slider.siguiente');

    if (sliderProductos && botonAnterior && botonSiguiente) {
        let cantidadDesplazamiento = 0;
        const anchoSlide = 320 + 30; 

        function actualizarVisibilidadBotones() {
            botonAnterior.style.display = cantidadDesplazamiento <= 0 ? 'none' : 'block';
            botonSiguiente.style.display = cantidadDesplazamiento >= sliderProductos.scrollWidth - sliderProductos.clientWidth ? 'none' : 'block';
        }

        botonSiguiente.addEventListener('click', () => {
            const desplazamientoMaximo = sliderProductos.scrollWidth - sliderProductos.clientWidth;
            cantidadDesplazamiento = Math.min(cantidadDesplazamiento + anchoSlide, desplazamientoMaximo);
            sliderProductos.scrollTo({
                left: cantidadDesplazamiento,
                behavior: 'smooth'
            });
            setTimeout(actualizarVisibilidadBotones, 300);
        });

        botonAnterior.addEventListener('click', () => {
            cantidadDesplazamiento = Math.max(cantidadDesplazamiento - anchoSlide, 0);
            sliderProductos.scrollTo({
                left: cantidadDesplazamiento,
                behavior: 'smooth'
            });
            setTimeout(actualizarVisibilidadBotones, 300);
        });

        sliderProductos.addEventListener('wheel', (e) => {
            e.preventDefault();
            sliderProductos.scrollLeft += e.deltaY;
            cantidadDesplazamiento = sliderProductos.scrollLeft;
            actualizarVisibilidadBotones();
        });

        actualizarVisibilidadBotones();
    }

    // Menú móvil
    const botonMenu = document.querySelector('.boton-menu');
    const navPrincipal = document.getElementById('nav-principal');

    if (botonMenu && navPrincipal) {
        botonMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            navPrincipal.classList.toggle('mostrar');
            this.classList.toggle('abierto');
        });

        document.querySelectorAll('#nav-principal a').forEach(enlace => {
            enlace.addEventListener('click', () => {
                navPrincipal.classList.remove('mostrar');
                botonMenu.classList.remove('abierto');
            });
        });

        document.addEventListener('click', function(e) {
            if (!navPrincipal.contains(e.target)) {
                navPrincipal.classList.remove('mostrar');
                botonMenu.classList.remove('abierto');
            }
        });
    }

    // Sistema de notificaciones
    function mostrarNotificacion(mensaje) {
        const notificacion = document.getElementById('notificacion');
        if (!notificacion) return;
        
        const mensajeNotificacion = notificacion.querySelector('.mensaje-notificacion');
        mensajeNotificacion.textContent = mensaje;
        notificacion.classList.add('mostrar');
        
        setTimeout(() => {
            notificacion.classList.remove('mostrar');
        }, 3000);
    }

    // Carrito de compras
    const botonesCarrito = document.querySelectorAll('.btn-slide, .btn-grande');
    const contadorCarrito = document.querySelector('.contador-carrito');
    let articulosCarrito = 0;

    botonesCarrito.forEach(boton => {
        boton.addEventListener('click', function(e) {
            e.preventDefault();
            
            articulosCarrito++;
            if (contadorCarrito) {
                contadorCarrito.textContent = articulosCarrito;
                contadorCarrito.classList.add('animate__animated', 'animate__bounceIn');
                setTimeout(() => {
                    contadorCarrito.classList.remove('animate__animated', 'animate__bounceIn');
                }, 1000);
            }
            
            // Obtener nombre del producto
            let nombreProducto = "producto";
            const slide = this.closest('.slide');
            if (slide) {
                nombreProducto = slide.querySelector('h3').textContent;
            } else if (this.classList.contains('btn-grande')) {
                nombreProducto = "Batido Personalizado";
            }
            
            mostrarNotificacion(`¡${nombreProducto} añadido al carrito!`);
            
            // Animación del botón
            const htmlOriginal = this.innerHTML;
            const bgOriginal = this.style.backgroundColor;
            this.innerHTML = '<i class="fas fa-check"></i> Añadido';
            this.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                this.innerHTML = htmlOriginal;
                this.style.backgroundColor = bgOriginal;
            }, 2000);
        });
    }); 

    // Selects 
    document.querySelectorAll('.opcion select').forEach(select => {
        select.addEventListener('focus', function() {
            this.parentElement.classList.add('enfocado');
        });
        
        select.addEventListener('blur', function() {
            this.parentElement.classList.remove('enfocado');
        });
    });
});