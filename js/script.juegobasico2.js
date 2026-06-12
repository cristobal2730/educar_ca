let respuestaCorrecta;
let puntos = 0;
let monedas = 0;
let posicion = 10;
let tipoActual = "";
let numeroA = 0;
let numeroB = 0;
let numeroInicial = 0;
let numeroFinal = 0;

function hablar(texto){
    if(!('speechSynthesis' in window)) return;

    speechSynthesis.cancel();

    const voz = new SpeechSynthesisUtterance(texto);

    voz.lang = "es-CL";
    voz.rate = 1;
    voz.pitch = 1;

    speechSynthesis.speak(voz);
}

function repetirPregunta(){

    let textoVoz =
    document.getElementById("pregunta").textContent
        .replace("×", " por ")
        .replace("+", " más ")
        .replace("-", " menos ");

    hablar(textoVoz);
}

function generarPregunta(){
let tipo = Math.floor(Math.random()*5);

    let pregunta = "";

    if(tipo === 0){

        let a = Math.floor(Math.random()*9000)+1000;
        let b = Math.floor(Math.random()*900)+100;

        tipoActual = "suma";
        numeroA = a;
        numeroB = b;

        pregunta = `${a} + ${b}`;
        respuestaCorrecta = a+b;
    }

    else if(tipo === 1){

        let a = Math.floor(Math.random()*9000)+1000;
        let b = Math.floor(Math.random()*900)+100;

        tipoActual = "resta";
        numeroA = a;
        numeroB = b;

        pregunta = `${a} - ${b}`;
        respuestaCorrecta = a-b;
    }

    else if(tipo === 2){

        let a = Math.floor(Math.random()*12)+2;
        let b = Math.floor(Math.random()*10)+2;

        tipoActual = "multiplicacion";
        numeroA = a;
        numeroB = b;

        pregunta = `${a} × ${b}`;
        respuestaCorrecta = a*b;
    }

    else if(tipo === 3){

        let a = Math.floor(Math.random()*9000)+1000;

        tipoActual = "centenas";
        numeroA = a;

        pregunta = `¿Cuál es la cifra de las centenas en ${a}?`;

        respuestaCorrecta = Math.floor(a/100)%10;
    }

    else{

        let a = Math.floor(Math.random()*5000)+1000;
        let b = Math.floor(Math.random()*5000)+1000;

        tipoActual = "completar";
        numeroInicial = a;
        numeroFinal = a+b;

        pregunta = `¿Cuánto falta para llegar de ${a} a ${a+b}?`;

        respuestaCorrecta = b;
    }

    document.getElementById("pregunta").textContent = pregunta;
    document.getElementById("respuesta").value = "";

    let textoVoz = pregunta
        .replace("×", " por ")
        .replace("+", " más ")
        .replace("-", " menos ");

    hablar(textoVoz);
}

function comprobar(){
    let respuesta =
    Number(document.getElementById("respuesta").value);

    if(respuesta === respuestaCorrecta){

        puntos += 10;
        monedas += 1;

        posicion += 60;

        document.getElementById("mensaje").innerHTML =
        "🎉 ¡Correcto! ¡Muy bien!";

        document.getElementById("mensaje").className =
        "correcto";

        document.getElementById("jugador").style.left =
        posicion + "px";

        document.getElementById("puntos").textContent = puntos;
        document.getElementById("monedas").textContent = monedas;

        if(monedas >= 10){

            document.getElementById("pregunta").innerHTML =
            "🏆 ¡Encontraste el tesoro!";

            document.getElementById("mensaje").innerHTML =
            "🎊 ¡Ganaste la aventura matemática!";

            hablar(
            "Felicitaciones. Has encontrado el tesoro y ganado la aventura matemática."
            );

            return;
        }

        setTimeout(generarPregunta, 1200);
    }

    else{

        let explicacion = "";

        if(tipoActual === "suma"){

            explicacion =
            `La respuesta correcta era <b>${respuestaCorrecta}</b>.<br><br>
            ${numeroA} + ${numeroB} = ${respuestaCorrecta}<br>
            Recuerda sumar primero las unidades, luego las decenas y después las centenas.`;
        }

        else if(tipoActual === "resta"){

            explicacion =
            `La respuesta correcta era <b>${respuestaCorrecta}</b>.<br><br>
            ${numeroA} - ${numeroB} = ${respuestaCorrecta}<br>
            Recuerda restar cada posición comenzando por las unidades.`;
        }

        else if(tipoActual === "multiplicacion"){

            explicacion =
            `La respuesta correcta era <b>${respuestaCorrecta}</b>.<br><br>
            ${numeroA} × ${numeroB} = ${respuestaCorrecta}<br>
            Multiplicar es sumar el mismo número varias veces.`;
        }

        else if(tipoActual === "centenas"){

            let miles = Math.floor(numeroA/1000);
            let centenas = Math.floor(numeroA/100)%10;
            let decenas = Math.floor(numeroA/10)%10;
            let unidades = numeroA%10;

            explicacion =
            `La respuesta correcta era <b>${respuestaCorrecta}</b>.<br><br>
            ${numeroA} se compone de:<br>
            ${miles} unidades de mil<br>
            ${centenas} centenas<br>
            ${decenas} decenas<br>
            ${unidades} unidades<br><br>
            La cifra de las centenas es ${centenas}.`;
        }

        else if(tipoActual === "completar"){

            explicacion =
            `La respuesta correcta era <b>${respuestaCorrecta}</b>.<br><br>
            Para saber cuánto falta, restamos:<br>
            ${numeroFinal} - ${numeroInicial} = ${respuestaCorrecta}`;
        }

        document.getElementById("mensaje").innerHTML =
        "❌ Respuesta incorrecta.<br><br>" + explicacion;

        document.getElementById("mensaje").className =
        "incorrecto";
        hablar(
        `Respuesta incorrecta. La respuesta correcta era ${respuestaCorrecta}`
        );
    }
}


generarPregunta();