
const carrinho = [];

const botoesAdicionar = document.querySelectorAll(
    ".produto button"
);

const painel = document.getElementById("carrinho-painel");
const contador = document.getElementById("contador-carrinho");
const lista = document.getElementById("lista-carrinho");
const totalElemento = document.getElementById("total-carrinho");

const formatarPreco = (valor) =>
    valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

// ADICIONAR PRODUTOS
botoesAdicionar.forEach((botao) => {
    botao.addEventListener("click", () => {
        const produto = botao.closest(".produto");

        const nome = produto.querySelector("h3").textContent;
        const precoTexto = produto.querySelector("strong").textContent;

        const preco = Number(
            precoTexto.replace("R$", "")
                .trim()
                .replace(/\./g, "")
                .replace(",", ".")
        );

        carrinho.push({ nome, preco });

        atualizarCarrinho();
    });
});

// ATUALIZAR CARRINHO
function atualizarCarrinho() {
    lista.innerHTML = "";
    let total = 0;

     
carrinho.forEach((produto, indice) => {
    const item = document.createElement("li");

    const nome = document.createElement("span");
    nome.textContent =
        `${produto.nome} - ${formatarPreco(produto.preco)}`;

    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "Remover";
    botaoRemover.className = "remover-produto";

    botaoRemover.addEventListener("click", () => {
        carrinho.splice(indice, 1);
        atualizarCarrinho();
    });

    item.appendChild(nome);
    item.appendChild(botaoRemover);
    lista.appendChild(item);

    total += produto.preco;
});


    contador.textContent = carrinho.length;
    totalElemento.textContent = formatarPreco(total);
}

// ABRIR E FECHAR
document.getElementById("abrir-carrinho")
    .addEventListener("click", () => {
        painel.classList.add("ativo");
    });

document.getElementById("fechar-carrinho")
    .addEventListener("click", () => {
        painel.classList.remove("ativo");
    });
    
// Número fictício para demonstração.
// Substitua por um número real antes de usar com clientes.
const numeroWhatsApp = "5511944623120";

document.getElementById("finalizar-pedido")
    .addEventListener("click", () => {

        if (carrinho.length === 0) {
            alert("Adicione um produto ao carrinho!");
            return;
        }

        if (!numeroWhatsApp) {
            alert("Configure o número da hamburgueria antes de enviar pedidos.");
            return;
        }

        let mensagem = "Olá! Gostaria de fazer um pedido:\n\n";
        let total = 0;

        carrinho.forEach((produto) => {
            mensagem +=
                `🍔 ${produto.nome} - ${formatarPreco(produto.preco)}\n`;

            total += produto.preco;
        });

        mensagem += `\nTotal: ${formatarPreco(total)}`;
        mensagem += "\n\nAguardo a confirmação do pedido!";

        const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

        window.open(url, "_blank", "noopener,noreferrer");
    });

