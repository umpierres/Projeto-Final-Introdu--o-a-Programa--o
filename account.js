const usuarioLogado = buscarDadosLocalStorageObjeto('usuarioLogado');
document.addEventListener('DOMContentLoaded', () => {
    if (!usuarioLogado.email) {
        window.location.href = './index.html';
    } else {
        mostrarRegistrosHTML();
    }
});
const listaCadastros = buscarDadosLocalStorage('cadastrosUsuarios');
const tbody = document.querySelector('#tabelaBody');

const formRecados = document.querySelector('#formSalvarRecados');

formRecados.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const tituloRecado = document.querySelector('#tituloRecado').value;
    const mensagemRecado = document.querySelector('#mensagemRecado').value;

    usuarioLogado.recados.push({
        titulo: tituloRecado,
        mensagem: mensagemRecado,
    });
    salvarUsuarios();
    mostrarRegistrosHTML();
    formRecados.reset();
});

function mostrarRegistrosHTML() {
    tbody.innerHTML = '';
    usuarioLogado.recados.forEach((valor, indice) => {
        tbody.innerHTML += `
        <tr id="${indice}">
                    <td>${indice + 1}</td>
                    <td>${valor.titulo}</td>
                    <td>${valor.mensagem}</td>
                    
                    <td><button class='botaoTabela' onclick='editarRecado()'>Editar</button>
                    <button class='botaoTabela' onclick='apagarRecado(${indice})'>Apagar</button></td>
                </tr>
        `;
    });
}

function editarRecado() {}
function apagarRecado(indice) {
    const trRemove = document.getElementById(indice);
    trRemove.remove();
    usuarioLogado.recados.splice(indice, 1);
    salvarUsuarios();
}

function sair() {
    localStorage.removeItem('usuarioLogado');
    window.location.href = './index.html';
}

function salvarUsuarios() {
    const indice = listaCadastros.findIndex(
        (usuario) => usuario.email === usuarioLogado.email
    );

    guardarDadosLocalStorage('usuarioLogado', {
        usuario: usuarioLogado.usuario,
        email: usuarioLogado.email,
        senha: usuarioLogado.senha,
        recados: usuarioLogado.recados,
    });
    listaCadastros[indice].recados = usuarioLogado.recados;
    guardarDadosLocalStorage('cadastrosUsuarios', listaCadastros);
}

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
function buscarDadosLocalStorageObjeto(chave) {
    if (localStorage.getItem(chave)) {
        return JSON.parse(localStorage.getItem(chave));
    } else {
        return {};
    }
}
