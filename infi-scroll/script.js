//unsplash API
const imageContainer = document.getElementById('image-container');
const count = 17;
let photoArray = [];
const apiKey = 'yF4Ma4uaqHKCjlfiQsigHC6hEZU0ABLvzm33JNniFDc';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

let ready = false; // so we only load images once not 100 times
let imagesLoaded = 0;
let totalImages = 0; //for similar purposes

//check image is loaded
function imageLoaded() {
	imagesLoaded++;
	if (imagesLoaded === totalImages) {
		loader.hidden = true; // we hide the loader once images load for first time ,we don;t do this other times but we can
		ready = true;
	}
}

//attribute setter helper class
function attributeSetter(element, attributes) {
	// element on which attribute is to be set and the key-value pairs of attributes are sent
	for (const key in attributes) {
		// we pass attributes as object's key-value pairs
		element.setAttribute(key, attributes[key]);
	}
}
//create elements for links and photos to display photos
function displayPhoto() {
	totalImages = photoArray.length;
	imagesLoaded = 0;
	for (const photo of photoArray) {
		//creating our a tag
		const aTag = document.createElement('a');

		// aTag.setAttribute('href', photo.links.html);
		// aTag.setAttribute('target', '_blank');
		attributeSetter(aTag, {
			href: photo.links.html,
			target: '_blank'
		});
		//creating our img
		const img = document.createElement('img');
		// img.setAttribute('src', photo.urls.regular);
		// img.setAttribute('alt', photo.alt_description);
		// img.setAttribute('title', photo.alt_description); //what shows on hover

		attributeSetter(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description
		});
		// Event listener to check if items have finished loading
		img.addEventListener('load', imageLoaded);

		//displaying it
		aTag.appendChild(img);
		imageContainer.appendChild(aTag);
	}
}
//getPhotos from unsplash
async function getPhotos() {
	try {
		const response = await fetch(apiUrl); //requesting for
		photoArray = await response.json();
		displayPhoto();
	} catch (err) {
		//catch error here
	}
}
//on Load
getPhotos();

// check to see if scrolling near bottom of page

window.addEventListener('scroll', () => {
	if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
		ready = false; // once we load elements ready is false
		getPhotos();
		// height of visible area + how much we scrolled from top - total height of document - 1000 so we call functiol little early// if all images have not completed loading, don't load again
	}
});
