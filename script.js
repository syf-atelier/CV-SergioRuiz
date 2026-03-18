/**
 * Sergio Ruiz Torres - CV Profesional e Interactivo
 * Lógica para Carruseles, Modales y Animaciones UX
 */

document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. INICIALIZACIÓN DE CARRUSELES (Swiper.js)
       ========================================= */
    const projectSwipers = document.querySelectorAll('.projectSwiper');

    projectSwipers.forEach((element) => {
        new Swiper(element, {
            loop: true,
            grabCursor: true,
            spaceBetween: 15,
            
            // Paginación y Navegación local para cada tarjeta
            pagination: {
                el: element.querySelector('.swiper-pagination'),
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: element.querySelector('.swiper-button-next'),
                prevEl: element.querySelector('.swiper-button-prev'),
            },
            
            // Autoplay suave que se detiene al poner el mouse encima
            autoplay: {
                delay: 4500,
                pauseOnMouseEnter: true,
                disableOnInteraction: false,
            },

            // Efecto de transición
            effect: "slide",
            speed: 600,
        });
    });


    /* =========================================
       2. LÓGICA DE VENTANA MODAL (Diagrama de Datos)
       ========================================= */
    const modal = document.getElementById("dataModal");
    const trigger = document.getElementById("openDataModal");
    const closeBtn = document.querySelector(".close-modal");

    if (trigger && modal) {
        // Abrir el diagrama
        trigger.addEventListener('click', () => {
            modal.style.display = "block";
            modal.style.opacity = "0";
            document.body.style.overflow = "hidden"; // Bloquea scroll del fondo
            
            // Animación de entrada sutil
            setTimeout(() => {
                modal.style.opacity = "1";
                modal.style.transition = "opacity 0.3s ease";
            }, 10);
        });

        // Función para cerrar
        const closeModal = () => {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        };

        if (closeBtn) closeBtn.onclick = closeModal;

        // Cerrar al hacer clic fuera de la imagen
        window.onclick = (event) => {
            if (event.target == modal) closeModal();
        };

        // Cerrar con la tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape" && modal.style.display === "block") closeModal();
        });
    }


    /* =========================================
       3. ANIMACIÓN DE FLECHAS (Experiencia)
       ========================================= */
    const detailElements = document.querySelectorAll('.exp-card');

    detailElements.forEach(details => {
        details.addEventListener('toggle', () => {
            const arrow = details.querySelector('.icon-arrow');
            if (details.open) {
                arrow.style.transform = 'rotate(180deg)';
                arrow.style.color = 'var(--primary)';
            } else {
                arrow.style.transform = 'rotate(0deg)';
                arrow.style.color = 'var(--text-muted)';
            }
        });
    });


    /* =========================================
       4. LOG DE CONSOLA (Para Debugging)
       ========================================= */
    console.log("-----------------------------------------");
    console.log("⚡ CV Sergio Ruiz Torres inicializado");
    console.log(`🚀 Proyectos con carrusel: ${projectSwipers.length}`);
    console.log("-----------------------------------------");

});