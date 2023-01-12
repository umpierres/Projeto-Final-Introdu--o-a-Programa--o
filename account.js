document.addEventListener('DOMContentLoaded', () => {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (!usuarioLogado) {
        window.location.href = './index.html';
    } else {
        mostrarRegistrosHTML();
    }
});

function mostrarRegistrosHTML() {}
