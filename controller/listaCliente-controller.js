import { clienteService } from "../service/cliente-service.js";

const criaNovaLinha = (nome, email, id) => {
    const linhaNovoCliente = document.createElement('tr'); // Cria um elemento
    const conteudo = `
        <td class="td" data-td>${nome}</td>
        <td>${email}</td>
        <td>
            <ul class="tabela__botoes-controle">
                <li><a href="../telas/edita_cliente.html?id=${id}"class="botao-simples botao-simples--editar">Editar</a></li>
                <li><button class="botao-simples botao-simples--excluir" type="button">Excluir</button></li>
            </ul>
        </td>
    `;
    linhaNovoCliente.innerHTML = conteudo; 
    linhaNovoCliente.dataset.id = id;

    return linhaNovoCliente;
}

const tabela = document.querySelector("[data-tabela]");

tabela.addEventListener('click', async (evento) => {
    // Verifica se o evento de 'click' está relacionado ao botão com as classes
    let btnDeletar = evento.target.className === 'botao-simples botao-simples--excluir' 
    
    if(btnDeletar){ // Se isso realmente acontece, removemos ele
        try{
            const linhaCliente = evento.target.closest('[data-id]');
            let id = linhaCliente.dataset.id;
            await clienteService.removeCliente(id)
            linhaCliente.remove();  
        } catch(erro) {
            console.log(error);
            window.location.href = '../telas.erro.html';
        }
    }
})

const render = async () => {
    try{
    // Chama a função listaClientes para buscar a lista de clientes do servidor quando os dados forem retornados com sucesso
    const listaClientes = await clienteService.listaClientes() // Promise

    listaClientes.forEach((elemento) => {    
    // O elemento pai é a tabela com o atributo "data-tabela" e o elemento filho é o retorno de "criaNovaLinha", que no caso é o "linhaNovoCliente" 
    tabela.appendChild(criaNovaLinha(elemento.nome, elemento.email, elemento.id)); 
        });
    } catch(erro) {
        console.log(error);
        window.location.href = '../telas.erro.html';
    }
}

render();