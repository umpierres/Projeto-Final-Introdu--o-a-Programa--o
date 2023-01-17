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
console.log(index);
const formRecados = document.querySelector('#formSalvarRecados');

formRecados.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const tituloRecado = document.querySelector('#tituloRecado').value;
    const mensagemRecado = document.querySelector('#mensagemRecado').value;

    listaCadastros[index].recados.push({
        titulo: tituloRecado,
        mensagem: mensagemRecado,
    });
    console.log(listaCadastros[index]);

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
                    <button class='botaoTabela' onclick='apagarRecado(${indice})'>Apagar</button></td>
                </tr>
        `;
    });
}

/* function editarRecado(indice) {
    const trRemove = document.getElementById(indice);
    trRemove.remove();
    listaCadastros[index].recados.splice(indice, 1);
    guardarDadosLocalStorage('cadastrosUsuarios', listaCadastros);
    mostrarRegistrosHTML();
} */

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
