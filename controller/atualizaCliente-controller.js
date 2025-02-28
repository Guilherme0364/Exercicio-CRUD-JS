import { clienteService } from "../service/cliente-service.js";

( async () => {
    const pegaUrl = new URL(window.location);

    const id = pegaUrl.searchParams.get('id');

    const inputNome = document.querySelector('[data-nome]');
    const inputEmail = document.querySelector('[data-email]');
    try{
        const dados = await clienteService.detalhaCliente(id)    
        inputNome.value = dados.nome
        inputEmail.value = dados.email    
    } catch(erro){
        console.log(error);
        window.location.href = '../telas.erro.html';
    }

    const formulario = document.querySelector('[data-form]');

    formulario.addEventListener('submit', async (evento) => {
        evento.preventDefault();
        try{
            await clienteService.atualizaCliente(id, inputNome.value, inputEmail.value) // Passa os valores digitados
            window.location.href = '../telas/edicao_concluida.html';        
        } catch(erro){
            console.log(error);
            window.location.href = '../telas.erro.html';
        }
    })
})()

