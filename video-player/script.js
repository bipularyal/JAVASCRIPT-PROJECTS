////// add a form like thing at the top where I can add multiple videos and make a library or such and videos will play from that library ... it should store all that values locally ... there can be many libraries like one for JS course one for speech and I can choose any of those and start the videos there .. and next thing I want is storing which video I am in currently so when I select a library videos automatically plays rom that point and also a timer that is maybe every 30 seconds I play, change the timer from localstorage and autoplay the video fromthat point onwards .. also a next video // previous video button would be a good addition
// when current playlist is ended, it should go to new video
const player = document.querySelector('.player');
const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');
const speed = document.querySelector('.player-speed');
// Play & Pause ----------------------------------- //
function showPlayIcon() {
	playBtn.classList.replace('fa-pause', 'fa-play');
	playBtn.setAttribute('title', 'Play');
}

function togglePlay() {
	if (video.paused) {
		video.play();
		playBtn.classList.replace('fa-play', 'fa-pause');
		playBtn.setAttribute('title', 'Pause');
	} else {
		video.pause();
		showPlayIcon();
	}
}
// on video end show play icon
video.addEventListener('ended', showPlayIcon);

// Progress Bar ---------------------------------- //
// calculate display time format
function displayTime(time) {
	const minutes = Math.floor(time / 60);
	let seconds = Math.round(time % 60);
	seconds = seconds > 9 ? seconds : `0${seconds}`;
	return `${minutes}:${seconds}`;
}
// update progress bar as video plays
function updateProgress() {
	progressBar.style.width = `${video.currentTime / video.duration * 100}%`;
	currentTime.textContent = `${displayTime(video.currentTime)} /`;
	duration.textContent = `${displayTime(video.duration)}`;
}
// click to seek within the video
function setProgress(e) {
	const newTime = e.offsetX / progressRange.offsetWidth; // divide where we clicked by total width of the progress bar
	progressBar.style.width = `${newTime * 100}%`;
	video.currentTime = newTime * video.duration;
}
// Volume Controls --------------------------- //
let lastVolume = 1;
// changing volume icons
function volumeIconChanger(volume) {
	if (volume > 0.7) {
		volumeIcon.classList.add('fas', 'fa-volume-up');
	} else if (volume < 0.7 && volume > 0) {
		volumeIcon.classList.add('fas', 'fa-volume-down');
	} else if (volume == 0) {
		volumeIcon.classList.add('fas', 'fa-volume-off');
	}
}
// volume bar
function changeVolume(e) {
	let volume = e.offsetX / volumeRange.offsetWidth;
	// rounding volume up or down
	if (volume < 0.07) {
		volume = 0;
	}
	if (volume > 0.93) {
		volume = 1;
	}
	volumeBar.style.width = `${volume * 100}%`;
	video.volume = volume;
	// change icons depending on volume
	volumeIcon.className = '';
	volumeIconChanger(volume);

	lastVolume = volume;
}
// mute or unmute
function toggleMute() {
	volumeIcon.className = '';
	if (video.volume) {
		lastVolume = video.volume;
		video.volume = 0;
		volumeBar.style.width = 0;
		volumeIcon.classList.add('fas', 'fa-volume-mute');
		volumeIcon.setAttribute('title', 'Unmute');
	} else {
		video.volume = lastVolume;
		volumeBar.style.width = `${lastVolume * 100}%`;
		volumeIconChanger(video.volume);
		volumeIcon.setAttribute('title', 'Mute');
	}
}
// Change Playback Speed -------------------- //
function changeSpeed() {
	video.playbackRate = speed.value;
}
// Fullscreen ------------------------------- //
let fullscreen = false;
// ull Screen stuf copied rom w3school
function openFullscreen(elem) {
	if (elem.requestFullscreen) {
		elem.requestFullscreen();
	} else if (elem.webkitRequestFullscreen) {
		/* Safari */
		elem.webkitRequestFullscreen();
	} else if (elem.msRequestFullscreen) {
		/* IE11 */
		elem.msRequestFullscreen();
	}
	video.classList.add('video-fullscreen');
}

/* Close fullscreen */
function closeFullscreen() {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.webkitExitFullscreen) {
		/* Safari */
		document.webkitExitFullscreen();
	} else if (document.msExitFullscreen) {
		/* IE11 */
		document.msExitFullscreen();
	}
	video.classList.remove('video-fullscreen');
}

//toggle full screen
function toggleFullscreen() {
	if (!fullscreen) {
		openFullscreen(player);
	} else {
		closeFullscreen();
	}
	fullscreen = !fullscreen;
}

// event listeners
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
window.addEventListener('keydown', (e) => {
	if (e.key === ' ') togglePlay();
	// this one to check for full screen
	if (e.key == 'f') toggleFullscreen();
});
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change', changeSpeed);
fullscreenBtn.addEventListener('click', toggleFullscreen);
document.addEventListener('keydown', (e) => {
	if (e.key == 'Escape' && fullscreen) {
		closeFullscreen();
		fullscreen = !fullscreen;
	}
});
