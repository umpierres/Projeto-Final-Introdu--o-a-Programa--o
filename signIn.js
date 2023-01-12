const listaCadastros = buscarDadosLocalStorage('cadastrosUsuarios');

const formCriarConta = document.querySelector('#cadastro');
formCriarConta.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const erroDeDadosHTML = document.querySelector('#erroDeDados');
    const usuario = document.querySelector('#usuario').value;
    const email = document.querySelector('#email').value;
    const reEmail = document.querySelector('#reEmail').value;
    const senha = document.querySelector('#senha').value;
    const reSenha = document.querySelector('#reSenha').value;
    console.log(senha);
    console.log(reSenha);
    console.log(email);
    console.log(reEmail);
    if (senha !== reSenha || email !== reEmail) {
        erroDeDadosHTML.innerHTML =
            '<p class="erroDeDados">Os dados não são iguais</p>';
        return;
    }
    if (
        listaCadastros.some(
            (usuarioCadastrado) => usuarioCadastrado.email === email
        )
    ) {
        erroDeDadosHTML.innerHTML =
            '<p class="erroDeDados">Esse usuario já está cadastrado</p>';
        return;
    }
    setTimeout(() => {
        window.location.href = './index.html';
    }, 200);

    const novoUsuario = {
        usuario,
        email,
        senha,
        recados: [],
    };

    listaCadastros.push(novoUsuario);
    guardarDadosLocalStorage('cadastrosUsuarios', listaCadastros);

    formCriarConta.reset();
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
