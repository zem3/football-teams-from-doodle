var doodle = require("doodle");

module.exports = {
  getPlayersForNextMatch: function(doodlePollId) {
    return doodle(config.doodlePollId)
            .participantsForClosestDate()
            .map(function(playerName) {
              return {
                name: playerName,
                rating: config.playerRatings[playerName]
              };
            });
  }
};