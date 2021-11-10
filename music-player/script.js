// ///////// MY VERSION
// const image = document.querySelector('img');
// const title = document.querySelector('#title');
// const artist = document.querySelector('#artist');
// const music = document.querySelector('audio');
// const prevBtn = document.getElementById('prev');
// const playBtn = document.getElementById('play');
// const nextBtn = document.getElementById('next');

// // music
// const songs = [
// 	{
// 		name: 'jacinto-1',
// 		displayName: 'Electric Chill Machine',
// 		artist: 'Jacinto'
// 	},
// 	{
// 		name: 'jacinto-2',
// 		displayName: 'Seven Nation Army',
// 		artist: 'Jacinto'
// 	},
// 	{
// 		name: 'jacinto-3',
// 		displayName: 'Goodnight, Disco Queen',
// 		artist: 'Jacinto'
// 	},
// 	{
// 		name: 'Metric-1',
// 		displayName: 'Front Row(Remix)',
// 		artist: 'Metric / Jacinto'
// 	}
// ];

// function changeSong() {
// 	image.setAttribute('src', `./img/${songs[index].name}.jpg`);
// 	music.setAttribute('src', `./music/${songs[index].name}.mp3`);
// 	title.innerText = songs[index].displayName;
// 	artist.innerText = songs[index].artist;
// 	isPlaying ? playSong() : pauseSong;
// }
// // check isPlayi ng
// let isPlaying = false;
// let index = 0;
// /// play
// function playSong() {
// 	isPlaying = true;
// 	playBtn.classList.replace('fa-play', 'fa-pause');
// 	playBtn.setAttribute('title', 'pause');
// 	music.play();
// }
// //pause
// function pauseSong() {
// 	isPlaying = false;
// 	playBtn.classList.replace('fa-pause', 'fa-play');
// 	playBtn.setAttribute('title', 'play');
// 	music.pause();
// }
// playBtn.addEventListener('click', () => {
// 	isPlaying ? pauseSong() : playSong();
// });
// nextBtn.addEventListener('click', () => {
// 	index < songs.length - 1 ? index++ : (index = 0);
// 	changeSong();
// });
// prevBtn.addEventListener('click', () => {
// 	index > 0 ? index-- : (index = songs.length - 1);
// 	changeSong();
// });

const image = document.querySelector('img');
const title = document.querySelector('#title');
const artist = document.querySelector('#artist');
const music = document.querySelector('audio');
const progressContainer = document.querySelector('#progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// music
const songs = [
	{
		name: 'jacinto-1',
		displayName: 'Electric Chill Machine',
		artist: 'Jacinto'
	},
	{
		name: 'jacinto-2',
		displayName: 'Seven Nation Army',
		artist: 'Jacinto'
	},
	{
		name: 'jacinto-3',
		displayName: 'Goodnight, Disco Queen',
		artist: 'Jacinto'
	},
	{
		name: 'Metric-1',
		displayName: 'Front Row(Remix)',
		artist: 'Metric / Jacinto'
	}
];
// check isPlayi ng
let isPlaying = false;
/// play
function playSong() {
	isPlaying = true;
	playBtn.classList.replace('fa-play', 'fa-pause');
	playBtn.setAttribute('title', 'pause');
	music.play();
}
//pause
function pauseSong() {
	isPlaying = false;
	playBtn.classList.replace('fa-pause', 'fa-play');
	playBtn.setAttribute('title', 'play');
	music.pause();
}
playBtn.addEventListener('click', () => {
	isPlaying ? pauseSong() : playSong();
});

// update DOM
function loadSong(song) {
	title.textContent = song.displayName;
	artist.textContent = song.artist;
	music.src = `music/${song.name}.mp3`;
	image.src = `img/${song.name}.jpg`;
}

let songIndex = 0;

function prevSong() {
	songIndex--;
	if (songIndex < 0) {
		songIndex = songs.length - 1;
	}
	loadSong(songs[songIndex]);
	playSong();
}

function nextSong() {
	songIndex++;
	if (songIndex > songs.length - 1) {
		songIndex = 0;
	}
	loadSong(songs[songIndex]);
	playSong();
}

// on load select 1st song
loadSong(songs[songIndex]);
// event listeners
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

function timeChanger(time) {
	// we made this function as this was same for currentTime and duration ... kinda do not repeat principle
	const timeMinutes = Math.floor(time / 60);
	let timeSeconds = Math.floor(time % 60);
	if (timeSeconds < 10) {
		timeSeconds = `0${timeSeconds}`;
	}
	// DElay switching time element to avoid not a number
	if (timeSeconds) {
		return `${timeMinutes}:${timeSeconds}`; // we pass this only once we have a value
	}
	return '0:00';
}
function updateProgressBar(event) {
	if (isPlaying) {
		const { duration, currentTime } = event.srcElement; // duration is total length and currenttime is how long has audio been played
		/// update the progress bar width
		const progressPercent = currentTime / duration * 100;
		progress.style.width = `${progressPercent}%`;
		durationEl.textContent = timeChanger(duration);
		// calculate display for currenttime
		currentTimeEl.textContent = timeChanger(currentTime);
	}
}
function setProgressBar(e) {
	const width = this.clientWidth; // width of progress bar
	const clickedPoint = e.offsetX; // where we clicked to trigger event
	const { duration } = music;
	const newCurrentTime = clickedPoint / width * duration;
	music.currentTime = newCurrentTime;
	currentTimeEl.textContent = timeChanger(newCurrentTime);
}

//////changing progress of music
music.addEventListener('timeupdate', updateProgressBar);
// every time something changes in progress bar, this event listener is fired up
progressContainer.addEventListener('click', setProgressBar);
music.addEventListener('ended', nextSong);
