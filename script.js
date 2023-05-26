const resultado1Element = document.getElementById('resultado1');
const botao1Element = document.getElementById('botao1');

const resultado3Element = document.getElementById('resultado3');
const botao3Element = document.getElementById('botao3');

const tabelaResultadoCorpoElement = document.getElementById('tabelaResultadoCorpo');

const botaoReiniciarElement = document.getElementById('botaoReiniciar');

const modalElement = document.getElementById('modal');
const modalResultadoElement = document.getElementById('modalResultado');

const closeElement = document.getElementsByClassName('close')[0];
const modalResultadoFinalElement = document.getElementsByClassName('modalResultadoFinal');
const modal2Element = document.getElementById('modal2');

let rodada = 1;
let resultado1 = 0;
let resultado3 = 0;
let jogador1Ativo = true;
let vitoriasJogador1 = 0;
let vitoriasJogador2 = 0;

// Função para salvar os valores relevantes no localStorage
function salvarEstadoJogo() {
  localStorage.setItem('rodada', rodada);
  localStorage.setItem('resultado1', resultado1);
  localStorage.setItem('resultado3', resultado3);
  localStorage.setItem('jogador1Ativo', jogador1Ativo);
  localStorage.setItem('vitoriasJogador1', vitoriasJogador1);
  localStorage.setItem('vitoriasJogador2', vitoriasJogador2);
  salvarTabelaResultado();
}

// Função para salvar a tabela de resultados no localStorage
function salvarTabelaResultado() {
  const tabelaResultadoHTML = tabelaResultadoCorpoElement.innerHTML;
  localStorage.setItem('tabelaResultado', tabelaResultadoHTML);
}

// Função para carregar os valores do localStorage
function carregarEstadoJogo() {
  rodada = parseInt(localStorage.getItem('rodada')) || 1;
  resultado1 = parseInt(localStorage.getItem('resultado1')) || 0;
  resultado3 = parseInt(localStorage.getItem('resultado3')) || 0;
  jogador1Ativo = localStorage.getItem('jogador1Ativo') === 'true';
  vitoriasJogador1 = parseInt(localStorage.getItem('vitoriasJogador1')) || 0;
  vitoriasJogador2 = parseInt(localStorage.getItem('vitoriasJogador2')) || 0;
}

// Função para carregar a tabela de resultados do localStorage
function carregarTabelaResultado() {
  const tabelaResultadoHTML = localStorage.getItem('tabelaResultado');
  tabelaResultadoCorpoElement.innerHTML = tabelaResultadoHTML;
}

// Função para atualizar a interface com os valores carregados
function atualizarInterface() {
  resultado1Element.innerText = resultado1;
  resultado3Element.innerText = resultado3;
  botao3Element.disabled = jogador1Ativo;
  botaoReiniciarElement.disabled = !jogador1Ativo; // Desabilitar o botão de reiniciar se jogador1Ativo for falso
}

// Função para reiniciar o jogo
function reiniciarJogo() {
  tabelaResultadoCorpoElement.innerHTML = "";
  rodada = 1;
  resultado1 = 0;
  resultado3 = 0;
  jogador1Ativo = true;
  vitoriasJogador1 = 0;
  vitoriasJogador2 = 0;
  salvarEstadoJogo();
  atualizarInterface();
}

// Função para verificar o vencedor da rodada
function verificarVencedor() {
  if (resultado1Element.innerText !== '' && resultado3Element.innerText !== '') {
    const ganhador =
      resultado1Element.innerText > resultado3Element.innerText
        ? 'Jogador 1'
        : resultado1Element.innerText < resultado3Element.innerText
        ? 'Jogador 2'
        : 'Empate';
    const resultadoText = `Ganhador da rodada: ${ganhador}`;
    modalResultadoElement.textContent = resultadoText;
    modalElement.style.display = 'block';

    const row = document.createElement('tr');
    const rodadaCell = document.createElement('td');
    rodadaCell.textContent = rodada;
    row.appendChild(rodadaCell);
    const resultado1x2Cell = document.createElement('td');
    resultado1x2Cell.textContent = `${resultado1Element.innerText} x ${resultado3Element.innerText}`;
    row.appendChild(resultado1x2Cell);
    const ganhadorCell = document.createElement('td');
    ganhadorCell.textContent = ganhador;
    row.appendChild(ganhadorCell);
    tabelaResultadoCorpoElement.appendChild(row);
    rodada++;

    salvarEstadoJogo();

    // Verificar se é a décima rodada
    if (rodada > 10) {
      exibirVencedorPartida();
    }
  }
}


botaoReiniciarElement.addEventListener('click', reiniciarJogo);

botao1Element.addEventListener('click', () => {
  if (jogador1Ativo) {
    resultado1 = Math.floor(Math.random() * 6) + 1;
    resultado1Element.innerText = resultado1;
    jogador1Ativo = false;
    botao3Element.removeAttribute('disabled');
    botaoReiniciarElement.disabled = true; // Desabilitar o botão de reiniciar
    salvarEstadoJogo();
    atualizarInterface();
  }
});

botao3Element.addEventListener('click', () => {
  if (!jogador1Ativo) {
    resultado3 = Math.floor(Math.random() * 6) + 1;
    resultado3Element.innerText = resultado3;
    jogador1Ativo = true;
    botao3Element.setAttribute('disabled', 'true');
    verificarVencedor();
    botaoReiniciarElement.disabled = false; // Habilitar o botão de reiniciar
    salvarEstadoJogo();
    atualizarInterface();
  }
});

closeElement.addEventListener('click', () => {
  modalElement.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target == modalElement) {
    modalElement.style.display = 'none';
  }
});


// Carregar os valores do localStorage ao carregar a página
window.addEventListener('load', () => {
  carregarEstadoJogo();
  carregarTabelaResultado();
  atualizarInterface();
});


