// HTML Elements
const readGpxBtn = document.getElementById("read-gpx-btn");
const rawText = document.getElementById("gpx-raw");
const stats = document.getElementById("stats");

// Variables
const gpxFile = "Strava.gpx";
let gpxText;
let parser;
let trackPointList;
let trackPointObjects = [];
let statList = [];
let stopTime = 10; // Time interval [s] when we consider user stopped.
let stopSpeed = 0.3; // Slowest speed [m/s] considered a movement.
let eleGain = 0;
let eleLoss = 0;


// Event Listeners
readGpxBtn.addEventListener('click', fetchDataFromGpx);


/* Todo list
	- Create a function to generate overall statistics:
		- DONE total distance
		- elevation gain
		- elevation loss
		- steepest gradient
		- average gradient
		- max speed
		- average speed
		- DONE moving time
		- total time
	- Create a function to generate a line chart from elevation data.
	- Create a function to generate a pie chart of time at gradients from elevation and time data.
	- Function to create additional power info: takes weights as input, outputs:
		- estimated avg power
		- max power
		- calories burnt
	- Save JSON to local storage
*/


// General functions
function secondsToMinutesAndSeconds(sec) {
	let result;
	sec = Number(sec);
	let hours = Math.floor(sec / 3600);
	let minutes = Math.floor(sec % 3600 / 60);
	let seconds = Math.floor(sec % 3600 % 60);
	
	if (minutes == 0) {
		minutes = `00`
	} else if (minutes < 10) {
		minutes = `0${minutes}`
	}
	
	if (seconds === 0) {
		seconds = `00`
	} else if (seconds < 10) {
		seconds = `0${seconds}`
	}
	
	result = `${hours}:${minutes}:${seconds}`;
	return result;
}

function metersToKm(m) {
	let km;

	km = (m/1000).toFixed(2);

	return km;
}

console.log(metersToKm(15579.870));

console.log(secondsToMinutesAndSeconds(3300));

// Script body
class TrackPoint {
	constructor(id, lat, lon, ele, time) {
		this.id = id;
		this.lat = lat;
		this.lon = lon;
		this.ele = ele;
		this.time = time;
		this.dist = 0;
		this.speed = 0;
		this.interval = 0;
		this.eleDiff = 0;
	}
	
	distance(lat1, lon1, lat2, lon2) {
		// Haversine formula - 0.3% error expected		
		const R = 6371e3; // metres
		const φ1 = lat1 * Math.PI/180; // φ, λ in radians
		const φ2 = lat2 * Math.PI/180;
		const Δφ = (lat2-lat1) * Math.PI/180;
		const Δλ = (lon2-lon1) * Math.PI/180;

		const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
							Math.cos(φ1) * Math.cos(φ2) *
							Math.sin(Δλ/2) * Math.sin(Δλ/2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		const d = R * c; // in metres

		return d;
	}

	timeToDate(time) {
		let timeTemplate = /[0-9.]{1,}/g;
		let date;

		date = time.match(timeTemplate);
		date = new Date(Date.UTC(date[0], date[1]-1, date[2], date[3], date[4], date[5]));

		return date;
	}
	
	speedBetweenPoints(distance, interval) {
		let speed;

		if (interval != 0) {
			speed = distance / interval;
		} else {
			speed = 0;
		}

		return speed;
	}

	elevationDifference(ele1, ele2) {
		let eleDiff = 0;

		eleDiff = ele2 - ele1;

		return eleDiff;
	}
};

function fetchDataFromGpx() {
	console.log('fetchDataFromGpx function started.')
	const fetchPromise = fetch(gpxFile);

	fetchPromise
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error: ${response.status}`);
			}
			return response.text();
		})
		.then((data) => {
			processGpx(data);
		})
		.then(() => {
			displayAllStats()
		});
}	

function processGpx(content) {
	console.log('processGPX function started.')
	
	let trackPointTemplate = /(<trkpt)((.|\n)*?)(<\/trkpt>)/g;
	trackPointList = content.match(trackPointTemplate); // We divided GPX into individual trackpoints.
	// Now we need to extract data from trackpoints into elements.
	let latTemplate = /(lat=")((.|\n)*?)(")/;
	let lonTemplate = /(lon=")((.|\n)*?)(")/;
	let eleTemplate = /(<ele>)((.|\n)*?)(<\/ele>)/;
	let timeTemplate = /(<time>)((.|\n)*?)(<\/time>)/;
	let previousTrackpoint;

	for ( i=0; i<trackPointList.length; i++ ) {
		let currentTrackpoint = new TrackPoint;
		let currentTrackpointRaw = trackPointList[i];

		currentTrackpoint.id = i;
		currentTrackpoint.lat = currentTrackpointRaw.match(latTemplate)[2];
		currentTrackpoint.lon = currentTrackpointRaw.match(lonTemplate)[2];
		currentTrackpoint.ele = currentTrackpointRaw.match(eleTemplate)[2];
		currentTrackpoint.time = currentTrackpointRaw.match(timeTemplate)[2];
		currentTrackpoint.time = currentTrackpoint.timeToDate(currentTrackpoint.time);

		if (i>0) {
			currentTrackpoint.interval = (currentTrackpoint.time - previousTrackpoint.time)/1000;
		} else {
			currentTrackpoint.interval = 0;
		}

		if (i>0) {
			currentTrackpoint.dist = currentTrackpoint.distance(
			previousTrackpoint.lat, previousTrackpoint.lon, currentTrackpoint.lat, currentTrackpoint.lon).toFixed(3);
		} else {
			currentTrackpoint.dist = 0;
		}

		currentTrackpoint.speed = currentTrackpoint.speedBetweenPoints(
			currentTrackpoint.dist, currentTrackpoint.interval
		).toFixed(3);

		if (i>0) {
			currentTrackpoint.eleDiff = currentTrackpoint.elevationDifference(
				previousTrackpoint.ele, currentTrackpoint.ele).toFixed(2);
		} else {
			currentTrackpoint.eleDiff = 0;
		}

		trackPointObjects.push(currentTrackpoint);
		previousTrackpoint = currentTrackpoint;
	}

	return trackPointObjects;
}

class Statistic {
	constructor(name, value) {
		this.name = name;
		this.value = value;
	}

	calcDist(trackPointObjects) {
		let distance = 0;
		let sum = 0;
		for (i=0; i<trackPointObjects.length; i++) {
			sum = distance;
			distance = sum + Number(trackPointObjects[i].dist);
		}
		distance = distance.toFixed(3);
		console.log(distance);
		return distance;
	}

	calcMovingTime(trackPointObjects) {
		let movingTime = 0;
		let sum = 0;
		for (i=0; i<trackPointObjects.length; i++) {
			sum = movingTime;
			if ((trackPointObjects[i].interval < stopTime) && (trackPointObjects[i].speed > 0.3)) {
				movingTime = sum + Number(trackPointObjects[i].interval);
			} else {
				movingTime = sum;
			}
		}
		console.log(movingTime); // in seconds
		return movingTime;
	}

	calcElevationGain(trackPointObjects) {
		for (i=0; i<trackPointObjects.length; i++) {
			if (trackPointObjects[i].eleDiff >= 0) {
				eleGain = eleGain + Number(trackPointObjects[i].eleDiff);
			} 
		}
		eleGain = Number(eleGain);
		return eleGain.toFixed(0);
	};

	calcElevationLoss(trackPointObjects) {
		for (i=0; i<trackPointObjects.length; i++) {
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
	// rawText.innerHTML = JSON.stringify(trackPointObjects);
	console.log(trackPointObjects);
	calculateStats(trackPointObjects);
	stats.innerHTML = statList;
	// stats.innerHTML;
}




// function extractTrackPoints(stringToProcess, stringStart, stringFinish) {
// 	return stringToProcess.match()
// }

