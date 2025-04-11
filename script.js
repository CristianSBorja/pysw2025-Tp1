// Espera a que el contenido del DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {

    // --- Script para la animación del contador ---
    const numeroElement = document.querySelector('.numero'); // Renombrado para evitar conflicto con 'numero' variable

    // Verifica si el elemento contador existe antes de ejecutar
    if (numeroElement) {
        const target = parseInt(numeroElement.dataset.target);
        let contador = 0;
        const duracionTotal = 7000; // Duración total de la animación en ms (ej. 2 segundos)
        const incremento = target / (duracionTotal / 20); // Calcula cuánto incrementar en cada paso (intervalo de 20ms)

        function actualizarContador() {
            contador += incremento;
            if (contador < target) {
                numeroElement.textContent = Math.ceil(contador); // Redondea hacia arriba para mostrar números enteros
                setTimeout(actualizarContador, 20); // Intervalo fijo
            } else {
                numeroElement.textContent = target + '+'; // Asegura que termine exactamente en el target
            }
        }
        actualizarContador(); // Inicia la animación del contador
    } else {
        console.warn("Elemento con clase '.numero' no encontrado para la animación del contador.");
    }


    // --- Script para el Dark Mode Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme'); // 1. Revisa localStorage

    // Función para aplicar el tema y actualizar el botón/localStorage
    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            if (themeToggle) themeToggle.innerHTML = '☀️'; // Cambia a icono de sol
            localStorage.setItem('theme', 'dark'); // Guarda preferencia
        } else {
            body.classList.remove('dark-mode');
            if (themeToggle) themeToggle.innerHTML = '🌙'; // Cambia a icono de luna
            localStorage.setItem('theme', 'light'); // Guarda preferencia
        }
    }

    // 2. Aplica tema guardado o predeterminado del sistema al cargar
    if (currentTheme) {
        applyTheme(currentTheme);
    } else {
        // Opcional: Detectar preferencia del sistema si no hay nada guardado
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            applyTheme('dark');
        } else {
            applyTheme('light'); // Default a claro si no hay preferencia del sistema o guardada
        }
    }

    // 3. Event Listener para el botón (solo si existe)
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (body.classList.contains('dark-mode')) {
                applyTheme('light'); // Cambia a claro
            } else {
                applyTheme('dark'); // Cambia a oscuro
            }
        });
    } else {
         console.warn("Botón con id 'theme-toggle' no encontrado.");
    }


    // Opcional: Escuchar cambios en la preferencia del sistema
    // (si el usuario cambia la config del OS mientras la web está abierta)
    try { // Usar try-catch por si addEventListener no está soportado en navegadores muy viejos
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            // Solo cambia si el usuario NO ha elegido explícitamente un tema antes
            if (!localStorage.getItem('theme')) {
                 applyTheme(event.matches ? 'dark' : 'light');
            }
        });
    } catch (e) {
        console.warn("No se pudo añadir el listener para 'prefers-color-scheme'.", e);
    }

}); // Fin del DOMContentLoaded
