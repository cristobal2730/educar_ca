let respuestaCorrecta = [];
let puntaje = 0;
let ejercicioResuelto = false;

function hablar(texto){

    if(!('speechSynthesis' in window)) return;

    speechSynthesis.cancel();

    const voz = new SpeechSynthesisUtterance(texto);
    voz.lang = "es-CL";
    voz.rate = 1;

    speechSynthesis.speak(voz);
}

function nuevoJuego(){

    ejercicioResuelto = false;

    document.getElementById("mensaje").innerHTML = "";

    const contenedorNumeros = document.getElementById("numeros");
    const zonaOrden = document.getElementById("zonaOrden");

    contenedorNumeros.innerHTML = "";
    zonaOrden.innerHTML = "";

    let numeros = [];

    while(numeros.length < 5){

        let numero = Math.floor(Math.random()*10000)+1;

        if(!numeros.includes(numero)){
            numeros.push(numero);
        }
    }

    respuestaCorrecta = [...numeros].sort((a,b)=>a-b);

    numeros.sort(()=>Math.random()-0.5);

    numeros.forEach(numero=>{

        const tarjeta = document.createElement("div");

        tarjeta.className = "numero";
        tarjeta.textContent = numero;
        tarjeta.draggable = true;

        tarjeta.addEventListener("dragstart", ()=>{
            elementoArrastrado = tarjeta;
        });

        contenedorNumeros.appendChild(tarjeta);
    });

    hablar("Ordena los números desde el menor hasta el mayor.");
}

let elementoArrastrado = null;

const zonaOrden = document.getElementById("zonaOrden");

zonaOrden.addEventListener("dragover",(e)=>{
    e.preventDefault();
});

zonaOrden.addEventListener("drop",(e)=>{
    e.preventDefault();

    if(elementoArrastrado){
        zonaOrden.appendChild(elementoArrastrado);
    }
});

function comprobar(){

    if(ejercicioResuelto){
        return;
    }

    const elementos = document.querySelectorAll("#zonaOrden .numero");

    if(elementos.length !== 5){

        document.getElementById("mensaje").innerHTML =
        "⚠️ Debes ordenar todos los números.";

        hablar("Debes ordenar todos los números.");
        return;
    }

    const respuestaAlumno = [];

    elementos.forEach(elemento=>{
        respuestaAlumno.push(Number(elemento.textContent));
    });

    let correcta = true;

    for(let i=0;i<respuestaCorrecta.length;i++){

        if(respuestaAlumno[i] !== respuestaCorrecta[i]){
            correcta = false;
            break;
        }
    }

    if(correcta){

        ejercicioResuelto = true;

        puntaje += 10;

        document.getElementById("score").textContent = puntaje;

        document.getElementById("mensaje").innerHTML =
        "🎉 ¡Excelente! Ordenaste correctamente los números.";
        lanzarConfetti();

        document.getElementById("mensaje").style.color = "green";
        lanzarConfetti();
        hablar("Excelente trabajo. Has ordenado correctamente los números.");

    }else{

    document.getElementById("mensaje").innerHTML =
        "❌ El orden no es correcto. Inténtalo nuevamente.";

        document.getElementById("mensaje").style.color = "red";

        hablar("El orden no es correcto. Inténtalo nuevamente.");

        setTimeout(() => {
            nuevoJuego();
        }, 2000);
        }
}

window.onload = ()=>{

    nuevoJuego();

    document.body.addEventListener("click", function activarAudio(){
        hablar("Bienvenido. Ordena los números desde el menor hasta el mayor.");
        document.body.removeEventListener("click", activarAudio);
    });
};
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