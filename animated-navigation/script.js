const menuBars = document.getElementById('menu-bars');
const overlay = document.getElementById('overlay');
const nav1 = document.getElementById('nav-1');
const nav2 = document.getElementById('nav-2');
const nav3 = document.getElementById('nav-3');
const nav4 = document.getElementById('nav-4');
const nav5 = document.getElementById('nav-5');
const navItems = [ nav1, nav2, nav3, nav4, nav5 ];

// Control Navigation Animation
function navAnimation(directionRemoved, directionAdded) {
	navItems.forEach((nav, i) => {
		nav.classList.replace(`slide-${directionRemoved}-${i + 1}`, `slide-${directionAdded}-${i + 1}`);
	});
}

function toggleNav() {
	menuBars.classList.toggle('change');
	overlay.classList.toggle('overlay-active');
	if (overlay.classList.contains('overlay-active')) {
		overlay.classList.replace('overlay-slide-left', 'overlay-slide-right');

		navAnimation('out', 'in'); // direction we want to remove and direction we want to add are passed
	} else {
		overlay.classList.replace('overlay-slide-right', 'overlay-slide-left');
		navAnimation('in', 'out'); // direction we want to remove and direction we want to add are passed
	}
}

// Event Listeners
menuBars.addEventListener('click', toggleNav);
for (const nav of navItems) {
	nav.addEventListener('click', toggleNav);
}

////////////////// TRY 1 -- many repetitive codes here

// const menuBars = document.getElementById('menu-bars');
// const overlay = document.getElementById('overlay');
// const nav1 = document.getElementById('nav-1');
// const nav2 = document.getElementById('nav-2');
// const nav3 = document.getElementById('nav-3');
// const nav4 = document.getElementById('nav-4');
// const nav5 = document.getElementById('nav-5');

// //toggle navigation function
// function toggleNav() {
// 	//Toggle : menu bars the breadcrumbs opened or closed
// 	menuBars.classList.toggle('change'); // change class contains css to make the breadcrumbs like cross
// 	// toggling menu active or not
// 	overlay.classList.toggle('overlay-active'); // we use this empty class to just check if something like this exists or not and if it does , we do something
// 	if (overlay.classList.contains('overlay-active')) {
// 		// what we do if the class is present
// 		// animate in overlay
// 		overlay.classList.add('overlay-slide-right');
// 		overlay.classList.remove('overlay-slide-left');

// 		// Amimate in  - NAV items
// 		nav1.classList.remove('slide-out-1');
// 		nav1.classList.add('slide-in-1');
// 		nav2.classList.remove('slide-out-2');
// 		nav2.classList.add('slide-in-2');
// 		nav3.classList.remove('slide-out-3');
// 		nav3.classList.add('slide-in-3');
// 		nav4.classList.remove('slide-out-4');
// 		nav4.classList.add('slide-in-4');
// 		nav5.classList.remove('slide-out-5');
// 		nav5.classList.add('slide-in-5');
// 	} else {
// 		// animate out of overlay if class is absent
// 		overlay.classList.add('overlay-slide-left');
// 		overlay.classList.remove('overlay-slide-right');

// 		/// animate out NAV items
// 		nav1.classList.remove('slide-in-1');
// 		nav1.classList.add('slide-out-1');
// 		nav2.classList.remove('slide-in-2');
// 		nav2.classList.add('slide-out-2');
// 		nav3.classList.remove('slide-in-3');
// 		nav3.classList.add('slide-out-3');
// 		nav4.classList.remove('slide-in-4');
// 		nav4.classList.add('slide-out-4');
// 		nav5.classList.remove('slide-in-5');
// 		nav5.classList.add('slide-out-5');
// 	}
// }

// // Event Listeners
// menuBars.addEventListener('click', toggleNav);
// nav1.addEventListener('click', toggleNav);
// nav2.addEventListener('click', toggleNav);
// nav3.addEventListener('click', toggleNav);
// nav4.addEventListener('click', toggleNav);
// nav5.addEventListener('click', toggleNav);
