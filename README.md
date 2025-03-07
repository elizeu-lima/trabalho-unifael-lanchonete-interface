# 1. Estrutura da Aplicação

## A aplicação é dividida em três telas principais:

Tela de Pedidos:

Onde o usuário visualiza o menu, adiciona itens ao pedido e vê a lista de itens selecionados.

Tela de Pagamento:

Onde o usuário escolhe a forma de pagamento (cartão/dinheiro ou PIX) e confirma o pagamento.

Tela de Agradecimento:

Onde o usuário recebe uma mensagem de confirmação e pode voltar para fazer um novo pedido.

Além disso, há um sistema de modal (ou alert) para exibir mensagens de erro ou confirmação.

# 2. Fluxo da Aplicação

## Aqui está o fluxo básico da aplicação:

Adicionar Itens ao Pedido:

O usuário clica em "Adicionar" em um item do menu.

O item é adicionado ao array pedido, e o total é atualizado.

A lista de pedidos é atualizada na tela.

Finalizar Pedido:

O usuário clica em "Finalizar Pedido".

Se não houver itens no pedido, um alert é exibido.

Caso contrário, a tela de pagamento é exibida.

Escolher Forma de Pagamento:

O usuário seleciona uma forma de pagamento (cartão/dinheiro ou PIX).

Clica em "Confirmar Pagamento".

Um alert é exibido confirmando o pagamento.

A tela de agradecimento é exibida.

Voltar aos Pedidos:

Na tela de agradecimento, o usuário clica em "Fazer Novo Pedido".

O pedido é reiniciado, e a tela de pedidos é exibida novamente.

# 3. Lógica do JavaScript

## A lógica principal da aplicação está no arquivo script.js. Vamos detalhar cada parte:

a. Variáveis Globais
javascript
Copy
let pedido = []; // Array para armazenar os itens do pedido
let total = 0; // Variável para armazenar o valor total do pedido
pedido: Um array que armazena objetos representando os itens do pedido. Cada objeto contém o nome e o preço do item.

total: Uma variável que armazena o valor total do pedido.

b. Função addItem
javascript
Copy
function addItem(nome, preco) {
    pedido.push({ nome, preco }); // Adiciona o item ao array "pedido"
    total += preco; // Atualiza o total
    atualizarPedido(); // Atualiza a exibição do pedido
}
O que faz:

Adiciona um item ao array pedido.

Atualiza o total somando o preço do item.

Chama a função atualizarPedido para atualizar a exibição na tela.

Quando é chamada:

Quando o usuário clica em "Adicionar" em um item do menu.

c. Função removerItem
javascript
Copy
function removerItem(index) {
    total -= pedido[index].preco; // Subtrai o preço do item do total
    pedido.splice(index, 1); // Remove o item do array "pedido"
    atualizarPedido(); // Atualiza a exibição do pedido
}
O que faz:

Remove um item do array pedido com base no índice.

Atualiza o total subtraindo o preço do item.

Chama a função atualizarPedido para atualizar a exibição na tela.

Quando é chamada:

Quando o usuário clica em "Remover" ao lado de um item na lista de pedidos.

d. Função atualizarPedido
javascript
Copy
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
O que faz:

Atualiza a lista de pedidos na tela.

Atualiza o total na tela de pedidos e na tela de pagamento.

Quando é chamada:

Sempre que um item é adicionado ou removido do pedido.

e. Função irParaPagamento
javascript
Copy
function irParaPagamento() {
    if (pedido.length === 0) {
        alert('Adicione itens ao pedido antes de finalizar.'); // Exibe alerta de erro
    } else {
        document.getElementById('tela-pedidos').classList.add('hidden'); // Oculta a tela de pedidos
        document.getElementById('tela-pagamento').classList.remove('hidden'); // Exibe a tela de pagamento
    }
}
O que faz:

Verifica se há itens no pedido.

Se não houver itens, exibe um alert de erro.

Caso contrário, oculta a tela de pedidos e exibe a tela de pagamento.

Quando é chamada:

Quando o usuário clica em "Finalizar Pedido".

f. Função finalizarPagamento
javascript
Copy
function finalizarPagamento() {
    const formaPagamento = document.querySelector('input[name="pagamento"]:checked').value; // Obtém a forma de pagamento selecionada
    alert(`Pagamento confirmado via ${formaPagamento === 'pix' ? 'PIX' : 'Cartão/Dinheiro'}.`); // Exibe alerta de confirmação
    // Oculta a tela de pagamento e exibe a tela de agradecimento
    document.getElementById('tela-pagamento').classList.add('hidden');
    document.getElementById('tela-agradecimento').classList.remove('hidden');
}
O que faz:

Obtém a forma de pagamento selecionada (cartão/dinheiro ou PIX).

Exibe um alert confirmando o pagamento.

Oculta a tela de pagamento e exibe a tela de agradecimento.

Quando é chamada:

Quando o usuário clica em "Confirmar Pagamento".

g. Função voltarParaPedidos
javascript
Copy
function voltarParaPedidos() {
    pedido = []; // Limpa o array de pedidos
    total = 0; // Zera o total
    atualizarPedido(); // Atualiza a exibição do pedido
    // Oculta as telas de pagamento e agradecimento e exibe a tela de pedidos
    document.getElementById('tela-pagamento').classList.add('hidden');
    document.getElementById('tela-agradecimento').classList.add('hidden');
    document.getElementById('tela-pedidos').classList.remove('hidden');
}
O que faz:

Limpa o array pedido e zera o total.

Atualiza a exibição do pedido.

Oculta as telas de pagamento e agradecimento e exibe a tela de pedidos.

Quando é chamada:

Quando o usuário clica em "Fazer Novo Pedido" na tela de agradecimento.

# 4. Interação com o HTML

* Botões:

* Cada botão chama uma função JavaScript quando clicado, como addItem, removerItem, irParaPagamento, etc.

* Exibição Dinâmica:

* A lista de pedidos e o total são atualizados dinamicamente usando JavaScript.

* Alternância entre Telas:

* As telas são alternadas adicionando ou removendo a classe hidden, que controla a visibilidade dos elementos.

# 5. Conclusão

* A lógica da aplicação é simples e eficiente:

* O usuário adiciona itens ao pedido.

* O pedido é atualizado em tempo real.

* O usuário finaliza o pedido e escolhe a forma de pagamento.

* Após a confirmação, o pedido é reiniciado.
