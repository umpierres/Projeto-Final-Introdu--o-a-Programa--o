const usuarioLogado = buscarDadosLocalStorage('usuarioLogado');
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
    const sectionAtualizar = document.querySelector('#sectionAtualizar');
    sectionAtualizar.setAttribute('class', 'sectionAtualizarEditar');
    sectionAtualizar.innerHTML = `
    <div id="divAtualizar">
                    <form id="formAtualizar">
                        <input
                            type="text"
                            name="novoTitulo"
                            class='inputEditar'
                            id="novoTitulo"
                            placeholder="Atualizar Titulo"
                            required
                        />
                        <input
                            type="text"
                            class='inputEditar'
                            name="novaMensagem"
                            id="novaMensagem"
                            placeholder="Atualizar Mensagem"
                        />
                       <button type='submit' id='botaoSalvarEdicao' class='botaoTabela'>Salvar</button>
                       <button type='button' id='botaoCancelarEdicao' class='botaoTabela'>Cancelar</button>
                    </form>
        </div>`;
    const formAtualizar = document.querySelector('#formAtualizar');
    formAtualizar.addEventListener('submit', (evento) => {
        evento.preventDefault();
        const novoTitulo = document.querySelector('#novoTitulo').value;
        const novaMensagem = document.querySelector('#novaMensagem').value;
        listaCadastros[index].recados[indice].titulo = novoTitulo;
        listaCadastros[index].recados[indice].mensagem = novaMensagem;

        guardarDadosLocalStorage('cadastrosUsuarios', listaCadastros);
        mostrarRegistrosHTML();
        sectionAtualizar.innerHTML = '';
        sectionAtualizar.classList.remove('sectionAtualizarEditar');
    });
    const botaoCancelarEdicao = document.querySelector('#botaoCancelarEdicao');
    botaoCancelarEdicao.addEventListener('click', (evento) => {
        sectionAtualizar.innerHTML = '';
        sectionAtualizar.classList.remove('sectionAtualizarEditar');
    });
}

function apagarRecado(indice) {
    const trRemove = document.getElementById(indice);
    trRemove.remove();
    listaCadastros[index].recados.splice(indice, 1);
    guardarDadosLocalStorage('cadastrosUsuarios', listaCadastros);
    mostrarRegistrosHTML();
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
        return {};
    }
}
