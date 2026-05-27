const preguntas = [

{
    oracion: 'The cat is ____.',
    respuesta: 'black',
    imagen: 'https://cdn-icons-png.flaticon.com/512/220/220124.png',
    voz: 'The cat is black'
},

{
    oracion: 'I see a ____.',
    respuesta: 'dog',
    imagen: 'https://cdn-icons-png.flaticon.com/512/616/616408.png',
    voz: 'I see a dog'
},

{
    oracion: 'The apple is ____.',
    respuesta: 'red',
    imagen: 'https://cdn-icons-png.flaticon.com/512/415/415733.png',
    voz: 'The apple is red'
},

{
    oracion: 'This is my ____.',
    respuesta: 'house',
    imagen: 'https://cdn-icons-png.flaticon.com/512/69/69524.png',
    voz: 'This is my house'
},

{
    oracion: 'The sun is ____.',
    respuesta: 'yellow',
    imagen: 'https://cdn-icons-png.flaticon.com/512/869/869869.png',
    voz: 'The sun is yellow'
}

];

let indice = 0;
let puntaje = 0;

const oracion = document.getElementById('oracion');
const imagen = document.getElementById('imagen');
const respuesta = document.getElementById('respuesta');
const resultado = document.getElementById('resultado');
const puntajeTexto = document.getElementById('puntaje');

function hablar(texto){

    const voz = new SpeechSynthesisUtterance(texto);

    voz.lang = 'en-US';

    voz.rate = 0.8;

    speechSynthesis.speak(voz);

}

function cargarPregunta(){

    let actual = preguntas[indice];

    oracion.textContent = actual.oracion;

    imagen.src = actual.imagen;

    respuesta.value = '';

    resultado.textContent = '';

    hablar(actual.voz);

}

function verificar(){

    let actual = preguntas[indice];

    let textoUsuario = respuesta.value.toLowerCase().trim();

    if(textoUsuario === actual.respuesta){

        resultado.textContent = '✅ Correct!';
        resultado.style.color = 'green';

        puntaje++;

        hablar('Correct');

    } else {

        resultado.textContent = '❌ Incorrect!';
        resultado.style.color = 'red';

        hablar('Try again');

    }

    puntajeTexto.textContent = 'Score: ' + puntaje;

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

    oracion.textContent = '🎉 Game Over';

    imagen.style.display = 'none';

    respuesta.style.display = 'none';

    resultado.innerHTML =
    `You got <b>${puntaje}</b> correct answers!`;

}

function repetirOracion(){

    let actual = preguntas[indice];

    hablar(actual.voz);

}

cargarPregunta();