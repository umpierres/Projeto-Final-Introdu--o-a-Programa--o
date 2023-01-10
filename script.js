const form = document.querySelector('#form_criar_conta');
let titulo_recado = document.querySelector('#titulo-recado');
let mensagem_recado = document.querySelector('#mensagem-recado');
const erroSenha = document.querySelector('#erroDeSenha');
let mensagens = [];
console.log(titulo_recado);
console.log(mensagem_recado);
function entrarConta(event) {
    event.preventDefault();
    console.log('funciona');
}

function criarConta(event) {
    event.preventDefault();
    if (form.senha.value !== form.repitaSenha.value) {
        console.log(erroSenha);
        erroSenha.innerHTML = `<p>As senhas devem ser iguais</p>`;
        return;
    } else {
        localStorage.setItem('usuario', form.usuario.value);
        localStorage.setItem('email', form.email.value);
        localStorage.setItem('senha', form.senha.value);
        localStorage.setItem('repitaSenha', form.repitaSenha.value);
        erroSenha.innerHTML = ``;
    }
}

function salvarRecado(event) {
    event.preventDefault();
    let recados = {
        titulo: titulo_recado.value,
        mensagem: mensagem_recado.value,
    };
    mensagens.push(recados);
    console.log(mensagens);
    localStorage.setItem(mensagens);
}
