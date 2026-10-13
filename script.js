function mostrarMensagem() {
    alert("Bem-vindo à minha loja!");
}

let carrinho = [];

function adicionarProduto(nome, preco) {

    let produtoExistente = carrinho.find(
        produto => produto.nome === nome
    );

    if (produtoExistente) {
        produtoExistente.quantidade++;
    } else {
        carrinho.push({
            nome: nome,
            preco: preco,
            quantidade: 1
        });
    }

    atualizarCarrinho();
}


function aumentarQuantidade(nome) {

    let produto = carrinho.find(
        produto => produto.nome === nome
    );

    if (produto) {
        produto.quantidade++;
    }

    atualizarCarrinho();
}


function diminuirQuantidade(nome) {

    let produto = carrinho.find(
        produto => produto.nome === nome
    );

    if (produto && produto.quantidade > 1) {
        produto.quantidade--;
    }

    atualizarCarrinho();
}


function atualizarCarrinho() {

    let carrinhoHTML = "";
    let total = 0;

    for (let produto of carrinho) {

        total = total + (produto.preco * produto.quantidade);

        carrinhoHTML += `
            <div>
                <p>
                    ${produto.nome} - R$ ${produto.preco.toFixed(2)}
                </p>

                <button onclick="diminuirQuantidade('${produto.nome}')">
                    -
                </button>

                <span>${produto.quantidade}</span>

                <button onclick="aumentarQuantidade('${produto.nome}')">
                    +
                </button>
            </div>
        `;
    }

    document.getElementById("carrinho").innerHTML = carrinhoHTML;

    document.getElementById("total").textContent = total.toFixed(2);
}


function limparCarrinho() {
    carrinho = [];

    atualizarCarrinho();
}