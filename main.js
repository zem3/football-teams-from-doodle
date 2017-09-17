var getPlayers = require("importer").getPlayersForNextMatch,
    generateTeams = require("greedy-generator").generateTeams,
    exportTeams = require("exporter").exportToConsole;

exportTeams(generateTeams(getPlayers()));
