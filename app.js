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
let trackPointObjects = [];
let statList = [];
let stopTime = 10; // Time interval [s] when we consider user stopped.
let stopSpeed = 0.3; // Slowest speed [m/s] considered a movement.
let eleGain = 0;
let eleLoss = 0;

export { gpxFile, gpxText, parser, trackPointObjects, statList, stopTime, stopSpeed, eleGain, eleLoss, };

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

class Statistic {
	constructor(name, value) {
		this.name = name;
		this.value = value;
	}

	calcDist(trackPointObjects) {
		let distance = 0;
		let sum = 0;
		for ( let i=0; i<trackPointObjects.length; i++ ) {
			sum = distance;
			distance = sum + Number(trackPointObjects[i].dist);
		}
		distance = distance.toFixed(3);
		return distance;
	}

	calcMovingTime(trackPointObjects) {
		let movingTime = 0;
		let sum = 0;
		for ( let i=0; i<trackPointObjects.length; i++ ) {
			sum = movingTime;
			if ((trackPointObjects[i].interval < stopTime) && (trackPointObjects[i].speed > 0.3)) {
				movingTime = sum + Number(trackPointObjects[i].interval);
			} else {
				movingTime = sum;
			}
		}
		return movingTime;
	}

	calcElevationGain(trackPointObjects) {
		for ( let i=0; i<trackPointObjects.length; i++ ) {
			if (trackPointObjects[i].eleDiff >= 0) {
				eleGain = eleGain + Number(trackPointObjects[i].eleDiff);
			} 
		}
		eleGain = Number(eleGain);
		return eleGain.toFixed(0);
	};

	calcElevationLoss(trackPointObjects) {
		for ( let i=0; i<trackPointObjects.length; i++ ) {
			if (trackPointObjects[i].eleDiff < 0) {
				eleLoss = eleLoss + Number(trackPointObjects[i].eleDiff);
			}
		}
		eleLoss = Number(eleLoss);
		return eleLoss.toFixed(0);
	}

	addStat(stat, unit) {
		statList = (`${statList}
			<li>${stat.name}: ${stat.value} ${unit}</li>
		`);
	}
}

function calculateStats(trackPointObjects) {
	console.log('stat calculation begun.')
	// Total distance
		let totalDistance = new Statistic;
		totalDistance.name = 'Distance';
		totalDistance.value = metersToKm(
			totalDistance.calcDist(trackPointObjects));
		totalDistance.addStat(totalDistance, 'km');

	// Moving time
		let movingTime = new Statistic;
		movingTime.name = 'Moving time';
		movingTime.value = secondsToMinutesAndSeconds(
			movingTime.calcMovingTime(trackPointObjects));		
		movingTime.addStat(movingTime, '');

	// Elevation gain
		let elevationGain  = new Statistic;
		elevationGain.name = 'Elevation Gain';
		elevationGain.value = elevationGain.calcElevationGain(trackPointObjects);
		elevationGain.addStat(elevationGain, 'm');

	// Elevation loss
		let elevationLoss  = new Statistic;
		elevationLoss.name = 'Elevation Loss';
		elevationLoss.value = elevationLoss.calcElevationLoss(trackPointObjects);
		elevationLoss.addStat(elevationLoss, 'm');

	console.log('stat calculation ended.')

}

function displayAllStats() {
	console.log(trackPointObjects);
	calculateStats(trackPointObjects);
	statisticsObject.innerHTML = statList;
	gpxProcessingEnd = gpxProcessingTime.endTimer();
	displayPerformance();
}






// Performance section /////////////////////////////


function displayPerformance() {
	// Calculate statistics here
	gpxProcessingTime.name = 'GPX processing time';
	gpxProcessingTime.evaluateTimer(
		gpxProcessingTime, gpxProcessingStart, gpxProcessingEnd);
	console.log(gpxProcessingTime);
	gpxProcessingTime.addStat(gpxProcessingTime, 'ms')
	performanceObject.innerHTML = performanceList;
};
	



// function extractTrackPoints(stringToProcess, stringStart, stringFinish) {
// 	return stringToProcess.match()
// }

