// PEGANDO OS ELEMENTOS DO HTML
const primeiroNumero = document.getElementById("primeiroNumero");
const segundoNumero = document.getElementById("segundoNumero");
const resposta = document.getElementById("resposta");
const verificar = document.getElementById("verificar");
const mensagem = document.getElementById("mensagem");

// FUNÇÃO PARA VERIFICAR A RESPOSTA
function verificarResposta() {

    // RESPOSTA DA PROFESSORA
    const numero1 = Number(primeiroNumero.value);
    const numero2 = Number(segundoNumero.value);

    // RESPOSTA DO ESTUDANTE
    const respostaEstudante = Number(resposta.value);

    // VERIFICAÇÃO SE AS DUAS OPÇÕES FORAM ESCOLHIDAS
    if (primeiroNumero.value === "" || segundoNumero.value === "") {
        mensagem.textContent = "Escolha os dois números!";
        return;
    }

    // VERIFICAÇÃO DA RESPOSTA DO ESTUDANTE
    if (resposta.value === "") {
        mensagem.textContent = "Digite uma resposta!";
        return;
    }

    // MULTIPLICAÇÃO
    const resultadoCorreto = numero1 * numero2;

    // VERIFICAÇÃO
    if (respostaEstudante === resultadoCorreto) {
        mensagem.textContent = "Muito bem! A resposta está correta! 🎉";

    } else {
        mensagem.textContent = "Vamos conferir a resposta... 😞";
    }
}

// BOTÃO VERIFICAR
verificar.addEventListener("click", verificarResposta);

// TECLA ENTER
resposta.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        verificarResposta();

    }
});