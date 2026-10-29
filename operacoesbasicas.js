// PEGANDO TODAS AS OPERAÇÕES
const operacoes = document.querySelectorAll(".operacao-jogo");

const LIMITE_MAXIMO = 9999999;

// CONFIGURANDO CADA OPERAÇÃO
operacoes.forEach(function (operacao) {

    // ELEMENTOS DESTA OPERAÇÃO
    const primeiroNumero =
        operacao.querySelector(".primeiro-numero");

    const segundoNumero =
        operacao.querySelector(".segundo-numero");

    const resposta =
        operacao.querySelector(".resposta-aluno");

    const verificar =
        operacao.querySelector(".verificar");

    const mensagem =
        operacao.querySelector(".mensagem");

    const tipoOperacao =
        operacao.dataset.operacao;

    // LIMITAR OS NÚMEROS DE ENTRADA
    primeiroNumero.addEventListener("input", function () {
        limitarNumero(primeiroNumero);
    });

    segundoNumero.addEventListener("input", function () {
        limitarNumero(segundoNumero);
    });

    // BOTÃO VERIFICAR
    verificar.addEventListener("click", function () {
        verificarResposta(
            tipoOperacao,
            primeiroNumero,
            segundoNumero,
            resposta,
            mensagem
        );
    });

    // TECLA ENTER NOS CAMPOS
    [
        primeiroNumero,
        segundoNumero,
        resposta
    ].forEach(function (campo) {

        campo.addEventListener("keydown", function (event) {

            if (event.key === "Enter") {
                event.preventDefault();

                verificarResposta(
                    tipoOperacao,
                    primeiroNumero,
                    segundoNumero,
                    resposta,
                    mensagem
                );
            }

        });

    });

});

// FUNÇÃO PARA LIMITAR OS NÚMEROS
function limitarNumero(input) {

    if (input.value === "") {
        return;
    }

    let valor = Number(input.value);

    // Impede números maiores que 9.999.999
    if (valor > LIMITE_MAXIMO) {
        valor = LIMITE_MAXIMO;
    }

    // Impede números negativos
    if (valor < 0) {
        valor = 0;
    }

    input.value = valor;
}

// FUNÇÃO PRINCIPAL DE VERIFICAÇÃO
function verificarResposta(
    tipoOperacao,
    primeiroNumero,
    segundoNumero,
    resposta,
    mensagem
) {

    // VERIFICA SE OS CAMPOS FORAM PREENCHIDOS
    if (
        primeiroNumero.value.trim() === "" ||
        segundoNumero.value.trim() === ""
    ) {
        mensagem.textContent = "Digite os dois números!";
        return;
    }

    if (resposta.value.trim() === "") {
        mensagem.textContent = "Digite uma resposta!";
        return;
    }

    // CONVERTE OS VALORES
    const numero1 = Number(primeiroNumero.value);
    const numero2 = Number(segundoNumero.value);
    const respostaEstudante = Number(resposta.value);

    // VERIFICA SE OS VALORES SÃO INTEIROS E VÁLIDOS
    if (
        !Number.isSafeInteger(numero1) ||
        !Number.isSafeInteger(numero2) ||
        numero1 < 0 ||
        numero2 < 0 ||
        numero1 > LIMITE_MAXIMO ||
        numero2 > LIMITE_MAXIMO
    ) {
        mensagem.textContent =
            "Digite números inteiros entre 0 e 9.999.999!";
        return;
    }

    if (!Number.isSafeInteger(respostaEstudante)) {
        mensagem.textContent =
            "Digite uma resposta inteira válida!";
        return;
    }

    // IMPEDE A DIVISÃO POR ZERO
    if (tipoOperacao === "divisao" && numero2 === 0) {
        mensagem.textContent =
            "O divisor precisa ser diferente de zero!";
        return;
    }

    // CALCULA O RESULTADO
    let resultadoCorreto;

    if (tipoOperacao === "soma") {
        resultadoCorreto = numero1 + numero2;
    }

    else if (tipoOperacao === "subtracao") {
        resultadoCorreto = numero1 - numero2;
    }

    else if (tipoOperacao === "multiplicacao") {
        resultadoCorreto = numero1 * numero2;
    }

    else if (tipoOperacao === "divisao") {
        resultadoCorreto = numero1 / numero2;

        // MANTÉM A DIVISÃO COM RESULTADO INTEIRO
        if (!Number.isInteger(resultadoCorreto)) {
            mensagem.textContent =
                "Escolha números que tenham uma divisão exata!";
            return;
        }
    }

    else {
        mensagem.textContent =
            "Não foi possível identificar a operação.";
        return;
    }

    // VERIFICA A RESPOSTA
    if (respostaEstudante === resultadoCorreto) {
        mensagem.textContent =
            "Muito bem! A resposta está correta! 🎉";
    } else {
        mensagem.textContent =
            "Vamos conferir as respostas... 😞";
    }

}