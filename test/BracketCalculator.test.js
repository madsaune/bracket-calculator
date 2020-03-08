const BracketCalculator = require('../lib/BracketCalculator');

test('It should return matches, and teams as inputted', () => {

  const teams = [
    {
      team: 'Finland',
      group: 'A',
      points: 0,
      goals: 0
    },
    {
      team: 'Danmark',
      group: 'A',
      points: 0,
      goals: 0
    },
    {
      team: 'Norway',
      group: 'A',
      points: 0,
      goals: 0
    },
    {
      team: 'Germany',
      group: 'B',
      points: 0,
      goals: 0
    },
    {
      team: 'Sweden',
      group: 'A',
      points: 0,
      goals: 0
    },
    {
      team: 'France',
      group: 'B',
      points: 0,
      goals: 0
    },
    {
      team: 'Spain',
      group: 'B',
      points: 0,
      goals: 0
    },
    {
      team: 'Netherland',
      group: 'B',
      points: 0,
      goals: 0
    }
  ];

  const matches = [
    {
      id: 1,
      teamA: 'Norway',
      teamB: 'Sweden',
      scoreA: 3,
      scoreB: 1
    },
    {
      id: 1,
      teamA: 'Norway',
      teamB: 'Sweden',
      scoreA: 3,
      scoreB: 1
    },
    {
      id: 2,
      teamA: 'Sweden',
      teamB: 'Norway',
      scoreA: 1,
      scoreB: 1
    },
    {
      id: 2,
      teamA: 'Sweden',
      teamB: 'Norway',
      scoreA: 3,
      scoreB: 2
    },
    {
      id: 2,
      teamA: 'Danmark',
      teamB: 'Finland',
      scoreA: 4,
      scoreB: 1
    },
    {
      id: 2,
      teamA: 'Danmark',
      teamB: 'Finland',
      scoreA: 3,
      scoreB: 3
    },
    {
      id: 3,
      teamA: 'Germany',
      teamB: 'France',
      scoreA: 1,
      scoreB: 2
    },
    {
      id: 7,
      teamA: 'A1',
      teamB: 'B1',
      scoreA: null,
      scoreB: null
    }
  ];

  const bracketCalculator = new BracketCalculator(matches, teams);
  expect(bracketCalculator.teams).toEqual(teams);
  expect(bracketCalculator.matches).toEqual(matches);
});

test('It should calculate correct points and goals', () => {
  const teams = [
    {
      team: 'Norway',
      group: 'A',
      points: 0,
      goals: 0
    },
    {
      team: 'Sweden',
      group: 'A',
      points: 0,
      goals: 0
    }
  ];
  const matches = [
    {
      teamA: 'Norway',
      teamB: 'Sweden',
      scoreA: 2,
      scoreB: 1
    },
    {
      teamA: 'Sweden',
      teamB: 'Norway',
      scoreA: 1,
      scoreB: 1
    }
  ];

  const bracketCalculator = new BracketCalculator(matches, teams);
  bracketCalculator.calculatePoints();

  expect(bracketCalculator.teams).toEqual([
    {
      team: 'Norway',
      group: 'A',
      points: 4,
      goals: 3
    },
    {
      team: 'Sweden',
      group: 'A',
      points: 1,
      goals: 2
    }
  ])
});

// bracketCalculator.calculatePoints();
// console.log(bracketCalculator.teams);

// bracketCalculator.calculateGroupWinners();
// console.log(bracketCalculator.groupWinners);
// console.log(bracketCalculator.matches[bracketCalculator.matches.length - 1]);
// console.log(bracketCalculator.transformMatch(bracketCalculator.matches[bracketCalculator.matches.length - 1]));