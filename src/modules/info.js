import { DOM, APP } from '../index.js';
import { UTIL } from './utilities.js';
import { HOME } from './home.js';
import { LineChart, PieChart } from '../../node_modules/chartist/dist/index.cjs';

const INFO = (function () {
  let statList = [];
  let powerStatList = [];
  let eleGain = 0;
  let eleLoss = 0;
  let gpxPolyline;
  let polylineGroup;
  let map;
  let rideDistance;
  let maxSpd;
  let avgSpd;
  let avgGrad;
  let moveTime
  let userWeight;
  let bikeWeight;
  let avgPower;
  let kCalBurnt;
  let infoToHomeTransition = .6; //[s]


  function initMap() {
    map = L.map('map').setView([51.919437, 51.919437], 13);
    polylineGroup = L.featureGroup().addTo(map);
  }

  function setupMap() {
    map.invalidateSize();
    map.fitBounds(gpxPolyline.getBounds());
  }

  function createPolyline(trackPointObjects) {
    let latLngArray = [];

    polylineGroup.clearLayers();
    for ( let i=0; i<trackPointObjects.length; i++ ) {
      let currentTrackpoint = []

      currentTrackpoint.push(parseFloat(trackPointObjects[i].lat));
      currentTrackpoint.push(parseFloat(trackPointObjects[i].lon));

      latLngArray.push(currentTrackpoint);
    }

    gpxPolyline =  L.polyline(latLngArray, {color: 'var(--orange-70)'}).addTo(polylineGroup);

    return gpxPolyline;
  }

  function addMapTiles() {
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
  }

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

    calcMovingTime( trackPointObjects, gpxFileSize) {
      let movingTime = 0;
      let sum = 0;
      let numberOfOptimizations = Math.max(HOME.checkFileSize(gpxFileSize), 0);      
      
      for ( let i=0; i<trackPointObjects.length; i++ ) {
        sum = movingTime;           
        
        if ((trackPointObjects[i].interval < (APP.stopTime * Math.pow(2, numberOfOptimizations))) && (trackPointObjects[i].speed > APP.stopSpeed)) {
          movingTime = sum + Number(trackPointObjects[i].interval);
        } else {
          movingTime = sum;
        }
      }
      return movingTime;
    }

    calcElevationGain(trackPointObjects) {
      let eleGain = 0;

      for ( let i=0; i<trackPointObjects.length; i++ ) {
        if (trackPointObjects[i].eleDiff >= 0) {
          eleGain = eleGain + Number(trackPointObjects[i].eleDiff);
        } 
      }
      eleGain = Number(eleGain);
      return eleGain.toFixed(0);
    };

    calcElevationLoss(trackPointObjects) {
      let eleLoss = 0;
      for ( let i=0; i<trackPointObjects.length; i++ ) {
        if (trackPointObjects[i].eleDiff < 0) {
          eleLoss = eleLoss + Number(trackPointObjects[i].eleDiff);
        }
      }
      eleLoss = Number(eleLoss);
      return eleLoss.toFixed(0);
    }

    calcTotalTime(trackPointObjects) {
      let totalTime = 0;
      let start = trackPointObjects.at(0);
      let end = trackPointObjects.at(-1);      
      
      totalTime = (Date.parse(end.time) - Date.parse(start.time))/1000; //in seconds

      return totalTime;
    }

    calcAvgSpeed( totalDistance, trackPointObjects, gpxFileSize ) {
      let result;
      let seconds = this.calcMovingTime(trackPointObjects, gpxFileSize);
      
      result = (totalDistance.value / ( seconds / 3600)).toFixed(1);

      return result;
    }

    calcMaxSpeed (trackPointObjects) {
      let result = 0;
      let array = (trackPointObjects).map(
				({ speed }) => {return speed});

      for (let i = 0; i < trackPointObjects.length; i++) {
        let point1 = parseFloat(array[i]);
        let point2 = parseFloat(array[i-1]);
        let point3 = parseFloat(array[i-2]);
        let pointArray = [ point1, point2, point3 ];
        let currentSpeed;
        
        currentSpeed = (( UTIL.sumArray(pointArray) / pointArray.length ) * 3.6); // in km/h
        
        if (currentSpeed > result) result = currentSpeed.toFixed(1);
      }

      return result;
    }

    calcMaxGradient (trackPointObjects) {
      let result = 0;
      let array = (trackPointObjects).map(
				({ eleDiff, dist }) => {return [eleDiff, dist]});

      for (let i = APP.numberSmoothing; i < trackPointObjects.length; i++) {
        let eleDiffArray = [];
        // we need to smooth the numbers to avoid weird values due to geolocation inaccuracies:
        for ( let n=0; n<APP.numberSmoothing; n++ ) {
          eleDiffArray.push(parseFloat(array[i-n][0]));
        }     

        let distArray = [];
        for ( let n=0; n<APP.numberSmoothing; n++ ) {
          distArray.push(parseFloat(array[i-n][1]));
        }
        
        let currentGradient = ( UTIL.sumArray(eleDiffArray) / UTIL.sumArray(distArray) ) * 100; // in %        
        
        if (currentGradient > result) result = currentGradient.toFixed(1);
      }     
      
      return result;
    }


    addStat(stat, unit) {
      statList = (`${statList}
        <tr>
          <td>${stat.name}:</td>
          <td><b> ${stat.value}</b> ${unit}</td>
        </tr>
      `);
    }

    addPowerStat(stat, unit) {
      powerStatList = (`${powerStatList}
        <tr>
          <td>${stat.name}:</td>
          <td><b> ${stat.value}</b> ${unit}</td>
        </tr>
      `);
    }
  }

  function calculateStats( trackPointObjects, gpxFileSize ) {
    statList = [];
    // Total distance
      let totalDistance = new Statistic;
      totalDistance.name = 'Distance';
      totalDistance.value = UTIL.metersToKm(
        totalDistance.calcDist(trackPointObjects));
      totalDistance.addStat(totalDistance, 'km');

      rideDistance = totalDistance.value;

    // Moving time
      let movingTime = new Statistic;
      movingTime.name = 'Moving time';
      let movingTimeInSec = movingTime.calcMovingTime(trackPointObjects, gpxFileSize);
      movingTime.value = UTIL.secondsToMinutesAndSeconds(movingTimeInSec);		
      movingTime.addStat(movingTime, '');
      moveTime = movingTimeInSec;

    // Total time
      let totalTime = new Statistic;
      totalTime.name = 'Total time';
      totalTime.value = UTIL.secondsToMinutesAndSeconds(
        totalTime.calcTotalTime(trackPointObjects));		
      totalTime.addStat(totalTime, '');

    // Average speed
      let avgSpeed = new Statistic;
      avgSpeed.name = 'Avg. speed';
      avgSpeed.value = avgSpeed.calcAvgSpeed(totalDistance, trackPointObjects, gpxFileSize );		
      avgSpeed.addStat(avgSpeed, 'km/h');
      avgSpd = avgSpeed.value;
      
    // Max speed
      let maxSpeed = new Statistic;
      maxSpeed.name = 'Max. speed';
      maxSpeed.value = maxSpeed.calcMaxSpeed( trackPointObjects );		
      maxSpeed.addStat(maxSpeed, 'km/h');
      maxSpd = maxSpeed.value; 
      
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

    // Avg. gradient
      let avgGradient  = new Statistic;
      avgGradient.name = 'Avg. gradient';
      avgGradient.value = ( elevationGain.value / (totalDistance.value * 1000 / 2) * 100 ).toFixed(1);
      avgGradient.addStat(avgGradient, '%');
      avgGrad = avgGradient.value;
    
    // Max. gradient
      let maxGradient  = new Statistic;
      maxGradient.name = 'Max. gradient';
      maxGradient.value = maxGradient.calcMaxGradient(trackPointObjects);
      maxGradient.addStat(maxGradient, '%');

    return statList;
  }

  function displayAllStats( statList, pwrStatList) {
    document.getElementsByClassName("stats__table")[0].innerHTML = statList;
    document.getElementsByClassName("power__table")[0].innerHTML = pwrStatList;
  }

  function calculatePowerStats(){
    powerStatList = [];

    // Avg. power
      let averagePower = new Statistic;
      averagePower.name = 'Avg. power' ;
      averagePower.value = avgPower;
      averagePower.addPowerStat(averagePower, 'W');

    // kCal burnt
      let kiloCaloriesBurnt = new Statistic;
      kiloCaloriesBurnt.name = 'Energy burnt' ;
      kiloCaloriesBurnt.value = kCalBurnt;
      kiloCaloriesBurnt.addPowerStat(kiloCaloriesBurnt, 'kCal');

    return powerStatList;
  }

  function calculateAvgPower( userWeight, bikeWeight, avgSpeed, avgGradient ) {
    let avgPower = 0;
    let avgGrad = avgGradient * 0.01;
    let g = 9.81;
    let totalMass = userWeight + bikeWeight;
    let speedInMetersPerSec = avgSpeed / 3.6;

    let gravityForce;
    let rollingResistanceForce;
    let aeroDragForce;
    let percentageLosses;

    gravityForce = g * Math.sin(Math.atan(avgGrad)) * totalMass;
    rollingResistanceForce = g * Math.cos(Math.atan(avgGrad)) * totalMass * 0.0060;
    aeroDragForce = 0.5 * 0.408 * 1.18219495744 * Math.pow(speedInMetersPerSec, 2);
    percentageLosses = 0.03;

    avgPower = parseInt((gravityForce + rollingResistanceForce + aeroDragForce) * 
        speedInMetersPerSec / ( 1 - percentageLosses));

    // avgPower = 555;
    // console.log(`Your total mass is: ${totalMass}`);
    // console.log(`Your average power is: ${avgPower} W`);

    return avgPower;
  }

  function calculateCalories( avgPower, movingTime ) {
    let kiloCalories;

    kiloCalories = parseInt((( avgPower * movingTime ) / 4.18 ) / 0.24 / 1000);

    return kiloCalories;
  }

  function prepareElevationGraph( trackPointObjects, fidelityPerc ) {
    // We need to divide the ride into equal length segments.
    let graphId = 'graph__elevation';
    let targetDomElement = document.getElementById(graphId);
    let width = targetDomElement.getBoundingClientRect().width;
    let samplePoints = parseInt( width - width * (( 100 - fidelityPerc )*0.01));

    let xAxis = UTIL.series( 0, rideDistance, samplePoints );

    // Then get points closest to our criteria, and read their values.
    let elevationGraph = [];
    let n = 0;
    let currentDist;
    let currentEle;

    for (let i = 0; i < trackPointObjects.length;) {
      currentDist = Number(trackPointObjects[i].totDist) / 1000;
      currentEle = trackPointObjects[i].ele;
      // console.log(currentDist);
      if ( currentDist >= (xAxis[n])){
        elevationGraph.push(currentEle);
        n++;
      } 
      
      i++;
    }

    if (elevationGraph.length = (xAxis.length - 1 )) {
      elevationGraph.push(trackPointObjects.at(-1).ele);
    }

    // Max height point:
    let maxHeightGraph = [];
    let maxHeight = [...elevationGraph];

    function compareNumbers(a, b) {
      return a - b;
    }

    maxHeight.sort(compareNumbers);
    maxHeight = maxHeight.at(-1);

    for ( let i = 0; i< elevationGraph.length; i++) {
      if (elevationGraph[i] === maxHeight) {
        maxHeightGraph.push(maxHeight);
      } else {
        maxHeightGraph.push(null);
      }
    }

    document.getElementsByClassName("graph__max-elev-label")[0].innerHTML = 
    `${ parseInt(maxHeight) } m`;

    let graphs = [ elevationGraph, maxHeightGraph ];

    displayLineChart( graphId, graphs )
  }

  function prepareSpeedGraph( trackPointObjects, fidelityPerc ) {
    // We need to divide the ride into equal length segments.
    let graphId = 'graph__speed';
    let targetDomElement = document.getElementById(graphId);
    let width = targetDomElement.getBoundingClientRect().width;
    let samplePoints = parseInt( width - width * (( 100 - fidelityPerc )*0.01));
    // samplePoints = 10;

    let xAxis = UTIL.series( 0, rideDistance, samplePoints );

    // Then get points closest to our criteria, and read their values.
    let speedGraph = [];
    let n = 0;
    let currentDist;
    let currentEle;
    let currentSpeed;

    for (let i = 0; i < trackPointObjects.length;) {
      currentDist = Number(trackPointObjects[i].totDist) / 1000;
      currentSpeed = trackPointObjects[i].speed;
      if ( currentDist >= (xAxis[n])){
        speedGraph.push(currentSpeed);
        n++;
      } 
      
      i++;
    }
    
    if (speedGraph.length = (xAxis.length - 1 )) {
      // console.log(speedGraph.at(-1));
      speedGraph.push(speedGraph.at(-1));
    }

    // Max speed point:
    let maxSpeedGraph = [];
    let maxSpeed = [...speedGraph];

    function compareNumbers(a, b) {
      return a - b;
    }

    maxSpeed.sort(compareNumbers);
    maxSpeed = maxSpeed.at(-1);

    for ( let i = 0; i< speedGraph.length; i++) {
      if (speedGraph[i] === maxSpeed) {
        maxSpeedGraph.push(maxSpeed);
      } else {
        maxSpeedGraph.push(null);
      }
    }

    document.getElementsByClassName("graph__max-speed-label")[0].innerHTML = 
    `${ maxSpd } kph`;
    let graphs = [ speedGraph, maxSpeedGraph ];

    displayLineChart( graphId, graphs, 0, );
  }

  function prepareGradientsGraph (trackPointObjects) {
    let graphId = 'graph__gradients';
    let result = 0;
    let array = (trackPointObjects).map(
      ({ eleDiff, dist, interval }) => {return [eleDiff, dist, interval]});
    let gradientsArray = Array(APP.numberSmoothing).fill('0');
    let intervalArray = [];
    for (let i=0; i<APP.numberSmoothing; i++ ) {
      intervalArray.push(array[i][2])
    }
    let isArrayValid = false;
    let valuesToChart;

    const prepareGradArray = () => {
      return new Promise((resolve, reject) => {
        for (let i = APP.numberSmoothing; i < trackPointObjects.length; i++) {
          let eleDiffArray = [];
          // we need to smooth the numbers to avoid weird values due to geolocation inaccuracies:
          for ( let n=0; n<APP.numberSmoothing; n++ ) {
            eleDiffArray.push(parseFloat(array[i-n][0]));
          }     

          let distArray = [];
          for ( let n=0; n<APP.numberSmoothing; n++ ) {
            distArray.push(parseFloat(array[i-n][1]));
          }
          
          let currentGradient = ( UTIL.sumArray(eleDiffArray) / UTIL.sumArray(distArray) ) * 100; // in %        
          let currentInterval = parseFloat(array[i][2]);

          intervalArray.push(currentInterval);
          gradientsArray.push(currentGradient.toFixed(1));
        }
        if (gradientsArray.length = trackPointObjects.length) {
          isArrayValid = true;
          resolve ( 'Array is valid.' ); 
        } else {
          isArrayValid = false;
          console.log ( 'Array is invalid.' );
          reject ( 'Array is invalid.' );
        }
      }, isArrayValid)    
    }    

    function sortGradientsByTime ( gradArray, intArray, boundaries ) {
      let downhill = boundaries[0];
      let flat = boundaries[1];
      let mildUphill = boundaries[2];

      let downhillArray = [];
      let flatArray = [];
      let mildUphillArray = [];
      let steepUphillArray = [];

      for (let i = 0; i < gradArray.length; i++) {
        const gradient = gradArray[i];
        let interval = intArray[i];
        interval = Math.min(interval, APP.stopTime);

        if(gradient < downhill) {
          downhillArray.push(interval);
        } else if(gradient < flat) {
          flatArray.push(interval);          
        } else if(gradient < mildUphill) {
          mildUphillArray.push(interval);          
        } else {
          steepUphillArray.push(interval);
        }        
      }

      result = [ UTIL.sumArray(downhillArray),
                 UTIL.sumArray(flatArray),
                 UTIL.sumArray(mildUphillArray),
                 UTIL.sumArray(steepUphillArray), ]

      return result;
    }
    

    prepareGradArray()
      .then(() => {
        // sort values
        valuesToChart = sortGradientsByTime( gradientsArray, intervalArray, APP.gradientBoundaries);
      })
      .then(() => {
        displayPieChart( graphId, valuesToChart );
      })
      .then(() => {

      })    
  }

  function displayLineChart( graphId, valueArray, min, max ) {
    var data = {
      // A labels array that can contain any sort of values
      labels: [ ],
      // Our series array that contains series objects or in this case series data arrays
      series: [
        {name: 'series-1', data: valueArray[0]},
        {name: 'series-2', data: valueArray[1]},
      ]
    };
    var options = {
      fullWidth: true,
      showArea: true,
      // showPoint: false,
      series: {
        'series-1': {
          showPoint: false,
        },
        'series-2': {
          showPoint: true,
        }
      },
      lineSmooth: false,
      chartPadding: 10,
      // X-Axis specific configuration
      axisX: {
        showGrid: false,
        showLabel: false,
        stretch: true,
        offset: 0,
      },
      // Y-Axis specific configuration
      axisY: {
        showLabel: false,
        // Lets offset the chart a bit from the labels
        offset: 0,
        // low: 0,
        // high: max,
        // The label interpolation function enables you to modify the values
        // used for the labels on each axis. Here we are converting the
        // values into million pound.
        labelInterpolationFnc: function (value) {
          return '$' + value + 'm';
        }
      },
    };
    new LineChart(`#${graphId}`, data, options);    
  }

  function displayPieChart( graphId, valueArray, min, max ) {

    let labelsList = ['downhill', 'flat', 'mild uphill', 'steep uphill'];
    let newlabelsList = [];
    let valueSum = UTIL.sumArray(valueArray);
    for ( let i=0; i<labelsList.length; i++) {
      let currentPercentage = (valueArray[i]) * 100 / valueSum;
      if (currentPercentage < 3) {
        newlabelsList.push(' ');
      } else {
        newlabelsList.push(labelsList[i]);
      }
    }

    var data = {
      // Our series array that contains series objects or in this case series data arrays
      series: valueArray,

      // A labels array that can contain any sort of values
      labels: newlabelsList,
    };

    let joinedLabels = [];
    let joinLabels = function (data) {
      for (let i = 0; i < data.labels.length; i++) {
        let newLabel;
        const label = data.labels[i];
        const value = data.series[i];
        newLabel = `${label} ${value}`;

        joinedLabels.push(newLabel);
        
      }
      return joinedLabels;
    };
    // joinLabels(data);

    let data2 = data.series;

    var options = {
      
      chartPadding: 10,
      donut: true,
      donutWidth: 55,      

      // labelInterpolationFnc: function (data) {
      //   return data + '%';        
      // }
      
    };
    
    new PieChart(`#${graphId}`, data, options);    
  }

  function moveLabels() {
    // Elevation
    setTimeout(() => {
      let a = document.getElementsByClassName('ct-point')[0];
      let top = parseFloat( a.y1.baseVal.valueAsString ) - 24;
      let left = parseFloat( a.x1.baseVal.valueAsString ) - 16;
      let label = document.getElementsByClassName("graph__max-elev-label")[0];
      setLabel ( label, top, left );
    }, 0);
    // Speed
    setTimeout(() => {
      let a = document.getElementsByClassName('ct-point')[1];
      let top = parseFloat( a.y1.baseVal.valueAsString ) - 24;
      let left = parseFloat( a.x1.baseVal.valueAsString ) - 16;
      let label = document.getElementsByClassName("graph__max-speed-label")[0];
      setLabel ( label, top, left );
    }, 0);
  }

  function setLabel ( label, top, left ) {
    label.setAttribute('style', `
      position: absolute;
      top: ${top}px;
      left: ${left}px;
    `);
  }

  function submitWeight(event) {

    if (event) {event.preventDefault()};    

    userWeight = Number(document.getElementsByClassName("power__your-weight-input")[0].value);
    bikeWeight = Number(document.getElementsByClassName("power__bike-weight-input")[0].value);

    document.getElementsByClassName("power__your-weight-input")[0].setAttribute("value", userWeight);
    document.getElementsByClassName("power__bike-weight-input")[0].setAttribute("value", bikeWeight);

    let dataToSave = [];
    let userWeightToSave = { 'userWeight': userWeight };
    dataToSave.push(userWeightToSave);
    let bikeWeightToSave = { 'bikeWeight': bikeWeight };
    dataToSave.push(bikeWeightToSave);
    let json = JSON.stringify(dataToSave);
    localStorage.setItem('weightData', json);

    avgPower =  calculateAvgPower( userWeight, bikeWeight, avgSpd, avgGrad );
    kCalBurnt =  calculateCalories( avgPower, moveTime );
    calculatePowerStats();
    displayAllStats( statList, powerStatList );
    
    return userWeight, bikeWeight, avgPower, kCalBurnt;
  }

  function backToHome() {
    UTIL.infoLeaveAnimation();

    let delayInMs = infoToHomeTransition * 1000;
    setTimeout(() => {
      UTIL.StateManager.setState(`home_baseState`);
      APP.init();
      UTIL.pageReloadAnimation();
    }, delayInMs);

  }

  return {
    initMap,
    calculateStats,
    calculatePowerStats,
    setupMap,
    createPolyline,
    addMapTiles,
    displayAllStats,
    prepareElevationGraph,
    prepareSpeedGraph,
    prepareGradientsGraph,
    backToHome,
    submitWeight,
    moveLabels,
    userWeight,
    bikeWeight,
    infoToHomeTransition,
  }
})();

export { INFO };