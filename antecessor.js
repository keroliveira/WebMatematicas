const numero = document.getElementById("numero");
const respostaAntecessor = document.getElementById("respostaAntecessor");
const respostaSucessor = document.getElementById("respostaSucessor");
const verificar = document.getElementById("verificar");
const resultado = document.getElementById("resultado");

verificar.addEventListener("click", function () {

    const valor = Number(numero.value);
    const antecessor = Number(respostaAntecessor.value);
    const sucessor = Number(respostaSucessor.value);

    if (antecessor === valor - 1 && sucessor === valor + 1) {
        resultado.textContent = "Muito bem! As duas respostas estão corretas! 🎉";

    } else {
        resultado.textContent = "Vamos conferir as respostas... 😞";
    }

});