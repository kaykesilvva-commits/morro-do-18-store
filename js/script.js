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

// Converte "R$ 15,00" para 15
const total = valorTotal.innerText
    .replace("R$", "")
    .replace(",", ".")
    .trim();

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
        total: Number(total)
    })
});

const dados = await resposta.json();

console.log(dados);

if (!resposta.ok) {
    alert(dados.erro || "Erro ao criar o PIX.");
    return;
}

alert("PIX criado com sucesso!");
});