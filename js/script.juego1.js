const preguntas = [

{
    pregunta: '¿Cómo se dice “Perro” en inglés?',
    imagen: 'https://cdn-icons-png.flaticon.com/512/616/616408.png',
    opciones: ['Dog', 'Cat', 'Bird', 'Fish'],
    correcta: 'Dog'
},

{
    pregunta: '¿Cómo se dice “Gato” en inglés?',
    imagen: 'https://cdn-icons-png.flaticon.com/512/1818/1818402.png',
    opciones: ['Lion', 'Tiger', 'Cat', 'Mouse'],
    correcta: 'Cat'
},

{
    pregunta: '¿Cómo se dice “Casa” en inglés?',
    imagen: 'https://cdn-icons-png.flaticon.com/512/69/69524.png',
    opciones: ['School', 'House', 'Door', 'Window'],
    correcta: 'House'
},

{
    pregunta: '¿Cómo se dice “Manzana” en inglés?',
    imagen: 'https://cdn-icons-png.flaticon.com/512/415/415733.png',
    opciones: ['Orange', 'Banana', 'Apple', 'Pear'],
    correcta: 'Apple'
},

{
    pregunta: '¿Cómo se dice “Rojo” en inglés?',
    imagen: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png',
    opciones: ['Blue', 'Green', 'Red', 'Yellow'],
    correcta: 'Red'
},

{
    pregunta: '¿Cómo se dice “Escuela” en inglés?',
    imagen: 'https://cdn-icons-png.flaticon.com/512/2436/2436636.png',
    opciones: ['Hospital', 'House', 'School', 'Store'],
    correcta: 'School'
},

{
    pregunta: '¿Cómo se dice “Pájaro” en inglés?',
    imagen: 'https://cdn-icons-png.flaticon.com/512/3069/3069186.png',
    opciones: ['Dog', 'Fish', 'Bird', 'Cow'],
    correcta: 'Bird'
},

{
    pregunta: '¿Qué color es el sol?',
    imagen: 'https://cdn-icons-png.flaticon.com/512/869/869869.png',
    opciones: ['Yellow', 'Blue', 'Black', 'Pink'],
    correcta: 'Yellow'
}

];

let indice = 0;
let puntaje = 0;

const pregunta = document.getElementById('pregunta');
const opciones = document.getElementById('opciones');
const resultado = document.getElementById('resultado');
const puntajeTexto = document.getElementById('puntaje');
const imagen = document.getElementById('imagen');

function hablar(texto){
    const voz = new SpeechSynthesisUtterance(texto);
    voz.lang = 'en-US';
    speechSynthesis.speak(voz);
}

function cargarPregunta(){

    resultado.textContent = '';

    let actual = preguntas[indice];

    pregunta.textContent = actual.pregunta;

    imagen.src = actual.imagen;

    opciones.innerHTML = '';

    actual.opciones.forEach(op => {

        let boton = document.createElement('button');

        boton.textContent = op;

        boton.onclick = () => verificarRespuesta(op);

        opciones.appendChild(boton);

    });
}

function verificarRespuesta(respuesta){

    let actual = preguntas[indice];

    if(respuesta === actual.correcta){

        resultado.textContent = '✅ Correct!';
        resultado.style.color = 'green';

        puntaje++;

        hablar(actual.correcta);

    } else {

        resultado.textContent = '❌ Incorrect!';
        resultado.style.color = 'red';

        hablar('Try again');

    }

    puntajeTexto.textContent = 'Puntaje: ' + puntaje;

    setTimeout(() => {

        indice++;

        if(indice < preguntas.length){

            cargarPregunta();

        } else {

            finalizarJuego();

        }

    }, 1500);

}

function finalizarJuego(){

    pregunta.textContent = '🎉 Game Over';

    opciones.innerHTML = '';

    imagen.style.display = 'none';

    resultado.innerHTML =
    `Obtuviste <b>${puntaje}</b> de ${preguntas.length} respuestas correctas.`;

}

function reiniciarJuego(){

    indice = 0;
    puntaje = 0;

    imagen.style.display = 'block';

    puntajeTexto.textContent = 'Puntaje: 0';

    cargarPregunta();

}

cargarPregunta();
