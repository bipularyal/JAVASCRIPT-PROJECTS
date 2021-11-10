const form = document.getElementById('form');
const password1El = document.getElementById('password1');
const password2El = document.getElementById('password2');
const messageContainer = document.querySelector('.message-container');
const message = document.getElementById('message');
let isValid = false;
let passwordsMatch = false;

function validateForm() {
	// using constraint api
	isValid = form.checkValidity(); // checks if all items are valid or not
	/// style the main message for an error
	if (!isValid) {
		message.textContent = 'Please fill out all the fields';
		message.style.color = 'red';
		messageContainer.style.borderColor = 'red';
		return;
	}
	// check to see if passwords match
	if (password1El.value === password2El.value) {
		passwordsMatch = true;
		password1El.style.borderColor = 'green';
		password2El.style.borderColor = 'green';
	} else {
		passwordsMatch = false;
		message.textContent = 'Make sure Passwords match.';
		password1El.style.borderColor = 'red';
		password2El.style.borderColor = 'red';
		message.style.Color = 'red';
		messageContainer.style.borderColor = 'red';
		return;
	}
	// if form is valid and password match
	if (isValid && passwordsMatch) {
		message.textContent = 'Successfully Registered';
		message.style.color = 'green';
		messageContainer.style.borderColor = 'green';
	}
}
function storeformData() {
	const user = {
		name: form.name.value,
		phone: form.phone.value,
		email: form.email.value,
		website: form.website.value,
		password: form.password.value
	};
	// do something with user data
	console.log(user);
}

function processFormData(e) {
	e.preventDefault();
	// validate form
	validateForm();
	if (isValid && passwordsMatch) storeformData();
}
// event listener
form.addEventListener('submit', processFormData);
