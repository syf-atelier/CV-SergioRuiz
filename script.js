/**
 * Sergio Ruiz Torres - CV Profesional e Interactivo
 * Módulos: Modo Oscuro, Gráfico de Radar, Terminal, Filtros, Carruseles y UX Móvil
 */

document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. MODO OSCURO (Dark Mode Toggle)
       ========================================= */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    const body = document.body;

    // Revisar si el usuario ya tenía el modo oscuro activado
    if (localStorage.getItem('theme') === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
        
        // Actualizar el gráfico si existe
        if(window.skillsRadarChart) {
            window.skillsRadarChart.update();
        }
    });


    /* =========================================
       2. EFECTO TYPING EN EL HEADER (Fijado &amp;)
       ========================================= */
    const titleElement = document.querySelector('.typing-text');
    if (titleElement) {
        // CORRECCIÓN: Leemos textContent (texto puro) para que el símbolo '&' no se transforme en '&amp;'
        const textToType = titleElement.textContent.trim(); 
        titleElement.textContent = ''; // Limpiamos para iniciar animación
        let charIndex = 0;

        function typeWriter() {
            if (charIndex < textToType.length) {
                // Forzamos texto puro para asegurar que el símbolo '&' se imprima bien
                titleElement.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 40); // Velocidad de escritura
            }
        }
        // Iniciar con un pequeño retraso para asegurar que la página cargó
        setTimeout(typeWriter, 300);
    }


    /* =========================================
       3. GRÁFICO DE RADAR ACTUALIZADO (Data Engineer Focus)
       ========================================= */
    const ctx = document.getElementById('skillsChart');
    if (ctx) {
        window.skillsRadarChart = new Chart(ctx.getContext('2d'), {
            type: 'radar',
            data: {
                labels: [
                    'Arquitectura de Datos (ETL)', 
                    'Sistemas y BD (SQL)', 
                    'Software Dev (Python/JS)', 
                    'Automatización e IoT', 
                    'Manufactura Digital (CNC)', 
                    'Data Viz (Power BI)'
                ],
                datasets: [{
                    label: 'Nivel Técnico',
                    data: [80, 85, 95, 90, 85, 75], 
                    backgroundColor: 'rgba(37, 99, 235, 0.2)',
                    borderColor: '#2563eb',
                    pointBackgroundColor: '#2563eb',
                    pointBorderColor: '#ffffff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: { color: 'rgba(128, 128, 128, 0.2)' },
                        grid: { color: 'rgba(128, 128, 128, 0.2)' },
                        suggestedMin: 0,
                        suggestedMax: 100,
                        pointLabels: {
                            font: { 
                                family: 'Inter', 
                                // Ajuste de fuente dinámico para labels del gráfico
                                size: window.innerWidth < 600 ? 10 : 12, 
                                weight: '600' 
                            },
                            color: '#888888'
                        },
                        ticks: { display: false }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(15, 23, 42, 0.9)',
                        callbacks: {
                            label: function(context) {
                                return ` Dominio: ${context.raw}%`;
                            }
                        }
                    }
                }
            }
        });
    }


    /* =========================================
       4. INICIALIZACIÓN DE CARRUSELES (Swiper.js)
       ========================================= */
    const projectSwipers = document.querySelectorAll('.projectSwiper');

    projectSwipers.forEach((element) => {
        new Swiper(element, {
            loop: true,
            grabCursor: true,
            spaceBetween: 10, // Espacio entre slides
            
            // CORRECCIÓN #4: autoHeight es clave. 
            // La tarjeta crecerá o encogerá dinámicamente según la altura de la imagen actual.
            autoHeight: true, 
            
            pagination: {
                el: element.querySelector('.swiper-pagination'),
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: element.querySelector('.swiper-button-next'),
                prevEl: element.querySelector('.swiper-button-prev'),
            },
            
            autoplay: {
                delay: 4500,
                pauseOnMouseEnter: true,
                disableOnInteraction: false,
            },

            effect: "slide",
            speed: 600,
        });
    });


    /* =========================================
       5. ANIMACIÓN DE FLECHAS (Experiencia)
       ========================================= */
    const detailElements = document.querySelectorAll('.exp-card');

    detailElements.forEach(details => {
        details.addEventListener('toggle', () => {
            const arrow = details.querySelector('.icon-arrow');
            if (arrow) {
                if (details.open) {
                    arrow.style.transform = 'rotate(180deg)';
                    arrow.style.color = 'var(--primary)';
                } else {
                    arrow.style.transform = 'rotate(0deg)';
                    arrow.style.color = 'var(--text-muted)';
                }
            }
        });
    });


    /* =========================================
       6. LÓGICA DE LA TERMINAL INTERACTIVA
       ========================================= */
    const tInput = document.getElementById('terminalInput');
    const tOutput = document.getElementById('terminalOutput');

    if (tInput && tOutput) {
        const commands = {
            'help': 'Comandos: info, data, cnc, clear',
            'info': 'Sergio Ruiz | Ing. Civil Electrónica | Buscando primera oportunidad en Datos.',
            'data': 'Pipelines ETL con Python y Dagster. BD: ClickHouse, SQL.',
            'cnc': 'Diseño y ensamblaje de Router CNC 3x2m. Modelado en Fusion 360 y control Mach3.',
            'clear': ''
        };

        tInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const cmd = tInput.value.toLowerCase().trim();
                const line = document.createElement('p');
                line.className = 'terminal-line';
                
                if (cmd === 'clear') {
                    tOutput.innerHTML = '';
                } else if (commands[cmd]) {
                    line.innerHTML = `<span style="color: #fff">>>> ${cmd}</span><br>${commands[cmd]}`;
                    tOutput.appendChild(line);
                } else if (cmd !== "") {
                    line.innerHTML = `<span style="color: #ff5f56">>>> Comando '${cmd}' no reconocido. Prueba 'help'.</span>`;
                    tOutput.appendChild(line);
                }
                
                tInput.value = '';
                tOutput.scrollTop = tOutput.scrollHeight;
            }
        });
    }


    /* =========================================
       7. FILTRADO DINÁMICO DE SKILLS
       ========================================= */
    const skillInput = document.getElementById('skillInput');
    const skillSpans = document.querySelectorAll('.tags span');

    if (skillInput) {
        skillInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            
            skillSpans.forEach(span => {
                const skillText = span.textContent.toLowerCase();
                
                if (skillText.includes(searchTerm) || searchTerm === "") {
                    span.style.display = "inline-block";
                    if (searchTerm !== "") {
                        span.style.backgroundColor = "var(--primary)";
                        span.style.color = "#ffffff";
                    } else {
                        span.style.backgroundColor = ""; // Reset inline style
                        span.style.color = "";
                    }
                } else {
                    span.style.display = "none";
                }
            });
        });
    }

});