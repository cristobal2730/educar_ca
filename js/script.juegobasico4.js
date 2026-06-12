let productos = [];
let puntos = 0;
let ejercicioResuelto = false;

const nombres = [
    "🍫 Chocolate",
    "🥤 Bebida",
    "🍪 Galletas",
    "🍬 Caramelos",
    "🍟 Papas fritas",
    "🧃 Jugo",
    "🍎 Manzana",
    "🥪 Sándwich",
    "🍰 Queque",
    "🍌 Plátano"
];

function hablar(texto){
    if(!('speechSynthesis' in window)) return;

    speechSynthesis.cancel();

    const voz = new SpeechSynthesisUtterance(texto);

    voz.lang = "es-CL";
    voz.rate = 1;
    voz.pitch = 1.2;

    speechSynthesis.speak(voz);
}

function generarEjercicio(){

    ejercicioResuelto = false;

    productos = [];

    for(let i=0;i<5;i++){

        productos.push({
            id:i + 1,
            nombre:nombres[Math.floor(Math.random() * nombres.length)],
            precio:(Math.floor(Math.random() * 20) + 1) * 100
        });
    }

    mezclar(productos);

    const contenedor =
    document.getElementById("productos");

    contenedor.innerHTML = "";

    productos.forEach(producto => {

        const div = document.createElement("div");

        div.className = "producto";
        div.draggable = true;

        div.dataset.precio = producto.precio;

        div.innerHTML =
        `${producto.nombre}<br>$${producto.precio}`;

        agregarEventosDrag(div);

        contenedor.appendChild(div);
    });

    document.getElementById("mensaje").innerHTML = "";
}

function mezclar(array){

    for(let i = array.length - 1; i > 0; i--){

        let j =
        Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] =
        [array[j], array[i]];
    }
}

function agregarEventosDrag(elemento){

    elemento.addEventListener("dragstart", ()=>{

        elemento.classList.add("arrastrando");
    });

    elemento.addEventListener("dragend", ()=>{

        elemento.classList.remove("arrastrando");

        const nombre =
        elemento.innerHTML.split("<br>")[0];

    });
}

document.addEventListener("dragover", e=>{

    e.preventDefault();

    const contenedor =
    document.getElementById("productos");

    const arrastrando =
    document.querySelector(".arrastrando");

    if(!arrastrando) return;

    const despuesDe =
    obtenerElementoDespues(
        contenedor,
        e.clientY
    );

    if(despuesDe == null){

        contenedor.appendChild(arrastrando);

    }else{

        contenedor.insertBefore(
            arrastrando,
            despuesDe
        );
    }
});

function obtenerElementoDespues(
contenedor,
y){

    const elementos =
    [...contenedor.querySelectorAll(
        ".producto:not(.arrastrando)"
    )];

    return elementos.reduce((cercano,hijo)=>{

        const caja =
        hijo.getBoundingClientRect();

        const offset =
        y - caja.top - caja.height / 2;

        if(
            offset < 0 &&
            offset > cercano.offset
        ){

            return {
                offset:offset,
                element:hijo
            };
        }

        return cercano;

    },{
        offset:Number.NEGATIVE_INFINITY
    }).element;
}

function comprobar(){

    if(ejercicioResuelto){
        return;
    }

    const elementos =
    [...document.querySelectorAll(".producto")];

    let correcto = true;

    for(let i = 0; i < elementos.length - 1; i++){

        let actual =
        Number(elementos[i].dataset.precio);

        let siguiente =
        Number(elementos[i + 1].dataset.precio);

        if(actual < siguiente){

            correcto = false;
            break;
        }
    }

    if(correcto){

        ejercicioResuelto = true;

        puntos += 10;

        document.getElementById("puntos")
        .textContent = puntos;

        document.getElementById("mensaje")
        .innerHTML =
        `
        🎉 ¡Excelente!<br><br>
        Ordenaste correctamente los productos
        desde el más caro al más barato.
        `;

        document.getElementById("mensaje")
        .className = "correcto";

        hablar(
            "Excelente. Ordenaste correctamente los productos."
        );

        setTimeout(
            generarEjercicio,
            2000
        );

    }else{

        document.getElementById("mensaje")
        .innerHTML =
        `
        ❌ Aún no está correcto.<br><br>
        Revisa el orden de los precios.
        `;

        document.getElementById("mensaje")
        .className = "incorrecto";

        hablar(
            "Aún no está correcto. Revisa el orden de los precios."
        );
    }
}

generarEjercicio();