// ELEMENTOS DO HTML
const numero = document.getElementById("numero");
const respostas = document.querySelectorAll(".resposta");
const verificar = document.getElementById("verificar");
const resultado = document.getElementById("resultado");

// LIMITAR O NÚMERO A 5 ALGARISMOS
numero.addEventListener("input", function () {
    // Impede números maiores que 99.999
    if (numero.value > 99999) {
        numero.value = 99999;
    }

    // Impede números negativos
    if (numero.value < 0) {
        numero.value = 0;
    }
});

// VERIFICAR A DECOMPOSIÇÃO
function verificarDecomposicao() {

    // Verifica se a professora digitou um número
    if (numero.value === "") {
        resultado.textContent =
            "Digite um número!";
        return;
    }

    // Converte o número para Number
    const valor = Number(numero.value);

    // CALCULA AS CINCO PARTES
    const dezenaMilhar =
        Math.floor(valor / 10000) * 10000;
    const unidadeMilhar =
        Math.floor((valor % 10000) / 1000) * 1000;
    const centena =
        Math.floor((valor % 1000) / 100) * 100;
    const dezena =
        Math.floor((valor % 100) / 10) * 10;
    const unidade =
        valor % 10;

    // GUARDA A DECOMPOSIÇÃO CORRETA
    const decomposicaoCorreta = [
        dezenaMilhar,
        unidadeMilhar,
        centena,
        dezena,
        unidade
    ];

    // VERIFICA SE TODOS OS CAMPOS FORAM PREENCHIDOS
    for (let i = 0; i < respostas.length; i++) {
        if (respostas[i].value === "") {
            resultado.textContent =
                "Preencha todas as parcelas!";
            return;
        }
    }

    // COMPARA AS RESPOSTAS
    let tudoCorreto = true;
    
    for (let i = 0; i < respostas.length; i++) {
        const respostaAluno =
            Number(respostas[i].value);
        if (
            respostaAluno !== decomposicaoCorreta[i]
        ) {
            tudoCorreto = false;
        }
    }

    // RESULTADO FINAL
    if (tudoCorreto) {
        resultado.textContent =
            "Muito bem! A resposta está correta! 🎉";
    } else {
        resultado.textContent =
            "Vamos conferir as respostas... 😞";
    }
}

// BOTÃO VERIFICAR
verificar.addEventListener(
    "click",
    verificarDecomposicao
);

// TECLA ENTER
respostas.forEach(function (campo) {
    campo.addEventListener(
        "keydown",
        function (event) {
            if (event.key === "Enter") {
                verificarDecomposicao();
            }
        }
    );
});