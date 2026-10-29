 // ELEMENTOS DO HTML
const numero = document.getElementById("numero");
const respostas = document.querySelectorAll(".resposta");
const verificar = document.getElementById("verificar");
const resultado = document.getElementById("resultado");

const LIMITE_MAXIMO = 9999999;
const QUANTIDADE_ORDENS = 7;

// LIMITAR O NÚMERO A 7 ALGARISMOS
numero.addEventListener("input", function () {
    if (numero.value === "") {
        return;
    }

    let valor = Number(numero.value);

    // Impede números maiores que 9.999.999
    if (valor > LIMITE_MAXIMO) {
        valor = LIMITE_MAXIMO;
    }

    // Impede números negativos
    if (valor < 0) {
        valor = 0;
    }

    numero.value = valor;
});

// VERIFICAR A DECOMPOSIÇÃO
function verificarDecomposicao() {

    // Verifica se o número foi digitado
    if (numero.value.trim() === "") {
        resultado.textContent = "Digite um número!";
        return;
    }

    const valor = Number(numero.value);

    // Verifica se o número é inteiro e está dentro do limite
    if (
        !Number.isInteger(valor) ||
        valor < 0 ||
        valor > LIMITE_MAXIMO
    ) {
        resultado.textContent =
            "Digite um número inteiro entre 0 e 9.999.999!";
        return;
    }

    // Verifica se o HTML possui as sete parcelas
    if (respostas.length !== QUANTIDADE_ORDENS) {
        resultado.textContent =
            "Confira se o jogo possui os sete campos de resposta.";
        return;
    }

    // CALCULA AS SETE ORDENS
    const digitos = String(valor)
        .padStart(QUANTIDADE_ORDENS, "0")
        .split("")
        .map(Number);

    const decomposicaoCorreta = digitos.map(
        (digito, indice) =>
            digito * (10 ** (QUANTIDADE_ORDENS - 1 - indice))
    );

    // VERIFICA SE TODAS AS PARCELAS FORAM PREENCHIDAS
    for (let i = 0; i < respostas.length; i++) {
        if (respostas[i].value.trim() === "") {
            resultado.textContent =
                "Preencha todas as parcelas, inclusive os zeros!";
            return;
        }
    }

    // COMPARA AS RESPOSTAS
    let tudoCorreto = true;

    for (let i = 0; i < respostas.length; i++) {
        const respostaAluno = Number(respostas[i].value);

        if (
            !Number.isInteger(respostaAluno) ||
            respostaAluno !== decomposicaoCorreta[i]
        ) {
            tudoCorreto = false;
            break;
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
    campo.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            verificarDecomposicao();
        }
    });
});

numero.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        verificarDecomposicao();
    }
});