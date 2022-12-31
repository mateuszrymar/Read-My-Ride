import { 
	secondsToMinutesAndSeconds, 
  metersToKm, 
  performanceList,
  PerformanceStat,
  TrackPoint, 
} from './utilities.js';

import { uploadInput } from '../app.js';
import { gpxFile, gpxText, parser, statList, stopTime, stopSpeed, eleGain, eleLoss, } from '../app.js';

let trackPointList;
let trackPointObjects = [];


let gpxProcessingTime = new PerformanceStat;
let gpxProcessingStart;
let gpxProcessingEnd;

const HOME = (function () {

	function uploadClicked(){
		uploadInput.click();
	}	

	function processDataFromUpload(data) {
		console.log('processDataFromUpload function started.')
		const processPromise = Promise.resolve(processGpx(data));
	
		processPromise
			.then(() => {
        localStorage.clear();
        console.log('local storage cleared');
      })
			.then(() => {
				let dataToSave = JSON.stringify(trackPointObjects);
				localStorage.setItem('currentGpx', dataToSave);
			})				
			.then(() => {
        calculateGpxProcessingTime();
        console.log(gpxProcessingTime, 'ms');
        gpxProcessingTime.addStat(gpxProcessingTime, 'ms')
        // performanceObject.innerHTML = performanceList;
			})
	}	
	
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

	function handleFileSelect(event) {
		console.log('handleFileSelect');
		const inputFile = event.target.files[0].name;
		const extension = inputFile.split('.')[1];
		if (extension != 'gpx') {
			console.log('This tool accepts only .gpx files.');
			return;
		}
    trackPointObjects = [];	
		const reader = new FileReader();
		reader.onload = handleFileLoad;
		reader.readAsText(event.target.files[0]);
	}
	
	function handleFileLoad(event) {
		processDataFromUpload(event.target.result);
	}	

	function processGpx(content) {
		console.log('processGPX function started.');
		gpxProcessingStart = gpxProcessingTime.startTimer();
		
		let trackPointTemplate = /(<trkpt)((.|\n)*?)(<\/trkpt>)/g;
		trackPointList = content.match(trackPointTemplate); // We divided GPX into individual trackpoints.
		// Now we need to extract data from trackpoints into elements.
		let latTemplate = /(lat=")((.|\n)*?)(")/;
		let lonTemplate = /(lon=")((.|\n)*?)(")/;
		let eleTemplate = /(<ele>)((.|\n)*?)(<\/ele>)/;
		let timeTemplate = /(<time>)((.|\n)*?)(<\/time>)/;
		let previousTrackpoint;
	
		for ( let i=0; i<trackPointList.length; i++ ) {
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
    
    gpxProcessingEnd = gpxProcessingTime.endTimer();
    console.log('processGPX function ended.');
		return trackPointObjects;
	}

  function calculateGpxProcessingTime() {
    gpxProcessingTime.name = 'GPX processing time';
    gpxProcessingTime.evaluateTimer(
      gpxProcessingTime, gpxProcessingStart, gpxProcessingEnd);
  };


  return {
    uploadClicked,
    processDataFromUpload,
    fetchDataFromGpx,
    handleFileSelect,
    handleFileLoad,
    processGpx,
    calculateGpxProcessingTime,
    gpxProcessingTime,
  }	
})();

export { HOME };