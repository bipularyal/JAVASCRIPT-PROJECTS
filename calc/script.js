const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

// calculate first and 2nd values epenfing on operator
const calculate = {
	'/': (firstNumber, secondNumber) => firstNumber / secondNumber,
	'*': (firstNumber, secondNumber) => firstNumber * secondNumber,
	'+': (firstNumber, secondNumber) => firstNumber + secondNumber,
	'-': (firstNumber, secondNumber) => firstNumber - secondNumber,
	'=': (firstNumber, secondNumber) => secondNumber
};
function sendNumberValue(number) {
	// replace current display value if first value is entered
	if (awaitingNextValue) {
		calculatorDisplay.textContent = number;
		awaitingNextValue = false;
	} else {
		//if display value is 0 replace else add content
		const displayValue = calculatorDisplay.textContent;
		calculatorDisplay.textContent =
			displayValue === '0' ? (calculatorDisplay.textContent = number) : displayValue + number;
	}
}
function addDecimal() {
	// if we pressed an operator don't do anything
	if (awaitingNextValue) return;
	// if no decimal add one denimal at max
	if (!calculatorDisplay.textContent.includes('.')) {
		calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
	}
}
function useOperator(operator) {
	const currentValue = Number(calculatorDisplay.textContent);
	// prevent multiple operators from being used at once
	if (operatorValue && awaitingNextValue) {
		operatorValue = operator;
		return;
	}
	// assign firstValue if no value
	if (!firstValue) {
		firstValue = currentValue;
	} else {
		console.log(firstValue, operatorValue, currentValue);
		const calculation = calculate[operatorValue](firstValue, currentValue);
		calculatorDisplay.textContent = calculation;
		firstValue = calculation;
	}
	/// ready to receive next value after pressing boolean
	awaitingNextValue = true;
	operatorValue = operator;
}
inputBtns.forEach((inputBtn) => {
	if (inputBtn.classList.length === 0) {
		inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
	} else if (inputBtn.classList.contains('operator')) {
		inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
	} else if (inputBtn.classList.contains('decimal')) {
		inputBtn.addEventListener('click', () => addDecimal());
	}
});
// reset display and all other values
function resetAll() {
	firstValue = 0;
	operatorValue = '';
	awaitingNextValue = false;
	calculatorDisplay.textContent = '0';
}
// event listener
clearBtn.addEventListener('click', resetAll);
