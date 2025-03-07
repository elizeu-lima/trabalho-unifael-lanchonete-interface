let pedido = []; // Array para armazenar os itens do pedido
let total = 0; // Variável para armazenar o valor total do pedido

// Função para adicionar um item ao pedido
function addItem(nome, preco) {
    pedido.push({ nome, preco }); // Adiciona o item ao array "pedido"
    total += preco; // Atualiza o total
    atualizarPedido(); // Atualiza a exibição do pedido
}

// Função para remover um item do pedido
function removerItem(index) {
    total -= pedido[index].preco; // Subtrai o preço do item do total
    pedido.splice(index, 1); // Remove o item do array "pedido"
    atualizarPedido(); // Atualiza a exibição do pedido
}

// Função para atualizar a exibição do pedido e o total
function atualizarPedido() {
    const listaPedido = document.getElementById('lista-pedido'); // Seleciona a lista de pedidos
    const totalElement = document.getElementById('total'); // Seleciona o elemento que exibe o total
    const totalPagamento = document.getElementById('total-pagamento'); // Seleciona o total na tela de pagamento
    listaPedido.innerHTML = ''; // Limpa a lista de pedidos

    // Itera sobre os itens do pedido e os exibe na lista
    pedido.forEach((item, index) => {
        const li = document.createElement('li'); // Cria um novo elemento <li>
        li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`; // Adiciona o nome e o preço do item
        const btnRemover = document.createElement('button'); // Cria um botão "Remover"
        btnRemover.textContent = 'Remover'; // Define o texto do botão
        btnRemover.onclick = () => removerItem(index); // Adiciona a função de remover ao botão
        li.appendChild(btnRemover); // Adiciona o botão ao <li>
        listaPedido.appendChild(li); // Adiciona o <li> à lista de pedidos
    });

    // Atualiza o total na tela de pedidos e na tela de pagamento
    totalElement.textContent = total.toFixed(2);
    totalPagamento.textContent = total.toFixed(2);
}

// Função para ir para a tela de pagamento
function irParaPagamento() {
    if (pedido.length === 0) {
        alert('Adicione itens ao pedido antes de finalizar.'); // Exibe alerta de erro
    } else {
        document.getElementById('tela-pedidos').classList.add('hidden'); // Oculta a tela de pedidos
        document.getElementById('tela-pagamento').classList.remove('hidden'); // Exibe a tela de pagamento
    }
}

// Função para finalizar o pagamento
function finalizarPagamento() {
    const formaPagamento = document.querySelector('input[name="pagamento"]:checked').value; // Obtém a forma de pagamento selecionada
    alert(`Pagamento confirmado via ${formaPagamento === 'pix' ? 'PIX' : 'Cartão/Dinheiro'}.`); // Exibe alerta de confirmação
    // Oculta a tela de pagamento e exibe a tela de agradecimento
    document.getElementById('tela-pagamento').classList.add('hidden');
    document.getElementById('tela-agradecimento').classList.remove('hidden');
}

// Função para voltar à tela de pedidos
function voltarParaPedidos() {
    pedido = []; // Limpa o array de pedidos
    total = 0; // Zera o total
    atualizarPedido(); // Atualiza a exibição do pedido
    // Oculta as telas de pagamento e agradecimento e exibe a tela de pedidos
    document.getElementById('tela-pagamento').classList.add('hidden');
    document.getElementById('tela-agradecimento').classList.add('hidden');
    document.getElementById('tela-pedidos').classList.remove('hidden');
}