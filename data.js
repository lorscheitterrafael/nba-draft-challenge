// =============================================================
//  NBA DRAFT CHALLENGE — BASE DE DADOS
//
//  Overalls rebalanceados: range 62–97
//  Lendas absolutas chegam a 95–97. A maioria dos jogadores
//  fica entre 68–88, tornando as séries bem mais competitivas.
//
//  Cores do overall:
//  95+ → dourado (elite)   90–94 → azul    80–89 → branco   <80 → cinza
// =============================================================

const NBA_TEAMS = [

  // -----------------------------------------------------------
  //  GOLDEN STATE WARRIORS 2015-16 · 73 vitórias
  // -----------------------------------------------------------
  {
    id: "gsw-2016",
    name: "Golden State Warriors",
    season: "2015-16",
    players: [
      { id: "curry-gsw",      name: "Stephen Curry",      number: 30, position: "PG", overall: 96 },
      { id: "klay-gsw",       name: "Klay Thompson",      number: 11, position: "SG", overall: 87 },
      { id: "durant-gsw",     name: "Kevin Durant",        number: 35, position: "SF", overall: 92 },
      { id: "draymond-gsw",   name: "Draymond Green",      number: 23, position: "PF", overall: 83 },
      { id: "bogut-gsw",      name: "Andrew Bogut",        number: 12, position: "C",  overall: 72 },
      { id: "iguodala-gsw",   name: "Andre Iguodala",      number: 9,  position: "SF", overall: 77 },
      { id: "livingston-gsw", name: "Shaun Livingston",    number: 34, position: "PG", overall: 68 },
      { id: "barnes-gsw",     name: "Harrison Barnes",     number: 40, position: "SF", overall: 71 }
    ]
  },

  // -----------------------------------------------------------
  //  CHICAGO BULLS 1995-96 · 72 vitórias
  // -----------------------------------------------------------
  {
    id: "chi-1996",
    name: "Chicago Bulls",
    season: "1995-96",
    players: [
      { id: "jordan-chi",  name: "Michael Jordan",   number: 23, position: "SG", overall: 97 },
      { id: "pippen-chi",  name: "Scottie Pippen",   number: 33, position: "SF", overall: 89 },
      { id: "rodman-chi",  name: "Dennis Rodman",    number: 91, position: "PF", overall: 81 },
      { id: "kukoc-chi",   name: "Toni Kukoč",       number: 7,  position: "SF", overall: 77 },
      { id: "longley-chi", name: "Luc Longley",      number: 13, position: "C",  overall: 67 },
      { id: "harper-chi",  name: "Ron Harper",       number: 9,  position: "PG", overall: 71 },
      { id: "kerr-chi",    name: "Steve Kerr",       number: 25, position: "PG", overall: 64 }
    ]
  },

  // -----------------------------------------------------------
  //  LOS ANGELES LAKERS 2001-02 · Tricampeonato
  // -----------------------------------------------------------
  {
    id: "lal-2002",
    name: "Los Angeles Lakers",
    season: "2001-02",
    players: [
      { id: "shaq-lal",   name: "Shaquille O'Neal",  number: 34, position: "C",  overall: 95 },
      { id: "kobe-lal",   name: "Kobe Bryant",        number: 8,  position: "SG", overall: 93 },
      { id: "payton-lal", name: "Gary Payton",        number: 20, position: "PG", overall: 83 },
      { id: "malone-lal", name: "Karl Malone",        number: 11, position: "PF", overall: 85 },
      { id: "fisher-lal", name: "Derek Fisher",       number: 2,  position: "PG", overall: 69 },
      { id: "fox-lal",    name: "Rick Fox",           number: 17, position: "SF", overall: 70 },
      { id: "horry-lal",  name: "Robert Horry",       number: 5,  position: "PF", overall: 72 }
    ]
  },

  // -----------------------------------------------------------
  //  SAN ANTONIO SPURS 2013-14 · Basquete mais bonito da história
  // -----------------------------------------------------------
  {
    id: "sas-2014",
    name: "San Antonio Spurs",
    season: "2013-14",
    players: [
      { id: "duncan-sas",   name: "Tim Duncan",             number: 21, position: "C",  overall: 91 },
      { id: "parker-sas",   name: "Tony Parker",            number: 9,  position: "PG", overall: 86 },
      { id: "ginobili-sas", name: "Manu Ginobili",          number: 20, position: "SG", overall: 83 },
      { id: "leonard-sas",  name: "Kawhi Leonard",          number: 2,  position: "SF", overall: 85 },
      { id: "diaw-sas",     name: "Boris Diaw",             number: 33, position: "PF", overall: 74 },
      { id: "green-sas",    name: "Danny Green",            number: 14, position: "SG", overall: 71 },
      { id: "splitter-sas", name: "Tiago Splitter",         number: 22, position: "PF", overall: 72 },
      { id: "mills-sas",    name: "Patty Mills",            number: 8,  position: "PG", overall: 67 }
    ]
  },

  // -----------------------------------------------------------
  //  MIAMI HEAT 2012-13 · LeBron MVP · Bicampeonato
  // -----------------------------------------------------------
  {
    id: "mia-2013",
    name: "Miami Heat",
    season: "2012-13",
    players: [
      { id: "lebron-mia",   name: "LeBron James",    number: 6,  position: "SF", overall: 97 },
      { id: "wade-mia",     name: "Dwyane Wade",     number: 3,  position: "SG", overall: 89 },
      { id: "bosh-mia",     name: "Chris Bosh",      number: 1,  position: "C",  overall: 84 },
      { id: "allen-mia",    name: "Ray Allen",       number: 34, position: "SG", overall: 79 },
      { id: "chalmers-mia", name: "Mario Chalmers",  number: 15, position: "PG", overall: 68 },
      { id: "battier-mia",  name: "Shane Battier",   number: 31, position: "SF", overall: 67 },
      { id: "haslem-mia",   name: "Udonis Haslem",   number: 40, position: "PF", overall: 66 }
    ]
  },

  // -----------------------------------------------------------
  //  BOSTON CELTICS 2007-08 · Big Three · Campeões
  // -----------------------------------------------------------
  {
    id: "bos-2008",
    name: "Boston Celtics",
    season: "2007-08",
    players: [
      { id: "garnett-bos", name: "Kevin Garnett",    number: 5,  position: "PF", overall: 93 },
      { id: "pierce-bos",  name: "Paul Pierce",      number: 34, position: "SF", overall: 86 },
      { id: "allen-bos",   name: "Ray Allen",        number: 20, position: "SG", overall: 84 },
      { id: "rondo-bos",   name: "Rajon Rondo",      number: 9,  position: "PG", overall: 78 },
      { id: "perkins-bos", name: "Kendrick Perkins", number: 43, position: "C",  overall: 69 },
      { id: "posey-bos",   name: "James Posey",      number: 30, position: "SF", overall: 68 },
      { id: "house-bos",   name: "Eddie House",      number: 11, position: "PG", overall: 63 }
    ]
  },

  // -----------------------------------------------------------
  //  MINNESOTA TIMBERWOLVES 2023-24 · Ant Edwards
  // -----------------------------------------------------------
  {
    id: "min-2024",
    name: "Minnesota Timberwolves",
    season: "2023-24",
    players: [
      { id: "edwards-min",   name: "Anthony Edwards",   number: 5,  position: "SG", overall: 90 },
      { id: "gobert-min",    name: "Rudy Gobert",       number: 27, position: "C",  overall: 84 },
      { id: "randle-min",    name: "Julius Randle",     number: 30, position: "PF", overall: 81 },
      { id: "conley-min",    name: "Mike Conley",       number: 10, position: "PG", overall: 74 },
      { id: "mcdaniels-min", name: "Jaden McDaniels",   number: 3,  position: "SF", overall: 75 },
      { id: "anderson-min",  name: "Kyle Anderson",     number: 1,  position: "PF", overall: 68 },
      { id: "reid-min",      name: "Naz Reid",          number: 11, position: "C",  overall: 73 }
    ]
  },

  // -----------------------------------------------------------
  //  DENVER NUGGETS 2022-23 · Jokić MVP · Campeões
  // -----------------------------------------------------------
  {
    id: "den-2023",
    name: "Denver Nuggets",
    season: "2022-23",
    players: [
      { id: "jokic-den",    name: "Nikola Jokić",               number: 15, position: "C",  overall: 97 },
      { id: "murray-den",   name: "Jamal Murray",               number: 27, position: "PG", overall: 85 },
      { id: "mpj-den",      name: "Michael Porter Jr.",         number: 1,  position: "SF", overall: 80 },
      { id: "gordon-den",   name: "Aaron Gordon",               number: 50, position: "PF", overall: 78 },
      { id: "kcp-den",      name: "Kentavious C-Pope",          number: 5,  position: "SG", overall: 74 },
      { id: "braun-den",    name: "Christian Braun",            number: 0,  position: "SG", overall: 66 },
      { id: "nnaji-den",    name: "Zeke Nnaji",                 number: 22, position: "C",  overall: 62 }
    ]
  },

  // -----------------------------------------------------------
  //  DETROIT PISTONS 2003-04 · Campeões sem estrela dominante
  // -----------------------------------------------------------
  {
    id: "det-2004",
    name: "Detroit Pistons",
    season: "2003-04",
    players: [
      { id: "billups-det",  name: "Chauncey Billups",   number: 1,  position: "PG", overall: 83 },
      { id: "rip-det",      name: "Richard Hamilton",   number: 32, position: "SG", overall: 80 },
      { id: "prince-det",   name: "Tayshaun Prince",    number: 22, position: "SF", overall: 76 },
      { id: "rasheed-det",  name: "Rasheed Wallace",    number: 36, position: "PF", overall: 82 },
      { id: "bwallace-det", name: "Ben Wallace",        number: 3,  position: "C",  overall: 78 },
      { id: "hunter-det",   name: "Lindsey Hunter",     number: 10, position: "PG", overall: 63 },
      { id: "williams-det", name: "Corliss Williamson", number: 5,  position: "SF", overall: 62 }
    ]
  },

  // -----------------------------------------------------------
  //  DALLAS MAVERICKS 2010-11 · Dirk Nowitzki · Campeões
  // -----------------------------------------------------------
  {
    id: "dal-2011",
    name: "Dallas Mavericks",
    season: "2010-11",
    players: [
      { id: "kidd-dal",    name: "Jason Kidd",          number: 5,  position: "PG", overall: 78 },
      { id: "terry-dal",   name: "Jason Terry",         number: 31, position: "SG", overall: 76 },
      { id: "marion-dal",  name: "Shawn Marion",        number: 0,  position: "SF", overall: 76 },
      { id: "dirk-dal",    name: "Dirk Nowitzki",       number: 41, position: "PF", overall: 94 },
      { id: "chandler-dal",name: "Tyson Chandler",      number: 6,  position: "C",  overall: 77 },
      { id: "barea-dal",   name: "J.J. Barea",          number: 11, position: "PG", overall: 70 },
      { id: "stevenson-dal",name:"DeShawn Stevenson",   number: 92, position: "SG", overall: 66 }
    ]
  },

  // -----------------------------------------------------------
  //  CLEVELAND CAVALIERS 2015-16 · LeBron · Remontada histórica
  // -----------------------------------------------------------
  {
    id: "cle-2016",
    name: "Cleveland Cavaliers",
    season: "2015-16",
    players: [
      { id: "kyrie-cle",  name: "Kyrie Irving",         number: 2,  position: "PG", overall: 88 },
      { id: "jr-cle",     name: "J.R. Smith",           number: 5,  position: "SG", overall: 73 },
      { id: "lebron-cle", name: "LeBron James",         number: 23, position: "SF", overall: 97 },
      { id: "love-cle",   name: "Kevin Love",           number: 0,  position: "PF", overall: 82 },
      { id: "tt-cle",     name: "Tristan Thompson",     number: 13, position: "C",  overall: 73 },
      { id: "delly-cle",  name: "Matthew Dellavedova",  number: 8,  position: "PG", overall: 63 },
      { id: "shump-cle",  name: "Iman Shumpert",        number: 4,  position: "SG", overall: 69 }
    ]
  },

  // -----------------------------------------------------------
  //  OKC THUNDER 2011-12 · Durant + Westbrook + Harden
  // -----------------------------------------------------------
  {
    id: "okc-2012",
    name: "OKC Thunder",
    season: "2011-12",
    players: [
      { id: "westbrook-okc", name: "Russell Westbrook", number: 0,  position: "PG", overall: 88 },
      { id: "harden-okc",    name: "James Harden",      number: 13, position: "SG", overall: 85 },
      { id: "durant-okc",    name: "Kevin Durant",      number: 35, position: "SF", overall: 95 },
      { id: "ibaka-okc",     name: "Serge Ibaka",       number: 9,  position: "PF", overall: 79 },
      { id: "perkins-okc",   name: "Kendrick Perkins",  number: 5,  position: "C",  overall: 65 },
      { id: "sefolosha-okc", name: "Thabo Sefolosha",   number: 2,  position: "SG", overall: 68 },
      { id: "collison-okc",  name: "Nick Collison",     number: 4,  position: "PF", overall: 65 }
    ]
  },

  // -----------------------------------------------------------
  //  TORONTO RAPTORS 2018-19 · Kawhi · Campeões
  // -----------------------------------------------------------
  {
    id: "tor-2019",
    name: "Toronto Raptors",
    season: "2018-19",
    players: [
      { id: "lowry-tor",   name: "Kyle Lowry",          number: 7,  position: "PG", overall: 82 },
      { id: "dgreen-tor",  name: "Danny Green",         number: 14, position: "SG", overall: 73 },
      { id: "kawhi-tor",   name: "Kawhi Leonard",       number: 2,  position: "SF", overall: 94 },
      { id: "siakam-tor",  name: "Pascal Siakam",       number: 43, position: "PF", overall: 81 },
      { id: "gasol-tor",   name: "Marc Gasol",          number: 33, position: "C",  overall: 80 },
      { id: "vvf-tor",     name: "Fred VanVleet",       number: 23, position: "PG", overall: 74 },
      { id: "powell-tor",  name: "Norman Powell",       number: 24, position: "SG", overall: 71 }
    ]
  },

  // -----------------------------------------------------------
  //  GOLDEN STATE WARRIORS 2017-18 · Super Time · 4 All-Stars
  // -----------------------------------------------------------
  {
    id: "gsw-2018",
    name: "Golden State Warriors",
    season: "2017-18",
    players: [
      { id: "curry-gsw18",    name: "Stephen Curry",    number: 30, position: "PG", overall: 96 },
      { id: "klay-gsw18",     name: "Klay Thompson",    number: 11, position: "SG", overall: 88 },
      { id: "durant-gsw18",   name: "Kevin Durant",     number: 35, position: "SF", overall: 94 },
      { id: "draymond-gsw18", name: "Draymond Green",   number: 23, position: "PF", overall: 84 },
      { id: "mcgee-gsw18",    name: "JaVale McGee",     number: 1,  position: "C",  overall: 72 },
      { id: "iguodala-gsw18", name: "Andre Iguodala",   number: 9,  position: "SF", overall: 78 },
      { id: "young-gsw18",    name: "Nick Young",        number: 6,  position: "SG", overall: 68 }
    ]
  },

  // -----------------------------------------------------------
  //  HOUSTON ROCKETS 2017-18 · Harden MVP · Quase chegaram
  // -----------------------------------------------------------
  {
    id: "hou-2018",
    name: "Houston Rockets",
    season: "2017-18",
    players: [
      { id: "paul-hou",    name: "Chris Paul",          number: 3,  position: "PG", overall: 91 },
      { id: "harden-hou",  name: "James Harden",        number: 13, position: "SG", overall: 96 },
      { id: "ariza-hou",   name: "Trevor Ariza",        number: 1,  position: "SF", overall: 76 },
      { id: "tucker-hou",  name: "P.J. Tucker",         number: 17, position: "PF", overall: 72 },
      { id: "capela-hou",  name: "Clint Capela",        number: 15, position: "C",  overall: 79 },
      { id: "gordon-hou",  name: "Eric Gordon",         number: 10, position: "SG", overall: 77 },
      { id: "ggreen-hou",  name: "Gerald Green",        number: 14, position: "SF", overall: 67 }
    ]
  },

  // -----------------------------------------------------------
  //  ⚠️ ARMADILHA — Charlotte Bobcats 2011-12 · Pior time da história
  // -----------------------------------------------------------
  {
    id: "cha-2012",
    name: "Charlotte Bobcats",
    season: "2011-12",
    players: [
      { id: "kemba-cha",    name: "Kemba Walker",       number: 15, position: "PG", overall: 73 },
      { id: "henderson-cha",name: "Gerald Henderson",   number: 15, position: "SG", overall: 67 },
      { id: "maggette-cha", name: "Corey Maggette",     number: 50, position: "SF", overall: 68 },
      { id: "thomas-cha",   name: "Tyrus Thomas",       number: 12, position: "PF", overall: 64 },
      { id: "biyombo-cha",  name: "Bismack Biyombo",    number: 0,  position: "C",  overall: 63 },
      { id: "diaw-cha",     name: "Boris Diaw",         number: 32, position: "SF", overall: 68 },
      { id: "white-cha",    name: "D.J. White",         number: 45, position: "PF", overall: 62 }
    ]
  },

  // -----------------------------------------------------------
  //  ⚠️ ARMADILHA — Philadelphia 76ers 2015-16 · "The Process"
  // -----------------------------------------------------------
  {
    id: "phi-2016",
    name: "Philadelphia 76ers",
    season: "2015-16",
    players: [
      { id: "ish-phi",      name: "Ish Smith",          number: 12, position: "PG", overall: 67 },
      { id: "canaan-phi",   name: "Isaiah Canaan",      number: 0,  position: "PG", overall: 64 },
      { id: "covington-phi",name: "Robert Covington",   number: 33, position: "SF", overall: 70 },
      { id: "noel-phi",     name: "Nerlens Noel",       number: 4,  position: "C",  overall: 72 },
      { id: "okafor-phi",   name: "Jahlil Okafor",      number: 8,  position: "C",  overall: 73 },
      { id: "holmes-phi",   name: "Richaun Holmes",     number: 21, position: "PF", overall: 63 },
      { id: "mcconnell-phi",name: "TJ McConnell",       number: 11, position: "PG", overall: 63 }
    ]
  },

  // -----------------------------------------------------------
  //  ⚠️ ARMADILHA — New York Knicks 2014-15 · Melo isolado
  // -----------------------------------------------------------
  {
    id: "nyk-2015",
    name: "New York Knicks",
    season: "2014-15",
    players: [
      { id: "calderon-nyk",  name: "Jose Calderon",     number: 3,  position: "PG", overall: 73 },
      { id: "hardaway-nyk",  name: "Tim Hardaway Jr.",  number: 5,  position: "SG", overall: 68 },
      { id: "melo-nyk",      name: "Carmelo Anthony",   number: 7,  position: "SF", overall: 89 },
      { id: "amare-nyk",     name: "Amar'e Stoudemire", number: 1,  position: "PF", overall: 71 },
      { id: "dalembert-nyk", name: "Samuel Dalembert",  number: 15, position: "C",  overall: 64 },
      { id: "shump-nyk",     name: "Iman Shumpert",     number: 21, position: "SG", overall: 69 },
      { id: "bargnani-nyk",  name: "Andrea Bargnani",   number: 77, position: "PF", overall: 66 }
    ]
  },

  // -----------------------------------------------------------
  //  ⚠️ ARMADILHA — Cleveland Cavaliers 2010-11 · Pós-LeBron
  // -----------------------------------------------------------
  {
    id: "cle-2011",
    name: "Cleveland Cavaliers",
    season: "2010-11",
    players: [
      { id: "mowilliams-cle11", name: "Mo Williams",    number: 2,  position: "PG", overall: 74 },
      { id: "parker-cle11",     name: "Anthony Parker", number: 18, position: "SG", overall: 65 },
      { id: "jamison-cle11",    name: "Antawn Jamison", number: 4,  position: "SF", overall: 72 },
      { id: "varejao-cle11",    name: "Anderson Varejao",number: 17,position: "PF", overall: 71 },
      { id: "erden-cle11",      name: "Semih Erden",    number: 90, position: "C",  overall: 62 },
      { id: "davis-cle11",      name: "Baron Davis",    number: 3,  position: "PG", overall: 71 },
      { id: "hickson-cle11",    name: "J.J. Hickson",   number: 21, position: "PF", overall: 67 }
    ]
  },

  // -----------------------------------------------------------
  //  PHOENIX SUNS 2004-05 · Nash MVP · 7 Segundos ou Menos
  // -----------------------------------------------------------
  {
    id: "phx-2005",
    name: "Phoenix Suns",
    season: "2004-05",
    players: [
      { id: "nash-phx",    name: "Steve Nash",          number: 13, position: "PG", overall: 91 },
      { id: "johnson-phx", name: "Joe Johnson",         number: 2,  position: "SG", overall: 79 },
      { id: "qrich-phx",   name: "Quentin Richardson",  number: 15, position: "SF", overall: 71 },
      { id: "marion-phx",  name: "Shawn Marion",        number: 31, position: "PF", overall: 84 },
      { id: "amare-phx",   name: "Amar'e Stoudemire",   number: 1,  position: "C",  overall: 86 },
      { id: "barbosa-phx", name: "Leandro Barbosa",     number: 10, position: "PG", overall: 71 },
      { id: "diaw-phx",    name: "Boris Diaw",          number: 3,  position: "SF", overall: 70 }
    ]
  },

  // -----------------------------------------------------------
  //  LOS ANGELES LAKERS 2019-20 · LeBron + AD · Campeões
  // -----------------------------------------------------------
  {
    id: "lal-2020",
    name: "Los Angeles Lakers",
    season: "2019-20",
    players: [
      { id: "lebron-lal20",  name: "LeBron James",       number: 23, position: "SF", overall: 97 },
      { id: "ad-lal20",      name: "Anthony Davis",      number: 3,  position: "PF", overall: 95 },
      { id: "rondo-lal20",   name: "Rajon Rondo",        number: 9,  position: "PG", overall: 74 },
      { id: "kuzma-lal20",   name: "Kyle Kuzma",         number: 0,  position: "SF", overall: 75 },
      { id: "howard-lal20",  name: "Dwight Howard",      number: 39, position: "C",  overall: 74 },
      { id: "kcp-lal20",     name: "Kentavious C-Pope",  number: 1,  position: "SG", overall: 74 },
      { id: "caruso-lal20",  name: "Alex Caruso",        number: 4,  position: "PG", overall: 68 }
    ]
  },

  // -----------------------------------------------------------
  //  DALLAS MAVERICKS 2023-24 · Luka + Kyrie · Finalistas
  // -----------------------------------------------------------
  {
    id: "dal-2024",
    name: "Dallas Mavericks",
    season: "2023-24",
    players: [
      { id: "luka-dal",      name: "Luka Dončić",        number: 77, position: "PG", overall: 97 },
      { id: "kyrie-dal",     name: "Kyrie Irving",       number: 11, position: "SG", overall: 89 },
      { id: "pjw-dal",       name: "P.J. Washington",    number: 25, position: "PF", overall: 79 },
      { id: "gafford-dal",   name: "Daniel Gafford",     number: 21, position: "C",  overall: 79 },
      { id: "dji-dal",       name: "Derrick Jones Jr.",  number: 55, position: "SF", overall: 72 },
      { id: "green-dal",     name: "Josh Green",         number: 8,  position: "SG", overall: 70 },
      { id: "kleber-dal",    name: "Maxi Kleber",        number: 42, position: "PF", overall: 68 }
    ]
  },

  // -----------------------------------------------------------
  //  MILWAUKEE BUCKS 2020-21 · Giannis MVP · Campeões
  // -----------------------------------------------------------
  {
    id: "mil-2021",
    name: "Milwaukee Bucks",
    season: "2020-21",
    players: [
      { id: "giannis-mil",   name: "Giannis Antetokounmpo", number: 34, position: "PF", overall: 97 },
      { id: "khris-mil",     name: "Khris Middleton",       number: 22, position: "SF", overall: 88 },
      { id: "holiday-mil",   name: "Jrue Holiday",          number: 21, position: "PG", overall: 84 },
      { id: "lopez-mil",     name: "Brook Lopez",           number: 11, position: "C",  overall: 79 },
      { id: "tucker-mil",    name: "P.J. Tucker",           number: 17, position: "PF", overall: 73 },
      { id: "connaughton-mil",name:"Pat Connaughton",       number: 24, position: "SG", overall: 70 },
      { id: "dj-mil",        name: "DJ Augustin",           number: 14, position: "PG", overall: 66 }
    ]
  },

  // -----------------------------------------------------------
  //  PHOENIX SUNS 2020-21 · CP3 + Booker · Finalistas
  // -----------------------------------------------------------
  {
    id: "phx-2021",
    name: "Phoenix Suns",
    season: "2020-21",
    players: [
      { id: "cp3-phx21",     name: "Chris Paul",         number: 3,  position: "PG", overall: 90 },
      { id: "booker-phx21",  name: "Devin Booker",       number: 1,  position: "SG", overall: 91 },
      { id: "bridges-phx21", name: "Mikal Bridges",      number: 25, position: "SF", overall: 79 },
      { id: "ayton-phx21",   name: "Deandre Ayton",      number: 22, position: "C",  overall: 83 },
      { id: "johnson-phx21", name: "Cameron Johnson",    number: 23, position: "PF", overall: 74 },
      { id: "crowder-phx21", name: "Jae Crowder",        number: 99, position: "PF", overall: 73 },
      { id: "payne-phx21",   name: "Cameron Payne",      number: 15, position: "PG", overall: 70 }
    ]
  },

  // -----------------------------------------------------------
  //  PORTLAND TRAIL BLAZERS 2018-19 · Lillard + McCollum
  // -----------------------------------------------------------
  {
    id: "por-2019",
    name: "Portland Trail Blazers",
    season: "2018-19",
    players: [
      { id: "lillard-por",   name: "Damian Lillard",     number: 0,  position: "PG", overall: 93 },
      { id: "mccollum-por",  name: "CJ McCollum",        number: 3,  position: "SG", overall: 85 },
      { id: "hood-por",      name: "Rodney Hood",        number: 1,  position: "SF", overall: 73 },
      { id: "aminu-por",     name: "Al-Farouq Aminu",    number: 8,  position: "PF", overall: 72 },
      { id: "kanter-por",    name: "Enes Kanter",        number: 00, position: "C",  overall: 75 },
      { id: "collins-por",   name: "Zach Collins",       number: 33, position: "PF", overall: 71 },
      { id: "curry-por",     name: "Seth Curry",         number: 31, position: "SG", overall: 75 }
    ]
  },

  // -----------------------------------------------------------
  //  BROOKLYN NETS 2020-21 · Big Three · KD + Harden + Kyrie
  // -----------------------------------------------------------
  {
    id: "bkn-2021",
    name: "Brooklyn Nets",
    season: "2020-21",
    players: [
      { id: "durant-bkn",   name: "Kevin Durant",        number: 7,  position: "SF", overall: 96 },
      { id: "harden-bkn",   name: "James Harden",        number: 13, position: "PG", overall: 93 },
      { id: "kyrie-bkn",    name: "Kyrie Irving",        number: 11, position: "SG", overall: 91 },
      { id: "blake-bkn",    name: "Blake Griffin",       number: 2,  position: "PF", overall: 74 },
      { id: "aldridge-bkn", name: "LaMarcus Aldridge",  number: 21, position: "C",  overall: 77 },
      { id: "mills-bkn",    name: "Patty Mills",         number: 8,  position: "PG", overall: 70 },
      { id: "harris-bkn",   name: "Joe Harris",          number: 12, position: "SG", overall: 77 }
    ]
  },

  // -----------------------------------------------------------
  //  PHILADELPHIA 76ERS 2022-23 · Embiid MVP
  // -----------------------------------------------------------
  {
    id: "phi-2023",
    name: "Philadelphia 76ers",
    season: "2022-23",
    players: [
      { id: "embiid-phi",    name: "Joel Embiid",        number: 21, position: "C",  overall: 97 },
      { id: "harden-phi",    name: "James Harden",       number: 1,  position: "PG", overall: 87 },
      { id: "maxey-phi",     name: "Tyrese Maxey",       number: 0,  position: "SG", overall: 83 },
      { id: "tobias-phi",    name: "Tobias Harris",      number: 12, position: "PF", overall: 79 },
      { id: "melo-phi",      name: "De'Anthony Melton",  number: 8,  position: "SG", overall: 73 },
      { id: "nwaba-phi",     name: "David Nwaba",        number: 2,  position: "SF", overall: 66 },
      { id: "reed-phi",      name: "Paul Reed",          number: 4,  position: "PF", overall: 67 }
    ]
  },

  // -----------------------------------------------------------
  //  ⚠️ ARMADILHA — Washington Wizards 2019-20 · Bradley Beal sozinho
  // -----------------------------------------------------------
  {
    id: "was-2020",
    name: "Washington Wizards",
    season: "2019-20",
    players: [
      { id: "beal-was",      name: "Bradley Beal",       number: 3,  position: "SG", overall: 88 },
      { id: "ibaka2-was",    name: "Jordan McRae",       number: 0,  position: "SG", overall: 65 },
      { id: "bryant-was",    name: "Thomas Bryant",      number: 13, position: "C",  overall: 73 },
      { id: "bertans-was",   name: "Davis Bertans",      number: 42, position: "PF", overall: 74 },
      { id: "issmith-was",   name: "Ish Smith",          number: 14, position: "PG", overall: 66 },
      { id: "robinson-was",  name: "Jerome Robinson",    number: 10, position: "SG", overall: 63 },
      { id: "brown-was",     name: "Troy Brown Jr.",     number: 6,  position: "SF", overall: 65 }
    ]
  },

  // -----------------------------------------------------------
  //  ⚠️ ARMADILHA — Cleveland Cavaliers 2018-19 · Pós-LeBron vol.2
  // -----------------------------------------------------------
  {
    id: "cle-2019",
    name: "Cleveland Cavaliers",
    season: "2018-19",
    players: [
      { id: "sexton-cle19",  name: "Collin Sexton",      number: 2,  position: "PG", overall: 71 },
      { id: "hill-cle19",    name: "George Hill",        number: 3,  position: "PG", overall: 70 },
      { id: "okoro-cle19",   name: "Cedi Osman",         number: 16, position: "SF", overall: 69 },
      { id: "love-cle19",    name: "Kevin Love",         number: 0,  position: "PF", overall: 79 },
      { id: "zizic-cle19",   name: "Ante Žižić",         number: 41, position: "C",  overall: 66 },
      { id: "nance-cle19",   name: "Larry Nance Jr.",    number: 22, position: "PF", overall: 72 },
      { id: "clarkson-cle19",name: "Jordan Clarkson",    number: 8,  position: "SG", overall: 73 }
    ]
  }

];
