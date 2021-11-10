const toggleSwitch = document.querySelector('input[type="checkbox"]');
const toggleIcon = document.getElementById('toggle-icon');
const nav = document.getElementById('nav');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const textBox = document.getElementById('text-box');

//changing color of images
function imageMode(color) {
	image1.src = `./img/undraw_feeling_proud_${color}.svg`;
	image2.src = `./img/undraw_proud_coder_${color}.svg`;
	image3.src = `./img/undraw_conceptual_idea_${color}.svg`;
}

//DArk mode styling
function darkMode() {
	nav.style.backgroundColor = 'rgb(0 0 0 / 50%)';
	textBox.style.backgroundColor = 'rgb(255 255 255 / 50%)';
	toggleIcon.children[0].textContent = 'Dark mode';
	toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon'); // fa-moon replaces fa-moon same as removing one and adding another
	imageMode('dark');
}

// light mode styling
function lightMode() {
	nav.style.backgroundColor = 'rgb(255 255 255 / 50%)';
	textBox.style.backgroundColor = 'rgb(0 0 0 / 50%)';
	toggleIcon.children[0].textContent = 'Light Mode';
	toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun'); // fa-moon replaces fa-moon same as removing one and adding another
	imageMode('light');
}

function switchTheme(event) {
	if (event.target.checked) {
		document.documentElement.setAttribute('data-theme', 'dark'); //documentElement means root element so our CSS variables  data-theme attribute overrides root element's variables because it's more specidic to use data-theme than jist root
		localStorage.setItem('theme', 'dark'); //storage1 // we store the information of which mode user previously toggled in computer so we know that once we visit website back
		darkMode();
	} else {
		document.documentElement.setAttribute('data-theme', 'light'); /// so root element's variables are used again
		localStorage.setItem('theme', 'light'); //storage2
		lightMode();
	}
}
//Event Listener
toggleSwitch.addEventListener('change', switchTheme); // if the position of switch is changed, this happens

/// storage rest   -- my version
// const currentTheme = localStorage.getItem('theme');
// if (currentTheme === 'dark') {
// 	toggleSwitch.checked = true;
// 	document.documentElement.setAttribute('data-theme', 'dark');
// 	darkMode();
// }
/// storage rest instructor's version
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
	document.documentElement.setAttribute('data-theme', currentTheme);
	if (currentTheme === 'dark') {
		toggleSwitch.checked = true;
		darkMode();
	}
}
