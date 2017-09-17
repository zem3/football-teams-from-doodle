module.exports = {
  exportToConsole: function(teams) {
    console.log("\nTeams:\n" + teamsToString(teams));
  }
};

function teamsToString(teams) {
  return teams.map(function(team) {
                return team.map(function(player) {
                  return player.name;
                });
              })
              .map(function(playerNames) {
                return "- " + playerNames.join(", ");
              })
              .join("\n");
}