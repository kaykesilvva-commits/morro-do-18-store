const botao = document.getElementById("abrirPersonalizacao");
const area = document.getElementById("areaPersonalizacao");
const valorTotal = document.getElementById("valorTotal");

botao.addEventListener("click", () => {

    botao.style.display = "none";

    area.innerHTML = `
        <textarea id="personalizacao"
        placeholder="Descreva toda a personalização desejada..."></textarea>

        <button
        type="button"
        id="cancelarExtra"
        class="removerExtra">

        🗑 Cancelar Personalização

        </button>
    `;

    valorTotal.textContent = "R$ 17,00";

    document
    .getElementById("cancelarExtra")
    .addEventListener("click", () => {

        area.innerHTML = "";

        botao.style.display = "block";

        valorTotal.textContent = "R$ 15,00";

    });

});const btnFinalizar = document.getElementById("finalizarPedido");

btnFinalizar.addEventListener("click", async function (e) {

    const nome = document.getElementById("nomeCamisa").value.trim();
    const numero = document.getElementById("numeroCamisa").value.trim();

    const erroNome = document.getElementById("erroNome");
const erroNumero = document.getElementById("erroNumero");

const campoNome = document.getElementById("nomeCamisa");
const campoNumero = document.getElementById("numeroCamisa");

// Limpa os erros antigos
erroNome.style.display = "none";
erroNumero.style.display = "none";

campoNome.classList.remove("campoErro");
campoNumero.classList.remove("campoErro");

if (nome === "") {

    e.preventDefault();

    erroNome.innerText = "Digite o nome da camisa.";
    erroNome.style.display = "block";

    campoNome.classList.add("campoErro");
    campoNome.focus();

    return;
}

if (numero === "") {

    e.preventDefault();

    erroNumero.innerText = "Digite o número da camisa.";
    erroNumero.style.display = "block";

    campoNumero.classList.add("campoErro");
    campoNumero.focus();

    return;
}
const frase = document.getElementById("fraseCamisa").value;

const extra = document.getElementById("personalizacao")
    ? document.getElementById("personalizacao").value
    : "Nenhuma";

localStorage.setItem("nomeCamisa", nome);
localStorage.setItem("numeroCamisa", numero);
localStorage.setItem("fraseCamisa", frase);
localStorage.setItem("extraCamisa", extra);
localStorage.setItem("valorTotal", valorTotal.innerText);

const resposta = await fetch("/api/create-payment", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        nome,
        numero,
        frase,
        extra,
        total: valorTotal.innerText
    })
});

const dados = await resposta.json();

alert(dados.mensagem);
});