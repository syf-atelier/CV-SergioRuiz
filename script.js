/**
 * Inicialización de Múltiples Carruseles
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // Buscamos todos los elementos con la clase .projectSwiper
    const swipers = document.querySelectorAll('.projectSwiper');

    swipers.forEach((element) => {
        new Swiper(element, {
            loop: true,
            grabCursor: true,
            spaceBetween: 10,
            
            // Paginación y Navegación
            pagination: {
                el: element.querySelector('.swiper-pagination'),
                clickable: true,
            },
            navigation: {
                nextEl: element.querySelector('.swiper-button-next'),
                prevEl: element.querySelector('.swiper-button-prev'),
            },
            
            // Opcional: Autoplay suave
            autoplay: {
                delay: 5000,
                pauseOnMouseEnter: true,
            },
        });
    });

    console.log(`Se han inicializado ${swipers.length} carruseles de proyecto.`);
});