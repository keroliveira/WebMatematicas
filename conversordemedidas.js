// PEGANDO TODOS OS CONVERSORES
const conversores = document.querySelectorAll(".conversor");

// CONFIGURANDO CADA CONVERSOR
conversores.forEach(function (conversor) {
    
    // ELEMENTOS DESTE CONVERSOR
    const unidades = conversor.querySelectorAll(".unidade");
    const valorInicial = conversor.querySelector(".valor-inicial");
    const respostaAluno = conversor.querySelector(".resposta-aluno");
    const unidadeOrigemTexto = conversor.querySelector(".unidade-origem");
    const destinoEscolhido = conversor.querySelector(".destino-escolhido");
    const verificar = conversor.querySelector(".verificar");
    const resultado = conversor.querySelector(".resultado");

    // VARIÁVEIS DA CONVERSÃO
    let unidadeOrigem = null;
    let unidadeDestino = null;

    // ESCOLHA DAS UNIDADES
    unidades.forEach(function (botao) {

        botao.addEventListener(
            "click",
            function () {

                // PRIMEIRO CLIQUE:
                // UNIDADE DE ORIGEM
                if (unidadeOrigem === null) {
                    unidadeOrigem = botao;
                    botao.classList.add(
                        "origem-selecionada"
                    );

                    unidadeOrigemTexto.textContent =
                        botao.textContent.trim();
                    resultado.textContent = "";
                    return;
                }

                // SEGUNDO CLIQUE:
                // UNIDADE DE DESTINO
                if (unidadeDestino === null) {

                    // Não permite selecionar
                    // a mesma unidade
                    if (botao === unidadeOrigem) {
                        resultado.textContent =
                            "Escolha outra unidade!";
                        return;
                    }

                    unidadeDestino = botao;

                    botao.classList.add(
                        "destino-selecionada"
                    );

                    destinoEscolhido.textContent =
                        botao.textContent.trim();

                    resultado.textContent = "";
                    return;
                }

                // TERCEIRO CLIQUE:
                // COMEÇA UMA NOVA CONVERSÃO
                limparSelecao();

                unidadeOrigem = botao;

                botao.classList.add(
                    "origem-selecionada"
                );

                unidadeOrigemTexto.textContent =
                    botao.textContent.trim();

                respostaAluno.value = "";
                resultado.textContent = "";
            }
        );
    });

    // FUNÇÃO PARA LIMPAR A SELEÇÃO
    function limparSelecao() {

        unidades.forEach(function (botao) {
            botao.classList.remove(
                "origem-selecionada"
            );

            botao.classList.remove(
                "destino-selecionada"
            );
        });

        unidadeOrigem = null;
        unidadeDestino = null;

        unidadeOrigemTexto.textContent =
            "ORIGEM";

        destinoEscolhido.textContent =
            "?";
    }

    // VERIFICAR A CONVERSÃO
    function verificarConversao() {

        // VERIFICA O VALOR INICIAL
        if (valorInicial.value.trim() === "") {
            resultado.textContent =
                "DIGITE UM VALOR!";
            return;
        }

        // VERIFICA A UNIDADE DE ORIGEM
        if (unidadeOrigem === null) {
            resultado.textContent =
                "Escolha a unidade de origem!";
            return;
        }

        // VERIFICA A UNIDADE DE DESTINO
        if (unidadeDestino === null) {
            resultado.textContent =
                "Escolha a unidade de destino!";
            return;
        }

        // VERIFICA A RESPOSTA DO ALUNO
        if (respostaAluno.value.trim() === "") {
            resultado.textContent =
                "Digite uma resposta!";

            return;
        }

        // CONVERTE VÍRGULA PARA PONTO
        const valor =
            transformarEmNumero(
                valorInicial.value
            );

        const resposta =
            transformarEmNumero(
                respostaAluno.value
            );

        // Verifica se são números válidos
        if (
            Number.isNaN(valor) ||
            Number.isNaN(resposta)
        ) {
            resultado.textContent =
                "Digite apenas números!";

            return;
        }

        // FATORES
        const fatorOrigem =
            Number(
                unidadeOrigem.dataset.fator
            );

        const fatorDestino =
            Number(
                unidadeDestino.dataset.fator
            );

        // FAZ A CONVERSÃO
        const valorNaUnidadeBase =
            valor * fatorOrigem;

        const respostaCorreta =
            valorNaUnidadeBase /
            fatorDestino;

        // COMPARAÇÃO
        if (
            numerosSaoIguais(
                resposta,
                respostaCorreta
            )
        ) {
            resultado.textContent =
                "Muito bem! A resposta está correta! 🎉";
        }

        else {
            resultado.textContent =
                "Vamos conferir as respostas... 😞";
        }
    }

    // BOTÃO VERIFICAR
    verificar.addEventListener(
        "click",
        verificarConversao
    );

    // TECLA ENTER
    respostaAluno.addEventListener(
        "keydown",
        function (event) {
            if (event.key === "Enter") {

                verificarConversao();
            }
        }
    );
});

// TRANSFORMAR TEXTO EM NÚMERO
function transformarEmNumero(valor) {

    /*
        Aceita:
        1,5
        1.5
        25
        0,025
    */

    const valorConvertido =
        valor.replace(",", ".");
    return Number(valorConvertido);
}

// COMPARAR NÚMEROS DECIMAIS
function numerosSaoIguais(
    numero1,
    numero2
) {
    const diferenca =
        Math.abs(
            numero1 - numero2
        );
    return diferenca < 0.0000001;
}