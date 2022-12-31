import { 
	secondsToMinutesAndSeconds, 
  metersToKm, 
  performanceList,
  PerformanceStat,
  TrackPoint, 
} from './modules/utilities.js';

import { HOME } from './modules/home.js'

// HTML Elements
const readGpxBtn = document.getElementById("upload-btn");
const uploadInput = document.getElementById("upload-input");
const performanceObject = document.getElementById("performance");
const statisticsObject = document.getElementById("stats");

export { readGpxBtn, uploadInput, performanceObject, statisticsObject };

// Variables
let gpxFile = "Strava.gpx";
let gpxText;
let parser;
let statList = [];
let stopTime = 10; // Time interval [s] when we consider user stopped.
let stopSpeed = 0.3; // Slowest speed [m/s] considered a movement.
let eleGain = 0;
let eleLoss = 0;


export { gpxFile, gpxText, parser, statList, stopTime, stopSpeed, eleGain, eleLoss, };

(function init() {
	readGpxBtn.addEventListener('click', HOME.uploadClicked);
	uploadInput.addEventListener('change', HOME.handleFileSelect, false);
}());

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

// Trackpoints section //////////////////////////////



// Statistics section //////////////////////////////








// Performance section /////////////////////////////

function displayPerformance() {
	// Calculate statistics here
};
	



// function extractTrackPoints(stringToProcess, stringStart, stringFinish) {
// 	return stringToProcess.match()
// }

