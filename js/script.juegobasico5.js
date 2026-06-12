let respuestaCorrecta = 0;
let puntaje = 0;
let tiempo = 60;

const operacion =
document.getElementById("operacion");

const respuesta =
document.getElementById("respuesta");

const mensaje =
document.getElementById("mensaje");

const puntajeElemento =
document.getElementById("puntaje");

const tiempoElemento =
document.getElementById("tiempo");

const barra =
document.getElementById("progreso");

function nuevaOperacion(){

    let a,b,tipo;

    tipo =
    Math.floor(Math.random()*3);

    if(tipo===0){

        a =
        Math.floor(Math.random()*100)+1;

        b =
        Math.floor(Math.random()*100)+1;

        respuestaCorrecta =
        a+b;

        operacion.textContent =
        `${a} + ${b}`;

    }

    else if(tipo===1){

        a =
        Math.floor(Math.random()*100)+1;

        b =
        Math.floor(Math.random()*100)+1;

        if(a<b){

            [a,b] = [b,a];
        }

        respuestaCorrecta =
        a-b;

        operacion.textContent =
        `${a} - ${b}`;

    }

    else{

        a =
        Math.floor(Math.random()*10)+1;

        b =
        Math.floor(Math.random()*10)+1;

        respuestaCorrecta =
        a*b;

        operacion.textContent =
        `${a} × ${b}`;
    }

    respuesta.value = "";
    respuesta.focus();
}

function comprobar(){

    let valor =
    Number(respuesta.value);

    if(valor === respuestaCorrecta){

        puntaje++;

        mensaje.textContent =
        "✅ ¡Correcto!";

        mensaje.style.color =
        "green";

    }else{

        mensaje.textContent =
        `❌ Era ${respuestaCorrecta}`;

        mensaje.style.color =
        "red";
    }

    puntajeElemento.textContent =
    puntaje;

    nuevaOperacion();
}

let cronometro =
setInterval(()=>{

    tiempo--;

    tiempoElemento.textContent =
    tiempo;

    barra.style.width =
    (tiempo/60)*100 + "%";

    if(tiempo <= 0){

        clearInterval(cronometro);

        document
        .getElementById("juego")
        .style.display =
        "none";

        document
        .getElementById("pantallaFinal")
        .style.display =
        "block";

        let nivel;

        if(puntaje >= 30){

            nivel =
            "🥇 ¡Excelente!";

        }else if(puntaje >= 20){

            nivel =
            "🥈 ¡Muy Bien!";

        }else if(puntaje >= 10){

            nivel =
            "🥉 Buen Trabajo";

        }else{

            nivel =
            "💪 Sigue Practicando";
        }

        document
        .getElementById("resultado")
        .innerHTML =
        `${nivel}<br><br>
        Puntaje: <b>${puntaje}</b>`;
    }

},1000);

function reiniciar(){

    location.reload();
}

respuesta.addEventListener(
"keydown",
function(e){

    if(e.key === "Enter"){

        comprobar();
    }
});

nuevaOperacion();