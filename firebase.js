// =============================================================
//  NBA DRAFT CHALLENGE — Firebase / Multiplayer
// =============================================================

const firebaseConfig = {
  apiKey: "AIzaSyAvrNvT8WtAoAJhNNXf5FxGGTRmPMqJl50",
  authDomain: "nba-draft-challenge-4419b.firebaseapp.com",
  databaseURL: "https://nba-draft-challenge-4419b-default-rtdb.firebaseio.com",
  projectId: "nba-draft-challenge-4419b",
  storageBucket: "nba-draft-challenge-4419b.firebasestorage.app",
  messagingSenderId: "860280849810",
  appId: "1:860280849810:web:ffb8572b0177aad9122d4b"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const MP = {
  code: null,
  pid:  null,
  isHost: false,
  _roomRef: null,
  _usedRef: null,

  _genCode() {
    return 'NBA-' + Math.floor(1000 + Math.random() * 9000);
  },

  async create(playerName) {
    const code = this._genCode();
    const pid  = 'p' + Date.now();
    await db.ref(`rooms/${code}`).set({
      createdAt: Date.now(),
      phase: 'lobby',
      host: pid,
      usedPlayerIds: {},
      players: {
        [pid]: { name: playerName, draftDone: false, lineup: null }
      }
    });
    this.code   = code;
    this.pid    = pid;
    this.isHost = true;
    return { code, pid };
  },

  async join(code, playerName) {
    const snap = await db.ref(`rooms/${code}`).once('value');
    if (!snap.exists())           throw new Error('Sala não encontrada. Verifique o código.');
    if (snap.val().phase !== 'lobby') throw new Error('O draft já começou nessa sala.');
    const pid = 'p' + Date.now();
    await db.ref(`rooms/${code}/players/${pid}`).set({
      name: playerName, draftDone: false, lineup: null
    });
    this.code   = code;
    this.pid    = pid;
    this.isHost = false;
    return { code, pid };
  },

  listenRoom(callback) {
    this._roomRef = db.ref(`rooms/${this.code}`);
    this._roomRef.on('value', snap => { if (snap.exists()) callback(snap.val()); });
  },

  listenUsedPlayers(callback) {
    this._usedRef = db.ref(`rooms/${this.code}/usedPlayerIds`);
    this._usedRef.on('value', snap => {
      callback(Object.keys(snap.val() || {}));
    });
  },

  async pickPlayer(playerId) {
    await db.ref(`rooms/${this.code}/usedPlayerIds/${playerId}`).set(true);
  },

  async saveLineup(lineup) {
    const data = {};
    for (const pos in lineup) { if (lineup[pos]) data[pos] = lineup[pos]; }
    await db.ref(`rooms/${this.code}/players/${this.pid}`).update({
      lineup: data, draftDone: true
    });
  },

  async setPhase(phase) {
    await db.ref(`rooms/${this.code}/phase`).set(phase);
  },

  cleanup() {
    if (this._roomRef) this._roomRef.off();
    if (this._usedRef) this._usedRef.off();
    this._roomRef = null;
    this._usedRef = null;
    this.code   = null;
    this.pid    = null;
    this.isHost = false;
  }
};
