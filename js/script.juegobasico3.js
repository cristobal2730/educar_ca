let respuestaCorrecta;

let puntos = 0;
let estrellas = 0;

let tipoActual = "";

let numeroA = 0;
let numeroB = 0;

function hablar(texto){

    if(!('speechSynthesis' in window)) return;

    speechSynthesis.cancel();

    const voz = new SpeechSynthesisUtterance(texto);

    voz.lang = "es-CL";
    voz.rate = 1;

    speechSynthesis.speak(voz);
}

function repetirPregunta(){

    hablar(
    document.getElementById("pregunta").textContent
    );
}

function generarPregunta(){

    let tipo = Math.floor(Math.random()*2);

    let pregunta = "";

    if(tipo === 0){

        let a = Math.floor(Math.random()*10)+2;
        let b = Math.floor(Math.random()*10)+2;

        tipoActual = "multiplicacion";

        numeroA = a;
        numeroB = b;

        pregunta = `${a} × ${b}`;

        respuestaCorrecta = a*b;
    }

    else{

        let divisor =
        Math.floor(Math.random()*10)+2;

        let cociente =
        Math.floor(Math.random()*10)+2;

        let dividendo =
        divisor*cociente;

        tipoActual = "division";

        numeroA = dividendo;
        numeroB = divisor;

        pregunta =
        `${dividendo} ÷ ${divisor}`;

        respuestaCorrecta =
        cociente;
    }

    document.getElementById("pregunta").textContent =
    pregunta;

    document.getElementById("respuesta").value="";

    hablar(
    pregunta
    .replace("×"," por ")
    .replace("÷"," dividido por ")
    );
}

function comprobar(){

    let respuesta =
    Number(document.getElementById("respuesta").value);

    if(respuesta === respuestaCorrecta){

        puntos += 10;
        estrellas++;

        document.getElementById("puntos").textContent =
        puntos;

        document.getElementById("estrellas").textContent =
        estrellas;

        document.getElementById("mensaje").innerHTML =
        "🍕 ¡Pedido correcto!";

        document.getElementById("mensaje").className =
        "correcto";

        hablar("Correcto");

        if(estrellas >= 10){

            document.getElementById("pregunta").innerHTML =
            "🏆 ¡Eres Maestro Pizzero!";

            document.getElementById("mensaje").innerHTML =
            "🎉 Completaste la pizzería matemática";

            hablar(
            "Felicitaciones. Eres maestro pizzero."
            );

            return;
        }

        setTimeout(generarPregunta,1000);
    }

    else{

        let explicacion = "";

        if(tipoActual === "multiplicacion"){

            explicacion =
            `${numeroA} × ${numeroB}
            = ${respuestaCorrecta}<br>
            Multiplicar es sumar varias veces el mismo número.`;
        }

        else{

            explicacion =
            `${numeroA} ÷ ${numeroB}
            = ${respuestaCorrecta}<br><br>

            Recuerda que la división y la multiplicación están relacionadas:<br>

            ${numeroB} × ${respuestaCorrecta}
            = ${numeroA}`;
        }

        document.getElementById("mensaje").innerHTML =
        "❌ Respuesta incorrecta.<br><br>" +
        explicacion;

        document.getElementById("mensaje").className =
        "incorrecto";

        hablar(
        `Incorrecto. La respuesta correcta era ${respuestaCorrecta}`
        );
    }
}

generarPregunta();