let titulo_recado = document.querySelector('#titulo-recado');
let mensagem_recado = document.querySelector('#mensagem-recado');
let mensagens = [];
console.log(titulo_recado);
console.log(mensagem_recado);

function salvarRecado() {
    let recados = {
        titulo: titulo_recado.value,
        mensagem: mensagem_recado.value,
    };
    mensagens.push(recados);
    console.log(mensagens);
}
