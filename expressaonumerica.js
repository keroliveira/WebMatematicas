// EXPRESSÃO NUMÉRICA
// ELEMENTOS DO HTML
const expressaoElemento = 
    document.getElementById("expressao");
const respostaAluno =
    document.getElementById("respostaAluno");
const verificar =
    document.getElementById("verificar");
const resultado =
    document.getElementById("resultado");
const apagar =
    document.getElementById("apagar");
const limpar =
    document.getElementById("limpar");
const teclas =
    document.querySelectorAll(".tecla");

// VARIÁVEL QUE GUARDA A EXPRESSÃO
let expressao = "";

// CLICAR NAS TECLAS
teclas.forEach(function (tecla) {
    tecla.addEventListener("click", function () {

        const valor =
            tecla.dataset.valor;

        // Adiciona o símbolo à expressão
        expressao += valor;

        // Atualiza o visor
        atualizarExpressao();

        // Limpa mensagem anterior
        resultado.textContent = "";
    });
});

// MOSTRAR A EXPRESSÃO
function atualizarExpressao() {
    let visualizacao =
        expressao;

    // Troca o símbolo interno *
    // pelo símbolo matemático ×
    visualizacao =
        visualizacao.replace(
            /\*/g,
            "×"
        );

    // Troca / por ÷
    visualizacao =
        visualizacao.replace(
            /\//g,
            "÷"
        );

    // Mostra a expressão
    expressaoElemento.textContent =
        visualizacao;
}

// APAGAR ÚLTIMO SÍMBOLO
apagar.addEventListener(
    "click",
    function () {
        expressao =
            expressao.slice(
                0,
                -1
            );
        atualizarExpressao();
        resultado.textContent = "";
    }
);

// LIMPAR TUDO
limpar.addEventListener(
    "click",
    function () {
        expressao = "";
        respostaAluno.value = "";
        atualizarExpressao();
        resultado.textContent = "";
    }
);

// VERIFICAR RESPOSTA
verificar.addEventListener(
    "click",
    function () {
        // EXPRESSÃO VAZIA
        if (expressao === "") {
            resultado.textContent =
                "Monte uma expressão!";
            return;
        }

        // RESPOSTA VAZIA
        if (
            respostaAluno.value.trim() === ""
        ) {
            resultado.textContent =
                "Digite uma resposta!";
            return;
        }

        // CALCULA A EXPRESSÃO
        const respostaCorreta =
            calcularExpressao(expressao);

        // EXPRESSÃO INVÁLIDA
        if (
            respostaCorreta === null
        ) {
            resultado.textContent =
                "Expressão inválida!";
            return;
        }

        // RESPOSTA DO ALUNO
        const resposta =
            Number(
                respostaAluno.value
                    .replace(",", ".")
            );

        // VERIFICA SE É NÚMERO
        if (
            Number.isNaN(resposta)
        ) {
            resultado.textContent =
                "Didite apenas números!";
            return;
        }

        // COMPARAÇÃO
        if (
            Math.abs(
                resposta -
                respostaCorreta
            ) < 0.0000001
        ) {
            resultado.textContent =
                "Muito bem! A resposta está correta! 🎉";
        } else {
            resultado.textContent =
                "Vamos conferir a resposta... 😞";
        }
    }
);


// CALCULAR EXPRESSÃO
function calcularExpressao(expressaoOriginal) {
    try {

        // VERIFICA OS AGRUPADORES
        if (
            !agrupadoresValidos(
                expressaoOriginal
            )
        ) {
            return null;
        }

        // CRIA O INTERPRETADOR
        let posicao = 0;

        // FUNÇÃO PRINCIPAL
        function lerExpressao() {
            let valor =
                lerTermo();
            while (
                posicao < expressaoOriginal.length
            ) {
                const operador =
                    expressaoOriginal[posicao];

                // SOMA
                if (
                    operador === "+"
                ) {
                    posicao++;
                    valor +=
                        lerTermo();
                }

                // SUBTRAÇÃO
                else if (
                    operador === "-"
                ) {
                    posicao++;
                    valor -=
                        lerTermo();
                }

                else {
                    break;
                }
            }

            return valor;
        }

        // MULTIPLICAÇÃO E DIVISÃO
        function lerTermo() {
            let valor =
                lerFator();

            while (
                posicao < expressaoOriginal.length
            ) {

                const operador =
                    expressaoOriginal[posicao];

                // MULTIPLICAÇÃO
                if (
                    operador === "*"
                ) {
                    posicao++;
                    valor *=
                        lerFator();
                }

                // DIVISÃO
                else if (
                    operador === "/"
                ) {
                    posicao++;
                    const divisor =
                        lerFator();

                    // Não permite divisão por zero
                    if (
                        divisor === 0
                    ) {
                        throw new Error(
                            "Divisão por zero"
                        );
                    }

                    valor /=
                        divisor;
                }

                else {
                    break;
                }
            }

            return valor;
        }

        // NÚMEROS E AGRUPADORES
        function lerFator() {
            
            // Ignora espaços
            while (
                expressaoOriginal[posicao] === " "
            ) {
                posicao++;
            }

            const caractere =
                expressaoOriginal[posicao];

            // NÚMERO
            if (
                /[0-9]/.test(caractere)
            ) {
                let numero = "";

                while (
                    posicao <
                        expressaoOriginal.length &&

                    /[0-9]/.test(
                        expressaoOriginal[posicao]
                    )
                ) {
                    numero +=
                        expressaoOriginal[posicao];

                    posicao++;

                }

                return Number(numero);
            }

      
            // PARÊNTESES
            if (
                caractere === "("
            ) {
                posicao++;

                const valor =
                    lerExpressao();

                if (
                    expressaoOriginal[posicao]
                    !== ")"
                ) {
                    throw new Error(
                        "Parêntese inválido"
                    );
                }

                posicao++;

                return valor;
            }

            // COLCHETES
            if (
                caractere === "["
            ) {
                posicao++;

                const valor =
                    lerExpressao();
                if (
                    expressaoOriginal[posicao]
                    !== "]"
                ) {
                    throw new Error(
                        "Colchete inválido"
                    );
                }

                posicao++;

                return valor;
            }

            // CHAVES
            if (
                caractere === "{"
            ) {
                posicao++;

                const valor =
                    lerExpressao();
                if (
                    expressaoOriginal[posicao]
                    !== "}"
                ) {
                    throw new Error(
                        "Chave inválida"
                    );
                }

                posicao++;

                return valor;
            }

            // CASO INVÁLIDO
            throw new Error(
                "Expressão inválida"
            );
        }

        // COMEÇA A LEITURA
        const resultadoFinal =
            lerExpressao();

        // VERIFICA SE SOBROU ALGUM SÍMBOLO
        while (
            posicao <
            expressaoOriginal.length
        ) {
            if (
                expressaoOriginal[posicao]
                !== " "
            ) {
                return null;
            }

            posicao++;
        }

        // RESULTADO FINAL
        if (
            !Number.isFinite(
                resultadoFinal
            )
        ) {
            return null;
        }

        return resultadoFinal;
    }

    catch (erro) {
        return null;
    }
}

// VERIFICAR AGRUPADORES
function agrupadoresValidos(expressao) {
    const pilha = [];
    for (
        let i = 0;
        i < expressao.length;
        i++
    ) {
        const simbolo =
            expressao[i];
        // ABERTURA
        if (
            simbolo === "(" ||
            simbolo === "[" ||
            simbolo === "{"
        ) {
            pilha.push(simbolo);
        }

        // FECHAMENTO
        else if (
            simbolo === ")" ||
            simbolo === "]" ||
            simbolo === "}"
        ) {
            if (
                pilha.length === 0
            ) {
                return false;
            }

            const abertura =
                pilha.pop();

            // PARÊNTESES
            if (
                simbolo === ")" &&
                abertura !== "("
            ) {
                return false;
            }

            // COLCHETES
            if (
                simbolo === "]" &&
                abertura !== "["
            ) {
                return false;
            }

            // CHAVES
            if (
                simbolo === "}" &&
                abertura !== "{"
            ) {
                return false;
            }
        }
    }

    // SE A PILHA ESTIVER VAZIA, TODOS OS AGRUPADORES FORAM FECHADOS
    return pilha.length === 0;
}