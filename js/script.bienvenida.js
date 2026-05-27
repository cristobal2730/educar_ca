
        // Obtener datos guardados
        let nombre = localStorage.getItem("nombreUsuario");
        let avatar = localStorage.getItem("avatarUsuario");

        // Mostrar información
        document.getElementById("mensaje").innerText =
            "Bienvenido " + nombre;

        document.getElementById("avatar").src = avatar;

        // Voz automática
        function hablar(texto){

            let mensaje = new SpeechSynthesisUtterance(texto);

            mensaje.lang = "es-CL";

            speechSynthesis.speak(mensaje);
        }

        hablar("Bienvenido " + nombre);


