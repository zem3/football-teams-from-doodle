module.exports = {
  generateTeams: function(players) {
    return players.sort(function(player1, player2) {
                    return player2.rating - player1.rating;
                  })
                  .reduce(function(teams, player) {
                    teams[teamRating(teams[0]) < teamRating(teams[1]) ? 0 : 1].push(player);
                    return teams;
                  }, [[], []]);
  }
};

function teamRating(players) {
  return players.reduce(function(teamRating, player) {
    return teamRating + player.rating;
  }, 0);
}