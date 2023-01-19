import "../node_modules/leaflet/dist/leaflet.js";
import "../node_modules/leaflet/dist/leaflet.css";
import "../node_modules/chartist/dist/index.js";
import "../node_modules/chartist/dist/index.css";
import { gsap } from "../node_modules/gsap/dist/gsap";
import "./styles.css";
import './images/Background-mobile-small.jpg';
import './images/favicon.ico';
import './images/mapicon.svg';

import { INFO } from './modules/info.js';
import { HOME } from './modules/home.js';
import { UTIL } from './modules/utilities.js';
import { getZip } from './modules/zipreader.js';
import zipFile_1 from './gpx_examples/short-optimized.zip';
import zipFile_2 from './gpx_examples/medium-optimized.zip';
import zipFile_3 from './gpx_examples/long-optimized.zip';


const DOM = {
	// These elements will be modified by state manager and can't have event listeners on them:
	home: document.getElementsByClassName("home")[0],
	info: document.getElementsByClassName("info")[0],
	uploadError: document.getElementsByClassName("upload__error")[0],
	homeUpload: document.getElementsByClassName("home__upload")[0],
	homeExamples: document.getElementsByClassName("home__examples")[0],
	footer: document.getElementsByClassName("footer")[0],

	//These elements will not be modified:
	readGpxBtn: document.getElementsByClassName("upload__button")[0],
	uploadInput: document.getElementsByClassName("upload__input")[0],
	statisticsObject: document.getElementsByClassName("stats")[0],
	uploadText: document.getElementsByClassName("upload__text")[0],
	uploadUndertext: document.getElementsByClassName("upload__undertext")[0],
	file_1: document.getElementsByClassName("examples__tile-1")[0],
	file_2: document.getElementsByClassName("examples__tile-2")[0],
	file_3: document.getElementsByClassName("examples__tile-3")[0],
	loadGroup: document.getElementsByClassName("load__group")[0],
	statsTable: document.getElementsByClassName("stats__table")[0],
};

const APP = (function () {
	// Variables
	const stopTime = 60; // Time interval [s] when we consider user stopped.
	const stopSpeed = 0.1; // Slowest speed [m/s] considered a movement.
	const numberSmoothing = 3;
	const maxFileSize = 1e6;
	const gradientBoundaries = [ -3, 1.5, 6 ];
	let gpxFile;
	let gpxFileContent;
	let gpxFileSize;
	let gpxText;
	let parser;
	let isUploadValid = false;
	let stats;
	let powerStats;
	let clickedEvent;
	let trackPointObjects = [];
	let userWeight = 70;
	let bikeWeight = 12;

	UTIL.StateManager.getStateManager(); // Initialization.
	
	UTIL.StateManager.storeDom( 'home_baseState', DOM );
	HOME.createStates();
	console.log(UTIL.storedStates);

	//Here we prevent unwanted behaviour before loading the DOM:
	document.addEventListener("DOMContentLoaded", () => {
		console.log('DOM loaded.');
		DOM.home.classList.remove("no-click");
	});

	const init = () => {
			
		UTIL.ClickManager.listenTo( `upload__button`, HOME.uploadClicked );
		UTIL.ClickManager.listenTo( `upload__text`, HOME.uploadClicked );
		UTIL.ClickManager.listenTo( `upload__text`, HOME.uploadClicked );
		UTIL.ClickManager.listenTo( `examples__tile-1`, runCheck );
		UTIL.ClickManager.listenTo( `examples__tile-2`, runCheck );
		UTIL.ClickManager.listenTo( `examples__tile-3`, runCheck );
		UTIL.ClickManager.listenTo( `load__text`, INFO.backToHome );
		UTIL.ClickManager.listenTo( `load__button`, INFO.backToHome );
		UTIL.ClickManager.listenTo( `info__load-panel`, INFO.backToHome );
		UTIL.ClickManager.listenTo( `power__weight-submit`, INFO.submitWeight );

		// If the user has submitted weights, we get them here:
		(function() {
			let weightJSON = localStorage.getItem('weightData');

			if (weightJSON === null) {
				document.getElementsByClassName("power__your-weight-input")[0].setAttribute("value", userWeight);
				document.getElementsByClassName("power__bike-weight-input")[0].setAttribute("value", bikeWeight);
				console.log('Weight values were set to default.');
			} else {
				let weightData = JSON.parse(weightJSON);
				let userWeight = weightData[0].userWeight;
				let bikeWeight = weightData[1].bikeWeight;

				document.getElementsByClassName("power__your-weight-input")[0].setAttribute("value", userWeight);
				document.getElementsByClassName("power__bike-weight-input")[0].setAttribute("value", bikeWeight);
				console.log('Weight values were set from localStorage.');
			}			
		})();			

	}
	
	const validateUpload = (clickedEvent) => {
		let currentEvent = clickedEvent;
		return new Promise((resolve, reject) => {

			// This function adds href links to the example buttons. 
			// We do it here to prevent default behaviour before page load:
			(function() {
				document.getElementsByClassName("examples__tile-1")[0].setAttribute("href", zipFile_1);
				document.getElementsByClassName("examples__tile-2")[0].setAttribute("href", zipFile_2);
				document.getElementsByClassName("examples__tile-3")[0].setAttribute("href", zipFile_3);				
			})();

			document.getElementsByClassName("upload__input")[0].addEventListener('change', checkUpload, false);

			if ((currentEvent.target.classList[1]) === `example-tile`) { loadFile(currentEvent) };

			function checkUpload(event) {

				console.log('Upload is being validated.');
				gpxFile = event.target.files[0];
				const extension = gpxFile.name.split('.')[1];
				
				if (extension != 'gpx') {

					// On wrong extension do that:
					isUploadValid = false;
					UTIL.StateManager.setState('home_uploadError');
					document.getElementsByClassName("upload__error")[0].innerHTML = 
							`Your file was not a .gpx.`;


					reject( Error('This tool accepts only .gpx files.' ));

				} else {
					isUploadValid = true;
					console.log('File is valid.');
					homeLeaveAnimation();
					const reader = new FileReader();
					gpxFileSize = gpxFile.size;

					if (gpxFile) {
						reader.readAsText(gpxFile);
					}

					reader.addEventListener("load", () => {
						// this will then display a text file
						// console.log(reader.result);
						gpxFileContent = reader.result;						
						resolve( 'File is valid.' );
					}, false);
				}
			}

			async function loadFile(event) {
				// event.preventDefault();
				homeLeaveAnimation();
				gpxFile = (event.target.href);
				const response = await fetch(event.target.href);
				const zippedBlob = await response.blob();
				const unzippedBlob = await getZip(zippedBlob);
				gpxFileContent = unzippedBlob.unzippedText;
				gpxFileSize = unzippedBlob.fileSize;

				resolve( 'File is valid.' );
			}

		}, isUploadValid)
	}

	function pageLoadAnimation() {
		gsap.from( '.header', { duration: .8, x: '150%', ease: 'power4.out' });
		gsap.from( '.home', { duration: .8, x: '-150%', ease: 'power4.out' });
		gsap.from( '.home > * > * ', { duration: .4, opacity: 0, ease: 'none', delay: .2, stagger: .05 });
		$(window).trigger('resize');
	}

	function homeLeaveAnimation() {
		gsap.to( '.home', { duration: .8, x: '600%', ease: 'power4.out', delay: .4 });
		gsap.to( '.home > * > * ', { duration: .6, opacity: 0, ease: 'none', delay: -0.2, stagger: .05, });
		$(window).trigger('resize');
	}

	function infoLoadAnimation() {
		gsap.from( '.info__load-panel', { duration: .8, x: '150%', ease: 'power4.out' });
		// gsap.from( '.info__stats-panel', { duration: .8, x: '-150%', ease: 'power4.out' });
		// gsap.to( 'table > * > * ', { duration: 2, opacity: 0, ease: 'none', delay: 2, stagger: .5, color: 'red' });
		$(window).trigger('resize');
	}

	init();
	pageLoadAnimation();
	// testAnimation();

	function runCheck(clickedEvent) {
		clickedEvent.preventDefault();
		trackPointObjects = [];
		
		validateUpload(clickedEvent)
		.then (() => {			
			// homeLeaveAnimation();			
			trackPointObjects = HOME.processGpx( gpxFileContent, gpxFileSize );
			
			// And optionally, display a loading screen in the meantime.
		})
		.then (() => {
			try {
				INFO.initMap();
			} catch {
				console.log('The map was already initialized.')
			} finally {
				INFO.createPolyline( trackPointObjects );
				stats = INFO.calculateStats( trackPointObjects, gpxFileSize );
				UTIL.StateManager.setState('info_baseState');
				infoLoadAnimation();
			}
		})
		.then(() => {
			INFO.submitWeight();
			INFO.setupMap();
			powerStats = INFO.calculatePowerStats();
		})
		.then(() => {
			INFO.addMapTiles();
			INFO.displayAllStats( stats, powerStats );
			INFO.prepareElevationGraph( trackPointObjects, 30 );
			INFO.prepareSpeedGraph( trackPointObjects, 30 );
			INFO.prepareGradientsGraph( trackPointObjects );
		})
		.then(() => {
			INFO.moveLabels();
			return;
		})
	}

	/*
	create a stateManager utility, store homeBaseState properties (mostly none).

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

	return { 
		gpxFile, 
		gpxText, 
		parser, 
		stopTime, 
		stopSpeed, 
		maxFileSize, 
		gpxFileSize, 
		numberSmoothing, 
		gradientBoundaries,
		userWeight,
		bikeWeight,
		validateUpload,
		runCheck,
		init,
	};
})();

export { DOM, APP };