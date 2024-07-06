import { clienteService } from "../service/cliente-service.js";

const formulario = document.querySelector("[data-form]");

formulario.addEventListener("submit", async (evento) => {
    // Previne o corpotamento padrão de enviar diretamente, pois não checaria o restante do evento
    evento.preventDefault();
    try {
        // O objeto 'evento' é instanciado no momento do 'submit' pelo navegador dentro do escopo, neste caso, do formulario
        const nome = evento.target.querySelector("[data-nome]").value;
        const email = evento.target.querySelector("[data-email]").value;
        // Esses dois data-attributes estão dentro do escopo do data-form
        const criaCliente = await clienteService.criaCliente(nome, email); // Retorna os dois valores para o método que irá fazer o 'POST'
        window.location.href = "../telas/cadastro_concluido.html"; // Envia o usuário para a pagina citada
    } catch (erro) {
        console.log(error);
        window.location.href = "../telas.erro.html";
    }
});
