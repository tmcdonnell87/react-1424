import { EVALUATE } from '../constants';

function calcPoints(hand) {
  if (!hand[1]) { return 0; }
  if (!hand[4]) { return 0; }
  let points = 0;
  for (const roll of Object.keys(hand)) {
    points += roll * hand[roll];
  }
  return points - 5;
}

function getOptionsFromRoll(dice, hasOne, hasFour) {
  const choices = [];
  const max = dice[dice.length - 1];
  choices.push(parseInt(max, 10));
  if (!hasFour && max > 4) {
    for (let idx = dice.length - 2; dice[idx] >= 4 && idx > 0; idx--) {
      if (dice[idx] == 4) {  // eslint-disable-line eqeqeq
        choices.push(4);
        break;
      }
    }
  }
  if (!hasOne && dice[0] == 1) { // eslint-disable-line eqeqeq
    choices.push(1);
  }
  return choices;
}

function generateRolls(numDice) {
  if (numDice === 1) {
    return [[1], [2], [3], [4], [5], [6]];
  }
  const arr = [];
  generateRolls(numDice - 1).forEach((subRoll) => {
    let copy;
    for (let i = 1; i <= 6; i++) {
      copy = subRoll.slice();
      copy.push(i);
      arr.push(copy);
    }
  });
  return arr;
}

const rollProbabilities = {};
function getRolls(num) {
  let key;
  if (!rollProbabilities[num]) {
    rollProbabilities[num] = new Map();
    const rolls = generateRolls(num);
    rolls.forEach((roll) => {
      key = roll.sort().join();
      rollProbabilities[num].set(key, (rollProbabilities[num].get(key)) + 1 || 1);
    });
  }
  return rollProbabilities[num];
}


function evaluateOptions(hand, available) {
  if (available.length === 1) {
    const roll = available[0];
    hand[roll] = hand[roll] + 1 || 1;   // eslint-disable-line no-param-reassign
    const points = calcPoints(hand);
    hand[roll]--;   // eslint-disable-line no-param-reassign
    return new Map([[roll, points]]);
  }

  // recurse
  const expectedValues = new Map();
  const options = getOptionsFromRoll(available, hand[1], hand[4]);
  const nextRolls = getRolls(available.length - 1);
  for (let i = 0; i < options.length; i++) {
    const take = options[i];
    hand[take] = hand[take] + 1 || 1;   // eslint-disable-line no-param-reassign
    let score = 0;
    for (const [roll, weight] of nextRolls) {
      const scores = evaluateOptions(hand, roll.split(','));
      let max = 0;
      for (const val of scores.values()) {
        if (val > max) { max = val; }
      }
      score += weight * max;
    }
    hand[take]--;  // eslint-disable-line no-param-reassign
    expectedValues.set(take, score / (6 ** (available.length - 1)));
  }
  // process.stdout.write(JSON.stringify(hand) + ' + ' + available.toString() + ' => ');
  // console.log(expectedValues);
  return expectedValues;
}

export function evaluate(hand, available) {
  return {
    type: EVALUATE,
    choices: evaluateOptions(hand, available),
  };
}

