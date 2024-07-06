const listaClientes = () => {
    return fetch(`http://localhost:3000/profile`) // Já realiza o "GET" e retorna uma promise
        .then(resposta => { // A promise é retornada como um arquivo interpretável
            if(resposta.ok){
                return resposta.json();
            } else{
                throw new Error('Não foi possível listar os clientes')
            }
        })
};

const criaCliente = (nome, email) => { // Recebe os parâmetros do retorno da controller
    return fetch(`http://localhost:3000/profile`, {
        method: 'POST', // Método de envio
        headers: { // Tipo de informação enviada
            'Content-type' : 'application/json', 
        },
        body: JSON.stringify({ // O que exatamente será passado
            nome: nome, 
            email: email
        }) // Fica no parenseteses porque o "stringfy" será usado no conteudo inteiro
    })
    .then(resposta => { // Execução após a requisição
        if(resposta.ok){
            return resposta.body
        } else{
            throw new Error('Não foi possível criar um cliente')
        }
    })
}

const removeCliente = (id) => {
    return fetch(`http://localhost:3000/profile/${id}`, { // Vai remover o cliente pelo id
        method: 'DELETE'
    }).then(resposta => {
        if(!resposta.ok){
            throw new Error('Não foi possível remover um cliente')
        }
    })
}

const detalhaCliente = (id) => {
    // Passando o id por parametro garantimos que iremos modificar somente os dados do cliente desejado
    return fetch(`http://localhost:3000/profile/${id}`)
    .then((resposta) => {
        if(resposta.ok){
            return resposta.json();
        } else{
            throw new Error('Não foi possível listar os clientes')
        }     
    }) 
}

const atualizaCliente = (id, nome, email) => {  
    return fetch(`http://localhost:3000/profile/${id}`, {
        method: 'PUT', 
        headers: {
            'Content-type' : 'application/json',            
        },
        body: JSON.stringify({ 
            nome: nome, 
            email: email
        })
    })
    .then(resposta => {
        if(resposta.ok){
            return resposta.json();
        } else{
            throw new Error('Não foi possível listar os clientes')
        }        
    })
}

export const clienteService = {
    listaClientes,
    criaCliente,
    removeCliente,
    detalhaCliente,
    atualizaCliente
}