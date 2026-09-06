// PEGANDO TODAS AS OPERAÇÕES
const operacoes = document.querySelectorAll(".operacao-jogo");

// CONFIGURANDO CADA OPERAÇÃO
operacoes.forEach(function (operacao) {

    // Elementos pertencentes a esta operação
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

    // Descobre qual é a operação
    const tipoOperacao =
        operacao.dataset.operacao;

    // LIMITAR OS NÚMEROS A 6 ALGARISMOS
    primeiroNumero.addEventListener(
        "input",
        function () {
            limitarNumero(primeiroNumero);
        }
    );

    segundoNumero.addEventListener(
        "input",
        function () {
            limitarNumero(segundoNumero);
        }
    );

    // BOTÃO VERIFICAR
    verificar.addEventListener(
        "click",
        function () {
            verificarResposta(
                tipoOperacao,
                primeiroNumero,
                segundoNumero,
                resposta,
                mensagem
            );
        }
    );

    // TECLA ENTER
    resposta.addEventListener(
        "keydown",
        function (event) {
            if (event.key === "Enter") {
                verificarResposta(
                    tipoOperacao,
                    primeiroNumero,
                    segundoNumero,
                    resposta,
                    mensagem
                );
            }
        }
    );
});

// FUNÇÃO PARA LIMITAR OS NÚMEROS
function limitarNumero(input) {
    if (input.value > 999999) {
        input.value = 999999;
    }

    if (input.value < 0) {
        input.value = 0;
    }
}

// FUNÇÃO PRINCIPAL DE VERIFICAÇÃO
function verificarResposta(
    tipoOperacao,
    primeiroNumero,
    segundoNumero,
    resposta,
    mensagem
) {

    // Verifica os números da operação
    if (
        primeiroNumero.value === "" ||
        segundoNumero.value === ""
    ) {
        mensagem.textContent =
            "Digite os dois números!";

        return;
    }

    // Verifica a resposta do estudante
    if (resposta.value === "") {
        mensagem.textContent =
            "Digite uma resposta!";
        return;
    }

    // Converte os valores
    const numero1 =
        Number(primeiroNumero.value);
    const numero2 =
        Number(segundoNumero.value);
    const respostaEstudante =
        Number(resposta.value);

    // CALCULA O RESULTADO
    let resultadoCorreto;
    if (tipoOperacao === "soma") {
        resultadoCorreto =
            numero1 + numero2;
    }

    else if (tipoOperacao === "subtracao") {
        resultadoCorreto =
            numero1 - numero2;
    }

    else if (tipoOperacao === "multiplicacao") {
        resultadoCorreto =
            numero1 * numero2;
    }

    else if (tipoOperacao === "divisao") {
        resultadoCorreto =
            numero1 / numero2;
    }

    // VERIFICA A RESPOSTA
    if (respostaEstudante === resultadoCorreto) {
        mensagem.textContent =
            "Muito bem! A resposta está correta! 🎉";
    }
    else {
        mensagem.textContent =
            "Vamos conferir as respostas... 😞";

    }
}