const resultsNav = document.querySelector('#resultsNav');
const favoritesNav = document.querySelector('#favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');

// NASA API
const count = 10;
const apiKey = 'DEMO_KEY';

const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=10`;
let resultsArray = [];
let favorites = {};
function showContent(page) {
	window.scrollTo({
		top: 0,
		behavior: 'instant'
	});
	loader.classList.add('hidden');
	if (page === 'results') {
		resultsNav.classList.remove('hidden');
		favoritesNav.classList.add('hidden');
	} else {
		resultsNav.classList.add('hidden');
		favoritesNav.classList.remove('hidden');
	}
}
function createDOMNodes(page) {
	const currentArray = page === 'results' ? resultsArray : Object.values(favorites); // we passed obj.values because forEach only works in arrays but favorites is object
	// get 10 images from NASA APi
	currentArray.forEach((result) => {
		// card container
		const card = document.createElement('div');
		card.classList.add('card');
		// link
		const link = document.createElement('a');
		link.href = result.hdurl;
		link.title = 'View Full Image';
		link.target = '_blank';
		// image
		const image = document.createElement('img');
		image.src = result.url;
		image.alt = 'NASA picture of the day';
		image.loading = 'lazy';
		image.classList.add('card-img-top');
		// body
		const cardBody = document.createElement('div');
		cardBody.classList.add('card-body');
		const cardTitle = document.createElement('h5');
		cardTitle.classList.add('card-title');
		cardTitle.textContent = result.title;
		// saev text
		const saveText = document.createElement('p');
		saveText.classList.add('clickable');
		if (page === 'results') {
			saveText.textContent = 'Add To Favorites';
			saveText.setAttribute('onclick', `saveFavorite('${result.url}')`);
		} else {
			saveText.textContent = 'Remove Favorite';
			saveText.setAttribute('onclick', `removeFavorite('${result.url}')`);
		}
		// card text
		const cardText = document.createElement('p');
		cardText.textContent = result.explanation;
		// footer container
		const footer = document.createElement('small');
		footer.classList.add('text-muted');
		// date
		const date = document.createElement('strong');
		date.textContent = result.date;
		// copyright
		const copyRightResult = result.copyright === undefined ? '' : result.copyright;
		const copyright = document.createElement('span');
		copyright.textContent = ` ${copyRightResult}`;

		/// append all stuffs
		footer.append(date, copyright);
		cardBody.append(cardText, saveText, cardText, footer);
		link.append(image);
		card.append(link, cardBody);
		imagesContainer.appendChild(card);
	});
}
function updateDOM(page) {
	// get favorites from local storage
	if (localStorage.getItem('nasaFavorites')) {
		favorites = JSON.parse(localStorage.getItem('nasaFavorites'));
	}
	imagesContainer.textContent = '';
	createDOMNodes(page);
	showContent(page);
}
async function getNasaPictures() {
	// show loader
	loader.classList.remove('hidden');
	try {
		const response = await fetch(apiUrl);
		resultsArray = await response.json();
		updateDOM('results');
	} catch (error) {
		console.log(error);
	}
}
// add result to favorites
function saveFavorite(itemUrl) {
	resultsArray.forEach((item) => {
		if (item.url.includes(itemUrl) && !favorites[itemUrl]) {
			favorites[itemUrl] = item; // url is our key which holds an object with key value pair of all info o image nasaAPI gives us
			// show save confirmation
			saveConfirmed.hidden = false;
			setTimeout(() => {
				saveConfirmed.hidden = true;
			}, 2000);
			// save in local storage
			localStorage.setItem('nasaFavorites', JSON.stringify(favorites));
		}
	});
}
// remove items from favorite
function removeFavorite(itemUrl) {
	if (favorites[itemUrl]) {
		// if we have this url in favorites delete it
		delete favorites[itemUrl];
		localStorage.setItem('nasaFavorites', JSON.stringify(favorites));
		updateDOM('favorites');
	}
}
// on load
getNasaPictures();
