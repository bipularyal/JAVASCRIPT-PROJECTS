import { startConfetti, stopConfetti, removeConfetti } from './confetti.js';
const choices = {
	rock: { name: 'Rock', defeats: [ 'scissors', 'lizard' ] },
	paper: { name: 'Paper', defeats: [ 'rock', 'spock' ] },
	scissors: { name: 'Scissors', defeats: [ 'paper', 'lizard' ] },
	lizard: { name: 'Lizard', defeats: [ 'paper', 'spock' ] },
	spock: { name: 'Spock', defeats: [ 'scissors', 'rock' ] }
};
let playerScoreNumber = 0;
let computerScoreNumber = 0;
let computerChoice = '';
const playerScoreEl = document.getElementById('playerScore');
const playerChoiceEl = document.getElementById('playerChoice');
const computerScoreEl = document.getElementById('computerScore');
const computerChoiceEl = document.getElementById('computerChoice');
const resultText = document.getElementById('resultText');

const playerRock = document.getElementById('playerRock');
const playerPaper = document.getElementById('playerPaper');
const playerScissors = document.getElementById('playerScissors');
const playerLizard = document.getElementById('playerLizard');
const playerSpock = document.getElementById('playerSpock');

const computerRock = document.getElementById('computerRock');
const computerPaper = document.getElementById('computerPaper');
const computerScissors = document.getElementById('computerScissors');
const computerLizard = document.getElementById('computerLizard');
const computerSpock = document.getElementById('computerSpock');

const allGameIcons = document.querySelectorAll('.far');

// reset all selected icons
function resetSelected() {
	allGameIcons.forEach((icon) => {
		icon.classList.remove('selected');
	});
	stopConfetti();
	removeConfetti();
}
// reset everythings
function resetAll() {
	resetSelected();
	playerScoreNumber = 0;
	computerScoreNumber = 0;
	playerScoreEl.textContent = playerScoreNumber;
	computerScoreEl.textContent = computerScoreNumber;
	playerChoiceEl.textContent = ' ';
	computerChoiceEl.textContent = ' ';
	resultText.textContent = '';
}
window.resetAll = resetAll;
// random computer choice
function computerRandomChoice() {
	const compChoiceNum = Math.random();
	if (compChoiceNum <= 0.2) {
		computerChoice = 'rock';
	} else if (compChoiceNum <= 0.4) {
		computerChoice = 'paper';
	} else if (compChoiceNum <= 0.6) {
		computerChoice = 'scissors';
	} else if (compChoiceNum <= 0.8) {
		computerChoice = 'lizard';
	} else {
		computerChoice = 'spock';
	}
}
/// add selected styling and computer choice
function displayComputerChoice() {
	// add selecting styling and update computerChoice
	switch (computerChoice) {
		case 'rock':
			computerRock.classList.add('selected');
			computerChoiceEl.textContent = ' --- Rock';
			break;
		case 'paper':
			computerPaper.classList.add('selected');
			computerChoiceEl.textContent = ' --- Paper';
			break;
		case 'scissors':
			computerScissors.classList.add('selected');
			computerChoiceEl.textContent = ' --- Scissors';
			break;
		case 'lizard':
			computerLizard.classList.add('selected');
			computerChoiceEl.textContent = ' --- Lizard';
			break;
		case 'spock':
			computerSpock.classList.add('selected');
			computerChoiceEl.textContent = ' --- Spock';
			break;
		default:
			break;
	}
}
// check result, increase scores, update resultsText
function updateScore(playerChoice) {
	console.log(playerChoice, computerChoice);
	if (playerChoice === computerChoice) {
		resultText.textContent = "It's a tie.";
	} else {
		const choice = choices[playerChoice];
		if (choice.defeats.indexOf(computerChoice) > -1) {
			startConfetti();
			resultText.textContent = 'You Win';
			playerScoreNumber++;
			playerScoreEl.textContent = playerScoreNumber;
		} else {
			resultText.textContent = 'You Lost';
			computerScoreNumber++;
			computerScoreEl.textContent = computerScoreNumber;
		}
	}
}

// call functions to process turn
function checkResult(playerChoice) {
	resetSelected();
	computerRandomChoice();
	displayComputerChoice();
	updateScore(playerChoice);
}

// passing player selection value
function select(playerChoice) {
	checkResult(playerChoice);
	// add selecting styling and update playerChoice
	switch (playerChoice) {
		case 'rock':
			playerRock.classList.add('selected');
			playerChoiceEl.textContent = ' --- Rock';
			break;
		case 'paper':
			playerPaper.classList.add('selected');
			playerChoiceEl.textContent = ' --- Paper';
			break;
		case 'scissors':
			playerScissors.classList.add('selected');
			playerChoiceEl.textContent = ' --- Scissors';
			break;
		case 'lizard':
			playerLizard.classList.add('selected');
			playerChoiceEl.textContent = ' --- Lizard';
			break;
		case 'spock':
			playerSpock.classList.add('selected');
			playerChoiceEl.textContent = ' --- Spock';
			break;
		default:
			break;
	}
}
window.select = select; // this is done because since we are using modules, no longer are these functions global so we can't use onclick ... to bypass that
// on startup set initail values
resetAll();
