const listaCadastros = buscarDadosLocalStorage('cadastrosUsuarios');
const usuarioLogado = buscarDadosLocalStorage('usuarioLogado');
const tbody = document.querySelector('#tabelaBody');
/* document.addEventListener('DOMContentLoaded', mostrarRegistrosHTML()); */
document.addEventListener('DOMContentLoaded', () => {
    if (!usuarioLogado) {
        window.location.href = './index.html';
    } else {
        /* mostrarRegistrosHTML(); */
    }
});
const formRecados = document.querySelector('#formSalvarRecados');

formRecados.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const tituloRecado = document.querySelector('#tituloRecado').value;
    const mensagemRecado = document.querySelector('#mensagemRecado').value;
});

/* function mostrarRegistrosHTML() {
    tbody.innerHTML = '';
    usuarioLogado.recados.forEach((valor, indice) => {
        tbody.innerHTML += `
        <tr>
                    <td>${indice + 1}</td>
                    <td>${valor.nome}</td>
                    <td>${valor.endereco}, ${valor.cidade}, ${valor.estado}</td>
                    
                    <td><button class='botaoTabela' onclick='editarRecado()'>Editar</button>
                    <button class='botaoTabela' onclick='apagarRecado()'>Apagar</button></td>
                </tr>
        `;
    });
} */

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
