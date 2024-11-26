// Variable para almacenar el número a adivinar
let numeroAAdivinar = [];
let intentos = 0;

// Referencias a los elementos HTML
const contador = document.getElementById('contador');
const intentoInput = document.getElementById('intento');
const flipButton = document.getElementById('flip-button');
const resetButton = document.getElementById('reset-button');
const tablero = document.querySelector('.tablero');

// Función para generar el número aleatorio
function generarNumeroAAdivinar() {
    const numeros = [];
    while (numeros.length < 4) {
        let num = Math.floor(Math.random() * 10);  // Número aleatorio entre 0 y 9
        if (!numeros.includes(num)) {
            numeros.push(num);
        }
    }
    // Asignamos cada número a sus respectivas variables
    [A, B, C, D] = numeros;
    numeroAAdivinar = [A, B, C, D];
}

// Función para comparar el intento con el número a adivinar
function verificarIntento(intento) {
    let resultado = [];
    let intentosNumeros = intento.split('').map(Number); // Convierte el intento en array de números
    
    // Verificar si el número es correcto en su posición
    for (let i = 0; i < 4; i++) {
        if (intentosNumeros[i] === numeroAAdivinar[i]) {
            resultado.push('true');
        } else if (numeroAAdivinar.includes(intentosNumeros[i])) {
            resultado.push('false');
        } else {
            resultado.push('null');
        }
    }

    // Actualizar el tablero con los resultados
    for (let i = 0; i < 4; i++) {
        const div = document.getElementById(i + 1 + intentos * 4);
        div.textContent = intentosNumeros[i];  // Muestra el número del intento
        div.dataset.state = resultado[i];      // Actualiza el estado
        // Cambiar color según el resultado
        if (resultado[i] === 'true') {
            div.style.backgroundColor = 'green';
        } else if (resultado[i] === 'false') {
            div.style.backgroundColor = 'yellow';
        } else {
            div.style.backgroundColor = '';
        }
    }
}

// Función que ejecuta el intento (la misma que se ejecuta con el botón)
function intentar() {
    const intento = intentoInput.value;
    if (intento.length !== 4 || isNaN(intento)) {
        alert('Debe ingresar un intento válido de 4 números');
        return;
    }

    intentos++;
    contador.textContent = intentos;  // Actualiza el contador de intentos

    verificarIntento(intento);

    // Limpiar el campo de texto para el siguiente intento
    intentoInput.value = '';
}

// Evento para el botón "Intentar"
flipButton.addEventListener('click', intentar);

// Evento para la tecla Enter en el campo de texto
intentoInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {  // Verifica si la tecla presionada es Enter
        intentar();  // Ejecuta la función intentar
        event.preventDefault();  // Evita que se haga un "submit" o "enter" por defecto
    }
});

// Evento para el botón "Rendirse"
resetButton.addEventListener('click', () => {
    location.reload();  // Recarga la página cuando el botón "Rendirse" es presionado
});

// Inicializar el juego cuando los intentos son 0
if (contador.textContent === '0') {
    generarNumeroAAdivinar();
}
