import { 
	secondsToMinutesAndSeconds, 
  metersToKm, 
  performanceList,
  PerformanceStat,
  TrackPoint, 
} from './utilities.js';

import { uploadInput } from '../app.js';
import { gpxFile, gpxText, parser, trackPointObjects, statList, stopTime, stopSpeed, eleGain, eleLoss, } from '../app.js';

const INFO = (function () {
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
    // displayPerformance();
  }
})();

export { INFO };