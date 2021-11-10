const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');
const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = new Date();
let countdownActive;
let savedCountdown;

const second = 1000;
const min = second * 60;
const hour = min * 60;
const day = hour * 24;

//// POPULATE OUR COUNTDOWN
function updateDOM() {
	countdownActive = setInterval(() => {
		const now = new Date().getTime();
		const distance = countdownValue - now;
		const days = Math.floor(distance / day);
		const hours = Math.floor((distance % day) / hour);
		const mins = Math.floor((distance % hour) / min);
		const secs = Math.floor((distance % min) / second);
		// hide input
		inputContainer.hidden = true;

		// if countdown has ended, show complete
		if (distance < 0) {
			countdownEl.hidden = true;
			clearInterval(countdownActive);
			completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
			completeEl.hidden = false;
		} else {
			//show countdown in progress
			countdownElTitle.textContent = `${countdownTitle}`;
			timeElements[0].textContent = `${days}`;
			timeElements[1].textContent = `${hours}`;
			timeElements[2].textContent = `${mins}`;
			timeElements[3].textContent = `${secs}`;
			// hiding and showing different elements
			completeEl.hidden = true;
			countdownEl.hidden = false;
		}
	}, second);
}
// set date input min with today's date
const today = new Date().toISOString().split('T')[0];
// dateEl.setAttribute('min', today);

//take values from form input
function updateCountdown(e) {
	e.preventDefault();
	countdownTitle = e.srcElement[0].value;
	countdownDate = e.srcElement[1].value;
	savedCountdown = {
		title: countdownTitle,
		date: countdownDate
	};
	localStorage.setItem('countdown', JSON.stringify(savedCountdown));
	// check for a valid date
	if (countdownDate === '') {
		console.log('Try again .... invalid date');
	} else {
		// get number version of currentDate
		countdownValue = new Date(countdownDate).getTime();
		updateDOM();
	}
}
// reset all values
function reset() {
	// hide countdowns and show input
	countdownEl.hidden = true;
	completeEl.hidden = true;
	inputContainer.hidden = false;
	// stop countdown
	clearInterval(countdownActive);
	countdownTitle = '';
	countdownDate = '';
	localStorage.removeItem('countdown');
}
function restorePreviousCountdown() {
	// get countdown from local storage if available
	if (localStorage.getItem('countdown')) {
		inputContainer.hidden = true;
		savedCountdown = JSON.parse(localStorage.getItem('countdown'));
		countdownTitle = savedCountdown.title;
		countdownDate = savedCountdown.date;
		countdownValue = new Date(countdownDate).getTime();
		updateDOM();
	}
}

// on load check local storage
restorePreviousCountdown();

//Event Listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);
