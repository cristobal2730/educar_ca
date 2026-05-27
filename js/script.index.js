let avatarSeleccionado = "";

// Función voz
function hablar(texto){

    speechSynthesis.cancel();

    let mensaje = new SpeechSynthesisUtterance(texto);

    mensaje.lang = "es-CL";
    mensaje.rate = 1;

    speechSynthesis.speak(mensaje);
}

// Seleccionar avatar
function seleccionarAvatar(img){

    let avatares = document.querySelectorAll(".avatars img");

    avatares.forEach(a => {
        a.classList.remove("seleccionado");
    });

    img.classList.add("seleccionado");

    avatarSeleccionado = img.src;

    hablar("Avatar seleccionado");
}

// Función ingresar
function ingresar(){

    let nombre = document.getElementById("nombre").value.trim();

    // No escribió nada
    if(nombre === "" && avatarSeleccionado === ""){

        hablar("Debes escribir tu nombre y seleccionar un avatar");

        return;
    }

    // Nombre vacío
    if(nombre === ""){

        hablar("Debes escribir tu nombre");

        return;
    }

    // Avatar vacío
    if(avatarSeleccionado === ""){

        hablar("Debes seleccionar un avatar");

        return;
    }

    // Audio correcto
    hablar("Bien hecho " + nombre);

    // Serpentinas
    confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.6 }
    });

    // Guardar datos
    localStorage.setItem("nombreUsuario", nombre);
    localStorage.setItem("avatarUsuario", avatarSeleccionado);

    // Ir a otra página
    setTimeout(function(){

        window.location.href = "bienvenida.html";

    }, 2500);
}
