var doodle = require("doodle"),
    generator = require("greedy-generator"),
    exporter = require("exporter");

var doodleUrl = "https://doodle.com/poll/REPLACE_THIS_PART",
    playerRatings = Object.freeze({
      "Zé": 10,
      "Messi": 9,
      "Hazard": 8,
      "Coutinho": 7,
      "Modric": 6,
      "Verratti": 5,
      "Thiago Silva": 4,
      "Hummels": 3,
      "Marcelo": 2,
      "Dani Alves": 1
    });

var players = doodle(doodleUrl).participantsForClosestDate();
var teams = generator.generateTeams(players, playerRatings);
exporter.exportToConsole(teams);
