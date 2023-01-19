const listaCadastros = buscarDadosLocalStorage('cadastrosUsuarios');
const formLogin = document.querySelector('#formLogin');

formLogin.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const erroDeDadosHTML = document.querySelector('#erroDeDados');
    const usuario = document.querySelector('#usuario').value;
    const email = document.querySelector('#email').value;
    const senha = document.querySelector('#senha').value;
    const usuarioExiste = listaCadastros.find((usuarioPessoa) => {
        return (
            usuarioPessoa.usuario === usuario &&
            usuarioPessoa.email === email &&
            usuarioPessoa.senha === senha
        );
    });
    if (!usuarioExiste) {
        erroDeDadosHTML.innerHTML =
            '<p class="erroDeDados">Credencias invalidas</p>';
        setTimeout(() => {
            erroDeDadosHTML.innerHTML = '';
        }, 3000);
        return;
    } else {
        guardarDadosLocalStorage('usuarioLogado', usuarioExiste);
        window.location.href = './account.html';
    }
    setTimeout(() => {
        window.location.href = './index.html';
    }, 200);
});

document.addEventListener('DOMContentLoaded', () => {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (usuarioLogado) {
        window.location.href = './account.html';
    }
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
