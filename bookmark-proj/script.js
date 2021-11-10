const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const bookmarksContainer = document.getElementById('bookmarks-container');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
let bookmarks = [];
// show modal, focus on 1st input
function showModal() {
	modal.classList.add('show-modal');
	websiteNameEl.focus(); // cursor in 1st line
}

//////// REGEX THINGS regular expressions are patterns used to match character combinations in strings i.e. check if some pattern exists or not this can I guess also be used in form validation and Advent of code I guess
//validate our form
function validate(nameValue, urlValue) {
	const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
	const regex = new RegExp(expression);
	if (!nameValue || !urlValue) {
		alert('please submit valies for both fields');
		return false;
	}
	if (urlValue.match(regex)) {
	}
	if (!urlValue.match(regex)) {
		alert('Please provide a valid web project');
		return false;
	}
	// valid
	return true;
}
//Build Bookmarks DOM
function buildBookmarks() {
	// remove all bookmark elements so bookmarks don;t get stacked one on top of another
	bookmarksContainer.textContent = '';
	//buikd bookamrks
	bookmarks.forEach((bookmark) => {
		const { name, url } = bookmark; // destructring
		// creating the bookmark elements
		// item
		const item = document.createElement('div');
		item.classList.add('item');
		const closeIcon = document.createElement('i');
		closeIcon.classList.add('fas', 'fa-times');
		closeIcon.setAttribute('title', 'Delete Bookmark');
		closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);
		// favicon // lik container
		const linkInfo = document.createElement('div');
		linkInfo.classList.add('name');
		const favicon = document.createElement('img');
		favicon.setAttribute('src', `https://www.google.com/s2/favicons?domain=${url}`); // we get the favicon from website and use it
		favicon.setAttribute('alt', 'Favicon');
		// link
		const link = document.createElement('a');
		link.setAttribute('href', `${url}`);
		link.setAttribute('target', '_blank');
		link.textContent = name;
		/// append to bookmarks container put all things into one to start displayin
		linkInfo.append(favicon, link);
		item.append(closeIcon, linkInfo);
		console.log(bookmarksContainer);
		bookmarksContainer.append(item);
	});
}
// fetch bookmarks from local storage
function fetchBookmarks() {
	//get bookmarks if available from localstorage
	if (localStorage.getItem('bookmarks')) {
		bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	} else {
		//create bookmarks array in localstorage
		bookmarks = [ { name: 'Bipul Github', url: 'https://github.com/bipularyal' } ];
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}
	buildBookmarks();
}
// delete a bookmark
function deleteBookmark(url) {
	bookmarks.forEach((bookmark, i) => {
		if (bookmark.url === url) {
			bookmarks.splice(i, 1); // i is paramenter of index and 1 is no of elements to remove
		}
	});
	// update our bookmarks array in localstorage ... repopulate the DOM
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	fetchBookmarks();
}

function storeBookmark(e) {
	e.preventDefault();
	const nameValue = websiteNameEl.value;
	let urlValue = websiteUrlEl.value;
	if (!urlValue.includes('http://', 'htpps://')) {
		urlValue = `https://${urlValue}`;
	}
	if (!validate(nameValue, urlValue)) {
		return false;
	}
	const bookmark = {
		name: nameValue,
		url: urlValue
	};
	bookmarks.push(bookmark);

	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	fetchBookmarks();
	bookmarkForm.reset();
	websiteNameEl.focus();
}

// modal event listener
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () => {
	modal.classList.remove('show-modal');
});
window.addEventListener('click', (e) => {
	e.target === modal ? modal.classList.remove('show-modal') : false;
}); // e.target holds value of what got clicked
bookmarkForm.addEventListener('submit', storeBookmark);
// on load, fetch bookmarks
fetchBookmarks();
