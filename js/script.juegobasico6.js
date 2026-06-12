const operaciones = [
    ["5 + 3 × 2",11],
    ["12 - 2 × 3",6],
    ["4 × 5 + 6",26],
    ["20 ÷ 4 + 3",8],
    ["15 - 6 ÷ 2",12],
    ["8 × 3 - 10",14],
    ["24 ÷ 6 + 7",11],
    ["9 + 4 × 4",25],
    ["30 - 3 × 8",6],
    ["40 ÷ 5 + 9",17],
    ["6 × 7 - 15",27],
    ["54 ÷ 9 + 12",18],
    ["8 + 6 × 5",38],
    ["50 - 4 × 9",14],
    ["72 ÷ 8 + 14",23],
    ["25 + 7 × 4 - 10",43],
    ["60 - 5 × 8 + 12",32],
    ["81 ÷ 9 + 6 × 3",27],
    ["100 - 8 × 7 + 5",49],
    ["9 × 6 - 24 ÷ 4",48]
];

let vidas = 3;
let puntaje = 0;
let actual;
let respondida = false;

const operacion = document.getElementById("operacion");
const respuesta = document.getElementById("respuesta");
const mensaje = document.getElementById("mensaje");
const puntajeElemento = document.getElementById("puntaje");
const vidasElemento = document.getElementById("vidas");
const boton = document.getElementById("btnResponder");

function nuevaOperacion(){

    respondida = false;

    actual =
    operaciones[
        Math.floor(Math.random()*operaciones.length)
    ];

    operacion.textContent = actual[0];

    respuesta.value = "";
    respuesta.disabled = false;

    boton.disabled = false;

    respuesta.focus();
}

function verificar(){

    if(respondida) return;

    respondida = true;

    boton.disabled = true;
    respuesta.disabled = true;

    let valor = Number(respuesta.value);

    if(valor === actual[1]){

        puntaje += 10;

        mensaje.textContent =
        "✅ ¡Correcto!";
        lanzarConfetti();

        mensaje.className =
        "correcto";

    }else{

        vidas--;

        mensaje.textContent =
        "❌ Incorrecto. Era " + actual[1];

        mensaje.className =
        "incorrecto";
    }

    puntajeElemento.textContent =
    "⭐ Puntaje: " + puntaje;

    vidasElemento.textContent =
    "❤️".repeat(vidas);

    if(vidas <= 0){

    operacion.textContent =
    "💀 Fin del juego";

    mensaje.textContent =
    "🏆 Puntaje final: " + puntaje;

    boton.disabled = true;
    respuesta.disabled = true;

    document.getElementById("btnReiniciar").style.display =
    "inline-block";

    return;
}

    setTimeout(
        nuevaOperacion,
        1200
    );
}

respuesta.addEventListener(
    "keydown",
    function(e){

        if(e.key === "Enter"){

            verificar();
        }
    }
);

nuevaOperacion();

function reiniciarJuego(){

    vidas = 3;
    puntaje = 0;
    respondida = false;

    document.getElementById("vidas").textContent =
    "❤️❤️❤️";

    document.getElementById("puntaje").textContent =
    "⭐ Puntaje: 0";

    document.getElementById("mensaje").textContent =
    "";

    document.getElementById("btnResponder").disabled =
    false;

    document.getElementById("respuesta").disabled =
    false;

    document.getElementById("btnReiniciar").style.display =
    "none";

    nuevaOperacion();
}
function lanzarConfetti(){

    confetti({
        particleCount: 150,
        spread: 120,
        origin:{y:0.6}
    });

    setTimeout(()=>{

        confetti({
            particleCount:100,
            angle:60,
            spread:80,
            origin:{x:0}
        });

        confetti({
            particleCount:100,
            angle:120,
            spread:80,
            origin:{x:1}
        });

    },300);
}