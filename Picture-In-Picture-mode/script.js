// select videoElement and button
const videoElement = document.getElementById('video');
const button = document.getElementById('button');
//write async function us try catch to prompt user to select a media stream, pass the video element then, play that video
async function selectMediaStream() {
	try {
		const mediaStream = await navigator.mediaDevices.getDisplayMedia(); // we use this api call to capture our live screen in real time
		console.log(mediaStream);
		// adding this mediaStream to our video ...
		videoElement.srcObject = mediaStream; //passing our mediaStream (source of hat to play) into video so we see what is being captured
		videoElement.onloadedmetadata = () => {
			// after the metadata is loaded, we play the video ... this function is for that
			videoElement.play();
		};
	} catch (error) {
		console.log('There appears to be an error');
	}
}

button.addEventListener('click', async () => {
	//disable the buton once we click it
	button.disabled = true;
	//start picture in picture
	await videoElement.requestPictureInPicture();
	//reset the button after successfully requesting picture in picture mode
	button.disabled = false;
});

//on load of our website
selectMediaStream();
