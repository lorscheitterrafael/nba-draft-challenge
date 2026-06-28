// =============================================================
//  NBA DRAFT CHALLENGE — LÓGICA COMPLETA
//
//  Fluxo geral:
//  DRAFT: startDraft → drawTeam → selectPlayer → (5x) → draftComplete
//  PLAYOFFS: initPlayoffs → showBracket → startSeries → simOneGame
//            → (série completa) → próxima rodada ou eliminado/campeão
// =============================================================


// -------------------------------------------------------------
//  1. ESTADO GLOBAL
// -------------------------------------------------------------
let state = {
  // --- Draft ---
  lineup:        { PG: null, SG: null, SF: null, PF: null, C: null },
  draftRound:    1,
  usedTeamIds:   [],
  usedPlayerIds: [],   // impede escolher o mesmo jogador duas vezes
  currentTeam:   null,
  mpMode:        false, // true quando jogando com amigos

  // --- Playoffs ---
  playoffs: {
    round:     0,        // 1=Quartas 2=Semis 3=ConfFinals 4=Final NBA
    opponents: [],       // [opp_r1, opp_r2, opp_r3, opp_r4]
    confB:     {},       // dados da conferência adversária (para o bracket)
    userAvg:   0,
    series:    { u: 0, ai: 0 },
    gameNum:   0
  }
};


// -------------------------------------------------------------
//  2. REFERÊNCIAS AO DOM
// -------------------------------------------------------------
const $ = id => document.getElementById(id);

const screens = {
  start:      $('screen-start'),
  draft:      $('screen-draft'),
  draftDone:  $('screen-draft-done'),
  bracket:    $('screen-bracket'),
  series:     $('screen-series'),
  gameover:   $('screen-gameover'),
  mpSetup:    $('screen-mp-setup'),
  mpLobby:    $('screen-mp-lobby'),
  mpWaiting:  $('screen-mp-waiting'),
  mpResults:  $('screen-mp-results')
};

const playerList         = $('player-list');
const draftRoundLabel    = $('draft-round-label');
const draftTeamName      = $('draft-team-name');
const draftTeamSeason    = $('draft-team-season');
const draftMessage       = $('draft-message');
const draftMessageText   = $('draft-message-text');


// -------------------------------------------------------------
//  3. UTILITÁRIOS GERAIS
// -------------------------------------------------------------

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Embaralha um array (algoritmo Fisher-Yates)
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Troca a tela ativa
function goTo(screenName) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[screenName].classList.add('active');
}

// Cor do badge de overall
function overallClass(v) {
  if (v >= 95) return 'overall-elite';
  if (v >= 90) return 'overall-allstar';
  if (v >= 80) return 'overall-starter';
  return 'overall-role';
}

// Média overall de um time do data.js
function teamAvg(team) {
  const sum = team.players.reduce((s, p) => s + p.overall, 0);
  return Math.round(sum / team.players.length);
}

// Anima o número quando muda (bump)
function bumpNum(elId) {
  const el = $(elId);
  el.classList.remove('bump');
  void el.offsetWidth;
  el.classList.add('bump');
}


// -------------------------------------------------------------
//  4. MENSAGEM DE AVISO (DRAFT)
// -------------------------------------------------------------
function showMessage(text) {
  draftMessageText.textContent = text;
  draftMessage.classList.remove('hidden', 'shake');
  void draftMessage.offsetWidth;
  draftMessage.classList.add('shake');
}

function hideMessage() {
  draftMessage.classList.add('hidden');
}

function updateRerollBtn() {
  const btn = $('btn-reroll');
  if (!btn) return;
  btn.disabled = state.rerollUsed;
  btn.textContent = state.rerollUsed ? '🎲 Já girou' : '🎲 Girar';
}

function rerollTeam() {
  if (state.rerollUsed) return;
  state.rerollUsed = true;

  // Sorteia um time diferente do atual
  const available = NBA_TEAMS.filter(t =>
    t.id !== state.currentTeam.id && !state.usedTeamIds.includes(t.id)
  );
  const pool = available.length > 0 ? available : NBA_TEAMS.filter(t => t.id !== state.currentTeam.id);

  state.currentTeam = randomItem(pool);
  state.usedTeamIds.push(state.currentTeam.id);

  draftTeamName.textContent   = state.currentTeam.name;
  draftTeamSeason.textContent = state.currentTeam.season;

  updateRerollBtn();
  hideMessage();
  renderPlayerList(state.currentTeam.players);
}


// -------------------------------------------------------------
//  5. DRAFT — montar o quinteto
// -------------------------------------------------------------

function startDraft() {
  state.lineup        = { PG: null, SG: null, SF: null, PF: null, C: null };
  state.draftRound    = 1;
  state.usedTeamIds   = [];
  state.usedPlayerIds = [];
  state.rerollUsed    = false;
  state.currentTeam   = null;
  state.mpMode        = false;
  state.playoffs    = { round: 0, opponents: [], confB: {}, userAvg: 0,
                        series: { u: 0, ai: 0 }, gameNum: 0 };

  resetCourt();
  updateProgress();
  drawTeam();
}

function drawTeam() {
  const available = NBA_TEAMS.filter(t => !state.usedTeamIds.includes(t.id));
  const pool      = available.length > 0 ? available : NBA_TEAMS;

  state.currentTeam = randomItem(pool);
  state.usedTeamIds.push(state.currentTeam.id);

  draftRoundLabel.textContent  = `Rodada ${state.draftRound}`;
  draftTeamName.textContent    = state.currentTeam.name;
  draftTeamSeason.textContent  = state.currentTeam.season;

  updateRerollBtn();
  hideMessage();
  renderPlayerList(state.currentTeam.players);
  goTo('draft');
}

function renderPlayerList(players) {
  playerList.innerHTML = '';
  players.forEach(player => {
    const alreadyPicked = state.usedPlayerIds.includes(player.id);
    const available     = alreadyPicked ? [] : getAvailablePositions(player);
    const positionsFull = !alreadyPicked && available.length === 0;
    const isSelectable  = !alreadyPicked && !positionsFull;
    const eligible      = ELIGIBLE_POSITIONS[player.position];

    const li = document.createElement('li');
    if      (alreadyPicked) li.className = 'player-list-item already-picked';
    else if (positionsFull) li.className = 'player-list-item unavailable';
    else                    li.className = 'player-list-item';

    // Badges de posições elegíveis (riscadas se ocupadas)
    const posBadges = eligible.map(pos => {
      const filled = state.lineup[pos] !== null;
      return `<span class="elig-pos ${filled ? 'elig-filled' : ''}">${pos}</span>`;
    }).join('');

    // Indicador direito: varia conforme o estado
    let rightEl;
    if (alreadyPicked) {
      rightEl = `<span class="pli-in-team">✓ No time</span>`;
    } else if (positionsFull) {
      rightEl = `<span class="pli-lock">🔒</span>`;
    } else {
      rightEl = `<span class="pli-overall ${overallClass(player.overall)}">${player.overall}</span>`;
    }

    const pickerBtns = available.map(pos =>
      `<button class="pos-btn" data-pos="${pos}">
        <strong>${pos}</strong><small>${POS_NAMES[pos]}</small>
      </button>`
    ).join('');

    li.innerHTML = `
      <div class="pli-main">
        <span class="pli-number">#${player.number}</span>
        <span class="pli-name">${player.name}</span>
        <div class="pli-eligible">${posBadges}</div>
        ${rightEl}
      </div>
      ${isSelectable ? `
      <div class="pos-picker hidden">
        <span class="pos-picker-label">Jogar como:</span>
        <div class="pos-picker-btns">${pickerBtns}</div>
      </div>` : ''}`;

    if (isSelectable) {
      li.querySelector('.pli-main').addEventListener('click', () => {
        if (available.length === 1) {
          selectPlayer(player, available[0]);
        } else {
          document.querySelectorAll('.pos-picker').forEach(p => p.classList.add('hidden'));
          document.querySelectorAll('.player-list-item.picking').forEach(i => i.classList.remove('picking'));
          const picker  = li.querySelector('.pos-picker');
          const opening = picker.classList.contains('hidden');
          picker.classList.toggle('hidden', !opening);
          li.classList.toggle('picking', opening);
        }
      });
      available.forEach(pos => {
        li.querySelector(`.pos-btn[data-pos="${pos}"]`)
          ?.addEventListener('click', e => { e.stopPropagation(); selectPlayer(player, pos); });
      });
    }

    playerList.appendChild(li);
  });
}

function selectPlayer(player, position) {
  if (state.lineup[position] !== null) {
    showMessage(`Posição ${position} já ocupada. Escolha outro jogador.`);
    return;
  }

  hideMessage();
  state.usedPlayerIds.push(player.id);
  state.lineup[position] = { ...player, position };

  if (state.mpMode) MP.pickPlayer(player.id);

  fillSlot(player, position);
  updateProgress();

  if (Object.values(state.lineup).every(p => p !== null)) {
    setTimeout(state.mpMode ? mpDraftComplete : draftComplete, 600);
    return;
  }

  state.draftRound++;
  drawTeam();
}

// Quinteto completo — mostra resumo antes dos playoffs
function draftComplete() {
  const positions = ['PG', 'SG', 'SF', 'PF', 'C'];
  const ul        = $('draftdone-lineup');
  ul.innerHTML    = '';

  positions.forEach(pos => {
    const p  = state.lineup[pos];
    const li = document.createElement('li');
    li.className = 'gameover-lineup-item';
    li.innerHTML = `
      <span class="gameover-pos">${pos}</span>
      <p class="gameover-player-name">${p.name}</p>
      <span class="gameover-player-overall ${overallClass(p.overall)}">${p.overall}</span>`;
    ul.appendChild(li);
  });

  const avg = Math.round(
    positions.reduce((s, pos) => s + state.lineup[pos].overall, 0) / 5
  );
  $('draftdone-overall').textContent = avg;

  goTo('draftDone');
}


// -------------------------------------------------------------
//  6. QUADRA SVG (visual do quinteto)
// -------------------------------------------------------------
function fillSlot(player, position) {
  const g = $(`slot-${position}`);
  if (!g) return;

  // Atualiza o texto do nome abreviado no círculo da quadra
  const nameEl = g.querySelector('.slot-player-name');
  const lastName = player.name.split(' ').pop();
  nameEl.textContent = lastName;

  g.classList.add('slot-filled');
}

function updateProgress() {
  const positions = ['PG', 'SG', 'SF', 'PF', 'C'];
  positions.forEach(pos => {
    const li     = document.querySelector(`#positions-status [data-pos="${pos}"]`);
    if (!li) return;
    const check  = li.querySelector('.pos-check');
    const nameEl = li.querySelector('.pos-name');
    const player = state.lineup[pos];
    if (player) {
      li.classList.add('done');
      check.textContent = '✓';
      nameEl.textContent = player.name;
    } else {
      li.classList.remove('done');
      check.textContent  = '○';
      nameEl.textContent = `${pos} — ${POS_FULL_NAMES[pos]}`;
    }
  });
}

function resetCourt() {
  ['PG', 'SG', 'SF', 'PF', 'C'].forEach(pos => {
    const g = $(`slot-${pos}`);
    if (!g) return;
    g.classList.remove('slot-filled');
    g.querySelector('.slot-player-name').textContent = '—';
  });
}


// =============================================================
//  7. PLAYOFFS
// =============================================================

// Posições que cada jogador pode ocupar (naturais + adjacentes)
const ELIGIBLE_POSITIONS = {
  PG: ['PG', 'SG'],
  SG: ['PG', 'SG', 'SF'],
  SF: ['SG', 'SF', 'PF'],
  PF: ['SF', 'PF', 'C'],
  C:  ['PF', 'C']
};

const POS_NAMES = {
  PG: 'Armador', SG: 'Ala-Arm.', SF: 'Ala', PF: 'Ala-Pivô', C: 'Pivô'
};

const POS_FULL_NAMES = {
  PG: 'Armador', SG: 'Ala-Armador', SF: 'Ala', PF: 'Ala-Pivô', C: 'Pivô'
};

// Retorna as posições ainda disponíveis para um jogador
function getAvailablePositions(player) {
  return ELIGIBLE_POSITIONS[player.position].filter(pos => state.lineup[pos] === null);
}

const ROUND_NAMES = {
  1: 'Quartas de Final',
  2: 'Semifinais',
  3: 'Finais de Conferência',
  4: 'Final da NBA'
};

// Simula um jogo entre dois times com base no overall médio.
// Retorna true se o time A vencer.
function simGame(avgA, avgB) {
  // Faixa apertada (30–70%) para manter as séries competitivas mesmo com grande diferença.
  const prob = Math.max(0.30, Math.min(0.70, 0.5 + (avgA - avgB) * 0.010));
  return Math.random() < prob;
}

// Simula uma série completa melhor de 7. Retorna o time vencedor.
function autoSimSeries(teamA, teamB) {
  const avgA = teamAvg(teamA);
  const avgB = teamAvg(teamB);
  let wA = 0, wB = 0;
  while (wA < 4 && wB < 4) {
    simGame(avgA, avgB) ? wA++ : wB++;
  }
  return wA === 4 ? teamA : teamB;
}

// Gera um score realista de NBA para um jogo (ex: 108 × 97)
function generateScore(winnerAvg, loserAvg) {
  const wScore = 90 + Math.floor(Math.random() * 35);            // 90–124
  const diff   = 3 + Math.floor(Math.random() * 22);             // 3–24
  const lScore = Math.max(70, wScore - diff);
  return { winner: wScore, loser: lScore };
}

// Inicializa os playoffs após o draft
function initPlayoffs() {
  // Overall médio do quinteto do usuário
  const userPlayers = Object.values(state.lineup);
  state.playoffs.userAvg = Math.round(
    userPlayers.reduce((s, p) => s + p.overall, 0) / userPlayers.length
  );

  // Embaralha todos os times e divide
  const pool = shuffle(NBA_TEAMS);

  // 4 oponentes para a jornada do usuário (Quartas, Semis, Conf.Finals, Finals)
  // Os 3 primeiros são os oponentes diretos do usuário na Conf. A
  // Mas o 4º (Final) vem da Conf. B auto-simulada
  const confAOpps = pool.slice(0, 3);  // Oponentes R1, R2, R3 do usuário
  const confBTeams = pool.slice(3, 7); // 4 times da Conf. B

  // Conf. B: simula QF1, QF2 e depois SF para achar o campeão
  const bQF1w = autoSimSeries(confBTeams[0], confBTeams[1]);
  const bQF2w = autoSimSeries(confBTeams[2], confBTeams[3]);
  const bChamp = autoSimSeries(bQF1w, bQF2w);

  // 4 oponentes do usuário: [R1, R2, R3, R4(Finals = Conf B Champ)]
  state.playoffs.opponents = [...confAOpps, bChamp];
  state.playoffs.round     = 1;
  state.playoffs.series    = { u: 0, ai: 0 };
  state.playoffs.gameNum   = 0;

  // Guarda dados da Conf. B para exibir no bracket
  state.playoffs.confB = {
    teams: confBTeams,
    qf1w: bQF1w,
    qf2w: bQF2w,
    champ: bChamp
  };

  showBracket();
}

// Exibe e atualiza o bracket
function showBracket() {
  renderBracket();
  goTo('bracket');
}

function renderBracket() {
  const po    = state.playoffs;
  const round = po.round;
  const opps  = po.opponents;
  const confB = po.confB;

  // Helper: status de um round (upcoming / current / won)
  const statusOf = r => {
    if (r < round)  return 'won';
    if (r === round) return 'current';
    return 'upcoming';
  };

  // Helper: nome do oponente — só revela quando chegar a rodada
  const oppName = r => {
    if (r > round) return `<span class="btr-tbd">🔒 A definir</span>`;
    return opps[r - 1]
      ? `${opps[r - 1].name} <small>${opps[r - 1].season}</small>`
      : '?';
  };

  const oppAvgLabel = r => {
    if (r > round || !opps[r - 1]) return '';
    return `<span class="btr-avg ${overallClass(teamAvg(opps[r - 1]))}">${teamAvg(opps[r - 1])}</span>`;
  };

  // Ícone de status
  const icon = r => {
    if (r < round)   return '<span class="btr-badge">✅</span>';
    if (r === round) return '<span class="btr-badge">🏀</span>';
    return '';
  };

  // Monta cada round da Conf. A (chave do usuário)
  const confARows = [1, 2, 3, 4].map(r => `
    <div class="bracket-matchup ${statusOf(r) === 'current' ? 'current' : ''} ${r > round ? 'locked' : ''}">
      <div class="bracket-matchup-label">${ROUND_NAMES[r]}</div>
      <div class="bracket-team-row is-user ${r < round ? 'is-winner' : ''}">
        <div class="btr-name">Seu Time</div>
        <span class="btr-avg ${overallClass(po.userAvg)}">${po.userAvg}</span>
        ${icon(r)}
      </div>
      <div class="bracket-vs">vs</div>
      <div class="bracket-team-row ${r < round ? 'is-loser' : ''}">
        <div class="btr-name">${oppName(r)}</div>
        ${oppAvgLabel(r)}
      </div>
    </div>
  `).join('');

  // Conf. B — revela progressivamente conforme o usuário avança
  const bTeams = confB.teams || [];

  const bMatchup = (label, t1, t2, winner, revealFrom) => {
    if (round < revealFrom) return `
      <div class="bracket-matchup locked">
        <div class="bracket-matchup-label">${label}</div>
        <div class="bracket-team-row"><div class="btr-name btr-tbd">🔒 A definir</div></div>
      </div>`;
    return `
      <div class="bracket-matchup">
        <div class="bracket-matchup-label">${label}</div>
        <div class="bracket-team-row ${winner?.id === t1?.id ? 'is-winner' : 'is-loser'}">
          <div class="btr-name">${t1?.name || '?'} <small>${t1?.season || ''}</small></div>
          <span class="btr-avg">${t1 ? teamAvg(t1) : ''}</span>
        </div>
        <div class="bracket-vs">vs</div>
        <div class="bracket-team-row ${winner?.id === t2?.id ? 'is-winner' : 'is-loser'}">
          <div class="btr-name">${t2?.name || '?'} <small>${t2?.season || ''}</small></div>
          <span class="btr-avg">${t2 ? teamAvg(t2) : ''}</span>
        </div>
      </div>`;
  };

  const champRow = round >= 4 ? `
    <div class="bracket-matchup">
      <div class="bracket-matchup-label">Campeão Conf. B</div>
      <div class="bracket-team-row is-winner">
        <div class="btr-name">🏆 ${confB.champ?.name || '?'} <small>${confB.champ?.season || ''}</small></div>
        <span class="btr-avg ${overallClass(teamAvg(confB.champ))}">${teamAvg(confB.champ)}</span>
        <span class="btr-badge">✅</span>
      </div>
    </div>` : `
    <div class="bracket-matchup locked">
      <div class="bracket-matchup-label">Campeão Conf. B</div>
      <div class="bracket-team-row"><div class="btr-name btr-tbd">🔒 A definir</div></div>
    </div>`;

  const confBRows = bTeams.length ? `
    ${bMatchup('Quartas',   bTeams[0], bTeams[1], confB.qf1w, 1)}
    ${bMatchup('Quartas',   bTeams[2], bTeams[3], confB.qf2w, 2)}
    ${bMatchup('Semifinais', confB.qf1w, confB.qf2w, confB.champ, 3)}
    ${champRow}
  ` : '';

  // Finals center box — só revela os times quando chegarem
  const finalsTeamA = round >= 4 ? 'Seu Time'         : '?';
  const finalsTeamB = round >= 4 && confB.champ
    ? `${confB.champ.name} (${confB.champ.season})`   : '?';

  $('bracket-board').innerHTML = `
    <div class="bracket-conf">
      <div class="bracket-conf-title">Conferência A — Sua Chave</div>
      ${confARows}
    </div>

    <div class="bracket-finals-col">
      <div class="bracket-finals-box">
        <div class="bracket-finals-icon">🏆</div>
        <div class="bracket-finals-label">Final da NBA</div>
        <div class="bracket-finals-team ${round < 4 ? 'tbd' : ''}">${finalsTeamA}</div>
        <div class="bracket-finals-team" style="color:rgba(255,255,255,.5);font-size:.65rem;margin:.2rem 0">vs</div>
        <div class="bracket-finals-team ${round < 4 ? 'tbd' : ''}">${finalsTeamB}</div>
      </div>
    </div>

    <div class="bracket-conf">
      <div class="bracket-conf-title">Conferência B — Chave Rival</div>
      ${confBRows}
    </div>
  `;
}


// -------------------------------------------------------------
//  8. SÉRIE — jogo a jogo
// -------------------------------------------------------------
function startSeries() {
  const po  = state.playoffs;
  const opp = po.opponents[po.round - 1];

  po.series  = { u: 0, ai: 0 };
  po.gameNum = 0;

  // Badge da rodada
  $('series-round-badge').textContent = ROUND_NAMES[po.round];

  // Placar zerado
  $('series-u-wins').textContent  = '0';
  $('series-ai-wins').textContent = '0';
  $('series-opp-name').textContent = `${opp.name} (${opp.season})`;

  // Limpa log
  $('series-log').innerHTML = '';

  // Botões
  $('btn-sim-game').classList.remove('hidden');
  $('btn-sim-game').disabled = false;
  $('btn-series-next').classList.add('hidden');

  // Preenche roster do usuário
  renderSeriesRoster('series-user-list', Object.values(state.lineup), po.userAvg, 'series-user-avg');

  // Preenche roster do oponente
  $('series-opp-title').textContent = `${opp.name} · ${opp.season}`;
  const oppAvg = teamAvg(opp);
  renderSeriesRoster('series-opp-list', opp.players, oppAvg, 'series-opp-avg');

  goTo('series');
}

function renderSeriesRoster(listId, players, avg, avgId) {
  const ul = $(listId);
  ul.innerHTML = '';
  players.forEach(p => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="stc-pos">${p.position}</span>
      <span class="stc-pname">${p.name}</span>
      <span class="stc-ov ${overallClass(p.overall)}">${p.overall}</span>`;
    ul.appendChild(li);
  });
  $(avgId).textContent = avg;
}

// Distribui pontos totais em 4 quartos de forma realista
function splitIntoQuarters(total) {
  const qs = [];
  let remaining = total;
  for (let i = 0; i < 3; i++) {
    const avg = remaining / (4 - i);
    const q   = Math.max(14, Math.min(36, Math.round(avg * (0.75 + Math.random() * 0.5))));
    qs.push(q);
    remaining -= q;
  }
  qs.push(Math.max(10, remaining));
  return qs;
}

// Gera lista de eventos de pontuação de um quarto (2 ou 3 pts por posse)
function buildPossessions(userTarget, aiTarget) {
  const events = [];
  let u = userTarget, a = aiTarget;
  while (u > 0 || a > 0) {
    if (u > 0) {
      const pts = (u >= 3 && Math.random() < 0.28) ? 3 : Math.min(2, u);
      events.push({ team: 'user', pts });
      u -= pts;
    }
    if (a > 0) {
      const pts = (a >= 3 && Math.random() < 0.28) ? 3 : Math.min(2, a);
      events.push({ team: 'ai', pts });
      a -= pts;
    }
  }
  // Embaralha levemente para não ser sempre alternado
  for (let i = events.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [events[i], events[j]] = [events[j], events[i]];
  }
  return events;
}

// Simula um jogo da série atual — animação quarto a quarto
function simOneGame() {
  const po       = state.playoffs;
  const opp      = po.opponents[po.round - 1];
  const oppAvg   = teamAvg(opp);
  const userWins = simGame(po.userAvg, oppAvg);

  po.gameNum++;

  // Placar final pré-determinado
  const { winner: ws, loser: ls } = generateScore(
    userWins ? po.userAvg : oppAvg,
    userWins ? oppAvg    : po.userAvg
  );
  const userFinal = userWins ? ws : ls;
  const aiFinal   = userWins ? ls : ws;

  // Distribui em 4 quartos
  const userQs = splitIntoQuarters(userFinal);
  const aiQs   = splitIntoQuarters(aiFinal);

  // UI: desabilita botão e mostra painel ao vivo
  $('btn-sim-game').disabled = true;
  const panel = $('live-score-panel');
  panel.classList.remove('hidden');
  $('live-score-opp-name').textContent = opp.name;
  $('live-score-user').textContent = '0';
  $('live-score-ai').textContent   = '0';

  // Reset bolinhas dos quartos
  document.querySelectorAll('.qdot').forEach(d => {
    d.classList.remove('done', 'active');
  });

  let userRunning = 0;
  let aiRunning   = 0;
  const QUARTER_LABELS = ['1º QUARTO', '2º QUARTO', '3º QUARTO', '4º QUARTO'];
  const INTERVAL_MS    = 22; // velocidade por posse

  function animateQuarter(qIndex) {
    if (qIndex >= 4) {
      // Animação completa — finaliza o jogo
      setTimeout(() => {
        panel.classList.add('hidden');
        document.querySelectorAll('.qdot').forEach(d => d.classList.remove('done', 'active'));
        finishGame(userWins, userFinal, aiFinal);
      }, 700);
      return;
    }

    // Atualiza label e bolinha
    $('live-quarter-label').textContent = QUARTER_LABELS[qIndex];
    document.querySelectorAll('.qdot').forEach((d, i) => {
      d.classList.remove('done', 'active');
      if (i < qIndex)   d.classList.add('done');
      if (i === qIndex) d.classList.add('active');
    });

    const possessions = buildPossessions(userQs[qIndex], aiQs[qIndex]);
    let pIdx = 0;

    const ticker = setInterval(() => {
      if (pIdx >= possessions.length) {
        clearInterval(ticker);
        // Pausa entre quartos (mais longa no intervalo Q2→Q3)
        const pause = qIndex === 1 ? 900 : 450;
        setTimeout(() => animateQuarter(qIndex + 1), pause);
        return;
      }

      const ev = possessions[pIdx++];
      const elId = ev.team === 'user' ? 'live-score-user' : 'live-score-ai';
      if (ev.team === 'user') userRunning += ev.pts;
      else                    aiRunning   += ev.pts;

      const el = $(elId);
      el.textContent = ev.team === 'user' ? userRunning : aiRunning;

      // Flash dourado no número que acabou de marcar
      el.classList.remove('scored');
      void el.offsetWidth;
      el.classList.add('scored');
      setTimeout(() => el.classList.remove('scored'), 180);
    }, INTERVAL_MS);
  }

  animateQuarter(0);
}

// Finaliza o jogo após a animação: atualiza série, log e botões
function finishGame(userWins, userScore, aiScore) {
  const po  = state.playoffs;
  const opp = po.opponents[po.round - 1];

  if (userWins) po.series.u++; else po.series.ai++;

  $('series-u-wins').textContent  = po.series.u;
  $('series-ai-wins').textContent = po.series.ai;
  bumpNum(userWins ? 'series-u-wins' : 'series-ai-wins');

  // Linha no log
  const log  = $('series-log');
  const item = document.createElement('li');
  item.className = `series-log-item ${userWins ? 'user-won' : 'ai-won'}`;
  item.innerHTML = `
    <span class="log-num">Jogo ${po.gameNum}</span>
    <span class="log-score">Seu Time ${userScore} × ${aiScore} ${opp.name}</span>
    <span class="log-result">${userWins ? 'Vitória ✓' : 'Derrota ✗'}</span>`;
  log.appendChild(item);
  log.scrollTop = log.scrollHeight;

  // Fim da série?
  if (po.series.u === 4 || po.series.ai === 4) {
    $('btn-sim-game').classList.add('hidden');
    $('btn-series-next').classList.remove('hidden');
    $('btn-series-next').textContent =
      po.series.u === 4 ? 'Avançar →' : 'Ver Resultado';
  } else {
    $('btn-sim-game').disabled = false;
  }
}

// Botão "Avançar" após série terminar
function seriesResult() {
  const po = state.playoffs;

  if (po.series.u === 4) {
    // Usuário venceu a série
    if (po.round === 4) {
      showChampion();
    } else {
      po.round++;
      po.series  = { u: 0, ai: 0 };
      po.gameNum = 0;
      showBracket();
    }
  } else {
    // Usuário perdeu → eliminado
    showEliminated();
  }
}


// -------------------------------------------------------------
//  9. FIM — campeão ou eliminado
// -------------------------------------------------------------
function showChampion() {
  const avg  = calcLineupAvg();
  recordGame('champion', null, avg);

  const card = $('gameover-card');
  card.classList.remove('eliminated');

  $('gameover-icon').textContent  = '🏆';
  $('gameover-title').textContent = 'CAMPEÃO DA NBA!';
  $('gameover-sub').textContent   = 'Você venceu os playoffs e conquistou o título!';

  renderFinalLineup();
  goTo('gameover');
}

function showEliminated() {
  const po   = state.playoffs;
  const opp  = po.opponents[po.round - 1];
  const avg  = calcLineupAvg();
  const result = po.round === 4 ? 'finalist' : 'elim';

  recordGame(result, po.round, avg);

  const card = $('gameover-card');
  card.classList.add('eliminated');

  $('gameover-icon').textContent  = po.round === 4 ? '🥈' : '💀';
  $('gameover-title').textContent = po.round === 4 ? 'Vice-Campeão!' : 'Eliminado!';
  $('gameover-sub').textContent   =
    `${opp.name} (${opp.season}) venceu a série ${po.series.ai}–${po.series.u} nas ${ROUND_NAMES[po.round]}.`;

  renderFinalLineup();
  goTo('gameover');
}

// Calcula o overall médio do quinteto atual
function calcLineupAvg() {
  const positions = ['PG', 'SG', 'SF', 'PF', 'C'];
  const total = positions.reduce((s, pos) => s + (state.lineup[pos]?.overall ?? 0), 0);
  return Math.round(total / 5);
}

function renderFinalLineup() {
  const positions = ['PG', 'SG', 'SF', 'PF', 'C'];
  const ul = $('gameover-lineup');
  ul.innerHTML = '';

  positions.forEach(pos => {
    const p  = state.lineup[pos];
    if (!p) return;
    const li = document.createElement('li');
    li.className = 'gameover-lineup-item';
    li.innerHTML = `
      <span class="gameover-pos">${pos}</span>
      <p class="gameover-player-name">${p.name}</p>
      <span class="gameover-player-overall ${overallClass(p.overall)}">${p.overall}</span>`;
    ul.appendChild(li);
  });

  const avg = Math.round(
    positions.reduce((s, pos) => s + (state.lineup[pos]?.overall ?? 0), 0) / 5
  );
  $('gameover-overall').textContent = avg;
}


// =============================================================
//  10. LOCAL STORAGE — persistência de estatísticas
// =============================================================

const STORAGE_KEY = 'nba_draft_stats';

// Estrutura padrão quando não há dados salvos ainda
const DEFAULT_STATS = {
  games:    0,   // total de partidas jogadas
  titles:   0,   // títulos da NBA
  finals:   0,   // vezes que chegou à Final (incluindo títulos)
  bestAvg:  0,   // maior overall médio de quinteto já montado
  history:  []   // últimas 10 partidas
};

// Lê os dados do localStorage (ou retorna o padrão se não existir)
function loadStats() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULT_STATS, ...JSON.parse(raw) } : { ...DEFAULT_STATS };
  } catch {
    // Se o JSON estiver corrompido, recomeça do zero
    return { ...DEFAULT_STATS };
  }
}

// Salva os dados no localStorage
function saveStats(stats) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}

// Registra o resultado de uma partida e atualiza os contadores
function recordGame(result, eliminatedAtRound, lineupAvg) {
  const stats = loadStats();

  stats.games++;

  if (result === 'champion') {
    stats.titles++;
    stats.finals++;
  } else if (result === 'finalist') {
    stats.finals++;
  }

  if (lineupAvg > stats.bestAvg) {
    stats.bestAvg = lineupAvg;
  }

  // Monta o item de histórico
  const roundLabel = eliminatedAtRound
    ? `Eliminado nas ${ROUND_NAMES[eliminatedAtRound]}`
    : 'Campeão da NBA 🏆';

  stats.history.unshift({
    result,
    label:  roundLabel,
    avg:    lineupAvg,
    date:   new Date().toLocaleDateString('pt-BR')
  });

  // Guarda só as últimas 10 partidas
  stats.history = stats.history.slice(0, 10);

  saveStats(stats);
}

// Renderiza o painel de stats na tela inicial
function renderStatsPanel() {
  const stats  = loadStats();
  const panel  = $('stats-panel');

  // Se nunca jogou, não mostra o painel
  if (stats.games === 0) {
    panel.classList.add('hidden');
    return;
  }

  panel.classList.remove('hidden');

  $('stat-games').textContent  = stats.games;
  $('stat-titles').textContent = stats.titles;
  $('stat-finals').textContent = stats.finals;
  $('stat-best-avg').textContent = stats.bestAvg > 0
    ? `<span class="${overallClass(stats.bestAvg)}">${stats.bestAvg}</span>`
    : '—';

  // innerHTML para aplicar a cor do overall
  $('stat-best-avg').innerHTML = stats.bestAvg > 0
    ? `<span class="${overallClass(stats.bestAvg)}">${stats.bestAvg}</span>`
    : '—';

  // Histórico das últimas partidas
  const ul = $('stats-history');
  ul.innerHTML = '';

  stats.history.forEach(entry => {
    const li = document.createElement('li');
    li.className = `history-item ${entry.result}`;
    li.innerHTML = `
      <span class="history-result">${entry.result === 'champion' ? '🏆 Título' : entry.result === 'finalist' ? '🥈 Final' : '❌ Elim.'}</span>
      <span class="history-detail">${entry.label} · ${entry.date}</span>
      <span class="history-ovr ${overallClass(entry.avg)}">${entry.avg}</span>
    `;
    ul.appendChild(li);
  });
}

// Limpa todo o histórico
function clearStats() {
  localStorage.removeItem(STORAGE_KEY);
  renderStatsPanel();
}


// =============================================================
//  11. MULTIPLAYER
// =============================================================

function openMpSetup() {
  $('mp-error-msg').classList.add('hidden');
  $('mp-player-name').value = '';
  $('mp-room-code-input').value = '';
  goTo('mpSetup');
}

async function mpCreate() {
  const name = $('mp-player-name').value.trim() || 'Jogador';
  $('btn-mp-create').disabled = true;
  $('btn-mp-create').textContent = 'Criando...';
  try {
    await MP.create(name);
    mpEnterLobby();
  } catch (e) {
    showMpError(e.message);
  } finally {
    $('btn-mp-create').disabled = false;
    $('btn-mp-create').textContent = '🏀 Criar Nova Sala';
  }
}

async function mpJoin() {
  const name = $('mp-player-name').value.trim() || 'Jogador';
  const code = $('mp-room-code-input').value.trim().toUpperCase();
  if (!code) { showMpError('Digite o código da sala.'); return; }
  $('btn-mp-join').disabled = true;
  $('btn-mp-join').textContent = '...';
  try {
    await MP.join(code, name);
    mpEnterLobby();
  } catch (e) {
    showMpError(e.message);
  } finally {
    $('btn-mp-join').disabled = false;
    $('btn-mp-join').textContent = 'Entrar';
  }
}

function showMpError(msg) {
  const el = $('mp-error-msg');
  el.textContent = msg;
  el.classList.remove('hidden');
}

function mpEnterLobby() {
  $('mp-lobby-code').textContent = MP.code;
  $('btn-mp-start-draft').style.display = MP.isHost ? 'block' : 'none';
  $('mp-waiting-host-msg').classList.toggle('hidden', MP.isHost);
  goTo('mpLobby');

  MP.listenRoom(room => {
    const active = Object.keys(screens).find(k => screens[k].classList.contains('active'));

    if (active === 'mpLobby') {
      mpRenderLobby(room);
      if (room.phase === 'drafting') mpStartDraft();
    } else if (active === 'mpWaiting') {
      mpRenderWaiting(room);
    }
  });
}

function mpRenderLobby(room) {
  const players = Object.entries(room.players || {});
  const ul = $('mp-lobby-players');
  ul.innerHTML = '';
  players.forEach(([pid, p]) => {
    const li = document.createElement('li');
    li.className = 'mp-player-item';
    li.innerHTML = `
      <span class="mp-player-icon">${pid === room.host ? '👑' : '🏀'}</span>
      <span class="mp-player-name-label">${p.name}${pid === MP.pid ? ' <em>(você)</em>' : ''}</span>`;
    ul.appendChild(li);
  });
  $('mp-player-count').textContent = players.length;
  const hint = $('mp-lobby-hint');
  hint.textContent = players.length < 2
    ? 'Aguardando pelo menos 2 jogadores...'
    : `${players.length} jogadores prontos!`;
  if (MP.isHost) $('btn-mp-start-draft').disabled = players.length < 2;
}

function mpStartDraft() {
  state.mpMode = true;
  state.lineup        = { PG: null, SG: null, SF: null, PF: null, C: null };
  state.draftRound    = 1;
  state.usedTeamIds   = [];
  state.usedPlayerIds = [];
  state.rerollUsed    = false;
  state.playoffs      = { round: 0, opponents: [], confB: {}, userAvg: 0,
                          series: { u: 0, ai: 0 }, gameNum: 0 };
  resetCourt();
  updateProgress();

  // Listener de jogadores já escolhidos (tempo real)
  MP.listenUsedPlayers(ids => {
    state.usedPlayerIds = ids;
    if (state.currentTeam && !Object.values(state.lineup).every(p => p !== null)) {
      renderPlayerList(state.currentTeam.players);
    }
  });

  drawTeam();
}

async function mpDraftComplete() {
  goTo('mpWaiting');
  await MP.saveLineup(state.lineup);
}

function mpRenderWaiting(room) {
  const ul = $('mp-waiting-players');
  ul.innerHTML = '';
  Object.entries(room.players || {}).forEach(([pid, p]) => {
    const li = document.createElement('li');
    li.className = 'mp-player-item';
    li.innerHTML = `
      <span class="mp-player-icon">${p.draftDone ? '✅' : '⏳'}</span>
      <span class="mp-player-name-label">${p.name}${pid === MP.pid ? ' <em>(você)</em>' : ''}</span>
      <span class="mp-player-status-label">${p.draftDone ? 'Pronto' : 'Draftando...'}</span>`;
    ul.appendChild(li);
  });

  // Se todos terminaram e eu sou o host, simulo e salvo o resultado
  if (room.champion) {
    mpShowResults(room);
    return;
  }
  const allDone = Object.values(room.players || {}).every(p => p.draftDone);
  if (allDone && MP.isHost) {
    mpSimulateAndSave(room);
  }
}

function calcLineupAvgFromObj(lineup) {
  if (!lineup) return 0;
  const vals = Object.values(lineup);
  if (!vals.length) return 0;
  return Math.round(vals.reduce((s, p) => s + p.overall, 0) / vals.length);
}

function simMpSeries(pA, pB) {
  let wA = 0, wB = 0;
  while (wA < 4 && wB < 4) { simGame(pA.avg, pB.avg) ? wA++ : wB++; }
  return wA === 4 ? pA : pB;
}

async function mpSimulateAndSave(room) {
  const entries = Object.entries(room.players || {})
    .map(([pid, p]) => ({ pid, name: p.name, lineup: p.lineup,
                          avg: calcLineupAvgFromObj(p.lineup) }))
    .sort((a, b) => b.avg - a.avg);

  let champion;
  if (entries.length <= 1) {
    champion = entries[0];
  } else if (entries.length === 2) {
    champion = simMpSeries(entries[0], entries[1]);
  } else if (entries.length === 3) {
    const sf = simMpSeries(entries[1], entries[2]);
    champion = simMpSeries(entries[0], sf);
  } else {
    const s1 = simMpSeries(entries[0], entries[3]);
    const s2 = simMpSeries(entries[1], entries[2]);
    champion = simMpSeries(s1, s2);
  }

  // Salva o vencedor no Firebase — todos os clientes leem o mesmo resultado
  await db.ref(`rooms/${MP.code}/champion`).set(champion.pid);
}

function mpShowResults(room) {
  const entries = Object.entries(room.players || {})
    .map(([pid, p]) => ({ pid, name: p.name, lineup: p.lineup,
                          avg: calcLineupAvgFromObj(p.lineup) }))
    .sort((a, b) => b.avg - a.avg);

  const championPid = room.champion;
  const champion = entries.find(e => e.pid === championPid) || entries[0];

  const isMe = champion.pid === MP.pid;
  $('mp-winner-icon').textContent  = isMe ? '🏆' : '👑';
  $('mp-winner-title').textContent = `${champion.name} é o Campeão!`;
  $('mp-winner-sub').textContent   = `Overall médio: ${champion.avg}`;

  const div = $('mp-results-teams');
  div.innerHTML = entries.map(p => `
    <div class="mp-result-team ${p.pid === champion.pid ? 'is-champion' : ''}">
      <div class="mp-result-team-header">
        ${p.pid === champion.pid ? '<span class="mp-result-crown">🏆</span>' : ''}
        <span class="mp-result-name">${p.name}${p.pid === MP.pid ? ' <em>(você)</em>' : ''}</span>
        <span class="mp-result-avg ${overallClass(p.avg)}">${p.avg}</span>
      </div>
      <ul class="stc-list">
        ${Object.entries(p.lineup || {}).map(([pos, pl]) => `
          <li>
            <span class="stc-pos">${pos}</span>
            <span class="stc-pname">${pl.name}</span>
            <span class="stc-ov ${overallClass(pl.overall)}">${pl.overall}</span>
          </li>`).join('')}
      </ul>
    </div>`).join('');

  goTo('mpResults');
}

function mpRestart() {
  MP.cleanup();
  state.mpMode = false;
  renderStatsPanel();
  goTo('start');
}


// =============================================================
//  12. EVENT LISTENERS
// =============================================================
$('btn-start').addEventListener('click', startDraft);
$('btn-reroll').addEventListener('click', rerollTeam);
$('btn-go-playoffs').addEventListener('click', initPlayoffs);
$('btn-start-series').addEventListener('click', startSeries);
$('btn-sim-game').addEventListener('click', simOneGame);
$('btn-series-next').addEventListener('click', seriesResult);
$('btn-restart').addEventListener('click', () => { renderStatsPanel(); startDraft(); });
$('btn-clear-stats').addEventListener('click', clearStats);

// Multiplayer
$('btn-multiplayer').addEventListener('click', openMpSetup);
$('btn-mp-back').addEventListener('click', () => goTo('start'));
$('btn-mp-create').addEventListener('click', mpCreate);
$('btn-mp-join').addEventListener('click', mpJoin);
$('btn-mp-start-draft').addEventListener('click', () => MP.setPhase('drafting'));
$('btn-copy-code').addEventListener('click', () => {
  navigator.clipboard.writeText(MP.code).then(() => {
    const btn = $('btn-copy-code');
    btn.textContent = '✅';
    setTimeout(() => { btn.textContent = '📋'; }, 1500);
  });
});
$('btn-mp-restart').addEventListener('click', mpRestart);

// Enter no campo de código para entrar na sala
$('mp-room-code-input').addEventListener('keydown', e => { if (e.key === 'Enter') mpJoin(); });

// Mostra stats ao carregar a página
renderStatsPanel();
