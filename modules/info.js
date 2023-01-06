import { DOM } from '../app.js';
import { UTIL } from './utilities.js';

import { trackPointObjects, noOfOptimizations } from './home.js';
import { gpxFile, gpxText, parser,  stopTime, stopSpeed, gradientSmoothing  } from '../app.js';

const INFO = (function () {
  let statList = [];
  let eleGain = 0;
  let eleLoss = 0;
  let map = L.map('map').setView([51.505, -0.09], 13);
  let gpxPolyline;
  let rideDistance;



  function setupMap() {
    map.invalidateSize();
    map.fitBounds(gpxPolyline.getBounds());
  }

  function createPolyline(trackPointObjects) {
    let latLngArray = [];

    for ( let i=0; i<trackPointObjects.length; i++ ) {
      let currentTrackpoint = []

      currentTrackpoint.push(parseFloat(trackPointObjects[i].lat));
      currentTrackpoint.push(parseFloat(trackPointObjects[i].lon));

      latLngArray.push(currentTrackpoint);
    }

    gpxPolyline =  L.polyline(latLngArray, {color: 'var(--orange-70)'}).addTo(map);

    return gpxPolyline;
  }



  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);


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

        if ((trackPointObjects[i].interval < (stopTime * Math.pow(2, noOfOptimizations))) && (trackPointObjects[i].speed > stopSpeed)) {
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

    calcTotalTime(trackPointObjects) {
      let totalTime;
      let start = trackPointObjects.at(0);
      let end = trackPointObjects.at(-1);      
      
      totalTime = (Date.parse(end.time) - Date.parse(start.time))/1000; //in seconds

      return totalTime;
    }

    calcAvgSpeed( totalDistance, trackPointObjects ) {
      let result;
      let seconds = this.calcMovingTime(trackPointObjects);
      
      result = (totalDistance.value / ( seconds / 3600)).toFixed(2);

      return result;
    }

    calcMaxSpeed (trackPointObjects) {
      let result = 0;
      let array = (trackPointObjects).map(
				({ speed }) => {return speed});

      for (let i = 2; i < trackPointObjects.length; i++) {
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

      for (let i = gradientSmoothing; i < trackPointObjects.length; i++) {
        let eleDiffArray = [];
        // we need to smooth the numbers to avoid weird values due to geolocation inaccuracies:
        for ( let n=0; n<gradientSmoothing; n++ ) {
          eleDiffArray.push(parseFloat(array[i-n][0]));
        }     

        let distArray = [];
        for ( let n=0; n<gradientSmoothing; n++ ) {
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
  }

  function calculateStats(trackPointObjects) {
    console.log('stat calculation begun.')
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
      movingTime.value = UTIL.secondsToMinutesAndSeconds(
        movingTime.calcMovingTime(trackPointObjects));		
      movingTime.addStat(movingTime, '');

    // Total time
      let totalTime = new Statistic;
      totalTime.name = 'Total time';
      totalTime.value = UTIL.secondsToMinutesAndSeconds(
        totalTime.calcTotalTime(trackPointObjects));		
      totalTime.addStat(totalTime, '');

    // Average speed
      let avgSpeed = new Statistic;
      avgSpeed.name = 'Avg. speed';
      avgSpeed.value = avgSpeed.calcAvgSpeed(totalDistance, trackPointObjects );		
      avgSpeed.addStat(avgSpeed, 'km/h');
      
    // Max speed
      let maxSpeed = new Statistic;
      maxSpeed.name = 'Max. speed';
      maxSpeed.value = maxSpeed.calcMaxSpeed( trackPointObjects );		
      maxSpeed.addStat(maxSpeed, 'km/h');
      
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
    
    // Max. gradient
      let maxGradient  = new Statistic;
      maxGradient.name = 'Max. gradient';
      maxGradient.value = maxGradient.calcMaxGradient(trackPointObjects);
      maxGradient.addStat(maxGradient, '%');



    console.log('stat calculation ended.')
    // console.log(statList);

    return statList;
  }

  function displayAllStats(statList) {
    document.getElementsByClassName("stats__table")[0].innerHTML = statList;
  }

  function prepareElevationGraph( trackPointObjects, fidelityPerc ) {
    // We need to divide the ride into equal length segments.
    let graphId = 'graph__elevation';
    let targetDomElement = document.getElementById(graphId);
    let width = targetDomElement.getBoundingClientRect().width;
    let samplePoints = parseInt( width - width * (( 100 - fidelityPerc )*0.01));

    let xAxis = UTIL.series( 0, rideDistance, samplePoints );

    // Then get points closest to our criteria, and read their values.
    let yAxis = [];
    let n = 0;
    let currentDist;
    let currentEle;

    for (let i = 0; i < trackPointObjects.length;) {
      currentDist = Number(trackPointObjects[i].totDist) / 1000;
      currentEle = trackPointObjects[i].ele;
      // console.log(currentDist);
      if ( currentDist >= (xAxis[n])){
        yAxis.push(currentEle);
        n++;
      } 
      
      i++;
    }

    if (yAxis.length = (xAxis.length - 1 )) {
      yAxis.push(trackPointObjects.at(-1).ele);
    }

    displayLineChart( graphId, yAxis )
  }

  function prepareSpeedGraph( trackPointObjects, fidelityPerc ) {
    // We need to divide the ride into equal length segments.
    let graphId = 'graph__speed';
    let targetDomElement = document.getElementById(graphId);
    let width = targetDomElement.getBoundingClientRect().width;
    let samplePoints = parseInt( width - width * (( 100 - fidelityPerc )*0.01));

    let xAxis = UTIL.series( 0, rideDistance, samplePoints );

    // Then get points closest to our criteria, and read their values.
    let yAxis = [];
    let n = 0;
    let currentDist;
    let currentSpeed;

    for (let i = 0; i < trackPointObjects.length;) {
      currentDist = Number(trackPointObjects[i].totDist) * 3.6; // to km/h
      currentSpeed = trackPointObjects[i].speed;
      if ( currentDist >= (xAxis[n])){
        yAxis.push(currentSpeed);
        n++;
      } 
      
      i++;
    }

    if (yAxis.length = (xAxis.length - 1 )) {
      yAxis.push(trackPointObjects.at(-1).speed);
    }

    displayLineChart( graphId, yAxis )
  }

  function prepareGradientsGraph( trackPointObjects, fidelityPerc ) {
    // We need to divide the ride into equal length segments.
    let graphId = 'graph__gradients';
    let targetDomElement = document.getElementById(graphId);
    let width = targetDomElement.getBoundingClientRect().width;
    let samplePoints = parseInt( width - width * (( 100 - fidelityPerc )*0.01));

    let xAxis = UTIL.series( 0, rideDistance, samplePoints );

    // Then get points closest to our criteria, and read their values.
    let yAxis = [];
    let n = 0;
    let currentDist;
    let currentSpeed;

    for (let i = 0; i < trackPointObjects.length;) {
      currentDist = Number(trackPointObjects[i].totDist) * 3.6; // to km/h
      currentSpeed = trackPointObjects[i].speed;
      if ( currentDist >= (xAxis[n])){
        yAxis.push(currentSpeed);
        n++;
      } 
      
      i++;
    }

    if (yAxis.length = (xAxis.length - 1 )) {
      yAxis.push(trackPointObjects.at(-1).speed);
    }

    displayPieChart( graphId, yAxis )
  }

  function displayLineChart( graphId, valueArray, min, max ) {
    var data = {
      // A labels array that can contain any sort of values
      labels: [ ],
      // Our series array that contains series objects or in this case series data arrays
      series: [
        valueArray,
      ]
    };
    var options = {
      fullWidth: true,
      showArea: true,
      showPoint: false,
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
        // high:12,
        // The label interpolation function enables you to modify the values
        // used for the labels on each axis. Here we are converting the
        // values into million pound.
        labelInterpolationFnc: function(value) {
          return '$' + value + 'm';
        }
      },
    };
    new Chartist.Line(`#${graphId}`, data, options);    
  }

  function displayPieChart( graphId, valueArray, min, max ) {
    var data = {
      // Our series array that contains series objects or in this case series data arrays
      series: [8, 20, 32, 40],

      // A labels array that can contain any sort of values
      labels: ['downhill', 'flat', 'mild uphill', 'steep uphill'],

    };

    console.log(data.labels.length)

    let joinedLabels = [];
    let joinLabels = function(data) {
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

      // labelInterpolationFnc: function(data) {
      //   return data + '%';        
      // }
      
    };
    
    new Chartist.Pie(`#${graphId}`, data, options);    
  }

  return {
    calculateStats,
    setupMap,
    createPolyline,
    displayAllStats,
    prepareElevationGraph,
    prepareSpeedGraph,
    prepareGradientsGraph,
    statList,
    map
  }
})();

export { INFO };