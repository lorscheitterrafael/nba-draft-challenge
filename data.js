// =============================================================
//  NBA 7A0 — BASE DE DADOS DE JOGADORES
//  Estrutura: array de times, cada time contém array de jogadores.
//  Atributos vão de 0 a 99, como no NBA 2K.
// =============================================================

const NBA_TEAMS = [

  // -----------------------------------------------------------
  //  LOS ANGELES LAKERS — Dynasty 2001-02 (Shaq + Kobe)
  // -----------------------------------------------------------
  {
    id: "lakers-0102",
    name: "Los Angeles Lakers",
    season: "2001-02",
    players: [
      {
        id: "shaq-0102",
        name: "Shaquille O'Neal",
        team: "Los Angeles Lakers",
        season: "2001-02",
        position: "C",
        image: "assets/shaq.png",
        stats: {
          overall:    99,
          speed:      58,
          shooting:   72,
          defense:    85,
          passing:    60,
          rebounding: 98,
          dunking:    99,
          iq:         88
        }
      },
      {
        id: "kobe-0102",
        name: "Kobe Bryant",
        team: "Los Angeles Lakers",
        season: "2001-02",
        position: "SG",
        image: "assets/kobe.png",
        stats: {
          overall:    97,
          speed:      92,
          shooting:   96,
          defense:    88,
          passing:    78,
          rebounding: 62,
          dunking:    88,
          iq:         98
        }
      },
      {
        id: "payton-0102",
        name: "Gary Payton",
        team: "Los Angeles Lakers",
        season: "2001-02",
        position: "PG",
        image: "assets/payton.png",
        stats: {
          overall:    87,
          speed:      82,
          shooting:   76,
          defense:    94,
          passing:    90,
          rebounding: 52,
          dunking:    55,
          iq:         92
        }
      },
      {
        id: "malone-0102",
        name: "Karl Malone",
        team: "Los Angeles Lakers",
        season: "2001-02",
        position: "PF",
        image: "assets/malone.png",
        stats: {
          overall:    90,
          speed:      72,
          shooting:   82,
          defense:    80,
          passing:    65,
          rebounding: 88,
          dunking:    78,
          iq:         86
        }
      },
      {
        id: "fisher-0102",
        name: "Derek Fisher",
        team: "Los Angeles Lakers",
        season: "2001-02",
        position: "PG",
        image: "assets/fisher.png",
        stats: {
          overall:    76,
          speed:      74,
          shooting:   78,
          defense:    72,
          passing:    80,
          rebounding: 42,
          dunking:    40,
          iq:         85
        }
      }
    ]
  },

  // -----------------------------------------------------------
  //  CHICAGO BULLS — Dynasty 1995-96 (Jordan 72 wins)
  // -----------------------------------------------------------
  {
    id: "bulls-9596",
    name: "Chicago Bulls",
    season: "1995-96",
    players: [
      {
        id: "jordan-9596",
        name: "Michael Jordan",
        team: "Chicago Bulls",
        season: "1995-96",
        position: "SG",
        image: "assets/jordan.png",
        stats: {
          overall:    99,
          speed:      94,
          shooting:   98,
          defense:    96,
          passing:    82,
          rebounding: 68,
          dunking:    97,
          iq:         99
        }
      },
      {
        id: "pippen-9596",
        name: "Scottie Pippen",
        team: "Chicago Bulls",
        season: "1995-96",
        position: "SF",
        image: "assets/pippen.png",
        stats: {
          overall:    93,
          speed:      88,
          shooting:   80,
          defense:    95,
          passing:    88,
          rebounding: 72,
          dunking:    82,
          iq:         94
        }
      },
      {
        id: "rodman-9596",
        name: "Dennis Rodman",
        team: "Chicago Bulls",
        season: "1995-96",
        position: "PF",
        image: "assets/rodman.png",
        stats: {
          overall:    86,
          speed:      78,
          shooting:   42,
          defense:    90,
          passing:    55,
          rebounding: 99,
          dunking:    60,
          iq:         80
        }
      },
      {
        id: "kukoc-9596",
        name: "Toni Kukoč",
        team: "Chicago Bulls",
        season: "1995-96",
        position: "SF",
        image: "assets/kukoc.png",
        stats: {
          overall:    82,
          speed:      76,
          shooting:   84,
          defense:    68,
          passing:    85,
          rebounding: 60,
          dunking:    65,
          iq:         88
        }
      },
      {
        id: "longley-9596",
        name: "Luc Longley",
        team: "Chicago Bulls",
        season: "1995-96",
        position: "C",
        image: "assets/longley.png",
        stats: {
          overall:    74,
          speed:      52,
          shooting:   65,
          defense:    74,
          passing:    58,
          rebounding: 78,
          dunking:    70,
          iq:         72
        }
      }
    ]
  },

  // -----------------------------------------------------------
  //  GOLDEN STATE WARRIORS — Dynasty 2015-16 (73 wins)
  // -----------------------------------------------------------
  {
    id: "warriors-1516",
    name: "Golden State Warriors",
    season: "2015-16",
    players: [
      {
        id: "curry-1516",
        name: "Stephen Curry",
        team: "Golden State Warriors",
        season: "2015-16",
        position: "PG",
        image: "assets/curry.png",
        stats: {
          overall:    99,
          speed:      88,
          shooting:   99,
          defense:    72,
          passing:    88,
          rebounding: 52,
          dunking:    48,
          iq:         97
        }
      },
      {
        id: "thompson-1516",
        name: "Klay Thompson",
        team: "Golden State Warriors",
        season: "2015-16",
        position: "SG",
        image: "assets/klay.png",
        stats: {
          overall:    92,
          speed:      82,
          shooting:   95,
          defense:    84,
          passing:    68,
          rebounding: 58,
          dunking:    70,
          iq:         86
        }
      },
      {
        id: "durant-1516",
        name: "Kevin Durant",
        team: "Golden State Warriors",
        season: "2015-16",
        position: "SF",
        image: "assets/durant.png",
        stats: {
          overall:    97,
          speed:      86,
          shooting:   96,
          defense:    78,
          passing:    76,
          rebounding: 78,
          dunking:    90,
          iq:         92
        }
      },
      {
        id: "green-1516",
        name: "Draymond Green",
        team: "Golden State Warriors",
        season: "2015-16",
        position: "PF",
        image: "assets/draymond.png",
        stats: {
          overall:    88,
          speed:      80,
          shooting:   68,
          defense:    96,
          passing:    90,
          rebounding: 82,
          dunking:    65,
          iq:         98
        }
      },
      {
        id: "iguodala-1516",
        name: "Andre Iguodala",
        team: "Golden State Warriors",
        season: "2015-16",
        position: "SF",
        image: "assets/iguodala.png",
        stats: {
          overall:    82,
          speed:      84,
          shooting:   72,
          defense:    90,
          passing:    80,
          rebounding: 60,
          dunking:    72,
          iq:         88
        }
      }
    ]
  },

  // -----------------------------------------------------------
  //  MIAMI HEAT — 2012-13 (LeBron, Wade, Bosh)
  // -----------------------------------------------------------
  {
    id: "heat-1213",
    name: "Miami Heat",
    season: "2012-13",
    players: [
      {
        id: "lebron-1213",
        name: "LeBron James",
        team: "Miami Heat",
        season: "2012-13",
        position: "SF",
        image: "assets/lebron.png",
        stats: {
          overall:    99,
          speed:      90,
          shooting:   88,
          defense:    88,
          passing:    96,
          rebounding: 82,
          dunking:    96,
          iq:         99
        }
      },
      {
        id: "wade-1213",
        name: "Dwyane Wade",
        team: "Miami Heat",
        season: "2012-13",
        position: "SG",
        image: "assets/wade.png",
        stats: {
          overall:    93,
          speed:      90,
          shooting:   86,
          defense:    86,
          passing:    78,
          rebounding: 58,
          dunking:    92,
          iq:         90
        }
      },
      {
        id: "bosh-1213",
        name: "Chris Bosh",
        team: "Miami Heat",
        season: "2012-13",
        position: "C",
        image: "assets/bosh.png",
        stats: {
          overall:    88,
          speed:      76,
          shooting:   86,
          defense:    76,
          passing:    68,
          rebounding: 84,
          dunking:    78,
          iq:         85
        }
      },
      {
        id: "chalmers-1213",
        name: "Mario Chalmers",
        team: "Miami Heat",
        season: "2012-13",
        position: "PG",
        image: "assets/chalmers.png",
        stats: {
          overall:    74,
          speed:      82,
          shooting:   74,
          defense:    78,
          passing:    78,
          rebounding: 42,
          dunking:    45,
          iq:         76
        }
      },
      {
        id: "allen-1213",
        name: "Ray Allen",
        team: "Miami Heat",
        season: "2012-13",
        position: "SG",
        image: "assets/allen.png",
        stats: {
          overall:    84,
          speed:      78,
          shooting:   97,
          defense:    74,
          passing:    72,
          rebounding: 48,
          dunking:    52,
          iq:         92
        }
      }
    ]
  }

];

// =============================================================
//  MAPA DE CATEGORIAS
//  Traduz as chaves internas (ex: "shooting") para o nome
//  exibido na tela (ex: "Arremesso").
// =============================================================
const STAT_LABELS = {
  overall:    "Overall",
  speed:      "Velocidade",
  shooting:   "Arremesso",
  defense:    "Defesa",
  passing:    "Passe",
  rebounding: "Rebote",
  dunking:    "Enterrada",
  iq:         "IQ"
};

// Array com apenas as chaves, útil para sortear uma categoria aleatória
const STAT_KEYS = Object.keys(STAT_LABELS);
