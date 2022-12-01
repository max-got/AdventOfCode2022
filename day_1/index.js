import fs from 'fs';

const input = fs.readFileSync('day_1/input.txt', 'utf8');

const regexSplitByEnter = /\n/g;
const c = input.split(regexSplitByEnter); // Make sure to remove the last empty line

c.pop();

const groups = [];
let group = [];
for (let i = 0; i < c.length; i += 1) {
	if (c[i] === '') {
		// split the array to groups
		groups.push(group);
		group = [];
	}
	else {
		group.push(c[i]);
	}
}
// push the last group
groups.push(group);

const sums = [];
groups.forEach((group) => {
	let sum = 0;
	for (let i = 0; i < group.length; i++) {
		// add each item to the sum
		sum += parseInt(group[i]); // there must be a better way to do this
	}
	sums.push(sum);
});

// find the max
export const max = Math.max(...sums); // <-- this is the answer 1
export const topThree = sums
	.sort((a, b) => b - a)
	.slice(0, 3)
	.reduce((a, b) => a + b, 0); // <-- this is the answer 2
