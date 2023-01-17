import "../node_modules/leaflet/dist/leaflet.js";
import "../node_modules/leaflet/dist/leaflet.css";
import "../node_modules/chartist/dist/index.js";
import "../node_modules/chartist/dist/index.css";
import "./styles.css";
import './images/Background-mobile-small.jpg';
import './images/favicon.ico';
import './images/mapicon.svg';

import { HOME } from './modules/home.js';
import { INFO } from './modules/info.js';
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
const DOMtoStateManage = [ DOM.home, DOM.info, DOM.uploadError, DOM.homeUpload, DOM.homeExamples, DOM.footer ];

const APP = (function () {
	// Variables
	const stopTime = 240; // Time interval [s] when we consider user stopped.
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
	let clickedEvent;

	UTIL.StateManager.getStateManager(); // Initialization.
	
	UTIL.StateManager.storeDom( 'home_baseState', DOMtoStateManage );
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

			// [ DOM.readGpxBtn, DOM.uploadText ].forEach(function (element) {
			// 	element.addEventListener('click', HOME.uploadClicked);
			// }, { capture: true });		

			// // This function adds href links to the example buttons:
			(function() {
				DOM.file_1.setAttribute("href", zipFile_1);
				DOM.file_2.setAttribute("href", zipFile_2);
				DOM.file_3.setAttribute("href", zipFile_3);				
			})();			
	}
		
	const validateUpload = () => {
		return new Promise((resolve, reject) => {

			DOM.uploadInput.addEventListener('change', checkUpload, false);
			// DOM.file_1.addEventListener('click', loadFile, false);
			// DOM.file_2.addEventListener('click', loadFile, false);
			// DOM.file_3.addEventListener('click', loadFile, false);
			UTIL.ClickManager.listenTo( `examples__tile-1`, loadFile );
			UTIL.ClickManager.listenTo( `examples__tile-2`, loadFile );
			UTIL.ClickManager.listenTo( `examples__tile-3`, loadFile );


			function checkUpload(event) {

				console.log('Upload is being validated.');
				
				gpxFile = event.target.files[0];

				const extension = gpxFile.name.split('.')[1];
				
				if (extension != 'gpx') {

					// On wrong extension do that:
					isUploadValid = false;
					UTIL.StateManager.setState('home_uploadError');

					setTimeout(() => {
						UTIL.StateManager.setState('home_baseState');
					}, 3000);

					reject( Error('This tool accepts only .gpx files.' ));

				} else {
					isUploadValid = true;
					console.log('File is valid.');
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
				event.preventDefault();
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

	init();

	validateUpload(clickedEvent)
		.then (() => {
			HOME.processGpx(gpxFileContent, gpxFileSize);
			INFO.initMap()
			localStorage.clear();
			// And optionally, display a loading screen in the meantime.
		})
		.then (() => {
			INFO.createPolyline(HOME.trackPointObjects);
			stats = INFO.calculateStats(HOME.trackPointObjects, gpxFileSize );
			UTIL.StateManager.setState('info_baseState');
		})
		.then(() => {
			INFO.setupMap();
		})
		.then(() => {
			INFO.addMapTiles();
			INFO.displayAllStats(stats);
			console.log('displaying charts')
			INFO.prepareElevationGraph( HOME.trackPointObjects, 30 );
			INFO.prepareSpeedGraph( HOME.trackPointObjects, 30 );
			INFO.prepareGradientsGraph( HOME.trackPointObjects);
		})
		.then(() => {
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

	return { 
		gpxFile, 
		gpxText, 
		parser, 
		stopTime, 
		stopSpeed, 
		maxFileSize, 
		gpxFileSize, 
		numberSmoothing, 
		gradientBoundaries 
	};
})();

export { DOM, APP };