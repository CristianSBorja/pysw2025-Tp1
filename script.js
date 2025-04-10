// Script para la animación del contador
const numero = document.querySelector('.numero');
const target = parseInt(numero.dataset.target);
let contador = 0;
const intervalo = 20;

function actualizarContador() {
    if (contador < target) {
        contador++;
        numero.textContent = contador;
        setTimeout(actualizarContador, intervalo);
    } else {
        numero.textContent = target + '+';
    }
}

actualizarContador();