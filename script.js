// =============================================================
//  NBA 7A0 — SCRIPT PRINCIPAL
//  Ordem de leitura:
//  1. gameState  → estado do jogo
//  2. Referências ao DOM
//  3. Funções utilitárias
//  4. Funções de navegação (telas)
//  5. Funções do jogo
//  6. Event listeners (inicialização)
// =============================================================


// -------------------------------------------------------------
//  1. ESTADO DO JOGO
//  Um único objeto que guarda tudo que está acontecendo.
//  Quando uma partida recomeça, basta resetar este objeto.
// -------------------------------------------------------------
let gameState = {
  team:           null,   // objeto do time sorteado
  playerCard:     null,   // jogador escolhido pelo usuário
  aiCard:         null,   // jogador escolhido pela IA
  currentStat:    null,   // chave da categoria sorteada na rodada
  scorePlayer:    0,      // pontuação do usuário
  scoreAI:        0,      // pontuação da IA
  roundsPlayed:   0,      // quantas rodadas já aconteceram
  maxRounds:      5       // total de rodadas por partida
};


// -------------------------------------------------------------
//  2. REFERÊNCIAS AO DOM
//  Buscamos cada elemento uma única vez e guardamos em variáveis.
//  Muito mais eficiente do que chamar getElementById toda hora.
// -------------------------------------------------------------
const screens = {
  start:    document.getElementById('screen-start'),
  pick:     document.getElementById('screen-pick'),
  battle:   document.getElementById('screen-battle'),
  gameover: document.getElementById('screen-gameover')
};

const btnStart       = document.getElementById('btn-start');
const btnRollCat     = document.getElementById('btn-roll-category');
const btnNextRound   = document.getElementById('btn-next-round');
const btnRestart     = document.getElementById('btn-restart');

const pickTeamName   = document.getElementById('pick-team-name');
const playerGrid     = document.getElementById('player-grid');

const scorePlayerEl  = document.getElementById('score-player');
const scoreAIEl      = document.getElementById('score-ai');

const roundCategory  = document.getElementById('round-category');
const categoryLabel  = document.getElementById('category-label');
const roundResult    = document.getElementById('round-result');
const resultMessage  = document.getElementById('result-message');

const gameoverTitle  = document.getElementById('gameover-title');
const gameoverScore  = document.getElementById('gameover-score');


// -------------------------------------------------------------
//  3. FUNÇÕES UTILITÁRIAS
// -------------------------------------------------------------

// Retorna um número inteiro aleatório entre 0 e (max - 1)
function randomIndex(max) {
  return Math.floor(Math.random() * max);
}

// Retorna um item aleatório de um array
function randomItem(array) {
  return array[randomIndex(array.length)];
}


// -------------------------------------------------------------
//  4. NAVEGAÇÃO ENTRE TELAS
//  Remove a classe "active" de todas as telas e
//  adiciona apenas na tela desejada.
// -------------------------------------------------------------
function goToScreen(screenName) {
  Object.values(screens).forEach(function(screen) {
    screen.classList.remove('active');
  });
  screens[screenName].classList.add('active');
}


// -------------------------------------------------------------
//  5. FUNÇÕES DO JOGO
// -------------------------------------------------------------

// Reseta o estado para uma nova partida
function resetGame() {
  gameState.team         = null;
  gameState.playerCard   = null;
  gameState.aiCard       = null;
  gameState.currentStat  = null;
  gameState.scorePlayer  = 0;
  gameState.scoreAI      = 0;
  gameState.roundsPlayed = 0;

  scorePlayerEl.textContent = '0';
  scoreAIEl.textContent     = '0';
}

// Sorteia um time aleatório e monta a tela de escolha
function startGame() {
  resetGame();

  // Sorteia um time da lista NBA_TEAMS (definida em data.js)
  gameState.team = randomItem(NBA_TEAMS);

  // Atualiza o nome do time na tela de escolha
  pickTeamName.textContent = gameState.team.name + ' — ' + gameState.team.season;

  // Monta a grade de mini-cartas para o usuário escolher
  renderPickGrid(gameState.team.players);

  // Navega para a tela de escolha
  goToScreen('pick');
}

// Cria as mini-cartas de escolha e insere no HTML
function renderPickGrid(players) {
  // Limpa qualquer conteúdo anterior na grade
  playerGrid.innerHTML = '';

  players.forEach(function(player) {
    // Cria o elemento da carta
    const card = document.createElement('div');
    card.className = 'pick-card';

    // Monta o HTML interno da carta
    card.innerHTML = `
      <img
        class="pick-card-photo"
        src="${player.image}"
        alt="${player.name}"
        onerror="this.src='assets/placeholder.png'"
      />
      <p class="pick-card-name">${player.name}</p>
      <p class="pick-card-position">${player.position}</p>
      <span class="pick-card-overall">${player.stats.overall}</span>
    `;

    // Quando o usuário clica na carta, escolhe este jogador
    card.addEventListener('click', function() {
      pickPlayer(player);
    });

    playerGrid.appendChild(card);
  });
}

// Registra a escolha do usuário e faz a IA escolher
function pickPlayer(player) {
  gameState.playerCard = player;

  // A IA escolhe um jogador diferente do usuário, aleatoriamente
  const remaining = gameState.team.players.filter(function(p) {
    return p.id !== player.id;
  });
  gameState.aiCard = randomItem(remaining);

  // Preenche as cartas na tela de batalha
  renderBattleCards();

  // Navega para a arena
  goToScreen('battle');
}

// Preenche os dados nas cartas da tela de batalha
function renderBattleCards() {
  fillCard('player', gameState.playerCard);
  fillCard('ai', gameState.aiCard);

  // Esconde o resultado da rodada anterior e mostra o botão de sortear
  roundResult.classList.add('hidden');
  btnRollCat.classList.remove('hidden');
  categoryLabel.textContent = 'Categoria: —';

  // Remove destaques de rodadas anteriores
  clearStatHighlights();
}

// Preenche uma carta (player ou ai) com os dados do jogador
function fillCard(side, player) {
  document.getElementById('card-' + side + '-team').textContent   = player.team + ' · ' + player.season;
  document.getElementById('card-' + side + '-img').src            = player.image;
  document.getElementById('card-' + side + '-img').alt            = player.name;
  document.getElementById('card-' + side + '-name').textContent   = player.name;
  document.getElementById('card-' + side + '-position').textContent = player.position;

  // Preenche cada atributo usando as chaves de STAT_KEYS (definido em data.js)
  STAT_KEYS.forEach(function(key) {
    const el = document.getElementById(side + '-stat-' + key);
    if (el) el.textContent = player.stats[key];
  });
}

// Remove as classes win/lose/active de todas as linhas de atributo
function clearStatHighlights() {
  document.querySelectorAll('.stat-row').forEach(function(row) {
    row.classList.remove('win', 'lose', 'active');
  });
}

// Sorteia a categoria da rodada
function rollCategory() {
  gameState.currentStat = randomItem(STAT_KEYS);

  // Mostra o nome traduzido da categoria
  categoryLabel.textContent = 'Categoria: ' + STAT_LABELS[gameState.currentStat];

  // Destaca a linha sorteada em ambas as cartas
  clearStatHighlights();
  document.querySelectorAll('[data-stat="' + gameState.currentStat + '"]').forEach(function(row) {
    row.classList.add('active');
  });

  // Esconde o botão de sortear e executa a comparação
  btnRollCat.classList.add('hidden');
  compareStats();
}

// Compara os atributos e decide o resultado da rodada
function compareStats() {
  const stat      = gameState.currentStat;
  const valPlayer = gameState.playerCard.stats[stat];
  const valAI     = gameState.aiCard.stats[stat];

  let message = '';
  let resultClass = '';

  if (valPlayer > valAI) {
    gameState.scorePlayer++;
    message = '🏆 Você venceu esta rodada!';
    resultClass = 'win';
    highlightStat(stat, 'player', 'win');
    highlightStat(stat, 'ai', 'lose');
  } else if (valAI > valPlayer) {
    gameState.scoreAI++;
    message = '❌ A IA venceu esta rodada.';
    resultClass = 'lose';
    highlightStat(stat, 'player', 'lose');
    highlightStat(stat, 'ai', 'win');
  } else {
    message = '🤝 Empate nesta rodada!';
    resultClass = 'tie';
  }

  // Atualiza o placar na tela
  scorePlayerEl.textContent = gameState.scorePlayer;
  scoreAIEl.textContent     = gameState.scoreAI;

  // Exibe a mensagem de resultado
  resultMessage.textContent = message;
  resultMessage.className   = 'result-message ' + resultClass;

  gameState.roundsPlayed++;

  // Mostra o resultado e decide se tem próxima rodada ou fim de jogo
  roundResult.classList.remove('hidden');

  if (gameState.roundsPlayed >= gameState.maxRounds) {
    btnNextRound.textContent = 'Ver Resultado Final';
  } else {
    btnNextRound.textContent = 'Próxima Rodada';
  }
}

// Aplica a classe win ou lose na linha do atributo de uma carta específica
function highlightStat(stat, side, resultClass) {
  const card = document.getElementById('card-' + side);
  const row  = card.querySelector('[data-stat="' + stat + '"]');
  if (row) {
    row.classList.remove('active');
    row.classList.add(resultClass);
  }
}

// Avança para a próxima rodada ou para o fim do jogo
function nextRound() {
  if (gameState.roundsPlayed >= gameState.maxRounds) {
    showGameOver();
  } else {
    renderBattleCards();
  }
}

// Exibe a tela de fim de jogo com o resultado final
function showGameOver() {
  const sp = gameState.scorePlayer;
  const sa = gameState.scoreAI;

  let title = '';
  if (sp > sa) {
    title = '🏆 Você Ganhou!';
  } else if (sa > sp) {
    title = '💀 A IA Ganhou!';
  } else {
    title = '🤝 Empate!';
  }

  gameoverTitle.textContent = title;
  gameoverScore.textContent = 'Placar final — Você ' + sp + ' × ' + sa + ' IA';

  goToScreen('gameover');
}


// -------------------------------------------------------------
//  6. EVENT LISTENERS
//  Conecta cada botão à sua função.
//  Isso é executado assim que a página carrega.
// -------------------------------------------------------------
btnStart.addEventListener('click', startGame);
btnRollCat.addEventListener('click', rollCategory);
btnNextRound.addEventListener('click', nextRound);
btnRestart.addEventListener('click', startGame);
