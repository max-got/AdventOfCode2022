import {readFileSync} from 'fs';
export const input = readFileSync('day_2/input.txt', 'utf8');

export const TEST_INPUT = `
A Y
B X
C Z`;

//who beats what
const RULES = new Map();
RULES.set('Rock', 'Paper');
RULES.set('Paper', 'Scissors');
RULES.set('Scissors', 'Rock');

//map for the points -> r : 1, p : 2, s : 3
const POINTS = new Map();
POINTS.set('Rock', 1);
POINTS.set('Paper', 2);
POINTS.set('Scissors', 3);

//map for the round points
const POINTS_ROUND = new Map();
POINTS_ROUND.set('win', 6);
POINTS_ROUND.set('loss', 0);
POINTS_ROUND.set('draw', 3);

//map the letters to rps
//Why? Dont want to see ABCXZYZAB... in the output :)
const MAP = new Map();
MAP.set('A', 'Rock');
MAP.set('B', 'Paper');
MAP.set('C', 'Scissors');
MAP.set('X', 'Rock');
MAP.set('Y', 'Paper');
MAP.set('Z', 'Scissors');

console.time('ROUND1');
export const getPoints = (input) => {
	const choices = input.trim().split(/\n/g);
	let points = 0;
	choices.forEach((choice) => {
		const [opponent, player] = choice.split(' ');
		const opponentChoice = MAP.get(opponent);
		const playerChoice = MAP.get(player);
		if (opponentChoice === playerChoice) {
			points += POINTS_ROUND.get('draw');
		} else if (RULES.get(opponentChoice) === playerChoice) {
			points += POINTS_ROUND.get('win');
		} else {
			points += POINTS_ROUND.get('loss');
		}
		const additionalPoints = POINTS.get(playerChoice);
		points += additionalPoints;

	});
	return points;
};
console.timeEnd('ROUND1'); // 0.006ms
getPoints(input);// 12276


const RULES2 = new Map();
RULES2.set('X', 'loss');
RULES2.set('Y', 'draw');
RULES2.set('Z', 'win');

console.time('ROUND2');
export const getPoints2 = (input) => {
	const choices = input.trim().split(/\n/g);
	let points = 0;
	choices.forEach((choice) => {
		const [opponent, player] = choice.split(' ');
		const opponentChoice = MAP.get(opponent); //e.g. 'Rock'
		const wantedResult = RULES2.get(player); // e.g. 'win'
		let playerChoice = '';
		let additionalPoints = 0;
		if (wantedResult === 'draw') {
			playerChoice = opponentChoice; 
			additionalPoints = POINTS.get(playerChoice);
			points += POINTS_ROUND.get('draw') + additionalPoints;
		} else if (wantedResult === 'win') {
			playerChoice = RULES.get(opponentChoice);
			additionalPoints = POINTS.get(playerChoice);
			points += POINTS_ROUND.get('win') + additionalPoints;
		}
		else {
			playerChoice = RULES.get(RULES.get(opponentChoice));
			additionalPoints = POINTS.get(playerChoice);
			points += POINTS_ROUND.get('loss') + additionalPoints;
		}

	});
	
	return points;
};
console.timeEnd('ROUND2'); // 0.006ms
getPoints2(input); // 9975