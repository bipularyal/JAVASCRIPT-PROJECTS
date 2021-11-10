// Pages
const gamePage = document.getElementById('game-page');
const scorePage = document.getElementById('score-page');
const splashPage = document.getElementById('splash-page');
const countdownPage = document.getElementById('countdown-page');
// Splash Page
const startForm = document.getElementById('start-form');
const radioContainers = document.querySelectorAll('.radio-container');
const radioInputs = document.querySelectorAll('input');
const bestScores = document.querySelectorAll('.best-score-value');
// Countdown Page
const countdown = document.querySelector('.countdown');
// Game Page
const itemContainer = document.querySelector('.item-container');
// Score Page
const finalTimeEl = document.querySelector('.final-time');
const baseTimeEl = document.querySelector('.base-time');
const penaltyTimeEl = document.querySelector('.penalty-time');
const playAgainBtn = document.querySelector('.play-again');

// Equations

let equationsArray = [];
let playerGuessArray = [];
let questionAmount = 0;
let bestScoreArray = [];
// Game Page
let firstNumber = 0;
let secondNumber = 0;
let equationObject = {};
const wrongFormat = [];
// Time
let timer;
let timePlayed = 0;
let baseTime = 0;
let penaltyTime = 0;
let finalTime = 0;
let finalTimeDisplay = '0.0';
// Scroll
let valueY = 0;

// refresh splash Page Best Scores
function bestScoreToDOM() {
	bestScores.forEach((bestScore, i) => {
		const bestScoreEl = bestScore;
		bestScoreEl.textContent = `${bestScoreArray[i].bestScore}s`;
	});
}
// check localStorage for best scores and set best scores
function getSavedBestScores() {
	if (localStorage.getItem('bestScores')) {
		bestScoreArray = JSON.parse(localStorage.getItem('bestScores'));
	} else {
		bestScoreArray = [
			{ questions: 10, bestScore: finalTimeDisplay },
			{ questions: 25, bestScore: finalTimeDisplay },
			{ questions: 50, bestScore: finalTimeDisplay },
			{ questions: 99, bestScore: finalTimeDisplay }
		];
		localStorage.setItem('bestScores', JSON.stringify(bestScoreArray));
	}
	bestScoreToDOM();
}
// uppdate best score array
function updateBestScores() {
	bestScoreArray.forEach((score, index) => {
		// here score is indicial object in bestscore array
		//select the correct best score to update
		if (questionAmount == score.questions) {
			// return best score as number with one decimal
			const savedBestScore = Number(bestScoreArray[index].bestScore);
			// only update if now final score is less or replacing 0
			if (savedBestScore === 0 || savedBestScore > finalTime) {
				bestScoreArray[index].bestScore = finalTimeDisplay;
			}
		}
	});
	// pass new bestScore to DOM
	bestScoreToDOM();
	// save to local storage
	localStorage.setItem('bestScores', JSON.stringify(bestScoreArray));
}

// play game again ... reset  the game
function playAgain() {
	gamePage.addEventListener('click', startTimer);
	scorePage.hidden = true;
	splashPage.hidden = false;
	equationsArray = [];
	playerGuessArray = [];
	console.log('successful');
	valueY = 0;
	playAgainBtn.hidden = true;
}
// show score page
function showScorePage() {
	setTimeout(() => {
		playAgainBtn.hidden = false;
	}, 1111);
	gamePage.hidden = true;
	scorePage.hidden = false;
}
// format and display time in DOM
function scoresToDOM() {
	finalTimeDisplay = finalTime.toFixed(1);
	baseTime = timePlayed.toFixed(1);
	penaltyTime = penaltyTime.toFixed(1);
	baseTimeEl.textContent = `Base Time: ${baseTime}s`;
	penaltyTimeEl.textContent = `Penalty: +${penaltyTime}s`;
	finalTimeEl.textContent = `${finalTimeDisplay}s`;
	// update best scores
	updateBestScores();
	// scroll to top of game container
	itemContainer.scroll(0, 0); // itemcontainer is scrolled way down .. back up
	showScorePage();
}
// check which all answers were correct if wrong add penalty time
function checkAnswer() {
	equationsArray.forEach((equation, i) => {
		if (equation.evaluated === playerGuessArray[i]) {
		} else {
			penaltyTime += 1.8;
		}
	});
	finalTime = timePlayed + penaltyTime;
}
//stop timer process results go to score page
function checkTime() {
	if (playerGuessArray.length == questionAmount) {
		console.log(playerGuessArray);
		clearInterval(timer);
		checkAnswer();
		console.log(timePlayed, penaltyTime, finalTime);
		scoresToDOM();
	}
}

// start timer when game page is clicked
// add 1/1-th sec to time played
function addTime() {
	timePlayed += 0.1;
	console.log(timePlayed);
	checkTime();
}
function startTimer() {
	// reset time
	timePlayed = 0;
	penaltyTime = 0;
	finalTime = 0;
	timer = setInterval(addTime, 100);
	gamePage.removeEventListener('click', startTimer);
}

// scroll store user selection on playerGuessArray
function select(guessedTrue) {
	// scroll 80px at a time
	valueY += 80;
	itemContainer.scroll(0, valueY);
	// add player guess to array
	return guessedTrue ? playerGuessArray.push('true') : playerGuessArray.push('false');
}
// display game page
function showGamePage() {
	console.log(valueY);

	gamePage.hidden = false;
	countdownPage.hidden = true;
}
// Create Correct/Incorrect Random Equations
// random number to select numberof corrent andi incorrent equations
function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}
// suffle arrays to get random true and false results
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[ array[i], array[j] ] = [ array[j], array[i] ];
	}
}
function createEquations() {
	//Randomly choose how many correct equations there should be
	const correctEquations = getRandomInt(questionAmount);
	//Set amount of wrong equations
	const wrongEquations = questionAmount - correctEquations;
	//Loop through, multiply random numbers up to 9, push to array
	for (let i = 0; i < correctEquations; i++) {
		firstNumber = getRandomInt(9);
		secondNumber = getRandomInt(9);
		const equationValue = firstNumber * secondNumber;
		const equation = `${firstNumber} x ${secondNumber} = ${equationValue}`;
		equationObject = { value: equation, evaluated: 'true' };
		equationsArray.push(equationObject);
	}
	//	Loop through, mess with the equation results, push to array
	for (let i = 0; i < wrongEquations; i++) {
		firstNumber = getRandomInt(9);
		secondNumber = getRandomInt(9);
		const equationValue = firstNumber * secondNumber;
		wrongFormat[0] = `${firstNumber} x ${secondNumber + 1} = ${equationValue}`;
		wrongFormat[1] = `${firstNumber} x ${secondNumber} = ${equationValue - 1}`;
		wrongFormat[2] = `${firstNumber + 1} x ${secondNumber} = ${equationValue}`;
		const formatChoice = getRandomInt(3);
		const equation = wrongFormat[formatChoice];
		equationObject = { value: equation, evaluated: 'false' };
		equationsArray.push(equationObject);
	}
	shuffleArray(equationsArray);
}
// add equations to DOM
function equationsToDOM() {
	equationsArray.forEach((equation) => {
		// item
		const item = document.createElement('div');
		item.classList.add('item');
		//equation text
		const equationText = document.createElement('h1');
		equationText.textContent = equation.value;
		// append
		item.append(equationText);
		itemContainer.append(item);
	});
}
//Dynamically adding correct/incorrect equations
function populateGamePage() {
	// Reset DOM, Set Blank Space Above
	itemContainer.textContent = '';
	// Spacer
	const topSpacer = document.createElement('div');
	topSpacer.classList.add('height-240');
	// Selected Item
	const selectedItem = document.createElement('div');
	selectedItem.classList.add('selected-item');
	// Append
	itemContainer.append(topSpacer, selectedItem);

	// Create Equations, Build Elements in DOM
	createEquations();
	equationsToDOM();
	// Set Blank Space Below
	const bottomSpacer = document.createElement('div');
	bottomSpacer.classList.add('height-500');
	itemContainer.appendChild(bottomSpacer);
}

// display 3/2/1/go!
function countdownStart() {
	countdown.textContent = '3';
	setTimeout(() => {
		countdown.textContent = '2';
	}, 1000);
	setTimeout(() => {
		countdown.textContent = '1';
	}, 2000);
	setTimeout(() => {
		countdown.textContent = 'GO!';
	}, 3000);
}
// navigate from splash to countdown page
function showCountDown() {
	splashPage.hidden = true;
	countdownPage.hidden = false;
	countdownStart();
	populateGamePage();
	setTimeout(showGamePage, 4000);
}
// get value of selected radio button
function getRadioValue() {
	let radioValue;
	radioInputs.forEach((radioInput) => {
		if (radioInput.checked) {
			radioValue = radioInput.value;
		}
	});
	return radioValue;
}
function selectQuestionAmount(e) {
	e.preventDefault();
	questionAmount = getRadioValue();
	if (questionAmount) {
		showCountDown();
	}
}
startForm.addEventListener('click', () => {
	radioContainers.forEach((radioEl) => {
		// remove selected label
		radioEl.classList.remove('selected-label');
		// add it back if the radio input is checked
		if (radioEl.children[1].checked) {
			radioEl.classList.add('selected-label');
		}
	});
});

// event listeners
startForm.addEventListener('submit', selectQuestionAmount);
gamePage.addEventListener('click', startTimer);
// on load
getSavedBestScores();
