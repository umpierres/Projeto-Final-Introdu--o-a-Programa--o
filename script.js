const listaCadastros = [
    {
        nome: 'alexandra',
        email: 'alexandraumpierres@outlook.com',
        senha: '123',
    },
];
const formCriarConta = document.querySelector('.cadastro');
formCriarConta.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const erroDeDados = document.querySelector('#erroDeDados');

    const nome = document.querySelector('#usuario').value;
    const email = document.querySelector('#email').value;
    const repitaEmail = document.querySelector('#repitaEmail').value;
    const senha = document.querySelector('#senha').value;
    const repitaSenha = document.querySelector('#repitaSenha').value;
    const emailExiste = listaCadastros.some((valor) => valor.email === email);
    const senhaExiste = listaCadastros.some((valor) => valor.senha === senha);
    if (senha !== repitaSenha || email !== repitaEmail) {
        erroDeDados.innerHTML = '<p>Os dados não são compativeis</p>';
        return;
    }
    if (emailExiste) {
        erroDeDados.innerHTML = '<p>Esse usuario já esta cadastrado</p>';
        return;
    }

    if (senhaExiste) {
        erroDeDados.innerHTML = '<p>Esse usuario já esta cadastrado</p>';
        return;
    }

    const novoUsuario = {
        nome,
        email,
        senha,
    };
    listaCadastros.push(novoUsuario);
    erroDeDados.innerHTML = '';
    formCriarConta.reset();
});

const formLogin = document.querySelector('.cadastro');
formLogin.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const nome = document.querySelector('#usuario').value;
    const email = document.querySelector('#email').value;
    const senha = document.querySelector('#senha').value;
    const usuarioNaoExiste = document.querySelector('#usuarioNaoExiste');
    const emailExiste = listaCadastros.some((valor) => valor.email === email);
    console.log(emailExiste);
    const nomeExiste = listaCadastros.some((valor) => valor.nome === nome);
    console.log(nomeExiste);
    const senhaExiste = listaCadastros.some((valor) => valor.senha === senha);
    console.log(senhaExiste);
    if (!emailExiste) {
        usuarioNaoExiste.innerHTML = '<p>Esse usuario não existe</p>';
        return;
    }
});
console.log(listaCadastros);
