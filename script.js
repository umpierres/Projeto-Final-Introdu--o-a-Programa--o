const form = document.querySelector('#form_criar_conta');
function entrarConta() {
    console.log('funciona');
}

function criarConta() {
    localStorage.setItem('usuario', form.usuario.value);
    localStorage.setItem('email', form.email.value);
    localStorage.setItem('senha', form.senha.value);
    localStorage.setItem('repitaSenha', form.repitaSenha.value);
}

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
    localStorage.setItem(mensagens);
}
