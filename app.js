
// HTML Elements
const DOM = {
	readGpxBtn: document.getElementById("upload-btn"),
	uploadInput: document.getElementById("upload-input"),
	performanceObject: document.getElementById("performance"),
	statisticsObject: document.getElementById("stats"),
	uploadText: document.getElementById("upload-text"),
	uploadUndertext: document.getElementById("upload-undertext"),
	uploadError: document.getElementById("upload-error"),
	uploadErrorHint: document.getElementById("upload-error-hint"),
	file_1: document.getElementById("file-1"),
	file_2: document.getElementById("file-2"),
	file_3: document.getElementById("file-3"),	
};
console.log(DOM);

export { DOM };

// Variables
let gpxFile = "";
let gpxText;
let parser;
let statList = [];
let stopTime = 10; // Time interval [s] when we consider user stopped.
let stopSpeed = 0.3; // Slowest speed [m/s] considered a movement.
let eleGain = 0;
let eleLoss = 0;
let isUploadValid = false;

export { gpxFile, gpxText, parser, statList, stopTime, stopSpeed, eleGain, eleLoss, };

import { UTIL } from './modules/utilities.js';
import { HOME } from './modules/home.js'

/* Todo list
	- Create a function to generate overall statistics:
		- DONE total distance
		- DONE elevation gain
		- DONE elevation loss
		- steepest gradient
		- average gradient
		- max speed
		- average speed
		- DONE moving time
		- total time
	- Display an information to the user when file upload was cancelled.
	- Display an information to the user uploaded file had a wrong extension.
	- Check if GPX file is really of an XML / GPX format.
	- Check if GPX doesn't exceed 5MB limit.
	- If GPX is too big, remove every 2nd point until it's ok.
	- Create a function to generate a line chart from elevation data.
	- Create a function to generate a pie chart of time at gradients from elevation and time data.
	- Function to create additional power info: takes weights as input, outputs:
		- estimated avg power
		- max power
		- calories burnt
	- Save JSON to local storage
	- Add a progress bar.
	- Add a comparison functionality.
*/

/* Known bugs

*/
UTIL.StateManager.getStateManager(); // Initialization.
UTIL.StateManager.storeDom( 'home_baseState', DOM );
HOME.init();
console.log(UTIL.storedStates);
UTIL.StateManager.createNewState( 
	'home_uploadError', 
	[ DOM.uploadError, DOM.uploadErrorHint ], 
	[ 'visibility: visible', 'visibility: hidden' ],
	[ '', '' ],
);
UTIL.StateManager.createNewState( 
	'home_uploadErrorHint', 
	[ DOM.readGpxBtn, DOM.uploadError, DOM.uploadErrorHint, DOM.file_1, DOM.file_2, DOM.file_3, ], 
	[ 'background-color: var(--grey-40)', 'visibility: hidden', 'visibility: visible', 'background-color: var(--green-70)', 'background-color: var(--green-70)', 'background-color: var(--green-70)' ],
	[ '', '', '', '', '', '' ],
);
console.log(UTIL.storedStates);

const validateUpload = () => {
	return new Promise((resolve, reject) => {

		DOM.uploadInput.addEventListener('change', validateUpload, false);

		function validateUpload(event) {

			console.log('Upload is being validated.');
			const inputFile = event.target.files[0].name;
			const extension = inputFile.split('.')[1];

			if (extension != 'gpx') {
				isUploadValid = false;
				UTIL.StateManager.setState('home_uploadError');

				setTimeout(() => {					
					UTIL.StateManager.setState('home_uploadErrorHint');
				}, 1600);

				reject( Error('This tool accepts only .gpx files.') );
			} else {
				isUploadValid = true;
				resolve('File is valid.');
			}
		}
	}, isUploadValid)
}

validateUpload()
	.then (() => {

	})
	.then (() => {
		console.log(isUploadValid);
		// console.log(Boolean(validUpload));
		// isUploadValid = true;
		// if ((isUploadValid === true) || (HOME.exampleClicked === true)) {
		// 	console.log('valid input');
		// 	// HOME.processGpx();
		// 	// switchScreen(infoScreen);
		// }
		
	})

/*
// create a stateManager utility, store homeBaseState properties (mostly none).

if we get a valid upload, or one of the examples was clicked,
	 process data and switch to INFO screen.
else if undertext is clicked, change state to selectExample.
else if we get an invalid input extension, change state to errorInvalid.
else if upload was cancelled, change state to errorCancelled.

handleSwitch: change state to infoBaseState.
if weightInfo was filled, process data and change state to infoWeightSubmitted (?).
if anotherFile button was clicked, use stateManager to restore all variables to default
	and switch to HOME screen.

*/







function displayPerformance() {
	// Calculate statistics here
};