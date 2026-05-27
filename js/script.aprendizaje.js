function hablar(texto){
    let voz = new SpeechSynthesisUtterance(texto);
    voz.lang = 'en-US';
    speechSynthesis.speak(voz);
}
