const listaCadastros = buscarDadosLocalStorage('cadastrosUsuarios');
document.addEventListener('DOMContentLoaded', () => {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (usuarioLogado) {
        window.location.href = './account.html';
    }
});
const formCriarConta = document.querySelector('#cadastro');
formCriarConta.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const erroDeDadosHTML = document.querySelector('#erroDeDados');
    const usuario = document.querySelector('#usuario').value;
    const email = document.querySelector('#email').value;
    const reEmail = document.querySelector('#reEmail').value;
    const senha = document.querySelector('#senha').value;
    const reSenha = document.querySelector('#reSenha').value;
    if (senha !== reSenha || email !== reEmail) {
        erroDeDadosHTML.innerHTML =
            '<p class="erroDeDados">Os dados não são iguais</p>';
        setTimeout(() => {
            erroDeDadosHTML.innerHTML = '';
        }, 3000);
        return;
    }
    if (
        listaCadastros.some((usuarioCadastrado) => {
            if (
                usuarioCadastrado.email === email ||
                usuarioCadastrado.usuario === usuario
            ) {
                return true;
            }
        })
    ) {
        erroDeDadosHTML.innerHTML =
            '<p class="erroDeDados">Esse usuario já está cadastrado</p>';
        formCriarConta.reset();
        setTimeout(() => {
            erroDeDadosHTML.innerHTML = '';
        }, 3000);
        return;
    }

    const novoUsuario = {
        usuario,
        email,
        senha,
        recados: [],
    };

    listaCadastros.push(novoUsuario);
    guardarDadosLocalStorage('cadastrosUsuarios', listaCadastros);
});

function guardarDadosLocalStorage(chave, valor) {
    localStorage.setItem(chave, JSON.stringify(valor));
}

function buscarDadosLocalStorage(chave) {
    if (localStorage.getItem(chave)) {
        return JSON.parse(localStorage.getItem(chave));
    } else {
        return [];
    }
}
