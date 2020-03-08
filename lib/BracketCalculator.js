class BracketCalculator {

  constructor(matches, teams) {
    this.matches = matches;
    this.teams = teams;
    this.groupWinners = [];
    this.groups = [];
  }

  determineWinner(match) {
    let matchPoints = [];

    if (match.scoreA > match.scoreB) {
      matchPoints = [3, 0];
    } else if (match.scoreA < match.scoreB) {
      matchPoints = [0, 3];
    } else {
      matchPoints = [1, 1];
    }

    return matchPoints;
  }

  updateTeamGoals(team, goals) {
    const idx = this.teams.findIndex((x) => x.team === team);
    this.teams[idx].goals += goals;
  }

  updatePoints(team, points) {
    const idx = this.teams.findIndex((x) => x.team === team);
    this.teams[idx].points += points;
  }

  calculatePoints() {
    this.matches.forEach(x => {
      // If match is not determined yet, skip it
      if (x.teamA.match(/^[A-H]\d$/) !== null) {
        return;
      }

      const matchPoints = this.determineWinner(x);
      this.updatePoints(x.teamA, matchPoints[0]);
      this.updatePoints(x.teamB, matchPoints[1]);
      this.updateTeamGoals(x.teamA, x.scoreA);
      this.updateTeamGoals(x.teamB, x.scoreB);
    });
  }

  calculateGroupWinners() {

    // Get unique group name (e.g A, B etc)
    this.groups = [...new Set(this.teams.map(item => item.group))];

    // Foreach group name, get the 2 teams with most points
    this.groups.forEach(x => {

      const groupTeams = this.teams.filter(y => y.group === x);

      // Sort group based on points, and if equal sort on goals
      groupTeams.sort((a, b) => {
        let compare;

        if (a.points > b.points) {
          compare = -1;
        } else if (a.points < b.points) {
          compare = 1;
        } else {
          if (a.goals > b.goals) {
            compare = -1;
          } else if (a.goals < b.goals) {
            compare = 1;
          } else {
            compare = 0;
          }
        }

        return compare;
      });

      // push the top 2 teams into groupWinners
      this.groupWinners.push([...new Set(groupTeams.map(item => item.team))].slice(0, 2));
    });
  }

  // Changes e.g A1 to Group A Winner 1, and B1 to Group B Winner 1
  transformMatch(match) {
    let localMatch = Object.assign({}, match);

    const [teamAGroup, teamAPlace] = match.teamA.split('');
    const [teamBGroup, teamBPlace] = match.teamB.split('');

    const teamAIdx = this.groups.indexOf(teamAGroup);
    const teamBIdx = this.groups.indexOf(teamBGroup);

    localMatch.teamA = this.groupWinners[teamAIdx][teamAPlace - 1];
    localMatch.teamB = this.groupWinners[teamBIdx][teamBPlace - 1];

    return localMatch;
  }
}

module.exports = BracketCalculator;
