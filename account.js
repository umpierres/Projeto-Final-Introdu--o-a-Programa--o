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
const index = listaCadastros.findIndex(
    (usuario) => usuario.email === usuarioLogado.email
);

const formRecados = document.querySelector('#formSalvarRecados');

formRecados.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const tituloRecado = document.querySelector('#tituloRecado').value;
    const mensagemRecado = document.querySelector('#mensagemRecado').value;
    listaCadastros[index].recados.push({
        titulo: tituloRecado,
        mensagem: mensagemRecado,
    });

    guardarDadosLocalStorage('cadastrosUsuarios', listaCadastros);
    mostrarRegistrosHTML();
    formRecados.reset();
});

function mostrarRegistrosHTML() {
    tbody.innerHTML = '';
    listaCadastros[index].recados.forEach((valor, indice) => {
        tbody.innerHTML += `
        <tr id="${indice}">
                    <td>${indice + 1}</td>
                    <td>${valor.titulo}</td>
                    <td>${valor.mensagem}</td>
                    
                    <td><button class='botaoTabela' onclick='editarRecado(${indice})'>Editar</button>
                    <button id='botaoEditar' class='botaoTabela' onclick='apagarRecado(${indice})'>Apagar</button></td>
                </tr>
        `;
    });
}

function editarRecado(indice) {
    tbody.innerHTML += `
        <tr id="${indice}">
                    <td><h3 id='h3EditarRecados'>Editando o recado numero: ${
                        indice + 1
                    }</h3></td>
                    <td><input
                    id="tituloRecadoEditar"
                    class='inputEditarRecados'
                    type="text"
                    placeholder="Titulo"
                /></td>
                    <td><input
                    id="mensagemRecadoEditar"
                    class='inputEditarRecados'
                    type="text"
                    placeholder="Mensagem"
                /></td>
                    <td><button class='botaoTabela' onclick='salvarRecado(${indice})'>Salvar</button>
                </tr>
        `;
    document.querySelector('#tituloRecadoEditar').focus();
}

function salvarRecado(indice) {
    const novoTitulo = document.querySelector('#tituloRecadoEditar').value;
    const novaMensagem = document.querySelector('#mensagemRecadoEditar').value;
    if (!novoTitulo) {
        alert('Você precisa digitar um titulo para seu recado');
        return;
    }
    listaCadastros[index].recados[indice].titulo = novoTitulo;
    listaCadastros[index].recados[indice].mensagem = novaMensagem;

    guardarDadosLocalStorage('cadastrosUsuarios', listaCadastros);
    mostrarRegistrosHTML();
}
function apagarRecado(indice) {
    const trRemove = document.getElementById(indice);
    trRemove.remove();
    listaCadastros[index].recados.splice(indice, 1);
    guardarDadosLocalStorage('cadastrosUsuarios', listaCadastros);
}

function sair() {
    localStorage.removeItem('usuarioLogado');
    window.location.href = './index.html';
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
