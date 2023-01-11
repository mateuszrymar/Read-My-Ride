// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"modules/utilities.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UTIL = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var UTIL = function () {
  var performanceList = [];
  var storedStates = [];
  function secondsToMinutesAndSeconds(sec) {
    var result;
    sec = Number(sec);
    var hours = Math.floor(sec / 3600);
    var minutes = Math.floor(sec % 3600 / 60);
    var seconds = Math.floor(sec % 3600 % 60);
    if (minutes == 0) {
      minutes = "00";
    } else if (minutes < 10) {
      minutes = "0".concat(minutes);
    }
    if (seconds === 0) {
      seconds = "00";
    } else if (seconds < 10) {
      seconds = "0".concat(seconds);
    }
    result = "".concat(hours, ":").concat(minutes, ":").concat(seconds);
    return result;
  }
  function metersToKm(m) {
    var km;
    km = (m / 1000).toFixed(2);
    return km;
  }
  function sumArray(array) {
    var initialValue = 0;
    var sum = array.reduce(function (accumulator, currentValue) {
      return accumulator + currentValue;
    }, initialValue);
    return sum;
  }
  function series(startNumber, endNumber, count) {
    var result = [];
    var step = (endNumber - startNumber) / (count - 1);
    // console.log(startNumber === endNumber);
    // console.log(count);

    if (count === 0) {
      return 0;
    } else if (startNumber === endNumber) {
      for (var x = 0; x < count; x++) {
        // console.log('this should be our case!');
        var y = void 0;
        y = startNumber;
        result.push(y);
      }
    } else {
      for (var i = 0; i < count; i++) {
        var _y = void 0;
        _y = startNumber + step * [i];
        result.push(_y);
      }
    }
    return result;
  }
  function smoothArray(array, smoothingCount, rounding) {
    var smoothNumbers = [];
    for (var i = 0; i < array.length; i++) {
      var start = parseInt([i]) - parseInt(smoothingCount / 2);
      var end = parseInt([i]) + parseInt(smoothingCount / 2);
      var numbersToAverage = [];
      var indicesToProcess = series(start, end, smoothingCount);
      // console.log(start, end, smoothingCount);
      // console.log(series(start, end, smoothingCount));

      for (var n = 0; n < smoothingCount; n++) {
        var index = indicesToProcess[n];
        // console.log(indicesToProcess[n]);
        var element = parseFloat(array.at(index));
        if (element === undefined) element = 0;
        numbersToAverage.push(element);
      }
      smoothNumbers.push(parseFloat((sumArray(numbersToAverage) / smoothingCount).toFixed(rounding)));
    }
    return smoothNumbers;
  }
  var PerformanceStat = /*#__PURE__*/function () {
    function PerformanceStat(name, value) {
      _classCallCheck(this, PerformanceStat);
      this.name = name;
      this.value = value;
    }
    _createClass(PerformanceStat, [{
      key: "startTimer",
      value: function startTimer() {
        var start = Date.now();
        return start;
      }
    }, {
      key: "endTimer",
      value: function endTimer() {
        var end = Date.now();
        return end;
      }
    }, {
      key: "evaluateTimer",
      value: function evaluateTimer(performanceStat, startTimer, endTimer) {
        performanceStat.value = endTimer - startTimer;
      }
    }, {
      key: "addStat",
      value: function addStat(stat, unit) {
        performanceList = "".concat(performanceList, "\n\t\t\t\t<li>").concat(stat.name, ": ").concat(stat.value, " ").concat(unit, "</li>\n\t\t\t");
      }
    }]);
    return PerformanceStat;
  }();
  var TrackPoint = /*#__PURE__*/function () {
    function TrackPoint(id, lat, lon, ele, time) {
      _classCallCheck(this, TrackPoint);
      this.id = id;
      this.lat = lat;
      this.lon = lon;
      this.ele = ele;
      this.time = time;
      this.dist = 0;
      this.totDist = 0;
      this.speed = 0;
      this.interval = 0;
      this.eleDiff = 0;
    }
    _createClass(TrackPoint, [{
      key: "distance",
      value: function distance(lat1, lon1, lat2, lon2) {
        // Haversine formula - 0.3% error expected		
        var R = 6371e3; // metres
        var φ1 = lat1 * Math.PI / 180; // φ, λ in radians
        var φ2 = lat2 * Math.PI / 180;
        var Δφ = (lat2 - lat1) * Math.PI / 180;
        var Δλ = (lon2 - lon1) * Math.PI / 180;
        var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // in metres

        return d;
      }
    }, {
      key: "timeToDate",
      value: function timeToDate(time) {
        var timeTemplate = /[0-9.]{1,}/g;
        var date;
        date = time.match(timeTemplate);
        date = new Date(Date.UTC(date[0], date[1] - 1, date[2], date[3], date[4], date[5]));
        return date;
      }
    }, {
      key: "speedBetweenPoints",
      value: function speedBetweenPoints(distance, interval) {
        var speed;
        if (interval != 0) {
          speed = distance / interval;
        } else {
          speed = 0;
        }
        return speed;
      }
    }, {
      key: "elevationDifference",
      value: function elevationDifference(ele1, ele2) {
        var eleDiff = 0;
        eleDiff = ele2 - ele1;
        return eleDiff;
      }
    }]);
    return TrackPoint;
  }();
  var StateManager = function () {
    var StateManager;
    // (!StateManager) ? console.log('no SM') : console.log('SM');
    var State = /*#__PURE__*/_createClass(function State(name, domElements, current) {
      _classCallCheck(this, State);
      name = this.name;
      domElements = this.domElements;
      current = this.current;
    });
    var domElement = /*#__PURE__*/_createClass(function domElement(element, innerHtml, style) {
      _classCallCheck(this, domElement);
      element = this.element;
      innerHtml = this.innerHtml;
      style = this.style;
    });
    function createStateManager() {
      console.log('state manager created.');
      return new Object({
        name: 'stateManager'
      });
    }
    function storeDom(stateName, elementsToStore) {
      var elementsArray = [];
      var stateToStore = new State();
      stateToStore.name = stateName;
      stateToStore.current = true;
      var entry = Object.entries(elementsToStore);
      var styleTemplate = /(style=")((.|\n)*?)(")/;
      for (var i = 0; i < entry.length; i++) {
        var currentElement = new domElement();
        currentElement.id = entry[i][1].classList[0];
        currentElement.innerHtml = entry[i][1].innerHTML;

        // console.log(i);
        var currentOuterHtml = entry[i][1].outerHTML;
        var currentStyle = currentOuterHtml.match(styleTemplate);
        if (currentStyle !== null) {
          currentStyle = currentStyle[2];
        } else {
          currentStyle = '';
        }
        currentElement.style = currentStyle;
        elementsArray.push(currentElement);
      }
      ;
      stateToStore.domElements = elementsArray;
      storedStates.push(stateToStore);
    }
    function createNewState(newStateName, newElements, newStyles, newInnerHtml) {
      var baseState = storedStates[0];
      var baseIds = baseState.domElements.map(function (_ref) {
        var id = _ref.id,
          innerHtml = _ref.innerHtml,
          style = _ref.style;
        return id;
      });
      var newElementsIds = [];
      for (var i = 0; i < newElements.length; i++) {
        var currentId = newElements[i].classList[0];
        newElementsIds.push(currentId);
      }
      var newEntries = [];

      // // THIS LOOP IS PROBABLY WRONG!!!

      for (var _i = 0; _i < baseState.domElements.length; _i++) {
        var currentEntryId = baseIds[_i];
        var indexOfNewElement = newElementsIds.indexOf(currentEntryId);

        // THE BUG WAS IN THESE CONDITIONAL STATEMENTS:
        if (indexOfNewElement !== -1) {
          var newEntry = new domElement();
          newEntry.id = "".concat(baseState.domElements[_i].id);
          if (newStyles[indexOfNewElement] !== '') {
            newEntry.innerHtml = "".concat(newInnerHtml[indexOfNewElement]);
          }
          ;
          if (newStyles[indexOfNewElement] !== '') {
            newEntry.style = "".concat(newStyles[indexOfNewElement]);
          }
          ;
          newEntries.push(newEntry);
        } else {
          var _newEntry = new domElement();
          _newEntry.id = "".concat(baseState.domElements[_i].id);
          _newEntry.innerHtml = "".concat(baseState.domElements[_i].innerHtml);
          _newEntry.style = "".concat(baseState.domElements[_i].style);
          newEntries.push(_newEntry);
        }
      }
      var stateToCreate = new State();
      stateToCreate.name = newStateName;
      stateToCreate.current = false;
      stateToCreate.domElements = newEntries;
      return storedStates.push(stateToCreate);
    }
    function checkCurrentState() {
      var currentState;
      for (var i = 0; i < storedStates.length; i++) {
        var current = storedStates.map(function (_ref2) {
          var name = _ref2.name,
            current = _ref2.current,
            domElements = _ref2.domElements;
          return current;
        });
        if (current[i] === true) {
          currentState = storedStates[i];
        }
      }
      return currentState;
    }
    function setState(newStateName) {
      var oldState = checkCurrentState();
      var baseState = storedStates[0];
      var newState;
      // first we need to check if a State exists with a name === newState
      if (findStateIndex(newStateName) !== -1) {
        newState = storedStates[findStateIndex(newStateName)];
        switchStates(oldState, baseState);
        switchStates(baseState, newState);
      } else throw new Error('This state has not been specified yet.');

      // now we change all DOM objects.
      newState.domElements.forEach(function (item) {
        if (item.innerHtml !== '') {
          document.getElementsByClassName(item.id)[0].innerHTML = "".concat(item.innerHtml);
        }
        ;
        if (item.style !== '') {
          document.getElementsByClassName(item.id)[0].style = "".concat(item.style);
        }
        ;
      });
    }
    function findStateIndex(stateName) {
      var result;
      var statesArr = storedStates.map(function (_ref3) {
        var name = _ref3.name,
          current = _ref3.current,
          domElements = _ref3.domElements;
        return name;
      });
      var targetStateIndex = statesArr.indexOf(stateName);
      result = targetStateIndex;
      return result;
    }
    function switchStates(currentState, newState) {
      if (findStateIndex(newState.name) !== -1) {
        currentState.current = false;
        newState.current = true;
        currentState = newState;
      } else throw new Error('This state has not been specified yet.');
      return currentState;
    }
    return {
      getStateManager: function getStateManager() {
        if (!StateManager) {
          StateManager = createStateManager();
        } else {
          return StateManager;
        }
      },
      storeDom: storeDom,
      createNewState: createNewState,
      setState: setState,
      findStateIndex: findStateIndex

      // changeDomElement(newStateName, elementToChange),
    };
  }();

  return {
    secondsToMinutesAndSeconds: secondsToMinutesAndSeconds,
    metersToKm: metersToKm,
    sumArray: sumArray,
    series: series,
    smoothArray: smoothArray,
    PerformanceStat: PerformanceStat,
    TrackPoint: TrackPoint,
    performanceList: performanceList,
    StateManager: StateManager,
    storedStates: storedStates
  };
}();
exports.UTIL = UTIL;
},{}],"modules/home.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HOME = void 0;
var _app = require("../app.js");
var _utilities = require("./utilities.js");
var HOME = function () {
  var trackPointList;
  var trackPointObjects = [];
  var gpxProcessingTime = new _utilities.UTIL.PerformanceStat();
  var gpxProcessingStart;
  var gpxProcessingEnd;
  var noOfOptimizations;
  function createStates() {
    _utilities.UTIL.StateManager.createNewState('home_domContentLoaded', [_app.DOM.homeUpload, _app.DOM.homeExamples], ['visibility: visible', 'visibility: visible'], ['', '']);
    _utilities.UTIL.StateManager.createNewState('home_uploadError', [_app.DOM.uploadError, _app.DOM.uploadErrorHint], ['visibility: visible', 'visibility: hidden'], ['', '']);
    _utilities.UTIL.StateManager.createNewState('home_uploadErrorHint', [_app.DOM.readGpxBtn, _app.DOM.uploadError, _app.DOM.uploadErrorHint, _app.DOM.file_1, _app.DOM.file_2, _app.DOM.file_3], ['background-color: var(--grey-40)', 'visibility: hidden', 'visibility: visible', 'background-color: var(--green-70)', 'background-color: var(--green-70)', 'background-color: var(--green-70)'], ['', '', '', '', '', '']);
    _utilities.UTIL.StateManager.createNewState('info_baseState', [_app.DOM.home, _app.DOM.info], ['display:none', 'display:block'], ['', '']);
  }
  function init() {
    [_app.DOM.readGpxBtn, _app.DOM.uploadText].forEach(function (element) {
      element.addEventListener('click', uploadClicked);
    }, {
      capture: true
    });
    _app.DOM.uploadUndertext.addEventListener('click', undertextClicked);
  }
  ;
  function uploadClicked(event) {
    console.log('uploadClicked works');
    event.preventDefault();
    _app.DOM.uploadInput.click();
  }
  function undertextClicked(event) {
    console.log('undertextClicked works');
    event.preventDefault();
    console.log('TODO: undertext clicked');
  }
  function processDataFromUpload(data) {
    console.log('processDataFromUpload function started.');
    var processPromise = Promise.resolve(processGpx(data));
    processPromise.then(function () {
      localStorage.clear();
      console.log('local storage cleared');
    }).then(function () {
      var dataToSave = JSON.stringify(trackPointObjects);
      localStorage.setItem('currentGpx', dataToSave);
    }).then(function () {
      calculateGpxProcessingTime();
      console.log(gpxProcessingTime, 'ms');
      gpxProcessingTime.addStat(gpxProcessingTime, 'ms');
      // performanceObject.innerHTML = performanceList;
    });
  }

  function checkFileSize(fileSize) {
    noOfOptimizations = Math.ceil(Math.log2(fileSize / _app.APP.maxFileSize));
    // console.log(noOfOptimizations);
    if (fileSize > _app.APP.maxFileSize) {
      console.log("File's too big, we need to take 1 in every ".concat(Math.pow(2, noOfOptimizations), " points."));
    } else {
      console.log("File size ok, no need to optimize it.");
    }
    return noOfOptimizations;
  }
  function optimizeFile(contentArray, noOfOptimizations) {
    var optimized = [];
    for (var i = 0; i < contentArray.length; i++) {
      var currentEntry = contentArray[i];
      optimized.push(currentEntry);
      i = i + Math.pow(2, noOfOptimizations - 1);
    }
    return optimized;
  }
  function processGpx(content, fileSize) {
    console.log('processGPX function started.');
    gpxProcessingStart = gpxProcessingTime.startTimer();
    var trackPointTemplate = /(<trkpt)((.|\n)*?)(<\/trkpt>)/g;
    trackPointList = content.match(trackPointTemplate); // We divided GPX into individual trackpoints.

    // Now if file is too large, we'll skip some points:
    var numberOfOptimizations = checkFileSize(fileSize);
    if (numberOfOptimizations > 0) {
      var newTrackpoints = HOME.optimizeFile(trackPointList, numberOfOptimizations);
      trackPointList = newTrackpoints;
      var optimizedTrackpoints = '';
      for (var i = 0; i < newTrackpoints.length; i++) {
        var element = newTrackpoints[i];
        optimizedTrackpoints = "".concat(optimizedTrackpoints).concat(element);
      }
      console.log(optimizedTrackpoints);
    }

    // Now we need to extract data from trackpoints into elements.
    var latTemplate = /(lat=")((.|\n)*?)(")/;
    var lonTemplate = /(lon=")((.|\n)*?)(")/;
    var eleTemplate = /(<ele>)((.|\n)*?)(<\/ele>)/;
    var timeTemplate = /(<time>)((.|\n)*?)(<\/time>)/;
    var previousTrackpoint;
    for (var _i = 0; _i < trackPointList.length;) {
      var currentTrackpoint = new _utilities.UTIL.TrackPoint();
      var currentTrackpointRaw = trackPointList[_i];
      currentTrackpoint.id = _i;
      currentTrackpoint.lat = currentTrackpointRaw.match(latTemplate)[2];
      currentTrackpoint.lon = currentTrackpointRaw.match(lonTemplate)[2];
      currentTrackpoint.ele = currentTrackpointRaw.match(eleTemplate)[2];
      currentTrackpoint.time = currentTrackpointRaw.match(timeTemplate)[2];
      currentTrackpoint.time = currentTrackpoint.timeToDate(currentTrackpoint.time);
      if (_i > 0) {
        currentTrackpoint.interval = (currentTrackpoint.time - previousTrackpoint.time) / 1000;
      } else {
        currentTrackpoint.interval = 0;
      }
      if (_i > 0) {
        currentTrackpoint.dist = currentTrackpoint.distance(previousTrackpoint.lat, previousTrackpoint.lon, currentTrackpoint.lat, currentTrackpoint.lon).toFixed(3);
      } else {
        currentTrackpoint.dist = 0;
      }
      if (_i > 0) {
        currentTrackpoint.totDist = parseFloat(previousTrackpoint.totDist) + parseFloat(currentTrackpoint.dist);
        // currentTrackpoint.totDist = parseFloat(currentTrackpoint.totDist);
        currentTrackpoint.totDist = currentTrackpoint.totDist.toFixed(3);
      } else {
        currentTrackpoint.totDist = 0;
      }
      currentTrackpoint.speed = currentTrackpoint.speedBetweenPoints(currentTrackpoint.dist, currentTrackpoint.interval).toFixed(3);
      if (_i > 0) {
        currentTrackpoint.eleDiff = currentTrackpoint.elevationDifference(previousTrackpoint.ele, currentTrackpoint.ele).toFixed(2);
      } else {
        currentTrackpoint.eleDiff = 0;
      }
      trackPointObjects.push(currentTrackpoint);
      previousTrackpoint = currentTrackpoint;
      _i++;
      if (_i === trackPointList.length) {
        smoothSpeed(trackPointObjects);
      }
    }
    function smoothSpeed(trackPointObjects) {
      // numberSmoothing
      var speeds = trackPointObjects.map(function (_ref) {
        var speed = _ref.speed;
        return speed;
      });
      var smoothSpeeds = _utilities.UTIL.smoothArray(speeds, _app.APP.numberSmoothing, 2);
      for (var _i2 = 0; _i2 < trackPointObjects.length; _i2++) {
        trackPointObjects[_i2].speed = smoothSpeeds[_i2];
      }
      return trackPointObjects;
    }
    gpxProcessingEnd = gpxProcessingTime.endTimer();
    return trackPointObjects;
  }
  function calculateGpxProcessingTime() {
    gpxProcessingTime.name = 'GPX processing time';
    gpxProcessingTime.evaluateTimer(gpxProcessingTime, gpxProcessingStart, gpxProcessingEnd);
  }
  ;
  return {
    createStates: createStates,
    init: init,
    // uploadClicked,
    // undertextClicked,
    // processDataFromUpload,
    // fetchDataFromGpx,
    // handleFileSelect,
    // handleFileLoad,
    processGpx: processGpx,
    // calculateGpxProcessingTime,
    checkFileSize: checkFileSize,
    optimizeFile: optimizeFile,
    // gpxProcessingTime,
    trackPointObjects: trackPointObjects
  };
}();
exports.HOME = HOME;
},{"../app.js":"app.js","./utilities.js":"modules/utilities.js"}],"../node_modules/chartist/dist/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SvgPath = exports.SvgList = exports.Svg = exports.StepAxis = exports.PieChart = exports.LineChart = exports.Interpolation = exports.FixedScaleAxis = exports.EventEmitter = exports.EPSILON = exports.BaseChart = exports.BarChart = exports.Axis = exports.AutoScaleAxis = void 0;
exports.alphaNumerate = alphaNumerate;
exports.axisUnits = void 0;
exports.createChartRect = createChartRect;
exports.createGrid = createGrid;
exports.createGridBackground = createGridBackground;
exports.createLabel = createLabel;
exports.createSvg = createSvg;
exports.deserialize = deserialize;
exports.determineAnchorPosition = determineAnchorPosition;
exports.each = each;
exports.easings = void 0;
exports.ensureUnit = ensureUnit;
exports.escapingMap = void 0;
exports.extend = extend;
exports.getBounds = getBounds;
exports.getHighLow = getHighLow;
exports.getMetaData = getMetaData;
exports.getMultiValue = getMultiValue;
exports.getNumberOrUndefined = getNumberOrUndefined;
exports.getSeriesOption = getSeriesOption;
exports.isArrayOfArrays = isArrayOfArrays;
exports.isArrayOfSeries = isArrayOfSeries;
exports.isDataHoleValue = isDataHoleValue;
exports.isFalseyButZero = isFalseyButZero;
exports.isMultiValue = isMultiValue;
exports.isNumeric = isNumeric;
exports.noop = exports.namespaces = void 0;
exports.normalizeData = normalizeData;
exports.normalizePadding = normalizePadding;
exports.optionsProvider = optionsProvider;
exports.orderOfMagnitude = orderOfMagnitude;
exports.polarToCartesian = polarToCartesian;
exports.precision = void 0;
exports.projectLength = projectLength;
exports.quantity = quantity;
exports.rho = rho;
exports.roundWithPrecision = roundWithPrecision;
exports.safeHasProperty = safeHasProperty;
exports.serialMap = void 0;
exports.serialize = serialize;
exports.splitIntoSegments = splitIntoSegments;
exports.sum = void 0;
exports.times = times;
var _excluded = ["easing"];
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
/**
 * This object contains all namespaces used within Chartist.
 */
var namespaces = {
  svg: "http://www.w3.org/2000/svg",
  xmlns: "http://www.w3.org/2000/xmlns/",
  xhtml: "http://www.w3.org/1999/xhtml",
  xlink: "http://www.w3.org/1999/xlink",
  ct: "http://gionkunz.github.com/chartist-js/ct"
};
/**
 * Precision level used internally in Chartist for rounding. If you require more decimal places you can increase this number.
 */
exports.namespaces = namespaces;
var precision = 8;
/**
 * A map with characters to escape for strings to be safely used as attribute values.
 */
exports.precision = precision;
var escapingMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#039;"
};

/**
 * Converts a number to a string with a unit. If a string is passed then this will be returned unmodified.
 * @return Returns the passed number value with unit.
 */
exports.escapingMap = escapingMap;
function ensureUnit(value, unit) {
  if (typeof value === "number") {
    return value + unit;
  }
  return value;
}
/**
 * Converts a number or string to a quantity object.
 * @return Returns an object containing the value as number and the unit as string.
 */
function quantity(input) {
  if (typeof input === "string") {
    var match = /^(\d+)\s*(.*)$/g.exec(input);
    return {
      value: match ? +match[1] : 0,
      unit: (match === null || match === void 0 ? void 0 : match[2]) || undefined
    };
  }
  return {
    value: Number(input)
  };
}
/**
 * Generates a-z from a number 0 to 26
 * @param n A number from 0 to 26 that will result in a letter a-z
 * @return A character from a-z based on the input number n
 */
function alphaNumerate(n) {
  // Limit to a-z
  return String.fromCharCode(97 + n % 26);
}
var EPSILON = 2.221e-16;
/**
 * Calculate the order of magnitude for the chart scale
 * @param value The value Range of the chart
 * @return The order of magnitude
 */
exports.EPSILON = EPSILON;
function orderOfMagnitude(value) {
  return Math.floor(Math.log(Math.abs(value)) / Math.LN10);
}
/**
 * Project a data length into screen coordinates (pixels)
 * @param axisLength The svg element for the chart
 * @param length Single data value from a series array
 * @param bounds All the values to set the bounds of the chart
 * @return The projected data length in pixels
 */
function projectLength(axisLength, length, bounds) {
  return length / bounds.range * axisLength;
}
/**
 * This helper function can be used to round values with certain precision level after decimal. This is used to prevent rounding errors near float point precision limit.
 * @param value The value that should be rounded with precision
 * @param [digits] The number of digits after decimal used to do the rounding
 * @returns Rounded value
 */
function roundWithPrecision(value, digits) {
  var precision$1 = Math.pow(10, digits || precision);
  return Math.round(value * precision$1) / precision$1;
}
/**
 * Pollard Rho Algorithm to find smallest factor of an integer value. There are more efficient algorithms for factorization, but this one is quite efficient and not so complex.
 * @param num An integer number where the smallest factor should be searched for
 * @returns The smallest integer factor of the parameter num.
 */
function rho(num) {
  if (num === 1) {
    return num;
  }
  function gcd(p, q) {
    if (p % q === 0) {
      return q;
    } else {
      return gcd(q, p % q);
    }
  }
  function f(x) {
    return x * x + 1;
  }
  var x1 = 2;
  var x2 = 2;
  var divisor;
  if (num % 2 === 0) {
    return 2;
  }
  do {
    x1 = f(x1) % num;
    x2 = f(f(x2)) % num;
    divisor = gcd(Math.abs(x1 - x2), num);
  } while (divisor === 1);
  return divisor;
}
/**
 * Calculate cartesian coordinates of polar coordinates
 * @param centerX X-axis coordinates of center point of circle segment
 * @param centerY X-axis coordinates of center point of circle segment
 * @param radius Radius of circle segment
 * @param angleInDegrees Angle of circle segment in degrees
 * @return Coordinates of point on circumference
 */
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
}

/**
 * Calculate and retrieve all the bounds for the chart and return them in one array
 * @param axisLength The length of the Axis used for
 * @param highLow An object containing a high and low property indicating the value range of the chart.
 * @param scaleMinSpace The minimum projected length a step should result in
 * @param onlyInteger
 * @return All the values to set the bounds of the chart
 */
function getBounds(axisLength, highLow, scaleMinSpace) {
  var onlyInteger = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
  var bounds = {
    high: highLow.high,
    low: highLow.low,
    valueRange: 0,
    oom: 0,
    step: 0,
    min: 0,
    max: 0,
    range: 0,
    numberOfSteps: 0,
    values: []
  };
  bounds.valueRange = bounds.high - bounds.low;
  bounds.oom = orderOfMagnitude(bounds.valueRange);
  bounds.step = Math.pow(10, bounds.oom);
  bounds.min = Math.floor(bounds.low / bounds.step) * bounds.step;
  bounds.max = Math.ceil(bounds.high / bounds.step) * bounds.step;
  bounds.range = bounds.max - bounds.min;
  bounds.numberOfSteps = Math.round(bounds.range / bounds.step);
  // Optimize scale step by checking if subdivision is possible based on horizontalGridMinSpace
  // If we are already below the scaleMinSpace value we will scale up
  var length = projectLength(axisLength, bounds.step, bounds);
  var scaleUp = length < scaleMinSpace;
  var smallestFactor = onlyInteger ? rho(bounds.range) : 0;
  // First check if we should only use integer steps and if step 1 is still larger than scaleMinSpace so we can use 1
  if (onlyInteger && projectLength(axisLength, 1, bounds) >= scaleMinSpace) {
    bounds.step = 1;
  } else if (onlyInteger && smallestFactor < bounds.step && projectLength(axisLength, smallestFactor, bounds) >= scaleMinSpace) {
    // If step 1 was too small, we can try the smallest factor of range
    // If the smallest factor is smaller than the current bounds.step and the projected length of smallest factor
    // is larger than the scaleMinSpace we should go for it.
    bounds.step = smallestFactor;
  } else {
    // Trying to divide or multiply by 2 and find the best step value
    var optimizationCounter = 0;
    for (;;) {
      if (scaleUp && projectLength(axisLength, bounds.step, bounds) <= scaleMinSpace) {
        bounds.step *= 2;
      } else if (!scaleUp && projectLength(axisLength, bounds.step / 2, bounds) >= scaleMinSpace) {
        bounds.step /= 2;
        if (onlyInteger && bounds.step % 1 !== 0) {
          bounds.step *= 2;
          break;
        }
      } else {
        break;
      }
      if (optimizationCounter++ > 1000) {
        throw new Error("Exceeded maximum number of iterations while optimizing scale step!");
      }
    }
  }
  bounds.step = Math.max(bounds.step, EPSILON);
  function safeIncrement(value, increment) {
    // If increment is too small use *= (1+EPSILON) as a simple nextafter
    if (value === (value += increment)) {
      value *= 1 + (increment > 0 ? EPSILON : -EPSILON);
    }
    return value;
  }
  // Narrow min and max based on new step
  var newMin = bounds.min;
  var newMax = bounds.max;
  while (newMin + bounds.step <= bounds.low) {
    newMin = safeIncrement(newMin, bounds.step);
  }
  while (newMax - bounds.step >= bounds.high) {
    newMax = safeIncrement(newMax, -bounds.step);
  }
  bounds.min = newMin;
  bounds.max = newMax;
  bounds.range = bounds.max - bounds.min;
  var values = [];
  for (var i = bounds.min; i <= bounds.max; i = safeIncrement(i, bounds.step)) {
    var value = roundWithPrecision(i);
    if (value !== values[values.length - 1]) {
      values.push(value);
    }
  }
  bounds.values = values;
  return bounds;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extend() {
  var target = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }
  for (var i = 0; i < sources.length; i++) {
    var source = sources[i];
    for (var prop in source) {
      var sourceProp = source[prop];
      if (_typeof(sourceProp) === "object" && sourceProp !== null && !(sourceProp instanceof Array)) {
        target[prop] = extend(target[prop], sourceProp);
      } else {
        target[prop] = sourceProp;
      }
    }
  }
  return target;
}

/**
 * Helps to simplify functional style code
 * @param n This exact value will be returned by the noop function
 * @return The same value that was provided to the n parameter
 */
var noop = function noop(n) {
  return n;
};
exports.noop = noop;
function times(length, filler) {
  return Array.from({
    length: length
  }, filler ? function (_, i) {
    return filler(i);
  } : function () {
    return void 0;
  });
}
/**
 * Sum helper to be used in reduce functions
 */
var sum = function sum(previous, current) {
  return previous + (current ? current : 0);
};
/**
 * Map for multi dimensional arrays where their nested arrays will be mapped in serial. The output array will have the length of the largest nested array. The callback function is called with variable arguments where each argument is the nested array value (or undefined if there are no more values).
 *
 * For example:
 * @example
 * ```ts
 * const data = [[1, 2], [3], []];
 * serialMap(data, cb);
 *
 * // where cb will be called 2 times
 * // 1. call arguments: (1, 3, undefined)
 * // 2. call arguments: (2, undefined, undefined)
 * ```
 */
exports.sum = sum;
var serialMap = function serialMap(array, callback) {
  return times(Math.max.apply(Math, _toConsumableArray(array.map(function (element) {
    return element.length;
  }))), function (index) {
    return callback.apply(void 0, _toConsumableArray(array.map(function (element) {
      return element[index];
    })));
  });
};
exports.serialMap = serialMap;
function safeHasProperty(target, property) {
  return target !== null && _typeof(target) === "object" && Reflect.has(target, property);
}
function isNumeric(value) {
  return value !== null && isFinite(value);
}
/**
 * Returns true on all falsey values except the numeric value 0.
 */
function isFalseyButZero(value) {
  return !value && value !== 0;
}
function getNumberOrUndefined(value) {
  return isNumeric(value) ? Number(value) : undefined;
}
/**
 * Checks if value is array of arrays or not.
 */
function isArrayOfArrays(data) {
  if (!Array.isArray(data)) {
    return false;
  }
  return data.every(Array.isArray);
}
/**
 * Loop over array.
 */
function each(list, callback) {
  var reverse = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
  var index = 0;
  list[reverse ? "reduceRight" : "reduce"](function (_, item, itemIndex) {
    return callback(item, index++, itemIndex);
  }, void 0);
}

/**
 * Get meta data of a specific value in a series.
 */
function getMetaData(seriesData, index) {
  var value = Array.isArray(seriesData) ? seriesData[index] : safeHasProperty(seriesData, "data") ? seriesData.data[index] : null;
  return safeHasProperty(value, "meta") ? value.meta : undefined;
}
function isDataHoleValue(value) {
  return value === null || value === undefined || typeof value === "number" && isNaN(value);
}
/**
 * Checks if value is array of series objects.
 */
function isArrayOfSeries(value) {
  return Array.isArray(value) && value.every(function (_) {
    return Array.isArray(_) || safeHasProperty(_, "data");
  });
}
/**
 * Checks if provided value object is multi value (contains x or y properties)
 */
function isMultiValue(value) {
  return _typeof(value) === "object" && value !== null && (Reflect.has(value, "x") || Reflect.has(value, "y"));
}
/**
 * Gets a value from a dimension `value.x` or `value.y` while returning value directly if it's a valid numeric value. If the value is not numeric and it's falsey this function will return `defaultValue`.
 */
function getMultiValue(value) {
  var dimension = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "y";
  if (isMultiValue(value) && safeHasProperty(value, dimension)) {
    return getNumberOrUndefined(value[dimension]);
  } else {
    return getNumberOrUndefined(value);
  }
}

/**
 * Get highest and lowest value of data array. This Array contains the data that will be visualized in the chart.
 * @param data The array that contains the data to be visualized in the chart
 * @param options The Object that contains the chart options
 * @param dimension Axis dimension 'x' or 'y' used to access the correct value and high / low configuration
 * @return An object that contains the highest and lowest value that will be visualized on the chart.
 */
function getHighLow(data, options, dimension) {
  // TODO: Remove workaround for deprecated global high / low config. Axis high / low configuration is preferred
  options = _objectSpread(_objectSpread({}, options), dimension ? dimension === "x" ? options.axisX : options.axisY : {});
  var highLow = {
    high: options.high === undefined ? -Number.MAX_VALUE : +options.high,
    low: options.low === undefined ? Number.MAX_VALUE : +options.low
  };
  var findHigh = options.high === undefined;
  var findLow = options.low === undefined;
  // Function to recursively walk through arrays and find highest and lowest number
  function recursiveHighLow(sourceData) {
    if (isDataHoleValue(sourceData)) {
      return;
    } else if (Array.isArray(sourceData)) {
      for (var i = 0; i < sourceData.length; i++) {
        recursiveHighLow(sourceData[i]);
      }
    } else {
      var value = Number(dimension && safeHasProperty(sourceData, dimension) ? sourceData[dimension] : sourceData);
      if (findHigh && value > highLow.high) {
        highLow.high = value;
      }
      if (findLow && value < highLow.low) {
        highLow.low = value;
      }
    }
  }
  // Start to find highest and lowest number recursively
  if (findHigh || findLow) {
    recursiveHighLow(data);
  }
  // Overrides of high / low based on reference value, it will make sure that the invisible reference value is
  // used to generate the chart. This is useful when the chart always needs to contain the position of the
  // invisible reference value in the view i.e. for bipolar scales.
  if (options.referenceValue || options.referenceValue === 0) {
    highLow.high = Math.max(options.referenceValue, highLow.high);
    highLow.low = Math.min(options.referenceValue, highLow.low);
  }
  // If high and low are the same because of misconfiguration or flat data (only the same value) we need
  // to set the high or low to 0 depending on the polarity
  if (highLow.high <= highLow.low) {
    // If both values are 0 we set high to 1
    if (highLow.low === 0) {
      highLow.high = 1;
    } else if (highLow.low < 0) {
      // If we have the same negative value for the bounds we set bounds.high to 0
      highLow.high = 0;
    } else if (highLow.high > 0) {
      // If we have the same positive value for the bounds we set bounds.low to 0
      highLow.low = 0;
    } else {
      // If data array was empty, values are Number.MAX_VALUE and -Number.MAX_VALUE. Set bounds to prevent errors
      highLow.high = 1;
      highLow.low = 0;
    }
  }
  return highLow;
}
function normalizeData(data) {
  var _normalized$labels;
  var reverse = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false,
    multi = arguments.length > 2 ? arguments[2] : void 0,
    distributed = arguments.length > 3 ? arguments[3] : void 0;
  var labelCount;
  var normalized = {
    labels: (data.labels || []).slice(),
    series: normalizeSeries(data.series, multi, distributed)
  };
  var inputLabelCount = normalized.labels.length;
  // If all elements of the normalized data array are arrays we're dealing with
  // multi series data and we need to find the largest series if they are un-even
  if (isArrayOfArrays(normalized.series)) {
    // Getting the series with the the most elements
    labelCount = Math.max.apply(Math, [inputLabelCount].concat(_toConsumableArray(normalized.series.map(function (series) {
      return series.length;
    }))));
    normalized.series.forEach(function (series) {
      series.push.apply(series, _toConsumableArray(times(Math.max(0, labelCount - series.length))));
    });
  } else {
    // We're dealing with Pie data so we just take the normalized array length
    labelCount = normalized.series.length;
  }
  // Padding the labels to labelCount with empty strings
  (_normalized$labels = normalized.labels).push.apply(_normalized$labels, _toConsumableArray(times(Math.max(0, labelCount - inputLabelCount), function () {
    return "";
  })));
  if (reverse) {
    reverseData(normalized);
  }
  return normalized;
}
/**
 * Reverses the series, labels and series data arrays.
 */
function reverseData(data) {
  var ref;
  (ref = data.labels) === null || ref === void 0 ? void 0 : ref.reverse();
  data.series.reverse();
  var _iterator = _createForOfIteratorHelper(data.series),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var series = _step.value;
      if (safeHasProperty(series, "data")) {
        series.data.reverse();
      } else if (Array.isArray(series)) {
        series.reverse();
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}
function normalizeMulti(value, multi) {
  // We need to prepare multi value output (x and y data)
  var x;
  var y;
  // Single series value arrays are assumed to specify the Y-Axis value
  // For example: [1, 2] => [{x: undefined, y: 1}, {x: undefined, y: 2}]
  // If multi is a string then it's assumed that it specified which dimension should be filled as default
  if (_typeof(value) !== "object") {
    var num = getNumberOrUndefined(value);
    if (multi === "x") {
      x = num;
    } else {
      y = num;
    }
  } else {
    if (safeHasProperty(value, "x")) {
      x = getNumberOrUndefined(value.x);
    }
    if (safeHasProperty(value, "y")) {
      y = getNumberOrUndefined(value.y);
    }
  }
  if (x === undefined && y === undefined) {
    return undefined;
  }
  return {
    x: x,
    y: y
  };
}
function normalizePrimitive(value, multi) {
  if (isDataHoleValue(value)) {
    // We're dealing with a hole in the data and therefore need to return undefined
    // We're also returning undefined for multi value output
    return undefined;
  }
  if (multi) {
    return normalizeMulti(value, multi);
  }
  return getNumberOrUndefined(value);
}
function normalizeSingleSeries(series, multi) {
  if (!Array.isArray(series)) {
    // We are dealing with series object notation so we need to recurse on data property
    return normalizeSingleSeries(series.data, multi);
  }
  return series.map(function (value) {
    if (safeHasProperty(value, "value")) {
      // We are dealing with value object notation so we need to recurse on value property
      return normalizePrimitive(value.value, multi);
    }
    return normalizePrimitive(value, multi);
  });
}
function normalizeSeries(series, multi, distributed) {
  if (isArrayOfSeries(series)) {
    return series.map(function (_) {
      return normalizeSingleSeries(_, multi);
    });
  }
  var normalizedSeries = normalizeSingleSeries(series, multi);
  if (distributed) {
    return normalizedSeries.map(function (value) {
      return [value];
    });
  }
  return normalizedSeries;
}

/**
 * Splits a list of coordinates and associated values into segments. Each returned segment contains a pathCoordinates
 * valueData property describing the segment.
 *
 * With the default options, segments consist of contiguous sets of points that do not have an undefined value. Any
 * points with undefined values are discarded.
 *
 * **Options**
 * The following options are used to determine how segments are formed
 * ```javascript
 * var options = {
 *   // If fillHoles is true, undefined values are simply discarded without creating a new segment. Assuming other options are default, this returns single segment.
 *   fillHoles: false,
 *   // If increasingX is true, the coordinates in all segments have strictly increasing x-values.
 *   increasingX: false
 * };
 * ```
 *
 * @param pathCoordinates List of point coordinates to be split in the form [x1, y1, x2, y2 ... xn, yn]
 * @param valueData List of associated point values in the form [v1, v2 .. vn]
 * @param options Options set by user
 * @return List of segments, each containing a pathCoordinates and valueData property.
 */
function splitIntoSegments(pathCoordinates, valueData, options) {
  var finalOptions = _objectSpread({
    increasingX: false,
    fillHoles: false
  }, options);
  var segments = [];
  var hole = true;
  for (var i = 0; i < pathCoordinates.length; i += 2) {
    // If this value is a "hole" we set the hole flag
    if (getMultiValue(valueData[i / 2].value) === undefined) {
      // if(valueData[i / 2].value === undefined) {
      if (!finalOptions.fillHoles) {
        hole = true;
      }
    } else {
      if (finalOptions.increasingX && i >= 2 && pathCoordinates[i] <= pathCoordinates[i - 2]) {
        // X is not increasing, so we need to make sure we start a new segment
        hole = true;
      }
      // If it's a valid value we need to check if we're coming out of a hole and create a new empty segment
      if (hole) {
        segments.push({
          pathCoordinates: [],
          valueData: []
        });
        // As we have a valid value now, we are not in a "hole" anymore
        hole = false;
      }
      // Add to the segment pathCoordinates and valueData
      segments[segments.length - 1].pathCoordinates.push(pathCoordinates[i], pathCoordinates[i + 1]);
      segments[segments.length - 1].valueData.push(valueData[i / 2]);
    }
  }
  return segments;
}
function serialize(data) {
  var serialized = "";
  if (data === null || data === undefined) {
    return data;
  } else if (typeof data === "number") {
    serialized = "" + data;
  } else if (_typeof(data) === "object") {
    serialized = JSON.stringify({
      data: data
    });
  } else {
    serialized = String(data);
  }
  return Object.keys(escapingMap).reduce(function (result, key) {
    return result.replaceAll(key, escapingMap[key]);
  }, serialized);
}
function deserialize(data) {
  if (typeof data !== "string") {
    return data;
  }
  if (data === "NaN") {
    return NaN;
  }
  data = Object.keys(escapingMap).reduce(function (result, key) {
    return result.replaceAll(escapingMap[key], key);
  }, data);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var parsedData = data;
  if (typeof data === "string") {
    try {
      parsedData = JSON.parse(data);
      parsedData = parsedData.data !== undefined ? parsedData.data : parsedData;
    } catch (e) {
      /* Ingore */}
  }
  return parsedData;
}

/**
 * This helper class is to wrap multiple `Svg` elements into a list where you can call the `Svg` functions on all elements in the list with one call. This is helpful when you'd like to perform calls with `Svg` on multiple elements.
 * An instance of this class is also returned by `Svg.querySelectorAll`.
 */
var SvgList = /*#__PURE__*/function () {
  /**
  * @param nodeList An Array of SVG DOM nodes or a SVG DOM NodeList (as returned by document.querySelectorAll)
  */
  function SvgList(nodeList) {
    _classCallCheck(this, SvgList);
    this.svgElements = [];
    for (var i = 0; i < nodeList.length; i++) {
      this.svgElements.push(new Svg(nodeList[i]));
    }
  }
  _createClass(SvgList, [{
    key: "call",
    value: function call(method, args) {
      this.svgElements.forEach(function (element) {
        return Reflect.apply(element[method], element, args);
      });
      return this;
    }
  }, {
    key: "attr",
    value: function attr() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return this.call("attr", args);
    }
  }, {
    key: "elem",
    value: function elem() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return this.call("elem", args);
    }
  }, {
    key: "root",
    value: function root() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return this.call("root", args);
    }
  }, {
    key: "getNode",
    value: function getNode() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return this.call("getNode", args);
    }
  }, {
    key: "foreignObject",
    value: function foreignObject() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return this.call("foreignObject", args);
    }
  }, {
    key: "text",
    value: function text() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return this.call("text", args);
    }
  }, {
    key: "empty",
    value: function empty() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return this.call("empty", args);
    }
  }, {
    key: "remove",
    value: function remove() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return this.call("remove", args);
    }
  }, {
    key: "addClass",
    value: function addClass() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return this.call("addClass", args);
    }
  }, {
    key: "removeClass",
    value: function removeClass() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return this.call("removeClass", args);
    }
  }, {
    key: "removeAllClasses",
    value: function removeAllClasses() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return this.call("removeAllClasses", args);
    }
  }, {
    key: "animate",
    value: function animate() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return this.call("animate", args);
    }
  }]);
  return SvgList;
}();
/**
 * This Object contains some standard easing cubic bezier curves.
 * Then can be used with their name in the `Svg.animate`.
 * You can also extend the list and use your own name in the `animate` function.
 * Click the show code button to see the available bezier functions.
 */
exports.SvgList = SvgList;
var easings = {
  easeInSine: [0.47, 0, 0.745, 0.715],
  easeOutSine: [0.39, 0.575, 0.565, 1],
  easeInOutSine: [0.445, 0.05, 0.55, 0.95],
  easeInQuad: [0.55, 0.085, 0.68, 0.53],
  easeOutQuad: [0.25, 0.46, 0.45, 0.94],
  easeInOutQuad: [0.455, 0.03, 0.515, 0.955],
  easeInCubic: [0.55, 0.055, 0.675, 0.19],
  easeOutCubic: [0.215, 0.61, 0.355, 1],
  easeInOutCubic: [0.645, 0.045, 0.355, 1],
  easeInQuart: [0.895, 0.03, 0.685, 0.22],
  easeOutQuart: [0.165, 0.84, 0.44, 1],
  easeInOutQuart: [0.77, 0, 0.175, 1],
  easeInQuint: [0.755, 0.05, 0.855, 0.06],
  easeOutQuint: [0.23, 1, 0.32, 1],
  easeInOutQuint: [0.86, 0, 0.07, 1],
  easeInExpo: [0.95, 0.05, 0.795, 0.035],
  easeOutExpo: [0.19, 1, 0.22, 1],
  easeInOutExpo: [1, 0, 0, 1],
  easeInCirc: [0.6, 0.04, 0.98, 0.335],
  easeOutCirc: [0.075, 0.82, 0.165, 1],
  easeInOutCirc: [0.785, 0.135, 0.15, 0.86],
  easeInBack: [0.6, -0.28, 0.735, 0.045],
  easeOutBack: [0.175, 0.885, 0.32, 1.275],
  easeInOutBack: [0.68, -0.55, 0.265, 1.55]
};
exports.easings = easings;
function createAnimation(element, attribute, animationDefinition) {
  var createGuided = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false,
    eventEmitter = arguments.length > 4 ? arguments[4] : void 0;
  var easing = animationDefinition.easing,
    def = _objectWithoutProperties(animationDefinition, _excluded);
  var attributeProperties = {};
  var animationEasing;
  var timeout;
  // Check if an easing is specified in the definition object and delete it from the object as it will not
  // be part of the animate element attributes.
  if (easing) {
    // If already an easing Bézier curve array we take it or we lookup a easing array in the Easing object
    animationEasing = Array.isArray(easing) ? easing : easings[easing];
  }
  // If numeric dur or begin was provided we assume milli seconds
  def.begin = ensureUnit(def.begin, "ms");
  def.dur = ensureUnit(def.dur, "ms");
  if (animationEasing) {
    def.calcMode = "spline";
    def.keySplines = animationEasing.join(" ");
    def.keyTimes = "0;1";
  }
  // Adding "fill: freeze" if we are in guided mode and set initial attribute values
  if (createGuided) {
    def.fill = "freeze";
    // Animated property on our element should already be set to the animation from value in guided mode
    attributeProperties[attribute] = def.from;
    element.attr(attributeProperties);
    // In guided mode we also set begin to indefinite so we can trigger the start manually and put the begin
    // which needs to be in ms aside
    timeout = quantity(def.begin || 0).value;
    def.begin = "indefinite";
  }
  var animate = element.elem("animate", _objectSpread({
    attributeName: attribute
  }, def));
  if (createGuided) {
    // If guided we take the value that was put aside in timeout and trigger the animation manually with a timeout
    setTimeout(function () {
      // If beginElement fails we set the animated attribute to the end position and remove the animate element
      // This happens if the SMIL ElementTimeControl interface is not supported or any other problems occurred in
      // the browser. (Currently FF 34 does not support animate elements in foreignObjects)
      try {
        // @ts-expect-error Try legacy API.
        animate._node.beginElement();
      } catch (err) {
        // Set animated attribute to current animated value
        attributeProperties[attribute] = def.to;
        element.attr(attributeProperties);
        // Remove the animate element as it's no longer required
        animate.remove();
      }
    }, timeout);
  }
  var animateNode = animate.getNode();
  if (eventEmitter) {
    animateNode.addEventListener("beginEvent", function () {
      return eventEmitter.emit("animationBegin", {
        element: element,
        animate: animateNode,
        params: animationDefinition
      });
    });
  }
  animateNode.addEventListener("endEvent", function () {
    if (eventEmitter) {
      eventEmitter.emit("animationEnd", {
        element: element,
        animate: animateNode,
        params: animationDefinition
      });
    }
    if (createGuided) {
      // Set animated attribute to current animated value
      attributeProperties[attribute] = def.to;
      element.attr(attributeProperties);
      // Remove the animate element as it's no longer required
      animate.remove();
    }
  });
}

/**
 * Svg creates a new SVG object wrapper with a starting element. You can use the wrapper to fluently create sub-elements and modify them.
 */
var Svg = /*#__PURE__*/function () {
  /**
  * @param name The name of the SVG element to create or an SVG dom element which should be wrapped into Svg
  * @param attributes An object with properties that will be added as attributes to the SVG element that is created. Attributes with undefined values will not be added.
  * @param className This class or class list will be added to the SVG element
  * @param parent The parent SVG wrapper object where this newly created wrapper and it's element will be attached to as child
  * @param insertFirst If this param is set to true in conjunction with a parent element the newly created element will be added as first child element in the parent element
  */
  function Svg(name, attributes, className, parent) {
    var insertFirst = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    _classCallCheck(this, Svg);
    // If Svg is getting called with an SVG element we just return the wrapper
    if (name instanceof Element) {
      this._node = name;
    } else {
      this._node = document.createElementNS(namespaces.svg, name);
      // If this is an SVG element created then custom namespace
      if (name === "svg") {
        this.attr({
          "xmlns:ct": namespaces.ct
        });
      }
    }
    if (attributes) {
      this.attr(attributes);
    }
    if (className) {
      this.addClass(className);
    }
    if (parent) {
      if (insertFirst && parent._node.firstChild) {
        parent._node.insertBefore(this._node, parent._node.firstChild);
      } else {
        parent._node.appendChild(this._node);
      }
    }
  }
  _createClass(Svg, [{
    key: "attr",
    value: function attr(attributes, ns) {
      var _this = this;
      if (typeof attributes === "string") {
        if (ns) {
          return this._node.getAttributeNS(ns, attributes);
        } else {
          return this._node.getAttribute(attributes);
        }
      }
      Object.keys(attributes).forEach(function (key) {
        // If the attribute value is undefined we can skip this one
        if (attributes[key] === undefined) {
          return;
        }
        if (key.indexOf(":") !== -1) {
          var namespacedAttribute = key.split(":");
          _this._node.setAttributeNS(namespaces[namespacedAttribute[0]], key, String(attributes[key]));
        } else {
          _this._node.setAttribute(key, String(attributes[key]));
        }
      });
      return this;
    }
    /**
    * Create a new SVG element whose wrapper object will be selected for further operations. This way you can also create nested groups easily.
    * @param name The name of the SVG element that should be created as child element of the currently selected element wrapper
    * @param attributes An object with properties that will be added as attributes to the SVG element that is created. Attributes with undefined values will not be added.
    * @param className This class or class list will be added to the SVG element
    * @param insertFirst If this param is set to true in conjunction with a parent element the newly created element will be added as first child element in the parent element
    * @return Returns a Svg wrapper object that can be used to modify the containing SVG data
    */
  }, {
    key: "elem",
    value: function elem(name, attributes, className) {
      var insertFirst = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
      return new Svg(name, attributes, className, this, insertFirst);
    }
    /**
    * Returns the parent Chartist.SVG wrapper object
    * @return Returns a Svg wrapper around the parent node of the current node. If the parent node is not existing or it's not an SVG node then this function will return null.
    */
  }, {
    key: "parent",
    value: function parent() {
      return this._node.parentNode instanceof SVGElement ? new Svg(this._node.parentNode) : null;
    }
    /**
    * This method returns a Svg wrapper around the root SVG element of the current tree.
    * @return The root SVG element wrapped in a Svg element
    */
  }, {
    key: "root",
    value: function root() {
      var node = this._node;
      while (node.nodeName !== "svg") {
        if (node.parentElement) {
          node = node.parentElement;
        } else {
          break;
        }
      }
      return new Svg(node);
    }
    /**
    * Find the first child SVG element of the current element that matches a CSS selector. The returned object is a Svg wrapper.
    * @param selector A CSS selector that is used to query for child SVG elements
    * @return The SVG wrapper for the element found or null if no element was found
    */
  }, {
    key: "querySelector",
    value: function querySelector(selector) {
      var foundNode = this._node.querySelector(selector);
      return foundNode ? new Svg(foundNode) : null;
    }
    /**
    * Find the all child SVG elements of the current element that match a CSS selector. The returned object is a Svg.List wrapper.
    * @param selector A CSS selector that is used to query for child SVG elements
    * @return The SVG wrapper list for the element found or null if no element was found
    */
  }, {
    key: "querySelectorAll",
    value: function querySelectorAll(selector) {
      var foundNodes = this._node.querySelectorAll(selector);
      return new SvgList(foundNodes);
    }
    /**
    * Returns the underlying SVG node for the current element.
    */
  }, {
    key: "getNode",
    value: function getNode() {
      return this._node;
    }
    /**
    * This method creates a foreignObject (see https://developer.mozilla.org/en-US/docs/Web/SVG/Element/foreignObject) that allows to embed HTML content into a SVG graphic. With the help of foreignObjects you can enable the usage of regular HTML elements inside of SVG where they are subject for SVG positioning and transformation but the Browser will use the HTML rendering capabilities for the containing DOM.
    * @param content The DOM Node, or HTML string that will be converted to a DOM Node, that is then placed into and wrapped by the foreignObject
    * @param attributes An object with properties that will be added as attributes to the foreignObject element that is created. Attributes with undefined values will not be added.
    * @param className This class or class list will be added to the SVG element
    * @param insertFirst Specifies if the foreignObject should be inserted as first child
    * @return New wrapper object that wraps the foreignObject element
    */
  }, {
    key: "foreignObject",
    value: function foreignObject(content, attributes, className) {
      var insertFirst = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
      var contentNode;
      // If content is string then we convert it to DOM
      // TODO: Handle case where content is not a string nor a DOM Node
      if (typeof content === "string") {
        var container = document.createElement("div");
        container.innerHTML = content;
        contentNode = container.firstChild;
      } else {
        contentNode = content;
      }
      if (contentNode instanceof Element) {
        // Adding namespace to content element
        contentNode.setAttribute("xmlns", namespaces.xmlns);
      }
      // Creating the foreignObject without required extension attribute (as described here
      // http://www.w3.org/TR/SVG/extend.html#ForeignObjectElement)
      var fnObj = this.elem("foreignObject", attributes, className, insertFirst);
      // Add content to foreignObjectElement
      fnObj._node.appendChild(contentNode);
      return fnObj;
    }
    /**
    * This method adds a new text element to the current Svg wrapper.
    * @param t The text that should be added to the text element that is created
    * @return The same wrapper object that was used to add the newly created element
    */
  }, {
    key: "text",
    value: function text(t) {
      this._node.appendChild(document.createTextNode(t));
      return this;
    }
    /**
    * This method will clear all child nodes of the current wrapper object.
    * @return The same wrapper object that got emptied
    */
  }, {
    key: "empty",
    value: function empty() {
      while (this._node.firstChild) {
        this._node.removeChild(this._node.firstChild);
      }
      return this;
    }
    /**
    * This method will cause the current wrapper to remove itself from its parent wrapper. Use this method if you'd like to get rid of an element in a given DOM structure.
    * @return The parent wrapper object of the element that got removed
    */
  }, {
    key: "remove",
    value: function remove() {
      var ref;
      (ref = this._node.parentNode) === null || ref === void 0 ? void 0 : ref.removeChild(this._node);
      return this.parent();
    }
    /**
    * This method will replace the element with a new element that can be created outside of the current DOM.
    * @param newElement The new Svg object that will be used to replace the current wrapper object
    * @return The wrapper of the new element
    */
  }, {
    key: "replace",
    value: function replace(newElement) {
      var ref;
      (ref = this._node.parentNode) === null || ref === void 0 ? void 0 : ref.replaceChild(newElement._node, this._node);
      return newElement;
    }
    /**
    * This method will append an element to the current element as a child.
    * @param element The Svg element that should be added as a child
    * @param insertFirst Specifies if the element should be inserted as first child
    * @return The wrapper of the appended object
    */
  }, {
    key: "append",
    value: function append(element) {
      var insertFirst = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      if (insertFirst && this._node.firstChild) {
        this._node.insertBefore(element._node, this._node.firstChild);
      } else {
        this._node.appendChild(element._node);
      }
      return this;
    }
    /**
    * Returns an array of class names that are attached to the current wrapper element. This method can not be chained further.
    * @return A list of classes or an empty array if there are no classes on the current element
    */
  }, {
    key: "classes",
    value: function classes() {
      var classNames = this._node.getAttribute("class");
      return classNames ? classNames.trim().split(/\s+/) : [];
    }
    /**
    * Adds one or a space separated list of classes to the current element and ensures the classes are only existing once.
    * @param names A white space separated list of class names
    * @return The wrapper of the current element
    */
  }, {
    key: "addClass",
    value: function addClass(names) {
      this._node.setAttribute("class", this.classes().concat(names.trim().split(/\s+/)).filter(function (elem, pos, self) {
        return self.indexOf(elem) === pos;
      }).join(" "));
      return this;
    }
    /**
    * Removes one or a space separated list of classes from the current element.
    * @param names A white space separated list of class names
    * @return The wrapper of the current element
    */
  }, {
    key: "removeClass",
    value: function removeClass(names) {
      var removedClasses = names.trim().split(/\s+/);
      this._node.setAttribute("class", this.classes().filter(function (name) {
        return removedClasses.indexOf(name) === -1;
      }).join(" "));
      return this;
    }
    /**
    * Removes all classes from the current element.
    * @return The wrapper of the current element
    */
  }, {
    key: "removeAllClasses",
    value: function removeAllClasses() {
      this._node.setAttribute("class", "");
      return this;
    }
    /**
    * Get element height using `getBoundingClientRect`
    * @return The elements height in pixels
    */
  }, {
    key: "height",
    value: function height() {
      return this._node.getBoundingClientRect().height;
    }
    /**
    * Get element width using `getBoundingClientRect`
    * @return The elements width in pixels
    */
  }, {
    key: "width",
    value: function width() {
      return this._node.getBoundingClientRect().width;
    }
    /**
    * The animate function lets you animate the current element with SMIL animations. You can add animations for multiple attributes at the same time by using an animation definition object. This object should contain SMIL animation attributes. Please refer to http://www.w3.org/TR/SVG/animate.html for a detailed specification about the available animation attributes. Additionally an easing property can be passed in the animation definition object. This can be a string with a name of an easing function in `Svg.Easing` or an array with four numbers specifying a cubic Bézier curve.
    * **An animations object could look like this:**
    * ```javascript
    * element.animate({
    *   opacity: {
    *     dur: 1000,
    *     from: 0,
    *     to: 1
    *   },
    *   x1: {
    *     dur: '1000ms',
    *     from: 100,
    *     to: 200,
    *     easing: 'easeOutQuart'
    *   },
    *   y1: {
    *     dur: '2s',
    *     from: 0,
    *     to: 100
    *   }
    * });
    * ```
    * **Automatic unit conversion**
    * For the `dur` and the `begin` animate attribute you can also omit a unit by passing a number. The number will automatically be converted to milli seconds.
    * **Guided mode**
    * The default behavior of SMIL animations with offset using the `begin` attribute is that the attribute will keep it's original value until the animation starts. Mostly this behavior is not desired as you'd like to have your element attributes already initialized with the animation `from` value even before the animation starts. Also if you don't specify `fill="freeze"` on an animate element or if you delete the animation after it's done (which is done in guided mode) the attribute will switch back to the initial value. This behavior is also not desired when performing simple one-time animations. For one-time animations you'd want to trigger animations immediately instead of relative to the document begin time. That's why in guided mode Svg will also use the `begin` property to schedule a timeout and manually start the animation after the timeout. If you're using multiple SMIL definition objects for an attribute (in an array), guided mode will be disabled for this attribute, even if you explicitly enabled it.
    * If guided mode is enabled the following behavior is added:
    * - Before the animation starts (even when delayed with `begin`) the animated attribute will be set already to the `from` value of the animation
    * - `begin` is explicitly set to `indefinite` so it can be started manually without relying on document begin time (creation)
    * - The animate element will be forced to use `fill="freeze"`
    * - The animation will be triggered with `beginElement()` in a timeout where `begin` of the definition object is interpreted in milli seconds. If no `begin` was specified the timeout is triggered immediately.
    * - After the animation the element attribute value will be set to the `to` value of the animation
    * - The animate element is deleted from the DOM
    * @param animations An animations object where the property keys are the attributes you'd like to animate. The properties should be objects again that contain the SMIL animation attributes (usually begin, dur, from, and to). The property begin and dur is auto converted (see Automatic unit conversion). You can also schedule multiple animations for the same attribute by passing an Array of SMIL definition objects. Attributes that contain an array of SMIL definition objects will not be executed in guided mode.
    * @param guided Specify if guided mode should be activated for this animation (see Guided mode). If not otherwise specified, guided mode will be activated.
    * @param eventEmitter If specified, this event emitter will be notified when an animation starts or ends.
    * @return The current element where the animation was added
    */
  }, {
    key: "animate",
    value: function animate(animations) {
      var _this2 = this;
      var guided = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true,
        eventEmitter = arguments.length > 2 ? arguments[2] : void 0;
      Object.keys(animations).forEach(function (attribute) {
        var attributeAnimation = animations[attribute];
        // If current attribute is an array of definition objects we create an animate for each and disable guided mode
        if (Array.isArray(attributeAnimation)) {
          attributeAnimation.forEach(function (animationDefinition) {
            return createAnimation(_this2, attribute, animationDefinition, false, eventEmitter);
          });
        } else {
          createAnimation(_this2, attribute, attributeAnimation, guided, eventEmitter);
        }
      });
      return this;
    }
  }]);
  return Svg;
}();
/**
   * @todo Only there for chartist <1 compatibility. Remove after deprecation warining.
   * @deprecated Use the animation module export `easings` directly.
   */
exports.Svg = Svg;
Svg.Easing = easings;

/**
 * Create or reinitialize the SVG element for the chart
 * @param container The containing DOM Node object that will be used to plant the SVG element
 * @param width Set the width of the SVG element. Default is 100%
 * @param height Set the height of the SVG element. Default is 100%
 * @param className Specify a class to be added to the SVG element
 * @return The created/reinitialized SVG element
 */
function createSvg(container) {
  var width = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "100%",
    height = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "100%",
    className = arguments.length > 3 ? arguments[3] : void 0;
  // Check if there is a previous SVG element in the container that contains the Chartist XML namespace and remove it
  // Since the DOM API does not support namespaces we need to manually search the returned list http://www.w3.org/TR/selectors-api/
  Array.from(container.querySelectorAll("svg")).filter(function (svg) {
    return svg.getAttributeNS(namespaces.xmlns, "ct");
  }).forEach(function (svg) {
    return container.removeChild(svg);
  });
  // Create svg object with width and height or use 100% as default
  var svg1 = new Svg("svg").attr({
    width: width,
    height: height
  }).attr({
    // TODO: Check better solution (browser support) and remove inline styles due to CSP
    style: "width: ".concat(width, "; height: ").concat(height, ";")
  });
  if (className) {
    svg1.addClass(className);
  }
  // Add the DOM node to our container
  container.appendChild(svg1.getNode());
  return svg1;
}
/**
 * Converts a number into a padding object.
 * @param padding
 * @param fallback This value is used to fill missing values if a incomplete padding object was passed
 * @returns Returns a padding object containing top, right, bottom, left properties filled with the padding number passed in as argument. If the argument is something else than a number (presumably already a correct padding object) then this argument is directly returned.
 */
function normalizePadding(padding) {
  return typeof padding === "number" ? {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  } : padding === undefined ? {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  } : {
    top: typeof padding.top === "number" ? padding.top : 0,
    right: typeof padding.right === "number" ? padding.right : 0,
    bottom: typeof padding.bottom === "number" ? padding.bottom : 0,
    left: typeof padding.left === "number" ? padding.left : 0
  };
}
/**
 * Initialize chart drawing rectangle (area where chart is drawn) x1,y1 = bottom left / x2,y2 = top right
 * @param svg The svg element for the chart
 * @param options The Object that contains all the optional values for the chart
 * @return The chart rectangles coordinates inside the svg element plus the rectangles measurements
 */
function createChartRect(svg, options) {
  var ref, ref1, ref2, ref3;
  var hasAxis = Boolean(options.axisX || options.axisY);
  var yAxisOffset = ((ref = options.axisY) === null || ref === void 0 ? void 0 : ref.offset) || 0;
  var xAxisOffset = ((ref1 = options.axisX) === null || ref1 === void 0 ? void 0 : ref1.offset) || 0;
  var yAxisPosition = (ref2 = options.axisY) === null || ref2 === void 0 ? void 0 : ref2.position;
  var xAxisPosition = (ref3 = options.axisX) === null || ref3 === void 0 ? void 0 : ref3.position;
  // If width or height results in invalid value (including 0) we fallback to the unitless settings or even 0
  var width = svg.width() || quantity(options.width).value || 0;
  var height = svg.height() || quantity(options.height).value || 0;
  var normalizedPadding = normalizePadding(options.chartPadding);
  // If settings were to small to cope with offset (legacy) and padding, we'll adjust
  width = Math.max(width, yAxisOffset + normalizedPadding.left + normalizedPadding.right);
  height = Math.max(height, xAxisOffset + normalizedPadding.top + normalizedPadding.bottom);
  var chartRect = {
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 0,
    padding: normalizedPadding,
    width: function width() {
      return this.x2 - this.x1;
    },
    height: function height() {
      return this.y1 - this.y2;
    }
  };
  if (hasAxis) {
    if (xAxisPosition === "start") {
      chartRect.y2 = normalizedPadding.top + xAxisOffset;
      chartRect.y1 = Math.max(height - normalizedPadding.bottom, chartRect.y2 + 1);
    } else {
      chartRect.y2 = normalizedPadding.top;
      chartRect.y1 = Math.max(height - normalizedPadding.bottom - xAxisOffset, chartRect.y2 + 1);
    }
    if (yAxisPosition === "start") {
      chartRect.x1 = normalizedPadding.left + yAxisOffset;
      chartRect.x2 = Math.max(width - normalizedPadding.right, chartRect.x1 + 1);
    } else {
      chartRect.x1 = normalizedPadding.left;
      chartRect.x2 = Math.max(width - normalizedPadding.right - yAxisOffset, chartRect.x1 + 1);
    }
  } else {
    chartRect.x1 = normalizedPadding.left;
    chartRect.x2 = Math.max(width - normalizedPadding.right, chartRect.x1 + 1);
    chartRect.y2 = normalizedPadding.top;
    chartRect.y1 = Math.max(height - normalizedPadding.bottom, chartRect.y2 + 1);
  }
  return chartRect;
}
/**
 * Creates a grid line based on a projected value.
 */
function createGrid(position, index, axis, offset, length, group, classes, eventEmitter) {
  var _positionalData;
  var positionalData = (_positionalData = {}, _defineProperty(_positionalData, "".concat(axis.units.pos, "1"), position), _defineProperty(_positionalData, "".concat(axis.units.pos, "2"), position), _defineProperty(_positionalData, "".concat(axis.counterUnits.pos, "1"), offset), _defineProperty(_positionalData, "".concat(axis.counterUnits.pos, "2"), offset + length), _positionalData);
  var gridElement = group.elem("line", positionalData, classes.join(" "));
  // Event for grid draw
  eventEmitter.emit("draw", _objectSpread({
    type: "grid",
    axis: axis,
    index: index,
    group: group,
    element: gridElement
  }, positionalData));
}
/**
 * Creates a grid background rect and emits the draw event.
 */
function createGridBackground(gridGroup, chartRect, className, eventEmitter) {
  var gridBackground = gridGroup.elem("rect", {
    x: chartRect.x1,
    y: chartRect.y2,
    width: chartRect.width(),
    height: chartRect.height()
  }, className, true);
  // Event for grid background draw
  eventEmitter.emit("draw", {
    type: "gridBackground",
    group: gridGroup,
    element: gridBackground
  });
}
/**
 * Creates a label based on a projected value and an axis.
 */
function createLabel(position, length, index, label, axis, axisOffset, labelOffset, group, classes, eventEmitter) {
  var _positionalData2;
  var positionalData = (_positionalData2 = {}, _defineProperty(_positionalData2, axis.units.pos, position + labelOffset[axis.units.pos]), _defineProperty(_positionalData2, axis.counterUnits.pos, labelOffset[axis.counterUnits.pos]), _defineProperty(_positionalData2, axis.units.len, length), _defineProperty(_positionalData2, axis.counterUnits.len, Math.max(0, axisOffset - 10)), _positionalData2);
  // We need to set width and height explicitly to px as span will not expand with width and height being
  // 100% in all browsers
  var stepLength = Math.round(positionalData[axis.units.len]);
  var stepCounterLength = Math.round(positionalData[axis.counterUnits.len]);
  var content = document.createElement("span");
  content.className = classes.join(" ");
  content.style[axis.units.len] = stepLength + "px";
  content.style[axis.counterUnits.len] = stepCounterLength + "px";
  content.textContent = String(label);
  var labelElement = group.foreignObject(content, _objectSpread({
    style: "overflow: visible;"
  }, positionalData));
  eventEmitter.emit("draw", _objectSpread({
    type: "label",
    axis: axis,
    index: index,
    group: group,
    element: labelElement,
    text: label
  }, positionalData));
}

/**
 * Provides options handling functionality with callback for options changes triggered by responsive options and media query matches
 * @param options Options set by user
 * @param responsiveOptions Optional functions to add responsive behavior to chart
 * @param eventEmitter The event emitter that will be used to emit the options changed events
 * @return The consolidated options object from the defaults, base and matching responsive options
 */
function optionsProvider(options, responsiveOptions, eventEmitter) {
  var currentOptions;
  var mediaQueryListeners = [];
  function updateCurrentOptions(mediaEvent) {
    var previousOptions = currentOptions;
    currentOptions = extend({}, options);
    if (responsiveOptions) {
      responsiveOptions.forEach(function (responsiveOption) {
        var mql = window.matchMedia(responsiveOption[0]);
        if (mql.matches) {
          currentOptions = extend(currentOptions, responsiveOption[1]);
        }
      });
    }
    if (eventEmitter && mediaEvent) {
      eventEmitter.emit("optionsChanged", {
        previousOptions: previousOptions,
        currentOptions: currentOptions
      });
    }
  }
  function removeMediaQueryListeners() {
    mediaQueryListeners.forEach(function (mql) {
      return mql.removeEventListener("change", updateCurrentOptions);
    });
  }
  if (!window.matchMedia) {
    throw new Error("window.matchMedia not found! Make sure you're using a polyfill.");
  } else if (responsiveOptions) {
    responsiveOptions.forEach(function (responsiveOption) {
      var mql = window.matchMedia(responsiveOption[0]);
      mql.addEventListener("change", updateCurrentOptions);
      mediaQueryListeners.push(mql);
    });
  }
  // Execute initially without an event argument so we get the correct options
  updateCurrentOptions();
  return {
    removeMediaQueryListeners: removeMediaQueryListeners,
    getCurrentOptions: function getCurrentOptions() {
      return currentOptions;
    }
  };
}

/**
 * Contains the descriptors of supported element types in a SVG path. Currently only move, line and curve are supported.
 */
var elementDescriptions = {
  m: ["x", "y"],
  l: ["x", "y"],
  c: ["x1", "y1", "x2", "y2", "x", "y"],
  a: ["rx", "ry", "xAr", "lAf", "sf", "x", "y"]
};
/**
 * Default options for newly created SVG path objects.
 */
var defaultOptions$3 = {
  // The accuracy in digit count after the decimal point. This will be used to round numbers in the SVG path. If this option is set to false then no rounding will be performed.
  accuracy: 3
};
function element(command, params, pathElements, pos, relative, data) {
  var pathElement = _objectSpread(_objectSpread({
    command: relative ? command.toLowerCase() : command.toUpperCase()
  }, params), data ? {
    data: data
  } : {});
  pathElements.splice(pos, 0, pathElement);
}
function forEachParam(pathElements, cb) {
  pathElements.forEach(function (pathElement, pathElementIndex) {
    elementDescriptions[pathElement.command.toLowerCase()].forEach(function (paramName, paramIndex) {
      cb(pathElement, paramName, pathElementIndex, paramIndex, pathElements);
    });
  });
}
var SvgPath = /*#__PURE__*/function () {
  /**
  * Used to construct a new path object.
  * @param close If set to true then this path will be closed when stringified (with a Z at the end)
  * @param options Options object that overrides the default objects. See default options for more details.
  */
  function SvgPath() {
    var close = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var options = arguments.length > 1 ? arguments[1] : undefined;
    _classCallCheck(this, SvgPath);
    this.close = close;
    this.pathElements = [];
    this.pos = 0;
    this.options = _objectSpread(_objectSpread({}, defaultOptions$3), options);
  }
  _createClass(SvgPath, [{
    key: "position",
    value: function position(pos) {
      if (pos !== undefined) {
        this.pos = Math.max(0, Math.min(this.pathElements.length, pos));
        return this;
      } else {
        return this.pos;
      }
    }
    /**
    * Removes elements from the path starting at the current position.
    * @param count Number of path elements that should be removed from the current position.
    * @return The current path object for easy call chaining.
    */
  }, {
    key: "remove",
    value: function remove(count) {
      this.pathElements.splice(this.pos, count);
      return this;
    }
    /**
    * Use this function to add a new move SVG path element.
    * @param x The x coordinate for the move element.
    * @param y The y coordinate for the move element.
    * @param relative If set to true the move element will be created with relative coordinates (lowercase letter)
    * @param data Any data that should be stored with the element object that will be accessible in pathElement
    * @return The current path object for easy call chaining.
    */
  }, {
    key: "move",
    value: function move(x, y) {
      var relative = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false,
        data = arguments.length > 3 ? arguments[3] : void 0;
      element("M", {
        x: +x,
        y: +y
      }, this.pathElements, this.pos++, relative, data);
      return this;
    }
    /**
    * Use this function to add a new line SVG path element.
    * @param x The x coordinate for the line element.
    * @param y The y coordinate for the line element.
    * @param relative If set to true the line element will be created with relative coordinates (lowercase letter)
    * @param data Any data that should be stored with the element object that will be accessible in pathElement
    * @return The current path object for easy call chaining.
    */
  }, {
    key: "line",
    value: function line(x, y) {
      var relative = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false,
        data = arguments.length > 3 ? arguments[3] : void 0;
      element("L", {
        x: +x,
        y: +y
      }, this.pathElements, this.pos++, relative, data);
      return this;
    }
    /**
    * Use this function to add a new curve SVG path element.
    * @param x1 The x coordinate for the first control point of the bezier curve.
    * @param y1 The y coordinate for the first control point of the bezier curve.
    * @param x2 The x coordinate for the second control point of the bezier curve.
    * @param y2 The y coordinate for the second control point of the bezier curve.
    * @param x The x coordinate for the target point of the curve element.
    * @param y The y coordinate for the target point of the curve element.
    * @param relative If set to true the curve element will be created with relative coordinates (lowercase letter)
    * @param data Any data that should be stored with the element object that will be accessible in pathElement
    * @return The current path object for easy call chaining.
    */
  }, {
    key: "curve",
    value: function curve(x1, y1, x2, y2, x, y) {
      var relative = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : false,
        data = arguments.length > 7 ? arguments[7] : void 0;
      element("C", {
        x1: +x1,
        y1: +y1,
        x2: +x2,
        y2: +y2,
        x: +x,
        y: +y
      }, this.pathElements, this.pos++, relative, data);
      return this;
    }
    /**
    * Use this function to add a new non-bezier curve SVG path element.
    * @param rx The radius to be used for the x-axis of the arc.
    * @param ry The radius to be used for the y-axis of the arc.
    * @param xAr Defines the orientation of the arc
    * @param lAf Large arc flag
    * @param sf Sweep flag
    * @param x The x coordinate for the target point of the curve element.
    * @param y The y coordinate for the target point of the curve element.
    * @param relative If set to true the curve element will be created with relative coordinates (lowercase letter)
    * @param data Any data that should be stored with the element object that will be accessible in pathElement
    * @return The current path object for easy call chaining.
    */
  }, {
    key: "arc",
    value: function arc(rx, ry, xAr, lAf, sf, x, y) {
      var relative = arguments.length > 7 && arguments[7] !== void 0 ? arguments[7] : false,
        data = arguments.length > 8 ? arguments[8] : void 0;
      element("A", {
        rx: rx,
        ry: ry,
        xAr: xAr,
        lAf: lAf,
        sf: sf,
        x: x,
        y: y
      }, this.pathElements, this.pos++, relative, data);
      return this;
    }
    /**
    * Parses an SVG path seen in the d attribute of path elements, and inserts the parsed elements into the existing path object at the current cursor position. Any closing path indicators (Z at the end of the path) will be ignored by the parser as this is provided by the close option in the options of the path object.
    * @param path Any SVG path that contains move (m), line (l) or curve (c) components.
    * @return The current path object for easy call chaining.
    */
  }, {
    key: "parse",
    value: function parse(path) {
      var _this$pathElements;
      // Parsing the SVG path string into an array of arrays [['M', '10', '10'], ['L', '100', '100']]
      var chunks = path.replace(/([A-Za-z])(-?[0-9])/g, "$1 $2").replace(/([0-9])([A-Za-z])/g, "$1 $2").split(/[\s,]+/).reduce(function (result, pathElement) {
        if (pathElement.match(/[A-Za-z]/)) {
          result.push([]);
        }
        result[result.length - 1].push(pathElement);
        return result;
      }, []);
      // If this is a closed path we remove the Z at the end because this is determined by the close option
      if (chunks[chunks.length - 1][0].toUpperCase() === "Z") {
        chunks.pop();
      }
      // Using svgPathElementDescriptions to map raw path arrays into objects that contain the command and the parameters
      // For example {command: 'M', x: '10', y: '10'}
      var elements = chunks.map(function (chunk) {
        var command = chunk.shift();
        var description = elementDescriptions[command.toLowerCase()];
        return _objectSpread({
          command: command
        }, description.reduce(function (result, paramName, index) {
          result[paramName] = +chunk[index];
          return result;
        }, {}));
      });
      // Preparing a splice call with the elements array as var arg params and insert the parsed elements at the current position
      (_this$pathElements = this.pathElements).splice.apply(_this$pathElements, [this.pos, 0].concat(_toConsumableArray(elements)));
      // Increase the internal position by the element count
      this.pos += elements.length;
      return this;
    }
    /**
    * This function renders to current SVG path object into a final SVG string that can be used in the d attribute of SVG path elements. It uses the accuracy option to round big decimals. If the close parameter was set in the constructor of this path object then a path closing Z will be appended to the output string.
    */
  }, {
    key: "stringify",
    value: function stringify() {
      var _this3 = this;
      var accuracyMultiplier = Math.pow(10, this.options.accuracy);
      return this.pathElements.reduce(function (path, pathElement) {
        var params = elementDescriptions[pathElement.command.toLowerCase()].map(function (paramName) {
          var value = pathElement[paramName];
          return _this3.options.accuracy ? Math.round(value * accuracyMultiplier) / accuracyMultiplier : value;
        });
        return path + pathElement.command + params.join(",");
      }, "") + (this.close ? "Z" : "");
    }
    /**
    * Scales all elements in the current SVG path object. There is an individual parameter for each coordinate. Scaling will also be done for control points of curves, affecting the given coordinate.
    * @param x The number which will be used to scale the x, x1 and x2 of all path elements.
    * @param y The number which will be used to scale the y, y1 and y2 of all path elements.
    * @return The current path object for easy call chaining.
    */
  }, {
    key: "scale",
    value: function scale(x, y) {
      forEachParam(this.pathElements, function (pathElement, paramName) {
        pathElement[paramName] *= paramName[0] === "x" ? x : y;
      });
      return this;
    }
    /**
    * Translates all elements in the current SVG path object. The translation is relative and there is an individual parameter for each coordinate. Translation will also be done for control points of curves, affecting the given coordinate.
    * @param x The number which will be used to translate the x, x1 and x2 of all path elements.
    * @param y The number which will be used to translate the y, y1 and y2 of all path elements.
    * @return The current path object for easy call chaining.
    */
  }, {
    key: "translate",
    value: function translate(x, y) {
      forEachParam(this.pathElements, function (pathElement, paramName) {
        pathElement[paramName] += paramName[0] === "x" ? x : y;
      });
      return this;
    }
    /**
    * This function will run over all existing path elements and then loop over their attributes. The callback function will be called for every path element attribute that exists in the current path.
    * The method signature of the callback function looks like this:
    * ```javascript
    * function(pathElement, paramName, pathElementIndex, paramIndex, pathElements)
    * ```
    * If something else than undefined is returned by the callback function, this value will be used to replace the old value. This allows you to build custom transformations of path objects that can't be achieved using the basic transformation functions scale and translate.
    * @param transformFnc The callback function for the transformation. Check the signature in the function description.
    * @return The current path object for easy call chaining.
    */
  }, {
    key: "transform",
    value: function transform(transformFnc) {
      forEachParam(this.pathElements, function (pathElement, paramName, pathElementIndex, paramIndex, pathElements) {
        var transformed = transformFnc(pathElement, paramName, pathElementIndex, paramIndex, pathElements);
        if (transformed || transformed === 0) {
          pathElement[paramName] = transformed;
        }
      });
      return this;
    }
    /**
    * This function clones a whole path object with all its properties. This is a deep clone and path element objects will also be cloned.
    * @param close Optional option to set the new cloned path to closed. If not specified or false, the original path close option will be used.
    */
  }, {
    key: "clone",
    value: function clone() {
      var close = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
      var clone = new SvgPath(close || this.close);
      clone.pos = this.pos;
      clone.pathElements = this.pathElements.slice().map(function (pathElement) {
        return _objectSpread({}, pathElement);
      });
      clone.options = _objectSpread({}, this.options);
      return clone;
    }
    /**
    * Split a Svg.Path object by a specific command in the path chain. The path chain will be split and an array of newly created paths objects will be returned. This is useful if you'd like to split an SVG path by it's move commands, for example, in order to isolate chunks of drawings.
    * @param command The command you'd like to use to split the path
    */
  }, {
    key: "splitByCommand",
    value: function splitByCommand(command) {
      var split = [new SvgPath()];
      this.pathElements.forEach(function (pathElement) {
        if (pathElement.command === command.toUpperCase() && split[split.length - 1].pathElements.length !== 0) {
          split.push(new SvgPath());
        }
        split[split.length - 1].pathElements.push(pathElement);
      });
      return split;
    }
  }], [{
    key: "join",
    value:
    /**
    * This static function on `SvgPath` is joining multiple paths together into one paths.
    * @param paths A list of paths to be joined together. The order is important.
    * @param close If the newly created path should be a closed path
    * @param options Path options for the newly created path.
    */
    function join(paths) {
      var close = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false,
        options = arguments.length > 2 ? arguments[2] : void 0;
      var joinedPath = new SvgPath(close, options);
      for (var i = 0; i < paths.length; i++) {
        var path = paths[i];
        for (var j = 0; j < path.pathElements.length; j++) {
          joinedPath.pathElements.push(path.pathElements[j]);
        }
      }
      return joinedPath;
    }
  }]);
  return SvgPath;
}();
/**
 * This interpolation function does not smooth the path and the result is only containing lines and no curves.
 *
 * @example
 * ```ts
 * const chart = new LineChart('.ct-chart', {
 *   labels: [1, 2, 3, 4, 5],
 *   series: [[1, 2, 8, 1, 7]]
 * }, {
 *   lineSmooth: Interpolation.none({
 *     fillHoles: false
 *   })
 * });
 * ```
 */
exports.SvgPath = SvgPath;
function none(options) {
  var finalOptions = _objectSpread({
    fillHoles: false
  }, options);
  return function noneInterpolation(pathCoordinates, valueData) {
    var path = new SvgPath();
    var hole = true;
    for (var i = 0; i < pathCoordinates.length; i += 2) {
      var currX = pathCoordinates[i];
      var currY = pathCoordinates[i + 1];
      var currData = valueData[i / 2];
      if (getMultiValue(currData.value) !== undefined) {
        if (hole) {
          path.move(currX, currY, false, currData);
        } else {
          path.line(currX, currY, false, currData);
        }
        hole = false;
      } else if (!finalOptions.fillHoles) {
        hole = true;
      }
    }
    return path;
  };
}

/**
 * Simple smoothing creates horizontal handles that are positioned with a fraction of the length between two data points. You can use the divisor option to specify the amount of smoothing.
 *
 * Simple smoothing can be used instead of `Chartist.Smoothing.cardinal` if you'd like to get rid of the artifacts it produces sometimes. Simple smoothing produces less flowing lines but is accurate by hitting the points and it also doesn't swing below or above the given data point.
 *
 * All smoothing functions within Chartist are factory functions that accept an options parameter. The simple interpolation function accepts one configuration parameter `divisor`, between 1 and ∞, which controls the smoothing characteristics.
 *
 * @example
 * ```ts
 * const chart = new LineChart('.ct-chart', {
 *   labels: [1, 2, 3, 4, 5],
 *   series: [[1, 2, 8, 1, 7]]
 * }, {
 *   lineSmooth: Interpolation.simple({
 *     divisor: 2,
 *     fillHoles: false
 *   })
 * });
 * ```
 *
 * @param options The options of the simple interpolation factory function.
 */
function simple(options) {
  var finalOptions = _objectSpread({
    divisor: 2,
    fillHoles: false
  }, options);
  var d = 1 / Math.max(1, finalOptions.divisor);
  return function simpleInterpolation(pathCoordinates, valueData) {
    var path = new SvgPath();
    var prevX = 0;
    var prevY = 0;
    var prevData;
    for (var i = 0; i < pathCoordinates.length; i += 2) {
      var currX = pathCoordinates[i];
      var currY = pathCoordinates[i + 1];
      var length = (currX - prevX) * d;
      var currData = valueData[i / 2];
      if (currData.value !== undefined) {
        if (prevData === undefined) {
          path.move(currX, currY, false, currData);
        } else {
          path.curve(prevX + length, prevY, currX - length, currY, currX, currY, false, currData);
        }
        prevX = currX;
        prevY = currY;
        prevData = currData;
      } else if (!finalOptions.fillHoles) {
        prevX = prevY = 0;
        prevData = undefined;
      }
    }
    return path;
  };
}

/**
 * Step interpolation will cause the line chart to move in steps rather than diagonal or smoothed lines. This interpolation will create additional points that will also be drawn when the `showPoint` option is enabled.
 *
 * All smoothing functions within Chartist are factory functions that accept an options parameter. The step interpolation function accepts one configuration parameter `postpone`, that can be `true` or `false`. The default value is `true` and will cause the step to occur where the value actually changes. If a different behaviour is needed where the step is shifted to the left and happens before the actual value, this option can be set to `false`.
 *
 * @example
 * ```ts
 * const chart = new Chartist.Line('.ct-chart', {
 *   labels: [1, 2, 3, 4, 5],
 *   series: [[1, 2, 8, 1, 7]]
 * }, {
 *   lineSmooth: Interpolation.step({
 *     postpone: true,
 *     fillHoles: false
 *   })
 * });
 * ```
 */
function step(options) {
  var finalOptions = _objectSpread({
    postpone: true,
    fillHoles: false
  }, options);
  return function stepInterpolation(pathCoordinates, valueData) {
    var path = new SvgPath();
    var prevX = 0;
    var prevY = 0;
    var prevData;
    for (var i = 0; i < pathCoordinates.length; i += 2) {
      var currX = pathCoordinates[i];
      var currY = pathCoordinates[i + 1];
      var currData = valueData[i / 2];
      // If the current point is also not a hole we can draw the step lines
      if (currData.value !== undefined) {
        if (prevData === undefined) {
          path.move(currX, currY, false, currData);
        } else {
          if (finalOptions.postpone) {
            // If postponed we should draw the step line with the value of the previous value
            path.line(currX, prevY, false, prevData);
          } else {
            // If not postponed we should draw the step line with the value of the current value
            path.line(prevX, currY, false, currData);
          }
          // Line to the actual point (this should only be a Y-Axis movement
          path.line(currX, currY, false, currData);
        }
        prevX = currX;
        prevY = currY;
        prevData = currData;
      } else if (!finalOptions.fillHoles) {
        prevX = prevY = 0;
        prevData = undefined;
      }
    }
    return path;
  };
}

/**
 * Cardinal / Catmull-Rome spline interpolation is the default smoothing function in Chartist. It produces nice results where the splines will always meet the points. It produces some artifacts though when data values are increased or decreased rapidly. The line may not follow a very accurate path and if the line should be accurate this smoothing function does not produce the best results.
 *
 * Cardinal splines can only be created if there are more than two data points. If this is not the case this smoothing will fallback to `Chartist.Smoothing.none`.
 *
 * All smoothing functions within Chartist are factory functions that accept an options parameter. The cardinal interpolation function accepts one configuration parameter `tension`, between 0 and 1, which controls the smoothing intensity.
 *
 * @example
 * ```ts
 * const chart = new LineChart('.ct-chart', {
 *   labels: [1, 2, 3, 4, 5],
 *   series: [[1, 2, 8, 1, 7]]
 * }, {
 *   lineSmooth: Interpolation.cardinal({
 *     tension: 1,
 *     fillHoles: false
 *   })
 * });
 * ```
 *
 * @param options The options of the cardinal factory function.
 */
function cardinal(options) {
  var finalOptions = _objectSpread({
    tension: 1,
    fillHoles: false
  }, options);
  var t = Math.min(1, Math.max(0, finalOptions.tension));
  var c = 1 - t;
  return function cardinalInterpolation(pathCoordinates, valueData) {
    // First we try to split the coordinates into segments
    // This is necessary to treat "holes" in line charts
    var segments = splitIntoSegments(pathCoordinates, valueData, {
      fillHoles: finalOptions.fillHoles
    });
    if (!segments.length) {
      // If there were no segments return 'none' interpolation
      return none()([], []);
    } else if (segments.length > 1) {
      // If the split resulted in more that one segment we need to interpolate each segment individually and join them
      // afterwards together into a single path.
      // For each segment we will recurse the cardinal function
      // Join the segment path data into a single path and return
      return SvgPath.join(segments.map(function (segment) {
        return cardinalInterpolation(segment.pathCoordinates, segment.valueData);
      }));
    } else {
      // If there was only one segment we can proceed regularly by using pathCoordinates and valueData from the first
      // segment
      pathCoordinates = segments[0].pathCoordinates;
      valueData = segments[0].valueData;
      // If less than two points we need to fallback to no smoothing
      if (pathCoordinates.length <= 4) {
        return none()(pathCoordinates, valueData);
      }
      var path = new SvgPath().move(pathCoordinates[0], pathCoordinates[1], false, valueData[0]);
      var z = false;
      for (var i = 0, iLen = pathCoordinates.length; iLen - 2 * Number(!z) > i; i += 2) {
        var p = [{
          x: +pathCoordinates[i - 2],
          y: +pathCoordinates[i - 1]
        }, {
          x: +pathCoordinates[i],
          y: +pathCoordinates[i + 1]
        }, {
          x: +pathCoordinates[i + 2],
          y: +pathCoordinates[i + 3]
        }, {
          x: +pathCoordinates[i + 4],
          y: +pathCoordinates[i + 5]
        }];
        {
          if (iLen - 4 === i) {
            p[3] = p[2];
          } else if (!i) {
            p[0] = {
              x: +pathCoordinates[i],
              y: +pathCoordinates[i + 1]
            };
          }
        }
        path.curve(t * (-p[0].x + 6 * p[1].x + p[2].x) / 6 + c * p[2].x, t * (-p[0].y + 6 * p[1].y + p[2].y) / 6 + c * p[2].y, t * (p[1].x + 6 * p[2].x - p[3].x) / 6 + c * p[2].x, t * (p[1].y + 6 * p[2].y - p[3].y) / 6 + c * p[2].y, p[2].x, p[2].y, false, valueData[(i + 2) / 2]);
      }
      return path;
    }
  };
}

/**
 * Monotone Cubic spline interpolation produces a smooth curve which preserves monotonicity. Unlike cardinal splines, the curve will not extend beyond the range of y-values of the original data points.
 *
 * Monotone Cubic splines can only be created if there are more than two data points. If this is not the case this smoothing will fallback to `Chartist.Smoothing.none`.
 *
 * The x-values of subsequent points must be increasing to fit a Monotone Cubic spline. If this condition is not met for a pair of adjacent points, then there will be a break in the curve between those data points.
 *
 * All smoothing functions within Chartist are factory functions that accept an options parameter.
 *
 * @example
 * ```ts
 * const chart = new LineChart('.ct-chart', {
 *   labels: [1, 2, 3, 4, 5],
 *   series: [[1, 2, 8, 1, 7]]
 * }, {
 *   lineSmooth: Interpolation.monotoneCubic({
 *     fillHoles: false
 *   })
 * });
 * ```
 *
 * @param options The options of the monotoneCubic factory function.
 */
function monotoneCubic(options) {
  var finalOptions = _objectSpread({
    fillHoles: false
  }, options);
  return function monotoneCubicInterpolation(pathCoordinates, valueData) {
    // First we try to split the coordinates into segments
    // This is necessary to treat "holes" in line charts
    var segments = splitIntoSegments(pathCoordinates, valueData, {
      fillHoles: finalOptions.fillHoles,
      increasingX: true
    });
    if (!segments.length) {
      // If there were no segments return 'Chartist.Interpolation.none'
      return none()([], []);
    } else if (segments.length > 1) {
      // If the split resulted in more that one segment we need to interpolate each segment individually and join them
      // afterwards together into a single path.
      // For each segment we will recurse the monotoneCubic fn function
      // Join the segment path data into a single path and return
      return SvgPath.join(segments.map(function (segment) {
        return monotoneCubicInterpolation(segment.pathCoordinates, segment.valueData);
      }));
    } else {
      // If there was only one segment we can proceed regularly by using pathCoordinates and valueData from the first
      // segment
      pathCoordinates = segments[0].pathCoordinates;
      valueData = segments[0].valueData;
      // If less than three points we need to fallback to no smoothing
      if (pathCoordinates.length <= 4) {
        return none()(pathCoordinates, valueData);
      }
      var xs = [];
      var ys = [];
      var n = pathCoordinates.length / 2;
      var ms = [];
      var ds = [];
      var dys = [];
      var dxs = [];
      // Populate x and y coordinates into separate arrays, for readability
      for (var i = 0; i < n; i++) {
        xs[i] = pathCoordinates[i * 2];
        ys[i] = pathCoordinates[i * 2 + 1];
      }
      // Calculate deltas and derivative
      for (var i1 = 0; i1 < n - 1; i1++) {
        dys[i1] = ys[i1 + 1] - ys[i1];
        dxs[i1] = xs[i1 + 1] - xs[i1];
        ds[i1] = dys[i1] / dxs[i1];
      }
      // Determine desired slope (m) at each point using Fritsch-Carlson method
      // See: http://math.stackexchange.com/questions/45218/implementation-of-monotone-cubic-interpolation
      ms[0] = ds[0];
      ms[n - 1] = ds[n - 2];
      for (var i2 = 1; i2 < n - 1; i2++) {
        if (ds[i2] === 0 || ds[i2 - 1] === 0 || ds[i2 - 1] > 0 !== ds[i2] > 0) {
          ms[i2] = 0;
        } else {
          ms[i2] = 3 * (dxs[i2 - 1] + dxs[i2]) / ((2 * dxs[i2] + dxs[i2 - 1]) / ds[i2 - 1] + (dxs[i2] + 2 * dxs[i2 - 1]) / ds[i2]);
          if (!isFinite(ms[i2])) {
            ms[i2] = 0;
          }
        }
      }
      // Now build a path from the slopes
      var path = new SvgPath().move(xs[0], ys[0], false, valueData[0]);
      for (var i3 = 0; i3 < n - 1; i3++) {
        path.curve(
        // First control point
        xs[i3] + dxs[i3] / 3, ys[i3] + ms[i3] * dxs[i3] / 3,
        // Second control point
        xs[i3 + 1] - dxs[i3] / 3, ys[i3 + 1] - ms[i3 + 1] * dxs[i3] / 3,
        // End point
        xs[i3 + 1], ys[i3 + 1], false, valueData[i3 + 1]);
      }
      return path;
    }
  };
}
var index = /*#__PURE__*/Object.freeze({
  __proto__: null,
  none: none,
  simple: simple,
  step: step,
  cardinal: cardinal,
  monotoneCubic: monotoneCubic
});
exports.Interpolation = index;
var EventEmitter = /*#__PURE__*/function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);
    this.listeners = new Map();
    this.allListeners = new Set();
  }
  _createClass(EventEmitter, [{
    key: "on",
    value: function on(event, listener) {
      var allListeners = this.allListeners,
        listeners = this.listeners;
      if (event === "*") {
        allListeners.add(listener);
      } else {
        if (!listeners.has(event)) {
          listeners.set(event, new Set());
        }
        listeners.get(event).add(listener);
      }
    }
  }, {
    key: "off",
    value: function off(event, listener) {
      var allListeners = this.allListeners,
        listeners = this.listeners;
      if (event === "*") {
        if (listener) {
          allListeners.delete(listener);
        } else {
          allListeners.clear();
        }
      } else if (listeners.has(event)) {
        var eventListeners = listeners.get(event);
        if (listener) {
          eventListeners.delete(listener);
        } else {
          eventListeners.clear();
        }
        if (!eventListeners.size) {
          listeners.delete(event);
        }
      }
    }
    /**
    * Use this function to emit an event. All handlers that are listening for this event will be triggered with the data parameter.
    * @param event The event name that should be triggered
    * @param data Arbitrary data that will be passed to the event handler callback functions
    */
  }, {
    key: "emit",
    value: function emit(event, data) {
      var allListeners = this.allListeners,
        listeners = this.listeners;
      // Only do something if there are event handlers with this name existing
      if (listeners.has(event)) {
        listeners.get(event).forEach(function (listener) {
          return listener(data);
        });
      }
      // Emit event to star event handlers
      allListeners.forEach(function (listener) {
        return listener(event, data);
      });
    }
  }]);
  return EventEmitter;
}();
exports.EventEmitter = EventEmitter;
var instances = new WeakMap();
var BaseChart = /*#__PURE__*/function () {
  function BaseChart(query, data, defaultOptions, options, responsiveOptions) {
    var _this4 = this;
    _classCallCheck(this, BaseChart);
    this.data = data;
    this.defaultOptions = defaultOptions;
    this.options = options;
    this.responsiveOptions = responsiveOptions;
    this.eventEmitter = new EventEmitter();
    this.resizeListener = function () {
      return _this4.update();
    };
    this.initializeTimeoutId = setTimeout(function () {
      return _this4.initialize();
    }, 0);
    var container = typeof query === "string" ? document.querySelector(query) : query;
    if (!container) {
      throw new Error("Target element is not found");
    }
    this.container = container;
    var prevInstance = instances.get(container);
    // If chartist was already initialized in this container we are detaching all event listeners first
    if (prevInstance) {
      prevInstance.detach();
    }
    instances.set(container, this);
  }
  _createClass(BaseChart, [{
    key: "update",
    value:
    // TODO: Currently we need to re-draw the chart on window resize. This is usually very bad and will affect performance.
    // This is done because we can't work with relative coordinates when drawing the chart because SVG Path does not
    // work with relative positions yet. We need to check if we can do a viewBox hack to switch to percentage.
    // See http://mozilla.6506.n7.nabble.com/Specyfing-paths-with-percentages-unit-td247474.html
    // Update: can be done using the above method tested here: http://codepen.io/gionkunz/pen/KDvLj
    // The problem is with the label offsets that can't be converted into percentage and affecting the chart container
    /**
    * Updates the chart which currently does a full reconstruction of the SVG DOM
    * @param data Optional data you'd like to set for the chart before it will update. If not specified the update method will use the data that is already configured with the chart.
    * @param options Optional options you'd like to add to the previous options for the chart before it will update. If not specified the update method will use the options that have been already configured with the chart.
    * @param override If set to true, the passed options will be used to extend the options that have been configured already. Otherwise the chart default options will be used as the base
    */
    function update(data, options) {
      var override = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
      if (data) {
        this.data = data || {};
        this.data.labels = this.data.labels || [];
        this.data.series = this.data.series || [];
        // Event for data transformation that allows to manipulate the data before it gets rendered in the charts
        this.eventEmitter.emit("data", {
          type: "update",
          data: this.data
        });
      }
      if (options) {
        this.options = extend({}, override ? this.options : this.defaultOptions, options);
        // If chartist was not initialized yet, we just set the options and leave the rest to the initialization
        // Otherwise we re-create the optionsProvider at this point
        if (!this.initializeTimeoutId) {
          var ref;
          (ref = this.optionsProvider) === null || ref === void 0 ? void 0 : ref.removeMediaQueryListeners();
          this.optionsProvider = optionsProvider(this.options, this.responsiveOptions, this.eventEmitter);
        }
      }
      // Only re-created the chart if it has been initialized yet
      if (!this.initializeTimeoutId && this.optionsProvider) {
        this.createChart(this.optionsProvider.getCurrentOptions());
      }
      // Return a reference to the chart object to chain up calls
      return this;
    }
    /**
    * This method can be called on the API object of each chart and will un-register all event listeners that were added to other components. This currently includes a window.resize listener as well as media query listeners if any responsive options have been provided. Use this function if you need to destroy and recreate Chartist charts dynamically.
    */
  }, {
    key: "detach",
    value: function detach() {
      // Only detach if initialization already occurred on this chart. If this chart still hasn't initialized (therefore
      // the initializationTimeoutId is still a valid timeout reference, we will clear the timeout
      if (!this.initializeTimeoutId) {
        var ref;
        window.removeEventListener("resize", this.resizeListener);
        (ref = this.optionsProvider) === null || ref === void 0 ? void 0 : ref.removeMediaQueryListeners();
      } else {
        window.clearTimeout(this.initializeTimeoutId);
      }
      instances.delete(this.container);
      return this;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, {
    key: "on",
    value: function on(event, listener) {
      this.eventEmitter.on(event, listener);
      return this;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, {
    key: "off",
    value: function off(event, listener) {
      this.eventEmitter.off(event, listener);
      return this;
    }
  }, {
    key: "initialize",
    value: function initialize() {
      var _this5 = this;
      // Add window resize listener that re-creates the chart
      window.addEventListener("resize", this.resizeListener);
      // Obtain current options based on matching media queries (if responsive options are given)
      // This will also register a listener that is re-creating the chart based on media changes
      this.optionsProvider = optionsProvider(this.options, this.responsiveOptions, this.eventEmitter);
      // Register options change listener that will trigger a chart update
      this.eventEmitter.on("optionsChanged", function () {
        return _this5.update();
      });
      // Before the first chart creation we need to register us with all plugins that are configured
      // Initialize all relevant plugins with our chart object and the plugin options specified in the config
      if (this.options.plugins) {
        this.options.plugins.forEach(function (plugin) {
          if (Array.isArray(plugin)) {
            plugin[0](_this5, plugin[1]);
          } else {
            plugin(_this5);
          }
        });
      }
      // Event for data transformation that allows to manipulate the data before it gets rendered in the charts
      this.eventEmitter.emit("data", {
        type: "initial",
        data: this.data
      });
      // Create the first chart
      this.createChart(this.optionsProvider.getCurrentOptions());
      // As chart is initialized from the event loop now we can reset our timeout reference
      // This is important if the chart gets initialized on the same element twice
      this.initializeTimeoutId = null;
    }
  }]);
  return BaseChart;
}();
exports.BaseChart = BaseChart;
var axisUnits = {
  x: {
    pos: "x",
    len: "width",
    dir: "horizontal",
    rectStart: "x1",
    rectEnd: "x2",
    rectOffset: "y2"
  },
  y: {
    pos: "y",
    len: "height",
    dir: "vertical",
    rectStart: "y2",
    rectEnd: "y1",
    rectOffset: "x1"
  }
};
exports.axisUnits = axisUnits;
var Axis = /*#__PURE__*/function () {
  function Axis(units, chartRect, ticks) {
    _classCallCheck(this, Axis);
    this.units = units;
    this.chartRect = chartRect;
    this.ticks = ticks;
    this.counterUnits = units === axisUnits.x ? axisUnits.y : axisUnits.x;
    this.axisLength = chartRect[this.units.rectEnd] - chartRect[this.units.rectStart];
    this.gridOffset = chartRect[this.units.rectOffset];
  }
  _createClass(Axis, [{
    key: "createGridAndLabels",
    value: function createGridAndLabels(gridGroup, labelGroup, chartOptions, eventEmitter) {
      var _this6 = this;
      var axisOptions = this.units.pos === "x" ? chartOptions.axisX : chartOptions.axisY;
      var projectedValues = this.ticks.map(function (tick, i) {
        return _this6.projectValue(tick, i);
      });
      var labelValues = this.ticks.map(axisOptions.labelInterpolationFnc);
      projectedValues.forEach(function (projectedValue, index) {
        var labelValue = labelValues[index];
        var labelOffset = {
          x: 0,
          y: 0
        };
        // TODO: Find better solution for solving this problem
        // Calculate how much space we have available for the label
        var labelLength;
        if (projectedValues[index + 1]) {
          // If we still have one label ahead, we can calculate the distance to the next tick / label
          labelLength = projectedValues[index + 1] - projectedValue;
        } else {
          // If we don't have a label ahead and we have only two labels in total, we just take the remaining distance to
          // on the whole axis length. We limit that to a minimum of 30 pixel, so that labels close to the border will
          // still be visible inside of the chart padding.
          labelLength = Math.max(_this6.axisLength - projectedValue, _this6.axisLength / _this6.ticks.length);
        }
        // Skip grid lines and labels where interpolated label values are falsey (except for 0)
        if (labelValue !== "" && isFalseyButZero(labelValue)) {
          return;
        }
        // Transform to global coordinates using the chartRect
        // We also need to set the label offset for the createLabel function
        if (_this6.units.pos === "x") {
          projectedValue = _this6.chartRect.x1 + projectedValue;
          labelOffset.x = chartOptions.axisX.labelOffset.x;
          // If the labels should be positioned in start position (top side for vertical axis) we need to set a
          // different offset as for positioned with end (bottom)
          if (chartOptions.axisX.position === "start") {
            labelOffset.y = _this6.chartRect.padding.top + chartOptions.axisX.labelOffset.y + 5;
          } else {
            labelOffset.y = _this6.chartRect.y1 + chartOptions.axisX.labelOffset.y + 5;
          }
        } else {
          projectedValue = _this6.chartRect.y1 - projectedValue;
          labelOffset.y = chartOptions.axisY.labelOffset.y - labelLength;
          // If the labels should be positioned in start position (left side for horizontal axis) we need to set a
          // different offset as for positioned with end (right side)
          if (chartOptions.axisY.position === "start") {
            labelOffset.x = _this6.chartRect.padding.left + chartOptions.axisY.labelOffset.x;
          } else {
            labelOffset.x = _this6.chartRect.x2 + chartOptions.axisY.labelOffset.x + 10;
          }
        }
        if (axisOptions.showGrid) {
          createGrid(projectedValue, index, _this6, _this6.gridOffset, _this6.chartRect[_this6.counterUnits.len](), gridGroup, [chartOptions.classNames.grid, chartOptions.classNames[_this6.units.dir]], eventEmitter);
        }
        if (axisOptions.showLabel) {
          createLabel(projectedValue, labelLength, index, labelValue, _this6, axisOptions.offset, labelOffset, labelGroup, [chartOptions.classNames.label, chartOptions.classNames[_this6.units.dir], axisOptions.position === "start" ? chartOptions.classNames[axisOptions.position] : chartOptions.classNames.end], eventEmitter);
        }
      });
    }
  }]);
  return Axis;
}();
exports.Axis = Axis;
var AutoScaleAxis = /*#__PURE__*/function (_Axis) {
  _inherits(AutoScaleAxis, _Axis);
  var _super = _createSuper(AutoScaleAxis);
  function AutoScaleAxis(axisUnit, data, chartRect, options) {
    var _this7;
    _classCallCheck(this, AutoScaleAxis);
    // Usually we calculate highLow based on the data but this can be overriden by a highLow object in the options
    var highLow = options.highLow || getHighLow(data, options, axisUnit.pos);
    var bounds = getBounds(chartRect[axisUnit.rectEnd] - chartRect[axisUnit.rectStart], highLow, options.scaleMinSpace || 20, options.onlyInteger);
    var range = {
      min: bounds.min,
      max: bounds.max
    };
    _this7 = _super.call(this, axisUnit, chartRect, bounds.values);
    _this7.bounds = bounds;
    _this7.range = range;
    return _this7;
  }
  _createClass(AutoScaleAxis, [{
    key: "projectValue",
    value: function projectValue(value) {
      var finalValue = Number(getMultiValue(value, this.units.pos));
      return this.axisLength * (finalValue - this.bounds.min) / this.bounds.range;
    }
  }]);
  return AutoScaleAxis;
}(Axis);
exports.AutoScaleAxis = AutoScaleAxis;
var FixedScaleAxis = /*#__PURE__*/function (_Axis2) {
  _inherits(FixedScaleAxis, _Axis2);
  var _super2 = _createSuper(FixedScaleAxis);
  function FixedScaleAxis(axisUnit, data, chartRect, options) {
    var _this8;
    _classCallCheck(this, FixedScaleAxis);
    var highLow = options.highLow || getHighLow(data, options, axisUnit.pos);
    var divisor = options.divisor || 1;
    var ticks = (options.ticks || times(divisor, function (index) {
      return highLow.low + (highLow.high - highLow.low) / divisor * index;
    })).sort(function (a, b) {
      return Number(a) - Number(b);
    });
    var range = {
      min: highLow.low,
      max: highLow.high
    };
    _this8 = _super2.call(this, axisUnit, chartRect, ticks);
    _this8.range = range;
    return _this8;
  }
  _createClass(FixedScaleAxis, [{
    key: "projectValue",
    value: function projectValue(value) {
      var finalValue = Number(getMultiValue(value, this.units.pos));
      return this.axisLength * (finalValue - this.range.min) / (this.range.max - this.range.min);
    }
  }]);
  return FixedScaleAxis;
}(Axis);
exports.FixedScaleAxis = FixedScaleAxis;
var StepAxis = /*#__PURE__*/function (_Axis3) {
  _inherits(StepAxis, _Axis3);
  var _super3 = _createSuper(StepAxis);
  function StepAxis(axisUnit, _data, chartRect, options) {
    var _this9;
    _classCallCheck(this, StepAxis);
    var ticks = options.ticks || [];
    _this9 = _super3.call(this, axisUnit, chartRect, ticks);
    var calc = Math.max(1, ticks.length - (options.stretch ? 1 : 0));
    _this9.stepLength = _this9.axisLength / calc;
    _this9.stretch = Boolean(options.stretch);
    return _this9;
  }
  _createClass(StepAxis, [{
    key: "projectValue",
    value: function projectValue(_value, index) {
      return this.stepLength * index;
    }
  }]);
  return StepAxis;
}(Axis);
exports.StepAxis = StepAxis;
function getSeriesOption(series, options, key) {
  var ref;
  if (safeHasProperty(series, "name") && series.name && ((ref = options.series) === null || ref === void 0 ? void 0 : ref[series.name])) {
    var seriesOptions = options === null || options === void 0 ? void 0 : options.series[series.name];
    var value = seriesOptions[key];
    var result = value === undefined ? options[key] : value;
    return result;
  } else {
    return options[key];
  }
}
/**
 * Default options in line charts. Expand the code view to see a detailed list of options with comments.
 */
var defaultOptions$2 = {
  // Options for X-Axis
  axisX: {
    // The offset of the labels to the chart area
    offset: 30,
    // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
    position: "end",
    // Allows you to correct label positioning on this axis by positive or negative x and y offset.
    labelOffset: {
      x: 0,
      y: 0
    },
    // If labels should be shown or not
    showLabel: true,
    // If the axis grid should be drawn or not
    showGrid: true,
    // Interpolation function that allows you to intercept the value from the axis label
    labelInterpolationFnc: noop,
    // Set the axis type to be used to project values on this axis. If not defined, Chartist.StepAxis will be used for the X-Axis, where the ticks option will be set to the labels in the data and the stretch option will be set to the global fullWidth option. This type can be changed to any axis constructor available (e.g. Chartist.FixedScaleAxis), where all axis options should be present here.
    type: undefined
  },
  // Options for Y-Axis
  axisY: {
    // The offset of the labels to the chart area
    offset: 40,
    // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
    position: "start",
    // Allows you to correct label positioning on this axis by positive or negative x and y offset.
    labelOffset: {
      x: 0,
      y: 0
    },
    // If labels should be shown or not
    showLabel: true,
    // If the axis grid should be drawn or not
    showGrid: true,
    // Interpolation function that allows you to intercept the value from the axis label
    labelInterpolationFnc: noop,
    // Set the axis type to be used to project values on this axis. If not defined, Chartist.AutoScaleAxis will be used for the Y-Axis, where the high and low options will be set to the global high and low options. This type can be changed to any axis constructor available (e.g. Chartist.FixedScaleAxis), where all axis options should be present here.
    type: undefined,
    // This value specifies the minimum height in pixel of the scale steps
    scaleMinSpace: 20,
    // Use only integer values (whole numbers) for the scale steps
    onlyInteger: false
  },
  // Specify a fixed width for the chart as a string (i.e. '100px' or '50%')
  width: undefined,
  // Specify a fixed height for the chart as a string (i.e. '100px' or '50%')
  height: undefined,
  // If the line should be drawn or not
  showLine: true,
  // If dots should be drawn or not
  showPoint: true,
  // If the line chart should draw an area
  showArea: false,
  // The base for the area chart that will be used to close the area shape (is normally 0)
  areaBase: 0,
  // Specify if the lines should be smoothed. This value can be true or false where true will result in smoothing using the default smoothing interpolation function Chartist.Interpolation.cardinal and false results in Chartist.Interpolation.none. You can also choose other smoothing / interpolation functions available in the Chartist.Interpolation module, or write your own interpolation function. Check the examples for a brief description.
  lineSmooth: true,
  // If the line chart should add a background fill to the .ct-grids group.
  showGridBackground: false,
  // Overriding the natural low of the chart allows you to zoom in or limit the charts lowest displayed value
  low: undefined,
  // Overriding the natural high of the chart allows you to zoom in or limit the charts highest displayed value
  high: undefined,
  // Padding of the chart drawing area to the container element and labels as a number or padding object {top: 5, right: 5, bottom: 5, left: 5}
  chartPadding: {
    top: 15,
    right: 15,
    bottom: 5,
    left: 10
  },
  // When set to true, the last grid line on the x-axis is not drawn and the chart elements will expand to the full available width of the chart. For the last label to be drawn correctly you might need to add chart padding or offset the last label with a draw event handler.
  fullWidth: false,
  // If true the whole data is reversed including labels, the series order as well as the whole series data arrays.
  reverseData: false,
  // Override the class names that get used to generate the SVG structure of the chart
  classNames: {
    chart: "ct-chart-line",
    label: "ct-label",
    labelGroup: "ct-labels",
    series: "ct-series",
    line: "ct-line",
    point: "ct-point",
    area: "ct-area",
    grid: "ct-grid",
    gridGroup: "ct-grids",
    gridBackground: "ct-grid-background",
    vertical: "ct-vertical",
    horizontal: "ct-horizontal",
    start: "ct-start",
    end: "ct-end"
  }
};
var LineChart = /*#__PURE__*/function (_BaseChart) {
  _inherits(LineChart, _BaseChart);
  var _super4 = _createSuper(LineChart);
  /**
  * This method creates a new line chart.
  * @param query A selector query string or directly a DOM element
  * @param data The data object that needs to consist of a labels and a series array
  * @param options The options object with options that override the default options. Check the examples for a detailed list.
  * @param responsiveOptions Specify an array of responsive option arrays which are a media query and options object pair => [[mediaQueryString, optionsObject],[more...]]
  * @return An object which exposes the API for the created chart
  *
  * @example
  * ```ts
  * // Create a simple line chart
  * const data = {
  *   // A labels array that can contain any sort of values
  *   labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  *   // Our series array that contains series objects or in this case series data arrays
  *   series: [
  *     [5, 2, 4, 2, 0]
  *   ]
  * };
  *
  * // As options we currently only set a static size of 300x200 px
  * const options = {
  *   width: '300px',
  *   height: '200px'
  * };
  *
  * // In the global name space Chartist we call the Line function to initialize a line chart. As a first parameter we pass in a selector where we would like to get our chart created. Second parameter is the actual data object and as a third parameter we pass in our options
  * new LineChart('.ct-chart', data, options);
  * ```
  *
  * @example
  * ```ts
  * // Use specific interpolation function with configuration from the Chartist.Interpolation module
  *
  * const chart = new LineChart('.ct-chart', {
  *   labels: [1, 2, 3, 4, 5],
  *   series: [
  *     [1, 1, 8, 1, 7]
  *   ]
  * }, {
  *   lineSmooth: Chartist.Interpolation.cardinal({
  *     tension: 0.2
  *   })
  * });
  * ```
  *
  * @example
  * ```ts
  * // Create a line chart with responsive options
  *
  * const data = {
  *   // A labels array that can contain any sort of values
  *   labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  *   // Our series array that contains series objects or in this case series data arrays
  *   series: [
  *     [5, 2, 4, 2, 0]
  *   ]
  * };
  *
  * // In addition to the regular options we specify responsive option overrides that will override the default configutation based on the matching media queries.
  * const responsiveOptions = [
  *   ['screen and (min-width: 641px) and (max-width: 1024px)', {
  *     showPoint: false,
  *     axisX: {
  *       labelInterpolationFnc: function(value) {
  *         // Will return Mon, Tue, Wed etc. on medium screens
  *         return value.slice(0, 3);
  *       }
  *     }
  *   }],
  *   ['screen and (max-width: 640px)', {
  *     showLine: false,
  *     axisX: {
  *       labelInterpolationFnc: function(value) {
  *         // Will return M, T, W etc. on small screens
  *         return value[0];
  *       }
  *     }
  *   }]
  * ];
  *
  * new LineChart('.ct-chart', data, null, responsiveOptions);
  * ```
  */
  function LineChart(query, data, options, responsiveOptions) {
    var _this10;
    _classCallCheck(this, LineChart);
    _this10 = _super4.call(this, query, data, defaultOptions$2, extend({}, defaultOptions$2, options), responsiveOptions);
    _this10.data = data;
    return _this10;
  }
  _createClass(LineChart, [{
    key: "createChart",
    value:
    /**
    * Creates a new chart
    */
    function createChart(options) {
      var _this11 = this;
      var data = this.data;
      var normalizedData = normalizeData(data, options.reverseData, true);
      // Create new svg object
      var svg = createSvg(this.container, options.width, options.height, options.classNames.chart);
      this.svg = svg;
      // Create groups for labels, grid and series
      var gridGroup = svg.elem("g").addClass(options.classNames.gridGroup);
      var seriesGroup = svg.elem("g");
      var labelGroup = svg.elem("g").addClass(options.classNames.labelGroup);
      var chartRect = createChartRect(svg, options);
      var axisX;
      var axisY;
      if (options.axisX.type === undefined) {
        axisX = new StepAxis(axisUnits.x, normalizedData.series, chartRect, _objectSpread(_objectSpread({}, options.axisX), {}, {
          ticks: normalizedData.labels,
          stretch: options.fullWidth
        }));
      } else {
        // eslint-disable-next-line new-cap
        axisX = new options.axisX.type(axisUnits.x, normalizedData.series, chartRect, options.axisX);
      }
      if (options.axisY.type === undefined) {
        axisY = new AutoScaleAxis(axisUnits.y, normalizedData.series, chartRect, _objectSpread(_objectSpread({}, options.axisY), {}, {
          high: isNumeric(options.high) ? options.high : options.axisY.high,
          low: isNumeric(options.low) ? options.low : options.axisY.low
        }));
      } else {
        // eslint-disable-next-line new-cap
        axisY = new options.axisY.type(axisUnits.y, normalizedData.series, chartRect, options.axisY);
      }
      axisX.createGridAndLabels(gridGroup, labelGroup, options, this.eventEmitter);
      axisY.createGridAndLabels(gridGroup, labelGroup, options, this.eventEmitter);
      if (options.showGridBackground) {
        createGridBackground(gridGroup, chartRect, options.classNames.gridBackground, this.eventEmitter);
      }
      // Draw the series
      each(data.series, function (series, seriesIndex) {
        var seriesElement = seriesGroup.elem("g");
        var seriesName = safeHasProperty(series, "name") && series.name;
        var seriesClassName = safeHasProperty(series, "className") && series.className;
        var seriesMeta = safeHasProperty(series, "meta") ? series.meta : undefined;
        // Write attributes to series group element. If series name or meta is undefined the attributes will not be written
        if (seriesName) {
          seriesElement.attr({
            "ct:series-name": seriesName
          });
        }
        if (seriesMeta) {
          seriesElement.attr({
            "ct:meta": serialize(seriesMeta)
          });
        }
        // Use series class from series data or if not set generate one
        seriesElement.addClass([options.classNames.series, seriesClassName || "".concat(options.classNames.series, "-").concat(alphaNumerate(seriesIndex))].join(" "));
        var pathCoordinates = [];
        var pathData = [];
        normalizedData.series[seriesIndex].forEach(function (value, valueIndex) {
          var p = {
            x: chartRect.x1 + axisX.projectValue(value, valueIndex, normalizedData.series[seriesIndex]),
            y: chartRect.y1 - axisY.projectValue(value, valueIndex, normalizedData.series[seriesIndex])
          };
          pathCoordinates.push(p.x, p.y);
          pathData.push({
            value: value,
            valueIndex: valueIndex,
            meta: getMetaData(series, valueIndex)
          });
        });
        var seriesOptions = {
          lineSmooth: getSeriesOption(series, options, "lineSmooth"),
          showPoint: getSeriesOption(series, options, "showPoint"),
          showLine: getSeriesOption(series, options, "showLine"),
          showArea: getSeriesOption(series, options, "showArea"),
          areaBase: getSeriesOption(series, options, "areaBase")
        };
        var smoothing;
        if (typeof seriesOptions.lineSmooth === "function") {
          smoothing = seriesOptions.lineSmooth;
        } else {
          smoothing = seriesOptions.lineSmooth ? monotoneCubic() : none();
        }
        // Interpolating path where pathData will be used to annotate each path element so we can trace back the original
        // index, value and meta data
        var path = smoothing(pathCoordinates, pathData);
        // If we should show points we need to create them now to avoid secondary loop
        // Points are drawn from the pathElements returned by the interpolation function
        // Small offset for Firefox to render squares correctly
        if (seriesOptions.showPoint) {
          path.pathElements.forEach(function (pathElement) {
            var pathElementData = pathElement.data;
            var point = seriesElement.elem("line", {
              x1: pathElement.x,
              y1: pathElement.y,
              x2: pathElement.x + 0.01,
              y2: pathElement.y
            }, options.classNames.point);
            if (pathElementData) {
              var x;
              var y;
              if (safeHasProperty(pathElementData.value, "x")) {
                x = pathElementData.value.x;
              }
              if (safeHasProperty(pathElementData.value, "y")) {
                y = pathElementData.value.y;
              }
              point.attr({
                "ct:value": [x, y].filter(isNumeric).join(","),
                "ct:meta": serialize(pathElementData.meta)
              });
            }
            _this11.eventEmitter.emit("draw", {
              type: "point",
              value: pathElementData === null || pathElementData === void 0 ? void 0 : pathElementData.value,
              index: (pathElementData === null || pathElementData === void 0 ? void 0 : pathElementData.valueIndex) || 0,
              meta: pathElementData === null || pathElementData === void 0 ? void 0 : pathElementData.meta,
              series: series,
              seriesIndex: seriesIndex,
              axisX: axisX,
              axisY: axisY,
              group: seriesElement,
              element: point,
              x: pathElement.x,
              y: pathElement.y,
              chartRect: chartRect
            });
          });
        }
        if (seriesOptions.showLine) {
          var line = seriesElement.elem("path", {
            d: path.stringify()
          }, options.classNames.line, true);
          _this11.eventEmitter.emit("draw", {
            type: "line",
            values: normalizedData.series[seriesIndex],
            path: path.clone(),
            chartRect: chartRect,
            // TODO: Remove redundant
            index: seriesIndex,
            series: series,
            seriesIndex: seriesIndex,
            meta: seriesMeta,
            axisX: axisX,
            axisY: axisY,
            group: seriesElement,
            element: line
          });
        }
        // Area currently only works with axes that support a range!
        if (seriesOptions.showArea && axisY.range) {
          // If areaBase is outside the chart area (< min or > max) we need to set it respectively so that
          // the area is not drawn outside the chart area.
          var areaBase = Math.max(Math.min(seriesOptions.areaBase, axisY.range.max), axisY.range.min);
          // We project the areaBase value into screen coordinates
          var areaBaseProjected = chartRect.y1 - axisY.projectValue(areaBase);
          // In order to form the area we'll first split the path by move commands so we can chunk it up into segments
          path.splitByCommand("M") // We filter only "solid" segments that contain more than one point. Otherwise there's no need for an area
          .filter(function (pathSegment) {
            return pathSegment.pathElements.length > 1;
          }).map(function (solidPathSegments) {
            // Receiving the filtered solid path segments we can now convert those segments into fill areas
            var firstElement = solidPathSegments.pathElements[0];
            var lastElement = solidPathSegments.pathElements[solidPathSegments.pathElements.length - 1];
            // Cloning the solid path segment with closing option and removing the first move command from the clone
            // We then insert a new move that should start at the area base and draw a straight line up or down
            // at the end of the path we add an additional straight line to the projected area base value
            // As the closing option is set our path will be automatically closed
            return solidPathSegments.clone(true).position(0).remove(1).move(firstElement.x, areaBaseProjected).line(firstElement.x, firstElement.y).position(solidPathSegments.pathElements.length + 1).line(lastElement.x, areaBaseProjected);
          }).forEach(function (areaPath) {
            // For each of our newly created area paths, we'll now create path elements by stringifying our path objects
            // and adding the created DOM elements to the correct series group
            var area = seriesElement.elem("path", {
              d: areaPath.stringify()
            }, options.classNames.area, true);
            // Emit an event for each area that was drawn
            _this11.eventEmitter.emit("draw", {
              type: "area",
              values: normalizedData.series[seriesIndex],
              path: areaPath.clone(),
              series: series,
              seriesIndex: seriesIndex,
              axisX: axisX,
              axisY: axisY,
              chartRect: chartRect,
              // TODO: Remove redundant
              index: seriesIndex,
              group: seriesElement,
              element: area,
              meta: seriesMeta
            });
          });
        }
      }, options.reverseData);
      this.eventEmitter.emit("created", {
        chartRect: chartRect,
        axisX: axisX,
        axisY: axisY,
        svg: svg,
        options: options
      });
    }
  }]);
  return LineChart;
}(BaseChart);
exports.LineChart = LineChart;
function getSerialSums(series) {
  return serialMap(series, function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return Array.from(args).reduce(function (prev, curr) {
      return {
        x: prev.x + (safeHasProperty(curr, "x") ? curr.x : 0),
        y: prev.y + (safeHasProperty(curr, "y") ? curr.y : 0)
      };
    }, {
      x: 0,
      y: 0
    });
  });
}
/**
 * Default options in bar charts. Expand the code view to see a detailed list of options with comments.
 */
var defaultOptions$1 = {
  // Options for X-Axis
  axisX: {
    // The offset of the chart drawing area to the border of the container
    offset: 30,
    // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
    position: "end",
    // Allows you to correct label positioning on this axis by positive or negative x and y offset.
    labelOffset: {
      x: 0,
      y: 0
    },
    // If labels should be shown or not
    showLabel: true,
    // If the axis grid should be drawn or not
    showGrid: true,
    // Interpolation function that allows you to intercept the value from the axis label
    labelInterpolationFnc: noop,
    // This value specifies the minimum width in pixel of the scale steps
    scaleMinSpace: 30,
    // Use only integer values (whole numbers) for the scale steps
    onlyInteger: false
  },
  // Options for Y-Axis
  axisY: {
    // The offset of the chart drawing area to the border of the container
    offset: 40,
    // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
    position: "start",
    // Allows you to correct label positioning on this axis by positive or negative x and y offset.
    labelOffset: {
      x: 0,
      y: 0
    },
    // If labels should be shown or not
    showLabel: true,
    // If the axis grid should be drawn or not
    showGrid: true,
    // Interpolation function that allows you to intercept the value from the axis label
    labelInterpolationFnc: noop,
    // This value specifies the minimum height in pixel of the scale steps
    scaleMinSpace: 20,
    // Use only integer values (whole numbers) for the scale steps
    onlyInteger: false
  },
  // Specify a fixed width for the chart as a string (i.e. '100px' or '50%')
  width: undefined,
  // Specify a fixed height for the chart as a string (i.e. '100px' or '50%')
  height: undefined,
  // Overriding the natural high of the chart allows you to zoom in or limit the charts highest displayed value
  high: undefined,
  // Overriding the natural low of the chart allows you to zoom in or limit the charts lowest displayed value
  low: undefined,
  // Unless low/high are explicitly set, bar chart will be centered at zero by default. Set referenceValue to null to auto scale.
  referenceValue: 0,
  // Padding of the chart drawing area to the container element and labels as a number or padding object {top: 5, right: 5, bottom: 5, left: 5}
  chartPadding: {
    top: 15,
    right: 15,
    bottom: 5,
    left: 10
  },
  // Specify the distance in pixel of bars in a group
  seriesBarDistance: 15,
  // If set to true this property will cause the series bars to be stacked. Check the `stackMode` option for further stacking options.
  stackBars: false,
  // If set to true this property will force the stacked bars to draw from the zero line.
  // If set to 'accumulate' this property will form a total for each series point. This will also influence the y-axis and the overall bounds of the chart. In stacked mode the seriesBarDistance property will have no effect.
  // If set to 'accumulate-relative' positive and negative values will be handled separately.
  stackMode: "accumulate",
  // Inverts the axes of the bar chart in order to draw a horizontal bar chart. Be aware that you also need to invert your axis settings as the Y Axis will now display the labels and the X Axis the values.
  horizontalBars: false,
  // If set to true then each bar will represent a series and the data array is expected to be a one dimensional array of data values rather than a series array of series. This is useful if the bar chart should represent a profile rather than some data over time.
  distributeSeries: false,
  // If true the whole data is reversed including labels, the series order as well as the whole series data arrays.
  reverseData: false,
  // If the bar chart should add a background fill to the .ct-grids group.
  showGridBackground: false,
  // Override the class names that get used to generate the SVG structure of the chart
  classNames: {
    chart: "ct-chart-bar",
    horizontalBars: "ct-horizontal-bars",
    label: "ct-label",
    labelGroup: "ct-labels",
    series: "ct-series",
    bar: "ct-bar",
    grid: "ct-grid",
    gridGroup: "ct-grids",
    gridBackground: "ct-grid-background",
    vertical: "ct-vertical",
    horizontal: "ct-horizontal",
    start: "ct-start",
    end: "ct-end"
  }
};
var BarChart = /*#__PURE__*/function (_BaseChart2) {
  _inherits(BarChart, _BaseChart2);
  var _super5 = _createSuper(BarChart);
  /**
  * This method creates a new bar chart and returns API object that you can use for later changes.
  * @param query A selector query string or directly a DOM element
  * @param data The data object that needs to consist of a labels and a series array
  * @param options The options object with options that override the default options. Check the examples for a detailed list.
  * @param responsiveOptions Specify an array of responsive option arrays which are a media query and options object pair => [[mediaQueryString, optionsObject],[more...]]
  * @return An object which exposes the API for the created chart
  *
  * @example
  * ```ts
  * // Create a simple bar chart
  * const data = {
  *   labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  *   series: [
  *     [5, 2, 4, 2, 0]
  *   ]
  * };
  *
  * // In the global name space Chartist we call the Bar function to initialize a bar chart. As a first parameter we pass in a selector where we would like to get our chart created and as a second parameter we pass our data object.
  * new BarChart('.ct-chart', data);
  * ```
  *
  * @example
  * ```ts
  * // This example creates a bipolar grouped bar chart where the boundaries are limitted to -10 and 10
  * new BarChart('.ct-chart', {
  *   labels: [1, 2, 3, 4, 5, 6, 7],
  *   series: [
  *     [1, 3, 2, -5, -3, 1, -6],
  *     [-5, -2, -4, -1, 2, -3, 1]
  *   ]
  * }, {
  *   seriesBarDistance: 12,
  *   low: -10,
  *   high: 10
  * });
  * ```
  */
  function BarChart(query, data, options, responsiveOptions) {
    var _this12;
    _classCallCheck(this, BarChart);
    _this12 = _super5.call(this, query, data, defaultOptions$1, extend({}, defaultOptions$1, options), responsiveOptions);
    _this12.data = data;
    return _this12;
  }
  _createClass(BarChart, [{
    key: "createChart",
    value:
    /**
    * Creates a new chart
    */
    function createChart(options) {
      var _this13 = this;
      var data = this.data;
      var normalizedData = normalizeData(data, options.reverseData, options.horizontalBars ? "x" : "y", true);
      // Create new svg element
      var svg = createSvg(this.container, options.width, options.height, options.classNames.chart + (options.horizontalBars ? " " + options.classNames.horizontalBars : ""));
      var highLow = options.stackBars && options.stackMode !== true && normalizedData.series.length ? getHighLow([getSerialSums(normalizedData.series)], options, options.horizontalBars ? "x" : "y") : getHighLow(normalizedData.series, options, options.horizontalBars ? "x" : "y");
      this.svg = svg;
      // Drawing groups in correct order
      var gridGroup = svg.elem("g").addClass(options.classNames.gridGroup);
      var seriesGroup = svg.elem("g");
      var labelGroup = svg.elem("g").addClass(options.classNames.labelGroup);
      // Overrides of high / low from settings
      if (typeof options.high === "number") {
        highLow.high = options.high;
      }
      if (typeof options.low === "number") {
        highLow.low = options.low;
      }
      var chartRect = createChartRect(svg, options);
      var valueAxis;
      var labelAxisTicks = options.distributeSeries && options.stackBars ?
      // use only the first label for the step axis
      normalizedData.labels.slice(0, 1) :
      // If we are drawing a regular bar chart with two dimensional series data, we just use the labels array
      // as the bars are normalized
      normalizedData.labels;
      var labelAxis;
      var axisX;
      var axisY;
      // Set labelAxis and valueAxis based on the horizontalBars setting. This setting will flip the axes if necessary.
      if (options.horizontalBars) {
        if (options.axisX.type === undefined) {
          valueAxis = axisX = new AutoScaleAxis(axisUnits.x, normalizedData.series, chartRect, _objectSpread(_objectSpread({}, options.axisX), {}, {
            highLow: highLow,
            referenceValue: 0
          }));
        } else {
          // eslint-disable-next-line new-cap
          valueAxis = axisX = new options.axisX.type(axisUnits.x, normalizedData.series, chartRect, _objectSpread(_objectSpread({}, options.axisX), {}, {
            highLow: highLow,
            referenceValue: 0
          }));
        }
        if (options.axisY.type === undefined) {
          labelAxis = axisY = new StepAxis(axisUnits.y, normalizedData.series, chartRect, {
            ticks: labelAxisTicks
          });
        } else {
          // eslint-disable-next-line new-cap
          labelAxis = axisY = new options.axisY.type(axisUnits.y, normalizedData.series, chartRect, options.axisY);
        }
      } else {
        if (options.axisX.type === undefined) {
          labelAxis = axisX = new StepAxis(axisUnits.x, normalizedData.series, chartRect, {
            ticks: labelAxisTicks
          });
        } else {
          // eslint-disable-next-line new-cap
          labelAxis = axisX = new options.axisX.type(axisUnits.x, normalizedData.series, chartRect, options.axisX);
        }
        if (options.axisY.type === undefined) {
          valueAxis = axisY = new AutoScaleAxis(axisUnits.y, normalizedData.series, chartRect, _objectSpread(_objectSpread({}, options.axisY), {}, {
            highLow: highLow,
            referenceValue: 0
          }));
        } else {
          // eslint-disable-next-line new-cap
          valueAxis = axisY = new options.axisY.type(axisUnits.y, normalizedData.series, chartRect, _objectSpread(_objectSpread({}, options.axisY), {}, {
            highLow: highLow,
            referenceValue: 0
          }));
        }
      }
      // Projected 0 point
      var zeroPoint = options.horizontalBars ? chartRect.x1 + valueAxis.projectValue(0) : chartRect.y1 - valueAxis.projectValue(0);
      var isAccumulateStackMode = options.stackMode === "accumulate";
      var isAccumulateRelativeStackMode = options.stackMode === "accumulate-relative";
      // Used to track the screen coordinates of stacked bars
      var posStackedBarValues = [];
      var negStackedBarValues = [];
      var stackedBarValues = posStackedBarValues;
      labelAxis.createGridAndLabels(gridGroup, labelGroup, options, this.eventEmitter);
      valueAxis.createGridAndLabels(gridGroup, labelGroup, options, this.eventEmitter);
      if (options.showGridBackground) {
        createGridBackground(gridGroup, chartRect, options.classNames.gridBackground, this.eventEmitter);
      }
      // Draw the series
      each(data.series, function (series, seriesIndex) {
        // Calculating bi-polar value of index for seriesOffset. For i = 0..4 biPol will be -1.5, -0.5, 0.5, 1.5 etc.
        var biPol = seriesIndex - (data.series.length - 1) / 2;
        // Half of the period width between vertical grid lines used to position bars
        var periodHalfLength;
        // We need to set periodHalfLength based on some options combinations
        if (options.distributeSeries && !options.stackBars) {
          // If distributed series are enabled but stacked bars aren't, we need to use the length of the normaizedData array
          // which is the series count and divide by 2
          periodHalfLength = labelAxis.axisLength / normalizedData.series.length / 2;
        } else if (options.distributeSeries && options.stackBars) {
          // If distributed series and stacked bars are enabled we'll only get one bar so we should just divide the axis
          // length by 2
          periodHalfLength = labelAxis.axisLength / 2;
        } else {
          // On regular bar charts we should just use the series length
          periodHalfLength = labelAxis.axisLength / normalizedData.series[seriesIndex].length / 2;
        }
        // Adding the series group to the series element
        var seriesElement = seriesGroup.elem("g");
        var seriesName = safeHasProperty(series, "name") && series.name;
        var seriesClassName = safeHasProperty(series, "className") && series.className;
        var seriesMeta = safeHasProperty(series, "meta") ? series.meta : undefined;
        // Write attributes to series group element. If series name or meta is undefined the attributes will not be written
        if (seriesName) {
          seriesElement.attr({
            "ct:series-name": seriesName
          });
        }
        if (seriesMeta) {
          seriesElement.attr({
            "ct:meta": serialize(seriesMeta)
          });
        }
        // Use series class from series data or if not set generate one
        seriesElement.addClass([options.classNames.series, seriesClassName || "".concat(options.classNames.series, "-").concat(alphaNumerate(seriesIndex))].join(" "));
        normalizedData.series[seriesIndex].forEach(function (value, valueIndex) {
          var _positions;
          var valueX = safeHasProperty(value, "x") && value.x;
          var valueY = safeHasProperty(value, "y") && value.y;
          var labelAxisValueIndex;
          // We need to set labelAxisValueIndex based on some options combinations
          if (options.distributeSeries && !options.stackBars) {
            // If distributed series are enabled but stacked bars aren't, we can use the seriesIndex for later projection
            // on the step axis for label positioning
            labelAxisValueIndex = seriesIndex;
          } else if (options.distributeSeries && options.stackBars) {
            // If distributed series and stacked bars are enabled, we will only get one bar and therefore always use
            // 0 for projection on the label step axis
            labelAxisValueIndex = 0;
          } else {
            // On regular bar charts we just use the value index to project on the label step axis
            labelAxisValueIndex = valueIndex;
          }
          var projected;
          // We need to transform coordinates differently based on the chart layout
          if (options.horizontalBars) {
            projected = {
              x: chartRect.x1 + valueAxis.projectValue(valueX || 0, valueIndex, normalizedData.series[seriesIndex]),
              y: chartRect.y1 - labelAxis.projectValue(valueY || 0, labelAxisValueIndex, normalizedData.series[seriesIndex])
            };
          } else {
            projected = {
              x: chartRect.x1 + labelAxis.projectValue(valueX || 0, labelAxisValueIndex, normalizedData.series[seriesIndex]),
              y: chartRect.y1 - valueAxis.projectValue(valueY || 0, valueIndex, normalizedData.series[seriesIndex])
            };
          }
          // If the label axis is a step based axis we will offset the bar into the middle of between two steps using
          // the periodHalfLength value. Also we do arrange the different series so that they align up to each other using
          // the seriesBarDistance. If we don't have a step axis, the bar positions can be chosen freely so we should not
          // add any automated positioning.
          if (labelAxis instanceof StepAxis) {
            // Offset to center bar between grid lines, but only if the step axis is not stretched
            if (!labelAxis.stretch) {
              projected[labelAxis.units.pos] += periodHalfLength * (options.horizontalBars ? -1 : 1);
            }
            // Using bi-polar offset for multiple series if no stacked bars or series distribution is used
            projected[labelAxis.units.pos] += options.stackBars || options.distributeSeries ? 0 : biPol * options.seriesBarDistance * (options.horizontalBars ? -1 : 1);
          }
          // distinguish between positive and negative values in relative stack mode
          if (isAccumulateRelativeStackMode) {
            stackedBarValues = valueY >= 0 || valueX >= 0 ? posStackedBarValues : negStackedBarValues;
          }
          // Enter value in stacked bar values used to remember previous screen value for stacking up bars
          var previousStack = stackedBarValues[valueIndex] || zeroPoint;
          stackedBarValues[valueIndex] = previousStack - (zeroPoint - projected[labelAxis.counterUnits.pos]);
          // Skip if value is undefined
          if (value === undefined) {
            return;
          }
          var positions = (_positions = {}, _defineProperty(_positions, "".concat(labelAxis.units.pos, "1"), projected[labelAxis.units.pos]), _defineProperty(_positions, "".concat(labelAxis.units.pos, "2"), projected[labelAxis.units.pos]), _positions);
          if (options.stackBars && (isAccumulateStackMode || isAccumulateRelativeStackMode || !options.stackMode)) {
            // Stack mode: accumulate (default)
            // If bars are stacked we use the stackedBarValues reference and otherwise base all bars off the zero line
            // We want backwards compatibility, so the expected fallback without the 'stackMode' option
            // to be the original behaviour (accumulate)
            positions["".concat(labelAxis.counterUnits.pos, "1")] = previousStack;
            positions["".concat(labelAxis.counterUnits.pos, "2")] = stackedBarValues[valueIndex];
          } else {
            // Draw from the zero line normally
            // This is also the same code for Stack mode: overlap
            positions["".concat(labelAxis.counterUnits.pos, "1")] = zeroPoint;
            positions["".concat(labelAxis.counterUnits.pos, "2")] = projected[labelAxis.counterUnits.pos];
          }
          // Limit x and y so that they are within the chart rect
          positions.x1 = Math.min(Math.max(positions.x1, chartRect.x1), chartRect.x2);
          positions.x2 = Math.min(Math.max(positions.x2, chartRect.x1), chartRect.x2);
          positions.y1 = Math.min(Math.max(positions.y1, chartRect.y2), chartRect.y1);
          positions.y2 = Math.min(Math.max(positions.y2, chartRect.y2), chartRect.y1);
          var metaData = getMetaData(series, valueIndex);
          // Create bar element
          var bar = seriesElement.elem("line", positions, options.classNames.bar).attr({
            "ct:value": [valueX, valueY].filter(isNumeric).join(","),
            "ct:meta": serialize(metaData)
          });
          _this13.eventEmitter.emit("draw", _objectSpread({
            type: "bar",
            value: value,
            index: valueIndex,
            meta: metaData,
            series: series,
            seriesIndex: seriesIndex,
            axisX: axisX,
            axisY: axisY,
            chartRect: chartRect,
            group: seriesElement,
            element: bar
          }, positions));
        });
      }, options.reverseData);
      this.eventEmitter.emit("created", {
        chartRect: chartRect,
        axisX: axisX,
        axisY: axisY,
        svg: svg,
        options: options
      });
    }
  }]);
  return BarChart;
}(BaseChart);
/**
 * Default options in line charts. Expand the code view to see a detailed list of options with comments.
 */
exports.BarChart = BarChart;
var defaultOptions = {
  // Specify a fixed width for the chart as a string (i.e. '100px' or '50%')
  width: undefined,
  // Specify a fixed height for the chart as a string (i.e. '100px' or '50%')
  height: undefined,
  // Padding of the chart drawing area to the container element and labels as a number or padding object {top: 5, right: 5, bottom: 5, left: 5}
  chartPadding: 5,
  // Override the class names that are used to generate the SVG structure of the chart
  classNames: {
    chartPie: "ct-chart-pie",
    chartDonut: "ct-chart-donut",
    series: "ct-series",
    slicePie: "ct-slice-pie",
    sliceDonut: "ct-slice-donut",
    label: "ct-label"
  },
  // The start angle of the pie chart in degrees where 0 points north. A higher value offsets the start angle clockwise.
  startAngle: 0,
  // An optional total you can specify. By specifying a total value, the sum of the values in the series must be this total in order to draw a full pie. You can use this parameter to draw only parts of a pie or gauge charts.
  total: undefined,
  // If specified the donut CSS classes will be used and strokes will be drawn instead of pie slices.
  donut: false,
  // Specify the donut stroke width, currently done in javascript for convenience. May move to CSS styles in the future.
  // This option can be set as number or string to specify a relative width (i.e. 100 or '30%').
  donutWidth: 60,
  // If a label should be shown or not
  showLabel: true,
  // Label position offset from the standard position which is half distance of the radius. This value can be either positive or negative. Positive values will position the label away from the center.
  labelOffset: 0,
  // This option can be set to 'inside', 'outside' or 'center'. Positioned with 'inside' the labels will be placed on half the distance of the radius to the border of the Pie by respecting the 'labelOffset'. The 'outside' option will place the labels at the border of the pie and 'center' will place the labels in the absolute center point of the chart. The 'center' option only makes sense in conjunction with the 'labelOffset' option.
  labelPosition: "inside",
  // An interpolation function for the label value
  labelInterpolationFnc: noop,
  // Label direction can be 'neutral', 'explode' or 'implode'. The labels anchor will be positioned based on those settings as well as the fact if the labels are on the right or left side of the center of the chart. Usually explode is useful when labels are positioned far away from the center.
  labelDirection: "neutral",
  // If true empty values will be ignored to avoid drawing unnecessary slices and labels
  ignoreEmptyValues: false
};
/**
 * Determines SVG anchor position based on direction and center parameter
 */
function determineAnchorPosition(center, label, direction) {
  var toTheRight = label.x > center.x;
  if (toTheRight && direction === "explode" || !toTheRight && direction === "implode") {
    return "start";
  } else if (toTheRight && direction === "implode" || !toTheRight && direction === "explode") {
    return "end";
  } else {
    return "middle";
  }
}
var PieChart = /*#__PURE__*/function (_BaseChart3) {
  _inherits(PieChart, _BaseChart3);
  var _super6 = _createSuper(PieChart);
  /**
  * This method creates a new pie chart and returns an object that can be used to redraw the chart.
  * @param query A selector query string or directly a DOM element
  * @param data The data object in the pie chart needs to have a series property with a one dimensional data array. The values will be normalized against each other and don't necessarily need to be in percentage. The series property can also be an array of value objects that contain a value property and a className property to override the CSS class name for the series group.
  * @param options The options object with options that override the default options. Check the examples for a detailed list.
  * @param responsiveOptions Specify an array of responsive option arrays which are a media query and options object pair => [[mediaQueryString, optionsObject],[more...]]
  *
  * @example
  * ```ts
  * // Simple pie chart example with four series
  * new PieChart('.ct-chart', {
  *   series: [10, 2, 4, 3]
  * });
  * ```
  *
  * @example
  * ```ts
  * // Drawing a donut chart
  * new PieChart('.ct-chart', {
  *   series: [10, 2, 4, 3]
  * }, {
  *   donut: true
  * });
  * ```
  *
  * @example
  * ```ts
  * // Using donut, startAngle and total to draw a gauge chart
  * new PieChart('.ct-chart', {
  *   series: [20, 10, 30, 40]
  * }, {
  *   donut: true,
  *   donutWidth: 20,
  *   startAngle: 270,
  *   total: 200
  * });
  * ```
  *
  * @example
  * ```ts
  * // Drawing a pie chart with padding and labels that are outside the pie
  * new PieChart('.ct-chart', {
  *   series: [20, 10, 30, 40]
  * }, {
  *   chartPadding: 30,
  *   labelOffset: 50,
  *   labelDirection: 'explode'
  * });
  * ```
  *
  * @example
  * ```ts
  * // Overriding the class names for individual series as well as a name and meta data.
  * // The name will be written as ct:series-name attribute and the meta data will be serialized and written
  * // to a ct:meta attribute.
  * new PieChart('.ct-chart', {
  *   series: [{
  *     value: 20,
  *     name: 'Series 1',
  *     className: 'my-custom-class-one',
  *     meta: 'Meta One'
  *   }, {
  *     value: 10,
  *     name: 'Series 2',
  *     className: 'my-custom-class-two',
  *     meta: 'Meta Two'
  *   }, {
  *     value: 70,
  *     name: 'Series 3',
  *     className: 'my-custom-class-three',
  *     meta: 'Meta Three'
  *   }]
  * });
  * ```
  */
  function PieChart(query, data, options, responsiveOptions) {
    var _this14;
    _classCallCheck(this, PieChart);
    _this14 = _super6.call(this, query, data, defaultOptions, extend({}, defaultOptions, options), responsiveOptions);
    _this14.data = data;
    return _this14;
  }
  _createClass(PieChart, [{
    key: "createChart",
    value:
    /**
    * Creates the pie chart
    *
    * @param options
    */
    function createChart(options) {
      var _this15 = this;
      var data = this.data;
      var normalizedData = normalizeData(data);
      var seriesGroups = [];
      var labelsGroup;
      var labelRadius;
      var startAngle = options.startAngle;
      // Create SVG.js draw
      var svg = createSvg(this.container, options.width, options.height, options.donut ? options.classNames.chartDonut : options.classNames.chartPie);
      this.svg = svg;
      // Calculate charting rect
      var chartRect = createChartRect(svg, options);
      // Get biggest circle radius possible within chartRect
      var radius = Math.min(chartRect.width() / 2, chartRect.height() / 2);
      // Calculate total of all series to get reference value or use total reference from optional options
      var totalDataSum = options.total || normalizedData.series.reduce(sum, 0);
      var donutWidth = quantity(options.donutWidth);
      if (donutWidth.unit === "%") {
        donutWidth.value *= radius / 100;
      }
      // If this is a donut chart we need to adjust our radius to enable strokes to be drawn inside
      // Unfortunately this is not possible with the current SVG Spec
      // See this proposal for more details: http://lists.w3.org/Archives/Public/www-svg/2003Oct/0000.html
      radius -= options.donut ? donutWidth.value / 2 : 0;
      // If labelPosition is set to `outside` or a donut chart is drawn then the label position is at the radius,
      // if regular pie chart it's half of the radius
      if (options.labelPosition === "outside" || options.donut) {
        labelRadius = radius;
      } else if (options.labelPosition === "center") {
        // If labelPosition is center we start with 0 and will later wait for the labelOffset
        labelRadius = 0;
      } else {
        // Default option is 'inside' where we use half the radius so the label will be placed in the center of the pie
        // slice
        labelRadius = radius / 2;
      }
      // Add the offset to the labelRadius where a negative offset means closed to the center of the chart
      if (options.labelOffset) {
        labelRadius += options.labelOffset;
      }
      // Calculate end angle based on total sum and current data value and offset with padding
      var center = {
        x: chartRect.x1 + chartRect.width() / 2,
        y: chartRect.y2 + chartRect.height() / 2
      };
      // Check if there is only one non-zero value in the series array.
      var hasSingleValInSeries = data.series.filter(function (val) {
        return safeHasProperty(val, "value") ? val.value !== 0 : val !== 0;
      }).length === 1;
      // Creating the series groups
      data.series.forEach(function (_, index) {
        return seriesGroups[index] = svg.elem("g");
      });
      // if we need to show labels we create the label group now
      if (options.showLabel) {
        labelsGroup = svg.elem("g");
      }
      // Draw the series
      // initialize series groups
      data.series.forEach(function (series, index) {
        var ref, ref1;
        // If current value is zero and we are ignoring empty values then skip to next value
        if (normalizedData.series[index] === 0 && options.ignoreEmptyValues) {
          return;
        }
        var seriesName = safeHasProperty(series, "name") && series.name;
        var seriesClassName = safeHasProperty(series, "className") && series.className;
        var seriesMeta = safeHasProperty(series, "meta") ? series.meta : undefined;
        // If the series is an object and contains a name or meta data we add a custom attribute
        if (seriesName) {
          seriesGroups[index].attr({
            "ct:series-name": seriesName
          });
        }
        // Use series class from series data or if not set generate one
        seriesGroups[index].addClass([(ref = options.classNames) === null || ref === void 0 ? void 0 : ref.series, seriesClassName || "".concat((ref1 = options.classNames) === null || ref1 === void 0 ? void 0 : ref1.series, "-").concat(alphaNumerate(index))].join(" "));
        // If the whole dataset is 0 endAngle should be zero. Can't divide by 0.
        var endAngle = totalDataSum > 0 ? startAngle + normalizedData.series[index] / totalDataSum * 360 : 0;
        // Use slight offset so there are no transparent hairline issues
        var overlappigStartAngle = Math.max(0, startAngle - (index === 0 || hasSingleValInSeries ? 0 : 0.2));
        // If we need to draw the arc for all 360 degrees we need to add a hack where we close the circle
        // with Z and use 359.99 degrees
        if (endAngle - overlappigStartAngle >= 359.99) {
          endAngle = overlappigStartAngle + 359.99;
        }
        var start = polarToCartesian(center.x, center.y, radius, overlappigStartAngle);
        var end = polarToCartesian(center.x, center.y, radius, endAngle);
        // Create a new path element for the pie chart. If this isn't a donut chart we should close the path for a correct stroke
        var path = new SvgPath(!options.donut).move(end.x, end.y).arc(radius, radius, 0, Number(endAngle - startAngle > 180), 0, start.x, start.y);
        // If regular pie chart (no donut) we add a line to the center of the circle for completing the pie
        if (!options.donut) {
          path.line(center.x, center.y);
        }
        // Create the SVG path
        // If this is a donut chart we add the donut class, otherwise just a regular slice
        var pathElement = seriesGroups[index].elem("path", {
          d: path.stringify()
        }, options.donut ? options.classNames.sliceDonut : options.classNames.slicePie);
        // Adding the pie series value to the path
        pathElement.attr({
          "ct:value": normalizedData.series[index],
          "ct:meta": serialize(seriesMeta)
        });
        // If this is a donut, we add the stroke-width as style attribute
        if (options.donut) {
          pathElement.attr({
            style: "stroke-width: " + donutWidth.value + "px"
          });
        }
        // Fire off draw event
        _this15.eventEmitter.emit("draw", {
          type: "slice",
          value: normalizedData.series[index],
          totalDataSum: totalDataSum,
          index: index,
          meta: seriesMeta,
          series: series,
          group: seriesGroups[index],
          element: pathElement,
          path: path.clone(),
          center: center,
          radius: radius,
          startAngle: startAngle,
          endAngle: endAngle,
          chartRect: chartRect
        });
        // If we need to show labels we need to add the label for this slice now
        if (options.showLabel) {
          var labelPosition;
          if (data.series.length === 1) {
            // If we have only 1 series, we can position the label in the center of the pie
            labelPosition = {
              x: center.x,
              y: center.y
            };
          } else {
            // Position at the labelRadius distance from center and between start and end angle
            labelPosition = polarToCartesian(center.x, center.y, labelRadius, startAngle + (endAngle - startAngle) / 2);
          }
          var rawValue;
          if (normalizedData.labels && !isFalseyButZero(normalizedData.labels[index])) {
            rawValue = normalizedData.labels[index];
          } else {
            rawValue = normalizedData.series[index];
          }
          var interpolatedValue = options.labelInterpolationFnc(rawValue, index);
          if (interpolatedValue || interpolatedValue === 0) {
            var labelElement = labelsGroup.elem("text", {
              dx: labelPosition.x,
              dy: labelPosition.y,
              "text-anchor": determineAnchorPosition(center, labelPosition, options.labelDirection)
            }, options.classNames.label).text(String(interpolatedValue));
            // Fire off draw event
            _this15.eventEmitter.emit("draw", _objectSpread({
              type: "label",
              index: index,
              group: labelsGroup,
              element: labelElement,
              text: "" + interpolatedValue,
              chartRect: chartRect,
              series: series,
              meta: seriesMeta
            }, labelPosition));
          }
        }
        // Set next startAngle to current endAngle.
        // (except for last slice)
        startAngle = endAngle;
      });
      this.eventEmitter.emit("created", {
        chartRect: chartRect,
        svg: svg,
        options: options
      });
    }
  }]);
  return PieChart;
}(BaseChart);
exports.PieChart = PieChart;
},{}],"modules/info.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.INFO = void 0;
var _app = require("../app.js");
var _utilities = require("./utilities.js");
var _home = require("./home.js");
var _chartist = require("chartist");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var INFO = function () {
  var statList = [];
  var eleGain = 0;
  var eleLoss = 0;
  var gpxPolyline;
  var map;
  var rideDistance;
  var maxSpd;
  function initMap() {
    map = L.map('map').setView([51.919437, 51.919437], 13);
  }
  function setupMap() {
    map.invalidateSize();
    map.fitBounds(gpxPolyline.getBounds());
  }
  function createPolyline(trackPointObjects) {
    var latLngArray = [];
    for (var i = 0; i < trackPointObjects.length; i++) {
      var currentTrackpoint = [];
      currentTrackpoint.push(parseFloat(trackPointObjects[i].lat));
      currentTrackpoint.push(parseFloat(trackPointObjects[i].lon));
      latLngArray.push(currentTrackpoint);
    }
    gpxPolyline = L.polyline(latLngArray, {
      color: 'var(--orange-70)'
    }).addTo(map);
    return gpxPolyline;
  }
  function addMapTiles() {
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
  }
  var Statistic = /*#__PURE__*/function () {
    function Statistic(name, value) {
      _classCallCheck(this, Statistic);
      this.name = name;
      this.value = value;
    }
    _createClass(Statistic, [{
      key: "calcDist",
      value: function calcDist(trackPointObjects) {
        var distance = 0;
        var sum = 0;
        for (var i = 0; i < trackPointObjects.length; i++) {
          sum = distance;
          distance = sum + Number(trackPointObjects[i].dist);
        }
        distance = distance.toFixed(3);
        return distance;
      }
    }, {
      key: "calcMovingTime",
      value: function calcMovingTime(trackPointObjects, gpxFileSize) {
        var movingTime = 0;
        var sum = 0;
        var numberOfOptimizations = _home.HOME.checkFileSize(gpxFileSize);
        // console.log(gpxFileSize);
        // console.log(numberOfOptimizations);

        // console.log(trackPointObjects[1].interval);
        // console.log(APP.stopTime);
        // console.log(Math.pow(2, HOME.noOfOptimizations));
        // console.log(HOME.noOfOptimizations);
        // console.log(APP.stopTime * Math.pow(2, HOME.noOfOptimizations));
        // console.log((trackPointObjects[0].interval < (APP.stopTime * Math.pow(2, HOME.noOfOptimizations))));
        // console.log((trackPointObjects[0].speed > APP.stopSpeed)); //OK!

        for (var i = 0; i < trackPointObjects.length; i++) {
          sum = movingTime;
          if (trackPointObjects[i].interval < _app.APP.stopTime * Math.pow(2, numberOfOptimizations) && trackPointObjects[i].speed > _app.APP.stopSpeed) {
            movingTime = sum + Number(trackPointObjects[i].interval);
          } else {
            movingTime = sum;
          }
        }
        return movingTime;
      }
    }, {
      key: "calcElevationGain",
      value: function calcElevationGain(trackPointObjects) {
        for (var i = 0; i < trackPointObjects.length; i++) {
          if (trackPointObjects[i].eleDiff >= 0) {
            eleGain = eleGain + Number(trackPointObjects[i].eleDiff);
          }
        }
        eleGain = Number(eleGain);
        return eleGain.toFixed(0);
      }
    }, {
      key: "calcElevationLoss",
      value: function calcElevationLoss(trackPointObjects) {
        for (var i = 0; i < trackPointObjects.length; i++) {
          if (trackPointObjects[i].eleDiff < 0) {
            eleLoss = eleLoss + Number(trackPointObjects[i].eleDiff);
          }
        }
        eleLoss = Number(eleLoss);
        return eleLoss.toFixed(0);
      }
    }, {
      key: "calcTotalTime",
      value: function calcTotalTime(trackPointObjects) {
        var totalTime;
        var start = trackPointObjects.at(0);
        var end = trackPointObjects.at(-1);
        totalTime = (Date.parse(end.time) - Date.parse(start.time)) / 1000; //in seconds

        return totalTime;
      }
    }, {
      key: "calcAvgSpeed",
      value: function calcAvgSpeed(totalDistance, trackPointObjects, gpxFileSize) {
        var result;
        var seconds = this.calcMovingTime(trackPointObjects, gpxFileSize);
        result = (totalDistance.value / (seconds / 3600)).toFixed(1);
        return result;
      }
    }, {
      key: "calcMaxSpeed",
      value: function calcMaxSpeed(trackPointObjects) {
        var result = 0;
        var array = trackPointObjects.map(function (_ref) {
          var speed = _ref.speed;
          return speed;
        });
        for (var i = 0; i < trackPointObjects.length; i++) {
          var point1 = parseFloat(array[i]);
          var point2 = parseFloat(array[i - 1]);
          var point3 = parseFloat(array[i - 2]);
          var pointArray = [point1, point2, point3];
          var currentSpeed = void 0;
          currentSpeed = _utilities.UTIL.sumArray(pointArray) / pointArray.length * 3.6; // in km/h

          if (currentSpeed > result) result = currentSpeed.toFixed(1);
        }
        return result;
      }
    }, {
      key: "calcMaxGradient",
      value: function calcMaxGradient(trackPointObjects) {
        var result = 0;
        var array = trackPointObjects.map(function (_ref2) {
          var eleDiff = _ref2.eleDiff,
            dist = _ref2.dist;
          return [eleDiff, dist];
        });
        for (var i = _app.APP.numberSmoothing; i < trackPointObjects.length; i++) {
          var eleDiffArray = [];
          // we need to smooth the numbers to avoid weird values due to geolocation inaccuracies:
          for (var n = 0; n < _app.APP.numberSmoothing; n++) {
            eleDiffArray.push(parseFloat(array[i - n][0]));
          }
          var distArray = [];
          for (var _n = 0; _n < _app.APP.numberSmoothing; _n++) {
            distArray.push(parseFloat(array[i - _n][1]));
          }
          var currentGradient = _utilities.UTIL.sumArray(eleDiffArray) / _utilities.UTIL.sumArray(distArray) * 100; // in %        

          if (currentGradient > result) result = currentGradient.toFixed(1);
        }
        return result;
      }
    }, {
      key: "addStat",
      value: function addStat(stat, unit) {
        statList = "".concat(statList, "\n        <tr>\n          <td>").concat(stat.name, ":</td>\n          <td><b> ").concat(stat.value, "</b> ").concat(unit, "</td>\n        </tr>\n      ");
      }
    }]);
    return Statistic;
  }();
  function calculateStats(trackPointObjects, gpxFileSize) {
    console.log('stat calculation begun.');
    // Total distance
    var totalDistance = new Statistic();
    totalDistance.name = 'Distance';
    totalDistance.value = _utilities.UTIL.metersToKm(totalDistance.calcDist(trackPointObjects));
    totalDistance.addStat(totalDistance, 'km');
    rideDistance = totalDistance.value;

    // Moving time
    var movingTime = new Statistic();
    movingTime.name = 'Moving time';
    movingTime.value = _utilities.UTIL.secondsToMinutesAndSeconds(movingTime.calcMovingTime(trackPointObjects, gpxFileSize));
    movingTime.addStat(movingTime, '');

    // Total time
    var totalTime = new Statistic();
    totalTime.name = 'Total time';
    totalTime.value = _utilities.UTIL.secondsToMinutesAndSeconds(totalTime.calcTotalTime(trackPointObjects));
    totalTime.addStat(totalTime, '');

    // Average speed
    var avgSpeed = new Statistic();
    avgSpeed.name = 'Avg. speed';
    avgSpeed.value = avgSpeed.calcAvgSpeed(totalDistance, trackPointObjects, gpxFileSize);
    avgSpeed.addStat(avgSpeed, 'km/h');

    // Max speed
    var maxSpeed = new Statistic();
    maxSpeed.name = 'Max. speed';
    maxSpeed.value = maxSpeed.calcMaxSpeed(trackPointObjects);
    maxSpeed.addStat(maxSpeed, 'km/h');
    maxSpd = maxSpeed.value;

    // Elevation gain
    var elevationGain = new Statistic();
    elevationGain.name = 'Elevation Gain';
    elevationGain.value = elevationGain.calcElevationGain(trackPointObjects);
    elevationGain.addStat(elevationGain, 'm');

    // Elevation loss
    var elevationLoss = new Statistic();
    elevationLoss.name = 'Elevation Loss';
    elevationLoss.value = elevationLoss.calcElevationLoss(trackPointObjects);
    elevationLoss.addStat(elevationLoss, 'm');

    // Avg. gradient
    var avgGradient = new Statistic();
    avgGradient.name = 'Avg. gradient';
    avgGradient.value = (elevationGain.value / (totalDistance.value * 1000 / 2) * 100).toFixed(1);
    avgGradient.addStat(avgGradient, '%');

    // Max. gradient
    var maxGradient = new Statistic();
    maxGradient.name = 'Max. gradient';
    maxGradient.value = maxGradient.calcMaxGradient(trackPointObjects);
    maxGradient.addStat(maxGradient, '%');
    console.log('stat calculation ended.');
    // console.log(statList);

    return statList;
  }
  function displayAllStats(statList) {
    document.getElementsByClassName("stats__table")[0].innerHTML = statList;
  }
  function prepareElevationGraph(trackPointObjects, fidelityPerc) {
    // We need to divide the ride into equal length segments.
    var graphId = 'graph__elevation';
    var targetDomElement = document.getElementById(graphId);
    var width = targetDomElement.getBoundingClientRect().width;
    var samplePoints = parseInt(width - width * ((100 - fidelityPerc) * 0.01));
    var xAxis = _utilities.UTIL.series(0, rideDistance, samplePoints);

    // Then get points closest to our criteria, and read their values.
    var yAxis = [];
    var n = 0;
    var currentDist;
    var currentEle;
    for (var i = 0; i < trackPointObjects.length;) {
      currentDist = Number(trackPointObjects[i].totDist) / 1000;
      currentEle = trackPointObjects[i].ele;
      // console.log(currentDist);
      if (currentDist >= xAxis[n]) {
        yAxis.push(currentEle);
        n++;
      }
      i++;
    }
    if (yAxis.length = xAxis.length - 1) {
      yAxis.push(trackPointObjects.at(-1).ele);
    }
    displayLineChart(graphId, yAxis);
  }
  function prepareSpeedGraph(trackPointObjects, fidelityPerc) {
    // We need to divide the ride into equal length segments.
    var graphId = 'graph__speed';
    var targetDomElement = document.getElementById(graphId);
    var width = targetDomElement.getBoundingClientRect().width;
    var samplePoints = parseInt(width - width * ((100 - fidelityPerc) * 0.01));
    // samplePoints = 10;

    var xAxis = _utilities.UTIL.series(0, rideDistance, samplePoints);

    // Then get points closest to our criteria, and read their values.
    var yAxis = [];
    var n = 0;
    var currentDist;
    var currentEle;
    var currentSpeed;

    // let graphMargin = 20; // percent
    // let graphTop = (maxSpd * ( 1 + graphMargin/100 )) / 3.6;
    // let graphBottom = (maxSpd * ( graphMargin/100 )) / 3.6;
    // console.log(graphBottom);

    for (var i = 0; i < trackPointObjects.length;) {
      currentDist = Number(trackPointObjects[i].totDist) / 1000;
      currentSpeed = trackPointObjects[i].speed;
      // console.log(currentDist);
      if (currentDist >= xAxis[n]) {
        yAxis.push(currentSpeed);
        n++;
      }
      i++;
    }
    if (yAxis.length = xAxis.length - 1) {
      yAxis.push(trackPointObjects.at(-1).speed);
    }
    displayLineChart(graphId, yAxis, 0);
  }
  function prepareGradientsGraph(trackPointObjects) {
    var graphId = 'graph__gradients';
    var result = 0;
    var array = trackPointObjects.map(function (_ref3) {
      var eleDiff = _ref3.eleDiff,
        dist = _ref3.dist,
        interval = _ref3.interval;
      return [eleDiff, dist, interval];
    });
    var gradientsArray = Array(_app.APP.numberSmoothing).fill('0');
    var intervalArray = [];
    for (var i = 0; i < _app.APP.numberSmoothing; i++) {
      intervalArray.push(array[i][2]);
    }
    var isArrayValid = false;
    var valuesToChart;
    var prepareGradArray = function prepareGradArray() {
      return new Promise(function (resolve, reject) {
        for (var _i = _app.APP.numberSmoothing; _i < trackPointObjects.length; _i++) {
          var eleDiffArray = [];
          // we need to smooth the numbers to avoid weird values due to geolocation inaccuracies:
          for (var n = 0; n < _app.APP.numberSmoothing; n++) {
            eleDiffArray.push(parseFloat(array[_i - n][0]));
          }
          var distArray = [];
          for (var _n2 = 0; _n2 < _app.APP.numberSmoothing; _n2++) {
            distArray.push(parseFloat(array[_i - _n2][1]));
          }
          var currentGradient = _utilities.UTIL.sumArray(eleDiffArray) / _utilities.UTIL.sumArray(distArray) * 100; // in %        
          var currentInterval = parseFloat(array[_i][2]);
          intervalArray.push(currentInterval);
          gradientsArray.push(currentGradient.toFixed(1));
        }
        if (gradientsArray.length = trackPointObjects.length) {
          isArrayValid = true;
          console.log('Array is valid.');
          resolve('Array is valid.');
        } else {
          isArrayValid = false;
          console.log('Array is invalid.');
          reject('Array is invalid.');
        }
      }, isArrayValid);
    };
    function sortGradientsByTime(gradArray, intArray, boundaries) {
      var downhill = boundaries[0];
      var flat = boundaries[1];
      var mildUphill = boundaries[2];
      var downhillArray = [];
      var flatArray = [];
      var mildUphillArray = [];
      var steepUphillArray = [];
      for (var _i2 = 0; _i2 < gradArray.length; _i2++) {
        var gradient = gradArray[_i2];
        var interval = intArray[_i2];
        interval = Math.min(interval, _app.APP.stopTime);
        if (gradient < downhill) {
          downhillArray.push(interval);
        } else if (gradient < flat) {
          flatArray.push(interval);
        } else if (gradient < mildUphill) {
          mildUphillArray.push(interval);
        } else {
          steepUphillArray.push(interval);
        }
      }
      result = [_utilities.UTIL.sumArray(downhillArray), _utilities.UTIL.sumArray(flatArray), _utilities.UTIL.sumArray(mildUphillArray), _utilities.UTIL.sumArray(steepUphillArray)];
      console.log(result);
      return result;
    }
    prepareGradArray().then(function () {
      // sort values
      valuesToChart = sortGradientsByTime(gradientsArray, intervalArray, _app.APP.gradientBoundaries);
    }).then(function () {
      displayPieChart(graphId, valuesToChart);
    }).then(function () {});
  }
  function displayLineChart(graphId, valueArray, min, max) {
    var data = {
      // A labels array that can contain any sort of values
      labels: [],
      // Our series array that contains series objects or in this case series data arrays
      series: [valueArray]
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
        offset: 0
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
        labelInterpolationFnc: function labelInterpolationFnc(value) {
          return '$' + value + 'm';
        }
      }
    };
    new _chartist.LineChart("#".concat(graphId), data, options);
  }
  function displayPieChart(graphId, valueArray, min, max) {
    var data = {
      // Our series array that contains series objects or in this case series data arrays
      series: valueArray,
      // A labels array that can contain any sort of values
      labels: ['downhill', 'flat', 'mild uphill', 'steep uphill']
    };
    console.log(data.labels.length);
    var joinedLabels = [];
    var joinLabels = function joinLabels(data) {
      for (var i = 0; i < data.labels.length; i++) {
        var newLabel = void 0;
        var label = data.labels[i];
        var value = data.series[i];
        newLabel = "".concat(label, " ").concat(value);
        joinedLabels.push(newLabel);
      }
      return joinedLabels;
    };
    // joinLabels(data);

    var data2 = data.series;
    var options = {
      chartPadding: 10,
      donut: true,
      donutWidth: 55

      // labelInterpolationFnc: function (data) {
      //   return data + '%';        
      // }
    };

    new _chartist.PieChart("#".concat(graphId), data, options);
  }
  return {
    initMap: initMap,
    calculateStats: calculateStats,
    setupMap: setupMap,
    createPolyline: createPolyline,
    addMapTiles: addMapTiles,
    displayAllStats: displayAllStats,
    prepareElevationGraph: prepareElevationGraph,
    prepareSpeedGraph: prepareSpeedGraph,
    prepareGradientsGraph: prepareGradientsGraph
  };
}();
exports.INFO = INFO;
},{"../app.js":"app.js","./utilities.js":"modules/utilities.js","./home.js":"modules/home.js","chartist":"../node_modules/chartist/dist/index.js"}],"../node_modules/@zip.js/zip.js/lib/core/streams/codecs/deflate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Deflate = ZipDeflate;
var _ref3, _ref4;
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/*
 * This program is based on JZlib 1.0.2 ymnk, JCraft,Inc.
 * JZlib is based on zlib-1.1.3, so all credit should go authors
 * Jean-loup Gailly(jloup@gzip.org) and Mark Adler(madler@alumni.caltech.edu)
 * and contributors of zlib.
 */

// deno-lint-ignore-file no-this-alias prefer-const

// Global

var MAX_BITS = 15;
var D_CODES = 30;
var BL_CODES = 19;
var LENGTH_CODES = 29;
var LITERALS = 256;
var L_CODES = LITERALS + 1 + LENGTH_CODES;
var HEAP_SIZE = 2 * L_CODES + 1;
var END_BLOCK = 256;

// Bit length codes must not exceed MAX_BL_BITS bits
var MAX_BL_BITS = 7;

// repeat previous bit length 3-6 times (2 bits of repeat count)
var REP_3_6 = 16;

// repeat a zero length 3-10 times (3 bits of repeat count)
var REPZ_3_10 = 17;

// repeat a zero length 11-138 times (7 bits of repeat count)
var REPZ_11_138 = 18;

// The lengths of the bit length codes are sent in order of decreasing
// probability, to avoid transmitting the lengths for unused bit
// length codes.

var Buf_size = 8 * 2;

// JZlib version : "1.0.2"
var Z_DEFAULT_COMPRESSION = -1;

// compression strategy
var Z_FILTERED = 1;
var Z_HUFFMAN_ONLY = 2;
var Z_DEFAULT_STRATEGY = 0;
var Z_NO_FLUSH = 0;
var Z_PARTIAL_FLUSH = 1;
var Z_FULL_FLUSH = 3;
var Z_FINISH = 4;
var Z_OK = 0;
var Z_STREAM_END = 1;
var Z_NEED_DICT = 2;
var Z_STREAM_ERROR = -2;
var Z_DATA_ERROR = -3;
var Z_BUF_ERROR = -5;

// Tree

function extractArray(array) {
  return flatArray(array.map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      length = _ref2[0],
      value = _ref2[1];
    return new Array(length).fill(value, 0, length);
  }));
}
function flatArray(array) {
  return array.reduce(function (a, b) {
    return a.concat(Array.isArray(b) ? flatArray(b) : b);
  }, []);
}

// see definition of array dist_code below
var _dist_code = (_ref3 = [0, 1, 2, 3]).concat.apply(_ref3, _toConsumableArray(extractArray([[2, 4], [2, 5], [4, 6], [4, 7], [8, 8], [8, 9], [16, 10], [16, 11], [32, 12], [32, 13], [64, 14], [64, 15], [2, 0], [1, 16], [1, 17], [2, 18], [2, 19], [4, 20], [4, 21], [8, 22], [8, 23], [16, 24], [16, 25], [32, 26], [32, 27], [64, 28], [64, 29]])));
function Tree() {
  var that = this;

  // dyn_tree; // the dynamic tree
  // max_code; // largest code with non zero frequency
  // stat_desc; // the corresponding static tree

  // Compute the optimal bit lengths for a tree and update the total bit
  // length
  // for the current block.
  // IN assertion: the fields freq and dad are set, heap[heap_max] and
  // above are the tree nodes sorted by increasing frequency.
  // OUT assertions: the field len is set to the optimal bit length, the
  // array bl_count contains the frequencies for each bit length.
  // The length opt_len is updated; static_len is also updated if stree is
  // not null.
  function gen_bitlen(s) {
    var tree = that.dyn_tree;
    var stree = that.stat_desc.static_tree;
    var extra = that.stat_desc.extra_bits;
    var base = that.stat_desc.extra_base;
    var max_length = that.stat_desc.max_length;
    var h; // heap index
    var n, m; // iterate over the tree elements
    var bits; // bit length
    var xbits; // extra bits
    var f; // frequency
    var overflow = 0; // number of elements with bit length too large

    for (bits = 0; bits <= MAX_BITS; bits++) s.bl_count[bits] = 0;

    // In a first pass, compute the optimal bit lengths (which may
    // overflow in the case of the bit length tree).
    tree[s.heap[s.heap_max] * 2 + 1] = 0; // root of the heap

    for (h = s.heap_max + 1; h < HEAP_SIZE; h++) {
      n = s.heap[h];
      bits = tree[tree[n * 2 + 1] * 2 + 1] + 1;
      if (bits > max_length) {
        bits = max_length;
        overflow++;
      }
      tree[n * 2 + 1] = bits;
      // We overwrite tree[n*2+1] which is no longer needed

      if (n > that.max_code) continue; // not a leaf node

      s.bl_count[bits]++;
      xbits = 0;
      if (n >= base) xbits = extra[n - base];
      f = tree[n * 2];
      s.opt_len += f * (bits + xbits);
      if (stree) s.static_len += f * (stree[n * 2 + 1] + xbits);
    }
    if (overflow === 0) return;

    // This happens for example on obj2 and pic of the Calgary corpus
    // Find the first bit length which could increase:
    do {
      bits = max_length - 1;
      while (s.bl_count[bits] === 0) bits--;
      s.bl_count[bits]--; // move one leaf down the tree
      s.bl_count[bits + 1] += 2; // move one overflow item as its brother
      s.bl_count[max_length]--;
      // The brother of the overflow item also moves one step up,
      // but this does not affect bl_count[max_length]
      overflow -= 2;
    } while (overflow > 0);
    for (bits = max_length; bits !== 0; bits--) {
      n = s.bl_count[bits];
      while (n !== 0) {
        m = s.heap[--h];
        if (m > that.max_code) continue;
        if (tree[m * 2 + 1] != bits) {
          s.opt_len += (bits - tree[m * 2 + 1]) * tree[m * 2];
          tree[m * 2 + 1] = bits;
        }
        n--;
      }
    }
  }

  // Reverse the first len bits of a code, using straightforward code (a
  // faster
  // method would use a table)
  // IN assertion: 1 <= len <= 15
  function bi_reverse(code,
  // the value to invert
  len // its bit length
  ) {
    var res = 0;
    do {
      res |= code & 1;
      code >>>= 1;
      res <<= 1;
    } while (--len > 0);
    return res >>> 1;
  }

  // Generate the codes for a given tree and bit counts (which need not be
  // optimal).
  // IN assertion: the array bl_count contains the bit length statistics for
  // the given tree and the field len is set for all tree elements.
  // OUT assertion: the field code is set for all tree elements of non
  // zero code length.
  function gen_codes(tree,
  // the tree to decorate
  max_code,
  // largest code with non zero frequency
  bl_count // number of codes at each bit length
  ) {
    var next_code = []; // next code value for each
    // bit length
    var code = 0; // running code value
    var bits; // bit index
    var n; // code index
    var len;

    // The distribution counts are first used to generate the code values
    // without bit reversal.
    for (bits = 1; bits <= MAX_BITS; bits++) {
      next_code[bits] = code = code + bl_count[bits - 1] << 1;
    }

    // Check that the bit counts in bl_count are consistent. The last code
    // must be all ones.
    // Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
    // "inconsistent bit counts");
    // Tracev((stderr,"gen_codes: max_code %d ", max_code));

    for (n = 0; n <= max_code; n++) {
      len = tree[n * 2 + 1];
      if (len === 0) continue;
      // Now reverse the bits
      tree[n * 2] = bi_reverse(next_code[len]++, len);
    }
  }

  // Construct one Huffman tree and assigns the code bit strings and lengths.
  // Update the total bit length for the current block.
  // IN assertion: the field freq is set for all tree elements.
  // OUT assertions: the fields len and code are set to the optimal bit length
  // and corresponding code. The length opt_len is updated; static_len is
  // also updated if stree is not null. The field max_code is set.
  that.build_tree = function (s) {
    var tree = that.dyn_tree;
    var stree = that.stat_desc.static_tree;
    var elems = that.stat_desc.elems;
    var n, m; // iterate over heap elements
    var max_code = -1; // largest code with non zero frequency
    var node; // new node being created

    // Construct the initial heap, with least frequent element in
    // heap[1]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
    // heap[0] is not used.
    s.heap_len = 0;
    s.heap_max = HEAP_SIZE;
    for (n = 0; n < elems; n++) {
      if (tree[n * 2] !== 0) {
        s.heap[++s.heap_len] = max_code = n;
        s.depth[n] = 0;
      } else {
        tree[n * 2 + 1] = 0;
      }
    }

    // The pkzip format requires that at least one distance code exists,
    // and that at least one bit should be sent even if there is only one
    // possible code. So to avoid special checks later on we force at least
    // two codes of non zero frequency.
    while (s.heap_len < 2) {
      node = s.heap[++s.heap_len] = max_code < 2 ? ++max_code : 0;
      tree[node * 2] = 1;
      s.depth[node] = 0;
      s.opt_len--;
      if (stree) s.static_len -= stree[node * 2 + 1];
      // node is 0 or 1 so it does not have extra bits
    }

    that.max_code = max_code;

    // The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
    // establish sub-heaps of increasing lengths:

    for (n = Math.floor(s.heap_len / 2); n >= 1; n--) s.pqdownheap(tree, n);

    // Construct the Huffman tree by repeatedly combining the least two
    // frequent nodes.

    node = elems; // next internal node of the tree
    do {
      // n = node of least frequency
      n = s.heap[1];
      s.heap[1] = s.heap[s.heap_len--];
      s.pqdownheap(tree, 1);
      m = s.heap[1]; // m = node of next least frequency

      s.heap[--s.heap_max] = n; // keep the nodes sorted by frequency
      s.heap[--s.heap_max] = m;

      // Create a new node father of n and m
      tree[node * 2] = tree[n * 2] + tree[m * 2];
      s.depth[node] = Math.max(s.depth[n], s.depth[m]) + 1;
      tree[n * 2 + 1] = tree[m * 2 + 1] = node;

      // and insert the new node in the heap
      s.heap[1] = node++;
      s.pqdownheap(tree, 1);
    } while (s.heap_len >= 2);
    s.heap[--s.heap_max] = s.heap[1];

    // At this point, the fields freq and dad are set. We can now
    // generate the bit lengths.

    gen_bitlen(s);

    // The field len is now set, we can generate the bit codes
    gen_codes(tree, that.max_code, s.bl_count);
  };
}
Tree._length_code = (_ref4 = [0, 1, 2, 3, 4, 5, 6, 7]).concat.apply(_ref4, _toConsumableArray(extractArray([[2, 8], [2, 9], [2, 10], [2, 11], [4, 12], [4, 13], [4, 14], [4, 15], [8, 16], [8, 17], [8, 18], [8, 19], [16, 20], [16, 21], [16, 22], [16, 23], [32, 24], [32, 25], [32, 26], [31, 27], [1, 28]])));
Tree.base_length = [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 0];
Tree.base_dist = [0, 1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192, 256, 384, 512, 768, 1024, 1536, 2048, 3072, 4096, 6144, 8192, 12288, 16384, 24576];

// Mapping from a distance to a distance code. dist is the distance - 1 and
// must not have side effects. _dist_code[256] and _dist_code[257] are never
// used.
Tree.d_code = function (dist) {
  return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
};

// extra bits for each length code
Tree.extra_lbits = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0];

// extra bits for each distance code
Tree.extra_dbits = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];

// extra bits for each bit length code
Tree.extra_blbits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7];
Tree.bl_order = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];

// StaticTree

function StaticTree(static_tree, extra_bits, extra_base, elems, max_length) {
  var that = this;
  that.static_tree = static_tree;
  that.extra_bits = extra_bits;
  that.extra_base = extra_base;
  that.elems = elems;
  that.max_length = max_length;
}
var static_ltree2_first_part = [12, 140, 76, 204, 44, 172, 108, 236, 28, 156, 92, 220, 60, 188, 124, 252, 2, 130, 66, 194, 34, 162, 98, 226, 18, 146, 82, 210, 50, 178, 114, 242, 10, 138, 74, 202, 42, 170, 106, 234, 26, 154, 90, 218, 58, 186, 122, 250, 6, 134, 70, 198, 38, 166, 102, 230, 22, 150, 86, 214, 54, 182, 118, 246, 14, 142, 78, 206, 46, 174, 110, 238, 30, 158, 94, 222, 62, 190, 126, 254, 1, 129, 65, 193, 33, 161, 97, 225, 17, 145, 81, 209, 49, 177, 113, 241, 9, 137, 73, 201, 41, 169, 105, 233, 25, 153, 89, 217, 57, 185, 121, 249, 5, 133, 69, 197, 37, 165, 101, 229, 21, 149, 85, 213, 53, 181, 117, 245, 13, 141, 77, 205, 45, 173, 109, 237, 29, 157, 93, 221, 61, 189, 125, 253, 19, 275, 147, 403, 83, 339, 211, 467, 51, 307, 179, 435, 115, 371, 243, 499, 11, 267, 139, 395, 75, 331, 203, 459, 43, 299, 171, 427, 107, 363, 235, 491, 27, 283, 155, 411, 91, 347, 219, 475, 59, 315, 187, 443, 123, 379, 251, 507, 7, 263, 135, 391, 71, 327, 199, 455, 39, 295, 167, 423, 103, 359, 231, 487, 23, 279, 151, 407, 87, 343, 215, 471, 55, 311, 183, 439, 119, 375, 247, 503, 15, 271, 143, 399, 79, 335, 207, 463, 47, 303, 175, 431, 111, 367, 239, 495, 31, 287, 159, 415, 95, 351, 223, 479, 63, 319, 191, 447, 127, 383, 255, 511, 0, 64, 32, 96, 16, 80, 48, 112, 8, 72, 40, 104, 24, 88, 56, 120, 4, 68, 36, 100, 20, 84, 52, 116, 3, 131, 67, 195, 35, 163, 99, 227];
var static_ltree2_second_part = extractArray([[144, 8], [112, 9], [24, 7], [8, 8]]);
StaticTree.static_ltree = flatArray(static_ltree2_first_part.map(function (value, index) {
  return [value, static_ltree2_second_part[index]];
}));
var static_dtree_first_part = [0, 16, 8, 24, 4, 20, 12, 28, 2, 18, 10, 26, 6, 22, 14, 30, 1, 17, 9, 25, 5, 21, 13, 29, 3, 19, 11, 27, 7, 23];
var static_dtree_second_part = extractArray([[30, 5]]);
StaticTree.static_dtree = flatArray(static_dtree_first_part.map(function (value, index) {
  return [value, static_dtree_second_part[index]];
}));
StaticTree.static_l_desc = new StaticTree(StaticTree.static_ltree, Tree.extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);
StaticTree.static_d_desc = new StaticTree(StaticTree.static_dtree, Tree.extra_dbits, 0, D_CODES, MAX_BITS);
StaticTree.static_bl_desc = new StaticTree(null, Tree.extra_blbits, 0, BL_CODES, MAX_BL_BITS);

// Deflate

var MAX_MEM_LEVEL = 9;
var DEF_MEM_LEVEL = 8;
function Config(good_length, max_lazy, nice_length, max_chain, func) {
  var that = this;
  that.good_length = good_length;
  that.max_lazy = max_lazy;
  that.nice_length = nice_length;
  that.max_chain = max_chain;
  that.func = func;
}
var STORED = 0;
var FAST = 1;
var SLOW = 2;
var config_table = [new Config(0, 0, 0, 0, STORED), new Config(4, 4, 8, 4, FAST), new Config(4, 5, 16, 8, FAST), new Config(4, 6, 32, 32, FAST), new Config(4, 4, 16, 16, SLOW), new Config(8, 16, 32, 32, SLOW), new Config(8, 16, 128, 128, SLOW), new Config(8, 32, 128, 256, SLOW), new Config(32, 128, 258, 1024, SLOW), new Config(32, 258, 258, 4096, SLOW)];
var z_errmsg = ["need dictionary",
// Z_NEED_DICT
// 2
"stream end",
// Z_STREAM_END 1
"",
// Z_OK 0
"",
// Z_ERRNO (-1)
"stream error",
// Z_STREAM_ERROR (-2)
"data error",
// Z_DATA_ERROR (-3)
"",
// Z_MEM_ERROR (-4)
"buffer error",
// Z_BUF_ERROR (-5)
"",
// Z_VERSION_ERROR (-6)
""];

// block not completed, need more input or more output
var NeedMore = 0;

// block flush performed
var BlockDone = 1;

// finish started, need only more output at next deflate
var FinishStarted = 2;

// finish done, accept no more input or output
var FinishDone = 3;

// preset dictionary flag in zlib header
var PRESET_DICT = 0x20;
var INIT_STATE = 42;
var BUSY_STATE = 113;
var FINISH_STATE = 666;

// The deflate compression method
var Z_DEFLATED = 8;
var STORED_BLOCK = 0;
var STATIC_TREES = 1;
var DYN_TREES = 2;
var MIN_MATCH = 3;
var MAX_MATCH = 258;
var MIN_LOOKAHEAD = MAX_MATCH + MIN_MATCH + 1;
function smaller(tree, n, m, depth) {
  var tn2 = tree[n * 2];
  var tm2 = tree[m * 2];
  return tn2 < tm2 || tn2 == tm2 && depth[n] <= depth[m];
}
function Deflate() {
  var that = this;
  var strm; // pointer back to this zlib stream
  var status; // as the name implies
  // pending_buf; // output still pending
  var pending_buf_size; // size of pending_buf
  // pending_out; // next pending byte to output to the stream
  // pending; // nb of bytes in the pending buffer

  // dist_buf; // buffer for distances
  // lc_buf; // buffer for literals or lengths
  // To simplify the code, dist_buf and lc_buf have the same number of elements.
  // To use different lengths, an extra flag array would be necessary.

  var last_flush; // value of flush param for previous deflate call

  var w_size; // LZ77 win size (32K by default)
  var w_bits; // log2(w_size) (8..16)
  var w_mask; // w_size - 1

  var win;
  // Sliding win. Input bytes are read into the second half of the win,
  // and move to the first half later to keep a dictionary of at least wSize
  // bytes. With this organization, matches are limited to a distance of
  // wSize-MAX_MATCH bytes, but this ensures that IO is always
  // performed with a length multiple of the block size. Also, it limits
  // the win size to 64K, which is quite useful on MSDOS.
  // To do: use the user input buffer as sliding win.

  var window_size;
  // Actual size of win: 2*wSize, except when the user input buffer
  // is directly used as sliding win.

  var prev;
  // Link to older string with same hash index. To limit the size of this
  // array to 64K, this link is maintained only for the last 32K strings.
  // An index in this array is thus a win index modulo 32K.

  var head; // Heads of the hash chains or NIL.

  var ins_h; // hash index of string to be inserted
  var hash_size; // number of elements in hash table
  var hash_bits; // log2(hash_size)
  var hash_mask; // hash_size-1

  // Number of bits by which ins_h must be shifted at each input
  // step. It must be such that after MIN_MATCH steps, the oldest
  // byte no longer takes part in the hash key, that is:
  // hash_shift * MIN_MATCH >= hash_bits
  var hash_shift;

  // Window position at the beginning of the current output block. Gets
  // negative when the win is moved backwards.

  var block_start;
  var match_length; // length of best match
  var prev_match; // previous match
  var match_available; // set if previous match exists
  var strstart; // start of string to insert
  var match_start; // start of matching string
  var lookahead; // number of valid bytes ahead in win

  // Length of the best match at previous step. Matches not greater than this
  // are discarded. This is used in the lazy match evaluation.
  var prev_length;

  // To speed up deflation, hash chains are never searched beyond this
  // length. A higher limit improves compression ratio but degrades the speed.
  var max_chain_length;

  // Attempt to find a better match only when the current match is strictly
  // smaller than this value. This mechanism is used only for compression
  // levels >= 4.
  var max_lazy_match;

  // Insert new strings in the hash table only if the match length is not
  // greater than this length. This saves time but degrades compression.
  // max_insert_length is used only for compression levels <= 3.

  var level; // compression level (1..9)
  var strategy; // favor or force Huffman coding

  // Use a faster search when the previous match is longer than this
  var good_match;

  // Stop searching when current match exceeds this
  var nice_match;
  var dyn_ltree; // literal and length tree
  var dyn_dtree; // distance tree
  var bl_tree; // Huffman tree for bit lengths

  var l_desc = new Tree(); // desc for literal tree
  var d_desc = new Tree(); // desc for distance tree
  var bl_desc = new Tree(); // desc for bit length tree

  // that.heap_len; // number of elements in the heap
  // that.heap_max; // element of largest frequency
  // The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.
  // The same heap array is used to build all trees.

  // Depth of each subtree used as tie breaker for trees of equal frequency
  that.depth = [];

  // Size of match buffer for literals/lengths. There are 4 reasons for
  // limiting lit_bufsize to 64K:
  // - frequencies can be kept in 16 bit counters
  // - if compression is not successful for the first block, all input
  // data is still in the win so we can still emit a stored block even
  // when input comes from standard input. (This can also be done for
  // all blocks if lit_bufsize is not greater than 32K.)
  // - if compression is not successful for a file smaller than 64K, we can
  // even emit a stored file instead of a stored block (saving 5 bytes).
  // This is applicable only for zip (not gzip or zlib).
  // - creating new Huffman trees less frequently may not provide fast
  // adaptation to changes in the input data statistics. (Take for
  // example a binary file with poorly compressible code followed by
  // a highly compressible string table.) Smaller buffer sizes give
  // fast adaptation but have of course the overhead of transmitting
  // trees more frequently.
  // - I can't count above 4
  var lit_bufsize;
  var last_lit; // running index in dist_buf and lc_buf

  // that.opt_len; // bit length of current block with optimal trees
  // that.static_len; // bit length of current block with static trees
  var matches; // number of string matches in current block
  var last_eob_len; // bit length of EOB code for last block

  // Output buffer. bits are inserted starting at the bottom (least
  // significant bits).
  var bi_buf;

  // Number of valid bits in bi_buf. All bits above the last valid bit
  // are always zero.
  var bi_valid;

  // number of codes at each bit length for an optimal tree
  that.bl_count = [];

  // heap used to build the Huffman trees
  that.heap = [];
  dyn_ltree = [];
  dyn_dtree = [];
  bl_tree = [];
  function lm_init() {
    window_size = 2 * w_size;
    head[hash_size - 1] = 0;
    for (var i = 0; i < hash_size - 1; i++) {
      head[i] = 0;
    }

    // Set the default configuration parameters:
    max_lazy_match = config_table[level].max_lazy;
    good_match = config_table[level].good_length;
    nice_match = config_table[level].nice_length;
    max_chain_length = config_table[level].max_chain;
    strstart = 0;
    block_start = 0;
    lookahead = 0;
    match_length = prev_length = MIN_MATCH - 1;
    match_available = 0;
    ins_h = 0;
  }
  function init_block() {
    var i;
    // Initialize the trees.
    for (i = 0; i < L_CODES; i++) dyn_ltree[i * 2] = 0;
    for (i = 0; i < D_CODES; i++) dyn_dtree[i * 2] = 0;
    for (i = 0; i < BL_CODES; i++) bl_tree[i * 2] = 0;
    dyn_ltree[END_BLOCK * 2] = 1;
    that.opt_len = that.static_len = 0;
    last_lit = matches = 0;
  }

  // Initialize the tree data structures for a new zlib stream.
  function tr_init() {
    l_desc.dyn_tree = dyn_ltree;
    l_desc.stat_desc = StaticTree.static_l_desc;
    d_desc.dyn_tree = dyn_dtree;
    d_desc.stat_desc = StaticTree.static_d_desc;
    bl_desc.dyn_tree = bl_tree;
    bl_desc.stat_desc = StaticTree.static_bl_desc;
    bi_buf = 0;
    bi_valid = 0;
    last_eob_len = 8; // enough lookahead for inflate

    // Initialize the first block of the first file:
    init_block();
  }

  // Restore the heap property by moving down the tree starting at node k,
  // exchanging a node with the smallest of its two sons if necessary,
  // stopping
  // when the heap property is re-established (each father smaller than its
  // two sons).
  that.pqdownheap = function (tree,
  // the tree to restore
  k // node to move down
  ) {
    var heap = that.heap;
    var v = heap[k];
    var j = k << 1; // left son of k
    while (j <= that.heap_len) {
      // Set j to the smallest of the two sons:
      if (j < that.heap_len && smaller(tree, heap[j + 1], heap[j], that.depth)) {
        j++;
      }
      // Exit if v is smaller than both sons
      if (smaller(tree, v, heap[j], that.depth)) break;

      // Exchange v with the smallest son
      heap[k] = heap[j];
      k = j;
      // And continue down the tree, setting j to the left son of k
      j <<= 1;
    }
    heap[k] = v;
  };

  // Scan a literal or distance tree to determine the frequencies of the codes
  // in the bit length tree.
  function scan_tree(tree,
  // the tree to be scanned
  max_code // and its largest code of non zero frequency
  ) {
    var prevlen = -1; // last emitted length
    var curlen; // length of current code
    var nextlen = tree[0 * 2 + 1]; // length of next code
    var count = 0; // repeat count of the current code
    var max_count = 7; // max repeat count
    var min_count = 4; // min repeat count

    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    }
    tree[(max_code + 1) * 2 + 1] = 0xffff; // guard

    for (var n = 0; n <= max_code; n++) {
      curlen = nextlen;
      nextlen = tree[(n + 1) * 2 + 1];
      if (++count < max_count && curlen == nextlen) {
        continue;
      } else if (count < min_count) {
        bl_tree[curlen * 2] += count;
      } else if (curlen !== 0) {
        if (curlen != prevlen) bl_tree[curlen * 2]++;
        bl_tree[REP_3_6 * 2]++;
      } else if (count <= 10) {
        bl_tree[REPZ_3_10 * 2]++;
      } else {
        bl_tree[REPZ_11_138 * 2]++;
      }
      count = 0;
      prevlen = curlen;
      if (nextlen === 0) {
        max_count = 138;
        min_count = 3;
      } else if (curlen == nextlen) {
        max_count = 6;
        min_count = 3;
      } else {
        max_count = 7;
        min_count = 4;
      }
    }
  }

  // Construct the Huffman tree for the bit lengths and return the index in
  // bl_order of the last bit length code to send.
  function build_bl_tree() {
    var max_blindex; // index of last bit length code of non zero freq

    // Determine the bit length frequencies for literal and distance trees
    scan_tree(dyn_ltree, l_desc.max_code);
    scan_tree(dyn_dtree, d_desc.max_code);

    // Build the bit length tree:
    bl_desc.build_tree(that);
    // opt_len now includes the length of the tree representations, except
    // the lengths of the bit lengths codes and the 5+5+4 bits for the
    // counts.

    // Determine the number of bit length codes to send. The pkzip format
    // requires that at least 4 bit length codes be sent. (appnote.txt says
    // 3 but the actual value used is 4.)
    for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {
      if (bl_tree[Tree.bl_order[max_blindex] * 2 + 1] !== 0) break;
    }
    // Update opt_len to include the bit length tree and counts
    that.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
    return max_blindex;
  }

  // Output a byte on the stream.
  // IN assertion: there is enough room in pending_buf.
  function put_byte(p) {
    that.pending_buf[that.pending++] = p;
  }
  function put_short(w) {
    put_byte(w & 0xff);
    put_byte(w >>> 8 & 0xff);
  }
  function putShortMSB(b) {
    put_byte(b >> 8 & 0xff);
    put_byte(b & 0xff & 0xff);
  }
  function send_bits(value, length) {
    var val;
    var len = length;
    if (bi_valid > Buf_size - len) {
      val = value;
      // bi_buf |= (val << bi_valid);
      bi_buf |= val << bi_valid & 0xffff;
      put_short(bi_buf);
      bi_buf = val >>> Buf_size - bi_valid;
      bi_valid += len - Buf_size;
    } else {
      // bi_buf |= (value) << bi_valid;
      bi_buf |= value << bi_valid & 0xffff;
      bi_valid += len;
    }
  }
  function send_code(c, tree) {
    var c2 = c * 2;
    send_bits(tree[c2] & 0xffff, tree[c2 + 1] & 0xffff);
  }

  // Send a literal or distance tree in compressed form, using the codes in
  // bl_tree.
  function send_tree(tree,
  // the tree to be sent
  max_code // and its largest code of non zero frequency
  ) {
    var n; // iterates over all tree elements
    var prevlen = -1; // last emitted length
    var curlen; // length of current code
    var nextlen = tree[0 * 2 + 1]; // length of next code
    var count = 0; // repeat count of the current code
    var max_count = 7; // max repeat count
    var min_count = 4; // min repeat count

    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    }
    for (n = 0; n <= max_code; n++) {
      curlen = nextlen;
      nextlen = tree[(n + 1) * 2 + 1];
      if (++count < max_count && curlen == nextlen) {
        continue;
      } else if (count < min_count) {
        do {
          send_code(curlen, bl_tree);
        } while (--count !== 0);
      } else if (curlen !== 0) {
        if (curlen != prevlen) {
          send_code(curlen, bl_tree);
          count--;
        }
        send_code(REP_3_6, bl_tree);
        send_bits(count - 3, 2);
      } else if (count <= 10) {
        send_code(REPZ_3_10, bl_tree);
        send_bits(count - 3, 3);
      } else {
        send_code(REPZ_11_138, bl_tree);
        send_bits(count - 11, 7);
      }
      count = 0;
      prevlen = curlen;
      if (nextlen === 0) {
        max_count = 138;
        min_count = 3;
      } else if (curlen == nextlen) {
        max_count = 6;
        min_count = 3;
      } else {
        max_count = 7;
        min_count = 4;
      }
    }
  }

  // Send the header for a block using dynamic Huffman trees: the counts, the
  // lengths of the bit length codes, the literal tree and the distance tree.
  // IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
  function send_all_trees(lcodes, dcodes, blcodes) {
    var rank; // index in bl_order

    send_bits(lcodes - 257, 5); // not +255 as stated in appnote.txt
    send_bits(dcodes - 1, 5);
    send_bits(blcodes - 4, 4); // not -3 as stated in appnote.txt
    for (rank = 0; rank < blcodes; rank++) {
      send_bits(bl_tree[Tree.bl_order[rank] * 2 + 1], 3);
    }
    send_tree(dyn_ltree, lcodes - 1); // literal tree
    send_tree(dyn_dtree, dcodes - 1); // distance tree
  }

  // Flush the bit buffer, keeping at most 7 bits in it.
  function bi_flush() {
    if (bi_valid == 16) {
      put_short(bi_buf);
      bi_buf = 0;
      bi_valid = 0;
    } else if (bi_valid >= 8) {
      put_byte(bi_buf & 0xff);
      bi_buf >>>= 8;
      bi_valid -= 8;
    }
  }

  // Send one empty static block to give enough lookahead for inflate.
  // This takes 10 bits, of which 7 may remain in the bit buffer.
  // The current inflate code requires 9 bits of lookahead. If the
  // last two codes for the previous block (real code plus EOB) were coded
  // on 5 bits or less, inflate may have only 5+3 bits of lookahead to decode
  // the last real code. In this case we send two empty static blocks instead
  // of one. (There are no problems if the previous block is stored or fixed.)
  // To simplify the code, we assume the worst case of last real code encoded
  // on one bit only.
  function _tr_align() {
    send_bits(STATIC_TREES << 1, 3);
    send_code(END_BLOCK, StaticTree.static_ltree);
    bi_flush();

    // Of the 10 bits for the empty block, we have already sent
    // (10 - bi_valid) bits. The lookahead for the last real code (before
    // the EOB of the previous block) was thus at least one plus the length
    // of the EOB plus what we have just sent of the empty static block.
    if (1 + last_eob_len + 10 - bi_valid < 9) {
      send_bits(STATIC_TREES << 1, 3);
      send_code(END_BLOCK, StaticTree.static_ltree);
      bi_flush();
    }
    last_eob_len = 7;
  }

  // Save the match info and tally the frequency counts. Return true if
  // the current block must be flushed.
  function _tr_tally(dist,
  // distance of matched string
  lc // match length-MIN_MATCH or unmatched char (if dist==0)
  ) {
    var out_length, in_length, dcode;
    that.dist_buf[last_lit] = dist;
    that.lc_buf[last_lit] = lc & 0xff;
    last_lit++;
    if (dist === 0) {
      // lc is the unmatched char
      dyn_ltree[lc * 2]++;
    } else {
      matches++;
      // Here, lc is the match length - MIN_MATCH
      dist--; // dist = match distance - 1
      dyn_ltree[(Tree._length_code[lc] + LITERALS + 1) * 2]++;
      dyn_dtree[Tree.d_code(dist) * 2]++;
    }
    if ((last_lit & 0x1fff) === 0 && level > 2) {
      // Compute an upper bound for the compressed length
      out_length = last_lit * 8;
      in_length = strstart - block_start;
      for (dcode = 0; dcode < D_CODES; dcode++) {
        out_length += dyn_dtree[dcode * 2] * (5 + Tree.extra_dbits[dcode]);
      }
      out_length >>>= 3;
      if (matches < Math.floor(last_lit / 2) && out_length < Math.floor(in_length / 2)) return true;
    }
    return last_lit == lit_bufsize - 1;
    // We avoid equality with lit_bufsize because of wraparound at 64K
    // on 16 bit machines and because stored blocks are restricted to
    // 64K-1 bytes.
  }

  // Send the block data compressed using the given Huffman trees
  function compress_block(ltree, dtree) {
    var dist; // distance of matched string
    var lc; // match length or unmatched char (if dist === 0)
    var lx = 0; // running index in dist_buf and lc_buf
    var code; // the code to send
    var extra; // number of extra bits to send

    if (last_lit !== 0) {
      do {
        dist = that.dist_buf[lx];
        lc = that.lc_buf[lx];
        lx++;
        if (dist === 0) {
          send_code(lc, ltree); // send a literal byte
        } else {
          // Here, lc is the match length - MIN_MATCH
          code = Tree._length_code[lc];
          send_code(code + LITERALS + 1, ltree); // send the length
          // code
          extra = Tree.extra_lbits[code];
          if (extra !== 0) {
            lc -= Tree.base_length[code];
            send_bits(lc, extra); // send the extra length bits
          }

          dist--; // dist is now the match distance - 1
          code = Tree.d_code(dist);
          send_code(code, dtree); // send the distance code
          extra = Tree.extra_dbits[code];
          if (extra !== 0) {
            dist -= Tree.base_dist[code];
            send_bits(dist, extra); // send the extra distance bits
          }
        } // literal or match pair ?
      } while (lx < last_lit);
    }
    send_code(END_BLOCK, ltree);
    last_eob_len = ltree[END_BLOCK * 2 + 1];
  }

  // Flush the bit buffer and align the output on a byte boundary
  function bi_windup() {
    if (bi_valid > 8) {
      put_short(bi_buf);
    } else if (bi_valid > 0) {
      put_byte(bi_buf & 0xff);
    }
    bi_buf = 0;
    bi_valid = 0;
  }

  // Copy a stored block, storing first the length and its
  // one's complement if requested.
  function copy_block(buf,
  // the input data
  len,
  // its length
  header // true if block header must be written
  ) {
    bi_windup(); // align on byte boundary
    last_eob_len = 8; // enough lookahead for inflate

    if (header) {
      put_short(len);
      put_short(~len);
    }
    that.pending_buf.set(win.subarray(buf, buf + len), that.pending);
    that.pending += len;
  }

  // Send a stored block
  function _tr_stored_block(buf,
  // input block
  stored_len,
  // length of input block
  eof // true if this is the last block for a file
  ) {
    send_bits((STORED_BLOCK << 1) + (eof ? 1 : 0), 3); // send block type
    copy_block(buf, stored_len, true); // with header
  }

  // Determine the best encoding for the current block: dynamic trees, static
  // trees or store, and output the encoded block to the zip file.
  function _tr_flush_block(buf,
  // input block, or NULL if too old
  stored_len,
  // length of input block
  eof // true if this is the last block for a file
  ) {
    var opt_lenb, static_lenb; // opt_len and static_len in bytes
    var max_blindex = 0; // index of last bit length code of non zero freq

    // Build the Huffman trees unless a stored block is forced
    if (level > 0) {
      // Construct the literal and distance trees
      l_desc.build_tree(that);
      d_desc.build_tree(that);

      // At this point, opt_len and static_len are the total bit lengths
      // of
      // the compressed block data, excluding the tree representations.

      // Build the bit length tree for the above two trees, and get the
      // index
      // in bl_order of the last bit length code to send.
      max_blindex = build_bl_tree();

      // Determine the best encoding. Compute first the block length in
      // bytes
      opt_lenb = that.opt_len + 3 + 7 >>> 3;
      static_lenb = that.static_len + 3 + 7 >>> 3;
      if (static_lenb <= opt_lenb) opt_lenb = static_lenb;
    } else {
      opt_lenb = static_lenb = stored_len + 5; // force a stored block
    }

    if (stored_len + 4 <= opt_lenb && buf != -1) {
      // 4: two words for the lengths
      // The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
      // Otherwise we can't have processed more than WSIZE input bytes
      // since
      // the last block flush, because compression would have been
      // successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
      // transform a block into a stored block.
      _tr_stored_block(buf, stored_len, eof);
    } else if (static_lenb == opt_lenb) {
      send_bits((STATIC_TREES << 1) + (eof ? 1 : 0), 3);
      compress_block(StaticTree.static_ltree, StaticTree.static_dtree);
    } else {
      send_bits((DYN_TREES << 1) + (eof ? 1 : 0), 3);
      send_all_trees(l_desc.max_code + 1, d_desc.max_code + 1, max_blindex + 1);
      compress_block(dyn_ltree, dyn_dtree);
    }

    // The above check is made mod 2^32, for files larger than 512 MB
    // and uLong implemented on 32 bits.

    init_block();
    if (eof) {
      bi_windup();
    }
  }
  function flush_block_only(eof) {
    _tr_flush_block(block_start >= 0 ? block_start : -1, strstart - block_start, eof);
    block_start = strstart;
    strm.flush_pending();
  }

  // Fill the win when the lookahead becomes insufficient.
  // Updates strstart and lookahead.
  //
  // IN assertion: lookahead < MIN_LOOKAHEAD
  // OUT assertions: strstart <= window_size-MIN_LOOKAHEAD
  // At least one byte has been read, or avail_in === 0; reads are
  // performed for at least two bytes (required for the zip translate_eol
  // option -- not supported here).
  function fill_window() {
    var n, m;
    var p;
    var more; // Amount of free space at the end of the win.

    do {
      more = window_size - lookahead - strstart;

      // Deal with !@#$% 64K limit:
      if (more === 0 && strstart === 0 && lookahead === 0) {
        more = w_size;
      } else if (more == -1) {
        // Very unlikely, but possible on 16 bit machine if strstart ==
        // 0
        // and lookahead == 1 (input done one byte at time)
        more--;

        // If the win is almost full and there is insufficient
        // lookahead,
        // move the upper half to the lower one to make room in the
        // upper half.
      } else if (strstart >= w_size + w_size - MIN_LOOKAHEAD) {
        win.set(win.subarray(w_size, w_size + w_size), 0);
        match_start -= w_size;
        strstart -= w_size; // we now have strstart >= MAX_DIST
        block_start -= w_size;

        // Slide the hash table (could be avoided with 32 bit values
        // at the expense of memory usage). We slide even when level ==
        // 0
        // to keep the hash table consistent if we switch back to level
        // > 0
        // later. (Using level 0 permanently is not an optimal usage of
        // zlib, so we don't care about this pathological case.)

        n = hash_size;
        p = n;
        do {
          m = head[--p] & 0xffff;
          head[p] = m >= w_size ? m - w_size : 0;
        } while (--n !== 0);
        n = w_size;
        p = n;
        do {
          m = prev[--p] & 0xffff;
          prev[p] = m >= w_size ? m - w_size : 0;
          // If n is not on any hash chain, prev[n] is garbage but
          // its value will never be used.
        } while (--n !== 0);
        more += w_size;
      }
      if (strm.avail_in === 0) return;

      // If there was no sliding:
      // strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&
      // more == window_size - lookahead - strstart
      // => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)
      // => more >= window_size - 2*WSIZE + 2
      // In the BIG_MEM or MMAP case (not yet supported),
      // window_size == input_size + MIN_LOOKAHEAD &&
      // strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.
      // Otherwise, window_size == 2*WSIZE so more >= 2.
      // If there was sliding, more >= WSIZE. So in all cases, more >= 2.

      n = strm.read_buf(win, strstart + lookahead, more);
      lookahead += n;

      // Initialize the hash value now that we have some input:
      if (lookahead >= MIN_MATCH) {
        ins_h = win[strstart] & 0xff;
        ins_h = (ins_h << hash_shift ^ win[strstart + 1] & 0xff) & hash_mask;
      }
      // If the whole input has less than MIN_MATCH bytes, ins_h is
      // garbage,
      // but this is not important since only literal bytes will be
      // emitted.
    } while (lookahead < MIN_LOOKAHEAD && strm.avail_in !== 0);
  }

  // Copy without compression as much as possible from the input stream,
  // return
  // the current block state.
  // This function does not insert new strings in the dictionary since
  // uncompressible data is probably not useful. This function is used
  // only for the level=0 compression option.
  // NOTE: this function should be optimized to avoid extra copying from
  // win to pending_buf.
  function deflate_stored(flush) {
    // Stored blocks are limited to 0xffff bytes, pending_buf is limited
    // to pending_buf_size, and each stored block has a 5 byte header:

    var max_block_size = 0xffff;
    var max_start;
    if (max_block_size > pending_buf_size - 5) {
      max_block_size = pending_buf_size - 5;
    }

    // Copy as much as possible from input to output:
    // eslint-disable-next-line no-constant-condition
    while (true) {
      // Fill the win as much as possible:
      if (lookahead <= 1) {
        fill_window();
        if (lookahead === 0 && flush == Z_NO_FLUSH) return NeedMore;
        if (lookahead === 0) break; // flush the current block
      }

      strstart += lookahead;
      lookahead = 0;

      // Emit a stored block if pending_buf will be full:
      max_start = block_start + max_block_size;
      if (strstart === 0 || strstart >= max_start) {
        // strstart === 0 is possible when wraparound on 16-bit machine
        lookahead = strstart - max_start;
        strstart = max_start;
        flush_block_only(false);
        if (strm.avail_out === 0) return NeedMore;
      }

      // Flush if we may have to slide, otherwise block_start may become
      // negative and the data will be gone:
      if (strstart - block_start >= w_size - MIN_LOOKAHEAD) {
        flush_block_only(false);
        if (strm.avail_out === 0) return NeedMore;
      }
    }
    flush_block_only(flush == Z_FINISH);
    if (strm.avail_out === 0) return flush == Z_FINISH ? FinishStarted : NeedMore;
    return flush == Z_FINISH ? FinishDone : BlockDone;
  }
  function longest_match(cur_match) {
    var chain_length = max_chain_length; // max hash chain length
    var scan = strstart; // current string
    var match; // matched string
    var len; // length of current match
    var best_len = prev_length; // best match length so far
    var limit = strstart > w_size - MIN_LOOKAHEAD ? strstart - (w_size - MIN_LOOKAHEAD) : 0;
    var _nice_match = nice_match;

    // Stop when cur_match becomes <= limit. To simplify the code,
    // we prevent matches with the string of win index 0.

    var wmask = w_mask;
    var strend = strstart + MAX_MATCH;
    var scan_end1 = win[scan + best_len - 1];
    var scan_end = win[scan + best_len];

    // The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of
    // 16.
    // It is easy to get rid of this optimization if necessary.

    // Do not waste too much time if we already have a good match:
    if (prev_length >= good_match) {
      chain_length >>= 2;
    }

    // Do not look for matches beyond the end of the input. This is
    // necessary
    // to make deflate deterministic.
    if (_nice_match > lookahead) _nice_match = lookahead;
    do {
      match = cur_match;

      // Skip to next match if the match length cannot increase
      // or if the match length is less than 2:
      if (win[match + best_len] != scan_end || win[match + best_len - 1] != scan_end1 || win[match] != win[scan] || win[++match] != win[scan + 1]) continue;

      // The check at best_len-1 can be removed because it will be made
      // again later. (This heuristic is not always a win.)
      // It is not necessary to compare scan[2] and match[2] since they
      // are always equal when the other bytes match, given that
      // the hash keys are equal and that HASH_BITS >= 8.
      scan += 2;
      match++;

      // We check for insufficient lookahead only every 8th comparison;
      // the 256th check will be made at strstart+258.
      // eslint-disable-next-line no-empty
      do {
        // empty block
      } while (win[++scan] == win[++match] && win[++scan] == win[++match] && win[++scan] == win[++match] && win[++scan] == win[++match] && win[++scan] == win[++match] && win[++scan] == win[++match] && win[++scan] == win[++match] && win[++scan] == win[++match] && scan < strend);
      len = MAX_MATCH - (strend - scan);
      scan = strend - MAX_MATCH;
      if (len > best_len) {
        match_start = cur_match;
        best_len = len;
        if (len >= _nice_match) break;
        scan_end1 = win[scan + best_len - 1];
        scan_end = win[scan + best_len];
      }
    } while ((cur_match = prev[cur_match & wmask] & 0xffff) > limit && --chain_length !== 0);
    if (best_len <= lookahead) return best_len;
    return lookahead;
  }

  // Compress as much as possible from the input stream, return the current
  // block state.
  // This function does not perform lazy evaluation of matches and inserts
  // new strings in the dictionary only for unmatched strings or for short
  // matches. It is used only for the fast compression options.
  function deflate_fast(flush) {
    // short hash_head = 0; // head of the hash chain
    var hash_head = 0; // head of the hash chain
    var bflush; // set if current block must be flushed

    // eslint-disable-next-line no-constant-condition
    while (true) {
      // Make sure that we always have enough lookahead, except
      // at the end of the input file. We need MAX_MATCH bytes
      // for the next match, plus MIN_MATCH bytes to insert the
      // string following the next match.
      if (lookahead < MIN_LOOKAHEAD) {
        fill_window();
        if (lookahead < MIN_LOOKAHEAD && flush == Z_NO_FLUSH) {
          return NeedMore;
        }
        if (lookahead === 0) break; // flush the current block
      }

      // Insert the string win[strstart .. strstart+2] in the
      // dictionary, and set hash_head to the head of the hash chain:
      if (lookahead >= MIN_MATCH) {
        ins_h = (ins_h << hash_shift ^ win[strstart + (MIN_MATCH - 1)] & 0xff) & hash_mask;

        // prev[strstart&w_mask]=hash_head=head[ins_h];
        hash_head = head[ins_h] & 0xffff;
        prev[strstart & w_mask] = head[ins_h];
        head[ins_h] = strstart;
      }

      // Find the longest match, discarding those <= prev_length.
      // At this point we have always match_length < MIN_MATCH

      if (hash_head !== 0 && (strstart - hash_head & 0xffff) <= w_size - MIN_LOOKAHEAD) {
        // To simplify the code, we prevent matches with the string
        // of win index 0 (in particular we have to avoid a match
        // of the string with itself at the start of the input file).
        if (strategy != Z_HUFFMAN_ONLY) {
          match_length = longest_match(hash_head);
        }
        // longest_match() sets match_start
      }

      if (match_length >= MIN_MATCH) {
        // check_match(strstart, match_start, match_length);

        bflush = _tr_tally(strstart - match_start, match_length - MIN_MATCH);
        lookahead -= match_length;

        // Insert new strings in the hash table only if the match length
        // is not too large. This saves time but degrades compression.
        if (match_length <= max_lazy_match && lookahead >= MIN_MATCH) {
          match_length--; // string at strstart already in hash table
          do {
            strstart++;
            ins_h = (ins_h << hash_shift ^ win[strstart + (MIN_MATCH - 1)] & 0xff) & hash_mask;
            // prev[strstart&w_mask]=hash_head=head[ins_h];
            hash_head = head[ins_h] & 0xffff;
            prev[strstart & w_mask] = head[ins_h];
            head[ins_h] = strstart;

            // strstart never exceeds WSIZE-MAX_MATCH, so there are
            // always MIN_MATCH bytes ahead.
          } while (--match_length !== 0);
          strstart++;
        } else {
          strstart += match_length;
          match_length = 0;
          ins_h = win[strstart] & 0xff;
          ins_h = (ins_h << hash_shift ^ win[strstart + 1] & 0xff) & hash_mask;
          // If lookahead < MIN_MATCH, ins_h is garbage, but it does
          // not
          // matter since it will be recomputed at next deflate call.
        }
      } else {
        // No match, output a literal byte

        bflush = _tr_tally(0, win[strstart] & 0xff);
        lookahead--;
        strstart++;
      }
      if (bflush) {
        flush_block_only(false);
        if (strm.avail_out === 0) return NeedMore;
      }
    }
    flush_block_only(flush == Z_FINISH);
    if (strm.avail_out === 0) {
      if (flush == Z_FINISH) return FinishStarted;else return NeedMore;
    }
    return flush == Z_FINISH ? FinishDone : BlockDone;
  }

  // Same as above, but achieves better compression. We use a lazy
  // evaluation for matches: a match is finally adopted only if there is
  // no better match at the next win position.
  function deflate_slow(flush) {
    // short hash_head = 0; // head of hash chain
    var hash_head = 0; // head of hash chain
    var bflush; // set if current block must be flushed
    var max_insert;

    // Process the input block.
    // eslint-disable-next-line no-constant-condition
    while (true) {
      // Make sure that we always have enough lookahead, except
      // at the end of the input file. We need MAX_MATCH bytes
      // for the next match, plus MIN_MATCH bytes to insert the
      // string following the next match.

      if (lookahead < MIN_LOOKAHEAD) {
        fill_window();
        if (lookahead < MIN_LOOKAHEAD && flush == Z_NO_FLUSH) {
          return NeedMore;
        }
        if (lookahead === 0) break; // flush the current block
      }

      // Insert the string win[strstart .. strstart+2] in the
      // dictionary, and set hash_head to the head of the hash chain:

      if (lookahead >= MIN_MATCH) {
        ins_h = (ins_h << hash_shift ^ win[strstart + (MIN_MATCH - 1)] & 0xff) & hash_mask;
        // prev[strstart&w_mask]=hash_head=head[ins_h];
        hash_head = head[ins_h] & 0xffff;
        prev[strstart & w_mask] = head[ins_h];
        head[ins_h] = strstart;
      }

      // Find the longest match, discarding those <= prev_length.
      prev_length = match_length;
      prev_match = match_start;
      match_length = MIN_MATCH - 1;
      if (hash_head !== 0 && prev_length < max_lazy_match && (strstart - hash_head & 0xffff) <= w_size - MIN_LOOKAHEAD) {
        // To simplify the code, we prevent matches with the string
        // of win index 0 (in particular we have to avoid a match
        // of the string with itself at the start of the input file).

        if (strategy != Z_HUFFMAN_ONLY) {
          match_length = longest_match(hash_head);
        }
        // longest_match() sets match_start

        if (match_length <= 5 && (strategy == Z_FILTERED || match_length == MIN_MATCH && strstart - match_start > 4096)) {
          // If prev_match is also MIN_MATCH, match_start is garbage
          // but we will ignore the current match anyway.
          match_length = MIN_MATCH - 1;
        }
      }

      // If there was a match at the previous step and the current
      // match is not better, output the previous match:
      if (prev_length >= MIN_MATCH && match_length <= prev_length) {
        max_insert = strstart + lookahead - MIN_MATCH;
        // Do not insert strings in hash table beyond this.

        // check_match(strstart-1, prev_match, prev_length);

        bflush = _tr_tally(strstart - 1 - prev_match, prev_length - MIN_MATCH);

        // Insert in hash table all strings up to the end of the match.
        // strstart-1 and strstart are already inserted. If there is not
        // enough lookahead, the last two strings are not inserted in
        // the hash table.
        lookahead -= prev_length - 1;
        prev_length -= 2;
        do {
          if (++strstart <= max_insert) {
            ins_h = (ins_h << hash_shift ^ win[strstart + (MIN_MATCH - 1)] & 0xff) & hash_mask;
            // prev[strstart&w_mask]=hash_head=head[ins_h];
            hash_head = head[ins_h] & 0xffff;
            prev[strstart & w_mask] = head[ins_h];
            head[ins_h] = strstart;
          }
        } while (--prev_length !== 0);
        match_available = 0;
        match_length = MIN_MATCH - 1;
        strstart++;
        if (bflush) {
          flush_block_only(false);
          if (strm.avail_out === 0) return NeedMore;
        }
      } else if (match_available !== 0) {
        // If there was no match at the previous position, output a
        // single literal. If there was a match but the current match
        // is longer, truncate the previous match to a single literal.

        bflush = _tr_tally(0, win[strstart - 1] & 0xff);
        if (bflush) {
          flush_block_only(false);
        }
        strstart++;
        lookahead--;
        if (strm.avail_out === 0) return NeedMore;
      } else {
        // There is no previous match to compare with, wait for
        // the next step to decide.

        match_available = 1;
        strstart++;
        lookahead--;
      }
    }
    if (match_available !== 0) {
      bflush = _tr_tally(0, win[strstart - 1] & 0xff);
      match_available = 0;
    }
    flush_block_only(flush == Z_FINISH);
    if (strm.avail_out === 0) {
      if (flush == Z_FINISH) return FinishStarted;else return NeedMore;
    }
    return flush == Z_FINISH ? FinishDone : BlockDone;
  }
  function deflateReset(strm) {
    strm.total_in = strm.total_out = 0;
    strm.msg = null; //

    that.pending = 0;
    that.pending_out = 0;
    status = BUSY_STATE;
    last_flush = Z_NO_FLUSH;
    tr_init();
    lm_init();
    return Z_OK;
  }
  that.deflateInit = function (strm, _level, bits, _method, memLevel, _strategy) {
    if (!_method) _method = Z_DEFLATED;
    if (!memLevel) memLevel = DEF_MEM_LEVEL;
    if (!_strategy) _strategy = Z_DEFAULT_STRATEGY;

    // byte[] my_version=ZLIB_VERSION;

    //
    // if (!version || version[0] != my_version[0]
    // || stream_size != sizeof(z_stream)) {
    // return Z_VERSION_ERROR;
    // }

    strm.msg = null;
    if (_level == Z_DEFAULT_COMPRESSION) _level = 6;
    if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || _method != Z_DEFLATED || bits < 9 || bits > 15 || _level < 0 || _level > 9 || _strategy < 0 || _strategy > Z_HUFFMAN_ONLY) {
      return Z_STREAM_ERROR;
    }
    strm.dstate = that;
    w_bits = bits;
    w_size = 1 << w_bits;
    w_mask = w_size - 1;
    hash_bits = memLevel + 7;
    hash_size = 1 << hash_bits;
    hash_mask = hash_size - 1;
    hash_shift = Math.floor((hash_bits + MIN_MATCH - 1) / MIN_MATCH);
    win = new Uint8Array(w_size * 2);
    prev = [];
    head = [];
    lit_bufsize = 1 << memLevel + 6; // 16K elements by default

    that.pending_buf = new Uint8Array(lit_bufsize * 4);
    pending_buf_size = lit_bufsize * 4;
    that.dist_buf = new Uint16Array(lit_bufsize);
    that.lc_buf = new Uint8Array(lit_bufsize);
    level = _level;
    strategy = _strategy;
    return deflateReset(strm);
  };
  that.deflateEnd = function () {
    if (status != INIT_STATE && status != BUSY_STATE && status != FINISH_STATE) {
      return Z_STREAM_ERROR;
    }
    // Deallocate in reverse order of allocations:
    that.lc_buf = null;
    that.dist_buf = null;
    that.pending_buf = null;
    head = null;
    prev = null;
    win = null;
    // free
    that.dstate = null;
    return status == BUSY_STATE ? Z_DATA_ERROR : Z_OK;
  };
  that.deflateParams = function (strm, _level, _strategy) {
    var err = Z_OK;
    if (_level == Z_DEFAULT_COMPRESSION) {
      _level = 6;
    }
    if (_level < 0 || _level > 9 || _strategy < 0 || _strategy > Z_HUFFMAN_ONLY) {
      return Z_STREAM_ERROR;
    }
    if (config_table[level].func != config_table[_level].func && strm.total_in !== 0) {
      // Flush the last buffer:
      err = strm.deflate(Z_PARTIAL_FLUSH);
    }
    if (level != _level) {
      level = _level;
      max_lazy_match = config_table[level].max_lazy;
      good_match = config_table[level].good_length;
      nice_match = config_table[level].nice_length;
      max_chain_length = config_table[level].max_chain;
    }
    strategy = _strategy;
    return err;
  };
  that.deflateSetDictionary = function (_strm, dictionary, dictLength) {
    var length = dictLength;
    var n,
      index = 0;
    if (!dictionary || status != INIT_STATE) return Z_STREAM_ERROR;
    if (length < MIN_MATCH) return Z_OK;
    if (length > w_size - MIN_LOOKAHEAD) {
      length = w_size - MIN_LOOKAHEAD;
      index = dictLength - length; // use the tail of the dictionary
    }

    win.set(dictionary.subarray(index, index + length), 0);
    strstart = length;
    block_start = length;

    // Insert all strings in the hash table (except for the last two bytes).
    // s->lookahead stays null, so s->ins_h will be recomputed at the next
    // call of fill_window.

    ins_h = win[0] & 0xff;
    ins_h = (ins_h << hash_shift ^ win[1] & 0xff) & hash_mask;
    for (n = 0; n <= length - MIN_MATCH; n++) {
      ins_h = (ins_h << hash_shift ^ win[n + (MIN_MATCH - 1)] & 0xff) & hash_mask;
      prev[n & w_mask] = head[ins_h];
      head[ins_h] = n;
    }
    return Z_OK;
  };
  that.deflate = function (_strm, flush) {
    var i, header, level_flags, old_flush, bstate;
    if (flush > Z_FINISH || flush < 0) {
      return Z_STREAM_ERROR;
    }
    if (!_strm.next_out || !_strm.next_in && _strm.avail_in !== 0 || status == FINISH_STATE && flush != Z_FINISH) {
      _strm.msg = z_errmsg[Z_NEED_DICT - Z_STREAM_ERROR];
      return Z_STREAM_ERROR;
    }
    if (_strm.avail_out === 0) {
      _strm.msg = z_errmsg[Z_NEED_DICT - Z_BUF_ERROR];
      return Z_BUF_ERROR;
    }
    strm = _strm; // just in case
    old_flush = last_flush;
    last_flush = flush;

    // Write the zlib header
    if (status == INIT_STATE) {
      header = Z_DEFLATED + (w_bits - 8 << 4) << 8;
      level_flags = (level - 1 & 0xff) >> 1;
      if (level_flags > 3) level_flags = 3;
      header |= level_flags << 6;
      if (strstart !== 0) header |= PRESET_DICT;
      header += 31 - header % 31;
      status = BUSY_STATE;
      putShortMSB(header);
    }

    // Flush as much pending output as possible
    if (that.pending !== 0) {
      strm.flush_pending();
      if (strm.avail_out === 0) {
        // console.log(" avail_out==0");
        // Since avail_out is 0, deflate will be called again with
        // more output space, but possibly with both pending and
        // avail_in equal to zero. There won't be anything to do,
        // but this is not an error situation so make sure we
        // return OK instead of BUF_ERROR at next call of deflate:
        last_flush = -1;
        return Z_OK;
      }

      // Make sure there is something to do and avoid duplicate
      // consecutive
      // flushes. For repeated and useless calls with Z_FINISH, we keep
      // returning Z_STREAM_END instead of Z_BUFF_ERROR.
    } else if (strm.avail_in === 0 && flush <= old_flush && flush != Z_FINISH) {
      strm.msg = z_errmsg[Z_NEED_DICT - Z_BUF_ERROR];
      return Z_BUF_ERROR;
    }

    // User must not provide more input after the first FINISH:
    if (status == FINISH_STATE && strm.avail_in !== 0) {
      _strm.msg = z_errmsg[Z_NEED_DICT - Z_BUF_ERROR];
      return Z_BUF_ERROR;
    }

    // Start a new block or continue the current one.
    if (strm.avail_in !== 0 || lookahead !== 0 || flush != Z_NO_FLUSH && status != FINISH_STATE) {
      bstate = -1;
      switch (config_table[level].func) {
        case STORED:
          bstate = deflate_stored(flush);
          break;
        case FAST:
          bstate = deflate_fast(flush);
          break;
        case SLOW:
          bstate = deflate_slow(flush);
          break;
        default:
      }
      if (bstate == FinishStarted || bstate == FinishDone) {
        status = FINISH_STATE;
      }
      if (bstate == NeedMore || bstate == FinishStarted) {
        if (strm.avail_out === 0) {
          last_flush = -1; // avoid BUF_ERROR next call, see above
        }

        return Z_OK;
        // If flush != Z_NO_FLUSH && avail_out === 0, the next call
        // of deflate should use the same flush parameter to make sure
        // that the flush is complete. So we don't have to output an
        // empty block here, this will be done at next call. This also
        // ensures that for a very small output buffer, we emit at most
        // one empty block.
      }

      if (bstate == BlockDone) {
        if (flush == Z_PARTIAL_FLUSH) {
          _tr_align();
        } else {
          // FULL_FLUSH or SYNC_FLUSH
          _tr_stored_block(0, 0, false);
          // For a full flush, this empty block will be recognized
          // as a special marker by inflate_sync().
          if (flush == Z_FULL_FLUSH) {
            // state.head[s.hash_size-1]=0;
            for (i = 0; i < hash_size /*-1*/; i++)
            // forget history
            head[i] = 0;
          }
        }
        strm.flush_pending();
        if (strm.avail_out === 0) {
          last_flush = -1; // avoid BUF_ERROR at next call, see above
          return Z_OK;
        }
      }
    }
    if (flush != Z_FINISH) return Z_OK;
    return Z_STREAM_END;
  };
}

// ZStream

function ZStream() {
  var that = this;
  that.next_in_index = 0;
  that.next_out_index = 0;
  // that.next_in; // next input byte
  that.avail_in = 0; // number of bytes available at next_in
  that.total_in = 0; // total nb of input bytes read so far
  // that.next_out; // next output byte should be put there
  that.avail_out = 0; // remaining free space at next_out
  that.total_out = 0; // total nb of bytes output so far
  // that.msg;
  // that.dstate;
}

ZStream.prototype = {
  deflateInit: function deflateInit(level, bits) {
    var that = this;
    that.dstate = new Deflate();
    if (!bits) bits = MAX_BITS;
    return that.dstate.deflateInit(that, level, bits);
  },
  deflate: function deflate(flush) {
    var that = this;
    if (!that.dstate) {
      return Z_STREAM_ERROR;
    }
    return that.dstate.deflate(that, flush);
  },
  deflateEnd: function deflateEnd() {
    var that = this;
    if (!that.dstate) return Z_STREAM_ERROR;
    var ret = that.dstate.deflateEnd();
    that.dstate = null;
    return ret;
  },
  deflateParams: function deflateParams(level, strategy) {
    var that = this;
    if (!that.dstate) return Z_STREAM_ERROR;
    return that.dstate.deflateParams(that, level, strategy);
  },
  deflateSetDictionary: function deflateSetDictionary(dictionary, dictLength) {
    var that = this;
    if (!that.dstate) return Z_STREAM_ERROR;
    return that.dstate.deflateSetDictionary(that, dictionary, dictLength);
  },
  // Read a new buffer from the current input stream, update the
  // total number of bytes read. All deflate() input goes through
  // this function so some applications may wish to modify it to avoid
  // allocating a large strm->next_in buffer and copying from it.
  // (See also flush_pending()).
  read_buf: function read_buf(buf, start, size) {
    var that = this;
    var len = that.avail_in;
    if (len > size) len = size;
    if (len === 0) return 0;
    that.avail_in -= len;
    buf.set(that.next_in.subarray(that.next_in_index, that.next_in_index + len), start);
    that.next_in_index += len;
    that.total_in += len;
    return len;
  },
  // Flush as much pending output as possible. All deflate() output goes
  // through this function so some applications may wish to modify it
  // to avoid allocating a large strm->next_out buffer and copying into it.
  // (See also read_buf()).
  flush_pending: function flush_pending() {
    var that = this;
    var len = that.dstate.pending;
    if (len > that.avail_out) len = that.avail_out;
    if (len === 0) return;

    // if (that.dstate.pending_buf.length <= that.dstate.pending_out || that.next_out.length <= that.next_out_index
    // || that.dstate.pending_buf.length < (that.dstate.pending_out + len) || that.next_out.length < (that.next_out_index +
    // len)) {
    // console.log(that.dstate.pending_buf.length + ", " + that.dstate.pending_out + ", " + that.next_out.length + ", " +
    // that.next_out_index + ", " + len);
    // console.log("avail_out=" + that.avail_out);
    // }

    that.next_out.set(that.dstate.pending_buf.subarray(that.dstate.pending_out, that.dstate.pending_out + len), that.next_out_index);
    that.next_out_index += len;
    that.dstate.pending_out += len;
    that.total_out += len;
    that.avail_out -= len;
    that.dstate.pending -= len;
    if (that.dstate.pending === 0) {
      that.dstate.pending_out = 0;
    }
  }
};

// Deflate

function ZipDeflate(options) {
  var that = this;
  var z = new ZStream();
  var bufsize = getMaximumCompressedSize(options && options.chunkSize ? options.chunkSize : 64 * 1024);
  var flush = Z_NO_FLUSH;
  var buf = new Uint8Array(bufsize);
  var level = options ? options.level : Z_DEFAULT_COMPRESSION;
  if (typeof level == "undefined") level = Z_DEFAULT_COMPRESSION;
  z.deflateInit(level);
  z.next_out = buf;
  that.append = function (data, onprogress) {
    var err,
      array,
      lastIndex = 0,
      bufferIndex = 0,
      bufferSize = 0;
    var buffers = [];
    if (!data.length) return;
    z.next_in_index = 0;
    z.next_in = data;
    z.avail_in = data.length;
    do {
      z.next_out_index = 0;
      z.avail_out = bufsize;
      err = z.deflate(flush);
      if (err != Z_OK) throw new Error("deflating: " + z.msg);
      if (z.next_out_index) if (z.next_out_index == bufsize) buffers.push(new Uint8Array(buf));else buffers.push(buf.slice(0, z.next_out_index));
      bufferSize += z.next_out_index;
      if (onprogress && z.next_in_index > 0 && z.next_in_index != lastIndex) {
        onprogress(z.next_in_index);
        lastIndex = z.next_in_index;
      }
    } while (z.avail_in > 0 || z.avail_out === 0);
    if (buffers.length > 1) {
      array = new Uint8Array(bufferSize);
      buffers.forEach(function (chunk) {
        array.set(chunk, bufferIndex);
        bufferIndex += chunk.length;
      });
    } else {
      array = buffers[0] || new Uint8Array();
    }
    return array;
  };
  that.flush = function () {
    var err,
      array,
      bufferIndex = 0,
      bufferSize = 0;
    var buffers = [];
    do {
      z.next_out_index = 0;
      z.avail_out = bufsize;
      err = z.deflate(Z_FINISH);
      if (err != Z_STREAM_END && err != Z_OK) throw new Error("deflating: " + z.msg);
      if (bufsize - z.avail_out > 0) buffers.push(buf.slice(0, z.next_out_index));
      bufferSize += z.next_out_index;
    } while (z.avail_in > 0 || z.avail_out === 0);
    z.deflateEnd();
    array = new Uint8Array(bufferSize);
    buffers.forEach(function (chunk) {
      array.set(chunk, bufferIndex);
      bufferIndex += chunk.length;
    });
    return array;
  };
}
function getMaximumCompressedSize(uncompressedSize) {
  return uncompressedSize + 5 * (Math.floor(uncompressedSize / 16383) + 1);
}
},{}],"../node_modules/@zip.js/zip.js/lib/core/streams/codecs/inflate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Inflate = ZipInflate;
/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/*
 * This program is based on JZlib 1.0.2 ymnk, JCraft,Inc.
 * JZlib is based on zlib-1.1.3, so all credit should go authors
 * Jean-loup Gailly(jloup@gzip.org) and Mark Adler(madler@alumni.caltech.edu)
 * and contributors of zlib.
 */

// deno-lint-ignore-file no-this-alias prefer-const

// Global

var MAX_BITS = 15;
var Z_OK = 0;
var Z_STREAM_END = 1;
var Z_NEED_DICT = 2;
var Z_STREAM_ERROR = -2;
var Z_DATA_ERROR = -3;
var Z_MEM_ERROR = -4;
var Z_BUF_ERROR = -5;
var inflate_mask = [0x00000000, 0x00000001, 0x00000003, 0x00000007, 0x0000000f, 0x0000001f, 0x0000003f, 0x0000007f, 0x000000ff, 0x000001ff, 0x000003ff, 0x000007ff, 0x00000fff, 0x00001fff, 0x00003fff, 0x00007fff, 0x0000ffff];
var MANY = 1440;

// JZlib version : "1.0.2"
var Z_NO_FLUSH = 0;
var Z_FINISH = 4;

// InfTree
var fixed_bl = 9;
var fixed_bd = 5;
var fixed_tl = [96, 7, 256, 0, 8, 80, 0, 8, 16, 84, 8, 115, 82, 7, 31, 0, 8, 112, 0, 8, 48, 0, 9, 192, 80, 7, 10, 0, 8, 96, 0, 8, 32, 0, 9, 160, 0, 8, 0, 0, 8, 128, 0, 8, 64, 0, 9, 224, 80, 7, 6, 0, 8, 88, 0, 8, 24, 0, 9, 144, 83, 7, 59, 0, 8, 120, 0, 8, 56, 0, 9, 208, 81, 7, 17, 0, 8, 104, 0, 8, 40, 0, 9, 176, 0, 8, 8, 0, 8, 136, 0, 8, 72, 0, 9, 240, 80, 7, 4, 0, 8, 84, 0, 8, 20, 85, 8, 227, 83, 7, 43, 0, 8, 116, 0, 8, 52, 0, 9, 200, 81, 7, 13, 0, 8, 100, 0, 8, 36, 0, 9, 168, 0, 8, 4, 0, 8, 132, 0, 8, 68, 0, 9, 232, 80, 7, 8, 0, 8, 92, 0, 8, 28, 0, 9, 152, 84, 7, 83, 0, 8, 124, 0, 8, 60, 0, 9, 216, 82, 7, 23, 0, 8, 108, 0, 8, 44, 0, 9, 184, 0, 8, 12, 0, 8, 140, 0, 8, 76, 0, 9, 248, 80, 7, 3, 0, 8, 82, 0, 8, 18, 85, 8, 163, 83, 7, 35, 0, 8, 114, 0, 8, 50, 0, 9, 196, 81, 7, 11, 0, 8, 98, 0, 8, 34, 0, 9, 164, 0, 8, 2, 0, 8, 130, 0, 8, 66, 0, 9, 228, 80, 7, 7, 0, 8, 90, 0, 8, 26, 0, 9, 148, 84, 7, 67, 0, 8, 122, 0, 8, 58, 0, 9, 212, 82, 7, 19, 0, 8, 106, 0, 8, 42, 0, 9, 180, 0, 8, 10, 0, 8, 138, 0, 8, 74, 0, 9, 244, 80, 7, 5, 0, 8, 86, 0, 8, 22, 192, 8, 0, 83, 7, 51, 0, 8, 118, 0, 8, 54, 0, 9, 204, 81, 7, 15, 0, 8, 102, 0, 8, 38, 0, 9, 172, 0, 8, 6, 0, 8, 134, 0, 8, 70, 0, 9, 236, 80, 7, 9, 0, 8, 94, 0, 8, 30, 0, 9, 156, 84, 7, 99, 0, 8, 126, 0, 8, 62, 0, 9, 220, 82, 7, 27, 0, 8, 110, 0, 8, 46, 0, 9, 188, 0, 8, 14, 0, 8, 142, 0, 8, 78, 0, 9, 252, 96, 7, 256, 0, 8, 81, 0, 8, 17, 85, 8, 131, 82, 7, 31, 0, 8, 113, 0, 8, 49, 0, 9, 194, 80, 7, 10, 0, 8, 97, 0, 8, 33, 0, 9, 162, 0, 8, 1, 0, 8, 129, 0, 8, 65, 0, 9, 226, 80, 7, 6, 0, 8, 89, 0, 8, 25, 0, 9, 146, 83, 7, 59, 0, 8, 121, 0, 8, 57, 0, 9, 210, 81, 7, 17, 0, 8, 105, 0, 8, 41, 0, 9, 178, 0, 8, 9, 0, 8, 137, 0, 8, 73, 0, 9, 242, 80, 7, 4, 0, 8, 85, 0, 8, 21, 80, 8, 258, 83, 7, 43, 0, 8, 117, 0, 8, 53, 0, 9, 202, 81, 7, 13, 0, 8, 101, 0, 8, 37, 0, 9, 170, 0, 8, 5, 0, 8, 133, 0, 8, 69, 0, 9, 234, 80, 7, 8, 0, 8, 93, 0, 8, 29, 0, 9, 154, 84, 7, 83, 0, 8, 125, 0, 8, 61, 0, 9, 218, 82, 7, 23, 0, 8, 109, 0, 8, 45, 0, 9, 186, 0, 8, 13, 0, 8, 141, 0, 8, 77, 0, 9, 250, 80, 7, 3, 0, 8, 83, 0, 8, 19, 85, 8, 195, 83, 7, 35, 0, 8, 115, 0, 8, 51, 0, 9, 198, 81, 7, 11, 0, 8, 99, 0, 8, 35, 0, 9, 166, 0, 8, 3, 0, 8, 131, 0, 8, 67, 0, 9, 230, 80, 7, 7, 0, 8, 91, 0, 8, 27, 0, 9, 150, 84, 7, 67, 0, 8, 123, 0, 8, 59, 0, 9, 214, 82, 7, 19, 0, 8, 107, 0, 8, 43, 0, 9, 182, 0, 8, 11, 0, 8, 139, 0, 8, 75, 0, 9, 246, 80, 7, 5, 0, 8, 87, 0, 8, 23, 192, 8, 0, 83, 7, 51, 0, 8, 119, 0, 8, 55, 0, 9, 206, 81, 7, 15, 0, 8, 103, 0, 8, 39, 0, 9, 174, 0, 8, 7, 0, 8, 135, 0, 8, 71, 0, 9, 238, 80, 7, 9, 0, 8, 95, 0, 8, 31, 0, 9, 158, 84, 7, 99, 0, 8, 127, 0, 8, 63, 0, 9, 222, 82, 7, 27, 0, 8, 111, 0, 8, 47, 0, 9, 190, 0, 8, 15, 0, 8, 143, 0, 8, 79, 0, 9, 254, 96, 7, 256, 0, 8, 80, 0, 8, 16, 84, 8, 115, 82, 7, 31, 0, 8, 112, 0, 8, 48, 0, 9, 193, 80, 7, 10, 0, 8, 96, 0, 8, 32, 0, 9, 161, 0, 8, 0, 0, 8, 128, 0, 8, 64, 0, 9, 225, 80, 7, 6, 0, 8, 88, 0, 8, 24, 0, 9, 145, 83, 7, 59, 0, 8, 120, 0, 8, 56, 0, 9, 209, 81, 7, 17, 0, 8, 104, 0, 8, 40, 0, 9, 177, 0, 8, 8, 0, 8, 136, 0, 8, 72, 0, 9, 241, 80, 7, 4, 0, 8, 84, 0, 8, 20, 85, 8, 227, 83, 7, 43, 0, 8, 116, 0, 8, 52, 0, 9, 201, 81, 7, 13, 0, 8, 100, 0, 8, 36, 0, 9, 169, 0, 8, 4, 0, 8, 132, 0, 8, 68, 0, 9, 233, 80, 7, 8, 0, 8, 92, 0, 8, 28, 0, 9, 153, 84, 7, 83, 0, 8, 124, 0, 8, 60, 0, 9, 217, 82, 7, 23, 0, 8, 108, 0, 8, 44, 0, 9, 185, 0, 8, 12, 0, 8, 140, 0, 8, 76, 0, 9, 249, 80, 7, 3, 0, 8, 82, 0, 8, 18, 85, 8, 163, 83, 7, 35, 0, 8, 114, 0, 8, 50, 0, 9, 197, 81, 7, 11, 0, 8, 98, 0, 8, 34, 0, 9, 165, 0, 8, 2, 0, 8, 130, 0, 8, 66, 0, 9, 229, 80, 7, 7, 0, 8, 90, 0, 8, 26, 0, 9, 149, 84, 7, 67, 0, 8, 122, 0, 8, 58, 0, 9, 213, 82, 7, 19, 0, 8, 106, 0, 8, 42, 0, 9, 181, 0, 8, 10, 0, 8, 138, 0, 8, 74, 0, 9, 245, 80, 7, 5, 0, 8, 86, 0, 8, 22, 192, 8, 0, 83, 7, 51, 0, 8, 118, 0, 8, 54, 0, 9, 205, 81, 7, 15, 0, 8, 102, 0, 8, 38, 0, 9, 173, 0, 8, 6, 0, 8, 134, 0, 8, 70, 0, 9, 237, 80, 7, 9, 0, 8, 94, 0, 8, 30, 0, 9, 157, 84, 7, 99, 0, 8, 126, 0, 8, 62, 0, 9, 221, 82, 7, 27, 0, 8, 110, 0, 8, 46, 0, 9, 189, 0, 8, 14, 0, 8, 142, 0, 8, 78, 0, 9, 253, 96, 7, 256, 0, 8, 81, 0, 8, 17, 85, 8, 131, 82, 7, 31, 0, 8, 113, 0, 8, 49, 0, 9, 195, 80, 7, 10, 0, 8, 97, 0, 8, 33, 0, 9, 163, 0, 8, 1, 0, 8, 129, 0, 8, 65, 0, 9, 227, 80, 7, 6, 0, 8, 89, 0, 8, 25, 0, 9, 147, 83, 7, 59, 0, 8, 121, 0, 8, 57, 0, 9, 211, 81, 7, 17, 0, 8, 105, 0, 8, 41, 0, 9, 179, 0, 8, 9, 0, 8, 137, 0, 8, 73, 0, 9, 243, 80, 7, 4, 0, 8, 85, 0, 8, 21, 80, 8, 258, 83, 7, 43, 0, 8, 117, 0, 8, 53, 0, 9, 203, 81, 7, 13, 0, 8, 101, 0, 8, 37, 0, 9, 171, 0, 8, 5, 0, 8, 133, 0, 8, 69, 0, 9, 235, 80, 7, 8, 0, 8, 93, 0, 8, 29, 0, 9, 155, 84, 7, 83, 0, 8, 125, 0, 8, 61, 0, 9, 219, 82, 7, 23, 0, 8, 109, 0, 8, 45, 0, 9, 187, 0, 8, 13, 0, 8, 141, 0, 8, 77, 0, 9, 251, 80, 7, 3, 0, 8, 83, 0, 8, 19, 85, 8, 195, 83, 7, 35, 0, 8, 115, 0, 8, 51, 0, 9, 199, 81, 7, 11, 0, 8, 99, 0, 8, 35, 0, 9, 167, 0, 8, 3, 0, 8, 131, 0, 8, 67, 0, 9, 231, 80, 7, 7, 0, 8, 91, 0, 8, 27, 0, 9, 151, 84, 7, 67, 0, 8, 123, 0, 8, 59, 0, 9, 215, 82, 7, 19, 0, 8, 107, 0, 8, 43, 0, 9, 183, 0, 8, 11, 0, 8, 139, 0, 8, 75, 0, 9, 247, 80, 7, 5, 0, 8, 87, 0, 8, 23, 192, 8, 0, 83, 7, 51, 0, 8, 119, 0, 8, 55, 0, 9, 207, 81, 7, 15, 0, 8, 103, 0, 8, 39, 0, 9, 175, 0, 8, 7, 0, 8, 135, 0, 8, 71, 0, 9, 239, 80, 7, 9, 0, 8, 95, 0, 8, 31, 0, 9, 159, 84, 7, 99, 0, 8, 127, 0, 8, 63, 0, 9, 223, 82, 7, 27, 0, 8, 111, 0, 8, 47, 0, 9, 191, 0, 8, 15, 0, 8, 143, 0, 8, 79, 0, 9, 255];
var fixed_td = [80, 5, 1, 87, 5, 257, 83, 5, 17, 91, 5, 4097, 81, 5, 5, 89, 5, 1025, 85, 5, 65, 93, 5, 16385, 80, 5, 3, 88, 5, 513, 84, 5, 33, 92, 5, 8193, 82, 5, 9, 90, 5, 2049, 86, 5, 129, 192, 5, 24577, 80, 5, 2, 87, 5, 385, 83, 5, 25, 91, 5, 6145, 81, 5, 7, 89, 5, 1537, 85, 5, 97, 93, 5, 24577, 80, 5, 4, 88, 5, 769, 84, 5, 49, 92, 5, 12289, 82, 5, 13, 90, 5, 3073, 86, 5, 193, 192, 5, 24577];

// Tables for deflate from PKZIP's appnote.txt.
var cplens = [
// Copy lengths for literal codes 257..285
3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0];

// see note #13 above about 258
var cplext = [
// Extra bits for literal codes 257..285
0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 112, 112 // 112==invalid
];

var cpdist = [
// Copy offsets for distance codes 0..29
1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577];
var cpdext = [
// Extra bits for distance codes
0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];

// If BMAX needs to be larger than 16, then h and x[] should be uLong.
var BMAX = 15; // maximum bit length of any code

function InfTree() {
  var that = this;
  var hn; // hufts used in space
  var v; // work area for huft_build
  var c; // bit length count table
  var r; // table entry for structure assignment
  var u; // table stack
  var x; // bit offsets, then code stack

  function huft_build(b,
  // code lengths in bits (all assumed <=
  // BMAX)
  bindex, n,
  // number of codes (assumed <= 288)
  s,
  // number of simple-valued codes (0..s-1)
  d,
  // list of base values for non-simple codes
  e,
  // list of extra bits for non-simple codes
  t,
  // result: starting table
  m,
  // maximum lookup bits, returns actual
  hp,
  // space for trees
  hn,
  // hufts used in space
  v // working area: values in order of bit length
  ) {
    // Given a list of code lengths and a maximum table size, make a set of
    // tables to decode that set of codes. Return Z_OK on success,
    // Z_BUF_ERROR
    // if the given code set is incomplete (the tables are still built in
    // this
    // case), Z_DATA_ERROR if the input is invalid (an over-subscribed set
    // of
    // lengths), or Z_MEM_ERROR if not enough memory.

    var a; // counter for codes of length k
    var f; // i repeats in table every f entries
    var g; // maximum code length
    var h; // table level
    var i; // counter, current code
    var j; // counter
    var k; // number of bits in current code
    var l; // bits per table (returned in m)
    var mask; // (1 << w) - 1, to avoid cc -O bug on HP
    var p; // pointer into c[], b[], or v[]
    var q; // points to current table
    var w; // bits before this table == (l * h)
    var xp; // pointer into x
    var y; // number of dummy codes added
    var z; // number of entries in current table

    // Generate counts for each bit length

    p = 0;
    i = n;
    do {
      c[b[bindex + p]]++;
      p++;
      i--; // assume all entries <= BMAX
    } while (i !== 0);
    if (c[0] == n) {
      // null input--all zero length codes
      t[0] = -1;
      m[0] = 0;
      return Z_OK;
    }

    // Find minimum and maximum length, bound *m by those
    l = m[0];
    for (j = 1; j <= BMAX; j++) if (c[j] !== 0) break;
    k = j; // minimum code length
    if (l < j) {
      l = j;
    }
    for (i = BMAX; i !== 0; i--) {
      if (c[i] !== 0) break;
    }
    g = i; // maximum code length
    if (l > i) {
      l = i;
    }
    m[0] = l;

    // Adjust last length count to fill out codes, if needed
    for (y = 1 << j; j < i; j++, y <<= 1) {
      if ((y -= c[j]) < 0) {
        return Z_DATA_ERROR;
      }
    }
    if ((y -= c[i]) < 0) {
      return Z_DATA_ERROR;
    }
    c[i] += y;

    // Generate starting offsets into the value table for each length
    x[1] = j = 0;
    p = 1;
    xp = 2;
    while (--i !== 0) {
      // note that i == g from above
      x[xp] = j += c[p];
      xp++;
      p++;
    }

    // Make a table of values in order of bit lengths
    i = 0;
    p = 0;
    do {
      if ((j = b[bindex + p]) !== 0) {
        v[x[j]++] = i;
      }
      p++;
    } while (++i < n);
    n = x[g]; // set n to length of v

    // Generate the Huffman codes and for each, make the table entries
    x[0] = i = 0; // first Huffman code is zero
    p = 0; // grab values in bit order
    h = -1; // no tables yet--level -1
    w = -l; // bits decoded == (l * h)
    u[0] = 0; // just to keep compilers happy
    q = 0; // ditto
    z = 0; // ditto

    // go through the bit lengths (k already is bits in shortest code)
    for (; k <= g; k++) {
      a = c[k];
      while (a-- !== 0) {
        // here i is the Huffman code of length k bits for value *p
        // make tables up to required level
        while (k > w + l) {
          h++;
          w += l; // previous table always l bits
          // compute minimum size table less than or equal to l bits
          z = g - w;
          z = z > l ? l : z; // table size upper limit
          if ((f = 1 << (j = k - w)) > a + 1) {
            // try a k-w bit table
            // too few codes for
            // k-w bit table
            f -= a + 1; // deduct codes from patterns left
            xp = k;
            if (j < z) {
              while (++j < z) {
                // try smaller tables up to z bits
                if ((f <<= 1) <= c[++xp]) break; // enough codes to use up j bits
                f -= c[xp]; // else deduct codes from patterns
              }
            }
          }

          z = 1 << j; // table entries for j-bit table

          // allocate new table
          if (hn[0] + z > MANY) {
            // (note: doesn't matter for fixed)
            return Z_DATA_ERROR; // overflow of MANY
          }

          u[h] = q = /* hp+ */hn[0]; // DEBUG
          hn[0] += z;

          // connect to last table, if there is one
          if (h !== 0) {
            x[h] = i; // save pattern for backing up
            r[0] = /* (byte) */j; // bits in this table
            r[1] = /* (byte) */l; // bits to dump before this table
            j = i >>> w - l;
            r[2] = /* (int) */q - u[h - 1] - j; // offset to this table
            hp.set(r, (u[h - 1] + j) * 3);
            // to
            // last
            // table
          } else {
            t[0] = q; // first table is returned result
          }
        }

        // set up table entry in r
        r[1] = /* (byte) */k - w;
        if (p >= n) {
          r[0] = 128 + 64; // out of values--invalid code
        } else if (v[p] < s) {
          r[0] = /* (byte) */v[p] < 256 ? 0 : 32 + 64; // 256 is
          // end-of-block
          r[2] = v[p++]; // simple code is just the value
        } else {
          r[0] = /* (byte) */e[v[p] - s] + 16 + 64; // non-simple--look
          // up in lists
          r[2] = d[v[p++] - s];
        }

        // fill code-like entries with r
        f = 1 << k - w;
        for (j = i >>> w; j < z; j += f) {
          hp.set(r, (q + j) * 3);
        }

        // backwards increment the k-bit code i
        for (j = 1 << k - 1; (i & j) !== 0; j >>>= 1) {
          i ^= j;
        }
        i ^= j;

        // backup over finished tables
        mask = (1 << w) - 1; // needed on HP, cc -O bug
        while ((i & mask) != x[h]) {
          h--; // don't need to update q
          w -= l;
          mask = (1 << w) - 1;
        }
      }
    }
    // Return Z_BUF_ERROR if we were given an incomplete table
    return y !== 0 && g != 1 ? Z_BUF_ERROR : Z_OK;
  }
  function initWorkArea(vsize) {
    var i;
    if (!hn) {
      hn = []; // []; //new Array(1);
      v = []; // new Array(vsize);
      c = new Int32Array(BMAX + 1); // new Array(BMAX + 1);
      r = []; // new Array(3);
      u = new Int32Array(BMAX); // new Array(BMAX);
      x = new Int32Array(BMAX + 1); // new Array(BMAX + 1);
    }

    if (v.length < vsize) {
      v = []; // new Array(vsize);
    }

    for (i = 0; i < vsize; i++) {
      v[i] = 0;
    }
    for (i = 0; i < BMAX + 1; i++) {
      c[i] = 0;
    }
    for (i = 0; i < 3; i++) {
      r[i] = 0;
    }
    // for(int i=0; i<BMAX; i++){u[i]=0;}
    u.set(c.subarray(0, BMAX), 0);
    // for(int i=0; i<BMAX+1; i++){x[i]=0;}
    x.set(c.subarray(0, BMAX + 1), 0);
  }
  that.inflate_trees_bits = function (c,
  // 19 code lengths
  bb,
  // bits tree desired/actual depth
  tb,
  // bits tree result
  hp,
  // space for trees
  z // for messages
  ) {
    var result;
    initWorkArea(19);
    hn[0] = 0;
    result = huft_build(c, 0, 19, 19, null, null, tb, bb, hp, hn, v);
    if (result == Z_DATA_ERROR) {
      z.msg = "oversubscribed dynamic bit lengths tree";
    } else if (result == Z_BUF_ERROR || bb[0] === 0) {
      z.msg = "incomplete dynamic bit lengths tree";
      result = Z_DATA_ERROR;
    }
    return result;
  };
  that.inflate_trees_dynamic = function (nl,
  // number of literal/length codes
  nd,
  // number of distance codes
  c,
  // that many (total) code lengths
  bl,
  // literal desired/actual bit depth
  bd,
  // distance desired/actual bit depth
  tl,
  // literal/length tree result
  td,
  // distance tree result
  hp,
  // space for trees
  z // for messages
  ) {
    var result;

    // build literal/length tree
    initWorkArea(288);
    hn[0] = 0;
    result = huft_build(c, 0, nl, 257, cplens, cplext, tl, bl, hp, hn, v);
    if (result != Z_OK || bl[0] === 0) {
      if (result == Z_DATA_ERROR) {
        z.msg = "oversubscribed literal/length tree";
      } else if (result != Z_MEM_ERROR) {
        z.msg = "incomplete literal/length tree";
        result = Z_DATA_ERROR;
      }
      return result;
    }

    // build distance tree
    initWorkArea(288);
    result = huft_build(c, nl, nd, 0, cpdist, cpdext, td, bd, hp, hn, v);
    if (result != Z_OK || bd[0] === 0 && nl > 257) {
      if (result == Z_DATA_ERROR) {
        z.msg = "oversubscribed distance tree";
      } else if (result == Z_BUF_ERROR) {
        z.msg = "incomplete distance tree";
        result = Z_DATA_ERROR;
      } else if (result != Z_MEM_ERROR) {
        z.msg = "empty distance tree with lengths";
        result = Z_DATA_ERROR;
      }
      return result;
    }
    return Z_OK;
  };
}
InfTree.inflate_trees_fixed = function (bl,
// literal desired/actual bit depth
bd,
// distance desired/actual bit depth
tl,
// literal/length tree result
td // distance tree result
) {
  bl[0] = fixed_bl;
  bd[0] = fixed_bd;
  tl[0] = fixed_tl;
  td[0] = fixed_td;
  return Z_OK;
};

// InfCodes

// waiting for "i:"=input,
// "o:"=output,
// "x:"=nothing
var START = 0; // x: set up for LEN
var LEN = 1; // i: get length/literal/eob next
var LENEXT = 2; // i: getting length extra (have base)
var DIST = 3; // i: get distance next
var DISTEXT = 4; // i: getting distance extra
var COPY = 5; // o: copying bytes in win, waiting
// for space
var LIT = 6; // o: got literal, waiting for output
// space
var WASH = 7; // o: got eob, possibly still output
// waiting
var END = 8; // x: got eob and all data flushed
var BADCODE = 9; // x: got error

function InfCodes() {
  var that = this;
  var mode; // current inflate_codes mode

  // mode dependent information
  var len = 0;
  var tree; // pointer into tree
  var tree_index = 0;
  var need = 0; // bits needed

  var lit = 0;

  // if EXT or COPY, where and how much
  var get = 0; // bits to get for extra
  var dist = 0; // distance back to copy from

  var lbits = 0; // ltree bits decoded per branch
  var dbits = 0; // dtree bits decoder per branch
  var ltree; // literal/length/eob tree
  var ltree_index = 0; // literal/length/eob tree
  var dtree; // distance tree
  var dtree_index = 0; // distance tree

  // Called with number of bytes left to write in win at least 258
  // (the maximum string length) and number of input bytes available
  // at least ten. The ten bytes are six bytes for the longest length/
  // distance pair plus four bytes for overloading the bit buffer.

  function inflate_fast(bl, bd, tl, tl_index, td, td_index, s, z) {
    var t; // temporary pointer
    var tp; // temporary pointer
    var tp_index; // temporary pointer
    var e; // extra bits or operation
    var b; // bit buffer
    var k; // bits in bit buffer
    var p; // input data pointer
    var n; // bytes available there
    var q; // output win write pointer
    var m; // bytes to end of win or read pointer
    var ml; // mask for literal/length tree
    var md; // mask for distance tree
    var c; // bytes to copy
    var d; // distance back to copy from
    var r; // copy source pointer

    var tp_index_t_3; // (tp_index+t)*3

    // load input, output, bit values
    p = z.next_in_index;
    n = z.avail_in;
    b = s.bitb;
    k = s.bitk;
    q = s.write;
    m = q < s.read ? s.read - q - 1 : s.end - q;

    // initialize masks
    ml = inflate_mask[bl];
    md = inflate_mask[bd];

    // do until not enough input or output space for fast loop
    do {
      // assume called with m >= 258 && n >= 10
      // get literal/length code
      while (k < 20) {
        // max bits for literal/length code
        n--;
        b |= (z.read_byte(p++) & 0xff) << k;
        k += 8;
      }
      t = b & ml;
      tp = tl;
      tp_index = tl_index;
      tp_index_t_3 = (tp_index + t) * 3;
      if ((e = tp[tp_index_t_3]) === 0) {
        b >>= tp[tp_index_t_3 + 1];
        k -= tp[tp_index_t_3 + 1];
        s.win[q++] = /* (byte) */tp[tp_index_t_3 + 2];
        m--;
        continue;
      }
      do {
        b >>= tp[tp_index_t_3 + 1];
        k -= tp[tp_index_t_3 + 1];
        if ((e & 16) !== 0) {
          e &= 15;
          c = tp[tp_index_t_3 + 2] + ( /* (int) */b & inflate_mask[e]);
          b >>= e;
          k -= e;

          // decode distance base of block to copy
          while (k < 15) {
            // max bits for distance code
            n--;
            b |= (z.read_byte(p++) & 0xff) << k;
            k += 8;
          }
          t = b & md;
          tp = td;
          tp_index = td_index;
          tp_index_t_3 = (tp_index + t) * 3;
          e = tp[tp_index_t_3];
          do {
            b >>= tp[tp_index_t_3 + 1];
            k -= tp[tp_index_t_3 + 1];
            if ((e & 16) !== 0) {
              // get extra bits to add to distance base
              e &= 15;
              while (k < e) {
                // get extra bits (up to 13)
                n--;
                b |= (z.read_byte(p++) & 0xff) << k;
                k += 8;
              }
              d = tp[tp_index_t_3 + 2] + (b & inflate_mask[e]);
              b >>= e;
              k -= e;

              // do the copy
              m -= c;
              if (q >= d) {
                // offset before dest
                // just copy
                r = q - d;
                if (q - r > 0 && 2 > q - r) {
                  s.win[q++] = s.win[r++]; // minimum
                  // count is
                  // three,
                  s.win[q++] = s.win[r++]; // so unroll
                  // loop a
                  // little
                  c -= 2;
                } else {
                  s.win.set(s.win.subarray(r, r + 2), q);
                  q += 2;
                  r += 2;
                  c -= 2;
                }
              } else {
                // else offset after destination
                r = q - d;
                do {
                  r += s.end; // force pointer in win
                } while (r < 0); // covers invalid distances
                e = s.end - r;
                if (c > e) {
                  // if source crosses,
                  c -= e; // wrapped copy
                  if (q - r > 0 && e > q - r) {
                    do {
                      s.win[q++] = s.win[r++];
                    } while (--e !== 0);
                  } else {
                    s.win.set(s.win.subarray(r, r + e), q);
                    q += e;
                    r += e;
                    e = 0;
                  }
                  r = 0; // copy rest from start of win
                }
              }

              // copy all or what's left
              if (q - r > 0 && c > q - r) {
                do {
                  s.win[q++] = s.win[r++];
                } while (--c !== 0);
              } else {
                s.win.set(s.win.subarray(r, r + c), q);
                q += c;
                r += c;
                c = 0;
              }
              break;
            } else if ((e & 64) === 0) {
              t += tp[tp_index_t_3 + 2];
              t += b & inflate_mask[e];
              tp_index_t_3 = (tp_index + t) * 3;
              e = tp[tp_index_t_3];
            } else {
              z.msg = "invalid distance code";
              c = z.avail_in - n;
              c = k >> 3 < c ? k >> 3 : c;
              n += c;
              p -= c;
              k -= c << 3;
              s.bitb = b;
              s.bitk = k;
              z.avail_in = n;
              z.total_in += p - z.next_in_index;
              z.next_in_index = p;
              s.write = q;
              return Z_DATA_ERROR;
            }
            // eslint-disable-next-line no-constant-condition
          } while (true);
          break;
        }
        if ((e & 64) === 0) {
          t += tp[tp_index_t_3 + 2];
          t += b & inflate_mask[e];
          tp_index_t_3 = (tp_index + t) * 3;
          if ((e = tp[tp_index_t_3]) === 0) {
            b >>= tp[tp_index_t_3 + 1];
            k -= tp[tp_index_t_3 + 1];
            s.win[q++] = /* (byte) */tp[tp_index_t_3 + 2];
            m--;
            break;
          }
        } else if ((e & 32) !== 0) {
          c = z.avail_in - n;
          c = k >> 3 < c ? k >> 3 : c;
          n += c;
          p -= c;
          k -= c << 3;
          s.bitb = b;
          s.bitk = k;
          z.avail_in = n;
          z.total_in += p - z.next_in_index;
          z.next_in_index = p;
          s.write = q;
          return Z_STREAM_END;
        } else {
          z.msg = "invalid literal/length code";
          c = z.avail_in - n;
          c = k >> 3 < c ? k >> 3 : c;
          n += c;
          p -= c;
          k -= c << 3;
          s.bitb = b;
          s.bitk = k;
          z.avail_in = n;
          z.total_in += p - z.next_in_index;
          z.next_in_index = p;
          s.write = q;
          return Z_DATA_ERROR;
        }
        // eslint-disable-next-line no-constant-condition
      } while (true);
    } while (m >= 258 && n >= 10);

    // not enough input or output--restore pointers and return
    c = z.avail_in - n;
    c = k >> 3 < c ? k >> 3 : c;
    n += c;
    p -= c;
    k -= c << 3;
    s.bitb = b;
    s.bitk = k;
    z.avail_in = n;
    z.total_in += p - z.next_in_index;
    z.next_in_index = p;
    s.write = q;
    return Z_OK;
  }
  that.init = function (bl, bd, tl, tl_index, td, td_index) {
    mode = START;
    lbits = /* (byte) */bl;
    dbits = /* (byte) */bd;
    ltree = tl;
    ltree_index = tl_index;
    dtree = td;
    dtree_index = td_index;
    tree = null;
  };
  that.proc = function (s, z, r) {
    var j; // temporary storage
    var tindex; // temporary pointer
    var e; // extra bits or operation
    var b = 0; // bit buffer
    var k = 0; // bits in bit buffer
    var p = 0; // input data pointer
    var n; // bytes available there
    var q; // output win write pointer
    var m; // bytes to end of win or read pointer
    var f; // pointer to copy strings from

    // copy input/output information to locals (UPDATE macro restores)
    p = z.next_in_index;
    n = z.avail_in;
    b = s.bitb;
    k = s.bitk;
    q = s.write;
    m = q < s.read ? s.read - q - 1 : s.end - q;

    // process input and output based on current state
    // eslint-disable-next-line no-constant-condition
    while (true) {
      switch (mode) {
        // waiting for "i:"=input, "o:"=output, "x:"=nothing
        case START:
          // x: set up for LEN
          if (m >= 258 && n >= 10) {
            s.bitb = b;
            s.bitk = k;
            z.avail_in = n;
            z.total_in += p - z.next_in_index;
            z.next_in_index = p;
            s.write = q;
            r = inflate_fast(lbits, dbits, ltree, ltree_index, dtree, dtree_index, s, z);
            p = z.next_in_index;
            n = z.avail_in;
            b = s.bitb;
            k = s.bitk;
            q = s.write;
            m = q < s.read ? s.read - q - 1 : s.end - q;
            if (r != Z_OK) {
              mode = r == Z_STREAM_END ? WASH : BADCODE;
              break;
            }
          }
          need = lbits;
          tree = ltree;
          tree_index = ltree_index;
          mode = LEN;
        /* falls through */
        case LEN:
          // i: get length/literal/eob next
          j = need;
          while (k < j) {
            if (n !== 0) r = Z_OK;else {
              s.bitb = b;
              s.bitk = k;
              z.avail_in = n;
              z.total_in += p - z.next_in_index;
              z.next_in_index = p;
              s.write = q;
              return s.inflate_flush(z, r);
            }
            n--;
            b |= (z.read_byte(p++) & 0xff) << k;
            k += 8;
          }
          tindex = (tree_index + (b & inflate_mask[j])) * 3;
          b >>>= tree[tindex + 1];
          k -= tree[tindex + 1];
          e = tree[tindex];
          if (e === 0) {
            // literal
            lit = tree[tindex + 2];
            mode = LIT;
            break;
          }
          if ((e & 16) !== 0) {
            // length
            get = e & 15;
            len = tree[tindex + 2];
            mode = LENEXT;
            break;
          }
          if ((e & 64) === 0) {
            // next table
            need = e;
            tree_index = tindex / 3 + tree[tindex + 2];
            break;
          }
          if ((e & 32) !== 0) {
            // end of block
            mode = WASH;
            break;
          }
          mode = BADCODE; // invalid code
          z.msg = "invalid literal/length code";
          r = Z_DATA_ERROR;
          s.bitb = b;
          s.bitk = k;
          z.avail_in = n;
          z.total_in += p - z.next_in_index;
          z.next_in_index = p;
          s.write = q;
          return s.inflate_flush(z, r);
        case LENEXT:
          // i: getting length extra (have base)
          j = get;
          while (k < j) {
            if (n !== 0) r = Z_OK;else {
              s.bitb = b;
              s.bitk = k;
              z.avail_in = n;
              z.total_in += p - z.next_in_index;
              z.next_in_index = p;
              s.write = q;
              return s.inflate_flush(z, r);
            }
            n--;
            b |= (z.read_byte(p++) & 0xff) << k;
            k += 8;
          }
          len += b & inflate_mask[j];
          b >>= j;
          k -= j;
          need = dbits;
          tree = dtree;
          tree_index = dtree_index;
          mode = DIST;
        /* falls through */
        case DIST:
          // i: get distance next
          j = need;
          while (k < j) {
            if (n !== 0) r = Z_OK;else {
              s.bitb = b;
              s.bitk = k;
              z.avail_in = n;
              z.total_in += p - z.next_in_index;
              z.next_in_index = p;
              s.write = q;
              return s.inflate_flush(z, r);
            }
            n--;
            b |= (z.read_byte(p++) & 0xff) << k;
            k += 8;
          }
          tindex = (tree_index + (b & inflate_mask[j])) * 3;
          b >>= tree[tindex + 1];
          k -= tree[tindex + 1];
          e = tree[tindex];
          if ((e & 16) !== 0) {
            // distance
            get = e & 15;
            dist = tree[tindex + 2];
            mode = DISTEXT;
            break;
          }
          if ((e & 64) === 0) {
            // next table
            need = e;
            tree_index = tindex / 3 + tree[tindex + 2];
            break;
          }
          mode = BADCODE; // invalid code
          z.msg = "invalid distance code";
          r = Z_DATA_ERROR;
          s.bitb = b;
          s.bitk = k;
          z.avail_in = n;
          z.total_in += p - z.next_in_index;
          z.next_in_index = p;
          s.write = q;
          return s.inflate_flush(z, r);
        case DISTEXT:
          // i: getting distance extra
          j = get;
          while (k < j) {
            if (n !== 0) r = Z_OK;else {
              s.bitb = b;
              s.bitk = k;
              z.avail_in = n;
              z.total_in += p - z.next_in_index;
              z.next_in_index = p;
              s.write = q;
              return s.inflate_flush(z, r);
            }
            n--;
            b |= (z.read_byte(p++) & 0xff) << k;
            k += 8;
          }
          dist += b & inflate_mask[j];
          b >>= j;
          k -= j;
          mode = COPY;
        /* falls through */
        case COPY:
          // o: copying bytes in win, waiting for space
          f = q - dist;
          while (f < 0) {
            // modulo win size-"while" instead
            f += s.end; // of "if" handles invalid distances
          }

          while (len !== 0) {
            if (m === 0) {
              if (q == s.end && s.read !== 0) {
                q = 0;
                m = q < s.read ? s.read - q - 1 : s.end - q;
              }
              if (m === 0) {
                s.write = q;
                r = s.inflate_flush(z, r);
                q = s.write;
                m = q < s.read ? s.read - q - 1 : s.end - q;
                if (q == s.end && s.read !== 0) {
                  q = 0;
                  m = q < s.read ? s.read - q - 1 : s.end - q;
                }
                if (m === 0) {
                  s.bitb = b;
                  s.bitk = k;
                  z.avail_in = n;
                  z.total_in += p - z.next_in_index;
                  z.next_in_index = p;
                  s.write = q;
                  return s.inflate_flush(z, r);
                }
              }
            }
            s.win[q++] = s.win[f++];
            m--;
            if (f == s.end) f = 0;
            len--;
          }
          mode = START;
          break;
        case LIT:
          // o: got literal, waiting for output space
          if (m === 0) {
            if (q == s.end && s.read !== 0) {
              q = 0;
              m = q < s.read ? s.read - q - 1 : s.end - q;
            }
            if (m === 0) {
              s.write = q;
              r = s.inflate_flush(z, r);
              q = s.write;
              m = q < s.read ? s.read - q - 1 : s.end - q;
              if (q == s.end && s.read !== 0) {
                q = 0;
                m = q < s.read ? s.read - q - 1 : s.end - q;
              }
              if (m === 0) {
                s.bitb = b;
                s.bitk = k;
                z.avail_in = n;
                z.total_in += p - z.next_in_index;
                z.next_in_index = p;
                s.write = q;
                return s.inflate_flush(z, r);
              }
            }
          }
          r = Z_OK;
          s.win[q++] = /* (byte) */lit;
          m--;
          mode = START;
          break;
        case WASH:
          // o: got eob, possibly more output
          if (k > 7) {
            // return unused byte, if any
            k -= 8;
            n++;
            p--; // can always return one
          }

          s.write = q;
          r = s.inflate_flush(z, r);
          q = s.write;
          m = q < s.read ? s.read - q - 1 : s.end - q;
          if (s.read != s.write) {
            s.bitb = b;
            s.bitk = k;
            z.avail_in = n;
            z.total_in += p - z.next_in_index;
            z.next_in_index = p;
            s.write = q;
            return s.inflate_flush(z, r);
          }
          mode = END;
        /* falls through */
        case END:
          r = Z_STREAM_END;
          s.bitb = b;
          s.bitk = k;
          z.avail_in = n;
          z.total_in += p - z.next_in_index;
          z.next_in_index = p;
          s.write = q;
          return s.inflate_flush(z, r);
        case BADCODE:
          // x: got error

          r = Z_DATA_ERROR;
          s.bitb = b;
          s.bitk = k;
          z.avail_in = n;
          z.total_in += p - z.next_in_index;
          z.next_in_index = p;
          s.write = q;
          return s.inflate_flush(z, r);
        default:
          r = Z_STREAM_ERROR;
          s.bitb = b;
          s.bitk = k;
          z.avail_in = n;
          z.total_in += p - z.next_in_index;
          z.next_in_index = p;
          s.write = q;
          return s.inflate_flush(z, r);
      }
    }
  };
  that.free = function () {
    // ZFREE(z, c);
  };
}

// InfBlocks

// Table for deflate from PKZIP's appnote.txt.
var border = [
// Order of the bit length code lengths
16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
var TYPE = 0; // get type bits (3, including end bit)
var LENS = 1; // get lengths for stored
var STORED = 2; // processing stored block
var TABLE = 3; // get table lengths
var BTREE = 4; // get bit lengths tree for a dynamic
// block
var DTREE = 5; // get length, distance trees for a
// dynamic block
var CODES = 6; // processing fixed or dynamic block
var DRY = 7; // output remaining win bytes
var DONELOCKS = 8; // finished last block, done
var BADBLOCKS = 9; // ot a data error--stuck here

function InfBlocks(z, w) {
  var that = this;
  var mode = TYPE; // current inflate_block mode

  var left = 0; // if STORED, bytes left to copy

  var table = 0; // table lengths (14 bits)
  var index = 0; // index into blens (or border)
  var blens; // bit lengths of codes
  var bb = [0]; // bit length tree depth
  var tb = [0]; // bit length decoding tree

  var codes = new InfCodes(); // if CODES, current state

  var last = 0; // true if this block is the last block

  var hufts = new Int32Array(MANY * 3); // single malloc for tree space
  var check = 0; // check on output
  var inftree = new InfTree();
  that.bitk = 0; // bits in bit buffer
  that.bitb = 0; // bit buffer
  that.win = new Uint8Array(w); // sliding win
  that.end = w; // one byte after sliding win
  that.read = 0; // win read pointer
  that.write = 0; // win write pointer

  that.reset = function (z, c) {
    if (c) c[0] = check;
    // if (mode == BTREE || mode == DTREE) {
    // }
    if (mode == CODES) {
      codes.free(z);
    }
    mode = TYPE;
    that.bitk = 0;
    that.bitb = 0;
    that.read = that.write = 0;
  };
  that.reset(z, null);

  // copy as much as possible from the sliding win to the output area
  that.inflate_flush = function (z, r) {
    var n;
    var p;
    var q;

    // local copies of source and destination pointers
    p = z.next_out_index;
    q = that.read;

    // compute number of bytes to copy as far as end of win
    n = /* (int) */(q <= that.write ? that.write : that.end) - q;
    if (n > z.avail_out) n = z.avail_out;
    if (n !== 0 && r == Z_BUF_ERROR) r = Z_OK;

    // update counters
    z.avail_out -= n;
    z.total_out += n;

    // copy as far as end of win
    z.next_out.set(that.win.subarray(q, q + n), p);
    p += n;
    q += n;

    // see if more to copy at beginning of win
    if (q == that.end) {
      // wrap pointers
      q = 0;
      if (that.write == that.end) that.write = 0;

      // compute bytes to copy
      n = that.write - q;
      if (n > z.avail_out) n = z.avail_out;
      if (n !== 0 && r == Z_BUF_ERROR) r = Z_OK;

      // update counters
      z.avail_out -= n;
      z.total_out += n;

      // copy
      z.next_out.set(that.win.subarray(q, q + n), p);
      p += n;
      q += n;
    }

    // update pointers
    z.next_out_index = p;
    that.read = q;

    // done
    return r;
  };
  that.proc = function (z, r) {
    var t; // temporary storage
    var b; // bit buffer
    var k; // bits in bit buffer
    var p; // input data pointer
    var n; // bytes available there
    var q; // output win write pointer
    var m; // bytes to end of win or read pointer

    var i;

    // copy input/output information to locals (UPDATE macro restores)
    // {
    p = z.next_in_index;
    n = z.avail_in;
    b = that.bitb;
    k = that.bitk;
    // }
    // {
    q = that.write;
    m = /* (int) */q < that.read ? that.read - q - 1 : that.end - q;
    // }

    // process input based on current state
    // DEBUG dtree
    // eslint-disable-next-line no-constant-condition
    while (true) {
      var bl = void 0,
        bd = void 0,
        tl = void 0,
        td = void 0,
        bl_ = void 0,
        bd_ = void 0,
        tl_ = void 0,
        td_ = void 0;
      switch (mode) {
        case TYPE:
          while (k < 3) {
            if (n !== 0) {
              r = Z_OK;
            } else {
              that.bitb = b;
              that.bitk = k;
              z.avail_in = n;
              z.total_in += p - z.next_in_index;
              z.next_in_index = p;
              that.write = q;
              return that.inflate_flush(z, r);
            }
            n--;
            b |= (z.read_byte(p++) & 0xff) << k;
            k += 8;
          }
          t = /* (int) */b & 7;
          last = t & 1;
          switch (t >>> 1) {
            case 0:
              // stored
              // {
              b >>>= 3;
              k -= 3;
              // }
              t = k & 7; // go to byte boundary

              // {
              b >>>= t;
              k -= t;
              // }
              mode = LENS; // get length of stored block
              break;
            case 1:
              // fixed
              // {
              bl = []; // new Array(1);
              bd = []; // new Array(1);
              tl = [[]]; // new Array(1);
              td = [[]]; // new Array(1);

              InfTree.inflate_trees_fixed(bl, bd, tl, td);
              codes.init(bl[0], bd[0], tl[0], 0, td[0], 0);
              // }

              // {
              b >>>= 3;
              k -= 3;
              // }

              mode = CODES;
              break;
            case 2:
              // dynamic

              // {
              b >>>= 3;
              k -= 3;
              // }

              mode = TABLE;
              break;
            case 3:
              // illegal

              // {
              b >>>= 3;
              k -= 3;
              // }
              mode = BADBLOCKS;
              z.msg = "invalid block type";
              r = Z_DATA_ERROR;
              that.bitb = b;
              that.bitk = k;
              z.avail_in = n;
              z.total_in += p - z.next_in_index;
              z.next_in_index = p;
              that.write = q;
              return that.inflate_flush(z, r);
          }
          break;
        case LENS:
          while (k < 32) {
            if (n !== 0) {
              r = Z_OK;
            } else {
              that.bitb = b;
              that.bitk = k;
              z.avail_in = n;
              z.total_in += p - z.next_in_index;
              z.next_in_index = p;
              that.write = q;
              return that.inflate_flush(z, r);
            }
            n--;
            b |= (z.read_byte(p++) & 0xff) << k;
            k += 8;
          }
          if ((~b >>> 16 & 0xffff) != (b & 0xffff)) {
            mode = BADBLOCKS;
            z.msg = "invalid stored block lengths";
            r = Z_DATA_ERROR;
            that.bitb = b;
            that.bitk = k;
            z.avail_in = n;
            z.total_in += p - z.next_in_index;
            z.next_in_index = p;
            that.write = q;
            return that.inflate_flush(z, r);
          }
          left = b & 0xffff;
          b = k = 0; // dump bits
          mode = left !== 0 ? STORED : last !== 0 ? DRY : TYPE;
          break;
        case STORED:
          if (n === 0) {
            that.bitb = b;
            that.bitk = k;
            z.avail_in = n;
            z.total_in += p - z.next_in_index;
            z.next_in_index = p;
            that.write = q;
            return that.inflate_flush(z, r);
          }
          if (m === 0) {
            if (q == that.end && that.read !== 0) {
              q = 0;
              m = /* (int) */q < that.read ? that.read - q - 1 : that.end - q;
            }
            if (m === 0) {
              that.write = q;
              r = that.inflate_flush(z, r);
              q = that.write;
              m = /* (int) */q < that.read ? that.read - q - 1 : that.end - q;
              if (q == that.end && that.read !== 0) {
                q = 0;
                m = /* (int) */q < that.read ? that.read - q - 1 : that.end - q;
              }
              if (m === 0) {
                that.bitb = b;
                that.bitk = k;
                z.avail_in = n;
                z.total_in += p - z.next_in_index;
                z.next_in_index = p;
                that.write = q;
                return that.inflate_flush(z, r);
              }
            }
          }
          r = Z_OK;
          t = left;
          if (t > n) t = n;
          if (t > m) t = m;
          that.win.set(z.read_buf(p, t), q);
          p += t;
          n -= t;
          q += t;
          m -= t;
          if ((left -= t) !== 0) break;
          mode = last !== 0 ? DRY : TYPE;
          break;
        case TABLE:
          while (k < 14) {
            if (n !== 0) {
              r = Z_OK;
            } else {
              that.bitb = b;
              that.bitk = k;
              z.avail_in = n;
              z.total_in += p - z.next_in_index;
              z.next_in_index = p;
              that.write = q;
              return that.inflate_flush(z, r);
            }
            n--;
            b |= (z.read_byte(p++) & 0xff) << k;
            k += 8;
          }
          table = t = b & 0x3fff;
          if ((t & 0x1f) > 29 || (t >> 5 & 0x1f) > 29) {
            mode = BADBLOCKS;
            z.msg = "too many length or distance symbols";
            r = Z_DATA_ERROR;
            that.bitb = b;
            that.bitk = k;
            z.avail_in = n;
            z.total_in += p - z.next_in_index;
            z.next_in_index = p;
            that.write = q;
            return that.inflate_flush(z, r);
          }
          t = 258 + (t & 0x1f) + (t >> 5 & 0x1f);
          if (!blens || blens.length < t) {
            blens = []; // new Array(t);
          } else {
            for (i = 0; i < t; i++) {
              blens[i] = 0;
            }
          }

          // {
          b >>>= 14;
          k -= 14;
          // }

          index = 0;
          mode = BTREE;
        /* falls through */
        case BTREE:
          while (index < 4 + (table >>> 10)) {
            while (k < 3) {
              if (n !== 0) {
                r = Z_OK;
              } else {
                that.bitb = b;
                that.bitk = k;
                z.avail_in = n;
                z.total_in += p - z.next_in_index;
                z.next_in_index = p;
                that.write = q;
                return that.inflate_flush(z, r);
              }
              n--;
              b |= (z.read_byte(p++) & 0xff) << k;
              k += 8;
            }
            blens[border[index++]] = b & 7;

            // {
            b >>>= 3;
            k -= 3;
            // }
          }

          while (index < 19) {
            blens[border[index++]] = 0;
          }
          bb[0] = 7;
          t = inftree.inflate_trees_bits(blens, bb, tb, hufts, z);
          if (t != Z_OK) {
            r = t;
            if (r == Z_DATA_ERROR) {
              blens = null;
              mode = BADBLOCKS;
            }
            that.bitb = b;
            that.bitk = k;
            z.avail_in = n;
            z.total_in += p - z.next_in_index;
            z.next_in_index = p;
            that.write = q;
            return that.inflate_flush(z, r);
          }
          index = 0;
          mode = DTREE;
        /* falls through */
        case DTREE:
          // eslint-disable-next-line no-constant-condition
          while (true) {
            t = table;
            if (index >= 258 + (t & 0x1f) + (t >> 5 & 0x1f)) {
              break;
            }
            var j = void 0,
              c = void 0;
            t = bb[0];
            while (k < t) {
              if (n !== 0) {
                r = Z_OK;
              } else {
                that.bitb = b;
                that.bitk = k;
                z.avail_in = n;
                z.total_in += p - z.next_in_index;
                z.next_in_index = p;
                that.write = q;
                return that.inflate_flush(z, r);
              }
              n--;
              b |= (z.read_byte(p++) & 0xff) << k;
              k += 8;
            }

            // if (tb[0] == -1) {
            // System.err.println("null...");
            // }

            t = hufts[(tb[0] + (b & inflate_mask[t])) * 3 + 1];
            c = hufts[(tb[0] + (b & inflate_mask[t])) * 3 + 2];
            if (c < 16) {
              b >>>= t;
              k -= t;
              blens[index++] = c;
            } else {
              // c == 16..18
              i = c == 18 ? 7 : c - 14;
              j = c == 18 ? 11 : 3;
              while (k < t + i) {
                if (n !== 0) {
                  r = Z_OK;
                } else {
                  that.bitb = b;
                  that.bitk = k;
                  z.avail_in = n;
                  z.total_in += p - z.next_in_index;
                  z.next_in_index = p;
                  that.write = q;
                  return that.inflate_flush(z, r);
                }
                n--;
                b |= (z.read_byte(p++) & 0xff) << k;
                k += 8;
              }
              b >>>= t;
              k -= t;
              j += b & inflate_mask[i];
              b >>>= i;
              k -= i;
              i = index;
              t = table;
              if (i + j > 258 + (t & 0x1f) + (t >> 5 & 0x1f) || c == 16 && i < 1) {
                blens = null;
                mode = BADBLOCKS;
                z.msg = "invalid bit length repeat";
                r = Z_DATA_ERROR;
                that.bitb = b;
                that.bitk = k;
                z.avail_in = n;
                z.total_in += p - z.next_in_index;
                z.next_in_index = p;
                that.write = q;
                return that.inflate_flush(z, r);
              }
              c = c == 16 ? blens[i - 1] : 0;
              do {
                blens[i++] = c;
              } while (--j !== 0);
              index = i;
            }
          }
          tb[0] = -1;
          // {
          bl_ = []; // new Array(1);
          bd_ = []; // new Array(1);
          tl_ = []; // new Array(1);
          td_ = []; // new Array(1);
          bl_[0] = 9; // must be <= 9 for lookahead assumptions
          bd_[0] = 6; // must be <= 9 for lookahead assumptions

          t = table;
          t = inftree.inflate_trees_dynamic(257 + (t & 0x1f), 1 + (t >> 5 & 0x1f), blens, bl_, bd_, tl_, td_, hufts, z);
          if (t != Z_OK) {
            if (t == Z_DATA_ERROR) {
              blens = null;
              mode = BADBLOCKS;
            }
            r = t;
            that.bitb = b;
            that.bitk = k;
            z.avail_in = n;
            z.total_in += p - z.next_in_index;
            z.next_in_index = p;
            that.write = q;
            return that.inflate_flush(z, r);
          }
          codes.init(bl_[0], bd_[0], hufts, tl_[0], hufts, td_[0]);
          // }
          mode = CODES;
        /* falls through */
        case CODES:
          that.bitb = b;
          that.bitk = k;
          z.avail_in = n;
          z.total_in += p - z.next_in_index;
          z.next_in_index = p;
          that.write = q;
          if ((r = codes.proc(that, z, r)) != Z_STREAM_END) {
            return that.inflate_flush(z, r);
          }
          r = Z_OK;
          codes.free(z);
          p = z.next_in_index;
          n = z.avail_in;
          b = that.bitb;
          k = that.bitk;
          q = that.write;
          m = /* (int) */q < that.read ? that.read - q - 1 : that.end - q;
          if (last === 0) {
            mode = TYPE;
            break;
          }
          mode = DRY;
        /* falls through */
        case DRY:
          that.write = q;
          r = that.inflate_flush(z, r);
          q = that.write;
          m = /* (int) */q < that.read ? that.read - q - 1 : that.end - q;
          if (that.read != that.write) {
            that.bitb = b;
            that.bitk = k;
            z.avail_in = n;
            z.total_in += p - z.next_in_index;
            z.next_in_index = p;
            that.write = q;
            return that.inflate_flush(z, r);
          }
          mode = DONELOCKS;
        /* falls through */
        case DONELOCKS:
          r = Z_STREAM_END;
          that.bitb = b;
          that.bitk = k;
          z.avail_in = n;
          z.total_in += p - z.next_in_index;
          z.next_in_index = p;
          that.write = q;
          return that.inflate_flush(z, r);
        case BADBLOCKS:
          r = Z_DATA_ERROR;
          that.bitb = b;
          that.bitk = k;
          z.avail_in = n;
          z.total_in += p - z.next_in_index;
          z.next_in_index = p;
          that.write = q;
          return that.inflate_flush(z, r);
        default:
          r = Z_STREAM_ERROR;
          that.bitb = b;
          that.bitk = k;
          z.avail_in = n;
          z.total_in += p - z.next_in_index;
          z.next_in_index = p;
          that.write = q;
          return that.inflate_flush(z, r);
      }
    }
  };
  that.free = function (z) {
    that.reset(z, null);
    that.win = null;
    hufts = null;
    // ZFREE(z, s);
  };

  that.set_dictionary = function (d, start, n) {
    that.win.set(d.subarray(start, start + n), 0);
    that.read = that.write = n;
  };

  // Returns true if inflate is currently at the end of a block generated
  // by Z_SYNC_FLUSH or Z_FULL_FLUSH.
  that.sync_point = function () {
    return mode == LENS ? 1 : 0;
  };
}

// Inflate

// preset dictionary flag in zlib header
var PRESET_DICT = 0x20;
var Z_DEFLATED = 8;
var METHOD = 0; // waiting for method byte
var FLAG = 1; // waiting for flag byte
var DICT4 = 2; // four dictionary check bytes to go
var DICT3 = 3; // three dictionary check bytes to go
var DICT2 = 4; // two dictionary check bytes to go
var DICT1 = 5; // one dictionary check byte to go
var DICT0 = 6; // waiting for inflateSetDictionary
var BLOCKS = 7; // decompressing blocks
var DONE = 12; // finished check, done
var BAD = 13; // got an error--stay here

var mark = [0, 0, 0xff, 0xff];
function Inflate() {
  var that = this;
  that.mode = 0; // current inflate mode

  // mode dependent information
  that.method = 0; // if FLAGS, method byte

  // if CHECK, check values to compare
  that.was = [0]; // new Array(1); // computed check value
  that.need = 0; // stream check value

  // if BAD, inflateSync's marker bytes count
  that.marker = 0;

  // mode independent information
  that.wbits = 0; // log2(win size) (8..15, defaults to 15)

  // this.blocks; // current inflate_blocks state

  function inflateReset(z) {
    if (!z || !z.istate) return Z_STREAM_ERROR;
    z.total_in = z.total_out = 0;
    z.msg = null;
    z.istate.mode = BLOCKS;
    z.istate.blocks.reset(z, null);
    return Z_OK;
  }
  that.inflateEnd = function (z) {
    if (that.blocks) that.blocks.free(z);
    that.blocks = null;
    // ZFREE(z, z->state);
    return Z_OK;
  };
  that.inflateInit = function (z, w) {
    z.msg = null;
    that.blocks = null;

    // set win size
    if (w < 8 || w > 15) {
      that.inflateEnd(z);
      return Z_STREAM_ERROR;
    }
    that.wbits = w;
    z.istate.blocks = new InfBlocks(z, 1 << w);

    // reset state
    inflateReset(z);
    return Z_OK;
  };
  that.inflate = function (z, f) {
    var r;
    var b;
    if (!z || !z.istate || !z.next_in) return Z_STREAM_ERROR;
    var istate = z.istate;
    f = f == Z_FINISH ? Z_BUF_ERROR : Z_OK;
    r = Z_BUF_ERROR;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      switch (istate.mode) {
        case METHOD:
          if (z.avail_in === 0) return r;
          r = f;
          z.avail_in--;
          z.total_in++;
          if (((istate.method = z.read_byte(z.next_in_index++)) & 0xf) != Z_DEFLATED) {
            istate.mode = BAD;
            z.msg = "unknown compression method";
            istate.marker = 5; // can't try inflateSync
            break;
          }
          if ((istate.method >> 4) + 8 > istate.wbits) {
            istate.mode = BAD;
            z.msg = "invalid win size";
            istate.marker = 5; // can't try inflateSync
            break;
          }
          istate.mode = FLAG;
        /* falls through */
        case FLAG:
          if (z.avail_in === 0) return r;
          r = f;
          z.avail_in--;
          z.total_in++;
          b = z.read_byte(z.next_in_index++) & 0xff;
          if (((istate.method << 8) + b) % 31 !== 0) {
            istate.mode = BAD;
            z.msg = "incorrect header check";
            istate.marker = 5; // can't try inflateSync
            break;
          }
          if ((b & PRESET_DICT) === 0) {
            istate.mode = BLOCKS;
            break;
          }
          istate.mode = DICT4;
        /* falls through */
        case DICT4:
          if (z.avail_in === 0) return r;
          r = f;
          z.avail_in--;
          z.total_in++;
          istate.need = (z.read_byte(z.next_in_index++) & 0xff) << 24 & 0xff000000;
          istate.mode = DICT3;
        /* falls through */
        case DICT3:
          if (z.avail_in === 0) return r;
          r = f;
          z.avail_in--;
          z.total_in++;
          istate.need += (z.read_byte(z.next_in_index++) & 0xff) << 16 & 0xff0000;
          istate.mode = DICT2;
        /* falls through */
        case DICT2:
          if (z.avail_in === 0) return r;
          r = f;
          z.avail_in--;
          z.total_in++;
          istate.need += (z.read_byte(z.next_in_index++) & 0xff) << 8 & 0xff00;
          istate.mode = DICT1;
        /* falls through */
        case DICT1:
          if (z.avail_in === 0) return r;
          r = f;
          z.avail_in--;
          z.total_in++;
          istate.need += z.read_byte(z.next_in_index++) & 0xff;
          istate.mode = DICT0;
          return Z_NEED_DICT;
        case DICT0:
          istate.mode = BAD;
          z.msg = "need dictionary";
          istate.marker = 0; // can try inflateSync
          return Z_STREAM_ERROR;
        case BLOCKS:
          r = istate.blocks.proc(z, r);
          if (r == Z_DATA_ERROR) {
            istate.mode = BAD;
            istate.marker = 0; // can try inflateSync
            break;
          }
          if (r == Z_OK) {
            r = f;
          }
          if (r != Z_STREAM_END) {
            return r;
          }
          r = f;
          istate.blocks.reset(z, istate.was);
          istate.mode = DONE;
        /* falls through */
        case DONE:
          z.avail_in = 0;
          return Z_STREAM_END;
        case BAD:
          return Z_DATA_ERROR;
        default:
          return Z_STREAM_ERROR;
      }
    }
  };
  that.inflateSetDictionary = function (z, dictionary, dictLength) {
    var index = 0,
      length = dictLength;
    if (!z || !z.istate || z.istate.mode != DICT0) return Z_STREAM_ERROR;
    var istate = z.istate;
    if (length >= 1 << istate.wbits) {
      length = (1 << istate.wbits) - 1;
      index = dictLength - length;
    }
    istate.blocks.set_dictionary(dictionary, index, length);
    istate.mode = BLOCKS;
    return Z_OK;
  };
  that.inflateSync = function (z) {
    var n; // number of bytes to look at
    var p; // pointer to bytes
    var m; // number of marker bytes found in a row
    var r, w; // temporaries to save total_in and total_out

    // set up
    if (!z || !z.istate) return Z_STREAM_ERROR;
    var istate = z.istate;
    if (istate.mode != BAD) {
      istate.mode = BAD;
      istate.marker = 0;
    }
    if ((n = z.avail_in) === 0) return Z_BUF_ERROR;
    p = z.next_in_index;
    m = istate.marker;

    // search
    while (n !== 0 && m < 4) {
      if (z.read_byte(p) == mark[m]) {
        m++;
      } else if (z.read_byte(p) !== 0) {
        m = 0;
      } else {
        m = 4 - m;
      }
      p++;
      n--;
    }

    // restore
    z.total_in += p - z.next_in_index;
    z.next_in_index = p;
    z.avail_in = n;
    istate.marker = m;

    // return no joy or set up to restart on a new block
    if (m != 4) {
      return Z_DATA_ERROR;
    }
    r = z.total_in;
    w = z.total_out;
    inflateReset(z);
    z.total_in = r;
    z.total_out = w;
    istate.mode = BLOCKS;
    return Z_OK;
  };

  // Returns true if inflate is currently at the end of a block generated
  // by Z_SYNC_FLUSH or Z_FULL_FLUSH. This function is used by one PPP
  // implementation to provide an additional safety check. PPP uses
  // Z_SYNC_FLUSH
  // but removes the length bytes of the resulting empty stored block. When
  // decompressing, PPP checks that at the end of input packet, inflate is
  // waiting for these length bytes.
  that.inflateSyncPoint = function (z) {
    if (!z || !z.istate || !z.istate.blocks) return Z_STREAM_ERROR;
    return z.istate.blocks.sync_point();
  };
}

// ZStream

function ZStream() {}
ZStream.prototype = {
  inflateInit: function inflateInit(bits) {
    var that = this;
    that.istate = new Inflate();
    if (!bits) bits = MAX_BITS;
    return that.istate.inflateInit(that, bits);
  },
  inflate: function inflate(f) {
    var that = this;
    if (!that.istate) return Z_STREAM_ERROR;
    return that.istate.inflate(that, f);
  },
  inflateEnd: function inflateEnd() {
    var that = this;
    if (!that.istate) return Z_STREAM_ERROR;
    var ret = that.istate.inflateEnd(that);
    that.istate = null;
    return ret;
  },
  inflateSync: function inflateSync() {
    var that = this;
    if (!that.istate) return Z_STREAM_ERROR;
    return that.istate.inflateSync(that);
  },
  inflateSetDictionary: function inflateSetDictionary(dictionary, dictLength) {
    var that = this;
    if (!that.istate) return Z_STREAM_ERROR;
    return that.istate.inflateSetDictionary(that, dictionary, dictLength);
  },
  read_byte: function read_byte(start) {
    var that = this;
    return that.next_in[start];
  },
  read_buf: function read_buf(start, size) {
    var that = this;
    return that.next_in.subarray(start, start + size);
  }
};

// Inflater

function ZipInflate(options) {
  var that = this;
  var z = new ZStream();
  var bufsize = options && options.chunkSize ? Math.floor(options.chunkSize * 2) : 128 * 1024;
  var flush = Z_NO_FLUSH;
  var buf = new Uint8Array(bufsize);
  var nomoreinput = false;
  z.inflateInit();
  z.next_out = buf;
  that.append = function (data, onprogress) {
    var buffers = [];
    var err,
      array,
      lastIndex = 0,
      bufferIndex = 0,
      bufferSize = 0;
    if (data.length === 0) return;
    z.next_in_index = 0;
    z.next_in = data;
    z.avail_in = data.length;
    do {
      z.next_out_index = 0;
      z.avail_out = bufsize;
      if (z.avail_in === 0 && !nomoreinput) {
        // if buffer is empty and more input is available, refill it
        z.next_in_index = 0;
        nomoreinput = true;
      }
      err = z.inflate(flush);
      if (nomoreinput && err === Z_BUF_ERROR) {
        if (z.avail_in !== 0) throw new Error("inflating: bad input");
      } else if (err !== Z_OK && err !== Z_STREAM_END) throw new Error("inflating: " + z.msg);
      if ((nomoreinput || err === Z_STREAM_END) && z.avail_in === data.length) throw new Error("inflating: bad input");
      if (z.next_out_index) if (z.next_out_index === bufsize) buffers.push(new Uint8Array(buf));else buffers.push(buf.slice(0, z.next_out_index));
      bufferSize += z.next_out_index;
      if (onprogress && z.next_in_index > 0 && z.next_in_index != lastIndex) {
        onprogress(z.next_in_index);
        lastIndex = z.next_in_index;
      }
    } while (z.avail_in > 0 || z.avail_out === 0);
    if (buffers.length > 1) {
      array = new Uint8Array(bufferSize);
      buffers.forEach(function (chunk) {
        array.set(chunk, bufferIndex);
        bufferIndex += chunk.length;
      });
    } else {
      array = buffers[0] || new Uint8Array();
    }
    return array;
  };
  that.flush = function () {
    z.inflateEnd();
  };
}
},{}],"../node_modules/@zip.js/zip.js/lib/core/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ZIP64_END_OF_CENTRAL_DIR_TOTAL_LENGTH = exports.ZIP64_END_OF_CENTRAL_DIR_SIGNATURE = exports.ZIP64_END_OF_CENTRAL_DIR_LOCATOR_SIGNATURE = exports.ZIP64_END_OF_CENTRAL_DIR_LOCATOR_LENGTH = exports.ZIP64_END_OF_CENTRAL_DIR_LENGTH = exports.VERSION_ZIP64 = exports.VERSION_DEFLATE = exports.VERSION_AES = exports.UNDEFINED_VALUE = exports.UNDEFINED_TYPE = exports.SPLIT_ZIP_FILE_SIGNATURE = exports.MIN_DATE = exports.MAX_DATE = exports.MAX_32_BITS = exports.MAX_16_BITS = exports.LOCAL_FILE_HEADER_SIGNATURE = exports.FUNCTION_TYPE = exports.FILE_ATTR_MSDOS_DIR_MASK = exports.EXTRAFIELD_TYPE_ZIP64 = exports.EXTRAFIELD_TYPE_UNICODE_PATH = exports.EXTRAFIELD_TYPE_UNICODE_COMMENT = exports.EXTRAFIELD_TYPE_NTFS_TAG1 = exports.EXTRAFIELD_TYPE_NTFS = exports.EXTRAFIELD_TYPE_EXTENDED_TIMESTAMP = exports.EXTRAFIELD_TYPE_AES = exports.END_OF_CENTRAL_DIR_SIGNATURE = exports.END_OF_CENTRAL_DIR_LENGTH = exports.DIRECTORY_SIGNATURE = exports.DATA_DESCRIPTOR_RECORD_SIGNATURE = exports.COMPRESSION_METHOD_STORE = exports.COMPRESSION_METHOD_DEFLATE = exports.COMPRESSION_METHOD_AES = exports.CENTRAL_FILE_HEADER_SIGNATURE = exports.BITFLAG_LEVEL = exports.BITFLAG_LANG_ENCODING_FLAG = exports.BITFLAG_ENCRYPTED = exports.BITFLAG_DATA_DESCRIPTOR = void 0;
/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var MAX_32_BITS = 0xffffffff;
exports.MAX_32_BITS = MAX_32_BITS;
var MAX_16_BITS = 0xffff;
exports.MAX_16_BITS = MAX_16_BITS;
var COMPRESSION_METHOD_DEFLATE = 0x08;
exports.COMPRESSION_METHOD_DEFLATE = COMPRESSION_METHOD_DEFLATE;
var COMPRESSION_METHOD_STORE = 0x00;
exports.COMPRESSION_METHOD_STORE = COMPRESSION_METHOD_STORE;
var COMPRESSION_METHOD_AES = 0x63;
exports.COMPRESSION_METHOD_AES = COMPRESSION_METHOD_AES;
var LOCAL_FILE_HEADER_SIGNATURE = 0x04034b50;
exports.LOCAL_FILE_HEADER_SIGNATURE = LOCAL_FILE_HEADER_SIGNATURE;
var SPLIT_ZIP_FILE_SIGNATURE = 0x08074b50;
exports.SPLIT_ZIP_FILE_SIGNATURE = SPLIT_ZIP_FILE_SIGNATURE;
var DATA_DESCRIPTOR_RECORD_SIGNATURE = SPLIT_ZIP_FILE_SIGNATURE;
exports.DATA_DESCRIPTOR_RECORD_SIGNATURE = DATA_DESCRIPTOR_RECORD_SIGNATURE;
var CENTRAL_FILE_HEADER_SIGNATURE = 0x02014b50;
exports.CENTRAL_FILE_HEADER_SIGNATURE = CENTRAL_FILE_HEADER_SIGNATURE;
var END_OF_CENTRAL_DIR_SIGNATURE = 0x06054b50;
exports.END_OF_CENTRAL_DIR_SIGNATURE = END_OF_CENTRAL_DIR_SIGNATURE;
var ZIP64_END_OF_CENTRAL_DIR_SIGNATURE = 0x06064b50;
exports.ZIP64_END_OF_CENTRAL_DIR_SIGNATURE = ZIP64_END_OF_CENTRAL_DIR_SIGNATURE;
var ZIP64_END_OF_CENTRAL_DIR_LOCATOR_SIGNATURE = 0x07064b50;
exports.ZIP64_END_OF_CENTRAL_DIR_LOCATOR_SIGNATURE = ZIP64_END_OF_CENTRAL_DIR_LOCATOR_SIGNATURE;
var END_OF_CENTRAL_DIR_LENGTH = 22;
exports.END_OF_CENTRAL_DIR_LENGTH = END_OF_CENTRAL_DIR_LENGTH;
var ZIP64_END_OF_CENTRAL_DIR_LOCATOR_LENGTH = 20;
exports.ZIP64_END_OF_CENTRAL_DIR_LOCATOR_LENGTH = ZIP64_END_OF_CENTRAL_DIR_LOCATOR_LENGTH;
var ZIP64_END_OF_CENTRAL_DIR_LENGTH = 56;
exports.ZIP64_END_OF_CENTRAL_DIR_LENGTH = ZIP64_END_OF_CENTRAL_DIR_LENGTH;
var ZIP64_END_OF_CENTRAL_DIR_TOTAL_LENGTH = END_OF_CENTRAL_DIR_LENGTH + ZIP64_END_OF_CENTRAL_DIR_LOCATOR_LENGTH + ZIP64_END_OF_CENTRAL_DIR_LENGTH;
exports.ZIP64_END_OF_CENTRAL_DIR_TOTAL_LENGTH = ZIP64_END_OF_CENTRAL_DIR_TOTAL_LENGTH;
var EXTRAFIELD_TYPE_ZIP64 = 0x0001;
exports.EXTRAFIELD_TYPE_ZIP64 = EXTRAFIELD_TYPE_ZIP64;
var EXTRAFIELD_TYPE_AES = 0x9901;
exports.EXTRAFIELD_TYPE_AES = EXTRAFIELD_TYPE_AES;
var EXTRAFIELD_TYPE_NTFS = 0x000a;
exports.EXTRAFIELD_TYPE_NTFS = EXTRAFIELD_TYPE_NTFS;
var EXTRAFIELD_TYPE_NTFS_TAG1 = 0x0001;
exports.EXTRAFIELD_TYPE_NTFS_TAG1 = EXTRAFIELD_TYPE_NTFS_TAG1;
var EXTRAFIELD_TYPE_EXTENDED_TIMESTAMP = 0x5455;
exports.EXTRAFIELD_TYPE_EXTENDED_TIMESTAMP = EXTRAFIELD_TYPE_EXTENDED_TIMESTAMP;
var EXTRAFIELD_TYPE_UNICODE_PATH = 0x7075;
exports.EXTRAFIELD_TYPE_UNICODE_PATH = EXTRAFIELD_TYPE_UNICODE_PATH;
var EXTRAFIELD_TYPE_UNICODE_COMMENT = 0x6375;
exports.EXTRAFIELD_TYPE_UNICODE_COMMENT = EXTRAFIELD_TYPE_UNICODE_COMMENT;
var BITFLAG_ENCRYPTED = 0x01;
exports.BITFLAG_ENCRYPTED = BITFLAG_ENCRYPTED;
var BITFLAG_LEVEL = 0x06;
exports.BITFLAG_LEVEL = BITFLAG_LEVEL;
var BITFLAG_DATA_DESCRIPTOR = 0x0008;
exports.BITFLAG_DATA_DESCRIPTOR = BITFLAG_DATA_DESCRIPTOR;
var BITFLAG_LANG_ENCODING_FLAG = 0x0800;
exports.BITFLAG_LANG_ENCODING_FLAG = BITFLAG_LANG_ENCODING_FLAG;
var FILE_ATTR_MSDOS_DIR_MASK = 0x10;
exports.FILE_ATTR_MSDOS_DIR_MASK = FILE_ATTR_MSDOS_DIR_MASK;
var VERSION_DEFLATE = 0x14;
exports.VERSION_DEFLATE = VERSION_DEFLATE;
var VERSION_ZIP64 = 0x2D;
exports.VERSION_ZIP64 = VERSION_ZIP64;
var VERSION_AES = 0x33;
exports.VERSION_AES = VERSION_AES;
var DIRECTORY_SIGNATURE = "/";
exports.DIRECTORY_SIGNATURE = DIRECTORY_SIGNATURE;
var MAX_DATE = new Date(2107, 11, 31);
exports.MAX_DATE = MAX_DATE;
var MIN_DATE = new Date(1980, 0, 1);
exports.MIN_DATE = MIN_DATE;
var UNDEFINED_VALUE = undefined;
exports.UNDEFINED_VALUE = UNDEFINED_VALUE;
var UNDEFINED_TYPE = "undefined";
exports.UNDEFINED_TYPE = UNDEFINED_TYPE;
var FUNCTION_TYPE = "function";
exports.FUNCTION_TYPE = FUNCTION_TYPE;
},{}],"../node_modules/@zip.js/zip.js/lib/core/streams/stream-adapter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StreamAdapter = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var StreamAdapter = /*#__PURE__*/_createClass(function StreamAdapter(Codec) {
  _classCallCheck(this, StreamAdapter);
  return /*#__PURE__*/function (_TransformStream) {
    _inherits(_class, _TransformStream);
    var _super = _createSuper(_class);
    function _class(_format, options) {
      _classCallCheck(this, _class);
      var codec = new Codec(options);
      return _super.call(this, {
        transform: function transform(chunk, controller) {
          controller.enqueue(codec.append(chunk));
        },
        flush: function flush(controller) {
          var chunk = codec.flush();
          if (chunk) {
            controller.enqueue(chunk);
          }
        }
      });
    }
    return _createClass(_class);
  }(TransformStream);
});
exports.StreamAdapter = StreamAdapter;
},{}],"../node_modules/@zip.js/zip.js/lib/core/configuration.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configure = configure;
exports.getChunkSize = getChunkSize;
exports.getConfiguration = getConfiguration;
var _constants = require("./constants.js");
var _streamAdapter = require("./streams/stream-adapter.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var MINIMUM_CHUNK_SIZE = 64;
var maxWorkers = 2;
try {
  if ((typeof navigator === "undefined" ? "undefined" : _typeof(navigator)) != _constants.UNDEFINED_TYPE && navigator.hardwareConcurrency) {
    maxWorkers = navigator.hardwareConcurrency;
  }
} catch (_error) {
  // ignored
}
var DEFAULT_CONFIGURATION = {
  chunkSize: 512 * 1024,
  maxWorkers: maxWorkers,
  terminateWorkerTimeout: 5000,
  useWebWorkers: true,
  useCompressionStream: true,
  workerScripts: _constants.UNDEFINED_VALUE,
  CompressionStreamNative: (typeof CompressionStream === "undefined" ? "undefined" : _typeof(CompressionStream)) != _constants.UNDEFINED_TYPE && CompressionStream,
  DecompressionStreamNative: (typeof DecompressionStream === "undefined" ? "undefined" : _typeof(DecompressionStream)) != _constants.UNDEFINED_TYPE && DecompressionStream
};
var config = Object.assign({}, DEFAULT_CONFIGURATION);
function getConfiguration() {
  return config;
}
function getChunkSize(config) {
  return Math.max(config.chunkSize, MINIMUM_CHUNK_SIZE);
}
function configure(configuration) {
  var baseURL = configuration.baseURL,
    chunkSize = configuration.chunkSize,
    maxWorkers = configuration.maxWorkers,
    terminateWorkerTimeout = configuration.terminateWorkerTimeout,
    useCompressionStream = configuration.useCompressionStream,
    useWebWorkers = configuration.useWebWorkers,
    Deflate = configuration.Deflate,
    Inflate = configuration.Inflate,
    CompressionStream = configuration.CompressionStream,
    DecompressionStream = configuration.DecompressionStream,
    workerScripts = configuration.workerScripts;
  setIfDefined("baseURL", baseURL);
  setIfDefined("chunkSize", chunkSize);
  setIfDefined("maxWorkers", maxWorkers);
  setIfDefined("terminateWorkerTimeout", terminateWorkerTimeout);
  setIfDefined("useCompressionStream", useCompressionStream);
  setIfDefined("useWebWorkers", useWebWorkers);
  if (Deflate) {
    config.CompressionStream = new _streamAdapter.StreamAdapter(Deflate);
  }
  if (Inflate) {
    config.DecompressionStream = new _streamAdapter.StreamAdapter(Inflate);
  }
  setIfDefined("CompressionStream", CompressionStream);
  setIfDefined("DecompressionStream", DecompressionStream);
  if (workerScripts !== _constants.UNDEFINED_VALUE) {
    var deflate = workerScripts.deflate,
      inflate = workerScripts.inflate;
    if (deflate || inflate) {
      if (!config.workerScripts) {
        config.workerScripts = {};
      }
    }
    if (deflate) {
      if (!Array.isArray(deflate)) {
        throw new Error("workerScripts.deflate must be an array");
      }
      config.workerScripts.deflate = deflate;
    }
    if (inflate) {
      if (!Array.isArray(inflate)) {
        throw new Error("workerScripts.inflate must be an array");
      }
      config.workerScripts.inflate = inflate;
    }
  }
}
function setIfDefined(propertyName, propertyValue) {
  if (propertyValue !== _constants.UNDEFINED_VALUE) {
    config[propertyName] = propertyValue;
  }
}
},{"./constants.js":"../node_modules/@zip.js/zip.js/lib/core/constants.js","./streams/stream-adapter.js":"../node_modules/@zip.js/zip.js/lib/core/streams/stream-adapter.js"}],"../node_modules/@zip.js/zip.js/lib/core/util/default-mime-type.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMimeType = getMimeType;
exports.mimeTypes = void 0;
/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var mimeTypes = {};
exports.mimeTypes = mimeTypes;
function getMimeType() {
  return "application/octet-stream";
}
},{}],"../node_modules/@zip.js/zip.js/lib/core/util/mime-type.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMimeType = getMimeType;
exports.mimeTypes = void 0;
var _defaultMimeType = require("./default-mime-type.js");
/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

// deno-lint-ignore-file no-prototype-builtins

var table = {
  "application": {
    "andrew-inset": "ez",
    "annodex": "anx",
    "atom+xml": "atom",
    "atomcat+xml": "atomcat",
    "atomserv+xml": "atomsrv",
    "bbolin": "lin",
    "cap": ["cap", "pcap"],
    "cu-seeme": "cu",
    "davmount+xml": "davmount",
    "dsptype": "tsp",
    "ecmascript": ["es", "ecma"],
    "futuresplash": "spl",
    "hta": "hta",
    "java-archive": "jar",
    "java-serialized-object": "ser",
    "java-vm": "class",
    "javascript": "js",
    "m3g": "m3g",
    "mac-binhex40": "hqx",
    "mathematica": ["nb", "ma", "mb"],
    "msaccess": "mdb",
    "msword": ["doc", "dot"],
    "mxf": "mxf",
    "oda": "oda",
    "ogg": "ogx",
    "pdf": "pdf",
    "pgp-keys": "key",
    "pgp-signature": ["asc", "sig"],
    "pics-rules": "prf",
    "postscript": ["ps", "ai", "eps", "epsi", "epsf", "eps2", "eps3"],
    "rar": "rar",
    "rdf+xml": "rdf",
    "rss+xml": "rss",
    "rtf": "rtf",
    "smil": ["smi", "smil"],
    "xhtml+xml": ["xhtml", "xht"],
    "xml": ["xml", "xsl", "xsd"],
    "xspf+xml": "xspf",
    "zip": "zip",
    "vnd.android.package-archive": "apk",
    "vnd.cinderella": "cdy",
    "vnd.google-earth.kml+xml": "kml",
    "vnd.google-earth.kmz": "kmz",
    "vnd.mozilla.xul+xml": "xul",
    "vnd.ms-excel": ["xls", "xlb", "xlt", "xlm", "xla", "xlc", "xlw"],
    "vnd.ms-pki.seccat": "cat",
    "vnd.ms-pki.stl": "stl",
    "vnd.ms-powerpoint": ["ppt", "pps", "pot"],
    "vnd.oasis.opendocument.chart": "odc",
    "vnd.oasis.opendocument.database": "odb",
    "vnd.oasis.opendocument.formula": "odf",
    "vnd.oasis.opendocument.graphics": "odg",
    "vnd.oasis.opendocument.graphics-template": "otg",
    "vnd.oasis.opendocument.image": "odi",
    "vnd.oasis.opendocument.presentation": "odp",
    "vnd.oasis.opendocument.presentation-template": "otp",
    "vnd.oasis.opendocument.spreadsheet": "ods",
    "vnd.oasis.opendocument.spreadsheet-template": "ots",
    "vnd.oasis.opendocument.text": "odt",
    "vnd.oasis.opendocument.text-master": "odm",
    "vnd.oasis.opendocument.text-template": "ott",
    "vnd.oasis.opendocument.text-web": "oth",
    "vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
    "vnd.openxmlformats-officedocument.spreadsheetml.template": "xltx",
    "vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",
    "vnd.openxmlformats-officedocument.presentationml.slideshow": "ppsx",
    "vnd.openxmlformats-officedocument.presentationml.template": "potx",
    "vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
    "vnd.openxmlformats-officedocument.wordprocessingml.template": "dotx",
    "vnd.smaf": "mmf",
    "vnd.stardivision.calc": "sdc",
    "vnd.stardivision.chart": "sds",
    "vnd.stardivision.draw": "sda",
    "vnd.stardivision.impress": "sdd",
    "vnd.stardivision.math": ["sdf", "smf"],
    "vnd.stardivision.writer": ["sdw", "vor"],
    "vnd.stardivision.writer-global": "sgl",
    "vnd.sun.xml.calc": "sxc",
    "vnd.sun.xml.calc.template": "stc",
    "vnd.sun.xml.draw": "sxd",
    "vnd.sun.xml.draw.template": "std",
    "vnd.sun.xml.impress": "sxi",
    "vnd.sun.xml.impress.template": "sti",
    "vnd.sun.xml.math": "sxm",
    "vnd.sun.xml.writer": "sxw",
    "vnd.sun.xml.writer.global": "sxg",
    "vnd.sun.xml.writer.template": "stw",
    "vnd.symbian.install": ["sis", "sisx"],
    "vnd.visio": ["vsd", "vst", "vss", "vsw"],
    "vnd.wap.wbxml": "wbxml",
    "vnd.wap.wmlc": "wmlc",
    "vnd.wap.wmlscriptc": "wmlsc",
    "vnd.wordperfect": "wpd",
    "vnd.wordperfect5.1": "wp5",
    "x-123": "wk",
    "x-7z-compressed": "7z",
    "x-abiword": "abw",
    "x-apple-diskimage": "dmg",
    "x-bcpio": "bcpio",
    "x-bittorrent": "torrent",
    "x-cbr": ["cbr", "cba", "cbt", "cb7"],
    "x-cbz": "cbz",
    "x-cdf": ["cdf", "cda"],
    "x-cdlink": "vcd",
    "x-chess-pgn": "pgn",
    "x-cpio": "cpio",
    "x-csh": "csh",
    "x-debian-package": ["deb", "udeb"],
    "x-director": ["dcr", "dir", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"],
    "x-dms": "dms",
    "x-doom": "wad",
    "x-dvi": "dvi",
    "x-httpd-eruby": "rhtml",
    "x-font": "pcf.Z",
    "x-freemind": "mm",
    "x-gnumeric": "gnumeric",
    "x-go-sgf": "sgf",
    "x-graphing-calculator": "gcf",
    "x-gtar": ["gtar", "taz"],
    "x-hdf": "hdf",
    "x-httpd-php": ["phtml", "pht", "php"],
    "x-httpd-php-source": "phps",
    "x-httpd-php3": "php3",
    "x-httpd-php3-preprocessed": "php3p",
    "x-httpd-php4": "php4",
    "x-httpd-php5": "php5",
    "x-ica": "ica",
    "x-info": "info",
    "x-internet-signup": ["ins", "isp"],
    "x-iphone": "iii",
    "x-iso9660-image": "iso",
    "x-java-jnlp-file": "jnlp",
    "x-jmol": "jmz",
    "x-killustrator": "kil",
    "x-koan": ["skp", "skd", "skt", "skm"],
    "x-kpresenter": ["kpr", "kpt"],
    "x-kword": ["kwd", "kwt"],
    "x-latex": "latex",
    "x-lha": "lha",
    "x-lyx": "lyx",
    "x-lzh": "lzh",
    "x-lzx": "lzx",
    "x-maker": ["frm", "maker", "frame", "fm", "fb", "book", "fbdoc"],
    "x-ms-wmd": "wmd",
    "x-ms-wmz": "wmz",
    "x-msdos-program": ["com", "exe", "bat", "dll"],
    "x-msi": "msi",
    "x-netcdf": ["nc", "cdf"],
    "x-ns-proxy-autoconfig": ["pac", "dat"],
    "x-nwc": "nwc",
    "x-object": "o",
    "x-oz-application": "oza",
    "x-pkcs7-certreqresp": "p7r",
    "x-python-code": ["pyc", "pyo"],
    "x-qgis": ["qgs", "shp", "shx"],
    "x-quicktimeplayer": "qtl",
    "x-redhat-package-manager": "rpm",
    "x-ruby": "rb",
    "x-sh": "sh",
    "x-shar": "shar",
    "x-shockwave-flash": ["swf", "swfl"],
    "x-silverlight": "scr",
    "x-stuffit": "sit",
    "x-sv4cpio": "sv4cpio",
    "x-sv4crc": "sv4crc",
    "x-tar": "tar",
    "x-tcl": "tcl",
    "x-tex-gf": "gf",
    "x-tex-pk": "pk",
    "x-texinfo": ["texinfo", "texi"],
    "x-trash": ["~", "%", "bak", "old", "sik"],
    "x-troff": ["t", "tr", "roff"],
    "x-troff-man": "man",
    "x-troff-me": "me",
    "x-troff-ms": "ms",
    "x-ustar": "ustar",
    "x-wais-source": "src",
    "x-wingz": "wz",
    "x-x509-ca-cert": ["crt", "der", "cer"],
    "x-xcf": "xcf",
    "x-xfig": "fig",
    "x-xpinstall": "xpi",
    "applixware": "aw",
    "atomsvc+xml": "atomsvc",
    "ccxml+xml": "ccxml",
    "cdmi-capability": "cdmia",
    "cdmi-container": "cdmic",
    "cdmi-domain": "cdmid",
    "cdmi-object": "cdmio",
    "cdmi-queue": "cdmiq",
    "docbook+xml": "dbk",
    "dssc+der": "dssc",
    "dssc+xml": "xdssc",
    "emma+xml": "emma",
    "epub+zip": "epub",
    "exi": "exi",
    "font-tdpfr": "pfr",
    "gml+xml": "gml",
    "gpx+xml": "gpx",
    "gxf": "gxf",
    "hyperstudio": "stk",
    "inkml+xml": ["ink", "inkml"],
    "ipfix": "ipfix",
    "json": "json",
    "jsonml+json": "jsonml",
    "lost+xml": "lostxml",
    "mads+xml": "mads",
    "marc": "mrc",
    "marcxml+xml": "mrcx",
    "mathml+xml": "mathml",
    "mbox": "mbox",
    "mediaservercontrol+xml": "mscml",
    "metalink+xml": "metalink",
    "metalink4+xml": "meta4",
    "mets+xml": "mets",
    "mods+xml": "mods",
    "mp21": ["m21", "mp21"],
    "mp4": "mp4s",
    "oebps-package+xml": "opf",
    "omdoc+xml": "omdoc",
    "onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"],
    "oxps": "oxps",
    "patch-ops-error+xml": "xer",
    "pgp-encrypted": "pgp",
    "pkcs10": "p10",
    "pkcs7-mime": ["p7m", "p7c"],
    "pkcs7-signature": "p7s",
    "pkcs8": "p8",
    "pkix-attr-cert": "ac",
    "pkix-crl": "crl",
    "pkix-pkipath": "pkipath",
    "pkixcmp": "pki",
    "pls+xml": "pls",
    "prs.cww": "cww",
    "pskc+xml": "pskcxml",
    "reginfo+xml": "rif",
    "relax-ng-compact-syntax": "rnc",
    "resource-lists+xml": "rl",
    "resource-lists-diff+xml": "rld",
    "rls-services+xml": "rs",
    "rpki-ghostbusters": "gbr",
    "rpki-manifest": "mft",
    "rpki-roa": "roa",
    "rsd+xml": "rsd",
    "sbml+xml": "sbml",
    "scvp-cv-request": "scq",
    "scvp-cv-response": "scs",
    "scvp-vp-request": "spq",
    "scvp-vp-response": "spp",
    "sdp": "sdp",
    "set-payment-initiation": "setpay",
    "set-registration-initiation": "setreg",
    "shf+xml": "shf",
    "sparql-query": "rq",
    "sparql-results+xml": "srx",
    "srgs": "gram",
    "srgs+xml": "grxml",
    "sru+xml": "sru",
    "ssdl+xml": "ssdl",
    "ssml+xml": "ssml",
    "tei+xml": ["tei", "teicorpus"],
    "thraud+xml": "tfi",
    "timestamped-data": "tsd",
    "vnd.3gpp.pic-bw-large": "plb",
    "vnd.3gpp.pic-bw-small": "psb",
    "vnd.3gpp.pic-bw-var": "pvb",
    "vnd.3gpp2.tcap": "tcap",
    "vnd.3m.post-it-notes": "pwn",
    "vnd.accpac.simply.aso": "aso",
    "vnd.accpac.simply.imp": "imp",
    "vnd.acucobol": "acu",
    "vnd.acucorp": ["atc", "acutc"],
    "vnd.adobe.air-application-installer-package+zip": "air",
    "vnd.adobe.formscentral.fcdt": "fcdt",
    "vnd.adobe.fxp": ["fxp", "fxpl"],
    "vnd.adobe.xdp+xml": "xdp",
    "vnd.adobe.xfdf": "xfdf",
    "vnd.ahead.space": "ahead",
    "vnd.airzip.filesecure.azf": "azf",
    "vnd.airzip.filesecure.azs": "azs",
    "vnd.amazon.ebook": "azw",
    "vnd.americandynamics.acc": "acc",
    "vnd.amiga.ami": "ami",
    "vnd.anser-web-certificate-issue-initiation": "cii",
    "vnd.anser-web-funds-transfer-initiation": "fti",
    "vnd.antix.game-component": "atx",
    "vnd.apple.installer+xml": "mpkg",
    "vnd.apple.mpegurl": "m3u8",
    "vnd.aristanetworks.swi": "swi",
    "vnd.astraea-software.iota": "iota",
    "vnd.audiograph": "aep",
    "vnd.blueice.multipass": "mpm",
    "vnd.bmi": "bmi",
    "vnd.businessobjects": "rep",
    "vnd.chemdraw+xml": "cdxml",
    "vnd.chipnuts.karaoke-mmd": "mmd",
    "vnd.claymore": "cla",
    "vnd.cloanto.rp9": "rp9",
    "vnd.clonk.c4group": ["c4g", "c4d", "c4f", "c4p", "c4u"],
    "vnd.cluetrust.cartomobile-config": "c11amc",
    "vnd.cluetrust.cartomobile-config-pkg": "c11amz",
    "vnd.commonspace": "csp",
    "vnd.contact.cmsg": "cdbcmsg",
    "vnd.cosmocaller": "cmc",
    "vnd.crick.clicker": "clkx",
    "vnd.crick.clicker.keyboard": "clkk",
    "vnd.crick.clicker.palette": "clkp",
    "vnd.crick.clicker.template": "clkt",
    "vnd.crick.clicker.wordbank": "clkw",
    "vnd.criticaltools.wbs+xml": "wbs",
    "vnd.ctc-posml": "pml",
    "vnd.cups-ppd": "ppd",
    "vnd.curl.car": "car",
    "vnd.curl.pcurl": "pcurl",
    "vnd.dart": "dart",
    "vnd.data-vision.rdz": "rdz",
    "vnd.dece.data": ["uvf", "uvvf", "uvd", "uvvd"],
    "vnd.dece.ttml+xml": ["uvt", "uvvt"],
    "vnd.dece.unspecified": ["uvx", "uvvx"],
    "vnd.dece.zip": ["uvz", "uvvz"],
    "vnd.denovo.fcselayout-link": "fe_launch",
    "vnd.dna": "dna",
    "vnd.dolby.mlp": "mlp",
    "vnd.dpgraph": "dpg",
    "vnd.dreamfactory": "dfac",
    "vnd.ds-keypoint": "kpxx",
    "vnd.dvb.ait": "ait",
    "vnd.dvb.service": "svc",
    "vnd.dynageo": "geo",
    "vnd.ecowin.chart": "mag",
    "vnd.enliven": "nml",
    "vnd.epson.esf": "esf",
    "vnd.epson.msf": "msf",
    "vnd.epson.quickanime": "qam",
    "vnd.epson.salt": "slt",
    "vnd.epson.ssf": "ssf",
    "vnd.eszigno3+xml": ["es3", "et3"],
    "vnd.ezpix-album": "ez2",
    "vnd.ezpix-package": "ez3",
    "vnd.fdf": "fdf",
    "vnd.fdsn.mseed": "mseed",
    "vnd.fdsn.seed": ["seed", "dataless"],
    "vnd.flographit": "gph",
    "vnd.fluxtime.clip": "ftc",
    "vnd.framemaker": ["fm", "frame", "maker", "book"],
    "vnd.frogans.fnc": "fnc",
    "vnd.frogans.ltf": "ltf",
    "vnd.fsc.weblaunch": "fsc",
    "vnd.fujitsu.oasys": "oas",
    "vnd.fujitsu.oasys2": "oa2",
    "vnd.fujitsu.oasys3": "oa3",
    "vnd.fujitsu.oasysgp": "fg5",
    "vnd.fujitsu.oasysprs": "bh2",
    "vnd.fujixerox.ddd": "ddd",
    "vnd.fujixerox.docuworks": "xdw",
    "vnd.fujixerox.docuworks.binder": "xbd",
    "vnd.fuzzysheet": "fzs",
    "vnd.genomatix.tuxedo": "txd",
    "vnd.geogebra.file": "ggb",
    "vnd.geogebra.tool": "ggt",
    "vnd.geometry-explorer": ["gex", "gre"],
    "vnd.geonext": "gxt",
    "vnd.geoplan": "g2w",
    "vnd.geospace": "g3w",
    "vnd.gmx": "gmx",
    "vnd.grafeq": ["gqf", "gqs"],
    "vnd.groove-account": "gac",
    "vnd.groove-help": "ghf",
    "vnd.groove-identity-message": "gim",
    "vnd.groove-injector": "grv",
    "vnd.groove-tool-message": "gtm",
    "vnd.groove-tool-template": "tpl",
    "vnd.groove-vcard": "vcg",
    "vnd.hal+xml": "hal",
    "vnd.handheld-entertainment+xml": "zmm",
    "vnd.hbci": "hbci",
    "vnd.hhe.lesson-player": "les",
    "vnd.hp-hpgl": "hpgl",
    "vnd.hp-hpid": "hpid",
    "vnd.hp-hps": "hps",
    "vnd.hp-jlyt": "jlt",
    "vnd.hp-pcl": "pcl",
    "vnd.hp-pclxl": "pclxl",
    "vnd.hydrostatix.sof-data": "sfd-hdstx",
    "vnd.ibm.minipay": "mpy",
    "vnd.ibm.modcap": ["afp", "listafp", "list3820"],
    "vnd.ibm.rights-management": "irm",
    "vnd.ibm.secure-container": "sc",
    "vnd.iccprofile": ["icc", "icm"],
    "vnd.igloader": "igl",
    "vnd.immervision-ivp": "ivp",
    "vnd.immervision-ivu": "ivu",
    "vnd.insors.igm": "igm",
    "vnd.intercon.formnet": ["xpw", "xpx"],
    "vnd.intergeo": "i2g",
    "vnd.intu.qbo": "qbo",
    "vnd.intu.qfx": "qfx",
    "vnd.ipunplugged.rcprofile": "rcprofile",
    "vnd.irepository.package+xml": "irp",
    "vnd.is-xpr": "xpr",
    "vnd.isac.fcs": "fcs",
    "vnd.jam": "jam",
    "vnd.jcp.javame.midlet-rms": "rms",
    "vnd.jisp": "jisp",
    "vnd.joost.joda-archive": "joda",
    "vnd.kahootz": ["ktz", "ktr"],
    "vnd.kde.karbon": "karbon",
    "vnd.kde.kchart": "chrt",
    "vnd.kde.kformula": "kfo",
    "vnd.kde.kivio": "flw",
    "vnd.kde.kontour": "kon",
    "vnd.kde.kpresenter": ["kpr", "kpt"],
    "vnd.kde.kspread": "ksp",
    "vnd.kde.kword": ["kwd", "kwt"],
    "vnd.kenameaapp": "htke",
    "vnd.kidspiration": "kia",
    "vnd.kinar": ["kne", "knp"],
    "vnd.koan": ["skp", "skd", "skt", "skm"],
    "vnd.kodak-descriptor": "sse",
    "vnd.las.las+xml": "lasxml",
    "vnd.llamagraphics.life-balance.desktop": "lbd",
    "vnd.llamagraphics.life-balance.exchange+xml": "lbe",
    "vnd.lotus-1-2-3": "123",
    "vnd.lotus-approach": "apr",
    "vnd.lotus-freelance": "pre",
    "vnd.lotus-notes": "nsf",
    "vnd.lotus-organizer": "org",
    "vnd.lotus-screencam": "scm",
    "vnd.lotus-wordpro": "lwp",
    "vnd.macports.portpkg": "portpkg",
    "vnd.mcd": "mcd",
    "vnd.medcalcdata": "mc1",
    "vnd.mediastation.cdkey": "cdkey",
    "vnd.mfer": "mwf",
    "vnd.mfmp": "mfm",
    "vnd.micrografx.flo": "flo",
    "vnd.micrografx.igx": "igx",
    "vnd.mif": "mif",
    "vnd.mobius.daf": "daf",
    "vnd.mobius.dis": "dis",
    "vnd.mobius.mbk": "mbk",
    "vnd.mobius.mqy": "mqy",
    "vnd.mobius.msl": "msl",
    "vnd.mobius.plc": "plc",
    "vnd.mobius.txf": "txf",
    "vnd.mophun.application": "mpn",
    "vnd.mophun.certificate": "mpc",
    "vnd.ms-artgalry": "cil",
    "vnd.ms-cab-compressed": "cab",
    "vnd.ms-excel.addin.macroenabled.12": "xlam",
    "vnd.ms-excel.sheet.binary.macroenabled.12": "xlsb",
    "vnd.ms-excel.sheet.macroenabled.12": "xlsm",
    "vnd.ms-excel.template.macroenabled.12": "xltm",
    "vnd.ms-fontobject": "eot",
    "vnd.ms-htmlhelp": "chm",
    "vnd.ms-ims": "ims",
    "vnd.ms-lrm": "lrm",
    "vnd.ms-officetheme": "thmx",
    "vnd.ms-powerpoint.addin.macroenabled.12": "ppam",
    "vnd.ms-powerpoint.presentation.macroenabled.12": "pptm",
    "vnd.ms-powerpoint.slide.macroenabled.12": "sldm",
    "vnd.ms-powerpoint.slideshow.macroenabled.12": "ppsm",
    "vnd.ms-powerpoint.template.macroenabled.12": "potm",
    "vnd.ms-project": ["mpp", "mpt"],
    "vnd.ms-word.document.macroenabled.12": "docm",
    "vnd.ms-word.template.macroenabled.12": "dotm",
    "vnd.ms-works": ["wps", "wks", "wcm", "wdb"],
    "vnd.ms-wpl": "wpl",
    "vnd.ms-xpsdocument": "xps",
    "vnd.mseq": "mseq",
    "vnd.musician": "mus",
    "vnd.muvee.style": "msty",
    "vnd.mynfc": "taglet",
    "vnd.neurolanguage.nlu": "nlu",
    "vnd.nitf": ["ntf", "nitf"],
    "vnd.noblenet-directory": "nnd",
    "vnd.noblenet-sealer": "nns",
    "vnd.noblenet-web": "nnw",
    "vnd.nokia.n-gage.data": "ngdat",
    "vnd.nokia.n-gage.symbian.install": "n-gage",
    "vnd.nokia.radio-preset": "rpst",
    "vnd.nokia.radio-presets": "rpss",
    "vnd.novadigm.edm": "edm",
    "vnd.novadigm.edx": "edx",
    "vnd.novadigm.ext": "ext",
    "vnd.oasis.opendocument.chart-template": "otc",
    "vnd.oasis.opendocument.formula-template": "odft",
    "vnd.oasis.opendocument.image-template": "oti",
    "vnd.olpc-sugar": "xo",
    "vnd.oma.dd2+xml": "dd2",
    "vnd.openofficeorg.extension": "oxt",
    "vnd.openxmlformats-officedocument.presentationml.slide": "sldx",
    "vnd.osgeo.mapguide.package": "mgp",
    "vnd.osgi.dp": "dp",
    "vnd.osgi.subsystem": "esa",
    "vnd.palm": ["pdb", "pqa", "oprc"],
    "vnd.pawaafile": "paw",
    "vnd.pg.format": "str",
    "vnd.pg.osasli": "ei6",
    "vnd.picsel": "efif",
    "vnd.pmi.widget": "wg",
    "vnd.pocketlearn": "plf",
    "vnd.powerbuilder6": "pbd",
    "vnd.previewsystems.box": "box",
    "vnd.proteus.magazine": "mgz",
    "vnd.publishare-delta-tree": "qps",
    "vnd.pvi.ptid1": "ptid",
    "vnd.quark.quarkxpress": ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"],
    "vnd.realvnc.bed": "bed",
    "vnd.recordare.musicxml": "mxl",
    "vnd.recordare.musicxml+xml": "musicxml",
    "vnd.rig.cryptonote": "cryptonote",
    "vnd.rn-realmedia": "rm",
    "vnd.rn-realmedia-vbr": "rmvb",
    "vnd.route66.link66+xml": "link66",
    "vnd.sailingtracker.track": "st",
    "vnd.seemail": "see",
    "vnd.sema": "sema",
    "vnd.semd": "semd",
    "vnd.semf": "semf",
    "vnd.shana.informed.formdata": "ifm",
    "vnd.shana.informed.formtemplate": "itp",
    "vnd.shana.informed.interchange": "iif",
    "vnd.shana.informed.package": "ipk",
    "vnd.simtech-mindmapper": ["twd", "twds"],
    "vnd.smart.teacher": "teacher",
    "vnd.solent.sdkm+xml": ["sdkm", "sdkd"],
    "vnd.spotfire.dxp": "dxp",
    "vnd.spotfire.sfs": "sfs",
    "vnd.stepmania.package": "smzip",
    "vnd.stepmania.stepchart": "sm",
    "vnd.sus-calendar": ["sus", "susp"],
    "vnd.svd": "svd",
    "vnd.syncml+xml": "xsm",
    "vnd.syncml.dm+wbxml": "bdm",
    "vnd.syncml.dm+xml": "xdm",
    "vnd.tao.intent-module-archive": "tao",
    "vnd.tcpdump.pcap": ["pcap", "cap", "dmp"],
    "vnd.tmobile-livetv": "tmo",
    "vnd.trid.tpt": "tpt",
    "vnd.triscape.mxs": "mxs",
    "vnd.trueapp": "tra",
    "vnd.ufdl": ["ufd", "ufdl"],
    "vnd.uiq.theme": "utz",
    "vnd.umajin": "umj",
    "vnd.unity": "unityweb",
    "vnd.uoml+xml": "uoml",
    "vnd.vcx": "vcx",
    "vnd.visionary": "vis",
    "vnd.vsf": "vsf",
    "vnd.webturbo": "wtb",
    "vnd.wolfram.player": "nbp",
    "vnd.wqd": "wqd",
    "vnd.wt.stf": "stf",
    "vnd.xara": "xar",
    "vnd.xfdl": "xfdl",
    "vnd.yamaha.hv-dic": "hvd",
    "vnd.yamaha.hv-script": "hvs",
    "vnd.yamaha.hv-voice": "hvp",
    "vnd.yamaha.openscoreformat": "osf",
    "vnd.yamaha.openscoreformat.osfpvg+xml": "osfpvg",
    "vnd.yamaha.smaf-audio": "saf",
    "vnd.yamaha.smaf-phrase": "spf",
    "vnd.yellowriver-custom-menu": "cmp",
    "vnd.zul": ["zir", "zirz"],
    "vnd.zzazz.deck+xml": "zaz",
    "voicexml+xml": "vxml",
    "widget": "wgt",
    "winhlp": "hlp",
    "wsdl+xml": "wsdl",
    "wspolicy+xml": "wspolicy",
    "x-ace-compressed": "ace",
    "x-authorware-bin": ["aab", "x32", "u32", "vox"],
    "x-authorware-map": "aam",
    "x-authorware-seg": "aas",
    "x-blorb": ["blb", "blorb"],
    "x-bzip": "bz",
    "x-bzip2": ["bz2", "boz"],
    "x-cfs-compressed": "cfs",
    "x-chat": "chat",
    "x-conference": "nsc",
    "x-dgc-compressed": "dgc",
    "x-dtbncx+xml": "ncx",
    "x-dtbook+xml": "dtb",
    "x-dtbresource+xml": "res",
    "x-eva": "eva",
    "x-font-bdf": "bdf",
    "x-font-ghostscript": "gsf",
    "x-font-linux-psf": "psf",
    "x-font-otf": "otf",
    "x-font-pcf": "pcf",
    "x-font-snf": "snf",
    "x-font-ttf": ["ttf", "ttc"],
    "x-font-type1": ["pfa", "pfb", "pfm", "afm"],
    "x-font-woff": "woff",
    "x-freearc": "arc",
    "x-gca-compressed": "gca",
    "x-glulx": "ulx",
    "x-gramps-xml": "gramps",
    "x-install-instructions": "install",
    "x-lzh-compressed": ["lzh", "lha"],
    "x-mie": "mie",
    "x-mobipocket-ebook": ["prc", "mobi"],
    "x-ms-application": "application",
    "x-ms-shortcut": "lnk",
    "x-ms-xbap": "xbap",
    "x-msbinder": "obd",
    "x-mscardfile": "crd",
    "x-msclip": "clp",
    "x-msdownload": ["exe", "dll", "com", "bat", "msi"],
    "x-msmediaview": ["mvb", "m13", "m14"],
    "x-msmetafile": ["wmf", "wmz", "emf", "emz"],
    "x-msmoney": "mny",
    "x-mspublisher": "pub",
    "x-msschedule": "scd",
    "x-msterminal": "trm",
    "x-mswrite": "wri",
    "x-nzb": "nzb",
    "x-pkcs12": ["p12", "pfx"],
    "x-pkcs7-certificates": ["p7b", "spc"],
    "x-research-info-systems": "ris",
    "x-silverlight-app": "xap",
    "x-sql": "sql",
    "x-stuffitx": "sitx",
    "x-subrip": "srt",
    "x-t3vm-image": "t3",
    "x-tads": "gam",
    "x-tex": "tex",
    "x-tex-tfm": "tfm",
    "x-tgif": "obj",
    "x-xliff+xml": "xlf",
    "x-xz": "xz",
    "x-zmachine": ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"],
    "xaml+xml": "xaml",
    "xcap-diff+xml": "xdf",
    "xenc+xml": "xenc",
    "xml-dtd": "dtd",
    "xop+xml": "xop",
    "xproc+xml": "xpl",
    "xslt+xml": "xslt",
    "xv+xml": ["mxml", "xhvml", "xvml", "xvm"],
    "yang": "yang",
    "yin+xml": "yin",
    "envoy": "evy",
    "fractals": "fif",
    "internet-property-stream": "acx",
    "olescript": "axs",
    "vnd.ms-outlook": "msg",
    "vnd.ms-pkicertstore": "sst",
    "x-compress": "z",
    "x-compressed": "tgz",
    "x-gzip": "gz",
    "x-perfmon": ["pma", "pmc", "pml", "pmr", "pmw"],
    "x-pkcs7-mime": ["p7c", "p7m"],
    "ynd.ms-pkipko": "pko"
  },
  "audio": {
    "amr": "amr",
    "amr-wb": "awb",
    "annodex": "axa",
    "basic": ["au", "snd"],
    "flac": "flac",
    "midi": ["mid", "midi", "kar", "rmi"],
    "mpeg": ["mpga", "mpega", "mp2", "mp3", "m4a", "mp2a", "m2a", "m3a"],
    "mpegurl": "m3u",
    "ogg": ["oga", "ogg", "spx"],
    "prs.sid": "sid",
    "x-aiff": ["aif", "aiff", "aifc"],
    "x-gsm": "gsm",
    "x-ms-wma": "wma",
    "x-ms-wax": "wax",
    "x-pn-realaudio": "ram",
    "x-realaudio": "ra",
    "x-sd2": "sd2",
    "x-wav": "wav",
    "adpcm": "adp",
    "mp4": "mp4a",
    "s3m": "s3m",
    "silk": "sil",
    "vnd.dece.audio": ["uva", "uvva"],
    "vnd.digital-winds": "eol",
    "vnd.dra": "dra",
    "vnd.dts": "dts",
    "vnd.dts.hd": "dtshd",
    "vnd.lucent.voice": "lvp",
    "vnd.ms-playready.media.pya": "pya",
    "vnd.nuera.ecelp4800": "ecelp4800",
    "vnd.nuera.ecelp7470": "ecelp7470",
    "vnd.nuera.ecelp9600": "ecelp9600",
    "vnd.rip": "rip",
    "webm": "weba",
    "x-aac": "aac",
    "x-caf": "caf",
    "x-matroska": "mka",
    "x-pn-realaudio-plugin": "rmp",
    "xm": "xm",
    "mid": ["mid", "rmi"]
  },
  "chemical": {
    "x-alchemy": "alc",
    "x-cache": ["cac", "cache"],
    "x-cache-csf": "csf",
    "x-cactvs-binary": ["cbin", "cascii", "ctab"],
    "x-cdx": "cdx",
    "x-chem3d": "c3d",
    "x-cif": "cif",
    "x-cmdf": "cmdf",
    "x-cml": "cml",
    "x-compass": "cpa",
    "x-crossfire": "bsd",
    "x-csml": ["csml", "csm"],
    "x-ctx": "ctx",
    "x-cxf": ["cxf", "cef"],
    "x-embl-dl-nucleotide": ["emb", "embl"],
    "x-gamess-input": ["inp", "gam", "gamin"],
    "x-gaussian-checkpoint": ["fch", "fchk"],
    "x-gaussian-cube": "cub",
    "x-gaussian-input": ["gau", "gjc", "gjf"],
    "x-gaussian-log": "gal",
    "x-gcg8-sequence": "gcg",
    "x-genbank": "gen",
    "x-hin": "hin",
    "x-isostar": ["istr", "ist"],
    "x-jcamp-dx": ["jdx", "dx"],
    "x-kinemage": "kin",
    "x-macmolecule": "mcm",
    "x-macromodel-input": ["mmd", "mmod"],
    "x-mdl-molfile": "mol",
    "x-mdl-rdfile": "rd",
    "x-mdl-rxnfile": "rxn",
    "x-mdl-sdfile": ["sd", "sdf"],
    "x-mdl-tgf": "tgf",
    "x-mmcif": "mcif",
    "x-mol2": "mol2",
    "x-molconn-Z": "b",
    "x-mopac-graph": "gpt",
    "x-mopac-input": ["mop", "mopcrt", "mpc", "zmt"],
    "x-mopac-out": "moo",
    "x-ncbi-asn1": "asn",
    "x-ncbi-asn1-ascii": ["prt", "ent"],
    "x-ncbi-asn1-binary": ["val", "aso"],
    "x-pdb": ["pdb", "ent"],
    "x-rosdal": "ros",
    "x-swissprot": "sw",
    "x-vamas-iso14976": "vms",
    "x-vmd": "vmd",
    "x-xtel": "xtel",
    "x-xyz": "xyz"
  },
  "image": {
    "gif": "gif",
    "ief": "ief",
    "jpeg": ["jpeg", "jpg", "jpe"],
    "pcx": "pcx",
    "png": "png",
    "svg+xml": ["svg", "svgz"],
    "tiff": ["tiff", "tif"],
    "vnd.djvu": ["djvu", "djv"],
    "vnd.wap.wbmp": "wbmp",
    "x-canon-cr2": "cr2",
    "x-canon-crw": "crw",
    "x-cmu-raster": "ras",
    "x-coreldraw": "cdr",
    "x-coreldrawpattern": "pat",
    "x-coreldrawtemplate": "cdt",
    "x-corelphotopaint": "cpt",
    "x-epson-erf": "erf",
    "x-icon": "ico",
    "x-jg": "art",
    "x-jng": "jng",
    "x-nikon-nef": "nef",
    "x-olympus-orf": "orf",
    "x-photoshop": "psd",
    "x-portable-anymap": "pnm",
    "x-portable-bitmap": "pbm",
    "x-portable-graymap": "pgm",
    "x-portable-pixmap": "ppm",
    "x-rgb": "rgb",
    "x-xbitmap": "xbm",
    "x-xpixmap": "xpm",
    "x-xwindowdump": "xwd",
    "bmp": "bmp",
    "cgm": "cgm",
    "g3fax": "g3",
    "ktx": "ktx",
    "prs.btif": "btif",
    "sgi": "sgi",
    "vnd.dece.graphic": ["uvi", "uvvi", "uvg", "uvvg"],
    "vnd.dwg": "dwg",
    "vnd.dxf": "dxf",
    "vnd.fastbidsheet": "fbs",
    "vnd.fpx": "fpx",
    "vnd.fst": "fst",
    "vnd.fujixerox.edmics-mmr": "mmr",
    "vnd.fujixerox.edmics-rlc": "rlc",
    "vnd.ms-modi": "mdi",
    "vnd.ms-photo": "wdp",
    "vnd.net-fpx": "npx",
    "vnd.xiff": "xif",
    "webp": "webp",
    "x-3ds": "3ds",
    "x-cmx": "cmx",
    "x-freehand": ["fh", "fhc", "fh4", "fh5", "fh7"],
    "x-pict": ["pic", "pct"],
    "x-tga": "tga",
    "cis-cod": "cod",
    "pipeg": "jfif"
  },
  "message": {
    "rfc822": ["eml", "mime", "mht", "mhtml", "nws"]
  },
  "model": {
    "iges": ["igs", "iges"],
    "mesh": ["msh", "mesh", "silo"],
    "vrml": ["wrl", "vrml"],
    "x3d+vrml": ["x3dv", "x3dvz"],
    "x3d+xml": ["x3d", "x3dz"],
    "x3d+binary": ["x3db", "x3dbz"],
    "vnd.collada+xml": "dae",
    "vnd.dwf": "dwf",
    "vnd.gdl": "gdl",
    "vnd.gtw": "gtw",
    "vnd.mts": "mts",
    "vnd.vtu": "vtu"
  },
  "text": {
    "cache-manifest": ["manifest", "appcache"],
    "calendar": ["ics", "icz", "ifb"],
    "css": "css",
    "csv": "csv",
    "h323": "323",
    "html": ["html", "htm", "shtml", "stm"],
    "iuls": "uls",
    "mathml": "mml",
    "plain": ["txt", "text", "brf", "conf", "def", "list", "log", "in", "bas"],
    "richtext": "rtx",
    "scriptlet": ["sct", "wsc"],
    "texmacs": ["tm", "ts"],
    "tab-separated-values": "tsv",
    "vnd.sun.j2me.app-descriptor": "jad",
    "vnd.wap.wml": "wml",
    "vnd.wap.wmlscript": "wmls",
    "x-bibtex": "bib",
    "x-boo": "boo",
    "x-c++hdr": ["h++", "hpp", "hxx", "hh"],
    "x-c++src": ["c++", "cpp", "cxx", "cc"],
    "x-component": "htc",
    "x-dsrc": "d",
    "x-diff": ["diff", "patch"],
    "x-haskell": "hs",
    "x-java": "java",
    "x-literate-haskell": "lhs",
    "x-moc": "moc",
    "x-pascal": ["p", "pas"],
    "x-pcs-gcd": "gcd",
    "x-perl": ["pl", "pm"],
    "x-python": "py",
    "x-scala": "scala",
    "x-setext": "etx",
    "x-tcl": ["tcl", "tk"],
    "x-tex": ["tex", "ltx", "sty", "cls"],
    "x-vcalendar": "vcs",
    "x-vcard": "vcf",
    "n3": "n3",
    "prs.lines.tag": "dsc",
    "sgml": ["sgml", "sgm"],
    "troff": ["t", "tr", "roff", "man", "me", "ms"],
    "turtle": "ttl",
    "uri-list": ["uri", "uris", "urls"],
    "vcard": "vcard",
    "vnd.curl": "curl",
    "vnd.curl.dcurl": "dcurl",
    "vnd.curl.scurl": "scurl",
    "vnd.curl.mcurl": "mcurl",
    "vnd.dvb.subtitle": "sub",
    "vnd.fly": "fly",
    "vnd.fmi.flexstor": "flx",
    "vnd.graphviz": "gv",
    "vnd.in3d.3dml": "3dml",
    "vnd.in3d.spot": "spot",
    "x-asm": ["s", "asm"],
    "x-c": ["c", "cc", "cxx", "cpp", "h", "hh", "dic"],
    "x-fortran": ["f", "for", "f77", "f90"],
    "x-opml": "opml",
    "x-nfo": "nfo",
    "x-sfv": "sfv",
    "x-uuencode": "uu",
    "webviewhtml": "htt"
  },
  "video": {
    "avif": ".avif",
    "3gpp": "3gp",
    "annodex": "axv",
    "dl": "dl",
    "dv": ["dif", "dv"],
    "fli": "fli",
    "gl": "gl",
    "mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v", "mp2", "mpa", "mpv2"],
    "mp4": ["mp4", "mp4v", "mpg4"],
    "quicktime": ["qt", "mov"],
    "ogg": "ogv",
    "vnd.mpegurl": ["mxu", "m4u"],
    "x-flv": "flv",
    "x-la-asf": ["lsf", "lsx"],
    "x-mng": "mng",
    "x-ms-asf": ["asf", "asx", "asr"],
    "x-ms-wm": "wm",
    "x-ms-wmv": "wmv",
    "x-ms-wmx": "wmx",
    "x-ms-wvx": "wvx",
    "x-msvideo": "avi",
    "x-sgi-movie": "movie",
    "x-matroska": ["mpv", "mkv", "mk3d", "mks"],
    "3gpp2": "3g2",
    "h261": "h261",
    "h263": "h263",
    "h264": "h264",
    "jpeg": "jpgv",
    "jpm": ["jpm", "jpgm"],
    "mj2": ["mj2", "mjp2"],
    "vnd.dece.hd": ["uvh", "uvvh"],
    "vnd.dece.mobile": ["uvm", "uvvm"],
    "vnd.dece.pd": ["uvp", "uvvp"],
    "vnd.dece.sd": ["uvs", "uvvs"],
    "vnd.dece.video": ["uvv", "uvvv"],
    "vnd.dvb.file": "dvb",
    "vnd.fvt": "fvt",
    "vnd.ms-playready.media.pyv": "pyv",
    "vnd.uvvu.mp4": ["uvu", "uvvu"],
    "vnd.vivo": "viv",
    "webm": "webm",
    "x-f4v": "f4v",
    "x-m4v": "m4v",
    "x-ms-vob": "vob",
    "x-smv": "smv"
  },
  "x-conference": {
    "x-cooltalk": "ice"
  },
  "x-world": {
    "x-vrml": ["vrm", "vrml", "wrl", "flr", "wrz", "xaf", "xof"]
  }
};
var mimeTypes = function () {
  var mimeTypes = {};
  for (var type in table) {
    // eslint-disable-next-line no-prototype-builtins
    if (table.hasOwnProperty(type)) {
      for (var subtype in table[type]) {
        // eslint-disable-next-line no-prototype-builtins
        if (table[type].hasOwnProperty(subtype)) {
          var value = table[type][subtype];
          if (typeof value == "string") {
            mimeTypes[value] = type + "/" + subtype;
          } else {
            for (var indexMimeType = 0; indexMimeType < value.length; indexMimeType++) {
              mimeTypes[value[indexMimeType]] = type + "/" + subtype;
            }
          }
        }
      }
    }
  }
  return mimeTypes;
}();
exports.mimeTypes = mimeTypes;
function getMimeType(filename) {
  return filename && mimeTypes[filename.split(".").pop().toLowerCase()] || (0, _defaultMimeType.getMimeType)();
}
},{"./default-mime-type.js":"../node_modules/@zip.js/zip.js/lib/core/util/default-mime-type.js"}],"../node_modules/@zip.js/zip.js/lib/core/streams/codecs/crc32.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Crc32 = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var table = [];
for (var i = 0; i < 256; i++) {
  var t = i;
  for (var j = 0; j < 8; j++) {
    if (t & 1) {
      t = t >>> 1 ^ 0xEDB88320;
    } else {
      t = t >>> 1;
    }
  }
  table[i] = t;
}
var Crc32 = /*#__PURE__*/function () {
  function Crc32(crc) {
    _classCallCheck(this, Crc32);
    this.crc = crc || -1;
  }
  _createClass(Crc32, [{
    key: "append",
    value: function append(data) {
      var crc = this.crc | 0;
      for (var offset = 0, length = data.length | 0; offset < length; offset++) {
        crc = crc >>> 8 ^ table[(crc ^ data[offset]) & 0xFF];
      }
      this.crc = crc;
    }
  }, {
    key: "get",
    value: function get() {
      return ~this.crc;
    }
  }]);
  return Crc32;
}();
exports.Crc32 = Crc32;
},{}],"../node_modules/@zip.js/zip.js/lib/core/streams/crc32-stream.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Crc32Stream = void 0;
var _crc = require("./codecs/crc32.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var Crc32Stream = /*#__PURE__*/function (_TransformStream) {
  _inherits(Crc32Stream, _TransformStream);
  var _super = _createSuper(Crc32Stream);
  function Crc32Stream() {
    _classCallCheck(this, Crc32Stream);
    var crc32 = new _crc.Crc32();
    return _super.call(this, {
      transform: function transform(chunk) {
        crc32.append(chunk);
      },
      flush: function flush(controller) {
        var value = new Uint8Array(4);
        var dataView = new DataView(value.buffer);
        dataView.setUint32(0, crc32.get());
        controller.enqueue(value);
      }
    });
  }
  return _createClass(Crc32Stream);
}(TransformStream);
exports.Crc32Stream = Crc32Stream;
},{"./codecs/crc32.js":"../node_modules/@zip.js/zip.js/lib/core/streams/codecs/crc32.js"}],"../node_modules/@zip.js/zip.js/lib/core/util/encode-text.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encodeText = encodeText;
/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/* global TextEncoder */

function encodeText(value) {
  if (typeof TextEncoder == "undefined") {
    value = unescape(encodeURIComponent(value));
    var result = new Uint8Array(value.length);
    for (var i = 0; i < result.length; i++) {
      result[i] = value.charCodeAt(i);
    }
    return result;
  } else {
    return new TextEncoder().encode(value);
  }
}
},{}],"../node_modules/@zip.js/zip.js/lib/core/streams/codecs/sjcl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.random = exports.mode = exports.misc = exports.codec = exports.cipher = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// Derived from https://github.com/xqdoo00o/jszip/blob/master/lib/sjcl.js and https://github.com/bitwiseshiftleft/sjcl

// deno-lint-ignore-file no-this-alias

/*
 * SJCL is open. You can use, modify and redistribute it under a BSD
 * license or under the GNU GPL, version 2.0.
 */

/** @fileOverview Javascript cryptography implementation.
 *
 * Crush to remove comments, shorten variable names and
 * generally reduce transmission size.
 *
 * @author Emily Stark
 * @author Mike Hamburg
 * @author Dan Boneh
 */

/*jslint indent: 2, bitwise: false, nomen: false, plusplus: false, white: false, regexp: false */

/** @fileOverview Arrays of bits, encoded as arrays of Numbers.
 *
 * @author Emily Stark
 * @author Mike Hamburg
 * @author Dan Boneh
 */

/**
 * Arrays of bits, encoded as arrays of Numbers.
 * @namespace
 * @description
 * <p>
 * These objects are the currency accepted by SJCL's crypto functions.
 * </p>
 *
 * <p>
 * Most of our crypto primitives operate on arrays of 4-byte words internally,
 * but many of them can take arguments that are not a multiple of 4 bytes.
 * This library encodes arrays of bits (whose size need not be a multiple of 8
 * bits) as arrays of 32-bit words.  The bits are packed, big-endian, into an
 * array of words, 32 bits at a time.  Since the words are double-precision
 * floating point numbers, they fit some extra data.  We use this (in a private,
 * possibly-changing manner) to encode the number of bits actually  present
 * in the last word of the array.
 * </p>
 *
 * <p>
 * Because bitwise ops clear this out-of-band data, these arrays can be passed
 * to ciphers like AES which want arrays of words.
 * </p>
 */
var bitArray = {
  /**
   * Concatenate two bit arrays.
   * @param {bitArray} a1 The first array.
   * @param {bitArray} a2 The second array.
   * @return {bitArray} The concatenation of a1 and a2.
   */
  concat: function concat(a1, a2) {
    if (a1.length === 0 || a2.length === 0) {
      return a1.concat(a2);
    }
    var last = a1[a1.length - 1],
      shift = bitArray.getPartial(last);
    if (shift === 32) {
      return a1.concat(a2);
    } else {
      return bitArray._shiftRight(a2, shift, last | 0, a1.slice(0, a1.length - 1));
    }
  },
  /**
   * Find the length of an array of bits.
   * @param {bitArray} a The array.
   * @return {Number} The length of a, in bits.
   */
  bitLength: function bitLength(a) {
    var l = a.length;
    if (l === 0) {
      return 0;
    }
    var x = a[l - 1];
    return (l - 1) * 32 + bitArray.getPartial(x);
  },
  /**
   * Truncate an array.
   * @param {bitArray} a The array.
   * @param {Number} len The length to truncate to, in bits.
   * @return {bitArray} A new array, truncated to len bits.
   */
  clamp: function clamp(a, len) {
    if (a.length * 32 < len) {
      return a;
    }
    a = a.slice(0, Math.ceil(len / 32));
    var l = a.length;
    len = len & 31;
    if (l > 0 && len) {
      a[l - 1] = bitArray.partial(len, a[l - 1] & 0x80000000 >> len - 1, 1);
    }
    return a;
  },
  /**
   * Make a partial word for a bit array.
   * @param {Number} len The number of bits in the word.
   * @param {Number} x The bits.
   * @param {Number} [_end=0] Pass 1 if x has already been shifted to the high side.
   * @return {Number} The partial word.
   */
  partial: function partial(len, x, _end) {
    if (len === 32) {
      return x;
    }
    return (_end ? x | 0 : x << 32 - len) + len * 0x10000000000;
  },
  /**
   * Get the number of bits used by a partial word.
   * @param {Number} x The partial word.
   * @return {Number} The number of bits used by the partial word.
   */
  getPartial: function getPartial(x) {
    return Math.round(x / 0x10000000000) || 32;
  },
  /** Shift an array right.
   * @param {bitArray} a The array to shift.
   * @param {Number} shift The number of bits to shift.
   * @param {Number} [carry=0] A byte to carry in
   * @param {bitArray} [out=[]] An array to prepend to the output.
   * @private
   */
  _shiftRight: function _shiftRight(a, shift, carry, out) {
    if (out === undefined) {
      out = [];
    }
    for (; shift >= 32; shift -= 32) {
      out.push(carry);
      carry = 0;
    }
    if (shift === 0) {
      return out.concat(a);
    }
    for (var i = 0; i < a.length; i++) {
      out.push(carry | a[i] >>> shift);
      carry = a[i] << 32 - shift;
    }
    var last2 = a.length ? a[a.length - 1] : 0;
    var shift2 = bitArray.getPartial(last2);
    out.push(bitArray.partial(shift + shift2 & 31, shift + shift2 > 32 ? carry : out.pop(), 1));
    return out;
  }
};

/** @fileOverview Bit array codec implementations.
 *
 * @author Emily Stark
 * @author Mike Hamburg
 * @author Dan Boneh
 */

/**
 * Arrays of bytes
 * @namespace
 */
var codec = {
  bytes: {
    /** Convert from a bitArray to an array of bytes. */fromBits: function fromBits(arr) {
      var bl = bitArray.bitLength(arr);
      var byteLength = bl / 8;
      var out = new Uint8Array(byteLength);
      var tmp;
      for (var i = 0; i < byteLength; i++) {
        if ((i & 3) === 0) {
          tmp = arr[i / 4];
        }
        out[i] = tmp >>> 24;
        tmp <<= 8;
      }
      return out;
    },
    /** Convert from an array of bytes to a bitArray. */toBits: function toBits(bytes) {
      var out = [];
      var i;
      var tmp = 0;
      for (i = 0; i < bytes.length; i++) {
        tmp = tmp << 8 | bytes[i];
        if ((i & 3) === 3) {
          out.push(tmp);
          tmp = 0;
        }
      }
      if (i & 3) {
        out.push(bitArray.partial(8 * (i & 3), tmp));
      }
      return out;
    }
  }
};
exports.codec = codec;
var hash = {};

/**
 * Context for a SHA-1 operation in progress.
 * @constructor
 */
hash.sha1 = /*#__PURE__*/function () {
  function _class(hash) {
    _classCallCheck(this, _class);
    var sha1 = this;
    /**
     * The hash's block size, in bits.
     * @constant
     */
    sha1.blockSize = 512;
    /**
     * The SHA-1 initialization vector.
     * @private
     */
    sha1._init = [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0];
    /**
     * The SHA-1 hash key.
     * @private
     */
    sha1._key = [0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xCA62C1D6];
    if (hash) {
      sha1._h = hash._h.slice(0);
      sha1._buffer = hash._buffer.slice(0);
      sha1._length = hash._length;
    } else {
      sha1.reset();
    }
  }

  /**
   * Reset the hash state.
   * @return this
   */
  _createClass(_class, [{
    key: "reset",
    value: function reset() {
      var sha1 = this;
      sha1._h = sha1._init.slice(0);
      sha1._buffer = [];
      sha1._length = 0;
      return sha1;
    }

    /**
     * Input several words to the hash.
     * @param {bitArray|String} data the data to hash.
     * @return this
     */
  }, {
    key: "update",
    value: function update(data) {
      var sha1 = this;
      if (typeof data === "string") {
        data = codec.utf8String.toBits(data);
      }
      var b = sha1._buffer = bitArray.concat(sha1._buffer, data);
      var ol = sha1._length;
      var nl = sha1._length = ol + bitArray.bitLength(data);
      if (nl > 9007199254740991) {
        throw new Error("Cannot hash more than 2^53 - 1 bits");
      }
      var c = new Uint32Array(b);
      var j = 0;
      for (var i = sha1.blockSize + ol - (sha1.blockSize + ol & sha1.blockSize - 1); i <= nl; i += sha1.blockSize) {
        sha1._block(c.subarray(16 * j, 16 * (j + 1)));
        j += 1;
      }
      b.splice(0, 16 * j);
      return sha1;
    }

    /**
     * Complete hashing and output the hash value.
     * @return {bitArray} The hash value, an array of 5 big-endian words. TODO
     */
  }, {
    key: "finalize",
    value: function finalize() {
      var sha1 = this;
      var b = sha1._buffer;
      var h = sha1._h;

      // Round out and push the buffer
      b = bitArray.concat(b, [bitArray.partial(1, 1)]);
      // Round out the buffer to a multiple of 16 words, less the 2 length words.
      for (var i = b.length + 2; i & 15; i++) {
        b.push(0);
      }

      // append the length
      b.push(Math.floor(sha1._length / 0x100000000));
      b.push(sha1._length | 0);
      while (b.length) {
        sha1._block(b.splice(0, 16));
      }
      sha1.reset();
      return h;
    }

    /**
     * The SHA-1 logical functions f(0), f(1), ..., f(79).
     * @private
     */
  }, {
    key: "_f",
    value: function _f(t, b, c, d) {
      if (t <= 19) {
        return b & c | ~b & d;
      } else if (t <= 39) {
        return b ^ c ^ d;
      } else if (t <= 59) {
        return b & c | b & d | c & d;
      } else if (t <= 79) {
        return b ^ c ^ d;
      }
    }

    /**
     * Circular left-shift operator.
     * @private
     */
  }, {
    key: "_S",
    value: function _S(n, x) {
      return x << n | x >>> 32 - n;
    }

    /**
     * Perform one cycle of SHA-1.
     * @param {Uint32Array|bitArray} words one block of words.
     * @private
     */
  }, {
    key: "_block",
    value: function _block(words) {
      var sha1 = this;
      var h = sha1._h;
      // When words is passed to _block, it has 16 elements. SHA1 _block
      // function extends words with new elements (at the end there are 80 elements). 
      // The problem is that if we use Uint32Array instead of Array, 
      // the length of Uint32Array cannot be changed. Thus, we replace words with a 
      // normal Array here.
      var w = Array(80); // do not use Uint32Array here as the instantiation is slower
      for (var j = 0; j < 16; j++) {
        w[j] = words[j];
      }
      var a = h[0];
      var b = h[1];
      var c = h[2];
      var d = h[3];
      var e = h[4];
      for (var t = 0; t <= 79; t++) {
        if (t >= 16) {
          w[t] = sha1._S(1, w[t - 3] ^ w[t - 8] ^ w[t - 14] ^ w[t - 16]);
        }
        var tmp = sha1._S(5, a) + sha1._f(t, b, c, d) + e + w[t] + sha1._key[Math.floor(t / 20)] | 0;
        e = d;
        d = c;
        c = sha1._S(30, b);
        b = a;
        a = tmp;
      }
      h[0] = h[0] + a | 0;
      h[1] = h[1] + b | 0;
      h[2] = h[2] + c | 0;
      h[3] = h[3] + d | 0;
      h[4] = h[4] + e | 0;
    }
  }]);
  return _class;
}();

/** @fileOverview Low-level AES implementation.
 *
 * This file contains a low-level implementation of AES, optimized for
 * size and for efficiency on several browsers.  It is based on
 * OpenSSL's aes_core.c, a public-domain implementation by Vincent
 * Rijmen, Antoon Bosselaers and Paulo Barreto.
 *
 * An older version of this implementation is available in the public
 * domain, but this one is (c) Emily Stark, Mike Hamburg, Dan Boneh,
 * Stanford University 2008-2010 and BSD-licensed for liability
 * reasons.
 *
 * @author Emily Stark
 * @author Mike Hamburg
 * @author Dan Boneh
 */

var cipher = {};

/**
 * Schedule out an AES key for both encryption and decryption.  This
 * is a low-level class.  Use a cipher mode to do bulk encryption.
 *
 * @constructor
 * @param {Array} key The key as an array of 4, 6 or 8 words.
 */
exports.cipher = cipher;
cipher.aes = /*#__PURE__*/function () {
  function _class2(key) {
    _classCallCheck(this, _class2);
    /**
     * The expanded S-box and inverse S-box tables.  These will be computed
     * on the client so that we don't have to send them down the wire.
     *
     * There are two tables, _tables[0] is for encryption and
     * _tables[1] is for decryption.
     *
     * The first 4 sub-tables are the expanded S-box with MixColumns.  The
     * last (_tables[01][4]) is the S-box itself.
     *
     * @private
     */
    var aes = this;
    aes._tables = [[[], [], [], [], []], [[], [], [], [], []]];
    if (!aes._tables[0][0][0]) {
      aes._precompute();
    }
    var sbox = aes._tables[0][4];
    var decTable = aes._tables[1];
    var keyLen = key.length;
    var i,
      encKey,
      decKey,
      rcon = 1;
    if (keyLen !== 4 && keyLen !== 6 && keyLen !== 8) {
      throw new Error("invalid aes key size");
    }
    aes._key = [encKey = key.slice(0), decKey = []];

    // schedule encryption keys
    for (i = keyLen; i < 4 * keyLen + 28; i++) {
      var tmp = encKey[i - 1];

      // apply sbox
      if (i % keyLen === 0 || keyLen === 8 && i % keyLen === 4) {
        tmp = sbox[tmp >>> 24] << 24 ^ sbox[tmp >> 16 & 255] << 16 ^ sbox[tmp >> 8 & 255] << 8 ^ sbox[tmp & 255];

        // shift rows and add rcon
        if (i % keyLen === 0) {
          tmp = tmp << 8 ^ tmp >>> 24 ^ rcon << 24;
          rcon = rcon << 1 ^ (rcon >> 7) * 283;
        }
      }
      encKey[i] = encKey[i - keyLen] ^ tmp;
    }

    // schedule decryption keys
    for (var j = 0; i; j++, i--) {
      var _tmp = encKey[j & 3 ? i : i - 4];
      if (i <= 4 || j < 4) {
        decKey[j] = _tmp;
      } else {
        decKey[j] = decTable[0][sbox[_tmp >>> 24]] ^ decTable[1][sbox[_tmp >> 16 & 255]] ^ decTable[2][sbox[_tmp >> 8 & 255]] ^ decTable[3][sbox[_tmp & 255]];
      }
    }
  }
  // public
  /* Something like this might appear here eventually
  name: "AES",
  blockSize: 4,
  keySizes: [4,6,8],
  */

  /**
   * Encrypt an array of 4 big-endian words.
   * @param {Array} data The plaintext.
   * @return {Array} The ciphertext.
   */
  _createClass(_class2, [{
    key: "encrypt",
    value: function encrypt(data) {
      return this._crypt(data, 0);
    }

    /**
     * Decrypt an array of 4 big-endian words.
     * @param {Array} data The ciphertext.
     * @return {Array} The plaintext.
     */
  }, {
    key: "decrypt",
    value: function decrypt(data) {
      return this._crypt(data, 1);
    }

    /**
     * Expand the S-box tables.
     *
     * @private
     */
  }, {
    key: "_precompute",
    value: function _precompute() {
      var encTable = this._tables[0];
      var decTable = this._tables[1];
      var sbox = encTable[4];
      var sboxInv = decTable[4];
      var d = [];
      var th = [];
      var xInv, x2, x4, x8;

      // Compute double and third tables
      for (var i = 0; i < 256; i++) {
        th[(d[i] = i << 1 ^ (i >> 7) * 283) ^ i] = i;
      }
      for (var x = xInv = 0; !sbox[x]; x ^= x2 || 1, xInv = th[xInv] || 1) {
        // Compute sbox
        var s = xInv ^ xInv << 1 ^ xInv << 2 ^ xInv << 3 ^ xInv << 4;
        s = s >> 8 ^ s & 255 ^ 99;
        sbox[x] = s;
        sboxInv[s] = x;

        // Compute MixColumns
        x8 = d[x4 = d[x2 = d[x]]];
        var tDec = x8 * 0x1010101 ^ x4 * 0x10001 ^ x2 * 0x101 ^ x * 0x1010100;
        var tEnc = d[s] * 0x101 ^ s * 0x1010100;
        for (var _i = 0; _i < 4; _i++) {
          encTable[_i][x] = tEnc = tEnc << 24 ^ tEnc >>> 8;
          decTable[_i][s] = tDec = tDec << 24 ^ tDec >>> 8;
        }
      }

      // Compactify.  Considerable speedup on Firefox.
      for (var _i2 = 0; _i2 < 5; _i2++) {
        encTable[_i2] = encTable[_i2].slice(0);
        decTable[_i2] = decTable[_i2].slice(0);
      }
    }

    /**
     * Encryption and decryption core.
     * @param {Array} input Four words to be encrypted or decrypted.
     * @param dir The direction, 0 for encrypt and 1 for decrypt.
     * @return {Array} The four encrypted or decrypted words.
     * @private
     */
  }, {
    key: "_crypt",
    value: function _crypt(input, dir) {
      if (input.length !== 4) {
        throw new Error("invalid aes block size");
      }
      var key = this._key[dir];
      var nInnerRounds = key.length / 4 - 2;
      var out = [0, 0, 0, 0];
      var table = this._tables[dir];

      // load up the tables
      var t0 = table[0];
      var t1 = table[1];
      var t2 = table[2];
      var t3 = table[3];
      var sbox = table[4];

      // state variables a,b,c,d are loaded with pre-whitened data
      var a = input[0] ^ key[0];
      var b = input[dir ? 3 : 1] ^ key[1];
      var c = input[2] ^ key[2];
      var d = input[dir ? 1 : 3] ^ key[3];
      var kIndex = 4;
      var a2, b2, c2;

      // Inner rounds.  Cribbed from OpenSSL.
      for (var i = 0; i < nInnerRounds; i++) {
        a2 = t0[a >>> 24] ^ t1[b >> 16 & 255] ^ t2[c >> 8 & 255] ^ t3[d & 255] ^ key[kIndex];
        b2 = t0[b >>> 24] ^ t1[c >> 16 & 255] ^ t2[d >> 8 & 255] ^ t3[a & 255] ^ key[kIndex + 1];
        c2 = t0[c >>> 24] ^ t1[d >> 16 & 255] ^ t2[a >> 8 & 255] ^ t3[b & 255] ^ key[kIndex + 2];
        d = t0[d >>> 24] ^ t1[a >> 16 & 255] ^ t2[b >> 8 & 255] ^ t3[c & 255] ^ key[kIndex + 3];
        kIndex += 4;
        a = a2;
        b = b2;
        c = c2;
      }

      // Last round.
      for (var _i3 = 0; _i3 < 4; _i3++) {
        out[dir ? 3 & -_i3 : _i3] = sbox[a >>> 24] << 24 ^ sbox[b >> 16 & 255] << 16 ^ sbox[c >> 8 & 255] << 8 ^ sbox[d & 255] ^ key[kIndex++];
        a2 = a;
        a = b;
        b = c;
        c = d;
        d = a2;
      }
      return out;
    }
  }]);
  return _class2;
}();

/**
 * Random values
 * @namespace
 */
var random = {
  /** 
   * Generate random words with pure js, cryptographically not as strong & safe as native implementation.
   * @param {TypedArray} typedArray The array to fill.
   * @return {TypedArray} The random values.
   */
  getRandomValues: function getRandomValues(typedArray) {
    var words = new Uint32Array(typedArray.buffer);
    var r = function r(m_w) {
      var m_z = 0x3ade68b1;
      var mask = 0xffffffff;
      return function () {
        m_z = 0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10) & mask;
        m_w = 0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10) & mask;
        var result = ((m_z << 0x10) + m_w & mask) / 0x100000000 + .5;
        return result * (Math.random() > .5 ? 1 : -1);
      };
    };
    for (var i = 0, rcache; i < typedArray.length; i += 4) {
      var _r = r((rcache || Math.random()) * 0x100000000);
      rcache = _r() * 0x3ade67b7;
      words[i / 4] = _r() * 0x100000000 | 0;
    }
    return typedArray;
  }
};

/** @fileOverview CTR mode implementation.
 *
 * Special thanks to Roy Nicholson for pointing out a bug in our
 * implementation.
 *
 * @author Emily Stark
 * @author Mike Hamburg
 * @author Dan Boneh
 */

/** Brian Gladman's CTR Mode.
* @constructor
* @param {Object} _prf The aes instance to generate key.
* @param {bitArray} _iv The iv for ctr mode, it must be 128 bits.
*/
exports.random = random;
var mode = {};

/**
 * Brian Gladman's CTR Mode.
 * @namespace
 */
exports.mode = mode;
mode.ctrGladman = /*#__PURE__*/function () {
  function _class3(prf, iv) {
    _classCallCheck(this, _class3);
    this._prf = prf;
    this._initIv = iv;
    this._iv = iv;
  }
  _createClass(_class3, [{
    key: "reset",
    value: function reset() {
      this._iv = this._initIv;
    }

    /** Input some data to calculate.
     * @param {bitArray} data the data to process, it must be intergral multiple of 128 bits unless it's the last.
     */
  }, {
    key: "update",
    value: function update(data) {
      return this.calculate(this._prf, data, this._iv);
    }
  }, {
    key: "incWord",
    value: function incWord(word) {
      if ((word >> 24 & 0xff) === 0xff) {
        //overflow
        var b1 = word >> 16 & 0xff;
        var b2 = word >> 8 & 0xff;
        var b3 = word & 0xff;
        if (b1 === 0xff) {
          // overflow b1   
          b1 = 0;
          if (b2 === 0xff) {
            b2 = 0;
            if (b3 === 0xff) {
              b3 = 0;
            } else {
              ++b3;
            }
          } else {
            ++b2;
          }
        } else {
          ++b1;
        }
        word = 0;
        word += b1 << 16;
        word += b2 << 8;
        word += b3;
      } else {
        word += 0x01 << 24;
      }
      return word;
    }
  }, {
    key: "incCounter",
    value: function incCounter(counter) {
      if ((counter[0] = this.incWord(counter[0])) === 0) {
        // encr_data in fileenc.c from  Dr Brian Gladman's counts only with DWORD j < 8
        counter[1] = this.incWord(counter[1]);
      }
    }
  }, {
    key: "calculate",
    value: function calculate(prf, data, iv) {
      var l;
      if (!(l = data.length)) {
        return [];
      }
      var bl = bitArray.bitLength(data);
      for (var i = 0; i < l; i += 4) {
        this.incCounter(iv);
        var e = prf.encrypt(iv);
        data[i] ^= e[0];
        data[i + 1] ^= e[1];
        data[i + 2] ^= e[2];
        data[i + 3] ^= e[3];
      }
      return bitArray.clamp(data, bl);
    }
  }]);
  return _class3;
}();
var misc = {
  importKey: function importKey(password) {
    return new misc.hmacSha1(codec.bytes.toBits(password));
  },
  pbkdf2: function pbkdf2(prf, salt, count, length) {
    count = count || 10000;
    if (length < 0 || count < 0) {
      throw new Error("invalid params to pbkdf2");
    }
    var byteLength = (length >> 5) + 1 << 2;
    var u, ui, i, j, k;
    var arrayBuffer = new ArrayBuffer(byteLength);
    var out = new DataView(arrayBuffer);
    var outLength = 0;
    var b = bitArray;
    salt = codec.bytes.toBits(salt);
    for (k = 1; outLength < (byteLength || 1); k++) {
      u = ui = prf.encrypt(b.concat(salt, [k]));
      for (i = 1; i < count; i++) {
        ui = prf.encrypt(ui);
        for (j = 0; j < ui.length; j++) {
          u[j] ^= ui[j];
        }
      }
      for (i = 0; outLength < (byteLength || 1) && i < u.length; i++) {
        out.setInt32(outLength, u[i]);
        outLength += 4;
      }
    }
    return arrayBuffer.slice(0, length / 8);
  }
};

/** @fileOverview HMAC implementation.
 *
 * @author Emily Stark
 * @author Mike Hamburg
 * @author Dan Boneh
 */

/** HMAC with the specified hash function.
 * @constructor
 * @param {bitArray} key the key for HMAC.
 * @param {Object} [Hash=hash.sha1] The hash function to use.
 */
exports.misc = misc;
misc.hmacSha1 = /*#__PURE__*/function () {
  function _class4(key) {
    _classCallCheck(this, _class4);
    var hmac = this;
    var Hash = hmac._hash = hash.sha1;
    var exKey = [[], []];
    hmac._baseHash = [new Hash(), new Hash()];
    var bs = hmac._baseHash[0].blockSize / 32;
    if (key.length > bs) {
      key = Hash.hash(key);
    }
    for (var i = 0; i < bs; i++) {
      exKey[0][i] = key[i] ^ 0x36363636;
      exKey[1][i] = key[i] ^ 0x5C5C5C5C;
    }
    hmac._baseHash[0].update(exKey[0]);
    hmac._baseHash[1].update(exKey[1]);
    hmac._resultHash = new Hash(hmac._baseHash[0]);
  }
  _createClass(_class4, [{
    key: "reset",
    value: function reset() {
      var hmac = this;
      hmac._resultHash = new hmac._hash(hmac._baseHash[0]);
      hmac._updated = false;
    }
  }, {
    key: "update",
    value: function update(data) {
      var hmac = this;
      hmac._updated = true;
      hmac._resultHash.update(data);
    }
  }, {
    key: "digest",
    value: function digest() {
      var hmac = this;
      var w = hmac._resultHash.finalize();
      var result = new hmac._hash(hmac._baseHash[1]).update(w).finalize();
      hmac.reset();
      return result;
    }
  }, {
    key: "encrypt",
    value: function encrypt(data) {
      if (!this._updated) {
        this.update(data);
        return this.digest(data);
      } else {
        throw new Error("encrypt on already updated hmac called!");
      }
    }
  }]);
  return _class4;
}();
},{}],"../node_modules/@zip.js/zip.js/lib/core/streams/common-crypto.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ERR_INVALID_SIGNATURE = exports.ERR_INVALID_PASSWORD = void 0;
exports.getRandomValues = getRandomValues;
var _sjcl = require("./codecs/sjcl.js");
/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/* global crypto */

var GET_RANDOM_VALUES_SUPPORTED = typeof crypto != "undefined" && typeof crypto.getRandomValues == "function";
var ERR_INVALID_PASSWORD = "Invalid password";
exports.ERR_INVALID_PASSWORD = ERR_INVALID_PASSWORD;
var ERR_INVALID_SIGNATURE = "Invalid signature";
exports.ERR_INVALID_SIGNATURE = ERR_INVALID_SIGNATURE;
function getRandomValues(array) {
  if (GET_RANDOM_VALUES_SUPPORTED) {
    return crypto.getRandomValues(array);
  } else {
    return _sjcl.random.getRandomValues(array);
  }
}
},{"./codecs/sjcl.js":"../node_modules/@zip.js/zip.js/lib/core/streams/codecs/sjcl.js"}],"../node_modules/@zip.js/zip.js/lib/core/streams/aes-crypto-stream.js":[function(require,module,exports) {
var define;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AESEncryptionStream = exports.AESDecryptionStream = void 0;
Object.defineProperty(exports, "ERR_INVALID_PASSWORD", {
  enumerable: true,
  get: function () {
    return _commonCrypto.ERR_INVALID_PASSWORD;
  }
});
var _encodeText = require("./../util/encode-text.js");
var _sjcl = require("./codecs/sjcl.js");
var _commonCrypto = require("./common-crypto.js");
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var BLOCK_LENGTH = 16;
var RAW_FORMAT = "raw";
var PBKDF2_ALGORITHM = {
  name: "PBKDF2"
};
var HASH_ALGORITHM = {
  name: "HMAC"
};
var HASH_FUNCTION = "SHA-1";
var BASE_KEY_ALGORITHM = Object.assign({
  hash: HASH_ALGORITHM
}, PBKDF2_ALGORITHM);
var DERIVED_BITS_ALGORITHM = Object.assign({
  iterations: 1000,
  hash: {
    name: HASH_FUNCTION
  }
}, PBKDF2_ALGORITHM);
var DERIVED_BITS_USAGE = ["deriveBits"];
var SALT_LENGTH = [8, 12, 16];
var KEY_LENGTH = [16, 24, 32];
var SIGNATURE_LENGTH = 10;
var COUNTER_DEFAULT_VALUE = [0, 0, 0, 0];
var UNDEFINED_TYPE = "undefined";
var FUNCTION_TYPE = "function";
// deno-lint-ignore valid-typeof
var CRYPTO_API_SUPPORTED = (typeof crypto === "undefined" ? "undefined" : _typeof(crypto)) != UNDEFINED_TYPE;
var subtle = CRYPTO_API_SUPPORTED && crypto.subtle;
var SUBTLE_API_SUPPORTED = CRYPTO_API_SUPPORTED && _typeof(subtle) != UNDEFINED_TYPE;
var codecBytes = _sjcl.codec.bytes;
var Aes = _sjcl.cipher.aes;
var CtrGladman = _sjcl.mode.ctrGladman;
var HmacSha1 = _sjcl.misc.hmacSha1;
var IMPORT_KEY_SUPPORTED = CRYPTO_API_SUPPORTED && SUBTLE_API_SUPPORTED && _typeof(subtle.importKey) == FUNCTION_TYPE;
var DERIVE_BITS_SUPPORTED = CRYPTO_API_SUPPORTED && SUBTLE_API_SUPPORTED && _typeof(subtle.deriveBits) == FUNCTION_TYPE;
var AESDecryptionStream = /*#__PURE__*/function (_TransformStream) {
  _inherits(AESDecryptionStream, _TransformStream);
  var _super = _createSuper(AESDecryptionStream);
  function AESDecryptionStream(_ref) {
    var password = _ref.password,
      signed = _ref.signed,
      encryptionStrength = _ref.encryptionStrength;
    _classCallCheck(this, AESDecryptionStream);
    return _super.call(this, {
      start: function start() {
        var _this = this;
        Object.assign(this, {
          ready: new Promise(function (resolve) {
            return _this.resolveReady = resolve;
          }),
          password: password,
          signed: signed,
          strength: encryptionStrength - 1,
          pending: new Uint8Array()
        });
      },
      transform: function transform(chunk, controller) {
        var _this2 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var aesCrypto, password, strength, resolveReady, ready, output;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                aesCrypto = _this2;
                password = aesCrypto.password, strength = aesCrypto.strength, resolveReady = aesCrypto.resolveReady, ready = aesCrypto.ready;
                if (!password) {
                  _context.next = 9;
                  break;
                }
                _context.next = 5;
                return createDecryptionKeys(aesCrypto, strength, password, subarray(chunk, 0, SALT_LENGTH[strength] + 2));
              case 5:
                chunk = subarray(chunk, SALT_LENGTH[strength] + 2);
                resolveReady();
                _context.next = 11;
                break;
              case 9:
                _context.next = 11;
                return ready;
              case 11:
                output = new Uint8Array(chunk.length - SIGNATURE_LENGTH - (chunk.length - SIGNATURE_LENGTH) % BLOCK_LENGTH);
                controller.enqueue(append(aesCrypto, chunk, output, 0, SIGNATURE_LENGTH, true));
              case 13:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }))();
      },
      flush: function flush(controller) {
        var _this3 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var signed, ctr, hmac, pending, ready, chunkToDecrypt, originalSignature, decryptedChunkArray, encryptedChunk, decryptedChunk, signature, indexSignature;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                signed = _this3.signed, ctr = _this3.ctr, hmac = _this3.hmac, pending = _this3.pending, ready = _this3.ready;
                _context2.next = 3;
                return ready;
              case 3:
                chunkToDecrypt = subarray(pending, 0, pending.length - SIGNATURE_LENGTH);
                originalSignature = subarray(pending, pending.length - SIGNATURE_LENGTH);
                decryptedChunkArray = new Uint8Array();
                if (chunkToDecrypt.length) {
                  encryptedChunk = toBits(codecBytes, chunkToDecrypt);
                  hmac.update(encryptedChunk);
                  decryptedChunk = ctr.update(encryptedChunk);
                  decryptedChunkArray = fromBits(codecBytes, decryptedChunk);
                }
                if (!signed) {
                  _context2.next = 16;
                  break;
                }
                signature = subarray(fromBits(codecBytes, hmac.digest()), 0, SIGNATURE_LENGTH);
                indexSignature = 0;
              case 10:
                if (!(indexSignature < SIGNATURE_LENGTH)) {
                  _context2.next = 16;
                  break;
                }
                if (!(signature[indexSignature] != originalSignature[indexSignature])) {
                  _context2.next = 13;
                  break;
                }
                throw new Error(_commonCrypto.ERR_INVALID_SIGNATURE);
              case 13:
                indexSignature++;
                _context2.next = 10;
                break;
              case 16:
                controller.enqueue(decryptedChunkArray);
              case 17:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }))();
      }
    });
  }
  return _createClass(AESDecryptionStream);
}(TransformStream);
exports.AESDecryptionStream = AESDecryptionStream;
var AESEncryptionStream = /*#__PURE__*/function (_TransformStream2) {
  _inherits(AESEncryptionStream, _TransformStream2);
  var _super2 = _createSuper(AESEncryptionStream);
  function AESEncryptionStream(_ref2) {
    var _this4;
    var password = _ref2.password,
      encryptionStrength = _ref2.encryptionStrength;
    _classCallCheck(this, AESEncryptionStream);
    // deno-lint-ignore prefer-const
    var stream;
    _this4 = _super2.call(this, {
      start: function start() {
        var _this5 = this;
        Object.assign(this, {
          ready: new Promise(function (resolve) {
            return _this5.resolveReady = resolve;
          }),
          password: password,
          strength: encryptionStrength - 1,
          pending: new Uint8Array()
        });
      },
      transform: function transform(chunk, controller) {
        var _this6 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
          var aesCrypto, password, strength, resolveReady, ready, preamble, output;
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                aesCrypto = _this6;
                password = aesCrypto.password, strength = aesCrypto.strength, resolveReady = aesCrypto.resolveReady, ready = aesCrypto.ready;
                preamble = new Uint8Array();
                if (!password) {
                  _context3.next = 10;
                  break;
                }
                _context3.next = 6;
                return createEncryptionKeys(aesCrypto, strength, password);
              case 6:
                preamble = _context3.sent;
                resolveReady();
                _context3.next = 12;
                break;
              case 10:
                _context3.next = 12;
                return ready;
              case 12:
                output = new Uint8Array(preamble.length + chunk.length - chunk.length % BLOCK_LENGTH);
                output.set(preamble, 0);
                controller.enqueue(append(aesCrypto, chunk, output, preamble.length, 0));
              case 15:
              case "end":
                return _context3.stop();
            }
          }, _callee3);
        }))();
      },
      flush: function flush(controller) {
        var _this7 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
          var ctr, hmac, pending, ready, encryptedChunkArray, encryptedChunk;
          return _regeneratorRuntime().wrap(function _callee4$(_context4) {
            while (1) switch (_context4.prev = _context4.next) {
              case 0:
                ctr = _this7.ctr, hmac = _this7.hmac, pending = _this7.pending, ready = _this7.ready;
                _context4.next = 3;
                return ready;
              case 3:
                encryptedChunkArray = new Uint8Array();
                if (pending.length) {
                  encryptedChunk = ctr.update(toBits(codecBytes, pending));
                  hmac.update(encryptedChunk);
                  encryptedChunkArray = fromBits(codecBytes, encryptedChunk);
                }
                stream.signature = fromBits(codecBytes, hmac.digest()).slice(0, SIGNATURE_LENGTH);
                controller.enqueue(concat(encryptedChunkArray, stream.signature));
              case 7:
              case "end":
                return _context4.stop();
            }
          }, _callee4);
        }))();
      }
    });
    stream = _assertThisInitialized(_this4);
    return _this4;
  }
  return _createClass(AESEncryptionStream);
}(TransformStream);
exports.AESEncryptionStream = AESEncryptionStream;
function append(aesCrypto, input, output, paddingStart, paddingEnd, verifySignature) {
  var ctr = aesCrypto.ctr,
    hmac = aesCrypto.hmac,
    pending = aesCrypto.pending;
  var inputLength = input.length - paddingEnd;
  if (pending.length) {
    input = concat(pending, input);
    output = expand(output, inputLength - inputLength % BLOCK_LENGTH);
  }
  var offset;
  for (offset = 0; offset <= inputLength - BLOCK_LENGTH; offset += BLOCK_LENGTH) {
    var inputChunk = toBits(codecBytes, subarray(input, offset, offset + BLOCK_LENGTH));
    if (verifySignature) {
      hmac.update(inputChunk);
    }
    var outputChunk = ctr.update(inputChunk);
    if (!verifySignature) {
      hmac.update(outputChunk);
    }
    output.set(fromBits(codecBytes, outputChunk), offset + paddingStart);
  }
  aesCrypto.pending = subarray(input, offset);
  return output;
}
function createDecryptionKeys(_x, _x2, _x3, _x4) {
  return _createDecryptionKeys.apply(this, arguments);
}
function _createDecryptionKeys() {
  _createDecryptionKeys = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(decrypt, strength, password, preamble) {
    var passwordVerificationKey, passwordVerification;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return createKeys(decrypt, strength, password, subarray(preamble, 0, SALT_LENGTH[strength]));
        case 2:
          passwordVerificationKey = _context5.sent;
          passwordVerification = subarray(preamble, SALT_LENGTH[strength]);
          if (!(passwordVerificationKey[0] != passwordVerification[0] || passwordVerificationKey[1] != passwordVerification[1])) {
            _context5.next = 6;
            break;
          }
          throw new Error(_commonCrypto.ERR_INVALID_PASSWORD);
        case 6:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return _createDecryptionKeys.apply(this, arguments);
}
function createEncryptionKeys(_x5, _x6, _x7) {
  return _createEncryptionKeys.apply(this, arguments);
}
function _createEncryptionKeys() {
  _createEncryptionKeys = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(encrypt, strength, password) {
    var salt, passwordVerification;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          salt = (0, _commonCrypto.getRandomValues)(new Uint8Array(SALT_LENGTH[strength]));
          _context6.next = 3;
          return createKeys(encrypt, strength, password, salt);
        case 3:
          passwordVerification = _context6.sent;
          return _context6.abrupt("return", concat(salt, passwordVerification));
        case 5:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return _createEncryptionKeys.apply(this, arguments);
}
function createKeys(_x8, _x9, _x10, _x11) {
  return _createKeys.apply(this, arguments);
}
function _createKeys() {
  _createKeys = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(aesCrypto, strength, password, salt) {
    var encodedPassword, baseKey, derivedBits, compositeKey, key, authentication, passwordVerification;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          aesCrypto.password = null;
          encodedPassword = (0, _encodeText.encodeText)(password);
          _context7.next = 4;
          return importKey(RAW_FORMAT, encodedPassword, BASE_KEY_ALGORITHM, false, DERIVED_BITS_USAGE);
        case 4:
          baseKey = _context7.sent;
          _context7.next = 7;
          return deriveBits(Object.assign({
            salt: salt
          }, DERIVED_BITS_ALGORITHM), baseKey, 8 * (KEY_LENGTH[strength] * 2 + 2));
        case 7:
          derivedBits = _context7.sent;
          compositeKey = new Uint8Array(derivedBits);
          key = toBits(codecBytes, subarray(compositeKey, 0, KEY_LENGTH[strength]));
          authentication = toBits(codecBytes, subarray(compositeKey, KEY_LENGTH[strength], KEY_LENGTH[strength] * 2));
          passwordVerification = subarray(compositeKey, KEY_LENGTH[strength] * 2);
          Object.assign(aesCrypto, {
            keys: {
              key: key,
              authentication: authentication,
              passwordVerification: passwordVerification
            },
            ctr: new CtrGladman(new Aes(key), Array.from(COUNTER_DEFAULT_VALUE)),
            hmac: new HmacSha1(authentication)
          });
          return _context7.abrupt("return", passwordVerification);
        case 14:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return _createKeys.apply(this, arguments);
}
function importKey(_x12, _x13, _x14, _x15, _x16) {
  return _importKey.apply(this, arguments);
}
function _importKey() {
  _importKey = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(format, password, algorithm, extractable, keyUsages) {
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          if (!IMPORT_KEY_SUPPORTED) {
            _context8.next = 13;
            break;
          }
          _context8.prev = 1;
          _context8.next = 4;
          return subtle.importKey(format, password, algorithm, extractable, keyUsages);
        case 4:
          return _context8.abrupt("return", _context8.sent);
        case 7:
          _context8.prev = 7;
          _context8.t0 = _context8["catch"](1);
          IMPORT_KEY_SUPPORTED = false;
          return _context8.abrupt("return", _sjcl.misc.importKey(password));
        case 11:
          _context8.next = 14;
          break;
        case 13:
          return _context8.abrupt("return", _sjcl.misc.importKey(password));
        case 14:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[1, 7]]);
  }));
  return _importKey.apply(this, arguments);
}
function deriveBits(_x17, _x18, _x19) {
  return _deriveBits.apply(this, arguments);
}
function _deriveBits() {
  _deriveBits = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(algorithm, baseKey, length) {
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          if (!DERIVE_BITS_SUPPORTED) {
            _context9.next = 13;
            break;
          }
          _context9.prev = 1;
          _context9.next = 4;
          return subtle.deriveBits(algorithm, baseKey, length);
        case 4:
          return _context9.abrupt("return", _context9.sent);
        case 7:
          _context9.prev = 7;
          _context9.t0 = _context9["catch"](1);
          DERIVE_BITS_SUPPORTED = false;
          return _context9.abrupt("return", _sjcl.misc.pbkdf2(baseKey, algorithm.salt, DERIVED_BITS_ALGORITHM.iterations, length));
        case 11:
          _context9.next = 14;
          break;
        case 13:
          return _context9.abrupt("return", _sjcl.misc.pbkdf2(baseKey, algorithm.salt, DERIVED_BITS_ALGORITHM.iterations, length));
        case 14:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[1, 7]]);
  }));
  return _deriveBits.apply(this, arguments);
}
function concat(leftArray, rightArray) {
  var array = leftArray;
  if (leftArray.length + rightArray.length) {
    array = new Uint8Array(leftArray.length + rightArray.length);
    array.set(leftArray, 0);
    array.set(rightArray, leftArray.length);
  }
  return array;
}
function expand(inputArray, length) {
  if (length && length > inputArray.length) {
    var array = inputArray;
    inputArray = new Uint8Array(length);
    inputArray.set(array, 0);
  }
  return inputArray;
}
function subarray(array, begin, end) {
  return array.subarray(begin, end);
}
function fromBits(codecBytes, chunk) {
  return codecBytes.fromBits(chunk);
}
function toBits(codecBytes, chunk) {
  return codecBytes.toBits(chunk);
}
},{"./../util/encode-text.js":"../node_modules/@zip.js/zip.js/lib/core/util/encode-text.js","./codecs/sjcl.js":"../node_modules/@zip.js/zip.js/lib/core/streams/codecs/sjcl.js","./common-crypto.js":"../node_modules/@zip.js/zip.js/lib/core/streams/common-crypto.js"}],"../node_modules/@zip.js/zip.js/lib/core/streams/zip-crypto-stream.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ERR_INVALID_PASSWORD", {
  enumerable: true,
  get: function () {
    return _commonCrypto.ERR_INVALID_PASSWORD;
  }
});
exports.ZipCryptoEncryptionStream = exports.ZipCryptoDecryptionStream = void 0;
var _crc = require("./codecs/crc32.js");
var _commonCrypto = require("./common-crypto.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var HEADER_LENGTH = 12;
var ZipCryptoDecryptionStream = /*#__PURE__*/function (_TransformStream) {
  _inherits(ZipCryptoDecryptionStream, _TransformStream);
  var _super = _createSuper(ZipCryptoDecryptionStream);
  function ZipCryptoDecryptionStream(_ref) {
    var password = _ref.password,
      passwordVerification = _ref.passwordVerification;
    _classCallCheck(this, ZipCryptoDecryptionStream);
    return _super.call(this, {
      start: function start() {
        Object.assign(this, {
          password: password,
          passwordVerification: passwordVerification
        });
        createKeys(this, password);
      },
      transform: function transform(chunk, controller) {
        var zipCrypto = this;
        if (zipCrypto.password) {
          var decryptedHeader = decrypt(zipCrypto, chunk.subarray(0, HEADER_LENGTH));
          zipCrypto.password = null;
          if (decryptedHeader[HEADER_LENGTH - 1] != zipCrypto.passwordVerification) {
            throw new Error(_commonCrypto.ERR_INVALID_PASSWORD);
          }
          chunk = chunk.subarray(HEADER_LENGTH);
        }
        controller.enqueue(decrypt(zipCrypto, chunk));
      }
    });
  }
  return _createClass(ZipCryptoDecryptionStream);
}(TransformStream);
exports.ZipCryptoDecryptionStream = ZipCryptoDecryptionStream;
var ZipCryptoEncryptionStream = /*#__PURE__*/function (_TransformStream2) {
  _inherits(ZipCryptoEncryptionStream, _TransformStream2);
  var _super2 = _createSuper(ZipCryptoEncryptionStream);
  function ZipCryptoEncryptionStream(_ref2) {
    var password = _ref2.password,
      passwordVerification = _ref2.passwordVerification;
    _classCallCheck(this, ZipCryptoEncryptionStream);
    return _super2.call(this, {
      start: function start() {
        Object.assign(this, {
          password: password,
          passwordVerification: passwordVerification
        });
        createKeys(this, password);
      },
      transform: function transform(chunk, controller) {
        var zipCrypto = this;
        var output;
        var offset;
        if (zipCrypto.password) {
          zipCrypto.password = null;
          var header = (0, _commonCrypto.getRandomValues)(new Uint8Array(HEADER_LENGTH));
          header[HEADER_LENGTH - 1] = zipCrypto.passwordVerification;
          output = new Uint8Array(chunk.length + header.length);
          output.set(encrypt(zipCrypto, header), 0);
          offset = HEADER_LENGTH;
        } else {
          output = new Uint8Array(chunk.length);
          offset = 0;
        }
        output.set(encrypt(zipCrypto, chunk), offset);
        controller.enqueue(output);
      }
    });
  }
  return _createClass(ZipCryptoEncryptionStream);
}(TransformStream);
exports.ZipCryptoEncryptionStream = ZipCryptoEncryptionStream;
function decrypt(target, input) {
  var output = new Uint8Array(input.length);
  for (var index = 0; index < input.length; index++) {
    output[index] = getByte(target) ^ input[index];
    updateKeys(target, output[index]);
  }
  return output;
}
function encrypt(target, input) {
  var output = new Uint8Array(input.length);
  for (var index = 0; index < input.length; index++) {
    output[index] = getByte(target) ^ input[index];
    updateKeys(target, input[index]);
  }
  return output;
}
function createKeys(target, password) {
  var keys = [0x12345678, 0x23456789, 0x34567890];
  Object.assign(target, {
    keys: keys,
    crcKey0: new _crc.Crc32(keys[0]),
    crcKey2: new _crc.Crc32(keys[2])
  });
  for (var index = 0; index < password.length; index++) {
    updateKeys(target, password.charCodeAt(index));
  }
}
function updateKeys(target, byte) {
  var _target$keys = _slicedToArray(target.keys, 3),
    key0 = _target$keys[0],
    key1 = _target$keys[1],
    key2 = _target$keys[2];
  target.crcKey0.append([byte]);
  key0 = ~target.crcKey0.get();
  key1 = getInt32(Math.imul(getInt32(key1 + getInt8(key0)), 134775813) + 1);
  target.crcKey2.append([key1 >>> 24]);
  key2 = ~target.crcKey2.get();
  target.keys = [key0, key1, key2];
}
function getByte(target) {
  var temp = target.keys[2] | 2;
  return getInt8(Math.imul(temp, temp ^ 1) >>> 8);
}
function getInt8(number) {
  return number & 0xFF;
}
function getInt32(number) {
  return number & 0xFFFFFFFF;
}
},{"./codecs/crc32.js":"../node_modules/@zip.js/zip.js/lib/core/streams/codecs/crc32.js","./common-crypto.js":"../node_modules/@zip.js/zip.js/lib/core/streams/common-crypto.js"}],"../node_modules/@zip.js/zip.js/lib/core/streams/zip-entry-stream.js":[function(require,module,exports) {
var define;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeflateStream = void 0;
Object.defineProperty(exports, "ERR_INVALID_PASSWORD", {
  enumerable: true,
  get: function () {
    return _commonCrypto.ERR_INVALID_PASSWORD;
  }
});
Object.defineProperty(exports, "ERR_INVALID_SIGNATURE", {
  enumerable: true,
  get: function () {
    return _commonCrypto.ERR_INVALID_SIGNATURE;
  }
});
exports.InflateStream = void 0;
var _crc32Stream = require("./crc32-stream.js");
var _aesCryptoStream = require("./aes-crypto-stream.js");
var _zipCryptoStream = require("./zip-crypto-stream.js");
var _commonCrypto = require("./common-crypto.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var COMPRESSION_FORMAT = "deflate-raw";
var DeflateStream = /*#__PURE__*/function (_TransformStream) {
  _inherits(DeflateStream, _TransformStream);
  var _super = _createSuper(DeflateStream);
  function DeflateStream(options, _ref) {
    var _thisSuper, _this;
    var chunkSize = _ref.chunkSize,
      CompressionStream = _ref.CompressionStream,
      CompressionStreamNative = _ref.CompressionStreamNative;
    _classCallCheck(this, DeflateStream);
    _this = _super.call(this, {});
    var compressed = options.compressed,
      encrypted = options.encrypted,
      useCompressionStream = options.useCompressionStream,
      zipCrypto = options.zipCrypto,
      signed = options.signed,
      level = options.level;
    var stream = _assertThisInitialized(_this);
    var crc32Stream, encryptionStream;
    var readable = filterEmptyChunks(_get((_thisSuper = _assertThisInitialized(_this), _getPrototypeOf(DeflateStream.prototype)), "readable", _thisSuper));
    if ((!encrypted || zipCrypto) && signed) {
      var _readable$tee = readable.tee();
      var _readable$tee2 = _slicedToArray(_readable$tee, 2);
      readable = _readable$tee2[0];
      crc32Stream = _readable$tee2[1];
      crc32Stream = pipeThrough(crc32Stream, new _crc32Stream.Crc32Stream());
    }
    if (compressed) {
      readable = pipeThroughCommpressionStream(readable, useCompressionStream, {
        level: level,
        chunkSize: chunkSize
      }, CompressionStreamNative, CompressionStream);
    }
    if (encrypted) {
      if (zipCrypto) {
        readable = pipeThrough(readable, new _zipCryptoStream.ZipCryptoEncryptionStream(options));
      } else {
        encryptionStream = new _aesCryptoStream.AESEncryptionStream(options);
        readable = pipeThrough(readable, encryptionStream);
      }
    }
    setReadable(stream, readable, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var signature;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (encrypted && !zipCrypto) {
              signature = encryptionStream.signature;
            }
            if (!((!encrypted || zipCrypto) && signed)) {
              _context.next = 6;
              break;
            }
            _context.next = 4;
            return crc32Stream.getReader().read();
          case 4:
            signature = _context.sent;
            signature = new DataView(signature.value.buffer).getUint32(0);
          case 6:
            stream.signature = signature;
          case 7:
          case "end":
            return _context.stop();
        }
      }, _callee);
    })));
    return _this;
  }
  return _createClass(DeflateStream);
}(TransformStream);
exports.DeflateStream = DeflateStream;
var InflateStream = /*#__PURE__*/function (_TransformStream2) {
  _inherits(InflateStream, _TransformStream2);
  var _super2 = _createSuper(InflateStream);
  function InflateStream(options, _ref3) {
    var _thisSuper2, _this2;
    var chunkSize = _ref3.chunkSize,
      DecompressionStream = _ref3.DecompressionStream,
      DecompressionStreamNative = _ref3.DecompressionStreamNative;
    _classCallCheck(this, InflateStream);
    _this2 = _super2.call(this, {});
    var zipCrypto = options.zipCrypto,
      encrypted = options.encrypted,
      signed = options.signed,
      signature = options.signature,
      compressed = options.compressed,
      useCompressionStream = options.useCompressionStream;
    var crc32Stream, decryptionStream;
    var readable = filterEmptyChunks(_get((_thisSuper2 = _assertThisInitialized(_this2), _getPrototypeOf(InflateStream.prototype)), "readable", _thisSuper2));
    if (encrypted) {
      if (zipCrypto) {
        readable = pipeThrough(readable, new _zipCryptoStream.ZipCryptoDecryptionStream(options));
      } else {
        decryptionStream = new _aesCryptoStream.AESDecryptionStream(options);
        readable = pipeThrough(readable, decryptionStream);
      }
    }
    if (compressed) {
      readable = pipeThroughCommpressionStream(readable, useCompressionStream, {
        chunkSize: chunkSize
      }, DecompressionStreamNative, DecompressionStream);
    }
    if ((!encrypted || zipCrypto) && signed) {
      var _readable$tee3 = readable.tee();
      var _readable$tee4 = _slicedToArray(_readable$tee3, 2);
      readable = _readable$tee4[0];
      crc32Stream = _readable$tee4[1];
      crc32Stream = pipeThrough(crc32Stream, new _crc32Stream.Crc32Stream());
    }
    setReadable(_assertThisInitialized(_this2), readable, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var streamSignature, dataViewSignature;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            if (!((!encrypted || zipCrypto) && signed)) {
              _context2.next = 7;
              break;
            }
            _context2.next = 3;
            return crc32Stream.getReader().read();
          case 3:
            streamSignature = _context2.sent;
            dataViewSignature = new DataView(streamSignature.value.buffer);
            if (!(signature != dataViewSignature.getUint32(0, false))) {
              _context2.next = 7;
              break;
            }
            throw new Error(_commonCrypto.ERR_INVALID_SIGNATURE);
          case 7:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    })));
    return _this2;
  }
  return _createClass(InflateStream);
}(TransformStream);
exports.InflateStream = InflateStream;
function filterEmptyChunks(readable) {
  return pipeThrough(readable, new TransformStream({
    transform: function transform(chunk, controller) {
      if (chunk && chunk.length) {
        controller.enqueue(chunk);
      }
    }
  }));
}
function setReadable(stream, readable, flush) {
  readable = pipeThrough(readable, new TransformStream({
    flush: flush
  }));
  Object.defineProperty(stream, "readable", {
    get: function get() {
      return readable;
    }
  });
}
function pipeThroughCommpressionStream(readable, useCompressionStream, options, CodecStreamNative, CodecStream) {
  try {
    var CompressionStream = useCompressionStream && CodecStreamNative ? CodecStreamNative : CodecStream;
    readable = pipeThrough(readable, new CompressionStream(COMPRESSION_FORMAT, options));
  } catch (error) {
    if (useCompressionStream) {
      readable = pipeThrough(readable, new CodecStream(COMPRESSION_FORMAT, options));
    } else {
      throw error;
    }
  }
  return readable;
}
function pipeThrough(readable, transformStream) {
  return readable.pipeThrough(transformStream);
}
},{"./crc32-stream.js":"../node_modules/@zip.js/zip.js/lib/core/streams/crc32-stream.js","./aes-crypto-stream.js":"../node_modules/@zip.js/zip.js/lib/core/streams/aes-crypto-stream.js","./zip-crypto-stream.js":"../node_modules/@zip.js/zip.js/lib/core/streams/zip-crypto-stream.js","./common-crypto.js":"../node_modules/@zip.js/zip.js/lib/core/streams/common-crypto.js"}],"../node_modules/@zip.js/zip.js/lib/core/streams/codec-stream.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CodecStream = exports.CODEC_INFLATE = exports.CODEC_DEFLATE = void 0;
Object.defineProperty(exports, "ERR_INVALID_PASSWORD", {
  enumerable: true,
  get: function () {
    return _zipEntryStream.ERR_INVALID_PASSWORD;
  }
});
Object.defineProperty(exports, "ERR_INVALID_SIGNATURE", {
  enumerable: true,
  get: function () {
    return _zipEntryStream.ERR_INVALID_SIGNATURE;
  }
});
exports.MESSAGE_START = exports.MESSAGE_PULL = exports.MESSAGE_EVENT_TYPE = exports.MESSAGE_DATA = exports.MESSAGE_CLOSE = exports.MESSAGE_ACK_DATA = void 0;
var _zipEntryStream = require("./zip-entry-stream.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var MESSAGE_EVENT_TYPE = "message";
exports.MESSAGE_EVENT_TYPE = MESSAGE_EVENT_TYPE;
var MESSAGE_START = "start";
exports.MESSAGE_START = MESSAGE_START;
var MESSAGE_PULL = "pull";
exports.MESSAGE_PULL = MESSAGE_PULL;
var MESSAGE_DATA = "data";
exports.MESSAGE_DATA = MESSAGE_DATA;
var MESSAGE_ACK_DATA = "ack";
exports.MESSAGE_ACK_DATA = MESSAGE_ACK_DATA;
var MESSAGE_CLOSE = "close";
exports.MESSAGE_CLOSE = MESSAGE_CLOSE;
var CODEC_DEFLATE = "deflate";
exports.CODEC_DEFLATE = CODEC_DEFLATE;
var CODEC_INFLATE = "inflate";
exports.CODEC_INFLATE = CODEC_INFLATE;
var CodecStream = /*#__PURE__*/function (_TransformStream) {
  _inherits(CodecStream, _TransformStream);
  var _super = _createSuper(CodecStream);
  function CodecStream(options, config) {
    var _thisSuper, _this;
    _classCallCheck(this, CodecStream);
    _this = _super.call(this, {});
    var codec = _assertThisInitialized(_this);
    var codecType = options.codecType;
    var Stream;
    if (codecType.startsWith(CODEC_DEFLATE)) {
      Stream = _zipEntryStream.DeflateStream;
    } else if (codecType.startsWith(CODEC_INFLATE)) {
      Stream = _zipEntryStream.InflateStream;
    }
    var size = 0;
    var stream = new Stream(options, config);
    var readable = _get((_thisSuper = _assertThisInitialized(_this), _getPrototypeOf(CodecStream.prototype)), "readable", _thisSuper);
    var transformStream = new TransformStream({
      transform: function transform(chunk, controller) {
        if (chunk && chunk.length) {
          size += chunk.length;
          controller.enqueue(chunk);
        }
      },
      flush: function flush() {
        var signature = stream.signature;
        Object.assign(codec, {
          signature: signature,
          size: size
        });
      }
    });
    Object.defineProperty(codec, "readable", {
      get: function get() {
        return readable.pipeThrough(stream).pipeThrough(transformStream);
      }
    });
    return _this;
  }
  return _createClass(CodecStream);
}(TransformStream);
exports.CodecStream = CodecStream;
},{"./zip-entry-stream.js":"../node_modules/@zip.js/zip.js/lib/core/streams/zip-entry-stream.js"}],"../node_modules/@zip.js/zip.js/lib/core/codec-worker.js":[function(require,module,exports) {
var define;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CodecWorker = void 0;
var _constants = require("./constants.js");
var _codecStream = require("./streams/codec-stream.js");
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
// deno-lint-ignore valid-typeof
var WEB_WORKERS_SUPPORTED = (typeof Worker === "undefined" ? "undefined" : _typeof(Worker)) != _constants.UNDEFINED_TYPE;
var CodecWorker = /*#__PURE__*/_createClass(function CodecWorker(workerData, _ref, _ref2, _onTaskFinished) {
  var readable = _ref.readable,
    writable = _ref.writable;
  var options = _ref2.options,
    config = _ref2.config,
    streamOptions = _ref2.streamOptions,
    useWebWorkers = _ref2.useWebWorkers,
    transferStreams = _ref2.transferStreams,
    scripts = _ref2.scripts;
  _classCallCheck(this, CodecWorker);
  var signal = streamOptions.signal;
  Object.assign(workerData, {
    busy: true,
    readable: readable.pipeThrough(new ProgressWatcherStream(readable, streamOptions, config), {
      signal: signal
    }),
    writable: writable,
    options: Object.assign({}, options),
    scripts: scripts,
    transferStreams: transferStreams,
    terminate: function terminate() {
      var worker = workerData.worker,
        busy = workerData.busy;
      if (worker && !busy) {
        worker.terminate();
        workerData.interface = null;
      }
    },
    onTaskFinished: function onTaskFinished() {
      workerData.busy = false;
      _onTaskFinished(workerData);
    }
  });
  return (useWebWorkers && WEB_WORKERS_SUPPORTED ? createWebWorkerInterface : createWorkerInterface)(workerData, config);
});
exports.CodecWorker = CodecWorker;
var ProgressWatcherStream = /*#__PURE__*/function (_TransformStream) {
  _inherits(ProgressWatcherStream, _TransformStream);
  var _super = _createSuper(ProgressWatcherStream);
  function ProgressWatcherStream(readableSource, _ref3, _ref4) {
    var onstart = _ref3.onstart,
      onprogress = _ref3.onprogress,
      size = _ref3.size,
      onend = _ref3.onend;
    var chunkSize = _ref4.chunkSize;
    _classCallCheck(this, ProgressWatcherStream);
    var chunkOffset = 0;
    return _super.call(this, {
      start: function start() {
        if (onstart) {
          callHandler(onstart, size);
        }
      },
      transform: function transform(chunk, controller) {
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                chunkOffset += chunk.length;
                if (!onprogress) {
                  _context.next = 4;
                  break;
                }
                _context.next = 4;
                return callHandler(onprogress, chunkOffset, size);
              case 4:
                controller.enqueue(chunk);
              case 5:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }))();
      },
      flush: function flush() {
        readableSource.size = chunkOffset;
        if (onend) {
          callHandler(onend, chunkOffset);
        }
      }
    }, {
      highWaterMark: 1,
      size: function size() {
        return chunkSize;
      }
    });
  }
  return _createClass(ProgressWatcherStream);
}(TransformStream);
function callHandler(_x) {
  return _callHandler.apply(this, arguments);
}
function _callHandler() {
  _callHandler = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(handler) {
    var _len,
      parameters,
      _key,
      _args3 = arguments;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          for (_len = _args3.length, parameters = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            parameters[_key - 1] = _args3[_key];
          }
          _context3.next = 4;
          return handler.apply(void 0, parameters);
        case 4:
          _context3.next = 8;
          break;
        case 6:
          _context3.prev = 6;
          _context3.t0 = _context3["catch"](0);
        case 8:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 6]]);
  }));
  return _callHandler.apply(this, arguments);
}
function createWorkerInterface(workerData, config) {
  return {
    run: function run() {
      return runWorker(workerData, config);
    }
  };
}
function createWebWorkerInterface(workerData, _ref5) {
  var baseURL = _ref5.baseURL,
    chunkSize = _ref5.chunkSize;
  if (!workerData.interface) {
    Object.assign(workerData, {
      worker: getWebWorker(workerData.scripts[0], baseURL, workerData),
      interface: {
        run: function run() {
          return runWebWorker(workerData, {
            chunkSize: chunkSize
          });
        }
      }
    });
  }
  return workerData.interface;
}
function runWorker(_x2, _x3) {
  return _runWorker.apply(this, arguments);
}
function _runWorker() {
  _runWorker = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(_ref6, config) {
    var options, readable, writable, onTaskFinished, codecStream, signature, size;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          options = _ref6.options, readable = _ref6.readable, writable = _ref6.writable, onTaskFinished = _ref6.onTaskFinished;
          codecStream = new _codecStream.CodecStream(options, config);
          _context4.prev = 2;
          _context4.next = 5;
          return readable.pipeThrough(codecStream).pipeTo(writable, {
            preventClose: true,
            preventAbort: true
          });
        case 5:
          signature = codecStream.signature, size = codecStream.size;
          return _context4.abrupt("return", {
            signature: signature,
            size: size
          });
        case 7:
          _context4.prev = 7;
          onTaskFinished();
          return _context4.finish(7);
        case 10:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[2,, 7, 10]]);
  }));
  return _runWorker.apply(this, arguments);
}
function runWebWorker(_x4, _x5) {
  return _runWebWorker.apply(this, arguments);
}
function _runWebWorker() {
  _runWebWorker = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(workerData, config) {
    var resolveResult, rejectResult, result, readable, options, scripts, _watchClosedStream, writable, closed, streamsTransferred, resultValue;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          result = new Promise(function (resolve, reject) {
            resolveResult = resolve;
            rejectResult = reject;
          });
          Object.assign(workerData, {
            reader: null,
            writer: null,
            resolveResult: resolveResult,
            rejectResult: rejectResult,
            result: result
          });
          readable = workerData.readable, options = workerData.options, scripts = workerData.scripts;
          _watchClosedStream = watchClosedStream(workerData.writable), writable = _watchClosedStream.writable, closed = _watchClosedStream.closed;
          streamsTransferred = sendMessage({
            type: _codecStream.MESSAGE_START,
            scripts: scripts.slice(1),
            options: options,
            config: config,
            readable: readable,
            writable: writable
          }, workerData);
          if (!streamsTransferred) {
            Object.assign(workerData, {
              reader: readable.getReader(),
              writer: writable.getWriter()
            });
          }
          _context5.next = 8;
          return result;
        case 8:
          resultValue = _context5.sent;
          _context5.prev = 9;
          _context5.next = 12;
          return writable.close();
        case 12:
          _context5.next = 16;
          break;
        case 14:
          _context5.prev = 14;
          _context5.t0 = _context5["catch"](9);
        case 16:
          _context5.next = 18;
          return closed;
        case 18:
          return _context5.abrupt("return", resultValue);
        case 19:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[9, 14]]);
  }));
  return _runWebWorker.apply(this, arguments);
}
function watchClosedStream(writableSource) {
  var writer = writableSource.getWriter();
  var resolveStreamClosed;
  var closed = new Promise(function (resolve) {
    return resolveStreamClosed = resolve;
  });
  var writable = new WritableStream({
    write: function write(chunk) {
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return writer.ready;
            case 2:
              _context2.next = 4;
              return writer.write(chunk);
            case 4:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }))();
    },
    close: function close() {
      writer.releaseLock();
      resolveStreamClosed();
    },
    abort: function abort(reason) {
      return writer.abort(reason);
    }
  });
  return {
    writable: writable,
    closed: closed
  };
}
var classicWorkersSupported = true;
var transferStreamsSupported = true;
function getWebWorker(url, baseURL, workerData) {
  var workerOptions = {
    type: "module"
  };
  var scriptUrl, worker;
  // deno-lint-ignore valid-typeof
  if (_typeof(url) == _constants.FUNCTION_TYPE) {
    url = url();
  }
  try {
    scriptUrl = new URL(url, baseURL);
  } catch (_error) {
    scriptUrl = url;
  }
  if (classicWorkersSupported) {
    try {
      worker = new Worker(scriptUrl);
    } catch (_error) {
      classicWorkersSupported = false;
      worker = new Worker(scriptUrl, workerOptions);
    }
  } else {
    worker = new Worker(scriptUrl, workerOptions);
  }
  worker.addEventListener(_codecStream.MESSAGE_EVENT_TYPE, function (event) {
    return onMessage(event, workerData);
  });
  return worker;
}
function sendMessage(message, _ref7) {
  var worker = _ref7.worker,
    writer = _ref7.writer,
    onTaskFinished = _ref7.onTaskFinished,
    transferStreams = _ref7.transferStreams;
  try {
    var value = message.value,
      readable = message.readable,
      writable = message.writable;
    var transferables = [];
    if (value) {
      var _value = value,
        buffer = _value.buffer,
        length = _value.length;
      if (length != buffer.byteLength) {
        value = new Uint8Array(value);
      }
      message.value = value.buffer;
      transferables.push(message.value);
    }
    if (transferStreams && transferStreamsSupported) {
      if (readable) {
        transferables.push(readable);
      }
      if (writable) {
        transferables.push(writable);
      }
    } else {
      message.readable = message.writable = null;
    }
    if (transferables.length) {
      try {
        worker.postMessage(message, transferables);
        return true;
      } catch (_error) {
        transferStreamsSupported = false;
        message.readable = message.writable = null;
        worker.postMessage(message);
      }
    } else {
      worker.postMessage(message);
    }
  } catch (error) {
    if (writer) {
      writer.releaseLock();
    }
    onTaskFinished();
    throw error;
  }
}
function onMessage(_x6, _x7) {
  return _onMessage.apply(this, arguments);
}
function _onMessage() {
  _onMessage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(_ref8, workerData) {
    var data, type, value, messageId, result, error, reader, writer, resolveResult, rejectResult, onTaskFinished, message, stack, code, name, responseError, _yield$reader$read, _value2, done, close;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          close = function _close(error, result) {
            if (error) {
              rejectResult(error);
            } else {
              resolveResult(result);
            }
            if (writer) {
              writer.releaseLock();
            }
            onTaskFinished();
          };
          data = _ref8.data;
          type = data.type, value = data.value, messageId = data.messageId, result = data.result, error = data.error;
          reader = workerData.reader, writer = workerData.writer, resolveResult = workerData.resolveResult, rejectResult = workerData.rejectResult, onTaskFinished = workerData.onTaskFinished;
          _context6.prev = 4;
          if (!error) {
            _context6.next = 12;
            break;
          }
          message = error.message, stack = error.stack, code = error.code, name = error.name;
          responseError = new Error(message);
          Object.assign(responseError, {
            stack: stack,
            code: code,
            name: name
          });
          close(responseError);
          _context6.next = 26;
          break;
        case 12:
          if (!(type == _codecStream.MESSAGE_PULL)) {
            _context6.next = 19;
            break;
          }
          _context6.next = 15;
          return reader.read();
        case 15:
          _yield$reader$read = _context6.sent;
          _value2 = _yield$reader$read.value;
          done = _yield$reader$read.done;
          sendMessage({
            type: _codecStream.MESSAGE_DATA,
            value: _value2,
            done: done,
            messageId: messageId
          }, workerData);
        case 19:
          if (!(type == _codecStream.MESSAGE_DATA)) {
            _context6.next = 25;
            break;
          }
          _context6.next = 22;
          return writer.ready;
        case 22:
          _context6.next = 24;
          return writer.write(new Uint8Array(value));
        case 24:
          sendMessage({
            type: _codecStream.MESSAGE_ACK_DATA,
            messageId: messageId
          }, workerData);
        case 25:
          if (type == _codecStream.MESSAGE_CLOSE) {
            close(null, result);
          }
        case 26:
          _context6.next = 31;
          break;
        case 28:
          _context6.prev = 28;
          _context6.t0 = _context6["catch"](4);
          close(_context6.t0);
        case 31:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[4, 28]]);
  }));
  return _onMessage.apply(this, arguments);
}
},{"./constants.js":"../node_modules/@zip.js/zip.js/lib/core/constants.js","./streams/codec-stream.js":"../node_modules/@zip.js/zip.js/lib/core/streams/codec-stream.js"}],"../node_modules/@zip.js/zip.js/lib/core/codec-pool.js":[function(require,module,exports) {
var define;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "CODEC_DEFLATE", {
  enumerable: true,
  get: function () {
    return _codecStream.CODEC_DEFLATE;
  }
});
Object.defineProperty(exports, "CODEC_INFLATE", {
  enumerable: true,
  get: function () {
    return _codecStream.CODEC_INFLATE;
  }
});
Object.defineProperty(exports, "ERR_INVALID_PASSWORD", {
  enumerable: true,
  get: function () {
    return _codecStream.ERR_INVALID_PASSWORD;
  }
});
Object.defineProperty(exports, "ERR_INVALID_SIGNATURE", {
  enumerable: true,
  get: function () {
    return _codecStream.ERR_INVALID_SIGNATURE;
  }
});
exports.runWorker = runWorker;
exports.terminateWorkers = terminateWorkers;
var _constants = require("./constants.js");
var _codecStream = require("./streams/codec-stream.js");
var _codecWorker = require("./codec-worker.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var pool = [];
var pendingRequests = [];
var indexWorker = 0;
function runWorker(_x, _x2) {
  return _runWorker.apply(this, arguments);
}
function _runWorker() {
  _runWorker = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(stream, workerOptions) {
    var options, config, transferStreams, useWebWorkers, useCompressionStream, codecType, compressed, signed, encrypted, workerScripts, maxWorkers, terminateWorkerTimeout, streamCopy, worker, workerData, _workerData, onTaskFinished;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          onTaskFinished = function _onTaskFinished(workerData) {
            if (pendingRequests.length) {
              var _pendingRequests$spli = pendingRequests.splice(0, 1),
                _pendingRequests$spli2 = _slicedToArray(_pendingRequests$spli, 1),
                _pendingRequests$spli3 = _pendingRequests$spli2[0],
                resolve = _pendingRequests$spli3.resolve,
                _stream = _pendingRequests$spli3.stream,
                _workerOptions = _pendingRequests$spli3.workerOptions;
              resolve(new _codecWorker.CodecWorker(workerData, _stream, _workerOptions, onTaskFinished));
            } else if (workerData.worker) {
              clearTerminateTimeout(workerData);
              if (Number.isFinite(terminateWorkerTimeout) && terminateWorkerTimeout >= 0) {
                workerData.terminateTimeout = setTimeout(function () {
                  pool = pool.filter(function (data) {
                    return data != workerData;
                  });
                  workerData.terminate();
                }, terminateWorkerTimeout);
              }
            } else {
              pool = pool.filter(function (data) {
                return data != workerData;
              });
            }
          };
          options = workerOptions.options, config = workerOptions.config;
          transferStreams = options.transferStreams, useWebWorkers = options.useWebWorkers, useCompressionStream = options.useCompressionStream, codecType = options.codecType, compressed = options.compressed, signed = options.signed, encrypted = options.encrypted;
          workerScripts = config.workerScripts, maxWorkers = config.maxWorkers, terminateWorkerTimeout = config.terminateWorkerTimeout;
          workerOptions.transferStreams = transferStreams || transferStreams === _constants.UNDEFINED_VALUE;
          streamCopy = !compressed && !signed && !encrypted && !workerOptions.transferStreams;
          workerOptions.useWebWorkers = !streamCopy && (useWebWorkers || useWebWorkers === _constants.UNDEFINED_VALUE && config.useWebWorkers);
          workerOptions.scripts = workerOptions.useWebWorkers && workerScripts ? workerScripts[codecType] : [];
          options.useCompressionStream = useCompressionStream || useCompressionStream === _constants.UNDEFINED_VALUE && config.useCompressionStream;
          workerData = pool.find(function (workerData) {
            return !workerData.busy;
          });
          if (!workerData) {
            _context.next = 15;
            break;
          }
          clearTerminateTimeout(workerData);
          worker = new _codecWorker.CodecWorker(workerData, stream, workerOptions, onTaskFinished);
          _context.next = 25;
          break;
        case 15:
          if (!(pool.length < maxWorkers)) {
            _context.next = 22;
            break;
          }
          _workerData = {
            indexWorker: indexWorker
          };
          indexWorker++;
          pool.push(_workerData);
          worker = new _codecWorker.CodecWorker(_workerData, stream, workerOptions, onTaskFinished);
          _context.next = 25;
          break;
        case 22:
          _context.next = 24;
          return new Promise(function (resolve) {
            return pendingRequests.push({
              resolve: resolve,
              stream: stream,
              workerOptions: workerOptions
            });
          });
        case 24:
          worker = _context.sent;
        case 25:
          return _context.abrupt("return", worker.run());
        case 26:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _runWorker.apply(this, arguments);
}
function clearTerminateTimeout(workerData) {
  var terminateTimeout = workerData.terminateTimeout;
  if (terminateTimeout) {
    clearTimeout(terminateTimeout);
    workerData.terminateTimeout = null;
  }
}
function terminateWorkers() {
  pool.forEach(function (workerData) {
    clearTerminateTimeout(workerData);
    workerData.terminate();
  });
}
},{"./constants.js":"../node_modules/@zip.js/zip.js/lib/core/constants.js","./streams/codec-stream.js":"../node_modules/@zip.js/zip.js/lib/core/streams/codec-stream.js","./codec-worker.js":"../node_modules/@zip.js/zip.js/lib/core/codec-worker.js"}],"../node_modules/@zip.js/zip.js/lib/z-worker-inline.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configureWebWorker = e;
function e(e) {
  var t = function t() {
    return URL.createObjectURL(new Blob(['const{Array:e,Object:t,Number:n,Math:r,Error:s,Uint8Array:i,Uint16Array:o,Uint32Array:c,Int32Array:f,Map:a,DataView:l,Promise:u,TextEncoder:w,crypto:h,postMessage:d,TransformStream:p,ReadableStream:y,WritableStream:m,CompressionStream:b,DecompressionStream:g}=self;class k{constructor(e){return class extends p{constructor(t,n){const r=new e(n);super({transform(e,t){t.enqueue(r.append(e))},flush(e){const t=r.flush();t&&e.enqueue(t)}})}}}}const v=[];for(let e=0;256>e;e++){let t=e;for(let e=0;8>e;e++)1&t?t=t>>>1^3988292384:t>>>=1;v[e]=t}class S{constructor(e){this.t=e||-1}append(e){let t=0|this.t;for(let n=0,r=0|e.length;r>n;n++)t=t>>>8^v[255&(t^e[n])];this.t=t}get(){return~this.t}}class z extends p{constructor(){const e=new S;super({transform(t){e.append(t)},flush(t){const n=new i(4);new l(n.buffer).setUint32(0,e.get()),t.enqueue(n)}})}}const C={concat(e,t){if(0===e.length||0===t.length)return e.concat(t);const n=e[e.length-1],r=C.i(n);return 32===r?e.concat(t):C.o(t,r,0|n,e.slice(0,e.length-1))},l(e){const t=e.length;if(0===t)return 0;const n=e[t-1];return 32*(t-1)+C.i(n)},u(e,t){if(32*e.length<t)return e;const n=(e=e.slice(0,r.ceil(t/32))).length;return t&=31,n>0&&t&&(e[n-1]=C.h(t,e[n-1]&2147483648>>t-1,1)),e},h:(e,t,n)=>32===e?t:(n?0|t:t<<32-e)+1099511627776*e,i:e=>r.round(e/1099511627776)||32,o(e,t,n,r){for(void 0===r&&(r=[]);t>=32;t-=32)r.push(n),n=0;if(0===t)return r.concat(e);for(let s=0;s<e.length;s++)r.push(n|e[s]>>>t),n=e[s]<<32-t;const s=e.length?e[e.length-1]:0,i=C.i(s);return r.push(C.h(t+i&31,t+i>32?n:r.pop(),1)),r}},I={p:{m(e){const t=C.l(e)/8,n=new i(t);let r;for(let s=0;t>s;s++)0==(3&s)&&(r=e[s/4]),n[s]=r>>>24,r<<=8;return n},g(e){const t=[];let n,r=0;for(n=0;n<e.length;n++)r=r<<8|e[n],3==(3&n)&&(t.push(r),r=0);return 3&n&&t.push(C.h(8*(3&n),r)),t}}},x={getRandomValues(e){const t=new c(e.buffer),n=e=>{let t=987654321;const n=4294967295;return()=>(t=36969*(65535&t)+(t>>16)&n,(((t<<16)+(e=18e3*(65535&e)+(e>>16)&n)&n)/4294967296+.5)*(r.random()>.5?1:-1))};for(let s,i=0;i<e.length;i+=4){const e=n(4294967296*(s||r.random()));s=987654071*e(),t[i/4]=4294967296*e()|0}return e}},_={importKey:e=>new _.k(I.p.g(e)),v(e,t,n,r){if(n=n||1e4,0>r||0>n)throw new s("invalid params to pbkdf2");const i=1+(r>>5)<<2;let o,c,f,a,u;const w=new ArrayBuffer(i),h=new l(w);let d=0;const p=C;for(t=I.p.g(t),u=1;(i||1)>d;u++){for(o=c=e.encrypt(p.concat(t,[u])),f=1;n>f;f++)for(c=e.encrypt(c),a=0;a<c.length;a++)o[a]^=c[a];for(f=0;(i||1)>d&&f<o.length;f++)h.setInt32(d,o[f]),d+=4}return w.slice(0,r/8)},k:class{constructor(t){const n=this,i=n.S=class{constructor(e){const t=this;t.blockSize=512,t.C=[1732584193,4023233417,2562383102,271733878,3285377520],t.I=[1518500249,1859775393,2400959708,3395469782],e?(t._=e._.slice(0),t.A=e.A.slice(0),t.D=e.D):t.reset()}reset(){const e=this;return e._=e.C.slice(0),e.A=[],e.D=0,e}update(e){const t=this;"string"==typeof e&&(e=I.V.g(e));const n=t.A=C.concat(t.A,e),r=t.D,i=t.D=r+C.l(e);if(i>9007199254740991)throw new s("Cannot hash more than 2^53 - 1 bits");const o=new c(n);let f=0;for(let e=t.blockSize+r-(t.blockSize+r&t.blockSize-1);i>=e;e+=t.blockSize)t.R(o.subarray(16*f,16*(f+1))),f+=1;return n.splice(0,16*f),t}B(){const e=this;let t=e.A;const n=e._;t=C.concat(t,[C.h(1,1)]);for(let e=t.length+2;15&e;e++)t.push(0);for(t.push(r.floor(e.D/4294967296)),t.push(0|e.D);t.length;)e.R(t.splice(0,16));return e.reset(),n}M(e,t,n,r){return e>19?e>39?e>59?e>79?void 0:t^n^r:t&n|t&r|n&r:t^n^r:t&n|~t&r}K(e,t){return t<<e|t>>>32-e}R(t){const n=this,s=n._,i=e(80);for(let e=0;16>e;e++)i[e]=t[e];let o=s[0],c=s[1],f=s[2],a=s[3],l=s[4];for(let e=0;79>=e;e++){16>e||(i[e]=n.K(1,i[e-3]^i[e-8]^i[e-14]^i[e-16]));const t=n.K(5,o)+n.M(e,c,f,a)+l+i[e]+n.I[r.floor(e/20)]|0;l=a,a=f,f=n.K(30,c),c=o,o=t}s[0]=s[0]+o|0,s[1]=s[1]+c|0,s[2]=s[2]+f|0,s[3]=s[3]+a|0,s[4]=s[4]+l|0}},o=[[],[]];n.P=[new i,new i];const f=n.P[0].blockSize/32;t.length>f&&(t=i.hash(t));for(let e=0;f>e;e++)o[0][e]=909522486^t[e],o[1][e]=1549556828^t[e];n.P[0].update(o[0]),n.P[1].update(o[1]),n.U=new i(n.P[0])}reset(){const e=this;e.U=new e.S(e.P[0]),e.N=!1}update(e){this.N=!0,this.U.update(e)}digest(){const e=this,t=e.U.B(),n=new e.S(e.P[1]).update(t).B();return e.reset(),n}encrypt(e){if(this.N)throw new s("encrypt on already updated hmac called!");return this.update(e),this.digest(e)}}},A=void 0!==h&&"function"==typeof h.getRandomValues;function D(e){return A?h.getRandomValues(e):x.getRandomValues(e)}const V={name:"PBKDF2"},R=t.assign({hash:{name:"HMAC"}},V),B=t.assign({iterations:1e3,hash:{name:"SHA-1"}},V),E=["deriveBits"],M=[8,12,16],K=[16,24,32],P=[0,0,0,0],U=void 0!==h,N=U&&h.subtle,T=U&&void 0!==N,W=I.p,H=class{constructor(e){const t=this;t.T=[[[],[],[],[],[]],[[],[],[],[],[]]],t.T[0][0][0]||t.W();const n=t.T[0][4],r=t.T[1],i=e.length;let o,c,f,a=1;if(4!==i&&6!==i&&8!==i)throw new s("invalid aes key size");for(t.I=[c=e.slice(0),f=[]],o=i;4*i+28>o;o++){let e=c[o-1];(o%i==0||8===i&&o%i==4)&&(e=n[e>>>24]<<24^n[e>>16&255]<<16^n[e>>8&255]<<8^n[255&e],o%i==0&&(e=e<<8^e>>>24^a<<24,a=a<<1^283*(a>>7))),c[o]=c[o-i]^e}for(let e=0;o;e++,o--){const t=c[3&e?o:o-4];f[e]=4>=o||4>e?t:r[0][n[t>>>24]]^r[1][n[t>>16&255]]^r[2][n[t>>8&255]]^r[3][n[255&t]]}}encrypt(e){return this.H(e,0)}decrypt(e){return this.H(e,1)}W(){const e=this.T[0],t=this.T[1],n=e[4],r=t[4],s=[],i=[];let o,c,f,a;for(let e=0;256>e;e++)i[(s[e]=e<<1^283*(e>>7))^e]=e;for(let l=o=0;!n[l];l^=c||1,o=i[o]||1){let i=o^o<<1^o<<2^o<<3^o<<4;i=i>>8^255&i^99,n[l]=i,r[i]=l,a=s[f=s[c=s[l]]];let u=16843009*a^65537*f^257*c^16843008*l,w=257*s[i]^16843008*i;for(let n=0;4>n;n++)e[n][l]=w=w<<24^w>>>8,t[n][i]=u=u<<24^u>>>8}for(let n=0;5>n;n++)e[n]=e[n].slice(0),t[n]=t[n].slice(0)}H(e,t){if(4!==e.length)throw new s("invalid aes block size");const n=this.I[t],r=n.length/4-2,i=[0,0,0,0],o=this.T[t],c=o[0],f=o[1],a=o[2],l=o[3],u=o[4];let w,h,d,p=e[0]^n[0],y=e[t?3:1]^n[1],m=e[2]^n[2],b=e[t?1:3]^n[3],g=4;for(let e=0;r>e;e++)w=c[p>>>24]^f[y>>16&255]^a[m>>8&255]^l[255&b]^n[g],h=c[y>>>24]^f[m>>16&255]^a[b>>8&255]^l[255&p]^n[g+1],d=c[m>>>24]^f[b>>16&255]^a[p>>8&255]^l[255&y]^n[g+2],b=c[b>>>24]^f[p>>16&255]^a[y>>8&255]^l[255&m]^n[g+3],g+=4,p=w,y=h,m=d;for(let e=0;4>e;e++)i[t?3&-e:e]=u[p>>>24]<<24^u[y>>16&255]<<16^u[m>>8&255]<<8^u[255&b]^n[g++],w=p,p=y,y=m,m=b,b=w;return i}},L=class{constructor(e,t){this.L=e,this.j=t,this.F=t}reset(){this.F=this.j}update(e){return this.O(this.L,e,this.F)}q(e){if(255==(e>>24&255)){let t=e>>16&255,n=e>>8&255,r=255&e;255===t?(t=0,255===n?(n=0,255===r?r=0:++r):++n):++t,e=0,e+=t<<16,e+=n<<8,e+=r}else e+=1<<24;return e}G(e){0===(e[0]=this.q(e[0]))&&(e[1]=this.q(e[1]))}O(e,t,n){let r;if(!(r=t.length))return[];const s=C.l(t);for(let s=0;r>s;s+=4){this.G(n);const r=e.encrypt(n);t[s]^=r[0],t[s+1]^=r[1],t[s+2]^=r[2],t[s+3]^=r[3]}return C.u(t,s)}},j=_.k;let F=U&&T&&"function"==typeof N.importKey,O=U&&T&&"function"==typeof N.deriveBits;class q extends p{constructor({password:e,signed:n,encryptionStrength:r}){super({start(){t.assign(this,{ready:new u((e=>this.J=e)),password:e,signed:n,X:r-1,pending:new i})},async transform(e,t){const n=this,{password:r,X:o,J:c,ready:f}=n;r?(await(async(e,t,n,r)=>{const i=await Q(e,t,n,Y(r,0,M[t])),o=Y(r,M[t]);if(i[0]!=o[0]||i[1]!=o[1])throw new s("Invalid password")})(n,o,r,Y(e,0,M[o]+2)),e=Y(e,M[o]+2),c()):await f;const a=new i(e.length-10-(e.length-10)%16);t.enqueue(J(n,e,a,0,10,!0))},async flush(e){const{signed:t,Y:n,Z:r,pending:o,ready:c}=this;await c;const f=Y(o,0,o.length-10),a=Y(o,o.length-10);let l=new i;if(f.length){const e=$(W,f);r.update(e);const t=n.update(e);l=Z(W,t)}if(t){const e=Y(Z(W,r.digest()),0,10);for(let t=0;10>t;t++)if(e[t]!=a[t])throw new s("Invalid signature")}e.enqueue(l)}})}}class G extends p{constructor({password:e,encryptionStrength:n}){let r;super({start(){t.assign(this,{ready:new u((e=>this.J=e)),password:e,X:n-1,pending:new i})},async transform(e,t){const n=this,{password:r,X:s,J:o,ready:c}=n;let f=new i;r?(f=await(async(e,t,n)=>{const r=D(new i(M[t]));return X(r,await Q(e,t,n,r))})(n,s,r),o()):await c;const a=new i(f.length+e.length-e.length%16);a.set(f,0),t.enqueue(J(n,e,a,f.length,0))},async flush(e){const{Y:t,Z:n,pending:s,ready:o}=this;await o;let c=new i;if(s.length){const e=t.update($(W,s));n.update(e),c=Z(W,e)}r.signature=Z(W,n.digest()).slice(0,10),e.enqueue(X(c,r.signature))}}),r=this}}function J(e,t,n,r,s,o){const{Y:c,Z:f,pending:a}=e,l=t.length-s;let u;for(a.length&&(t=X(a,t),n=((e,t)=>{if(t&&t>e.length){const n=e;(e=new i(t)).set(n,0)}return e})(n,l-l%16)),u=0;l-16>=u;u+=16){const e=$(W,Y(t,u,u+16));o&&f.update(e);const s=c.update(e);o||f.update(s),n.set(Z(W,s),u+r)}return e.pending=Y(t,u),n}async function Q(n,r,s,o){n.password=null;const c=(e=>{if(void 0===w){const t=new i((e=unescape(encodeURIComponent(e))).length);for(let n=0;n<t.length;n++)t[n]=e.charCodeAt(n);return t}return(new w).encode(e)})(s),f=await(async(e,t,n,r,s)=>{if(!F)return _.importKey(t);try{return await N.importKey("raw",t,n,!1,s)}catch(e){return F=!1,_.importKey(t)}})(0,c,R,0,E),a=await(async(e,t,n)=>{if(!O)return _.v(t,e.salt,B.iterations,n);try{return await N.deriveBits(e,t,n)}catch(r){return O=!1,_.v(t,e.salt,B.iterations,n)}})(t.assign({salt:o},B),f,8*(2*K[r]+2)),l=new i(a),u=$(W,Y(l,0,K[r])),h=$(W,Y(l,K[r],2*K[r])),d=Y(l,2*K[r]);return t.assign(n,{keys:{key:u,$:h,passwordVerification:d},Y:new L(new H(u),e.from(P)),Z:new j(h)}),d}function X(e,t){let n=e;return e.length+t.length&&(n=new i(e.length+t.length),n.set(e,0),n.set(t,e.length)),n}function Y(e,t,n){return e.subarray(t,n)}function Z(e,t){return e.m(t)}function $(e,t){return e.g(t)}class ee extends p{constructor({password:e,passwordVerification:n}){super({start(){t.assign(this,{password:e,passwordVerification:n}),se(this,e)},transform(e,t){const n=this;if(n.password){const t=ne(n,e.subarray(0,12));if(n.password=null,t[11]!=n.passwordVerification)throw new s("Invalid password");e=e.subarray(12)}t.enqueue(ne(n,e))}})}}class te extends p{constructor({password:e,passwordVerification:n}){super({start(){t.assign(this,{password:e,passwordVerification:n}),se(this,e)},transform(e,t){const n=this;let r,s;if(n.password){n.password=null;const t=D(new i(12));t[11]=n.passwordVerification,r=new i(e.length+t.length),r.set(re(n,t),0),s=12}else r=new i(e.length),s=0;r.set(re(n,e),s),t.enqueue(r)}})}}function ne(e,t){const n=new i(t.length);for(let r=0;r<t.length;r++)n[r]=oe(e)^t[r],ie(e,n[r]);return n}function re(e,t){const n=new i(t.length);for(let r=0;r<t.length;r++)n[r]=oe(e)^t[r],ie(e,t[r]);return n}function se(e,n){const r=[305419896,591751049,878082192];t.assign(e,{keys:r,ee:new S(r[0]),te:new S(r[2])});for(let t=0;t<n.length;t++)ie(e,n.charCodeAt(t))}function ie(e,t){let[n,s,i]=e.keys;e.ee.append([t]),n=~e.ee.get(),s=fe(r.imul(fe(s+ce(n)),134775813)+1),e.te.append([s>>>24]),i=~e.te.get(),e.keys=[n,s,i]}function oe(e){const t=2|e.keys[2];return ce(r.imul(t,1^t)>>>8)}function ce(e){return 255&e}function fe(e){return 4294967295&e}class ae extends p{constructor(e,{chunkSize:t,CompressionStream:n,CompressionStreamNative:r}){super({});const{compressed:s,encrypted:i,useCompressionStream:o,zipCrypto:c,signed:f,level:a}=e,u=this;let w,h,d=ue(super.readable);i&&!c||!f||([d,w]=d.tee(),w=de(w,new z)),s&&(d=he(d,o,{level:a,chunkSize:t},r,n)),i&&(c?d=de(d,new te(e)):(h=new G(e),d=de(d,h))),we(u,d,(async()=>{let e;i&&!c&&(e=h.signature),i&&!c||!f||(e=await w.getReader().read(),e=new l(e.value.buffer).getUint32(0)),u.signature=e}))}}class le extends p{constructor(e,{chunkSize:t,DecompressionStream:n,DecompressionStreamNative:r}){super({});const{zipCrypto:i,encrypted:o,signed:c,signature:f,compressed:a,useCompressionStream:u}=e;let w,h,d=ue(super.readable);o&&(i?d=de(d,new ee(e)):(h=new q(e),d=de(d,h))),a&&(d=he(d,u,{chunkSize:t},r,n)),o&&!i||!c||([d,w]=d.tee(),w=de(w,new z)),we(this,d,(async()=>{if((!o||i)&&c){const e=await w.getReader().read(),t=new l(e.value.buffer);if(f!=t.getUint32(0,!1))throw new s("Invalid signature")}}))}}function ue(e){return de(e,new p({transform(e,t){e&&e.length&&t.enqueue(e)}}))}function we(e,n,r){n=de(n,new p({flush:r})),t.defineProperty(e,"readable",{get:()=>n})}function he(e,t,n,r,s){try{e=de(e,new(t&&r?r:s)("deflate-raw",n))}catch(r){if(!t)throw r;e=de(e,new s("deflate-raw",n))}return e}function de(e,t){return e.pipeThrough(t)}class pe extends p{constructor(e,n){super({});const r=this,{codecType:s}=e;let i;s.startsWith("deflate")?i=ae:s.startsWith("inflate")&&(i=le);let o=0;const c=new i(e,n),f=super.readable,a=new p({transform(e,t){e&&e.length&&(o+=e.length,t.enqueue(e))},flush(){const{signature:e}=c;t.assign(r,{signature:e,size:o})}});t.defineProperty(r,"readable",{get:()=>f.pipeThrough(c).pipeThrough(a)})}}const ye=new a,me=new a;let be=0;async function ge(e){try{const{options:t,scripts:r,config:s}=e;r&&r.length&&importScripts.apply(void 0,r),self.initCodec&&self.initCodec(),s.CompressionStreamNative=self.CompressionStream,s.DecompressionStreamNative=self.DecompressionStream,self.Deflate&&(s.CompressionStream=new k(self.Deflate)),self.Inflate&&(s.DecompressionStream=new k(self.Inflate));const i={highWaterMark:1,size:()=>s.chunkSize},o=e.readable||new y({async pull(e){const t=new u((e=>ye.set(be,e)));ke({type:"pull",messageId:be}),be=(be+1)%n.MAX_SAFE_INTEGER;const{value:r,done:s}=await t;e.enqueue(r),s&&e.close()}},i),c=e.writable||new m({async write(e){let t;const r=new u((e=>t=e));me.set(be,t),ke({type:"data",value:e,messageId:be}),be=(be+1)%n.MAX_SAFE_INTEGER,await r}},i),f=new pe(t,s);await o.pipeThrough(f).pipeTo(c,{preventAbort:!0});try{await c.close()}catch(e){}const{signature:a,size:l}=f;ke({type:"close",result:{signature:a,size:l}})}catch(e){ve(e)}}function ke(e){let{value:t}=e;if(t)if(t.length)try{t=new i(t),e.value=t.buffer,d(e,[e.value])}catch(t){d(e)}else d(e);else d(e)}function ve(e){const{message:t,stack:n,code:r,name:s}=e;d({error:{message:t,stack:n,code:r,name:s}})}function Se(t){return ze(t.map((([t,n])=>new e(t).fill(n,0,t))))}function ze(t){return t.reduce(((t,n)=>t.concat(e.isArray(n)?ze(n):n)),[])}addEventListener("message",(({data:e})=>{const{type:t,messageId:n,value:r,done:s}=e;try{if("start"==t&&ge(e),"data"==t){const e=ye.get(n);ye.delete(n),e({value:new i(r),done:s})}if("ack"==t){const e=me.get(n);me.delete(n),e()}}catch(e){ve(e)}}));const Ce=[0,1,2,3].concat(...Se([[2,4],[2,5],[4,6],[4,7],[8,8],[8,9],[16,10],[16,11],[32,12],[32,13],[64,14],[64,15],[2,0],[1,16],[1,17],[2,18],[2,19],[4,20],[4,21],[8,22],[8,23],[16,24],[16,25],[32,26],[32,27],[64,28],[64,29]]));function Ie(){const e=this;function t(e,t){let n=0;do{n|=1&e,e>>>=1,n<<=1}while(--t>0);return n>>>1}e.ne=n=>{const s=e.re,i=e.ie.se,o=e.ie.oe;let c,f,a,l=-1;for(n.ce=0,n.fe=573,c=0;o>c;c++)0!==s[2*c]?(n.ae[++n.ce]=l=c,n.le[c]=0):s[2*c+1]=0;for(;2>n.ce;)a=n.ae[++n.ce]=2>l?++l:0,s[2*a]=1,n.le[a]=0,n.ue--,i&&(n.we-=i[2*a+1]);for(e.he=l,c=r.floor(n.ce/2);c>=1;c--)n.de(s,c);a=o;do{c=n.ae[1],n.ae[1]=n.ae[n.ce--],n.de(s,1),f=n.ae[1],n.ae[--n.fe]=c,n.ae[--n.fe]=f,s[2*a]=s[2*c]+s[2*f],n.le[a]=r.max(n.le[c],n.le[f])+1,s[2*c+1]=s[2*f+1]=a,n.ae[1]=a++,n.de(s,1)}while(n.ce>=2);n.ae[--n.fe]=n.ae[1],(t=>{const n=e.re,r=e.ie.se,s=e.ie.pe,i=e.ie.ye,o=e.ie.me;let c,f,a,l,u,w,h=0;for(l=0;15>=l;l++)t.be[l]=0;for(n[2*t.ae[t.fe]+1]=0,c=t.fe+1;573>c;c++)f=t.ae[c],l=n[2*n[2*f+1]+1]+1,l>o&&(l=o,h++),n[2*f+1]=l,f>e.he||(t.be[l]++,u=0,i>f||(u=s[f-i]),w=n[2*f],t.ue+=w*(l+u),r&&(t.we+=w*(r[2*f+1]+u)));if(0!==h){do{for(l=o-1;0===t.be[l];)l--;t.be[l]--,t.be[l+1]+=2,t.be[o]--,h-=2}while(h>0);for(l=o;0!==l;l--)for(f=t.be[l];0!==f;)a=t.ae[--c],a>e.he||(n[2*a+1]!=l&&(t.ue+=(l-n[2*a+1])*n[2*a],n[2*a+1]=l),f--)}})(n),((e,n,r)=>{const s=[];let i,o,c,f=0;for(i=1;15>=i;i++)s[i]=f=f+r[i-1]<<1;for(o=0;n>=o;o++)c=e[2*o+1],0!==c&&(e[2*o]=t(s[c]++,c))})(s,e.he,n.be)}}function xe(e,t,n,r,s){const i=this;i.se=e,i.pe=t,i.ye=n,i.oe=r,i.me=s}Ie.ge=[0,1,2,3,4,5,6,7].concat(...Se([[2,8],[2,9],[2,10],[2,11],[4,12],[4,13],[4,14],[4,15],[8,16],[8,17],[8,18],[8,19],[16,20],[16,21],[16,22],[16,23],[32,24],[32,25],[32,26],[31,27],[1,28]])),Ie.ke=[0,1,2,3,4,5,6,7,8,10,12,14,16,20,24,28,32,40,48,56,64,80,96,112,128,160,192,224,0],Ie.ve=[0,1,2,3,4,6,8,12,16,24,32,48,64,96,128,192,256,384,512,768,1024,1536,2048,3072,4096,6144,8192,12288,16384,24576],Ie.Se=e=>256>e?Ce[e]:Ce[256+(e>>>7)],Ie.ze=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],Ie.Ce=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],Ie.Ie=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],Ie.xe=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];const _e=Se([[144,8],[112,9],[24,7],[8,8]]);xe._e=ze([12,140,76,204,44,172,108,236,28,156,92,220,60,188,124,252,2,130,66,194,34,162,98,226,18,146,82,210,50,178,114,242,10,138,74,202,42,170,106,234,26,154,90,218,58,186,122,250,6,134,70,198,38,166,102,230,22,150,86,214,54,182,118,246,14,142,78,206,46,174,110,238,30,158,94,222,62,190,126,254,1,129,65,193,33,161,97,225,17,145,81,209,49,177,113,241,9,137,73,201,41,169,105,233,25,153,89,217,57,185,121,249,5,133,69,197,37,165,101,229,21,149,85,213,53,181,117,245,13,141,77,205,45,173,109,237,29,157,93,221,61,189,125,253,19,275,147,403,83,339,211,467,51,307,179,435,115,371,243,499,11,267,139,395,75,331,203,459,43,299,171,427,107,363,235,491,27,283,155,411,91,347,219,475,59,315,187,443,123,379,251,507,7,263,135,391,71,327,199,455,39,295,167,423,103,359,231,487,23,279,151,407,87,343,215,471,55,311,183,439,119,375,247,503,15,271,143,399,79,335,207,463,47,303,175,431,111,367,239,495,31,287,159,415,95,351,223,479,63,319,191,447,127,383,255,511,0,64,32,96,16,80,48,112,8,72,40,104,24,88,56,120,4,68,36,100,20,84,52,116,3,131,67,195,35,163,99,227].map(((e,t)=>[e,_e[t]])));const Ae=Se([[30,5]]);function De(e,t,n,r,s){const i=this;i.Ae=e,i.De=t,i.Ve=n,i.Re=r,i.Be=s}xe.Ee=ze([0,16,8,24,4,20,12,28,2,18,10,26,6,22,14,30,1,17,9,25,5,21,13,29,3,19,11,27,7,23].map(((e,t)=>[e,Ae[t]]))),xe.Me=new xe(xe._e,Ie.ze,257,286,15),xe.Ke=new xe(xe.Ee,Ie.Ce,0,30,15),xe.Pe=new xe(null,Ie.Ie,0,19,7);const Ve=[new De(0,0,0,0,0),new De(4,4,8,4,1),new De(4,5,16,8,1),new De(4,6,32,32,1),new De(4,4,16,16,2),new De(8,16,32,32,2),new De(8,16,128,128,2),new De(8,32,128,256,2),new De(32,128,258,1024,2),new De(32,258,258,4096,2)],Re=["need dictionary","stream end","","","stream error","data error","","buffer error","",""];function Be(e,t,n,r){const s=e[2*t],i=e[2*n];return i>s||s==i&&r[t]<=r[n]}function Ee(){const e=this;let t,n,s,c,f,a,l,u,w,h,d,p,y,m,b,g,k,v,S,z,C,I,x,_,A,D,V,R,B,E,M,K,P;const U=new Ie,N=new Ie,T=new Ie;let W,H,L,j,F,O;function q(){let t;for(t=0;286>t;t++)M[2*t]=0;for(t=0;30>t;t++)K[2*t]=0;for(t=0;19>t;t++)P[2*t]=0;M[512]=1,e.ue=e.we=0,H=L=0}function G(e,t){let n,r=-1,s=e[1],i=0,o=7,c=4;0===s&&(o=138,c=3),e[2*(t+1)+1]=65535;for(let f=0;t>=f;f++)n=s,s=e[2*(f+1)+1],++i<o&&n==s||(c>i?P[2*n]+=i:0!==n?(n!=r&&P[2*n]++,P[32]++):i>10?P[36]++:P[34]++,i=0,r=n,0===s?(o=138,c=3):n==s?(o=6,c=3):(o=7,c=4))}function J(t){e.Ue[e.pending++]=t}function Q(e){J(255&e),J(e>>>8&255)}function X(e,t){let n;const r=t;O>16-r?(n=e,F|=n<<O&65535,Q(F),F=n>>>16-O,O+=r-16):(F|=e<<O&65535,O+=r)}function Y(e,t){const n=2*e;X(65535&t[n],65535&t[n+1])}function Z(e,t){let n,r,s=-1,i=e[1],o=0,c=7,f=4;for(0===i&&(c=138,f=3),n=0;t>=n;n++)if(r=i,i=e[2*(n+1)+1],++o>=c||r!=i){if(f>o)do{Y(r,P)}while(0!=--o);else 0!==r?(r!=s&&(Y(r,P),o--),Y(16,P),X(o-3,2)):o>10?(Y(18,P),X(o-11,7)):(Y(17,P),X(o-3,3));o=0,s=r,0===i?(c=138,f=3):r==i?(c=6,f=3):(c=7,f=4)}}function $(){16==O?(Q(F),F=0,O=0):8>O||(J(255&F),F>>>=8,O-=8)}function ee(t,n){let s,i,o;if(e.Ne[H]=t,e.Te[H]=255&n,H++,0===t?M[2*n]++:(L++,t--,M[2*(Ie.ge[n]+256+1)]++,K[2*Ie.Se(t)]++),0==(8191&H)&&V>2){for(s=8*H,i=C-k,o=0;30>o;o++)s+=K[2*o]*(5+Ie.Ce[o]);if(s>>>=3,L<r.floor(H/2)&&s<r.floor(i/2))return!0}return H==W-1}function te(t,n){let r,s,i,o,c=0;if(0!==H)do{r=e.Ne[c],s=e.Te[c],c++,0===r?Y(s,t):(i=Ie.ge[s],Y(i+256+1,t),o=Ie.ze[i],0!==o&&(s-=Ie.ke[i],X(s,o)),r--,i=Ie.Se(r),Y(i,n),o=Ie.Ce[i],0!==o&&(r-=Ie.ve[i],X(r,o)))}while(H>c);Y(256,t),j=t[513]}function ne(){O>8?Q(F):O>0&&J(255&F),F=0,O=0}function re(t,n,r){X(0+(r?1:0),3),((t,n)=>{ne(),j=8,Q(n),Q(~n),e.Ue.set(u.subarray(t,t+n),e.pending),e.pending+=n})(t,n)}function se(n){((t,n,r)=>{let s,i,o=0;V>0?(U.ne(e),N.ne(e),o=(()=>{let t;for(G(M,U.he),G(K,N.he),T.ne(e),t=18;t>=3&&0===P[2*Ie.xe[t]+1];t--);return e.ue+=14+3*(t+1),t})(),s=e.ue+3+7>>>3,i=e.we+3+7>>>3,i>s||(s=i)):s=i=n+5,n+4>s||-1==t?i==s?(X(2+(r?1:0),3),te(xe._e,xe.Ee)):(X(4+(r?1:0),3),((e,t,n)=>{let r;for(X(e-257,5),X(t-1,5),X(n-4,4),r=0;n>r;r++)X(P[2*Ie.xe[r]+1],3);Z(M,e-1),Z(K,t-1)})(U.he+1,N.he+1,o+1),te(M,K)):re(t,n,r),q(),r&&ne()})(0>k?-1:k,C-k,n),k=C,t.We()}function ie(){let e,n,r,s;do{if(s=w-x-C,0===s&&0===C&&0===x)s=f;else if(-1==s)s--;else if(C>=f+f-262){u.set(u.subarray(f,f+f),0),I-=f,C-=f,k-=f,e=y,r=e;do{n=65535&d[--r],d[r]=f>n?0:n-f}while(0!=--e);e=f,r=e;do{n=65535&h[--r],h[r]=f>n?0:n-f}while(0!=--e);s+=f}if(0===t.He)return;e=t.Le(u,C+x,s),x+=e,3>x||(p=255&u[C],p=(p<<g^255&u[C+1])&b)}while(262>x&&0!==t.He)}function oe(e){let t,n,r=A,s=C,i=_;const o=C>f-262?C-(f-262):0;let c=E;const a=l,w=C+258;let d=u[s+i-1],p=u[s+i];B>_||(r>>=2),c>x&&(c=x);do{if(t=e,u[t+i]==p&&u[t+i-1]==d&&u[t]==u[s]&&u[++t]==u[s+1]){s+=2,t++;do{}while(u[++s]==u[++t]&&u[++s]==u[++t]&&u[++s]==u[++t]&&u[++s]==u[++t]&&u[++s]==u[++t]&&u[++s]==u[++t]&&u[++s]==u[++t]&&u[++s]==u[++t]&&w>s);if(n=258-(w-s),s=w-258,n>i){if(I=e,i=n,n>=c)break;d=u[s+i-1],p=u[s+i]}}}while((e=65535&h[e&a])>o&&0!=--r);return i>x?x:i}e.le=[],e.be=[],e.ae=[],M=[],K=[],P=[],e.de=(t,n)=>{const r=e.ae,s=r[n];let i=n<<1;for(;i<=e.ce&&(i<e.ce&&Be(t,r[i+1],r[i],e.le)&&i++,!Be(t,s,r[i],e.le));)r[n]=r[i],n=i,i<<=1;r[n]=s},e.je=(t,S,I,H,L,G)=>(H||(H=8),L||(L=8),G||(G=0),t.Fe=null,-1==S&&(S=6),1>L||L>9||8!=H||9>I||I>15||0>S||S>9||0>G||G>2?-2:(t.Oe=e,a=I,f=1<<a,l=f-1,m=L+7,y=1<<m,b=y-1,g=r.floor((m+3-1)/3),u=new i(2*f),h=[],d=[],W=1<<L+6,e.Ue=new i(4*W),s=4*W,e.Ne=new o(W),e.Te=new i(W),V=S,R=G,(t=>(t.qe=t.Ge=0,t.Fe=null,e.pending=0,e.Je=0,n=113,c=0,U.re=M,U.ie=xe.Me,N.re=K,N.ie=xe.Ke,T.re=P,T.ie=xe.Pe,F=0,O=0,j=8,q(),(()=>{w=2*f,d[y-1]=0;for(let e=0;y-1>e;e++)d[e]=0;D=Ve[V].De,B=Ve[V].Ae,E=Ve[V].Ve,A=Ve[V].Re,C=0,k=0,x=0,v=_=2,z=0,p=0})(),0))(t))),e.Qe=()=>42!=n&&113!=n&&666!=n?-2:(e.Te=null,e.Ne=null,e.Ue=null,d=null,h=null,u=null,e.Oe=null,113==n?-3:0),e.Xe=(e,t,n)=>{let r=0;return-1==t&&(t=6),0>t||t>9||0>n||n>2?-2:(Ve[V].Be!=Ve[t].Be&&0!==e.qe&&(r=e.Ye(1)),V!=t&&(V=t,D=Ve[V].De,B=Ve[V].Ae,E=Ve[V].Ve,A=Ve[V].Re),R=n,r)},e.Ze=(e,t,r)=>{let s,i=r,o=0;if(!t||42!=n)return-2;if(3>i)return 0;for(i>f-262&&(i=f-262,o=r-i),u.set(t.subarray(o,o+i),0),C=i,k=i,p=255&u[0],p=(p<<g^255&u[1])&b,s=0;i-3>=s;s++)p=(p<<g^255&u[s+2])&b,h[s&l]=d[p],d[p]=s;return 0},e.Ye=(r,i)=>{let o,w,m,A,B;if(i>4||0>i)return-2;if(!r.$e||!r.et&&0!==r.He||666==n&&4!=i)return r.Fe=Re[4],-2;if(0===r.tt)return r.Fe=Re[7],-5;var E;if(t=r,A=c,c=i,42==n&&(w=8+(a-8<<4)<<8,m=(V-1&255)>>1,m>3&&(m=3),w|=m<<6,0!==C&&(w|=32),w+=31-w%31,n=113,J((E=w)>>8&255),J(255&E)),0!==e.pending){if(t.We(),0===t.tt)return c=-1,0}else if(0===t.He&&A>=i&&4!=i)return t.Fe=Re[7],-5;if(666==n&&0!==t.He)return r.Fe=Re[7],-5;if(0!==t.He||0!==x||0!=i&&666!=n){switch(B=-1,Ve[V].Be){case 0:B=(e=>{let n,r=65535;for(r>s-5&&(r=s-5);;){if(1>=x){if(ie(),0===x&&0==e)return 0;if(0===x)break}if(C+=x,x=0,n=k+r,(0===C||C>=n)&&(x=C-n,C=n,se(!1),0===t.tt))return 0;if(C-k>=f-262&&(se(!1),0===t.tt))return 0}return se(4==e),0===t.tt?4==e?2:0:4==e?3:1})(i);break;case 1:B=(e=>{let n,r=0;for(;;){if(262>x){if(ie(),262>x&&0==e)return 0;if(0===x)break}if(3>x||(p=(p<<g^255&u[C+2])&b,r=65535&d[p],h[C&l]=d[p],d[p]=C),0===r||(C-r&65535)>f-262||2!=R&&(v=oe(r)),3>v)n=ee(0,255&u[C]),x--,C++;else if(n=ee(C-I,v-3),x-=v,v>D||3>x)C+=v,v=0,p=255&u[C],p=(p<<g^255&u[C+1])&b;else{v--;do{C++,p=(p<<g^255&u[C+2])&b,r=65535&d[p],h[C&l]=d[p],d[p]=C}while(0!=--v);C++}if(n&&(se(!1),0===t.tt))return 0}return se(4==e),0===t.tt?4==e?2:0:4==e?3:1})(i);break;case 2:B=(e=>{let n,r,s=0;for(;;){if(262>x){if(ie(),262>x&&0==e)return 0;if(0===x)break}if(3>x||(p=(p<<g^255&u[C+2])&b,s=65535&d[p],h[C&l]=d[p],d[p]=C),_=v,S=I,v=2,0!==s&&D>_&&f-262>=(C-s&65535)&&(2!=R&&(v=oe(s)),5>=v&&(1==R||3==v&&C-I>4096)&&(v=2)),3>_||v>_)if(0!==z){if(n=ee(0,255&u[C-1]),n&&se(!1),C++,x--,0===t.tt)return 0}else z=1,C++,x--;else{r=C+x-3,n=ee(C-1-S,_-3),x-=_-1,_-=2;do{++C>r||(p=(p<<g^255&u[C+2])&b,s=65535&d[p],h[C&l]=d[p],d[p]=C)}while(0!=--_);if(z=0,v=2,C++,n&&(se(!1),0===t.tt))return 0}}return 0!==z&&(n=ee(0,255&u[C-1]),z=0),se(4==e),0===t.tt?4==e?2:0:4==e?3:1})(i)}if(2!=B&&3!=B||(n=666),0==B||2==B)return 0===t.tt&&(c=-1),0;if(1==B){if(1==i)X(2,3),Y(256,xe._e),$(),9>1+j+10-O&&(X(2,3),Y(256,xe._e),$()),j=7;else if(re(0,0,!1),3==i)for(o=0;y>o;o++)d[o]=0;if(t.We(),0===t.tt)return c=-1,0}}return 4!=i?0:1}}function Me(){const e=this;e.nt=0,e.rt=0,e.He=0,e.qe=0,e.tt=0,e.Ge=0}function Ke(e){const t=new Me,n=(o=e&&e.chunkSize?e.chunkSize:65536)+5*(r.floor(o/16383)+1);var o;const c=new i(n);let f=e?e.level:-1;void 0===f&&(f=-1),t.je(f),t.$e=c,this.append=(e,r)=>{let o,f,a=0,l=0,u=0;const w=[];if(e.length){t.nt=0,t.et=e,t.He=e.length;do{if(t.rt=0,t.tt=n,o=t.Ye(0),0!=o)throw new s("deflating: "+t.Fe);t.rt&&(t.rt==n?w.push(new i(c)):w.push(c.slice(0,t.rt))),u+=t.rt,r&&t.nt>0&&t.nt!=a&&(r(t.nt),a=t.nt)}while(t.He>0||0===t.tt);return w.length>1?(f=new i(u),w.forEach((e=>{f.set(e,l),l+=e.length}))):f=w[0]||new i,f}},this.flush=()=>{let e,r,o=0,f=0;const a=[];do{if(t.rt=0,t.tt=n,e=t.Ye(4),1!=e&&0!=e)throw new s("deflating: "+t.Fe);n-t.tt>0&&a.push(c.slice(0,t.rt)),f+=t.rt}while(t.He>0||0===t.tt);return t.Qe(),r=new i(f),a.forEach((e=>{r.set(e,o),o+=e.length})),r}}Me.prototype={je(e,t){const n=this;return n.Oe=new Ee,t||(t=15),n.Oe.je(n,e,t)},Ye(e){const t=this;return t.Oe?t.Oe.Ye(t,e):-2},Qe(){const e=this;if(!e.Oe)return-2;const t=e.Oe.Qe();return e.Oe=null,t},Xe(e,t){const n=this;return n.Oe?n.Oe.Xe(n,e,t):-2},Ze(e,t){const n=this;return n.Oe?n.Oe.Ze(n,e,t):-2},Le(e,t,n){const r=this;let s=r.He;return s>n&&(s=n),0===s?0:(r.He-=s,e.set(r.et.subarray(r.nt,r.nt+s),t),r.nt+=s,r.qe+=s,s)},We(){const e=this;let t=e.Oe.pending;t>e.tt&&(t=e.tt),0!==t&&(e.$e.set(e.Oe.Ue.subarray(e.Oe.Je,e.Oe.Je+t),e.rt),e.rt+=t,e.Oe.Je+=t,e.Ge+=t,e.tt-=t,e.Oe.pending-=t,0===e.Oe.pending&&(e.Oe.Je=0))}};const Pe=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535],Ue=[96,7,256,0,8,80,0,8,16,84,8,115,82,7,31,0,8,112,0,8,48,0,9,192,80,7,10,0,8,96,0,8,32,0,9,160,0,8,0,0,8,128,0,8,64,0,9,224,80,7,6,0,8,88,0,8,24,0,9,144,83,7,59,0,8,120,0,8,56,0,9,208,81,7,17,0,8,104,0,8,40,0,9,176,0,8,8,0,8,136,0,8,72,0,9,240,80,7,4,0,8,84,0,8,20,85,8,227,83,7,43,0,8,116,0,8,52,0,9,200,81,7,13,0,8,100,0,8,36,0,9,168,0,8,4,0,8,132,0,8,68,0,9,232,80,7,8,0,8,92,0,8,28,0,9,152,84,7,83,0,8,124,0,8,60,0,9,216,82,7,23,0,8,108,0,8,44,0,9,184,0,8,12,0,8,140,0,8,76,0,9,248,80,7,3,0,8,82,0,8,18,85,8,163,83,7,35,0,8,114,0,8,50,0,9,196,81,7,11,0,8,98,0,8,34,0,9,164,0,8,2,0,8,130,0,8,66,0,9,228,80,7,7,0,8,90,0,8,26,0,9,148,84,7,67,0,8,122,0,8,58,0,9,212,82,7,19,0,8,106,0,8,42,0,9,180,0,8,10,0,8,138,0,8,74,0,9,244,80,7,5,0,8,86,0,8,22,192,8,0,83,7,51,0,8,118,0,8,54,0,9,204,81,7,15,0,8,102,0,8,38,0,9,172,0,8,6,0,8,134,0,8,70,0,9,236,80,7,9,0,8,94,0,8,30,0,9,156,84,7,99,0,8,126,0,8,62,0,9,220,82,7,27,0,8,110,0,8,46,0,9,188,0,8,14,0,8,142,0,8,78,0,9,252,96,7,256,0,8,81,0,8,17,85,8,131,82,7,31,0,8,113,0,8,49,0,9,194,80,7,10,0,8,97,0,8,33,0,9,162,0,8,1,0,8,129,0,8,65,0,9,226,80,7,6,0,8,89,0,8,25,0,9,146,83,7,59,0,8,121,0,8,57,0,9,210,81,7,17,0,8,105,0,8,41,0,9,178,0,8,9,0,8,137,0,8,73,0,9,242,80,7,4,0,8,85,0,8,21,80,8,258,83,7,43,0,8,117,0,8,53,0,9,202,81,7,13,0,8,101,0,8,37,0,9,170,0,8,5,0,8,133,0,8,69,0,9,234,80,7,8,0,8,93,0,8,29,0,9,154,84,7,83,0,8,125,0,8,61,0,9,218,82,7,23,0,8,109,0,8,45,0,9,186,0,8,13,0,8,141,0,8,77,0,9,250,80,7,3,0,8,83,0,8,19,85,8,195,83,7,35,0,8,115,0,8,51,0,9,198,81,7,11,0,8,99,0,8,35,0,9,166,0,8,3,0,8,131,0,8,67,0,9,230,80,7,7,0,8,91,0,8,27,0,9,150,84,7,67,0,8,123,0,8,59,0,9,214,82,7,19,0,8,107,0,8,43,0,9,182,0,8,11,0,8,139,0,8,75,0,9,246,80,7,5,0,8,87,0,8,23,192,8,0,83,7,51,0,8,119,0,8,55,0,9,206,81,7,15,0,8,103,0,8,39,0,9,174,0,8,7,0,8,135,0,8,71,0,9,238,80,7,9,0,8,95,0,8,31,0,9,158,84,7,99,0,8,127,0,8,63,0,9,222,82,7,27,0,8,111,0,8,47,0,9,190,0,8,15,0,8,143,0,8,79,0,9,254,96,7,256,0,8,80,0,8,16,84,8,115,82,7,31,0,8,112,0,8,48,0,9,193,80,7,10,0,8,96,0,8,32,0,9,161,0,8,0,0,8,128,0,8,64,0,9,225,80,7,6,0,8,88,0,8,24,0,9,145,83,7,59,0,8,120,0,8,56,0,9,209,81,7,17,0,8,104,0,8,40,0,9,177,0,8,8,0,8,136,0,8,72,0,9,241,80,7,4,0,8,84,0,8,20,85,8,227,83,7,43,0,8,116,0,8,52,0,9,201,81,7,13,0,8,100,0,8,36,0,9,169,0,8,4,0,8,132,0,8,68,0,9,233,80,7,8,0,8,92,0,8,28,0,9,153,84,7,83,0,8,124,0,8,60,0,9,217,82,7,23,0,8,108,0,8,44,0,9,185,0,8,12,0,8,140,0,8,76,0,9,249,80,7,3,0,8,82,0,8,18,85,8,163,83,7,35,0,8,114,0,8,50,0,9,197,81,7,11,0,8,98,0,8,34,0,9,165,0,8,2,0,8,130,0,8,66,0,9,229,80,7,7,0,8,90,0,8,26,0,9,149,84,7,67,0,8,122,0,8,58,0,9,213,82,7,19,0,8,106,0,8,42,0,9,181,0,8,10,0,8,138,0,8,74,0,9,245,80,7,5,0,8,86,0,8,22,192,8,0,83,7,51,0,8,118,0,8,54,0,9,205,81,7,15,0,8,102,0,8,38,0,9,173,0,8,6,0,8,134,0,8,70,0,9,237,80,7,9,0,8,94,0,8,30,0,9,157,84,7,99,0,8,126,0,8,62,0,9,221,82,7,27,0,8,110,0,8,46,0,9,189,0,8,14,0,8,142,0,8,78,0,9,253,96,7,256,0,8,81,0,8,17,85,8,131,82,7,31,0,8,113,0,8,49,0,9,195,80,7,10,0,8,97,0,8,33,0,9,163,0,8,1,0,8,129,0,8,65,0,9,227,80,7,6,0,8,89,0,8,25,0,9,147,83,7,59,0,8,121,0,8,57,0,9,211,81,7,17,0,8,105,0,8,41,0,9,179,0,8,9,0,8,137,0,8,73,0,9,243,80,7,4,0,8,85,0,8,21,80,8,258,83,7,43,0,8,117,0,8,53,0,9,203,81,7,13,0,8,101,0,8,37,0,9,171,0,8,5,0,8,133,0,8,69,0,9,235,80,7,8,0,8,93,0,8,29,0,9,155,84,7,83,0,8,125,0,8,61,0,9,219,82,7,23,0,8,109,0,8,45,0,9,187,0,8,13,0,8,141,0,8,77,0,9,251,80,7,3,0,8,83,0,8,19,85,8,195,83,7,35,0,8,115,0,8,51,0,9,199,81,7,11,0,8,99,0,8,35,0,9,167,0,8,3,0,8,131,0,8,67,0,9,231,80,7,7,0,8,91,0,8,27,0,9,151,84,7,67,0,8,123,0,8,59,0,9,215,82,7,19,0,8,107,0,8,43,0,9,183,0,8,11,0,8,139,0,8,75,0,9,247,80,7,5,0,8,87,0,8,23,192,8,0,83,7,51,0,8,119,0,8,55,0,9,207,81,7,15,0,8,103,0,8,39,0,9,175,0,8,7,0,8,135,0,8,71,0,9,239,80,7,9,0,8,95,0,8,31,0,9,159,84,7,99,0,8,127,0,8,63,0,9,223,82,7,27,0,8,111,0,8,47,0,9,191,0,8,15,0,8,143,0,8,79,0,9,255],Ne=[80,5,1,87,5,257,83,5,17,91,5,4097,81,5,5,89,5,1025,85,5,65,93,5,16385,80,5,3,88,5,513,84,5,33,92,5,8193,82,5,9,90,5,2049,86,5,129,192,5,24577,80,5,2,87,5,385,83,5,25,91,5,6145,81,5,7,89,5,1537,85,5,97,93,5,24577,80,5,4,88,5,769,84,5,49,92,5,12289,82,5,13,90,5,3073,86,5,193,192,5,24577],Te=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],We=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,112,112],He=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],Le=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];function je(){let e,t,n,r,s,i;function o(e,t,o,c,f,a,l,u,w,h,d){let p,y,m,b,g,k,v,S,z,C,I,x,_,A,D;C=0,g=o;do{n[e[t+C]]++,C++,g--}while(0!==g);if(n[0]==o)return l[0]=-1,u[0]=0,0;for(S=u[0],k=1;15>=k&&0===n[k];k++);for(v=k,k>S&&(S=k),g=15;0!==g&&0===n[g];g--);for(m=g,S>g&&(S=g),u[0]=S,A=1<<k;g>k;k++,A<<=1)if(0>(A-=n[k]))return-3;if(0>(A-=n[g]))return-3;for(n[g]+=A,i[1]=k=0,C=1,_=2;0!=--g;)i[_]=k+=n[C],_++,C++;g=0,C=0;do{0!==(k=e[t+C])&&(d[i[k]++]=g),C++}while(++g<o);for(o=i[m],i[0]=g=0,C=0,b=-1,x=-S,s[0]=0,I=0,D=0;m>=v;v++)for(p=n[v];0!=p--;){for(;v>x+S;){if(b++,x+=S,D=m-x,D=D>S?S:D,(y=1<<(k=v-x))>p+1&&(y-=p+1,_=v,D>k))for(;++k<D&&(y<<=1)>n[++_];)y-=n[_];if(D=1<<k,h[0]+D>1440)return-3;s[b]=I=h[0],h[0]+=D,0!==b?(i[b]=g,r[0]=k,r[1]=S,k=g>>>x-S,r[2]=I-s[b-1]-k,w.set(r,3*(s[b-1]+k))):l[0]=I}for(r[1]=v-x,o>C?d[C]<c?(r[0]=256>d[C]?0:96,r[2]=d[C++]):(r[0]=a[d[C]-c]+16+64,r[2]=f[d[C++]-c]):r[0]=192,y=1<<v-x,k=g>>>x;D>k;k+=y)w.set(r,3*(I+k));for(k=1<<v-1;0!=(g&k);k>>>=1)g^=k;for(g^=k,z=(1<<x)-1;(g&z)!=i[b];)b--,x-=S,z=(1<<x)-1}return 0!==A&&1!=m?-5:0}function c(o){let c;for(e||(e=[],t=[],n=new f(16),r=[],s=new f(15),i=new f(16)),t.length<o&&(t=[]),c=0;o>c;c++)t[c]=0;for(c=0;16>c;c++)n[c]=0;for(c=0;3>c;c++)r[c]=0;s.set(n.subarray(0,15),0),i.set(n.subarray(0,16),0)}this.st=(n,r,s,i,f)=>{let a;return c(19),e[0]=0,a=o(n,0,19,19,null,null,s,r,i,e,t),-3==a?f.Fe="oversubscribed dynamic bit lengths tree":-5!=a&&0!==r[0]||(f.Fe="incomplete dynamic bit lengths tree",a=-3),a},this.it=(n,r,s,i,f,a,l,u,w)=>{let h;return c(288),e[0]=0,h=o(s,0,n,257,Te,We,a,i,u,e,t),0!=h||0===i[0]?(-3==h?w.Fe="oversubscribed literal/length tree":-4!=h&&(w.Fe="incomplete literal/length tree",h=-3),h):(c(288),h=o(s,n,r,0,He,Le,l,f,u,e,t),0!=h||0===f[0]&&n>257?(-3==h?w.Fe="oversubscribed distance tree":-5==h?(w.Fe="incomplete distance tree",h=-3):-4!=h&&(w.Fe="empty distance tree with lengths",h=-3),h):0)}}function Fe(){const e=this;let t,n,r,s,i=0,o=0,c=0,f=0,a=0,l=0,u=0,w=0,h=0,d=0;function p(e,t,n,r,s,i,o,c){let f,a,l,u,w,h,d,p,y,m,b,g,k,v,S,z;d=c.nt,p=c.He,w=o.ot,h=o.ct,y=o.write,m=y<o.read?o.read-y-1:o.end-y,b=Pe[e],g=Pe[t];do{for(;20>h;)p--,w|=(255&c.ft(d++))<<h,h+=8;if(f=w&b,a=n,l=r,z=3*(l+f),0!==(u=a[z]))for(;;){if(w>>=a[z+1],h-=a[z+1],0!=(16&u)){for(u&=15,k=a[z+2]+(w&Pe[u]),w>>=u,h-=u;15>h;)p--,w|=(255&c.ft(d++))<<h,h+=8;for(f=w&g,a=s,l=i,z=3*(l+f),u=a[z];;){if(w>>=a[z+1],h-=a[z+1],0!=(16&u)){for(u&=15;u>h;)p--,w|=(255&c.ft(d++))<<h,h+=8;if(v=a[z+2]+(w&Pe[u]),w>>=u,h-=u,m-=k,v>y){S=y-v;do{S+=o.end}while(0>S);if(u=o.end-S,k>u){if(k-=u,y-S>0&&u>y-S)do{o.lt[y++]=o.lt[S++]}while(0!=--u);else o.lt.set(o.lt.subarray(S,S+u),y),y+=u,S+=u,u=0;S=0}}else S=y-v,y-S>0&&2>y-S?(o.lt[y++]=o.lt[S++],o.lt[y++]=o.lt[S++],k-=2):(o.lt.set(o.lt.subarray(S,S+2),y),y+=2,S+=2,k-=2);if(y-S>0&&k>y-S)do{o.lt[y++]=o.lt[S++]}while(0!=--k);else o.lt.set(o.lt.subarray(S,S+k),y),y+=k,S+=k,k=0;break}if(0!=(64&u))return c.Fe="invalid distance code",k=c.He-p,k=k>h>>3?h>>3:k,p+=k,d-=k,h-=k<<3,o.ot=w,o.ct=h,c.He=p,c.qe+=d-c.nt,c.nt=d,o.write=y,-3;f+=a[z+2],f+=w&Pe[u],z=3*(l+f),u=a[z]}break}if(0!=(64&u))return 0!=(32&u)?(k=c.He-p,k=k>h>>3?h>>3:k,p+=k,d-=k,h-=k<<3,o.ot=w,o.ct=h,c.He=p,c.qe+=d-c.nt,c.nt=d,o.write=y,1):(c.Fe="invalid literal/length code",k=c.He-p,k=k>h>>3?h>>3:k,p+=k,d-=k,h-=k<<3,o.ot=w,o.ct=h,c.He=p,c.qe+=d-c.nt,c.nt=d,o.write=y,-3);if(f+=a[z+2],f+=w&Pe[u],z=3*(l+f),0===(u=a[z])){w>>=a[z+1],h-=a[z+1],o.lt[y++]=a[z+2],m--;break}}else w>>=a[z+1],h-=a[z+1],o.lt[y++]=a[z+2],m--}while(m>=258&&p>=10);return k=c.He-p,k=k>h>>3?h>>3:k,p+=k,d-=k,h-=k<<3,o.ot=w,o.ct=h,c.He=p,c.qe+=d-c.nt,c.nt=d,o.write=y,0}e.init=(e,i,o,c,f,a)=>{t=0,u=e,w=i,r=o,h=c,s=f,d=a,n=null},e.ut=(e,y,m)=>{let b,g,k,v,S,z,C,I=0,x=0,_=0;for(_=y.nt,v=y.He,I=e.ot,x=e.ct,S=e.write,z=S<e.read?e.read-S-1:e.end-S;;)switch(t){case 0:if(z>=258&&v>=10&&(e.ot=I,e.ct=x,y.He=v,y.qe+=_-y.nt,y.nt=_,e.write=S,m=p(u,w,r,h,s,d,e,y),_=y.nt,v=y.He,I=e.ot,x=e.ct,S=e.write,z=S<e.read?e.read-S-1:e.end-S,0!=m)){t=1==m?7:9;break}c=u,n=r,o=h,t=1;case 1:for(b=c;b>x;){if(0===v)return e.ot=I,e.ct=x,y.He=v,y.qe+=_-y.nt,y.nt=_,e.write=S,e.wt(y,m);m=0,v--,I|=(255&y.ft(_++))<<x,x+=8}if(g=3*(o+(I&Pe[b])),I>>>=n[g+1],x-=n[g+1],k=n[g],0===k){f=n[g+2],t=6;break}if(0!=(16&k)){a=15&k,i=n[g+2],t=2;break}if(0==(64&k)){c=k,o=g/3+n[g+2];break}if(0!=(32&k)){t=7;break}return t=9,y.Fe="invalid literal/length code",m=-3,e.ot=I,e.ct=x,y.He=v,y.qe+=_-y.nt,y.nt=_,e.write=S,e.wt(y,m);case 2:for(b=a;b>x;){if(0===v)return e.ot=I,e.ct=x,y.He=v,y.qe+=_-y.nt,y.nt=_,e.write=S,e.wt(y,m);m=0,v--,I|=(255&y.ft(_++))<<x,x+=8}i+=I&Pe[b],I>>=b,x-=b,c=w,n=s,o=d,t=3;case 3:for(b=c;b>x;){if(0===v)return e.ot=I,e.ct=x,y.He=v,y.qe+=_-y.nt,y.nt=_,e.write=S,e.wt(y,m);m=0,v--,I|=(255&y.ft(_++))<<x,x+=8}if(g=3*(o+(I&Pe[b])),I>>=n[g+1],x-=n[g+1],k=n[g],0!=(16&k)){a=15&k,l=n[g+2],t=4;break}if(0==(64&k)){c=k,o=g/3+n[g+2];break}return t=9,y.Fe="invalid distance code",m=-3,e.ot=I,e.ct=x,y.He=v,y.qe+=_-y.nt,y.nt=_,e.write=S,e.wt(y,m);case 4:for(b=a;b>x;){if(0===v)return e.ot=I,e.ct=x,y.He=v,y.qe+=_-y.nt,y.nt=_,e.write=S,e.wt(y,m);m=0,v--,I|=(255&y.ft(_++))<<x,x+=8}l+=I&Pe[b],I>>=b,x-=b,t=5;case 5:for(C=S-l;0>C;)C+=e.end;for(;0!==i;){if(0===z&&(S==e.end&&0!==e.read&&(S=0,z=S<e.read?e.read-S-1:e.end-S),0===z&&(e.write=S,m=e.wt(y,m),S=e.write,z=S<e.read?e.read-S-1:e.end-S,S==e.end&&0!==e.read&&(S=0,z=S<e.read?e.read-S-1:e.end-S),0===z)))return e.ot=I,e.ct=x,y.He=v,y.qe+=_-y.nt,y.nt=_,e.write=S,e.wt(y,m);e.lt[S++]=e.lt[C++],z--,C==e.end&&(C=0),i--}t=0;break;case 6:if(0===z&&(S==e.end&&0!==e.read&&(S=0,z=S<e.read?e.read-S-1:e.end-S),0===z&&(e.write=S,m=e.wt(y,m),S=e.write,z=S<e.read?e.read-S-1:e.end-S,S==e.end&&0!==e.read&&(S=0,z=S<e.read?e.read-S-1:e.end-S),0===z)))return e.ot=I,e.ct=x,y.He=v,y.qe+=_-y.nt,y.nt=_,e.write=S,e.wt(y,m);m=0,e.lt[S++]=f,z--,t=0;break;case 7:if(x>7&&(x-=8,v++,_--),e.write=S,m=e.wt(y,m),S=e.write,z=S<e.read?e.read-S-1:e.end-S,e.read!=e.write)return e.ot=I,e.ct=x,y.He=v,y.qe+=_-y.nt,y.nt=_,e.write=S,e.wt(y,m);t=8;case 8:return m=1,e.ot=I,e.ct=x,y.He=v,y.qe+=_-y.nt,y.nt=_,e.write=S,e.wt(y,m);case 9:return m=-3,e.ot=I,e.ct=x,y.He=v,y.qe+=_-y.nt,y.nt=_,e.write=S,e.wt(y,m);default:return m=-2,e.ot=I,e.ct=x,y.He=v,y.qe+=_-y.nt,y.nt=_,e.write=S,e.wt(y,m)}},e.ht=()=>{}}je.dt=(e,t,n,r)=>(e[0]=9,t[0]=5,n[0]=Ue,r[0]=Ne,0);const Oe=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];function qe(e,t){const n=this;let r,s=0,o=0,c=0,a=0;const l=[0],u=[0],w=new Fe;let h=0,d=new f(4320);const p=new je;n.ct=0,n.ot=0,n.lt=new i(t),n.end=t,n.read=0,n.write=0,n.reset=(e,t)=>{t&&(t[0]=0),6==s&&w.ht(e),s=0,n.ct=0,n.ot=0,n.read=n.write=0},n.reset(e,null),n.wt=(e,t)=>{let r,s,i;return s=e.rt,i=n.read,r=(i>n.write?n.end:n.write)-i,r>e.tt&&(r=e.tt),0!==r&&-5==t&&(t=0),e.tt-=r,e.Ge+=r,e.$e.set(n.lt.subarray(i,i+r),s),s+=r,i+=r,i==n.end&&(i=0,n.write==n.end&&(n.write=0),r=n.write-i,r>e.tt&&(r=e.tt),0!==r&&-5==t&&(t=0),e.tt-=r,e.Ge+=r,e.$e.set(n.lt.subarray(i,i+r),s),s+=r,i+=r),e.rt=s,n.read=i,t},n.ut=(e,t)=>{let i,f,y,m,b,g,k,v;for(m=e.nt,b=e.He,f=n.ot,y=n.ct,g=n.write,k=g<n.read?n.read-g-1:n.end-g;;){let S,z,C,I,x,_,A,D;switch(s){case 0:for(;3>y;){if(0===b)return n.ot=f,n.ct=y,e.He=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);t=0,b--,f|=(255&e.ft(m++))<<y,y+=8}switch(i=7&f,h=1&i,i>>>1){case 0:f>>>=3,y-=3,i=7&y,f>>>=i,y-=i,s=1;break;case 1:S=[],z=[],C=[[]],I=[[]],je.dt(S,z,C,I),w.init(S[0],z[0],C[0],0,I[0],0),f>>>=3,y-=3,s=6;break;case 2:f>>>=3,y-=3,s=3;break;case 3:return f>>>=3,y-=3,s=9,e.Fe="invalid block type",t=-3,n.ot=f,n.ct=y,e.He=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t)}break;case 1:for(;32>y;){if(0===b)return n.ot=f,n.ct=y,e.He=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);t=0,b--,f|=(255&e.ft(m++))<<y,y+=8}if((~f>>>16&65535)!=(65535&f))return s=9,e.Fe="invalid stored block lengths",t=-3,n.ot=f,n.ct=y,e.He=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);o=65535&f,f=y=0,s=0!==o?2:0!==h?7:0;break;case 2:if(0===b)return n.ot=f,n.ct=y,e.He=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);if(0===k&&(g==n.end&&0!==n.read&&(g=0,k=g<n.read?n.read-g-1:n.end-g),0===k&&(n.write=g,t=n.wt(e,t),g=n.write,k=g<n.read?n.read-g-1:n.end-g,g==n.end&&0!==n.read&&(g=0,k=g<n.read?n.read-g-1:n.end-g),0===k)))return n.ot=f,n.ct=y,e.He=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);if(t=0,i=o,i>b&&(i=b),i>k&&(i=k),n.lt.set(e.Le(m,i),g),m+=i,b-=i,g+=i,k-=i,0!=(o-=i))break;s=0!==h?7:0;break;case 3:for(;14>y;){if(0===b)return n.ot=f,n.ct=y,e.He=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);t=0,b--,f|=(255&e.ft(m++))<<y,y+=8}if(c=i=16383&f,(31&i)>29||(i>>5&31)>29)return s=9,e.Fe="too many length or distance symbols",t=-3,n.ot=f,n.ct=y,e.He=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);if(i=258+(31&i)+(i>>5&31),!r||r.length<i)r=[];else for(v=0;i>v;v++)r[v]=0;f>>>=14,y-=14,a=0,s=4;case 4:for(;4+(c>>>10)>a;){for(;3>y;){if(0===b)return n.ot=f,n.ct=y,e.He=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);t=0,b--,f|=(255&e.ft(m++))<<y,y+=8}r[Oe[a++]]=7&f,f>>>=3,y-=3}for(;19>a;)r[Oe[a++]]=0;if(l[0]=7,i=p.st(r,l,u,d,e),0!=i)return-3==(t=i)&&(r=null,s=9),n.ot=f,n.ct=y,e.He=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);a=0,s=5;case 5:for(;i=c,258+(31&i)+(i>>5&31)>a;){let o,w;for(i=l[0];i>y;){if(0===b)return n.ot=f,n.ct=y,e.He=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);t=0,b--,f|=(255&e.ft(m++))<<y,y+=8}if(i=d[3*(u[0]+(f&Pe[i]))+1],w=d[3*(u[0]+(f&Pe[i]))+2],16>w)f>>>=i,y-=i,r[a++]=w;else{for(v=18==w?7:w-14,o=18==w?11:3;i+v>y;){if(0===b)return n.ot=f,n.ct=y,e.He=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);t=0,b--,f|=(255&e.ft(m++))<<y,y+=8}if(f>>>=i,y-=i,o+=f&Pe[v],f>>>=v,y-=v,v=a,i=c,v+o>258+(31&i)+(i>>5&31)||16==w&&1>v)return r=null,s=9,e.Fe="invalid bit length repeat",t=-3,n.ot=f,n.ct=y,e.He=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);w=16==w?r[v-1]:0;do{r[v++]=w}while(0!=--o);a=v}}if(u[0]=-1,x=[],_=[],A=[],D=[],x[0]=9,_[0]=6,i=c,i=p.it(257+(31&i),1+(i>>5&31),r,x,_,A,D,d,e),0!=i)return-3==i&&(r=null,s=9),t=i,n.ot=f,n.ct=y,e.He=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);w.init(x[0],_[0],d,A[0],d,D[0]),s=6;case 6:if(n.ot=f,n.ct=y,e.He=b,e.qe+=m-e.nt,e.nt=m,n.write=g,1!=(t=w.ut(n,e,t)))return n.wt(e,t);if(t=0,w.ht(e),m=e.nt,b=e.He,f=n.ot,y=n.ct,g=n.write,k=g<n.read?n.read-g-1:n.end-g,0===h){s=0;break}s=7;case 7:if(n.write=g,t=n.wt(e,t),g=n.write,k=g<n.read?n.read-g-1:n.end-g,n.read!=n.write)return n.ot=f,n.ct=y,e.He=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);s=8;case 8:return t=1,n.ot=f,n.ct=y,e.He=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);case 9:return t=-3,n.ot=f,n.ct=y,e.He=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);default:return t=-2,n.ot=f,n.ct=y,e.He=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t)}}},n.ht=e=>{n.reset(e,null),n.lt=null,d=null},n.yt=(e,t,r)=>{n.lt.set(e.subarray(t,t+r),0),n.read=n.write=r},n.bt=()=>1==s?1:0}const Ge=[0,0,255,255];function Je(){const e=this;function t(e){return e&&e.gt?(e.qe=e.Ge=0,e.Fe=null,e.gt.mode=7,e.gt.kt.reset(e,null),0):-2}e.mode=0,e.method=0,e.vt=[0],e.St=0,e.marker=0,e.zt=0,e.Ct=t=>(e.kt&&e.kt.ht(t),e.kt=null,0),e.It=(n,r)=>(n.Fe=null,e.kt=null,8>r||r>15?(e.Ct(n),-2):(e.zt=r,n.gt.kt=new qe(n,1<<r),t(n),0)),e.xt=(e,t)=>{let n,r;if(!e||!e.gt||!e.et)return-2;const s=e.gt;for(t=4==t?-5:0,n=-5;;)switch(s.mode){case 0:if(0===e.He)return n;if(n=t,e.He--,e.qe++,8!=(15&(s.method=e.ft(e.nt++)))){s.mode=13,e.Fe="unknown compression method",s.marker=5;break}if(8+(s.method>>4)>s.zt){s.mode=13,e.Fe="invalid win size",s.marker=5;break}s.mode=1;case 1:if(0===e.He)return n;if(n=t,e.He--,e.qe++,r=255&e.ft(e.nt++),((s.method<<8)+r)%31!=0){s.mode=13,e.Fe="incorrect header check",s.marker=5;break}if(0==(32&r)){s.mode=7;break}s.mode=2;case 2:if(0===e.He)return n;n=t,e.He--,e.qe++,s.St=(255&e.ft(e.nt++))<<24&4278190080,s.mode=3;case 3:if(0===e.He)return n;n=t,e.He--,e.qe++,s.St+=(255&e.ft(e.nt++))<<16&16711680,s.mode=4;case 4:if(0===e.He)return n;n=t,e.He--,e.qe++,s.St+=(255&e.ft(e.nt++))<<8&65280,s.mode=5;case 5:return 0===e.He?n:(n=t,e.He--,e.qe++,s.St+=255&e.ft(e.nt++),s.mode=6,2);case 6:return s.mode=13,e.Fe="need dictionary",s.marker=0,-2;case 7:if(n=s.kt.ut(e,n),-3==n){s.mode=13,s.marker=0;break}if(0==n&&(n=t),1!=n)return n;n=t,s.kt.reset(e,s.vt),s.mode=12;case 12:return e.He=0,1;case 13:return-3;default:return-2}},e._t=(e,t,n)=>{let r=0,s=n;if(!e||!e.gt||6!=e.gt.mode)return-2;const i=e.gt;return s<1<<i.zt||(s=(1<<i.zt)-1,r=n-s),i.kt.yt(t,r,s),i.mode=7,0},e.At=e=>{let n,r,s,i,o;if(!e||!e.gt)return-2;const c=e.gt;if(13!=c.mode&&(c.mode=13,c.marker=0),0===(n=e.He))return-5;for(r=e.nt,s=c.marker;0!==n&&4>s;)e.ft(r)==Ge[s]?s++:s=0!==e.ft(r)?0:4-s,r++,n--;return e.qe+=r-e.nt,e.nt=r,e.He=n,c.marker=s,4!=s?-3:(i=e.qe,o=e.Ge,t(e),e.qe=i,e.Ge=o,c.mode=7,0)},e.Dt=e=>e&&e.gt&&e.gt.kt?e.gt.kt.bt():-2}function Qe(){}function Xe(e){const t=new Qe,n=e&&e.chunkSize?r.floor(2*e.chunkSize):131072,o=new i(n);let c=!1;t.It(),t.$e=o,this.append=(e,r)=>{const f=[];let a,l,u=0,w=0,h=0;if(0!==e.length){t.nt=0,t.et=e,t.He=e.length;do{if(t.rt=0,t.tt=n,0!==t.He||c||(t.nt=0,c=!0),a=t.xt(0),c&&-5===a){if(0!==t.He)throw new s("inflating: bad input")}else if(0!==a&&1!==a)throw new s("inflating: "+t.Fe);if((c||1===a)&&t.He===e.length)throw new s("inflating: bad input");t.rt&&(t.rt===n?f.push(new i(o)):f.push(o.slice(0,t.rt))),h+=t.rt,r&&t.nt>0&&t.nt!=u&&(r(t.nt),u=t.nt)}while(t.He>0||0===t.tt);return f.length>1?(l=new i(h),f.forEach((e=>{l.set(e,w),w+=e.length}))):l=f[0]||new i,l}},this.flush=()=>{t.Ct()}}Qe.prototype={It(e){const t=this;return t.gt=new Je,e||(e=15),t.gt.It(t,e)},xt(e){const t=this;return t.gt?t.gt.xt(t,e):-2},Ct(){const e=this;if(!e.gt)return-2;const t=e.gt.Ct(e);return e.gt=null,t},At(){const e=this;return e.gt?e.gt.At(e):-2},_t(e,t){const n=this;return n.gt?n.gt._t(n,e,t):-2},ft(e){return this.et[e]},Le(e,t){return this.et.subarray(e,e+t)}},self.initCodec=()=>{self.Deflate=Ke,self.Inflate=Xe};\n'], {
      type: "text/javascript"
    }));
  };
  e({
    workerScripts: {
      inflate: [t],
      deflate: [t]
    }
  });
}
},{}],"../node_modules/@zip.js/zip.js/lib/core/util/stream-codec-shim.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initShimAsyncCodec = initShimAsyncCodec;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function initShimAsyncCodec(library) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var registerDataHandler = arguments.length > 2 ? arguments[2] : undefined;
  return {
    Deflate: createCodecClass(library.Deflate, options.deflate, registerDataHandler),
    Inflate: createCodecClass(library.Inflate, options.inflate, registerDataHandler)
  };
}
function createCodecClass(constructor, constructorOptions, registerDataHandler) {
  return /*#__PURE__*/function () {
    function _class(options) {
      _classCallCheck(this, _class);
      var codecAdapter = this;
      var onData = function onData(data) {
        if (codecAdapter.pendingData) {
          var previousPendingData = codecAdapter.pendingData;
          codecAdapter.pendingData = new Uint8Array(previousPendingData.length + data.length);
          var pendingData = codecAdapter.pendingData;
          pendingData.set(previousPendingData, 0);
          pendingData.set(data, previousPendingData.length);
        } else {
          codecAdapter.pendingData = new Uint8Array(data);
        }
      };
      if (Object.hasOwn(options, "level") && options.level === undefined) {
        delete options.level;
      }
      codecAdapter.codec = new constructor(Object.assign({}, constructorOptions, options));
      registerDataHandler(codecAdapter.codec, onData);
    }
    _createClass(_class, [{
      key: "append",
      value: function append(data) {
        this.codec.push(data);
        return getResponse(this);
      }
    }, {
      key: "flush",
      value: function flush() {
        this.codec.push(new Uint8Array(), true);
        return getResponse(this);
      }
    }]);
    return _class;
  }();
  function getResponse(codec) {
    if (codec.pendingData) {
      var output = codec.pendingData;
      codec.pendingData = null;
      return output;
    } else {
      return new Uint8Array();
    }
  }
}
},{}],"../node_modules/@zip.js/zip.js/lib/core/io.js":[function(require,module,exports) {
var define;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Writer = exports.Uint8ArrayWriter = exports.Uint8ArrayReader = exports.TextWriter = exports.TextReader = exports.SplitZipWriter = exports.SplitZipReader = exports.SplitDataWriter = exports.SplitDataReader = exports.Reader = exports.HttpReader = exports.HttpRangeReader = exports.ERR_ITERATOR_COMPLETED_TOO_SOON = exports.ERR_HTTP_RANGE = exports.Data64URIWriter = exports.Data64URIReader = exports.BlobWriter = exports.BlobReader = void 0;
exports.initReader = initReader;
exports.initStream = initStream;
exports.initWriter = initWriter;
exports.readUint8Array = _readUint8Array2;
var _constants = require("./constants.js");
var _configuration = require("./configuration.js");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/* global Blob, atob, btoa, XMLHttpRequest, URL, fetch, ReadableStream, WritableStream, FileReader, TransformStream, Response */
// deno-lint-ignore-file no-this-alias

var ERR_HTTP_STATUS = "HTTP error ";
var ERR_HTTP_RANGE = "HTTP Range not supported";
exports.ERR_HTTP_RANGE = ERR_HTTP_RANGE;
var ERR_ITERATOR_COMPLETED_TOO_SOON = "Writer iterator completed too soon";
exports.ERR_ITERATOR_COMPLETED_TOO_SOON = ERR_ITERATOR_COMPLETED_TOO_SOON;
var CONTENT_TYPE_TEXT_PLAIN = "text/plain";
var HTTP_HEADER_CONTENT_LENGTH = "Content-Length";
var HTTP_HEADER_CONTENT_RANGE = "Content-Range";
var HTTP_HEADER_ACCEPT_RANGES = "Accept-Ranges";
var HTTP_HEADER_RANGE = "Range";
var HTTP_HEADER_CONTENT_TYPE = "Content-Type";
var HTTP_METHOD_HEAD = "HEAD";
var HTTP_METHOD_GET = "GET";
var HTTP_RANGE_UNIT = "bytes";
var DEFAULT_CHUNK_SIZE = 64 * 1024;
var PROPERTY_NAME_WRITABLE = "writable";
var Stream = /*#__PURE__*/function () {
  function Stream() {
    _classCallCheck(this, Stream);
    this.size = 0;
  }
  _createClass(Stream, [{
    key: "init",
    value: function init() {
      this.initialized = true;
    }
  }]);
  return Stream;
}();
var Reader = /*#__PURE__*/function (_Stream) {
  _inherits(Reader, _Stream);
  var _super = _createSuper(Reader);
  function Reader() {
    _classCallCheck(this, Reader);
    return _super.apply(this, arguments);
  }
  _createClass(Reader, [{
    key: "readable",
    get: function get() {
      var reader = this;
      var _reader$chunkSize = reader.chunkSize,
        chunkSize = _reader$chunkSize === void 0 ? DEFAULT_CHUNK_SIZE : _reader$chunkSize;
      var readable = new ReadableStream({
        start: function start() {
          this.chunkOffset = 0;
        },
        pull: function pull(controller) {
          var _this = this;
          return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var _readable$offset, offset, size, diskNumberStart, chunkOffset;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _readable$offset = readable.offset, offset = _readable$offset === void 0 ? 0 : _readable$offset, size = readable.size, diskNumberStart = readable.diskNumberStart;
                  chunkOffset = _this.chunkOffset;
                  _context.t0 = controller;
                  _context.next = 5;
                  return _readUint8Array2(reader, offset + chunkOffset, Math.min(chunkSize, size - chunkOffset), diskNumberStart);
                case 5:
                  _context.t1 = _context.sent;
                  _context.t0.enqueue.call(_context.t0, _context.t1);
                  if (chunkOffset + chunkSize > size) {
                    controller.close();
                  } else {
                    _this.chunkOffset += chunkSize;
                  }
                case 8:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          }))();
        }
      });
      return readable;
    }
  }]);
  return Reader;
}(Stream);
exports.Reader = Reader;
var Writer = /*#__PURE__*/function (_Stream2) {
  _inherits(Writer, _Stream2);
  var _super2 = _createSuper(Writer);
  function Writer() {
    var _this2;
    _classCallCheck(this, Writer);
    _this2 = _super2.call(this);
    var writer = _assertThisInitialized(_this2);
    var writable = new WritableStream({
      write: function write(chunk) {
        return writer.writeUint8Array(chunk);
      }
    });
    Object.defineProperty(writer, PROPERTY_NAME_WRITABLE, {
      get: function get() {
        return writable;
      }
    });
    return _this2;
  }
  _createClass(Writer, [{
    key: "writeUint8Array",
    value: function writeUint8Array() {
      // abstract
    }
  }]);
  return Writer;
}(Stream);
exports.Writer = Writer;
var Data64URIReader = /*#__PURE__*/function (_Reader) {
  _inherits(Data64URIReader, _Reader);
  var _super3 = _createSuper(Data64URIReader);
  function Data64URIReader(dataURI) {
    var _this3;
    _classCallCheck(this, Data64URIReader);
    _this3 = _super3.call(this);
    var dataEnd = dataURI.length;
    while (dataURI.charAt(dataEnd - 1) == "=") {
      dataEnd--;
    }
    var dataStart = dataURI.indexOf(",") + 1;
    Object.assign(_assertThisInitialized(_this3), {
      dataURI: dataURI,
      dataStart: dataStart,
      size: Math.floor((dataEnd - dataStart) * 0.75)
    });
    return _this3;
  }
  _createClass(Data64URIReader, [{
    key: "readUint8Array",
    value: function readUint8Array(offset, length) {
      var dataStart = this.dataStart,
        dataURI = this.dataURI;
      var dataArray = new Uint8Array(length);
      var start = Math.floor(offset / 3) * 4;
      var bytes = atob(dataURI.substring(start + dataStart, Math.ceil((offset + length) / 3) * 4 + dataStart));
      var delta = offset - Math.floor(start / 4) * 3;
      for (var indexByte = delta; indexByte < delta + length; indexByte++) {
        dataArray[indexByte - delta] = bytes.charCodeAt(indexByte);
      }
      return dataArray;
    }
  }]);
  return Data64URIReader;
}(Reader);
exports.Data64URIReader = Data64URIReader;
var Data64URIWriter = /*#__PURE__*/function (_Writer) {
  _inherits(Data64URIWriter, _Writer);
  var _super4 = _createSuper(Data64URIWriter);
  function Data64URIWriter(contentType) {
    var _this4;
    _classCallCheck(this, Data64URIWriter);
    _this4 = _super4.call(this);
    Object.assign(_assertThisInitialized(_this4), {
      data: "data:" + (contentType || "") + ";base64,",
      pending: []
    });
    return _this4;
  }
  _createClass(Data64URIWriter, [{
    key: "writeUint8Array",
    value: function writeUint8Array(array) {
      var writer = this;
      var indexArray = 0;
      var dataString = writer.pending;
      var delta = writer.pending.length;
      writer.pending = "";
      for (indexArray = 0; indexArray < Math.floor((delta + array.length) / 3) * 3 - delta; indexArray++) {
        dataString += String.fromCharCode(array[indexArray]);
      }
      for (; indexArray < array.length; indexArray++) {
        writer.pending += String.fromCharCode(array[indexArray]);
      }
      if (dataString.length > 2) {
        writer.data += btoa(dataString);
      } else {
        writer.pending = dataString;
      }
    }
  }, {
    key: "getData",
    value: function getData() {
      return this.data + btoa(this.pending);
    }
  }]);
  return Data64URIWriter;
}(Writer);
exports.Data64URIWriter = Data64URIWriter;
var BlobReader = /*#__PURE__*/function (_Reader2) {
  _inherits(BlobReader, _Reader2);
  var _super5 = _createSuper(BlobReader);
  function BlobReader(blob) {
    var _this5;
    _classCallCheck(this, BlobReader);
    _this5 = _super5.call(this);
    Object.assign(_assertThisInitialized(_this5), {
      blob: blob,
      size: blob.size
    });
    return _this5;
  }
  _createClass(BlobReader, [{
    key: "readUint8Array",
    value: function () {
      var _readUint8Array = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(offset, length) {
        var reader, offsetEnd, blob;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              reader = this;
              offsetEnd = offset + length;
              blob = offset || offsetEnd < reader.size ? reader.blob.slice(offset, offsetEnd) : reader.blob;
              _context2.t0 = Uint8Array;
              _context2.next = 6;
              return blob.arrayBuffer();
            case 6:
              _context2.t1 = _context2.sent;
              return _context2.abrupt("return", new _context2.t0(_context2.t1));
            case 8:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function readUint8Array(_x, _x2) {
        return _readUint8Array.apply(this, arguments);
      }
      return readUint8Array;
    }()
  }]);
  return BlobReader;
}(Reader);
exports.BlobReader = BlobReader;
var BlobWriter = /*#__PURE__*/function (_Stream3) {
  _inherits(BlobWriter, _Stream3);
  var _super6 = _createSuper(BlobWriter);
  function BlobWriter(contentType) {
    var _this6;
    _classCallCheck(this, BlobWriter);
    _this6 = _super6.call(this);
    var writer = _assertThisInitialized(_this6);
    var transformStream = new TransformStream();
    var headers = [];
    if (contentType) {
      headers.push([HTTP_HEADER_CONTENT_TYPE, contentType]);
    }
    Object.defineProperty(writer, PROPERTY_NAME_WRITABLE, {
      get: function get() {
        return transformStream.writable;
      }
    });
    writer.blob = new Response(transformStream.readable, {
      headers: headers
    }).blob();
    return _this6;
  }
  _createClass(BlobWriter, [{
    key: "getData",
    value: function getData() {
      return this.blob;
    }
  }]);
  return BlobWriter;
}(Stream);
exports.BlobWriter = BlobWriter;
var TextReader = /*#__PURE__*/function (_BlobReader) {
  _inherits(TextReader, _BlobReader);
  var _super7 = _createSuper(TextReader);
  function TextReader(text) {
    _classCallCheck(this, TextReader);
    return _super7.call(this, new Blob([text], {
      type: CONTENT_TYPE_TEXT_PLAIN
    }));
  }
  return _createClass(TextReader);
}(BlobReader);
exports.TextReader = TextReader;
var TextWriter = /*#__PURE__*/function (_BlobWriter) {
  _inherits(TextWriter, _BlobWriter);
  var _super8 = _createSuper(TextWriter);
  function TextWriter(encoding) {
    var _this7;
    _classCallCheck(this, TextWriter);
    _this7 = _super8.call(this, encoding);
    Object.assign(_assertThisInitialized(_this7), {
      encoding: encoding,
      utf8: !encoding || encoding.toLowerCase() == "utf-8"
    });
    return _this7;
  }
  _createClass(TextWriter, [{
    key: "getData",
    value: function () {
      var _getData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var encoding, utf8, blob, reader;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              encoding = this.encoding, utf8 = this.utf8;
              _context3.next = 3;
              return _get(_getPrototypeOf(TextWriter.prototype), "getData", this).call(this);
            case 3:
              blob = _context3.sent;
              if (!(blob.text && utf8)) {
                _context3.next = 8;
                break;
              }
              return _context3.abrupt("return", blob.text());
            case 8:
              reader = new FileReader();
              return _context3.abrupt("return", new Promise(function (resolve, reject) {
                Object.assign(reader, {
                  onload: function onload(_ref) {
                    var target = _ref.target;
                    return resolve(target.result);
                  },
                  onerror: function onerror() {
                    return reject(reader.error);
                  }
                });
                reader.readAsText(blob, encoding);
              }));
            case 10:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function getData() {
        return _getData.apply(this, arguments);
      }
      return getData;
    }()
  }]);
  return TextWriter;
}(BlobWriter);
exports.TextWriter = TextWriter;
var FetchReader = /*#__PURE__*/function (_Reader3) {
  _inherits(FetchReader, _Reader3);
  var _super9 = _createSuper(FetchReader);
  function FetchReader(url, options) {
    var _this8;
    _classCallCheck(this, FetchReader);
    _this8 = _super9.call(this);
    createHtpReader(_assertThisInitialized(_this8), url, options);
    return _this8;
  }
  _createClass(FetchReader, [{
    key: "init",
    value: function () {
      var _init = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _get(_getPrototypeOf(FetchReader.prototype), "init", this).call(this);
              _context4.next = 3;
              return initHttpReader(this, sendFetchRequest, getFetchRequestData);
            case 3:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function init() {
        return _init.apply(this, arguments);
      }
      return init;
    }()
  }, {
    key: "readUint8Array",
    value: function readUint8Array(index, length) {
      return readUint8ArrayHttpReader(this, index, length, sendFetchRequest, getFetchRequestData);
    }
  }]);
  return FetchReader;
}(Reader);
var XHRReader = /*#__PURE__*/function (_Reader4) {
  _inherits(XHRReader, _Reader4);
  var _super10 = _createSuper(XHRReader);
  function XHRReader(url, options) {
    var _this9;
    _classCallCheck(this, XHRReader);
    _this9 = _super10.call(this);
    createHtpReader(_assertThisInitialized(_this9), url, options);
    return _this9;
  }
  _createClass(XHRReader, [{
    key: "init",
    value: function () {
      var _init2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _get(_getPrototypeOf(XHRReader.prototype), "init", this).call(this);
              _context5.next = 3;
              return initHttpReader(this, sendXMLHttpRequest, getXMLHttpRequestData);
            case 3:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function init() {
        return _init2.apply(this, arguments);
      }
      return init;
    }()
  }, {
    key: "readUint8Array",
    value: function readUint8Array(index, length) {
      return readUint8ArrayHttpReader(this, index, length, sendXMLHttpRequest, getXMLHttpRequestData);
    }
  }]);
  return XHRReader;
}(Reader);
function createHtpReader(httpReader, url, options) {
  var _options = options,
    preventHeadRequest = _options.preventHeadRequest,
    useRangeHeader = _options.useRangeHeader,
    forceRangeRequests = _options.forceRangeRequests;
  options = Object.assign({}, options);
  delete options.preventHeadRequest;
  delete options.useRangeHeader;
  delete options.forceRangeRequests;
  delete options.useXHR;
  Object.assign(httpReader, {
    url: url,
    options: options,
    preventHeadRequest: preventHeadRequest,
    useRangeHeader: useRangeHeader,
    forceRangeRequests: forceRangeRequests
  });
}
function initHttpReader(_x3, _x4, _x5) {
  return _initHttpReader.apply(this, arguments);
}
function _initHttpReader() {
  _initHttpReader = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(httpReader, sendRequest, getRequestData) {
    var url, useRangeHeader, forceRangeRequests, _yield$sendRequest, headers, contentSize, contentRangeHeader, splitHeader, headerValue;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          url = httpReader.url, useRangeHeader = httpReader.useRangeHeader, forceRangeRequests = httpReader.forceRangeRequests;
          if (!(isHttpFamily(url) && (useRangeHeader || forceRangeRequests))) {
            _context14.next = 20;
            break;
          }
          _context14.next = 4;
          return sendRequest(HTTP_METHOD_GET, httpReader, getRangeHeaders(httpReader));
        case 4:
          _yield$sendRequest = _context14.sent;
          headers = _yield$sendRequest.headers;
          if (!(!forceRangeRequests && headers.get(HTTP_HEADER_ACCEPT_RANGES) != HTTP_RANGE_UNIT)) {
            _context14.next = 10;
            break;
          }
          throw new Error(ERR_HTTP_RANGE);
        case 10:
          contentRangeHeader = headers.get(HTTP_HEADER_CONTENT_RANGE);
          if (contentRangeHeader) {
            splitHeader = contentRangeHeader.trim().split(/\s*\/\s*/);
            if (splitHeader.length) {
              headerValue = splitHeader[1];
              if (headerValue && headerValue != "*") {
                contentSize = Number(headerValue);
              }
            }
          }
          if (!(contentSize === _constants.UNDEFINED_VALUE)) {
            _context14.next = 17;
            break;
          }
          _context14.next = 15;
          return getContentLength(httpReader, sendRequest, getRequestData);
        case 15:
          _context14.next = 18;
          break;
        case 17:
          httpReader.size = contentSize;
        case 18:
          _context14.next = 22;
          break;
        case 20:
          _context14.next = 22;
          return getContentLength(httpReader, sendRequest, getRequestData);
        case 22:
        case "end":
          return _context14.stop();
      }
    }, _callee14);
  }));
  return _initHttpReader.apply(this, arguments);
}
function readUint8ArrayHttpReader(_x6, _x7, _x8, _x9, _x10) {
  return _readUint8ArrayHttpReader.apply(this, arguments);
}
function _readUint8ArrayHttpReader() {
  _readUint8ArrayHttpReader = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(httpReader, index, length, sendRequest, getRequestData) {
    var useRangeHeader, forceRangeRequests, options, response, data;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          useRangeHeader = httpReader.useRangeHeader, forceRangeRequests = httpReader.forceRangeRequests, options = httpReader.options;
          if (!(useRangeHeader || forceRangeRequests)) {
            _context15.next = 14;
            break;
          }
          _context15.next = 4;
          return sendRequest(HTTP_METHOD_GET, httpReader, getRangeHeaders(httpReader, index, length));
        case 4:
          response = _context15.sent;
          if (!(response.status != 206)) {
            _context15.next = 7;
            break;
          }
          throw new Error(ERR_HTTP_RANGE);
        case 7:
          _context15.t0 = Uint8Array;
          _context15.next = 10;
          return response.arrayBuffer();
        case 10:
          _context15.t1 = _context15.sent;
          return _context15.abrupt("return", new _context15.t0(_context15.t1));
        case 14:
          data = httpReader.data;
          if (data) {
            _context15.next = 18;
            break;
          }
          _context15.next = 18;
          return getRequestData(httpReader, options);
        case 18:
          return _context15.abrupt("return", new Uint8Array(httpReader.data.subarray(index, index + length)));
        case 19:
        case "end":
          return _context15.stop();
      }
    }, _callee15);
  }));
  return _readUint8ArrayHttpReader.apply(this, arguments);
}
function getRangeHeaders(httpReader) {
  var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var length = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  return Object.assign({}, getHeaders(httpReader), _defineProperty({}, HTTP_HEADER_RANGE, HTTP_RANGE_UNIT + "=" + index + "-" + (index + length - 1)));
}
function getHeaders(_ref2) {
  var options = _ref2.options;
  var headers = options.headers;
  if (headers) {
    if (Symbol.iterator in headers) {
      return Object.fromEntries(headers);
    } else {
      return headers;
    }
  }
}
function getFetchRequestData(_x11) {
  return _getFetchRequestData.apply(this, arguments);
}
function _getFetchRequestData() {
  _getFetchRequestData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(httpReader) {
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _context16.next = 2;
          return getRequestData(httpReader, sendFetchRequest);
        case 2:
        case "end":
          return _context16.stop();
      }
    }, _callee16);
  }));
  return _getFetchRequestData.apply(this, arguments);
}
function getXMLHttpRequestData(_x12) {
  return _getXMLHttpRequestData.apply(this, arguments);
}
function _getXMLHttpRequestData() {
  _getXMLHttpRequestData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(httpReader) {
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          _context17.next = 2;
          return getRequestData(httpReader, sendXMLHttpRequest);
        case 2:
        case "end":
          return _context17.stop();
      }
    }, _callee17);
  }));
  return _getXMLHttpRequestData.apply(this, arguments);
}
function getRequestData(_x13, _x14) {
  return _getRequestData.apply(this, arguments);
}
function _getRequestData() {
  _getRequestData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(httpReader, sendRequest) {
    var response;
    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          _context18.next = 2;
          return sendRequest(HTTP_METHOD_GET, httpReader, getHeaders(httpReader));
        case 2:
          response = _context18.sent;
          _context18.t0 = Uint8Array;
          _context18.next = 6;
          return response.arrayBuffer();
        case 6:
          _context18.t1 = _context18.sent;
          httpReader.data = new _context18.t0(_context18.t1);
          if (!httpReader.size) {
            httpReader.size = httpReader.data.length;
          }
        case 9:
        case "end":
          return _context18.stop();
      }
    }, _callee18);
  }));
  return _getRequestData.apply(this, arguments);
}
function getContentLength(_x15, _x16, _x17) {
  return _getContentLength.apply(this, arguments);
}
function _getContentLength() {
  _getContentLength = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(httpReader, sendRequest, getRequestData) {
    var response, contentLength;
    return _regeneratorRuntime().wrap(function _callee19$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          if (!httpReader.preventHeadRequest) {
            _context19.next = 5;
            break;
          }
          _context19.next = 3;
          return getRequestData(httpReader, httpReader.options);
        case 3:
          _context19.next = 15;
          break;
        case 5:
          _context19.next = 7;
          return sendRequest(HTTP_METHOD_HEAD, httpReader, getHeaders(httpReader));
        case 7:
          response = _context19.sent;
          contentLength = response.headers.get(HTTP_HEADER_CONTENT_LENGTH);
          if (!contentLength) {
            _context19.next = 13;
            break;
          }
          httpReader.size = Number(contentLength);
          _context19.next = 15;
          break;
        case 13:
          _context19.next = 15;
          return getRequestData(httpReader, httpReader.options);
        case 15:
        case "end":
          return _context19.stop();
      }
    }, _callee19);
  }));
  return _getContentLength.apply(this, arguments);
}
function sendFetchRequest(_x18, _x19, _x20) {
  return _sendFetchRequest.apply(this, arguments);
}
function _sendFetchRequest() {
  _sendFetchRequest = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20(method, _ref3, headers) {
    var options, url, response;
    return _regeneratorRuntime().wrap(function _callee20$(_context20) {
      while (1) switch (_context20.prev = _context20.next) {
        case 0:
          options = _ref3.options, url = _ref3.url;
          _context20.next = 3;
          return fetch(url, Object.assign({}, options, {
            method: method,
            headers: headers
          }));
        case 3:
          response = _context20.sent;
          if (!(response.status < 400)) {
            _context20.next = 8;
            break;
          }
          return _context20.abrupt("return", response);
        case 8:
          throw response.status == 416 ? new Error(ERR_HTTP_RANGE) : new Error(ERR_HTTP_STATUS + (response.statusText || response.status));
        case 9:
        case "end":
          return _context20.stop();
      }
    }, _callee20);
  }));
  return _sendFetchRequest.apply(this, arguments);
}
function sendXMLHttpRequest(method, _ref4, headers) {
  var url = _ref4.url;
  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();
    request.addEventListener("load", function () {
      if (request.status < 400) {
        var _headers = [];
        request.getAllResponseHeaders().trim().split(/[\r\n]+/).forEach(function (header) {
          var splitHeader = header.trim().split(/\s*:\s*/);
          splitHeader[0] = splitHeader[0].trim().replace(/^[a-z]|-[a-z]/g, function (value) {
            return value.toUpperCase();
          });
          _headers.push(splitHeader);
        });
        resolve({
          status: request.status,
          arrayBuffer: function arrayBuffer() {
            return request.response;
          },
          headers: new Map(_headers)
        });
      } else {
        reject(request.status == 416 ? new Error(ERR_HTTP_RANGE) : new Error(ERR_HTTP_STATUS + (request.statusText || request.status)));
      }
    }, false);
    request.addEventListener("error", function (event) {
      return reject(event.detail.error);
    }, false);
    request.open(method, url);
    if (headers) {
      for (var _i = 0, _Object$entries = Object.entries(headers); _i < _Object$entries.length; _i++) {
        var entry = _Object$entries[_i];
        request.setRequestHeader(entry[0], entry[1]);
      }
    }
    request.responseType = "arraybuffer";
    request.send();
  });
}
var HttpReader = /*#__PURE__*/function (_Reader5) {
  _inherits(HttpReader, _Reader5);
  var _super11 = _createSuper(HttpReader);
  function HttpReader(url) {
    var _this10;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, HttpReader);
    _this10 = _super11.call(this);
    Object.assign(_assertThisInitialized(_this10), {
      url: url,
      reader: options.useXHR ? new XHRReader(url, options) : new FetchReader(url, options)
    });
    return _this10;
  }
  _createClass(HttpReader, [{
    key: "size",
    get: function get() {
      return this.reader.size;
    },
    set: function set(value) {
      // ignored
    }
  }, {
    key: "init",
    value: function () {
      var _init3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _get(_getPrototypeOf(HttpReader.prototype), "init", this).call(this);
              _context6.next = 3;
              return this.reader.init();
            case 3:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function init() {
        return _init3.apply(this, arguments);
      }
      return init;
    }()
  }, {
    key: "readUint8Array",
    value: function readUint8Array(index, length) {
      return this.reader.readUint8Array(index, length);
    }
  }]);
  return HttpReader;
}(Reader);
exports.HttpReader = HttpReader;
var HttpRangeReader = /*#__PURE__*/function (_HttpReader) {
  _inherits(HttpRangeReader, _HttpReader);
  var _super12 = _createSuper(HttpRangeReader);
  function HttpRangeReader(url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, HttpRangeReader);
    options.useRangeHeader = true;
    return _super12.call(this, url, options);
  }
  return _createClass(HttpRangeReader);
}(HttpReader);
exports.HttpRangeReader = HttpRangeReader;
var Uint8ArrayReader = /*#__PURE__*/function (_Reader6) {
  _inherits(Uint8ArrayReader, _Reader6);
  var _super13 = _createSuper(Uint8ArrayReader);
  function Uint8ArrayReader(array) {
    var _this11;
    _classCallCheck(this, Uint8ArrayReader);
    _this11 = _super13.call(this);
    Object.assign(_assertThisInitialized(_this11), {
      array: array,
      size: array.length
    });
    return _this11;
  }
  _createClass(Uint8ArrayReader, [{
    key: "readUint8Array",
    value: function readUint8Array(index, length) {
      return this.array.slice(index, index + length);
    }
  }]);
  return Uint8ArrayReader;
}(Reader);
exports.Uint8ArrayReader = Uint8ArrayReader;
var Uint8ArrayWriter = /*#__PURE__*/function (_Writer2) {
  _inherits(Uint8ArrayWriter, _Writer2);
  var _super14 = _createSuper(Uint8ArrayWriter);
  function Uint8ArrayWriter() {
    _classCallCheck(this, Uint8ArrayWriter);
    return _super14.apply(this, arguments);
  }
  _createClass(Uint8ArrayWriter, [{
    key: "init",
    value: function init() {
      var initSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      _get(_getPrototypeOf(Uint8ArrayWriter.prototype), "init", this).call(this);
      Object.assign(this, {
        offset: 0,
        array: new Uint8Array(initSize)
      });
    }
  }, {
    key: "writeUint8Array",
    value: function writeUint8Array(array) {
      var writer = this;
      if (writer.offset + array.length > writer.array.length) {
        var previousArray = writer.array;
        writer.array = new Uint8Array(previousArray.length + array.length);
        writer.array.set(previousArray);
      }
      writer.array.set(array, writer.offset);
      writer.offset += array.length;
    }
  }, {
    key: "getData",
    value: function getData() {
      return this.array;
    }
  }]);
  return Uint8ArrayWriter;
}(Writer);
exports.Uint8ArrayWriter = Uint8ArrayWriter;
var SplitDataReader = /*#__PURE__*/function (_Reader7) {
  _inherits(SplitDataReader, _Reader7);
  var _super15 = _createSuper(SplitDataReader);
  function SplitDataReader(readers) {
    var _this12;
    _classCallCheck(this, SplitDataReader);
    _this12 = _super15.call(this);
    _this12.readers = readers;
    return _this12;
  }
  _createClass(SplitDataReader, [{
    key: "init",
    value: function () {
      var _init4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
        var reader, readers;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _get(_getPrototypeOf(SplitDataReader.prototype), "init", this).call(this);
              reader = this;
              readers = reader.readers;
              reader.lastDiskNumber = 0;
              _context8.next = 6;
              return Promise.all(readers.map( /*#__PURE__*/function () {
                var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(diskReader) {
                  return _regeneratorRuntime().wrap(function _callee7$(_context7) {
                    while (1) switch (_context7.prev = _context7.next) {
                      case 0:
                        _context7.next = 2;
                        return diskReader.init();
                      case 2:
                        reader.size += diskReader.size;
                      case 3:
                      case "end":
                        return _context7.stop();
                    }
                  }, _callee7);
                }));
                return function (_x21) {
                  return _ref5.apply(this, arguments);
                };
              }()));
            case 6:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this);
      }));
      function init() {
        return _init4.apply(this, arguments);
      }
      return init;
    }()
  }, {
    key: "readUint8Array",
    value: function () {
      var _readUint8Array3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(offset, length) {
        var diskNumber,
          reader,
          readers,
          result,
          currentDiskNumber,
          currentReaderOffset,
          currentReader,
          currentReaderSize,
          chunkLength,
          _args9 = arguments;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              diskNumber = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : 0;
              reader = this;
              readers = this.readers;
              currentDiskNumber = diskNumber;
              if (currentDiskNumber == -1) {
                currentDiskNumber = readers.length - 1;
              }
              currentReaderOffset = offset;
              while (currentReaderOffset >= readers[currentDiskNumber].size) {
                currentReaderOffset -= readers[currentDiskNumber].size;
                currentDiskNumber++;
              }
              currentReader = readers[currentDiskNumber];
              currentReaderSize = currentReader.size;
              if (!(currentReaderOffset + length <= currentReaderSize)) {
                _context9.next = 15;
                break;
              }
              _context9.next = 12;
              return _readUint8Array2(currentReader, currentReaderOffset, length);
            case 12:
              result = _context9.sent;
              _context9.next = 28;
              break;
            case 15:
              chunkLength = currentReaderSize - currentReaderOffset;
              result = new Uint8Array(length);
              _context9.t0 = result;
              _context9.next = 20;
              return _readUint8Array2(currentReader, currentReaderOffset, chunkLength);
            case 20:
              _context9.t1 = _context9.sent;
              _context9.t0.set.call(_context9.t0, _context9.t1);
              _context9.t2 = result;
              _context9.next = 25;
              return reader.readUint8Array(offset + chunkLength, length - chunkLength, diskNumber);
            case 25:
              _context9.t3 = _context9.sent;
              _context9.t4 = chunkLength;
              _context9.t2.set.call(_context9.t2, _context9.t3, _context9.t4);
            case 28:
              reader.lastDiskNumber = Math.max(currentDiskNumber, reader.lastDiskNumber);
              return _context9.abrupt("return", result);
            case 30:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this);
      }));
      function readUint8Array(_x22, _x23) {
        return _readUint8Array3.apply(this, arguments);
      }
      return readUint8Array;
    }()
  }]);
  return SplitDataReader;
}(Reader);
exports.SplitDataReader = SplitDataReader;
var SplitDataWriter = /*#__PURE__*/function (_Stream4) {
  _inherits(SplitDataWriter, _Stream4);
  var _super16 = _createSuper(SplitDataWriter);
  function SplitDataWriter(writerGenerator) {
    var _this13;
    var maxSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4294967295;
    _classCallCheck(this, SplitDataWriter);
    _this13 = _super16.call(this);
    var zipWriter = _assertThisInitialized(_this13);
    Object.assign(zipWriter, {
      diskNumber: 0,
      diskOffset: 0,
      size: 0,
      maxSize: maxSize,
      availableSize: maxSize
    });
    var diskSourceWriter, diskWritable, diskWriter;
    var writable = new WritableStream({
      write: function write(chunk) {
        var _this14 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
          var availableSize, _yield$writerGenerato, value, done;
          return _regeneratorRuntime().wrap(function _callee10$(_context10) {
            while (1) switch (_context10.prev = _context10.next) {
              case 0:
                availableSize = zipWriter.availableSize;
                if (diskWriter) {
                  _context10.next = 23;
                  break;
                }
                _context10.next = 4;
                return writerGenerator.next();
              case 4:
                _yield$writerGenerato = _context10.sent;
                value = _yield$writerGenerato.value;
                done = _yield$writerGenerato.done;
                if (!(done && !value)) {
                  _context10.next = 11;
                  break;
                }
                throw new Error(ERR_ITERATOR_COMPLETED_TOO_SOON);
              case 11:
                diskSourceWriter = value;
                diskSourceWriter.size = 0;
                if (diskSourceWriter.maxSize) {
                  zipWriter.maxSize = diskSourceWriter.maxSize;
                }
                zipWriter.availableSize = zipWriter.maxSize;
                _context10.next = 17;
                return initStream(diskSourceWriter);
              case 17:
                diskWritable = value.writable;
                diskWriter = diskWritable.getWriter();
              case 19:
                _context10.next = 21;
                return _this14.write(chunk);
              case 21:
                _context10.next = 37;
                break;
              case 23:
                if (!(chunk.length >= availableSize)) {
                  _context10.next = 35;
                  break;
                }
                _context10.next = 26;
                return writeChunk(chunk.slice(0, availableSize));
              case 26:
                _context10.next = 28;
                return closeDisk();
              case 28:
                zipWriter.diskOffset += diskSourceWriter.size;
                zipWriter.diskNumber++;
                diskWriter = null;
                _context10.next = 33;
                return _this14.write(chunk.slice(availableSize));
              case 33:
                _context10.next = 37;
                break;
              case 35:
                _context10.next = 37;
                return writeChunk(chunk);
              case 37:
              case "end":
                return _context10.stop();
            }
          }, _callee10);
        }))();
      },
      close: function close() {
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
          return _regeneratorRuntime().wrap(function _callee11$(_context11) {
            while (1) switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return diskWriter.ready;
              case 2:
                _context11.next = 4;
                return closeDisk();
              case 4:
              case "end":
                return _context11.stop();
            }
          }, _callee11);
        }))();
      }
    });
    Object.defineProperty(zipWriter, PROPERTY_NAME_WRITABLE, {
      get: function get() {
        return writable;
      }
    });
    function writeChunk(_x24) {
      return _writeChunk.apply(this, arguments);
    }
    function _writeChunk() {
      _writeChunk = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(chunk) {
        var chunkLength;
        return _regeneratorRuntime().wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              chunkLength = chunk.length;
              if (!chunkLength) {
                _context12.next = 9;
                break;
              }
              _context12.next = 4;
              return diskWriter.ready;
            case 4:
              _context12.next = 6;
              return diskWriter.write(chunk);
            case 6:
              diskSourceWriter.size += chunkLength;
              zipWriter.size += chunkLength;
              zipWriter.availableSize -= chunkLength;
            case 9:
            case "end":
              return _context12.stop();
          }
        }, _callee12);
      }));
      return _writeChunk.apply(this, arguments);
    }
    function closeDisk() {
      return _closeDisk.apply(this, arguments);
    }
    function _closeDisk() {
      _closeDisk = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13() {
        return _regeneratorRuntime().wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              diskWritable.size = diskSourceWriter.size;
              _context13.next = 3;
              return diskWriter.close();
            case 3:
            case "end":
              return _context13.stop();
          }
        }, _callee13);
      }));
      return _closeDisk.apply(this, arguments);
    }
    return _this13;
  }
  return _createClass(SplitDataWriter);
}(Stream);
exports.SplitDataWriter = SplitDataWriter;
function isHttpFamily(url) {
  var _getConfiguration = (0, _configuration.getConfiguration)(),
    baseURL = _getConfiguration.baseURL;
  var _URL = new URL(url, baseURL),
    protocol = _URL.protocol;
  return protocol == "http:" || protocol == "https:";
}
function initStream(_x25, _x26) {
  return _initStream.apply(this, arguments);
}
function _initStream() {
  _initStream = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee21(stream, initSize) {
    return _regeneratorRuntime().wrap(function _callee21$(_context21) {
      while (1) switch (_context21.prev = _context21.next) {
        case 0:
          if (!(stream.init && !stream.initialized)) {
            _context21.next = 3;
            break;
          }
          _context21.next = 3;
          return stream.init(initSize);
        case 3:
        case "end":
          return _context21.stop();
      }
    }, _callee21);
  }));
  return _initStream.apply(this, arguments);
}
function initReader(reader) {
  if (Array.isArray(reader)) {
    reader = new SplitDataReader(reader);
  }
  if (reader instanceof ReadableStream) {
    reader = {
      readable: reader
    };
  }
  return reader;
}
function initWriter(writer) {
  if (writer.writable === _constants.UNDEFINED_VALUE && _typeof(writer.next) == _constants.FUNCTION_TYPE) {
    writer = new SplitDataWriter(writer);
  }
  if (writer instanceof WritableStream) {
    writer = {
      writable: writer
    };
  }
  var _writer = writer,
    writable = _writer.writable;
  if (writable.size === _constants.UNDEFINED_VALUE) {
    writable.size = 0;
  }
  var splitZipFile = writer instanceof SplitDataWriter;
  if (!splitZipFile) {
    Object.assign(writer, {
      diskNumber: 0,
      diskOffset: 0,
      availableSize: Infinity,
      maxSize: Infinity
    });
  }
  return writer;
}
function _readUint8Array2(reader, offset, size, diskNumber) {
  return reader.readUint8Array(offset, size, diskNumber);
}
var SplitZipReader = SplitDataReader;
exports.SplitZipReader = SplitZipReader;
var SplitZipWriter = SplitDataWriter;
exports.SplitZipWriter = SplitZipWriter;
},{"./constants.js":"../node_modules/@zip.js/zip.js/lib/core/constants.js","./configuration.js":"../node_modules/@zip.js/zip.js/lib/core/configuration.js"}],"../node_modules/@zip.js/zip.js/lib/core/util/cp437-decode.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decodeCP437 = decodeCP437;
/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/* global TextDecoder */

var CP437 = "\0☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼ !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~⌂ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ".split("");
var VALID_CP437 = CP437.length == 256;
function decodeCP437(stringValue) {
  if (VALID_CP437) {
    var result = "";
    for (var indexCharacter = 0; indexCharacter < stringValue.length; indexCharacter++) {
      result += CP437[stringValue[indexCharacter]];
    }
    return result;
  } else {
    return new TextDecoder().decode(stringValue);
  }
}
},{}],"../node_modules/@zip.js/zip.js/lib/core/util/decode-text.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decodeText = decodeText;
var _cp437Decode = require("./cp437-decode.js");
/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/* global TextDecoder */

function decodeText(value, encoding) {
  if (encoding && encoding.trim().toLowerCase() == "cp437") {
    return (0, _cp437Decode.decodeCP437)(value);
  } else {
    return new TextDecoder(encoding).decode(value);
  }
}
},{"./cp437-decode.js":"../node_modules/@zip.js/zip.js/lib/core/util/cp437-decode.js"}],"../node_modules/@zip.js/zip.js/lib/core/zip-entry.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PROPERTY_NAME_ZIP64 = exports.PROPERTY_NAME_UNCOMPPRESSED_SIZE = exports.PROPERTY_NAME_RAW_LAST_MODIFICATION_DATE = exports.PROPERTY_NAME_RAW_LAST_ACCESS_DATE = exports.PROPERTY_NAME_RAW_FILENAME = exports.PROPERTY_NAME_RAW_CREATION_DATE = exports.PROPERTY_NAME_RAW_COMMENT = exports.PROPERTY_NAME_OFFSET = exports.PROPERTY_NAME_MS_DOS_COMPATIBLE = exports.PROPERTY_NAME_LAST_MODIFICATION_DATE = exports.PROPERTY_NAME_LAST_ACCESS_DATE = exports.PROPERTY_NAME_INTERNAL_FILE_ATTRIBUTE = exports.PROPERTY_NAME_FILENAME = exports.PROPERTY_NAME_EXTERNAL_FILE_ATTRIBUTE = exports.PROPERTY_NAME_DISK_NUMBER_START = exports.PROPERTY_NAME_CREATION_DATE = exports.PROPERTY_NAME_COMPPRESSED_SIZE = exports.PROPERTY_NAME_COMMENT = exports.Entry = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var PROPERTY_NAME_FILENAME = "filename";
exports.PROPERTY_NAME_FILENAME = PROPERTY_NAME_FILENAME;
var PROPERTY_NAME_RAW_FILENAME = "rawFilename";
exports.PROPERTY_NAME_RAW_FILENAME = PROPERTY_NAME_RAW_FILENAME;
var PROPERTY_NAME_COMMENT = "comment";
exports.PROPERTY_NAME_COMMENT = PROPERTY_NAME_COMMENT;
var PROPERTY_NAME_RAW_COMMENT = "rawComment";
exports.PROPERTY_NAME_RAW_COMMENT = PROPERTY_NAME_RAW_COMMENT;
var PROPERTY_NAME_UNCOMPPRESSED_SIZE = "uncompressedSize";
exports.PROPERTY_NAME_UNCOMPPRESSED_SIZE = PROPERTY_NAME_UNCOMPPRESSED_SIZE;
var PROPERTY_NAME_COMPPRESSED_SIZE = "compressedSize";
exports.PROPERTY_NAME_COMPPRESSED_SIZE = PROPERTY_NAME_COMPPRESSED_SIZE;
var PROPERTY_NAME_OFFSET = "offset";
exports.PROPERTY_NAME_OFFSET = PROPERTY_NAME_OFFSET;
var PROPERTY_NAME_DISK_NUMBER_START = "diskNumberStart";
exports.PROPERTY_NAME_DISK_NUMBER_START = PROPERTY_NAME_DISK_NUMBER_START;
var PROPERTY_NAME_LAST_MODIFICATION_DATE = "lastModDate";
exports.PROPERTY_NAME_LAST_MODIFICATION_DATE = PROPERTY_NAME_LAST_MODIFICATION_DATE;
var PROPERTY_NAME_RAW_LAST_MODIFICATION_DATE = "rawLastModDate";
exports.PROPERTY_NAME_RAW_LAST_MODIFICATION_DATE = PROPERTY_NAME_RAW_LAST_MODIFICATION_DATE;
var PROPERTY_NAME_LAST_ACCESS_DATE = "lastAccessDate";
exports.PROPERTY_NAME_LAST_ACCESS_DATE = PROPERTY_NAME_LAST_ACCESS_DATE;
var PROPERTY_NAME_RAW_LAST_ACCESS_DATE = "rawLastAccessDate";
exports.PROPERTY_NAME_RAW_LAST_ACCESS_DATE = PROPERTY_NAME_RAW_LAST_ACCESS_DATE;
var PROPERTY_NAME_CREATION_DATE = "creationDate";
exports.PROPERTY_NAME_CREATION_DATE = PROPERTY_NAME_CREATION_DATE;
var PROPERTY_NAME_RAW_CREATION_DATE = "rawCreationDate";
exports.PROPERTY_NAME_RAW_CREATION_DATE = PROPERTY_NAME_RAW_CREATION_DATE;
var PROPERTY_NAME_INTERNAL_FILE_ATTRIBUTE = "internalFileAttribute";
exports.PROPERTY_NAME_INTERNAL_FILE_ATTRIBUTE = PROPERTY_NAME_INTERNAL_FILE_ATTRIBUTE;
var PROPERTY_NAME_EXTERNAL_FILE_ATTRIBUTE = "externalFileAttribute";
exports.PROPERTY_NAME_EXTERNAL_FILE_ATTRIBUTE = PROPERTY_NAME_EXTERNAL_FILE_ATTRIBUTE;
var PROPERTY_NAME_MS_DOS_COMPATIBLE = "msDosCompatible";
exports.PROPERTY_NAME_MS_DOS_COMPATIBLE = PROPERTY_NAME_MS_DOS_COMPATIBLE;
var PROPERTY_NAME_ZIP64 = "zip64";
exports.PROPERTY_NAME_ZIP64 = PROPERTY_NAME_ZIP64;
var PROPERTY_NAMES = [PROPERTY_NAME_FILENAME, PROPERTY_NAME_RAW_FILENAME, PROPERTY_NAME_COMPPRESSED_SIZE, PROPERTY_NAME_UNCOMPPRESSED_SIZE, PROPERTY_NAME_LAST_MODIFICATION_DATE, PROPERTY_NAME_RAW_LAST_MODIFICATION_DATE, PROPERTY_NAME_COMMENT, PROPERTY_NAME_RAW_COMMENT, PROPERTY_NAME_LAST_ACCESS_DATE, PROPERTY_NAME_CREATION_DATE, PROPERTY_NAME_OFFSET, PROPERTY_NAME_DISK_NUMBER_START, PROPERTY_NAME_DISK_NUMBER_START, PROPERTY_NAME_INTERNAL_FILE_ATTRIBUTE, PROPERTY_NAME_EXTERNAL_FILE_ATTRIBUTE, PROPERTY_NAME_MS_DOS_COMPATIBLE, PROPERTY_NAME_ZIP64, "directory", "bitFlag", "encrypted", "signature", "filenameUTF8", "commentUTF8", "compressionMethod", "version", "versionMadeBy", "extraField", "rawExtraField", "extraFieldZip64", "extraFieldUnicodePath", "extraFieldUnicodeComment", "extraFieldAES", "extraFieldNTFS", "extraFieldExtendedTimestamp"];
var Entry = /*#__PURE__*/_createClass(function Entry(data) {
  var _this = this;
  _classCallCheck(this, Entry);
  PROPERTY_NAMES.forEach(function (name) {
    return _this[name] = data[name];
  });
});
exports.Entry = Entry;
},{}],"../node_modules/@zip.js/zip.js/lib/core/zip-reader.js":[function(require,module,exports) {
var define;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ERR_EXTRAFIELD_ZIP64_NOT_FOUND = exports.ERR_EOCDR_ZIP64_NOT_FOUND = exports.ERR_EOCDR_NOT_FOUND = exports.ERR_EOCDR_LOCATOR_ZIP64_NOT_FOUND = exports.ERR_ENCRYPTED = exports.ERR_CENTRAL_DIRECTORY_NOT_FOUND = exports.ERR_BAD_FORMAT = void 0;
Object.defineProperty(exports, "ERR_INVALID_PASSWORD", {
  enumerable: true,
  get: function () {
    return _codecPool.ERR_INVALID_PASSWORD;
  }
});
Object.defineProperty(exports, "ERR_INVALID_SIGNATURE", {
  enumerable: true,
  get: function () {
    return _codecPool.ERR_INVALID_SIGNATURE;
  }
});
exports.ZipReader = exports.ERR_UNSUPPORTED_ENCRYPTION = exports.ERR_UNSUPPORTED_COMPRESSION = exports.ERR_SPLIT_ZIP_FILE = exports.ERR_LOCAL_FILE_HEADER_NOT_FOUND = void 0;
var _constants = require("./constants.js");
var _configuration = require("./configuration.js");
var _codecPool = require("./codec-pool.js");
var _io = require("./io.js");
var _decodeText = require("./util/decode-text.js");
var _crc = require("./streams/codecs/crc32.js");
var _zipEntry = require("./zip-entry.js");
var _ZIP64_EXTRACTION;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _asyncIterator(iterable) { var method, async, sync, retry = 2; for ("undefined" != typeof Symbol && (async = Symbol.asyncIterator, sync = Symbol.iterator); retry--;) { if (async && null != (method = iterable[async])) return method.call(iterable); if (sync && null != (method = iterable[sync])) return new AsyncFromSyncIterator(method.call(iterable)); async = "@@asyncIterator", sync = "@@iterator"; } throw new TypeError("Object is not async iterable"); }
function AsyncFromSyncIterator(s) { function AsyncFromSyncIteratorContinuation(r) { if (Object(r) !== r) return Promise.reject(new TypeError(r + " is not an object.")); var done = r.done; return Promise.resolve(r.value).then(function (value) { return { value: value, done: done }; }); } return AsyncFromSyncIterator = function AsyncFromSyncIterator(s) { this.s = s, this.n = s.next; }, AsyncFromSyncIterator.prototype = { s: null, n: null, next: function next() { return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments)); }, return: function _return(value) { var ret = this.s.return; return void 0 === ret ? Promise.resolve({ value: value, done: !0 }) : AsyncFromSyncIteratorContinuation(ret.apply(this.s, arguments)); }, throw: function _throw(value) { var thr = this.s.return; return void 0 === thr ? Promise.reject(value) : AsyncFromSyncIteratorContinuation(thr.apply(this.s, arguments)); } }, new AsyncFromSyncIterator(s); }
function _awaitAsyncGenerator(value) { return new _OverloadYield(value, 0); }
function _wrapAsyncGenerator(fn) { return function () { return new _AsyncGenerator(fn.apply(this, arguments)); }; }
function _AsyncGenerator(gen) { var front, back; function resume(key, arg) { try { var result = gen[key](arg), value = result.value, overloaded = value instanceof _OverloadYield; Promise.resolve(overloaded ? value.v : value).then(function (arg) { if (overloaded) { var nextKey = "return" === key ? "return" : "next"; if (!value.k || arg.done) return resume(nextKey, arg); arg = gen[nextKey](arg).value; } settle(result.done ? "return" : "normal", arg); }, function (err) { resume("throw", err); }); } catch (err) { settle("throw", err); } } function settle(type, value) { switch (type) { case "return": front.resolve({ value: value, done: !0 }); break; case "throw": front.reject(value); break; default: front.resolve({ value: value, done: !1 }); } (front = front.next) ? resume(front.key, front.arg) : back = null; } this._invoke = function (key, arg) { return new Promise(function (resolve, reject) { var request = { key: key, arg: arg, resolve: resolve, reject: reject, next: null }; back ? back = back.next = request : (front = back = request, resume(key, arg)); }); }, "function" != typeof gen.return && (this.return = void 0); }
_AsyncGenerator.prototype["function" == typeof Symbol && Symbol.asyncIterator || "@@asyncIterator"] = function () { return this; }, _AsyncGenerator.prototype.next = function (arg) { return this._invoke("next", arg); }, _AsyncGenerator.prototype.throw = function (arg) { return this._invoke("throw", arg); }, _AsyncGenerator.prototype.return = function (arg) { return this._invoke("return", arg); };
function _OverloadYield(value, kind) { this.v = value, this.k = kind; }
var ERR_BAD_FORMAT = "File format is not recognized";
exports.ERR_BAD_FORMAT = ERR_BAD_FORMAT;
var ERR_EOCDR_NOT_FOUND = "End of central directory not found";
exports.ERR_EOCDR_NOT_FOUND = ERR_EOCDR_NOT_FOUND;
var ERR_EOCDR_ZIP64_NOT_FOUND = "End of Zip64 central directory not found";
exports.ERR_EOCDR_ZIP64_NOT_FOUND = ERR_EOCDR_ZIP64_NOT_FOUND;
var ERR_EOCDR_LOCATOR_ZIP64_NOT_FOUND = "End of Zip64 central directory locator not found";
exports.ERR_EOCDR_LOCATOR_ZIP64_NOT_FOUND = ERR_EOCDR_LOCATOR_ZIP64_NOT_FOUND;
var ERR_CENTRAL_DIRECTORY_NOT_FOUND = "Central directory header not found";
exports.ERR_CENTRAL_DIRECTORY_NOT_FOUND = ERR_CENTRAL_DIRECTORY_NOT_FOUND;
var ERR_LOCAL_FILE_HEADER_NOT_FOUND = "Local file header not found";
exports.ERR_LOCAL_FILE_HEADER_NOT_FOUND = ERR_LOCAL_FILE_HEADER_NOT_FOUND;
var ERR_EXTRAFIELD_ZIP64_NOT_FOUND = "Zip64 extra field not found";
exports.ERR_EXTRAFIELD_ZIP64_NOT_FOUND = ERR_EXTRAFIELD_ZIP64_NOT_FOUND;
var ERR_ENCRYPTED = "File contains encrypted entry";
exports.ERR_ENCRYPTED = ERR_ENCRYPTED;
var ERR_UNSUPPORTED_ENCRYPTION = "Encryption method not supported";
exports.ERR_UNSUPPORTED_ENCRYPTION = ERR_UNSUPPORTED_ENCRYPTION;
var ERR_UNSUPPORTED_COMPRESSION = "Compression method not supported";
exports.ERR_UNSUPPORTED_COMPRESSION = ERR_UNSUPPORTED_COMPRESSION;
var ERR_SPLIT_ZIP_FILE = "Split zip file";
exports.ERR_SPLIT_ZIP_FILE = ERR_SPLIT_ZIP_FILE;
var CHARSET_UTF8 = "utf-8";
var CHARSET_CP437 = "cp437";
var ZIP64_PROPERTIES = [[_zipEntry.PROPERTY_NAME_UNCOMPPRESSED_SIZE, _constants.MAX_32_BITS], [_zipEntry.PROPERTY_NAME_COMPPRESSED_SIZE, _constants.MAX_32_BITS], [_zipEntry.PROPERTY_NAME_OFFSET, _constants.MAX_32_BITS], [_zipEntry.PROPERTY_NAME_DISK_NUMBER_START, _constants.MAX_16_BITS]];
var ZIP64_EXTRACTION = (_ZIP64_EXTRACTION = {}, _defineProperty(_ZIP64_EXTRACTION, _constants.MAX_16_BITS, {
  getValue: getUint32,
  bytes: 4
}), _defineProperty(_ZIP64_EXTRACTION, _constants.MAX_32_BITS, {
  getValue: getBigUint64,
  bytes: 8
}), _ZIP64_EXTRACTION);
var ZipReader = /*#__PURE__*/function () {
  function ZipReader(reader) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, ZipReader);
    Object.assign(this, {
      reader: (0, _io.initReader)(reader),
      options: options,
      config: (0, _configuration.getConfiguration)()
    });
  }
  _createClass(ZipReader, [{
    key: "getEntriesGenerator",
    value: function getEntriesGenerator() {
      var _this = this;
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return _wrapAsyncGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var zipReader, reader, config, endOfDirectoryInfo, signatureArray, signatureView, endOfDirectoryView, directoryDataLength, directoryDataOffset, commentOffset, commentLength, appendedDataOffset, lastDiskNumber, expectedLastDiskNumber, diskNumber, filesLength, prependedDataLength, startOffset, endOfDirectoryLocatorArray, endOfDirectoryLocatorView, endOfDirectoryArray, _endOfDirectoryView, expectedDirectoryDataOffset, originalDirectoryDataOffset, offset, directoryArray, directoryView, _expectedDirectoryDataOffset, _originalDirectoryDataOffset, filenameEncoding, commentEncoding, _loop, indexFile, extractPrependedData, extractAppendedData;
        return _regeneratorRuntime().wrap(function _callee$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              zipReader = _this;
              reader = zipReader.reader;
              config = zipReader.config;
              _context2.next = 5;
              return _awaitAsyncGenerator((0, _io.initStream)(reader));
            case 5:
              if (!(reader.size === _constants.UNDEFINED_VALUE || !reader.readUint8Array)) {
                _context2.next = 13;
                break;
              }
              _context2.t0 = _io.BlobReader;
              _context2.next = 9;
              return _awaitAsyncGenerator(new Response(reader.readable).blob());
            case 9:
              _context2.t1 = _context2.sent;
              reader = new _context2.t0(_context2.t1);
              _context2.next = 13;
              return _awaitAsyncGenerator((0, _io.initStream)(reader));
            case 13:
              if (!(reader.size < _constants.END_OF_CENTRAL_DIR_LENGTH)) {
                _context2.next = 15;
                break;
              }
              throw new Error(ERR_BAD_FORMAT);
            case 15:
              reader.chunkSize = (0, _configuration.getChunkSize)(config);
              _context2.next = 18;
              return _awaitAsyncGenerator(seekSignature(reader, _constants.END_OF_CENTRAL_DIR_SIGNATURE, reader.size, _constants.END_OF_CENTRAL_DIR_LENGTH, _constants.MAX_16_BITS * 16));
            case 18:
              endOfDirectoryInfo = _context2.sent;
              if (endOfDirectoryInfo) {
                _context2.next = 29;
                break;
              }
              _context2.next = 22;
              return _awaitAsyncGenerator((0, _io.readUint8Array)(reader, 0, 4));
            case 22:
              signatureArray = _context2.sent;
              signatureView = getDataView(signatureArray);
              if (!(getUint32(signatureView) == _constants.SPLIT_ZIP_FILE_SIGNATURE)) {
                _context2.next = 28;
                break;
              }
              throw new Error(ERR_SPLIT_ZIP_FILE);
            case 28:
              throw new Error(ERR_EOCDR_NOT_FOUND);
            case 29:
              endOfDirectoryView = getDataView(endOfDirectoryInfo);
              directoryDataLength = getUint32(endOfDirectoryView, 12);
              directoryDataOffset = getUint32(endOfDirectoryView, 16);
              commentOffset = endOfDirectoryInfo.offset;
              commentLength = getUint16(endOfDirectoryView, 20);
              appendedDataOffset = commentOffset + _constants.END_OF_CENTRAL_DIR_LENGTH + commentLength;
              lastDiskNumber = getUint16(endOfDirectoryView, 4);
              expectedLastDiskNumber = reader.lastDiskNumber || 0;
              diskNumber = getUint16(endOfDirectoryView, 6);
              filesLength = getUint16(endOfDirectoryView, 8);
              prependedDataLength = 0;
              startOffset = 0;
              if (!(directoryDataOffset == _constants.MAX_32_BITS || directoryDataLength == _constants.MAX_32_BITS || filesLength == _constants.MAX_16_BITS || diskNumber == _constants.MAX_16_BITS)) {
                _context2.next = 69;
                break;
              }
              _context2.next = 44;
              return _awaitAsyncGenerator((0, _io.readUint8Array)(reader, endOfDirectoryInfo.offset - _constants.ZIP64_END_OF_CENTRAL_DIR_LOCATOR_LENGTH, _constants.ZIP64_END_OF_CENTRAL_DIR_LOCATOR_LENGTH));
            case 44:
              endOfDirectoryLocatorArray = _context2.sent;
              endOfDirectoryLocatorView = getDataView(endOfDirectoryLocatorArray);
              if (!(getUint32(endOfDirectoryLocatorView, 0) != _constants.ZIP64_END_OF_CENTRAL_DIR_LOCATOR_SIGNATURE)) {
                _context2.next = 48;
                break;
              }
              throw new Error(ERR_EOCDR_ZIP64_NOT_FOUND);
            case 48:
              directoryDataOffset = getBigUint64(endOfDirectoryLocatorView, 8);
              _context2.next = 51;
              return _awaitAsyncGenerator((0, _io.readUint8Array)(reader, directoryDataOffset, _constants.ZIP64_END_OF_CENTRAL_DIR_LENGTH, -1));
            case 51:
              endOfDirectoryArray = _context2.sent;
              _endOfDirectoryView = getDataView(endOfDirectoryArray);
              expectedDirectoryDataOffset = endOfDirectoryInfo.offset - _constants.ZIP64_END_OF_CENTRAL_DIR_LOCATOR_LENGTH - _constants.ZIP64_END_OF_CENTRAL_DIR_LENGTH;
              if (!(getUint32(_endOfDirectoryView, 0) != _constants.ZIP64_END_OF_CENTRAL_DIR_SIGNATURE && directoryDataOffset != expectedDirectoryDataOffset)) {
                _context2.next = 62;
                break;
              }
              originalDirectoryDataOffset = directoryDataOffset;
              directoryDataOffset = expectedDirectoryDataOffset;
              prependedDataLength = directoryDataOffset - originalDirectoryDataOffset;
              _context2.next = 60;
              return _awaitAsyncGenerator((0, _io.readUint8Array)(reader, directoryDataOffset, _constants.ZIP64_END_OF_CENTRAL_DIR_LENGTH, -1));
            case 60:
              endOfDirectoryArray = _context2.sent;
              _endOfDirectoryView = getDataView(endOfDirectoryArray);
            case 62:
              if (!(getUint32(_endOfDirectoryView, 0) != _constants.ZIP64_END_OF_CENTRAL_DIR_SIGNATURE)) {
                _context2.next = 64;
                break;
              }
              throw new Error(ERR_EOCDR_LOCATOR_ZIP64_NOT_FOUND);
            case 64:
              if (lastDiskNumber == _constants.MAX_16_BITS) {
                lastDiskNumber = getUint32(_endOfDirectoryView, 16);
              }
              if (diskNumber == _constants.MAX_16_BITS) {
                diskNumber = getUint32(_endOfDirectoryView, 20);
              }
              if (filesLength == _constants.MAX_16_BITS) {
                filesLength = getBigUint64(_endOfDirectoryView, 32);
              }
              if (directoryDataLength == _constants.MAX_32_BITS) {
                directoryDataLength = getBigUint64(_endOfDirectoryView, 40);
              }
              directoryDataOffset -= directoryDataLength;
            case 69:
              if (!(expectedLastDiskNumber != lastDiskNumber)) {
                _context2.next = 71;
                break;
              }
              throw new Error(ERR_SPLIT_ZIP_FILE);
            case 71:
              if (!(directoryDataOffset < 0 || directoryDataOffset >= reader.size)) {
                _context2.next = 73;
                break;
              }
              throw new Error(ERR_BAD_FORMAT);
            case 73:
              offset = 0;
              _context2.next = 76;
              return _awaitAsyncGenerator((0, _io.readUint8Array)(reader, directoryDataOffset, directoryDataLength, diskNumber));
            case 76:
              directoryArray = _context2.sent;
              directoryView = getDataView(directoryArray);
              if (!directoryDataLength) {
                _context2.next = 88;
                break;
              }
              _expectedDirectoryDataOffset = endOfDirectoryInfo.offset - directoryDataLength;
              if (!(getUint32(directoryView, offset) != _constants.CENTRAL_FILE_HEADER_SIGNATURE && directoryDataOffset != _expectedDirectoryDataOffset)) {
                _context2.next = 88;
                break;
              }
              _originalDirectoryDataOffset = directoryDataOffset;
              directoryDataOffset = _expectedDirectoryDataOffset;
              prependedDataLength = directoryDataOffset - _originalDirectoryDataOffset;
              _context2.next = 86;
              return _awaitAsyncGenerator((0, _io.readUint8Array)(reader, directoryDataOffset, directoryDataLength, diskNumber));
            case 86:
              directoryArray = _context2.sent;
              directoryView = getDataView(directoryArray);
            case 88:
              if (!(directoryDataOffset < 0 || directoryDataOffset >= reader.size)) {
                _context2.next = 90;
                break;
              }
              throw new Error(ERR_BAD_FORMAT);
            case 90:
              filenameEncoding = getOptionValue(zipReader, options, "filenameEncoding");
              commentEncoding = getOptionValue(zipReader, options, "commentEncoding");
              _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
                var fileEntry, languageEncodingFlag, filenameOffset, extraFieldOffset, commentOffset, versionMadeBy, msDosCompatible, rawFilename, commentLength, endOffset, rawComment, filenameUTF8, commentUTF8, directory, offsetFileEntry, _yield$_awaitAsyncGen, _yield$_awaitAsyncGen2, filename, comment, entry, onprogress;
                return _regeneratorRuntime().wrap(function _loop$(_context) {
                  while (1) switch (_context.prev = _context.next) {
                    case 0:
                      fileEntry = new ZipEntry(reader, config, zipReader.options);
                      if (!(getUint32(directoryView, offset) != _constants.CENTRAL_FILE_HEADER_SIGNATURE)) {
                        _context.next = 3;
                        break;
                      }
                      throw new Error(ERR_CENTRAL_DIRECTORY_NOT_FOUND);
                    case 3:
                      readCommonHeader(fileEntry, directoryView, offset + 6);
                      languageEncodingFlag = Boolean(fileEntry.bitFlag.languageEncodingFlag);
                      filenameOffset = offset + 46;
                      extraFieldOffset = filenameOffset + fileEntry.filenameLength;
                      commentOffset = extraFieldOffset + fileEntry.extraFieldLength;
                      versionMadeBy = getUint16(directoryView, offset + 4);
                      msDosCompatible = (versionMadeBy & 0) == 0;
                      rawFilename = directoryArray.subarray(filenameOffset, extraFieldOffset);
                      commentLength = getUint16(directoryView, offset + 32);
                      endOffset = commentOffset + commentLength;
                      rawComment = directoryArray.subarray(commentOffset, endOffset);
                      filenameUTF8 = languageEncodingFlag;
                      commentUTF8 = languageEncodingFlag;
                      directory = msDosCompatible && (getUint8(directoryView, offset + 38) & _constants.FILE_ATTR_MSDOS_DIR_MASK) == _constants.FILE_ATTR_MSDOS_DIR_MASK;
                      offsetFileEntry = getUint32(directoryView, offset + 42) + prependedDataLength;
                      Object.assign(fileEntry, {
                        versionMadeBy: versionMadeBy,
                        msDosCompatible: msDosCompatible,
                        compressedSize: 0,
                        uncompressedSize: 0,
                        commentLength: commentLength,
                        directory: directory,
                        offset: offsetFileEntry,
                        diskNumberStart: getUint16(directoryView, offset + 34),
                        internalFileAttribute: getUint16(directoryView, offset + 36),
                        externalFileAttribute: getUint32(directoryView, offset + 38),
                        rawFilename: rawFilename,
                        filenameUTF8: filenameUTF8,
                        commentUTF8: commentUTF8,
                        rawExtraField: directoryArray.subarray(extraFieldOffset, commentOffset)
                      });
                      _context.next = 21;
                      return _awaitAsyncGenerator(Promise.all([(0, _decodeText.decodeText)(rawFilename, filenameUTF8 ? CHARSET_UTF8 : filenameEncoding || CHARSET_CP437), (0, _decodeText.decodeText)(rawComment, commentUTF8 ? CHARSET_UTF8 : commentEncoding || CHARSET_CP437)]));
                    case 21:
                      _yield$_awaitAsyncGen = _context.sent;
                      _yield$_awaitAsyncGen2 = _slicedToArray(_yield$_awaitAsyncGen, 2);
                      filename = _yield$_awaitAsyncGen2[0];
                      comment = _yield$_awaitAsyncGen2[1];
                      Object.assign(fileEntry, {
                        rawComment: rawComment,
                        filename: filename,
                        comment: comment,
                        directory: directory || filename.endsWith(_constants.DIRECTORY_SIGNATURE)
                      });
                      startOffset = Math.max(offsetFileEntry, startOffset);
                      _context.next = 29;
                      return _awaitAsyncGenerator(readCommonFooter(fileEntry, fileEntry, directoryView, offset + 6));
                    case 29:
                      entry = new _zipEntry.Entry(fileEntry);
                      entry.getData = function (writer, options) {
                        return fileEntry.getData(writer, entry, options);
                      };
                      offset = endOffset;
                      onprogress = options.onprogress;
                      if (!onprogress) {
                        _context.next = 41;
                        break;
                      }
                      _context.prev = 34;
                      _context.next = 37;
                      return _awaitAsyncGenerator(onprogress(indexFile + 1, filesLength, new _zipEntry.Entry(fileEntry)));
                    case 37:
                      _context.next = 41;
                      break;
                    case 39:
                      _context.prev = 39;
                      _context.t0 = _context["catch"](34);
                    case 41:
                      _context.next = 43;
                      return entry;
                    case 43:
                    case "end":
                      return _context.stop();
                  }
                }, _loop, null, [[34, 39]]);
              });
              indexFile = 0;
            case 94:
              if (!(indexFile < filesLength)) {
                _context2.next = 99;
                break;
              }
              return _context2.delegateYield(_loop(), "t2", 96);
            case 96:
              indexFile++;
              _context2.next = 94;
              break;
            case 99:
              extractPrependedData = getOptionValue(zipReader, options, "extractPrependedData");
              extractAppendedData = getOptionValue(zipReader, options, "extractAppendedData");
              if (!extractPrependedData) {
                _context2.next = 110;
                break;
              }
              if (!(startOffset > 0)) {
                _context2.next = 108;
                break;
              }
              _context2.next = 105;
              return _awaitAsyncGenerator((0, _io.readUint8Array)(reader, 0, startOffset));
            case 105:
              _context2.t3 = _context2.sent;
              _context2.next = 109;
              break;
            case 108:
              _context2.t3 = new Uint8Array();
            case 109:
              zipReader.prependedData = _context2.t3;
            case 110:
              if (!commentLength) {
                _context2.next = 116;
                break;
              }
              _context2.next = 113;
              return _awaitAsyncGenerator((0, _io.readUint8Array)(reader, commentOffset + _constants.END_OF_CENTRAL_DIR_LENGTH, commentLength));
            case 113:
              _context2.t4 = _context2.sent;
              _context2.next = 117;
              break;
            case 116:
              _context2.t4 = new Uint8Array();
            case 117:
              zipReader.comment = _context2.t4;
              if (!extractAppendedData) {
                _context2.next = 127;
                break;
              }
              if (!(appendedDataOffset < reader.size)) {
                _context2.next = 125;
                break;
              }
              _context2.next = 122;
              return _awaitAsyncGenerator((0, _io.readUint8Array)(reader, appendedDataOffset, reader.size - appendedDataOffset));
            case 122:
              _context2.t5 = _context2.sent;
              _context2.next = 126;
              break;
            case 125:
              _context2.t5 = new Uint8Array();
            case 126:
              zipReader.appendedData = _context2.t5;
            case 127:
              return _context2.abrupt("return", true);
            case 128:
            case "end":
              return _context2.stop();
          }
        }, _callee);
      }))();
    }
  }, {
    key: "getEntries",
    value: function () {
      var _getEntries = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var options,
          entries,
          _iteratorAbruptCompletion,
          _didIteratorError,
          _iteratorError,
          _iterator,
          _step,
          entry,
          _args3 = arguments;
        return _regeneratorRuntime().wrap(function _callee2$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              options = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
              entries = [];
              _iteratorAbruptCompletion = false;
              _didIteratorError = false;
              _context3.prev = 4;
              _iterator = _asyncIterator(this.getEntriesGenerator(options));
            case 6:
              _context3.next = 8;
              return _iterator.next();
            case 8:
              if (!(_iteratorAbruptCompletion = !(_step = _context3.sent).done)) {
                _context3.next = 14;
                break;
              }
              entry = _step.value;
              entries.push(entry);
            case 11:
              _iteratorAbruptCompletion = false;
              _context3.next = 6;
              break;
            case 14:
              _context3.next = 20;
              break;
            case 16:
              _context3.prev = 16;
              _context3.t0 = _context3["catch"](4);
              _didIteratorError = true;
              _iteratorError = _context3.t0;
            case 20:
              _context3.prev = 20;
              _context3.prev = 21;
              if (!(_iteratorAbruptCompletion && _iterator.return != null)) {
                _context3.next = 25;
                break;
              }
              _context3.next = 25;
              return _iterator.return();
            case 25:
              _context3.prev = 25;
              if (!_didIteratorError) {
                _context3.next = 28;
                break;
              }
              throw _iteratorError;
            case 28:
              return _context3.finish(25);
            case 29:
              return _context3.finish(20);
            case 30:
              return _context3.abrupt("return", entries);
            case 31:
            case "end":
              return _context3.stop();
          }
        }, _callee2, this, [[4, 16, 20, 30], [21,, 25, 29]]);
      }));
      function getEntries() {
        return _getEntries.apply(this, arguments);
      }
      return getEntries;
    }()
  }, {
    key: "close",
    value: function () {
      var _close = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        return _regeneratorRuntime().wrap(function _callee3$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
            case "end":
              return _context4.stop();
          }
        }, _callee3);
      }));
      function close() {
        return _close.apply(this, arguments);
      }
      return close;
    }()
  }]);
  return ZipReader;
}();
exports.ZipReader = ZipReader;
var ZipEntry = /*#__PURE__*/function () {
  function ZipEntry(reader, config, options) {
    _classCallCheck(this, ZipEntry);
    Object.assign(this, {
      reader: reader,
      config: config,
      options: options
    });
  }
  _createClass(ZipEntry, [{
    key: "getData",
    value: function () {
      var _getData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(writer, fileEntry) {
        var options,
          zipEntry,
          reader,
          offset,
          diskNumberStart,
          extraFieldAES,
          compressionMethod,
          config,
          bitFlag,
          signature,
          rawLastModDate,
          uncompressedSize,
          compressedSize,
          localDirectory,
          dataArray,
          dataView,
          password,
          encrypted,
          zipCrypto,
          dataOffset,
          readable,
          size,
          signal,
          _writer,
          writable,
          onstart,
          onprogress,
          onend,
          workerOptions,
          preventClose,
          _args5 = arguments;
        return _regeneratorRuntime().wrap(function _callee4$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              options = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : {};
              zipEntry = this;
              reader = zipEntry.reader, offset = zipEntry.offset, diskNumberStart = zipEntry.diskNumberStart, extraFieldAES = zipEntry.extraFieldAES, compressionMethod = zipEntry.compressionMethod, config = zipEntry.config, bitFlag = zipEntry.bitFlag, signature = zipEntry.signature, rawLastModDate = zipEntry.rawLastModDate, uncompressedSize = zipEntry.uncompressedSize, compressedSize = zipEntry.compressedSize;
              localDirectory = zipEntry.localDirectory = {};
              _context5.next = 6;
              return (0, _io.readUint8Array)(reader, offset, 30, diskNumberStart);
            case 6:
              dataArray = _context5.sent;
              dataView = getDataView(dataArray);
              password = getOptionValue(zipEntry, options, "password");
              password = password && password.length && password;
              if (!extraFieldAES) {
                _context5.next = 13;
                break;
              }
              if (!(extraFieldAES.originalCompressionMethod != _constants.COMPRESSION_METHOD_AES)) {
                _context5.next = 13;
                break;
              }
              throw new Error(ERR_UNSUPPORTED_COMPRESSION);
            case 13:
              if (!(compressionMethod != _constants.COMPRESSION_METHOD_STORE && compressionMethod != _constants.COMPRESSION_METHOD_DEFLATE)) {
                _context5.next = 15;
                break;
              }
              throw new Error(ERR_UNSUPPORTED_COMPRESSION);
            case 15:
              if (!(getUint32(dataView, 0) != _constants.LOCAL_FILE_HEADER_SIGNATURE)) {
                _context5.next = 17;
                break;
              }
              throw new Error(ERR_LOCAL_FILE_HEADER_NOT_FOUND);
            case 17:
              readCommonHeader(localDirectory, dataView, 4);
              if (!localDirectory.extraFieldLength) {
                _context5.next = 24;
                break;
              }
              _context5.next = 21;
              return (0, _io.readUint8Array)(reader, offset + 30 + localDirectory.filenameLength, localDirectory.extraFieldLength, diskNumberStart);
            case 21:
              _context5.t0 = _context5.sent;
              _context5.next = 25;
              break;
            case 24:
              _context5.t0 = new Uint8Array();
            case 25:
              localDirectory.rawExtraField = _context5.t0;
              _context5.next = 28;
              return readCommonFooter(zipEntry, localDirectory, dataView, 4);
            case 28:
              Object.assign(fileEntry, {
                lastAccessDate: localDirectory.lastAccessDate,
                creationDate: localDirectory.creationDate
              });
              encrypted = zipEntry.encrypted && localDirectory.encrypted;
              zipCrypto = encrypted && !extraFieldAES;
              if (!encrypted) {
                _context5.next = 38;
                break;
              }
              if (!(!zipCrypto && extraFieldAES.strength === _constants.UNDEFINED_VALUE)) {
                _context5.next = 36;
                break;
              }
              throw new Error(ERR_UNSUPPORTED_ENCRYPTION);
            case 36:
              if (password) {
                _context5.next = 38;
                break;
              }
              throw new Error(ERR_ENCRYPTED);
            case 38:
              dataOffset = offset + 30 + localDirectory.filenameLength + localDirectory.extraFieldLength;
              readable = reader.readable;
              readable.diskNumberStart = diskNumberStart;
              readable.offset = dataOffset;
              size = readable.size = compressedSize;
              signal = getOptionValue(zipEntry, options, "signal");
              writer = (0, _io.initWriter)(writer);
              _context5.next = 47;
              return (0, _io.initStream)(writer, uncompressedSize);
            case 47:
              _writer = writer, writable = _writer.writable;
              onstart = options.onstart, onprogress = options.onprogress, onend = options.onend;
              workerOptions = {
                options: {
                  codecType: _codecPool.CODEC_INFLATE,
                  password: password,
                  zipCrypto: zipCrypto,
                  encryptionStrength: extraFieldAES && extraFieldAES.strength,
                  signed: getOptionValue(zipEntry, options, "checkSignature"),
                  passwordVerification: zipCrypto && (bitFlag.dataDescriptor ? rawLastModDate >>> 8 & 0xFF : signature >>> 24 & 0xFF),
                  signature: signature,
                  compressed: compressionMethod != 0,
                  encrypted: encrypted,
                  useWebWorkers: getOptionValue(zipEntry, options, "useWebWorkers"),
                  useCompressionStream: getOptionValue(zipEntry, options, "useCompressionStream"),
                  transferStreams: getOptionValue(zipEntry, options, "transferStreams")
                },
                config: config,
                streamOptions: {
                  signal: signal,
                  size: size,
                  onstart: onstart,
                  onprogress: onprogress,
                  onend: onend
                }
              };
              _context5.t1 = writable.size;
              _context5.next = 53;
              return (0, _codecPool.runWorker)({
                readable: readable,
                writable: writable
              }, workerOptions);
            case 53:
              writable.size = _context5.t1 += _context5.sent.size;
              preventClose = getOptionValue(zipEntry, options, "preventClose");
              if (preventClose) {
                _context5.next = 58;
                break;
              }
              _context5.next = 58;
              return writable.close();
            case 58:
              return _context5.abrupt("return", writer.getData ? writer.getData() : writable);
            case 59:
            case "end":
              return _context5.stop();
          }
        }, _callee4, this);
      }));
      function getData(_x2, _x3) {
        return _getData.apply(this, arguments);
      }
      return getData;
    }()
  }]);
  return ZipEntry;
}();
function readCommonHeader(directory, dataView, offset) {
  var rawBitFlag = directory.rawBitFlag = getUint16(dataView, offset + 2);
  var encrypted = (rawBitFlag & _constants.BITFLAG_ENCRYPTED) == _constants.BITFLAG_ENCRYPTED;
  var rawLastModDate = getUint32(dataView, offset + 6);
  Object.assign(directory, {
    encrypted: encrypted,
    version: getUint16(dataView, offset),
    bitFlag: {
      level: (rawBitFlag & _constants.BITFLAG_LEVEL) >> 1,
      dataDescriptor: (rawBitFlag & _constants.BITFLAG_DATA_DESCRIPTOR) == _constants.BITFLAG_DATA_DESCRIPTOR,
      languageEncodingFlag: (rawBitFlag & _constants.BITFLAG_LANG_ENCODING_FLAG) == _constants.BITFLAG_LANG_ENCODING_FLAG
    },
    rawLastModDate: rawLastModDate,
    lastModDate: getDate(rawLastModDate),
    filenameLength: getUint16(dataView, offset + 22),
    extraFieldLength: getUint16(dataView, offset + 24)
  });
}
function readCommonFooter(_x4, _x5, _x6, _x7) {
  return _readCommonFooter.apply(this, arguments);
}
function _readCommonFooter() {
  _readCommonFooter = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(fileEntry, directory, dataView, offset) {
    var rawExtraField, extraField, rawExtraFieldView, offsetExtraField, type, size, compressionMethod, extraFieldZip64, extraFieldUnicodePath, extraFieldUnicodeComment, extraFieldAES, extraFieldNTFS, extraFieldExtendedTimestamp;
    return _regeneratorRuntime().wrap(function _callee5$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          rawExtraField = directory.rawExtraField;
          extraField = directory.extraField = new Map();
          rawExtraFieldView = getDataView(new Uint8Array(rawExtraField));
          offsetExtraField = 0;
          try {
            while (offsetExtraField < rawExtraField.length) {
              type = getUint16(rawExtraFieldView, offsetExtraField);
              size = getUint16(rawExtraFieldView, offsetExtraField + 2);
              extraField.set(type, {
                type: type,
                data: rawExtraField.slice(offsetExtraField + 4, offsetExtraField + 4 + size)
              });
              offsetExtraField += 4 + size;
            }
          } catch (_error) {
            // ignored
          }
          compressionMethod = getUint16(dataView, offset + 4);
          Object.assign(directory, {
            signature: getUint32(dataView, offset + 10),
            uncompressedSize: getUint32(dataView, offset + 18),
            compressedSize: getUint32(dataView, offset + 14)
          });
          extraFieldZip64 = extraField.get(_constants.EXTRAFIELD_TYPE_ZIP64);
          if (extraFieldZip64) {
            readExtraFieldZip64(extraFieldZip64, directory);
            directory.extraFieldZip64 = extraFieldZip64;
          }
          extraFieldUnicodePath = extraField.get(_constants.EXTRAFIELD_TYPE_UNICODE_PATH);
          if (!extraFieldUnicodePath) {
            _context6.next = 14;
            break;
          }
          _context6.next = 13;
          return readExtraFieldUnicode(extraFieldUnicodePath, _zipEntry.PROPERTY_NAME_FILENAME, _zipEntry.PROPERTY_NAME_RAW_FILENAME, directory, fileEntry);
        case 13:
          directory.extraFieldUnicodePath = extraFieldUnicodePath;
        case 14:
          extraFieldUnicodeComment = extraField.get(_constants.EXTRAFIELD_TYPE_UNICODE_COMMENT);
          if (!extraFieldUnicodeComment) {
            _context6.next = 19;
            break;
          }
          _context6.next = 18;
          return readExtraFieldUnicode(extraFieldUnicodeComment, _zipEntry.PROPERTY_NAME_COMMENT, _zipEntry.PROPERTY_NAME_RAW_COMMENT, directory, fileEntry);
        case 18:
          directory.extraFieldUnicodeComment = extraFieldUnicodeComment;
        case 19:
          extraFieldAES = extraField.get(_constants.EXTRAFIELD_TYPE_AES);
          if (extraFieldAES) {
            readExtraFieldAES(extraFieldAES, directory, compressionMethod);
            directory.extraFieldAES = extraFieldAES;
          } else {
            directory.compressionMethod = compressionMethod;
          }
          extraFieldNTFS = extraField.get(_constants.EXTRAFIELD_TYPE_NTFS);
          if (extraFieldNTFS) {
            readExtraFieldNTFS(extraFieldNTFS, directory);
            directory.extraFieldNTFS = extraFieldNTFS;
          }
          extraFieldExtendedTimestamp = extraField.get(_constants.EXTRAFIELD_TYPE_EXTENDED_TIMESTAMP);
          if (extraFieldExtendedTimestamp) {
            readExtraFieldExtendedTimestamp(extraFieldExtendedTimestamp, directory);
            directory.extraFieldExtendedTimestamp = extraFieldExtendedTimestamp;
          }
        case 25:
        case "end":
          return _context6.stop();
      }
    }, _callee5);
  }));
  return _readCommonFooter.apply(this, arguments);
}
function readExtraFieldZip64(extraFieldZip64, directory) {
  directory.zip64 = true;
  var extraFieldView = getDataView(extraFieldZip64.data);
  var missingProperties = ZIP64_PROPERTIES.filter(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      propertyName = _ref2[0],
      max = _ref2[1];
    return directory[propertyName] == max;
  });
  for (var indexMissingProperty = 0, offset = 0; indexMissingProperty < missingProperties.length; indexMissingProperty++) {
    var _missingProperties$in = _slicedToArray(missingProperties[indexMissingProperty], 2),
      propertyName = _missingProperties$in[0],
      max = _missingProperties$in[1];
    if (directory[propertyName] == max) {
      var extraction = ZIP64_EXTRACTION[max];
      directory[propertyName] = extraFieldZip64[propertyName] = extraction.getValue(extraFieldView, offset);
      offset += extraction.bytes;
    } else if (extraFieldZip64[propertyName]) {
      throw new Error(ERR_EXTRAFIELD_ZIP64_NOT_FOUND);
    }
  }
}
function readExtraFieldUnicode(_x8, _x9, _x10, _x11, _x12) {
  return _readExtraFieldUnicode.apply(this, arguments);
}
function _readExtraFieldUnicode() {
  _readExtraFieldUnicode = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(extraFieldUnicode, propertyName, rawPropertyName, directory, fileEntry) {
    var _Object$assign;
    var extraFieldView, crc32, dataViewSignature;
    return _regeneratorRuntime().wrap(function _callee6$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          extraFieldView = getDataView(extraFieldUnicode.data);
          crc32 = new _crc.Crc32();
          crc32.append(fileEntry[rawPropertyName]);
          dataViewSignature = getDataView(new Uint8Array(4));
          dataViewSignature.setUint32(0, crc32.get(), true);
          _context7.t0 = Object;
          _context7.t1 = extraFieldUnicode;
          _Object$assign = {
            version: getUint8(extraFieldView, 0),
            signature: getUint32(extraFieldView, 1)
          };
          _context7.t2 = _defineProperty;
          _context7.t3 = _Object$assign;
          _context7.t4 = propertyName;
          _context7.next = 13;
          return (0, _decodeText.decodeText)(extraFieldUnicode.data.subarray(5));
        case 13:
          _context7.t5 = _context7.sent;
          (0, _context7.t2)(_context7.t3, _context7.t4, _context7.t5);
          _defineProperty(_Object$assign, "valid", !fileEntry.bitFlag.languageEncodingFlag && extraFieldUnicode.signature == getUint32(dataViewSignature, 0));
          _context7.t6 = _Object$assign;
          _context7.t0.assign.call(_context7.t0, _context7.t1, _context7.t6);
          if (extraFieldUnicode.valid) {
            directory[propertyName] = extraFieldUnicode[propertyName];
            directory[propertyName + "UTF8"] = true;
          }
        case 19:
        case "end":
          return _context7.stop();
      }
    }, _callee6);
  }));
  return _readExtraFieldUnicode.apply(this, arguments);
}
function readExtraFieldAES(extraFieldAES, directory, compressionMethod) {
  var extraFieldView = getDataView(extraFieldAES.data);
  var strength = getUint8(extraFieldView, 4);
  Object.assign(extraFieldAES, {
    vendorVersion: getUint8(extraFieldView, 0),
    vendorId: getUint8(extraFieldView, 2),
    strength: strength,
    originalCompressionMethod: compressionMethod,
    compressionMethod: getUint16(extraFieldView, 5)
  });
  directory.compressionMethod = extraFieldAES.compressionMethod;
}
function readExtraFieldNTFS(extraFieldNTFS, directory) {
  var extraFieldView = getDataView(extraFieldNTFS.data);
  var offsetExtraField = 4;
  var tag1Data;
  try {
    while (offsetExtraField < extraFieldNTFS.data.length && !tag1Data) {
      var tagValue = getUint16(extraFieldView, offsetExtraField);
      var attributeSize = getUint16(extraFieldView, offsetExtraField + 2);
      if (tagValue == _constants.EXTRAFIELD_TYPE_NTFS_TAG1) {
        tag1Data = extraFieldNTFS.data.slice(offsetExtraField + 4, offsetExtraField + 4 + attributeSize);
      }
      offsetExtraField += 4 + attributeSize;
    }
  } catch (_error) {
    // ignored
  }
  try {
    if (tag1Data && tag1Data.length == 24) {
      var tag1View = getDataView(tag1Data);
      var rawLastModDate = tag1View.getBigUint64(0, true);
      var rawLastAccessDate = tag1View.getBigUint64(8, true);
      var rawCreationDate = tag1View.getBigUint64(16, true);
      Object.assign(extraFieldNTFS, {
        rawLastModDate: rawLastModDate,
        rawLastAccessDate: rawLastAccessDate,
        rawCreationDate: rawCreationDate
      });
      var lastModDate = getDateNTFS(rawLastModDate);
      var lastAccessDate = getDateNTFS(rawLastAccessDate);
      var creationDate = getDateNTFS(rawCreationDate);
      var extraFieldData = {
        lastModDate: lastModDate,
        lastAccessDate: lastAccessDate,
        creationDate: creationDate
      };
      Object.assign(extraFieldNTFS, extraFieldData);
      Object.assign(directory, extraFieldData);
    }
  } catch (_error) {
    // ignored
  }
}
function readExtraFieldExtendedTimestamp(extraFieldExtendedTimestamp, directory) {
  var extraFieldView = getDataView(extraFieldExtendedTimestamp.data);
  var flags = getUint8(extraFieldView, 0);
  var timeProperties = [];
  var timeRawProperties = [];
  if ((flags & 0x1) == 0x1) {
    timeProperties.push(_zipEntry.PROPERTY_NAME_LAST_MODIFICATION_DATE);
    timeRawProperties.push(_zipEntry.PROPERTY_NAME_RAW_LAST_MODIFICATION_DATE);
  }
  if ((flags & 0x2) == 0x2) {
    timeProperties.push(_zipEntry.PROPERTY_NAME_LAST_ACCESS_DATE);
    timeRawProperties.push(_zipEntry.PROPERTY_NAME_RAW_LAST_ACCESS_DATE);
  }
  if ((flags & 0x4) == 0x4) {
    timeProperties.push(_zipEntry.PROPERTY_NAME_CREATION_DATE);
    timeRawProperties.push(_zipEntry.PROPERTY_NAME_RAW_CREATION_DATE);
  }
  var offset = 1;
  timeProperties.forEach(function (propertyName, indexProperty) {
    if (extraFieldExtendedTimestamp.data.length >= offset + 4) {
      var time = getUint32(extraFieldView, offset);
      directory[propertyName] = extraFieldExtendedTimestamp[propertyName] = new Date(time * 1000);
      var rawPropertyName = timeRawProperties[indexProperty];
      extraFieldExtendedTimestamp[rawPropertyName] = time;
    }
    offset += 4;
  });
}
function seekSignature(_x13, _x14, _x15, _x16, _x17) {
  return _seekSignature.apply(this, arguments);
}
function _seekSignature() {
  _seekSignature = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(reader, signature, startOffset, minimumBytes, maximumLength) {
    var signatureArray, signatureView, maximumBytes, seek, _seek;
    return _regeneratorRuntime().wrap(function _callee8$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _seek = function _seek3() {
            _seek = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(length) {
              var offset, bytes, indexByte;
              return _regeneratorRuntime().wrap(function _callee7$(_context8) {
                while (1) switch (_context8.prev = _context8.next) {
                  case 0:
                    offset = startOffset - length;
                    _context8.next = 3;
                    return (0, _io.readUint8Array)(reader, offset, length);
                  case 3:
                    bytes = _context8.sent;
                    indexByte = bytes.length - minimumBytes;
                  case 5:
                    if (!(indexByte >= 0)) {
                      _context8.next = 11;
                      break;
                    }
                    if (!(bytes[indexByte] == signatureArray[0] && bytes[indexByte + 1] == signatureArray[1] && bytes[indexByte + 2] == signatureArray[2] && bytes[indexByte + 3] == signatureArray[3])) {
                      _context8.next = 8;
                      break;
                    }
                    return _context8.abrupt("return", {
                      offset: offset + indexByte,
                      buffer: bytes.slice(indexByte, indexByte + minimumBytes).buffer
                    });
                  case 8:
                    indexByte--;
                    _context8.next = 5;
                    break;
                  case 11:
                  case "end":
                    return _context8.stop();
                }
              }, _callee7);
            }));
            return _seek.apply(this, arguments);
          };
          seek = function _seek2(_x18) {
            return _seek.apply(this, arguments);
          };
          signatureArray = new Uint8Array(4);
          signatureView = getDataView(signatureArray);
          setUint32(signatureView, 0, signature);
          maximumBytes = minimumBytes + maximumLength;
          _context9.next = 8;
          return seek(minimumBytes);
        case 8:
          _context9.t0 = _context9.sent;
          if (_context9.t0) {
            _context9.next = 13;
            break;
          }
          _context9.next = 12;
          return seek(Math.min(maximumBytes, startOffset));
        case 12:
          _context9.t0 = _context9.sent;
        case 13:
          return _context9.abrupt("return", _context9.t0);
        case 14:
        case "end":
          return _context9.stop();
      }
    }, _callee8);
  }));
  return _seekSignature.apply(this, arguments);
}
function getOptionValue(zipReader, options, name) {
  return options[name] === _constants.UNDEFINED_VALUE ? zipReader.options[name] : options[name];
}
function getDate(timeRaw) {
  var date = (timeRaw & 0xffff0000) >> 16,
    time = timeRaw & 0x0000ffff;
  try {
    return new Date(1980 + ((date & 0xFE00) >> 9), ((date & 0x01E0) >> 5) - 1, date & 0x001F, (time & 0xF800) >> 11, (time & 0x07E0) >> 5, (time & 0x001F) * 2, 0);
  } catch (_error) {
    // ignored
  }
}
function getDateNTFS(timeRaw) {
  return new Date(Number(timeRaw / BigInt(10000) - BigInt(11644473600000)));
}
function getUint8(view, offset) {
  return view.getUint8(offset);
}
function getUint16(view, offset) {
  return view.getUint16(offset, true);
}
function getUint32(view, offset) {
  return view.getUint32(offset, true);
}
function getBigUint64(view, offset) {
  return Number(view.getBigUint64(offset, true));
}
function setUint32(view, offset, value) {
  view.setUint32(offset, value, true);
}
function getDataView(array) {
  return new DataView(array.buffer);
}
},{"./constants.js":"../node_modules/@zip.js/zip.js/lib/core/constants.js","./configuration.js":"../node_modules/@zip.js/zip.js/lib/core/configuration.js","./codec-pool.js":"../node_modules/@zip.js/zip.js/lib/core/codec-pool.js","./io.js":"../node_modules/@zip.js/zip.js/lib/core/io.js","./util/decode-text.js":"../node_modules/@zip.js/zip.js/lib/core/util/decode-text.js","./streams/codecs/crc32.js":"../node_modules/@zip.js/zip.js/lib/core/streams/codecs/crc32.js","./zip-entry.js":"../node_modules/@zip.js/zip.js/lib/core/zip-entry.js"}],"../node_modules/@zip.js/zip.js/lib/core/zip-writer.js":[function(require,module,exports) {
var define;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ZipWriter = exports.ERR_UNSUPPORTED_FORMAT = exports.ERR_INVALID_VERSION = exports.ERR_INVALID_EXTRAFIELD_TYPE = exports.ERR_INVALID_EXTRAFIELD_DATA = exports.ERR_INVALID_ENTRY_NAME = exports.ERR_INVALID_ENTRY_COMMENT = exports.ERR_INVALID_ENCRYPTION_STRENGTH = exports.ERR_INVALID_COMMENT = exports.ERR_DUPLICATED_NAME = void 0;
var _constants = require("./constants.js");
var _configuration = require("./configuration.js");
var _codecPool = require("./codec-pool.js");
var _io = require("./io.js");
var _encodeText = require("./util/encode-text.js");
var _zipEntry = require("./zip-entry.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var ERR_DUPLICATED_NAME = "File already exists";
exports.ERR_DUPLICATED_NAME = ERR_DUPLICATED_NAME;
var ERR_INVALID_COMMENT = "Zip file comment exceeds 64KB";
exports.ERR_INVALID_COMMENT = ERR_INVALID_COMMENT;
var ERR_INVALID_ENTRY_COMMENT = "File entry comment exceeds 64KB";
exports.ERR_INVALID_ENTRY_COMMENT = ERR_INVALID_ENTRY_COMMENT;
var ERR_INVALID_ENTRY_NAME = "File entry name exceeds 64KB";
exports.ERR_INVALID_ENTRY_NAME = ERR_INVALID_ENTRY_NAME;
var ERR_INVALID_VERSION = "Version exceeds 65535";
exports.ERR_INVALID_VERSION = ERR_INVALID_VERSION;
var ERR_INVALID_ENCRYPTION_STRENGTH = "The strength must equal 1, 2, or 3";
exports.ERR_INVALID_ENCRYPTION_STRENGTH = ERR_INVALID_ENCRYPTION_STRENGTH;
var ERR_INVALID_EXTRAFIELD_TYPE = "Extra field type exceeds 65535";
exports.ERR_INVALID_EXTRAFIELD_TYPE = ERR_INVALID_EXTRAFIELD_TYPE;
var ERR_INVALID_EXTRAFIELD_DATA = "Extra field data exceeds 64KB";
exports.ERR_INVALID_EXTRAFIELD_DATA = ERR_INVALID_EXTRAFIELD_DATA;
var ERR_UNSUPPORTED_FORMAT = "Zip64 is not supported (make sure 'keepOrder' is set to 'true')";
exports.ERR_UNSUPPORTED_FORMAT = ERR_UNSUPPORTED_FORMAT;
var EXTRAFIELD_DATA_AES = new Uint8Array([0x07, 0x00, 0x02, 0x00, 0x41, 0x45, 0x03, 0x00, 0x00]);
var workers = 0;
var pendingEntries = [];
var ZipWriter = /*#__PURE__*/function () {
  function ZipWriter(writer) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, ZipWriter);
    writer = (0, _io.initWriter)(writer);
    Object.assign(this, {
      writer: writer,
      addSplitZipSignature: writer instanceof _io.SplitDataWriter,
      options: options,
      config: (0, _configuration.getConfiguration)(),
      files: new Map(),
      filenames: new Set(),
      offset: writer.writable.size,
      pendingEntriesSize: 0,
      pendingAddFileCalls: new Set(),
      bufferedWrites: 0
    });
  }
  _createClass(ZipWriter, [{
    key: "add",
    value: function () {
      var _add = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var name,
          reader,
          options,
          zipWriter,
          pendingAddFileCalls,
          config,
          promiseAddFile,
          pendingEntry,
          _args = arguments;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              name = _args.length > 0 && _args[0] !== undefined ? _args[0] : "";
              reader = _args.length > 1 ? _args[1] : undefined;
              options = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
              zipWriter = this;
              pendingAddFileCalls = zipWriter.pendingAddFileCalls, config = zipWriter.config;
              if (!(workers < config.maxWorkers)) {
                _context.next = 9;
                break;
              }
              workers++;
              _context.next = 11;
              break;
            case 9:
              _context.next = 11;
              return new Promise(function (resolve) {
                return pendingEntries.push(resolve);
              });
            case 11:
              _context.prev = 11;
              name = name.trim();
              if (!zipWriter.filenames.has(name)) {
                _context.next = 15;
                break;
              }
              throw new Error(ERR_DUPLICATED_NAME);
            case 15:
              zipWriter.filenames.add(name);
              promiseAddFile = addFile(zipWriter, name, reader, options);
              pendingAddFileCalls.add(promiseAddFile);
              _context.next = 20;
              return promiseAddFile;
            case 20:
              return _context.abrupt("return", _context.sent);
            case 23:
              _context.prev = 23;
              _context.t0 = _context["catch"](11);
              zipWriter.filenames.delete(name);
              throw _context.t0;
            case 27:
              _context.prev = 27;
              pendingAddFileCalls.delete(promiseAddFile);
              pendingEntry = pendingEntries.shift();
              if (pendingEntry) {
                pendingEntry();
              } else {
                workers--;
              }
              return _context.finish(27);
            case 32:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[11, 23, 27, 32]]);
      }));
      function add() {
        return _add.apply(this, arguments);
      }
      return add;
    }()
  }, {
    key: "close",
    value: function () {
      var _close = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var comment,
          options,
          zipWriter,
          pendingAddFileCalls,
          writer,
          writable,
          preventClose,
          _args2 = arguments;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              comment = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : new Uint8Array();
              options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
              zipWriter = this;
              pendingAddFileCalls = this.pendingAddFileCalls, writer = this.writer;
              writable = writer.writable;
            case 5:
              if (!pendingAddFileCalls.size) {
                _context2.next = 10;
                break;
              }
              _context2.next = 8;
              return Promise.all(Array.from(pendingAddFileCalls));
            case 8:
              _context2.next = 5;
              break;
            case 10:
              _context2.next = 12;
              return closeFile(this, comment, options);
            case 12:
              preventClose = getOptionValue(zipWriter, options, "preventClose");
              if (preventClose) {
                _context2.next = 16;
                break;
              }
              _context2.next = 16;
              return writable.close();
            case 16:
              return _context2.abrupt("return", writer.getData ? writer.getData() : writable);
            case 17:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function close() {
        return _close.apply(this, arguments);
      }
      return close;
    }()
  }]);
  return ZipWriter;
}();
exports.ZipWriter = ZipWriter;
function addFile(_x, _x2, _x3, _x4) {
  return _addFile.apply(this, arguments);
}
function _addFile() {
  _addFile = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(zipWriter, name, reader, options) {
    var rawFilename, comment, rawComment, version, versionMadeBy, lastModDate, lastAccessDate, creationDate, msDosCompatible, internalFileAttribute, externalFileAttribute, password, encryptionStrength, zipCrypto, extendedTimestamp, keepOrder, level, useWebWorkers, bufferedWrite, dataDescriptorSignature, signal, useCompressionStream, dataDescriptor, zip64, rawExtraField, _options, extraField, extraFieldSize, offset, maximumCompressedSize, maximumEntrySize, uncompressedSize, zip64Enabled, _zipWriter$writer, diskOffset, diskNumber, maxSize, zip64UncompressedSize, zip64CompressedSize, zip64Offset, supportZip64SplitFile, zip64DiskNumberStart, headerInfo, dataDescriptorInfo, fileEntry;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          name = name.trim();
          if (options.directory && !name.endsWith(_constants.DIRECTORY_SIGNATURE)) {
            name += _constants.DIRECTORY_SIGNATURE;
          } else {
            options.directory = name.endsWith(_constants.DIRECTORY_SIGNATURE);
          }
          rawFilename = (0, _encodeText.encodeText)(name);
          if (!(getLength(rawFilename) > _constants.MAX_16_BITS)) {
            _context3.next = 5;
            break;
          }
          throw new Error(ERR_INVALID_ENTRY_NAME);
        case 5:
          comment = options.comment || "";
          rawComment = (0, _encodeText.encodeText)(comment);
          if (!(getLength(rawComment) > _constants.MAX_16_BITS)) {
            _context3.next = 9;
            break;
          }
          throw new Error(ERR_INVALID_ENTRY_COMMENT);
        case 9:
          version = getOptionValue(zipWriter, options, "version", _constants.VERSION_DEFLATE);
          if (!(version > _constants.MAX_16_BITS)) {
            _context3.next = 12;
            break;
          }
          throw new Error(ERR_INVALID_VERSION);
        case 12:
          versionMadeBy = getOptionValue(zipWriter, options, "versionMadeBy", 20);
          if (!(versionMadeBy > _constants.MAX_16_BITS)) {
            _context3.next = 15;
            break;
          }
          throw new Error(ERR_INVALID_VERSION);
        case 15:
          lastModDate = getOptionValue(zipWriter, options, _zipEntry.PROPERTY_NAME_LAST_MODIFICATION_DATE, new Date());
          lastAccessDate = getOptionValue(zipWriter, options, _zipEntry.PROPERTY_NAME_LAST_ACCESS_DATE);
          creationDate = getOptionValue(zipWriter, options, _zipEntry.PROPERTY_NAME_CREATION_DATE);
          msDosCompatible = getOptionValue(zipWriter, options, _zipEntry.PROPERTY_NAME_MS_DOS_COMPATIBLE, true);
          internalFileAttribute = getOptionValue(zipWriter, options, _zipEntry.PROPERTY_NAME_INTERNAL_FILE_ATTRIBUTE, 0);
          externalFileAttribute = getOptionValue(zipWriter, options, _zipEntry.PROPERTY_NAME_EXTERNAL_FILE_ATTRIBUTE, 0);
          password = getOptionValue(zipWriter, options, "password");
          encryptionStrength = getOptionValue(zipWriter, options, "encryptionStrength", 3);
          zipCrypto = getOptionValue(zipWriter, options, "zipCrypto");
          extendedTimestamp = getOptionValue(zipWriter, options, "extendedTimestamp", true);
          keepOrder = getOptionValue(zipWriter, options, "keepOrder", true);
          level = getOptionValue(zipWriter, options, "level");
          useWebWorkers = getOptionValue(zipWriter, options, "useWebWorkers");
          bufferedWrite = getOptionValue(zipWriter, options, "bufferedWrite");
          dataDescriptorSignature = getOptionValue(zipWriter, options, "dataDescriptorSignature", false);
          signal = getOptionValue(zipWriter, options, "signal");
          useCompressionStream = getOptionValue(zipWriter, options, "useCompressionStream");
          dataDescriptor = getOptionValue(zipWriter, options, "dataDescriptor", true);
          zip64 = getOptionValue(zipWriter, options, _zipEntry.PROPERTY_NAME_ZIP64);
          if (!(password !== _constants.UNDEFINED_VALUE && encryptionStrength !== _constants.UNDEFINED_VALUE && (encryptionStrength < 1 || encryptionStrength > 3))) {
            _context3.next = 36;
            break;
          }
          throw new Error(ERR_INVALID_ENCRYPTION_STRENGTH);
        case 36:
          rawExtraField = new Uint8Array();
          _options = options, extraField = _options.extraField;
          if (extraField) {
            extraFieldSize = 0;
            offset = 0;
            extraField.forEach(function (data) {
              return extraFieldSize += 4 + getLength(data);
            });
            rawExtraField = new Uint8Array(extraFieldSize);
            extraField.forEach(function (data, type) {
              if (type > _constants.MAX_16_BITS) {
                throw new Error(ERR_INVALID_EXTRAFIELD_TYPE);
              }
              if (getLength(data) > _constants.MAX_16_BITS) {
                throw new Error(ERR_INVALID_EXTRAFIELD_DATA);
              }
              arraySet(rawExtraField, new Uint16Array([type]), offset);
              arraySet(rawExtraField, new Uint16Array([getLength(data)]), offset + 2);
              arraySet(rawExtraField, data, offset + 4);
              offset += 4 + getLength(data);
            });
          }
          maximumCompressedSize = 0;
          maximumEntrySize = 0;
          uncompressedSize = 0;
          zip64Enabled = zip64 === true;
          if (!reader) {
            _context3.next = 48;
            break;
          }
          reader = (0, _io.initReader)(reader);
          _context3.next = 47;
          return (0, _io.initStream)(reader);
        case 47:
          if (reader.size === _constants.UNDEFINED_VALUE) {
            dataDescriptor = true;
            if (zip64 || zip64 === _constants.UNDEFINED_VALUE) {
              zip64 = true;
              maximumCompressedSize = _constants.MAX_32_BITS;
            }
          } else {
            uncompressedSize = reader.size;
            maximumCompressedSize = getMaximumCompressedSize(uncompressedSize);
          }
        case 48:
          _zipWriter$writer = zipWriter.writer, diskOffset = _zipWriter$writer.diskOffset, diskNumber = _zipWriter$writer.diskNumber, maxSize = _zipWriter$writer.maxSize;
          zip64UncompressedSize = zip64Enabled || uncompressedSize >= _constants.MAX_32_BITS;
          zip64CompressedSize = zip64Enabled || maximumCompressedSize >= _constants.MAX_32_BITS;
          zip64Offset = zip64Enabled || zipWriter.offset + zipWriter.pendingEntriesSize - diskOffset >= _constants.MAX_32_BITS;
          supportZip64SplitFile = getOptionValue(zipWriter, options, "supportZip64SplitFile", true);
          zip64DiskNumberStart = supportZip64SplitFile && zip64Enabled || diskNumber + Math.ceil(zipWriter.pendingEntriesSize / maxSize) >= _constants.MAX_16_BITS;
          if (!(zip64Offset || zip64UncompressedSize || zip64CompressedSize || zip64DiskNumberStart)) {
            _context3.next = 60;
            break;
          }
          if (!(zip64 === false || !keepOrder)) {
            _context3.next = 59;
            break;
          }
          throw new Error(ERR_UNSUPPORTED_FORMAT);
        case 59:
          zip64 = true;
        case 60:
          zip64 = zip64 || false;
          options = Object.assign({}, options, {
            rawFilename: rawFilename,
            rawComment: rawComment,
            version: version,
            versionMadeBy: versionMadeBy,
            lastModDate: lastModDate,
            lastAccessDate: lastAccessDate,
            creationDate: creationDate,
            rawExtraField: rawExtraField,
            zip64: zip64,
            zip64UncompressedSize: zip64UncompressedSize,
            zip64CompressedSize: zip64CompressedSize,
            zip64Offset: zip64Offset,
            zip64DiskNumberStart: zip64DiskNumberStart,
            password: password,
            level: level,
            useWebWorkers: useWebWorkers,
            encryptionStrength: encryptionStrength,
            extendedTimestamp: extendedTimestamp,
            zipCrypto: zipCrypto,
            bufferedWrite: bufferedWrite,
            keepOrder: keepOrder,
            dataDescriptor: dataDescriptor,
            dataDescriptorSignature: dataDescriptorSignature,
            signal: signal,
            msDosCompatible: msDosCompatible,
            internalFileAttribute: internalFileAttribute,
            externalFileAttribute: externalFileAttribute,
            useCompressionStream: useCompressionStream
          });
          headerInfo = getHeaderInfo(options);
          dataDescriptorInfo = getDataDescriptorInfo(options);
          maximumEntrySize = getLength(headerInfo.localHeaderArray, dataDescriptorInfo.dataDescriptorArray) + maximumCompressedSize;
          zipWriter.pendingEntriesSize += maximumEntrySize;
          _context3.prev = 66;
          _context3.next = 69;
          return getFileEntry(zipWriter, name, reader, {
            headerInfo: headerInfo,
            dataDescriptorInfo: dataDescriptorInfo
          }, options);
        case 69:
          fileEntry = _context3.sent;
        case 70:
          _context3.prev = 70;
          zipWriter.pendingEntriesSize -= maximumEntrySize;
          return _context3.finish(70);
        case 73:
          Object.assign(fileEntry, {
            name: name,
            comment: comment,
            extraField: extraField
          });
          return _context3.abrupt("return", new _zipEntry.Entry(fileEntry));
        case 75:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[66,, 70, 73]]);
  }));
  return _addFile.apply(this, arguments);
}
function getFileEntry(_x5, _x6, _x7, _x8, _x9) {
  return _getFileEntry.apply(this, arguments);
}
function _getFileEntry() {
  _getFileEntry = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(zipWriter, name, reader, entryInfo, options) {
    var files, writer, keepOrder, dataDescriptor, signal, headerInfo, previousFileEntry, fileEntry, bufferedWrite, releaseLockWriter, releaseLockCurrentFileEntry, writingBufferedEntryData, writingEntryData, fileWriter, lockPreviousFileEntry, writable, diskOffset, signatureArray, signatureArrayView, diskNumber, blob, requestLockCurrentFileEntry, requestLockWriter, _requestLockWriter, skipDiskIfNeeded, _skipDiskIfNeeded;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _skipDiskIfNeeded = function _skipDiskIfNeeded3() {
            _skipDiskIfNeeded = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(writable) {
              return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                while (1) switch (_context5.prev = _context5.next) {
                  case 0:
                    if (!(headerInfo.localHeaderArray.length > writer.availableSize)) {
                      _context5.next = 4;
                      break;
                    }
                    writer.availableSize = 0;
                    _context5.next = 4;
                    return writeData(writable, new Uint8Array());
                  case 4:
                  case "end":
                    return _context5.stop();
                }
              }, _callee5);
            }));
            return _skipDiskIfNeeded.apply(this, arguments);
          };
          skipDiskIfNeeded = function _skipDiskIfNeeded2(_x25) {
            return _skipDiskIfNeeded.apply(this, arguments);
          };
          _requestLockWriter = function _requestLockWriter3() {
            _requestLockWriter = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
              var lockWriter;
              return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                while (1) switch (_context4.prev = _context4.next) {
                  case 0:
                    zipWriter.writerLocked = true;
                    lockWriter = zipWriter.lockWriter;
                    zipWriter.lockWriter = new Promise(function (resolve) {
                      return releaseLockWriter = function releaseLockWriter() {
                        zipWriter.writerLocked = false;
                        resolve();
                      };
                    });
                    _context4.next = 5;
                    return lockWriter;
                  case 5:
                  case "end":
                    return _context4.stop();
                }
              }, _callee4);
            }));
            return _requestLockWriter.apply(this, arguments);
          };
          requestLockWriter = function _requestLockWriter2() {
            return _requestLockWriter.apply(this, arguments);
          };
          requestLockCurrentFileEntry = function _requestLockCurrentFi() {
            fileEntry.lock = new Promise(function (resolve) {
              return releaseLockCurrentFileEntry = resolve;
            });
          };
          files = zipWriter.files, writer = zipWriter.writer;
          keepOrder = options.keepOrder, dataDescriptor = options.dataDescriptor, signal = options.signal;
          headerInfo = entryInfo.headerInfo;
          previousFileEntry = Array.from(files.values()).pop();
          fileEntry = {};
          files.set(name, fileEntry);
          _context6.prev = 11;
          if (keepOrder) {
            lockPreviousFileEntry = previousFileEntry && previousFileEntry.lock;
            requestLockCurrentFileEntry();
          }
          if (!(options.bufferedWrite || zipWriter.writerLocked || zipWriter.bufferedWrites && keepOrder || !dataDescriptor)) {
            _context6.next = 22;
            break;
          }
          fileWriter = new _io.BlobWriter();
          fileWriter.writable.size = 0;
          bufferedWrite = true;
          zipWriter.bufferedWrites++;
          _context6.next = 20;
          return (0, _io.initStream)(writer);
        case 20:
          _context6.next = 25;
          break;
        case 22:
          fileWriter = writer;
          _context6.next = 25;
          return requestLockWriter();
        case 25:
          _context6.next = 27;
          return (0, _io.initStream)(fileWriter);
        case 27:
          writable = writer.writable;
          diskOffset = writer.diskOffset;
          if (!zipWriter.addSplitZipSignature) {
            _context6.next = 37;
            break;
          }
          delete zipWriter.addSplitZipSignature;
          signatureArray = new Uint8Array(4);
          signatureArrayView = getDataView(signatureArray);
          setUint32(signatureArrayView, 0, _constants.SPLIT_ZIP_FILE_SIGNATURE);
          _context6.next = 36;
          return writeData(writable, signatureArray);
        case 36:
          zipWriter.offset += 4;
        case 37:
          if (bufferedWrite) {
            _context6.next = 42;
            break;
          }
          _context6.next = 40;
          return lockPreviousFileEntry;
        case 40:
          _context6.next = 42;
          return skipDiskIfNeeded(writable);
        case 42:
          diskNumber = writer.diskNumber;
          writingEntryData = true;
          fileEntry.diskNumberStart = diskNumber;
          _context6.next = 47;
          return createFileEntry(reader, fileWriter, fileEntry, entryInfo, zipWriter.config, options);
        case 47:
          fileEntry = _context6.sent;
          writingEntryData = false;
          files.set(name, fileEntry);
          fileEntry.filename = name;
          if (!bufferedWrite) {
            _context6.next = 74;
            break;
          }
          _context6.next = 54;
          return fileWriter.writable.close();
        case 54:
          _context6.next = 56;
          return fileWriter.getData();
        case 56:
          blob = _context6.sent;
          _context6.next = 59;
          return lockPreviousFileEntry;
        case 59:
          _context6.next = 61;
          return requestLockWriter();
        case 61:
          writingBufferedEntryData = true;
          if (dataDescriptor) {
            _context6.next = 66;
            break;
          }
          _context6.next = 65;
          return writeExtraHeaderInfo(fileEntry, blob, writable, options);
        case 65:
          blob = _context6.sent;
        case 66:
          _context6.next = 68;
          return skipDiskIfNeeded(writable);
        case 68:
          fileEntry.diskNumberStart = writer.diskNumber;
          diskOffset = writer.diskOffset;
          _context6.next = 72;
          return blob.stream().pipeTo(writable, {
            preventClose: true,
            signal: signal
          });
        case 72:
          writable.size += blob.size;
          writingBufferedEntryData = false;
        case 74:
          fileEntry.offset = zipWriter.offset - diskOffset;
          if (!fileEntry.zip64) {
            _context6.next = 79;
            break;
          }
          setZip64ExtraInfo(fileEntry, options);
          _context6.next = 81;
          break;
        case 79:
          if (!(fileEntry.offset >= _constants.MAX_32_BITS)) {
            _context6.next = 81;
            break;
          }
          throw new Error(ERR_UNSUPPORTED_FORMAT);
        case 81:
          zipWriter.offset += fileEntry.length;
          return _context6.abrupt("return", fileEntry);
        case 85:
          _context6.prev = 85;
          _context6.t0 = _context6["catch"](11);
          if (bufferedWrite && writingBufferedEntryData || !bufferedWrite && writingEntryData) {
            zipWriter.hasCorruptedEntries = true;
            if (_context6.t0) {
              _context6.t0.corruptedEntry = true;
            }
            if (bufferedWrite) {
              zipWriter.offset += fileWriter.writable.size;
            } else {
              zipWriter.offset = fileWriter.writable.size;
            }
          }
          files.delete(name);
          throw _context6.t0;
        case 90:
          _context6.prev = 90;
          if (bufferedWrite) {
            zipWriter.bufferedWrites--;
          }
          if (releaseLockCurrentFileEntry) {
            releaseLockCurrentFileEntry();
          }
          if (releaseLockWriter) {
            releaseLockWriter();
          }
          return _context6.finish(90);
        case 95:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[11, 85, 90, 95]]);
  }));
  return _getFileEntry.apply(this, arguments);
}
function createFileEntry(_x10, _x11, _x12, _x13, _x14, _x15) {
  return _createFileEntry.apply(this, arguments);
}
function _createFileEntry() {
  _createFileEntry = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(reader, writer, _ref, entryInfo, config, options) {
    var diskNumberStart, lock, headerInfo, dataDescriptorInfo, localHeaderArray, headerArray, lastModDate, rawLastModDate, encrypted, compressed, version, compressionMethod, rawExtraFieldExtendedTimestamp, rawExtraFieldNTFS, rawExtraFieldAES, dataDescriptorArray, rawFilename, lastAccessDate, creationDate, password, level, zip64, zip64UncompressedSize, zip64CompressedSize, zip64Offset, zip64DiskNumberStart, zipCrypto, dataDescriptor, directory, versionMadeBy, rawComment, rawExtraField, useWebWorkers, onstart, onprogress, onend, signal, encryptionStrength, extendedTimestamp, msDosCompatible, internalFileAttribute, externalFileAttribute, useCompressionStream, fileEntry, compressedSize, uncompressedSize, signature, writable, readable, size, workerOptions, result, rawExtraFieldZip64, rawExtraFieldZip64Length;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          diskNumberStart = _ref.diskNumberStart, lock = _ref.lock;
          headerInfo = entryInfo.headerInfo, dataDescriptorInfo = entryInfo.dataDescriptorInfo;
          localHeaderArray = headerInfo.localHeaderArray, headerArray = headerInfo.headerArray, lastModDate = headerInfo.lastModDate, rawLastModDate = headerInfo.rawLastModDate, encrypted = headerInfo.encrypted, compressed = headerInfo.compressed, version = headerInfo.version, compressionMethod = headerInfo.compressionMethod, rawExtraFieldExtendedTimestamp = headerInfo.rawExtraFieldExtendedTimestamp, rawExtraFieldNTFS = headerInfo.rawExtraFieldNTFS, rawExtraFieldAES = headerInfo.rawExtraFieldAES;
          dataDescriptorArray = dataDescriptorInfo.dataDescriptorArray;
          rawFilename = options.rawFilename, lastAccessDate = options.lastAccessDate, creationDate = options.creationDate, password = options.password, level = options.level, zip64 = options.zip64, zip64UncompressedSize = options.zip64UncompressedSize, zip64CompressedSize = options.zip64CompressedSize, zip64Offset = options.zip64Offset, zip64DiskNumberStart = options.zip64DiskNumberStart, zipCrypto = options.zipCrypto, dataDescriptor = options.dataDescriptor, directory = options.directory, versionMadeBy = options.versionMadeBy, rawComment = options.rawComment, rawExtraField = options.rawExtraField, useWebWorkers = options.useWebWorkers, onstart = options.onstart, onprogress = options.onprogress, onend = options.onend, signal = options.signal, encryptionStrength = options.encryptionStrength, extendedTimestamp = options.extendedTimestamp, msDosCompatible = options.msDosCompatible, internalFileAttribute = options.internalFileAttribute, externalFileAttribute = options.externalFileAttribute, useCompressionStream = options.useCompressionStream;
          fileEntry = {
            lock: lock,
            versionMadeBy: versionMadeBy,
            zip64: zip64,
            directory: Boolean(directory),
            filenameUTF8: true,
            rawFilename: rawFilename,
            commentUTF8: true,
            rawComment: rawComment,
            rawExtraFieldExtendedTimestamp: rawExtraFieldExtendedTimestamp,
            rawExtraFieldNTFS: rawExtraFieldNTFS,
            rawExtraFieldAES: rawExtraFieldAES,
            rawExtraField: rawExtraField,
            extendedTimestamp: extendedTimestamp,
            msDosCompatible: msDosCompatible,
            internalFileAttribute: internalFileAttribute,
            externalFileAttribute: externalFileAttribute,
            diskNumberStart: diskNumberStart
          };
          compressedSize = 0;
          uncompressedSize = 0;
          writable = writer.writable;
          if (!reader) {
            _context7.next = 25;
            break;
          }
          reader.chunkSize = (0, _configuration.getChunkSize)(config);
          _context7.next = 13;
          return writeData(writable, localHeaderArray);
        case 13:
          readable = reader.readable;
          size = readable.size = reader.size;
          workerOptions = {
            options: {
              codecType: _codecPool.CODEC_DEFLATE,
              level: level,
              password: password,
              encryptionStrength: encryptionStrength,
              zipCrypto: encrypted && zipCrypto,
              passwordVerification: encrypted && zipCrypto && rawLastModDate >> 8 & 0xFF,
              signed: true,
              compressed: compressed,
              encrypted: encrypted,
              useWebWorkers: useWebWorkers,
              useCompressionStream: useCompressionStream,
              transferStreams: false
            },
            config: config,
            streamOptions: {
              signal: signal,
              size: size,
              onstart: onstart,
              onprogress: onprogress,
              onend: onend
            }
          };
          _context7.next = 18;
          return (0, _codecPool.runWorker)({
            readable: readable,
            writable: writable
          }, workerOptions);
        case 18:
          result = _context7.sent;
          writable.size += result.size;
          signature = result.signature;
          uncompressedSize = reader.size = readable.size;
          compressedSize = result.size;
          _context7.next = 27;
          break;
        case 25:
          _context7.next = 27;
          return writeData(writable, localHeaderArray);
        case 27:
          if (zip64) {
            rawExtraFieldZip64Length = 4;
            if (zip64UncompressedSize) {
              rawExtraFieldZip64Length += 8;
            }
            if (zip64CompressedSize) {
              rawExtraFieldZip64Length += 8;
            }
            if (zip64Offset) {
              rawExtraFieldZip64Length += 8;
            }
            if (zip64DiskNumberStart) {
              rawExtraFieldZip64Length += 4;
            }
            rawExtraFieldZip64 = new Uint8Array(rawExtraFieldZip64Length);
          } else {
            rawExtraFieldZip64 = new Uint8Array();
          }
          if (reader) {
            setEntryInfo({
              signature: signature,
              rawExtraFieldZip64: rawExtraFieldZip64,
              compressedSize: compressedSize,
              uncompressedSize: uncompressedSize,
              headerInfo: headerInfo,
              dataDescriptorInfo: dataDescriptorInfo
            }, options);
          }
          if (!dataDescriptor) {
            _context7.next = 32;
            break;
          }
          _context7.next = 32;
          return writeData(writable, dataDescriptorArray);
        case 32:
          Object.assign(fileEntry, {
            uncompressedSize: uncompressedSize,
            compressedSize: compressedSize,
            lastModDate: lastModDate,
            rawLastModDate: rawLastModDate,
            creationDate: creationDate,
            lastAccessDate: lastAccessDate,
            encrypted: encrypted,
            length: getLength(localHeaderArray, dataDescriptorArray) + compressedSize,
            compressionMethod: compressionMethod,
            version: version,
            headerArray: headerArray,
            signature: signature,
            rawExtraFieldZip64: rawExtraFieldZip64,
            zip64UncompressedSize: zip64UncompressedSize,
            zip64CompressedSize: zip64CompressedSize,
            zip64Offset: zip64Offset,
            zip64DiskNumberStart: zip64DiskNumberStart
          });
          return _context7.abrupt("return", fileEntry);
        case 34:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return _createFileEntry.apply(this, arguments);
}
function getHeaderInfo(options) {
  var rawFilename = options.rawFilename,
    lastModDate = options.lastModDate,
    lastAccessDate = options.lastAccessDate,
    creationDate = options.creationDate,
    password = options.password,
    level = options.level,
    zip64 = options.zip64,
    zipCrypto = options.zipCrypto,
    dataDescriptor = options.dataDescriptor,
    directory = options.directory,
    rawExtraField = options.rawExtraField,
    encryptionStrength = options.encryptionStrength,
    extendedTimestamp = options.extendedTimestamp;
  var compressed = level !== 0 && !directory;
  var encrypted = Boolean(password && getLength(password));
  var version = options.version;
  var rawExtraFieldAES;
  if (encrypted && !zipCrypto) {
    rawExtraFieldAES = new Uint8Array(getLength(EXTRAFIELD_DATA_AES) + 2);
    var extraFieldAESView = getDataView(rawExtraFieldAES);
    setUint16(extraFieldAESView, 0, _constants.EXTRAFIELD_TYPE_AES);
    arraySet(rawExtraFieldAES, EXTRAFIELD_DATA_AES, 2);
    setUint8(extraFieldAESView, 8, encryptionStrength);
  } else {
    rawExtraFieldAES = new Uint8Array();
  }
  var rawExtraFieldNTFS;
  var rawExtraFieldExtendedTimestamp;
  if (extendedTimestamp) {
    rawExtraFieldExtendedTimestamp = new Uint8Array(9 + (lastAccessDate ? 4 : 0) + (creationDate ? 4 : 0));
    var extraFieldExtendedTimestampView = getDataView(rawExtraFieldExtendedTimestamp);
    setUint16(extraFieldExtendedTimestampView, 0, _constants.EXTRAFIELD_TYPE_EXTENDED_TIMESTAMP);
    setUint16(extraFieldExtendedTimestampView, 2, getLength(rawExtraFieldExtendedTimestamp) - 4);
    var extraFieldExtendedTimestampFlag = 0x1 + (lastAccessDate ? 0x2 : 0) + (creationDate ? 0x4 : 0);
    setUint8(extraFieldExtendedTimestampView, 4, extraFieldExtendedTimestampFlag);
    setUint32(extraFieldExtendedTimestampView, 5, Math.floor(lastModDate.getTime() / 1000));
    if (lastAccessDate) {
      setUint32(extraFieldExtendedTimestampView, 9, Math.floor(lastAccessDate.getTime() / 1000));
    }
    if (creationDate) {
      setUint32(extraFieldExtendedTimestampView, 13, Math.floor(creationDate.getTime() / 1000));
    }
    try {
      rawExtraFieldNTFS = new Uint8Array(36);
      var extraFieldNTFSView = getDataView(rawExtraFieldNTFS);
      var lastModTimeNTFS = getTimeNTFS(lastModDate);
      setUint16(extraFieldNTFSView, 0, _constants.EXTRAFIELD_TYPE_NTFS);
      setUint16(extraFieldNTFSView, 2, 32);
      setUint16(extraFieldNTFSView, 8, _constants.EXTRAFIELD_TYPE_NTFS_TAG1);
      setUint16(extraFieldNTFSView, 10, 24);
      setBigUint64(extraFieldNTFSView, 12, lastModTimeNTFS);
      setBigUint64(extraFieldNTFSView, 20, getTimeNTFS(lastAccessDate) || lastModTimeNTFS);
      setBigUint64(extraFieldNTFSView, 28, getTimeNTFS(creationDate) || lastModTimeNTFS);
    } catch (_error) {
      rawExtraFieldNTFS = new Uint8Array();
    }
  } else {
    rawExtraFieldNTFS = rawExtraFieldExtendedTimestamp = new Uint8Array();
  }
  var bitFlag = _constants.BITFLAG_LANG_ENCODING_FLAG;
  if (dataDescriptor) {
    bitFlag = bitFlag | _constants.BITFLAG_DATA_DESCRIPTOR;
  }
  var compressionMethod = _constants.COMPRESSION_METHOD_STORE;
  if (compressed) {
    compressionMethod = _constants.COMPRESSION_METHOD_DEFLATE;
  }
  if (zip64) {
    version = version > _constants.VERSION_ZIP64 ? version : _constants.VERSION_ZIP64;
  }
  if (encrypted) {
    bitFlag = bitFlag | _constants.BITFLAG_ENCRYPTED;
    if (!zipCrypto) {
      version = version > _constants.VERSION_AES ? version : _constants.VERSION_AES;
      compressionMethod = _constants.COMPRESSION_METHOD_AES;
      if (compressed) {
        rawExtraFieldAES[9] = _constants.COMPRESSION_METHOD_DEFLATE;
      }
    }
  }
  var headerArray = new Uint8Array(26);
  var headerView = getDataView(headerArray);
  setUint16(headerView, 0, version);
  setUint16(headerView, 2, bitFlag);
  setUint16(headerView, 4, compressionMethod);
  var dateArray = new Uint32Array(1);
  var dateView = getDataView(dateArray);
  var lastModDateMsDos;
  if (lastModDate < _constants.MIN_DATE) {
    lastModDateMsDos = _constants.MIN_DATE;
  } else if (lastModDate > _constants.MAX_DATE) {
    lastModDateMsDos = _constants.MAX_DATE;
  } else {
    lastModDateMsDos = lastModDate;
  }
  setUint16(dateView, 0, (lastModDateMsDos.getHours() << 6 | lastModDateMsDos.getMinutes()) << 5 | lastModDateMsDos.getSeconds() / 2);
  setUint16(dateView, 2, (lastModDateMsDos.getFullYear() - 1980 << 4 | lastModDateMsDos.getMonth() + 1) << 5 | lastModDateMsDos.getDate());
  var rawLastModDate = dateArray[0];
  setUint32(headerView, 6, rawLastModDate);
  setUint16(headerView, 22, getLength(rawFilename));
  var extraFieldLength = getLength(rawExtraFieldAES, rawExtraFieldExtendedTimestamp, rawExtraFieldNTFS, rawExtraField);
  setUint16(headerView, 24, extraFieldLength);
  var localHeaderArray = new Uint8Array(30 + getLength(rawFilename) + extraFieldLength);
  var localHeaderView = getDataView(localHeaderArray);
  setUint32(localHeaderView, 0, _constants.LOCAL_FILE_HEADER_SIGNATURE);
  arraySet(localHeaderArray, headerArray, 4);
  arraySet(localHeaderArray, rawFilename, 30);
  arraySet(localHeaderArray, rawExtraFieldAES, 30 + getLength(rawFilename));
  arraySet(localHeaderArray, rawExtraFieldExtendedTimestamp, 30 + getLength(rawFilename, rawExtraFieldAES));
  arraySet(localHeaderArray, rawExtraFieldNTFS, 30 + getLength(rawFilename, rawExtraFieldAES, rawExtraFieldExtendedTimestamp));
  arraySet(localHeaderArray, rawExtraField, 30 + getLength(rawFilename, rawExtraFieldAES, rawExtraFieldExtendedTimestamp, rawExtraFieldNTFS));
  return {
    localHeaderArray: localHeaderArray,
    headerArray: headerArray,
    headerView: headerView,
    lastModDate: lastModDate,
    rawLastModDate: rawLastModDate,
    encrypted: encrypted,
    compressed: compressed,
    version: version,
    compressionMethod: compressionMethod,
    rawExtraFieldExtendedTimestamp: rawExtraFieldExtendedTimestamp,
    rawExtraFieldNTFS: rawExtraFieldNTFS,
    rawExtraFieldAES: rawExtraFieldAES
  };
}
function getDataDescriptorInfo(options) {
  var zip64 = options.zip64,
    dataDescriptor = options.dataDescriptor,
    dataDescriptorSignature = options.dataDescriptorSignature;
  var dataDescriptorArray = new Uint8Array();
  var dataDescriptorView,
    dataDescriptorOffset = 0;
  if (dataDescriptor) {
    dataDescriptorArray = new Uint8Array(zip64 ? dataDescriptorSignature ? 24 : 20 : dataDescriptorSignature ? 16 : 12);
    dataDescriptorView = getDataView(dataDescriptorArray);
    if (dataDescriptorSignature) {
      dataDescriptorOffset = 4;
      setUint32(dataDescriptorView, 0, _constants.DATA_DESCRIPTOR_RECORD_SIGNATURE);
    }
  }
  return {
    dataDescriptorArray: dataDescriptorArray,
    dataDescriptorView: dataDescriptorView,
    dataDescriptorOffset: dataDescriptorOffset
  };
}
function setEntryInfo(entryInfo, options) {
  var signature = entryInfo.signature,
    rawExtraFieldZip64 = entryInfo.rawExtraFieldZip64,
    compressedSize = entryInfo.compressedSize,
    uncompressedSize = entryInfo.uncompressedSize,
    headerInfo = entryInfo.headerInfo,
    dataDescriptorInfo = entryInfo.dataDescriptorInfo;
  var headerView = headerInfo.headerView,
    encrypted = headerInfo.encrypted;
  var dataDescriptorView = dataDescriptorInfo.dataDescriptorView,
    dataDescriptorOffset = dataDescriptorInfo.dataDescriptorOffset;
  var zip64 = options.zip64,
    zip64UncompressedSize = options.zip64UncompressedSize,
    zip64CompressedSize = options.zip64CompressedSize,
    zipCrypto = options.zipCrypto,
    dataDescriptor = options.dataDescriptor;
  if ((!encrypted || zipCrypto) && signature !== _constants.UNDEFINED_VALUE) {
    setUint32(headerView, 10, signature);
    if (dataDescriptor) {
      setUint32(dataDescriptorView, dataDescriptorOffset, signature);
    }
  }
  if (zip64) {
    var rawExtraFieldZip64View = getDataView(rawExtraFieldZip64);
    setUint16(rawExtraFieldZip64View, 0, _constants.EXTRAFIELD_TYPE_ZIP64);
    setUint16(rawExtraFieldZip64View, 2, rawExtraFieldZip64.length - 4);
    var rawExtraFieldZip64Offset = 4;
    if (zip64UncompressedSize) {
      setUint32(headerView, 18, _constants.MAX_32_BITS);
      setBigUint64(rawExtraFieldZip64View, rawExtraFieldZip64Offset, BigInt(uncompressedSize));
      rawExtraFieldZip64Offset += 8;
    }
    if (zip64CompressedSize) {
      setUint32(headerView, 14, _constants.MAX_32_BITS);
      setBigUint64(rawExtraFieldZip64View, rawExtraFieldZip64Offset, BigInt(compressedSize));
    }
    if (dataDescriptor) {
      setBigUint64(dataDescriptorView, dataDescriptorOffset + 4, BigInt(compressedSize));
      setBigUint64(dataDescriptorView, dataDescriptorOffset + 12, BigInt(uncompressedSize));
    }
  } else {
    setUint32(headerView, 14, compressedSize);
    setUint32(headerView, 18, uncompressedSize);
    if (dataDescriptor) {
      setUint32(dataDescriptorView, dataDescriptorOffset + 4, compressedSize);
      setUint32(dataDescriptorView, dataDescriptorOffset + 8, uncompressedSize);
    }
  }
}
function writeExtraHeaderInfo(_x16, _x17, _x18, _x19) {
  return _writeExtraHeaderInfo.apply(this, arguments);
}
function _writeExtraHeaderInfo() {
  _writeExtraHeaderInfo = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(fileEntry, entryData, writable, _ref2) {
    var zipCrypto, arrayBuffer, arrayBufferView;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          zipCrypto = _ref2.zipCrypto;
          _context8.next = 3;
          return sliceAsArrayBuffer(entryData, 0, 26);
        case 3:
          arrayBuffer = _context8.sent;
          arrayBufferView = new DataView(arrayBuffer);
          if (!fileEntry.encrypted || zipCrypto) {
            setUint32(arrayBufferView, 14, fileEntry.signature);
          }
          if (fileEntry.zip64) {
            setUint32(arrayBufferView, 18, _constants.MAX_32_BITS);
            setUint32(arrayBufferView, 22, _constants.MAX_32_BITS);
          } else {
            setUint32(arrayBufferView, 18, fileEntry.compressedSize);
            setUint32(arrayBufferView, 22, fileEntry.uncompressedSize);
          }
          _context8.next = 9;
          return writeData(writable, new Uint8Array(arrayBuffer));
        case 9:
          return _context8.abrupt("return", entryData.slice(arrayBuffer.byteLength));
        case 10:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return _writeExtraHeaderInfo.apply(this, arguments);
}
function setZip64ExtraInfo(fileEntry, options) {
  var rawExtraFieldZip64 = fileEntry.rawExtraFieldZip64,
    offset = fileEntry.offset,
    diskNumberStart = fileEntry.diskNumberStart;
  var zip64UncompressedSize = options.zip64UncompressedSize,
    zip64CompressedSize = options.zip64CompressedSize,
    zip64Offset = options.zip64Offset,
    zip64DiskNumberStart = options.zip64DiskNumberStart;
  var rawExtraFieldZip64View = getDataView(rawExtraFieldZip64);
  var rawExtraFieldZip64Offset = 4;
  if (zip64UncompressedSize) {
    rawExtraFieldZip64Offset += 8;
  }
  if (zip64CompressedSize) {
    rawExtraFieldZip64Offset += 8;
  }
  if (zip64Offset) {
    setBigUint64(rawExtraFieldZip64View, rawExtraFieldZip64Offset, BigInt(offset));
    rawExtraFieldZip64Offset += 8;
  }
  if (zip64DiskNumberStart) {
    setUint32(rawExtraFieldZip64View, rawExtraFieldZip64Offset, diskNumberStart);
  }
}
function closeFile(_x20, _x21, _x22) {
  return _closeFile.apply(this, arguments);
}
function _closeFile() {
  _closeFile = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(zipWriter, comment, options) {
    var files, writer, diskOffset, writable, diskNumber, offset, directoryDataLength, directoryOffset, filesLength, _iterator, _step, _step$value, _step$value$, rawFilename, rawExtraFieldZip64, rawExtraFieldAES, rawExtraField, rawComment, rawExtraFieldExtendedTimestamp, rawExtraFieldNTFS, directoryArray, directoryView, directoryDiskOffset, _iterator2, _step2, _step2$value, indexFileEntry, _fileEntry, fileEntryOffset, _rawFilename, _rawExtraFieldZip, _rawExtraFieldAES, _rawExtraFieldNTFS, _rawExtraField, _rawComment, versionMadeBy, headerArray, directory, _zip, zip64UncompressedSize, zip64CompressedSize, zip64DiskNumberStart, zip64Offset, msDosCompatible, internalFileAttribute, externalFileAttribute, extendedTimestamp, lastModDate, diskNumberStart, uncompressedSize, compressedSize, _rawExtraFieldExtendedTimestamp, extraFieldExtendedTimestampView, extraFieldLength, headerView, directoryEntryLength, lastDiskNumber, availableSize, zip64, endOfdirectoryArray, endOfdirectoryView, supportZip64SplitFile, commentLength;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          files = zipWriter.files, writer = zipWriter.writer;
          diskOffset = writer.diskOffset, writable = writer.writable;
          diskNumber = writer.diskNumber;
          offset = 0;
          directoryDataLength = 0;
          directoryOffset = zipWriter.offset - diskOffset;
          filesLength = files.size;
          _iterator = _createForOfIteratorHelper(files);
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              _step$value = _slicedToArray(_step.value, 2), _step$value$ = _step$value[1], rawFilename = _step$value$.rawFilename, rawExtraFieldZip64 = _step$value$.rawExtraFieldZip64, rawExtraFieldAES = _step$value$.rawExtraFieldAES, rawExtraField = _step$value$.rawExtraField, rawComment = _step$value$.rawComment, rawExtraFieldExtendedTimestamp = _step$value$.rawExtraFieldExtendedTimestamp, rawExtraFieldNTFS = _step$value$.rawExtraFieldNTFS;
              directoryDataLength += 46 + getLength(rawFilename, rawComment, rawExtraFieldZip64, rawExtraFieldAES, rawExtraFieldExtendedTimestamp, rawExtraFieldNTFS, rawExtraField);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          directoryArray = new Uint8Array(directoryDataLength);
          directoryView = getDataView(directoryArray);
          _context9.next = 13;
          return (0, _io.initStream)(writer);
        case 13:
          directoryDiskOffset = 0;
          _iterator2 = _createForOfIteratorHelper(Array.from(files.values()).entries());
          _context9.prev = 15;
          _iterator2.s();
        case 17:
          if ((_step2 = _iterator2.n()).done) {
            _context9.next = 59;
            break;
          }
          _step2$value = _slicedToArray(_step2.value, 2), indexFileEntry = _step2$value[0], _fileEntry = _step2$value[1];
          fileEntryOffset = _fileEntry.offset, _rawFilename = _fileEntry.rawFilename, _rawExtraFieldZip = _fileEntry.rawExtraFieldZip64, _rawExtraFieldAES = _fileEntry.rawExtraFieldAES, _rawExtraFieldNTFS = _fileEntry.rawExtraFieldNTFS, _rawExtraField = _fileEntry.rawExtraField, _rawComment = _fileEntry.rawComment, versionMadeBy = _fileEntry.versionMadeBy, headerArray = _fileEntry.headerArray, directory = _fileEntry.directory, _zip = _fileEntry.zip64, zip64UncompressedSize = _fileEntry.zip64UncompressedSize, zip64CompressedSize = _fileEntry.zip64CompressedSize, zip64DiskNumberStart = _fileEntry.zip64DiskNumberStart, zip64Offset = _fileEntry.zip64Offset, msDosCompatible = _fileEntry.msDosCompatible, internalFileAttribute = _fileEntry.internalFileAttribute, externalFileAttribute = _fileEntry.externalFileAttribute, extendedTimestamp = _fileEntry.extendedTimestamp, lastModDate = _fileEntry.lastModDate, diskNumberStart = _fileEntry.diskNumberStart, uncompressedSize = _fileEntry.uncompressedSize, compressedSize = _fileEntry.compressedSize;
          _rawExtraFieldExtendedTimestamp = void 0;
          if (extendedTimestamp) {
            _rawExtraFieldExtendedTimestamp = new Uint8Array(9);
            extraFieldExtendedTimestampView = getDataView(_rawExtraFieldExtendedTimestamp);
            setUint16(extraFieldExtendedTimestampView, 0, _constants.EXTRAFIELD_TYPE_EXTENDED_TIMESTAMP);
            setUint16(extraFieldExtendedTimestampView, 2, getLength(_rawExtraFieldExtendedTimestamp) - 4);
            setUint8(extraFieldExtendedTimestampView, 4, 0x1);
            setUint32(extraFieldExtendedTimestampView, 5, Math.floor(lastModDate.getTime() / 1000));
          } else {
            _rawExtraFieldExtendedTimestamp = new Uint8Array();
          }
          extraFieldLength = getLength(_rawExtraFieldZip, _rawExtraFieldAES, _rawExtraFieldExtendedTimestamp, _rawExtraFieldNTFS, _rawExtraField);
          setUint32(directoryView, offset, _constants.CENTRAL_FILE_HEADER_SIGNATURE);
          setUint16(directoryView, offset + 4, versionMadeBy);
          headerView = getDataView(headerArray);
          if (!zip64UncompressedSize) {
            setUint32(headerView, 18, uncompressedSize);
          }
          if (!zip64CompressedSize) {
            setUint32(headerView, 14, compressedSize);
          }
          arraySet(directoryArray, headerArray, offset + 6);
          setUint16(directoryView, offset + 30, extraFieldLength);
          setUint16(directoryView, offset + 32, getLength(_rawComment));
          setUint16(directoryView, offset + 34, _zip && zip64DiskNumberStart ? _constants.MAX_16_BITS : diskNumberStart);
          setUint16(directoryView, offset + 36, internalFileAttribute);
          if (externalFileAttribute) {
            setUint32(directoryView, offset + 38, externalFileAttribute);
          } else if (directory && msDosCompatible) {
            setUint8(directoryView, offset + 38, _constants.FILE_ATTR_MSDOS_DIR_MASK);
          }
          setUint32(directoryView, offset + 42, _zip && zip64Offset ? _constants.MAX_32_BITS : fileEntryOffset);
          arraySet(directoryArray, _rawFilename, offset + 46);
          arraySet(directoryArray, _rawExtraFieldZip, offset + 46 + getLength(_rawFilename));
          arraySet(directoryArray, _rawExtraFieldAES, offset + 46 + getLength(_rawFilename, _rawExtraFieldZip));
          arraySet(directoryArray, _rawExtraFieldExtendedTimestamp, offset + 46 + getLength(_rawFilename, _rawExtraFieldZip, _rawExtraFieldAES));
          arraySet(directoryArray, _rawExtraFieldNTFS, offset + 46 + getLength(_rawFilename, _rawExtraFieldZip, _rawExtraFieldAES, _rawExtraFieldExtendedTimestamp));
          arraySet(directoryArray, _rawExtraField, offset + 46 + getLength(_rawFilename, _rawExtraFieldZip, _rawExtraFieldAES, _rawExtraFieldExtendedTimestamp, _rawExtraFieldNTFS));
          arraySet(directoryArray, _rawComment, offset + 46 + getLength(_rawFilename) + extraFieldLength);
          directoryEntryLength = 46 + getLength(_rawFilename, _rawComment) + extraFieldLength;
          if (!(offset - directoryDiskOffset > writer.availableSize)) {
            _context9.next = 48;
            break;
          }
          writer.availableSize = 0;
          _context9.next = 47;
          return writeData(writable, directoryArray.slice(directoryDiskOffset, offset));
        case 47:
          directoryDiskOffset = offset;
        case 48:
          offset += directoryEntryLength;
          if (!options.onprogress) {
            _context9.next = 57;
            break;
          }
          _context9.prev = 50;
          _context9.next = 53;
          return options.onprogress(indexFileEntry + 1, files.size, new _zipEntry.Entry(_fileEntry));
        case 53:
          _context9.next = 57;
          break;
        case 55:
          _context9.prev = 55;
          _context9.t0 = _context9["catch"](50);
        case 57:
          _context9.next = 17;
          break;
        case 59:
          _context9.next = 64;
          break;
        case 61:
          _context9.prev = 61;
          _context9.t1 = _context9["catch"](15);
          _iterator2.e(_context9.t1);
        case 64:
          _context9.prev = 64;
          _iterator2.f();
          return _context9.finish(64);
        case 67:
          _context9.next = 69;
          return writeData(writable, directoryDiskOffset ? directoryArray.slice(directoryDiskOffset) : directoryArray);
        case 69:
          lastDiskNumber = writer.diskNumber;
          availableSize = writer.availableSize;
          if (availableSize < _constants.END_OF_CENTRAL_DIR_LENGTH) {
            lastDiskNumber++;
          }
          zip64 = getOptionValue(zipWriter, options, "zip64");
          if (!(directoryOffset >= _constants.MAX_32_BITS || directoryDataLength >= _constants.MAX_32_BITS || filesLength >= _constants.MAX_16_BITS || lastDiskNumber >= _constants.MAX_16_BITS)) {
            _context9.next = 79;
            break;
          }
          if (!(zip64 === false)) {
            _context9.next = 78;
            break;
          }
          throw new Error(ERR_UNSUPPORTED_FORMAT);
        case 78:
          zip64 = true;
        case 79:
          endOfdirectoryArray = new Uint8Array(zip64 ? _constants.ZIP64_END_OF_CENTRAL_DIR_TOTAL_LENGTH : _constants.END_OF_CENTRAL_DIR_LENGTH);
          endOfdirectoryView = getDataView(endOfdirectoryArray);
          offset = 0;
          if (zip64) {
            setUint32(endOfdirectoryView, 0, _constants.ZIP64_END_OF_CENTRAL_DIR_SIGNATURE);
            setBigUint64(endOfdirectoryView, 4, BigInt(44));
            setUint16(endOfdirectoryView, 12, 45);
            setUint16(endOfdirectoryView, 14, 45);
            setUint32(endOfdirectoryView, 16, lastDiskNumber);
            setUint32(endOfdirectoryView, 20, diskNumber);
            setBigUint64(endOfdirectoryView, 24, BigInt(filesLength));
            setBigUint64(endOfdirectoryView, 32, BigInt(filesLength));
            setBigUint64(endOfdirectoryView, 40, BigInt(directoryDataLength));
            setBigUint64(endOfdirectoryView, 48, BigInt(directoryOffset));
            setUint32(endOfdirectoryView, 56, _constants.ZIP64_END_OF_CENTRAL_DIR_LOCATOR_SIGNATURE);
            setBigUint64(endOfdirectoryView, 64, BigInt(directoryOffset) + BigInt(directoryDataLength));
            setUint32(endOfdirectoryView, 72, lastDiskNumber + 1);
            supportZip64SplitFile = getOptionValue(zipWriter, options, "supportZip64SplitFile", true);
            if (supportZip64SplitFile) {
              lastDiskNumber = _constants.MAX_16_BITS;
              diskNumber = _constants.MAX_16_BITS;
            }
            filesLength = _constants.MAX_16_BITS;
            directoryOffset = _constants.MAX_32_BITS;
            directoryDataLength = _constants.MAX_32_BITS;
            offset += _constants.ZIP64_END_OF_CENTRAL_DIR_LENGTH + _constants.ZIP64_END_OF_CENTRAL_DIR_LOCATOR_LENGTH;
          }
          setUint32(endOfdirectoryView, offset, _constants.END_OF_CENTRAL_DIR_SIGNATURE);
          setUint16(endOfdirectoryView, offset + 4, lastDiskNumber);
          setUint16(endOfdirectoryView, offset + 6, diskNumber);
          setUint16(endOfdirectoryView, offset + 8, filesLength);
          setUint16(endOfdirectoryView, offset + 10, filesLength);
          setUint32(endOfdirectoryView, offset + 12, directoryDataLength);
          setUint32(endOfdirectoryView, offset + 16, directoryOffset);
          commentLength = getLength(comment);
          if (!commentLength) {
            _context9.next = 97;
            break;
          }
          if (!(commentLength <= _constants.MAX_16_BITS)) {
            _context9.next = 96;
            break;
          }
          setUint16(endOfdirectoryView, offset + 20, commentLength);
          _context9.next = 97;
          break;
        case 96:
          throw new Error(ERR_INVALID_COMMENT);
        case 97:
          _context9.next = 99;
          return writeData(writable, endOfdirectoryArray);
        case 99:
          if (!commentLength) {
            _context9.next = 102;
            break;
          }
          _context9.next = 102;
          return writeData(writable, comment);
        case 102:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[15, 61, 64, 67], [50, 55]]);
  }));
  return _closeFile.apply(this, arguments);
}
function sliceAsArrayBuffer(blob, start, end) {
  if (start || end) {
    return blob.slice(start, end).arrayBuffer();
  } else {
    return blob.arrayBuffer();
  }
}
function writeData(_x23, _x24) {
  return _writeData.apply(this, arguments);
}
function _writeData() {
  _writeData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(writable, array) {
    var streamWriter;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          streamWriter = writable.getWriter();
          _context10.next = 3;
          return streamWriter.ready;
        case 3:
          writable.size += getLength(array);
          _context10.next = 6;
          return streamWriter.write(array);
        case 6:
          streamWriter.releaseLock();
        case 7:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return _writeData.apply(this, arguments);
}
function getTimeNTFS(date) {
  if (date) {
    return (BigInt(date.getTime()) + BigInt(11644473600000)) * BigInt(10000);
  }
}
function getOptionValue(zipWriter, options, name, defaultValue) {
  var result = options[name] === _constants.UNDEFINED_VALUE ? zipWriter.options[name] : options[name];
  return result === _constants.UNDEFINED_VALUE ? defaultValue : result;
}
function getMaximumCompressedSize(uncompressedSize) {
  return uncompressedSize + 5 * (Math.floor(uncompressedSize / 16383) + 1);
}
function setUint8(view, offset, value) {
  view.setUint8(offset, value);
}
function setUint16(view, offset, value) {
  view.setUint16(offset, value, true);
}
function setUint32(view, offset, value) {
  view.setUint32(offset, value, true);
}
function setBigUint64(view, offset, value) {
  view.setBigUint64(offset, value, true);
}
function arraySet(array, typedArray, offset) {
  array.set(typedArray, offset);
}
function getDataView(array) {
  return new DataView(array.buffer);
}
function getLength() {
  var result = 0;
  for (var _len = arguments.length, arrayLikes = new Array(_len), _key = 0; _key < _len; _key++) {
    arrayLikes[_key] = arguments[_key];
  }
  arrayLikes.forEach(function (arrayLike) {
    return arrayLike && (result += arrayLike.length);
  });
  return result;
}
},{"./constants.js":"../node_modules/@zip.js/zip.js/lib/core/constants.js","./configuration.js":"../node_modules/@zip.js/zip.js/lib/core/configuration.js","./codec-pool.js":"../node_modules/@zip.js/zip.js/lib/core/codec-pool.js","./io.js":"../node_modules/@zip.js/zip.js/lib/core/io.js","./util/encode-text.js":"../node_modules/@zip.js/zip.js/lib/core/util/encode-text.js","./zip-entry.js":"../node_modules/@zip.js/zip.js/lib/core/zip-entry.js"}],"../node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;
function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}
(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }
  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();
function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  }
  // if setTimeout wasn't available but was latter defined
  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}
function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  }
  // if clearTimeout wasn't available but was latter defined
  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;
function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }
  draining = false;
  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }
  if (queue.length) {
    drainQueue();
  }
}
function drainQueue() {
  if (draining) {
    return;
  }
  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;
  while (len) {
    currentQueue = queue;
    queue = [];
    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}
process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }
  queue.push(new Item(fun, args));
  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
};

// v8 likes predictible objects
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};
process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};
function noop() {}
process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;
process.listeners = function (name) {
  return [];
};
process.binding = function (name) {
  throw new Error('process.binding is not supported');
};
process.cwd = function () {
  return '/';
};
process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};
process.umask = function () {
  return 0;
};
},{}],"../node_modules/@zip.js/zip.js/lib/core/zip-fs-core.js":[function(require,module,exports) {
var define;
var process = require("process");
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fs = void 0;
var _io = require("./io.js");
var _zipReader = require("./zip-reader.js");
var _zipWriter = require("./zip-writer.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var ZipEntry = /*#__PURE__*/function () {
  function ZipEntry(fs, name, params, parent) {
    _classCallCheck(this, ZipEntry);
    var zipEntry = this;
    if (fs.root && parent && parent.getChildByName(name)) {
      throw new Error("Entry filename already exists");
    }
    if (!params) {
      params = {};
    }
    Object.assign(zipEntry, {
      fs: fs,
      name: name,
      data: params.data,
      id: fs.entries.length,
      parent: parent,
      children: [],
      uncompressedSize: 0
    });
    fs.entries.push(zipEntry);
    if (parent) {
      zipEntry.parent.children.push(zipEntry);
    }
  }
  _createClass(ZipEntry, [{
    key: "moveTo",
    value: function moveTo(target) {
      // deprecated
      var zipEntry = this;
      zipEntry.fs.move(zipEntry, target);
    }
  }, {
    key: "getFullname",
    value: function getFullname() {
      return this.getRelativeName();
    }
  }, {
    key: "getRelativeName",
    value: function getRelativeName() {
      var ancestor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.fs.root;
      var zipEntry = this;
      var relativeName = zipEntry.name;
      var entry = zipEntry.parent;
      while (entry && entry != ancestor) {
        relativeName = (entry.name ? entry.name + "/" : "") + relativeName;
        entry = entry.parent;
      }
      return relativeName;
    }
  }, {
    key: "isDescendantOf",
    value: function isDescendantOf(ancestor) {
      var entry = this.parent;
      while (entry && entry.id != ancestor.id) {
        entry = entry.parent;
      }
      return Boolean(entry);
    }
  }]);
  return ZipEntry;
}();
var ZipFileEntry = /*#__PURE__*/function (_ZipEntry) {
  _inherits(ZipFileEntry, _ZipEntry);
  var _super = _createSuper(ZipFileEntry);
  function ZipFileEntry(fs, name, params, parent) {
    var _this;
    _classCallCheck(this, ZipFileEntry);
    _this = _super.call(this, fs, name, params, parent);
    var zipEntry = _assertThisInitialized(_this);
    zipEntry.Reader = params.Reader;
    zipEntry.Writer = params.Writer;
    if (params.getData) {
      zipEntry.getData = params.getData;
    }
    return _this;
  }
  _createClass(ZipFileEntry, [{
    key: "getData",
    value: function () {
      var _getData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(writer) {
        var options,
          zipEntry,
          reader,
          readable,
          _args = arguments;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
              zipEntry = this;
              if (!(!writer || writer.constructor == zipEntry.Writer && zipEntry.data)) {
                _context.next = 6;
                break;
              }
              return _context.abrupt("return", zipEntry.data);
            case 6:
              reader = zipEntry.reader = new zipEntry.Reader(zipEntry.data, options);
              _context.next = 9;
              return Promise.all([(0, _io.initStream)(reader), (0, _io.initStream)(writer, zipEntry.data.uncompressedSize)]);
            case 9:
              readable = reader.readable;
              readable.size = zipEntry.uncompressedSize = reader.size;
              _context.next = 13;
              return readable.pipeTo(writer.writable);
            case 13:
              return _context.abrupt("return", writer.getData ? writer.getData() : writer.writable);
            case 14:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function getData(_x) {
        return _getData.apply(this, arguments);
      }
      return getData;
    }()
  }, {
    key: "getText",
    value: function getText(encoding, options) {
      return this.getData(new _io.TextWriter(encoding), options);
    }
  }, {
    key: "getBlob",
    value: function getBlob(mimeType, options) {
      return this.getData(new _io.BlobWriter(mimeType), options);
    }
  }, {
    key: "getData64URI",
    value: function getData64URI(mimeType, options) {
      return this.getData(new _io.Data64URIWriter(mimeType), options);
    }
  }, {
    key: "getUint8Array",
    value: function getUint8Array(options) {
      return this.getData(new _io.Uint8ArrayWriter(), options);
    }
  }, {
    key: "getWritable",
    value: function getWritable() {
      var writable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new WritableStream();
      var options = arguments.length > 1 ? arguments[1] : undefined;
      return this.getData({
        writable: writable
      }, options);
    }
  }, {
    key: "replaceBlob",
    value: function replaceBlob(blob) {
      Object.assign(this, {
        data: blob,
        Reader: _io.BlobReader,
        Writer: _io.BlobWriter,
        reader: null
      });
    }
  }, {
    key: "replaceText",
    value: function replaceText(text) {
      Object.assign(this, {
        data: text,
        Reader: _io.TextReader,
        Writer: _io.TextWriter,
        reader: null
      });
    }
  }, {
    key: "replaceData64URI",
    value: function replaceData64URI(dataURI) {
      Object.assign(this, {
        data: dataURI,
        Reader: _io.Data64URIReader,
        Writer: _io.Data64URIWriter,
        reader: null
      });
    }
  }, {
    key: "replaceUint8Array",
    value: function replaceUint8Array(array) {
      Object.assign(this, {
        data: array,
        Reader: _io.Uint8ArrayReader,
        Writer: _io.Uint8ArrayWriter,
        reader: null
      });
    }
  }, {
    key: "replaceReadable",
    value: function replaceReadable(readable) {
      Object.assign(this, {
        data: null,
        Reader: function Reader() {
          return {
            readable: readable
          };
        },
        Writer: null,
        reader: null
      });
    }
  }]);
  return ZipFileEntry;
}(ZipEntry);
var ZipDirectoryEntry = /*#__PURE__*/function (_ZipEntry2) {
  _inherits(ZipDirectoryEntry, _ZipEntry2);
  var _super2 = _createSuper(ZipDirectoryEntry);
  function ZipDirectoryEntry(fs, name, params, parent) {
    var _this2;
    _classCallCheck(this, ZipDirectoryEntry);
    _this2 = _super2.call(this, fs, name, params, parent);
    _this2.directory = true;
    return _this2;
  }
  _createClass(ZipDirectoryEntry, [{
    key: "addDirectory",
    value: function addDirectory(name) {
      return addChild(this, name, null, true);
    }
  }, {
    key: "addText",
    value: function addText(name, text) {
      return addChild(this, name, {
        data: text,
        Reader: _io.TextReader,
        Writer: _io.TextWriter
      });
    }
  }, {
    key: "addBlob",
    value: function addBlob(name, blob) {
      return addChild(this, name, {
        data: blob,
        Reader: _io.BlobReader,
        Writer: _io.BlobWriter
      });
    }
  }, {
    key: "addData64URI",
    value: function addData64URI(name, dataURI) {
      return addChild(this, name, {
        data: dataURI,
        Reader: _io.Data64URIReader,
        Writer: _io.Data64URIWriter
      });
    }
  }, {
    key: "addUint8Array",
    value: function addUint8Array(name, array) {
      return addChild(this, name, {
        data: array,
        Reader: _io.Uint8ArrayReader,
        Writer: _io.Uint8ArrayWriter
      });
    }
  }, {
    key: "addHttpContent",
    value: function addHttpContent(name, url) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return addChild(this, name, {
        data: url,
        Reader: /*#__PURE__*/function (_HttpReader) {
          _inherits(Reader, _HttpReader);
          var _super3 = _createSuper(Reader);
          function Reader(url) {
            _classCallCheck(this, Reader);
            return _super3.call(this, url, options);
          }
          return _createClass(Reader);
        }(_io.HttpReader)
      });
    }
  }, {
    key: "addReadable",
    value: function addReadable(name, readable) {
      return addChild(this, name, {
        Reader: function Reader() {
          return {
            readable: readable
          };
        }
      });
    }
  }, {
    key: "addFileSystemEntry",
    value: function addFileSystemEntry(fileSystemEntry) {
      return _addFileSystemEntry(this, fileSystemEntry);
    }
  }, {
    key: "addData",
    value: function addData(name, params) {
      return addChild(this, name, params);
    }
  }, {
    key: "importBlob",
    value: function () {
      var _importBlob = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(blob) {
        var options,
          _args2 = arguments;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
              _context2.next = 3;
              return this.importZip(new _io.BlobReader(blob), options);
            case 3:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function importBlob(_x2) {
        return _importBlob.apply(this, arguments);
      }
      return importBlob;
    }()
  }, {
    key: "importData64URI",
    value: function () {
      var _importData64URI = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(dataURI) {
        var options,
          _args3 = arguments;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
              _context3.next = 3;
              return this.importZip(new _io.Data64URIReader(dataURI), options);
            case 3:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function importData64URI(_x3) {
        return _importData64URI.apply(this, arguments);
      }
      return importData64URI;
    }()
  }, {
    key: "importUint8Array",
    value: function () {
      var _importUint8Array = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(array) {
        var options,
          _args4 = arguments;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
              _context4.next = 3;
              return this.importZip(new _io.Uint8ArrayReader(array), options);
            case 3:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function importUint8Array(_x4) {
        return _importUint8Array.apply(this, arguments);
      }
      return importUint8Array;
    }()
  }, {
    key: "importHttpContent",
    value: function () {
      var _importHttpContent = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(url) {
        var options,
          _args5 = arguments;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              options = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
              _context5.next = 3;
              return this.importZip(new _io.HttpReader(url, options), options);
            case 3:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function importHttpContent(_x5) {
        return _importHttpContent.apply(this, arguments);
      }
      return importHttpContent;
    }()
  }, {
    key: "importReadable",
    value: function () {
      var _importReadable = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(readable) {
        var options,
          _args6 = arguments;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              options = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
              _context6.next = 3;
              return this.importZip({
                readable: readable
              }, options);
            case 3:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function importReadable(_x6) {
        return _importReadable.apply(this, arguments);
      }
      return importReadable;
    }()
  }, {
    key: "exportBlob",
    value: function exportBlob() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.exportZip(new _io.BlobWriter(options.mimeType || "application/zip"), options);
    }
  }, {
    key: "exportData64URI",
    value: function exportData64URI() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.exportZip(new _io.Data64URIWriter(options.mimeType || "application/zip"), options);
    }
  }, {
    key: "exportUint8Array",
    value: function exportUint8Array() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.exportZip(new _io.Uint8ArrayWriter(), options);
    }
  }, {
    key: "exportWritable",
    value: function () {
      var _exportWritable = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
        var writable,
          options,
          _args7 = arguments;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              writable = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : new WritableStream();
              options = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
              _context7.next = 4;
              return this.exportZip({
                writable: writable
              }, options);
            case 4:
              return _context7.abrupt("return", writable);
            case 5:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this);
      }));
      function exportWritable() {
        return _exportWritable.apply(this, arguments);
      }
      return exportWritable;
    }()
  }, {
    key: "importZip",
    value: function () {
      var _importZip = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(reader, options) {
        var _this3 = this;
        var zipReader, entries;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return (0, _io.initStream)(reader);
            case 2:
              zipReader = new _zipReader.ZipReader(reader, options);
              _context8.next = 5;
              return zipReader.getEntries();
            case 5:
              entries = _context8.sent;
              entries.forEach(function (entry) {
                var parent = _this3;
                var path = entry.filename.split("/");
                var name = path.pop();
                path.forEach(function (pathPart) {
                  return parent = parent.getChildByName(pathPart) || new ZipDirectoryEntry(_this3.fs, pathPart, null, parent);
                });
                if (!entry.directory) {
                  addChild(parent, name, {
                    data: entry,
                    Reader: getZipBlobReader(Object.assign({}, options))
                  });
                }
              });
            case 7:
            case "end":
              return _context8.stop();
          }
        }, _callee8);
      }));
      function importZip(_x7, _x8) {
        return _importZip.apply(this, arguments);
      }
      return importZip;
    }()
  }, {
    key: "exportZip",
    value: function () {
      var _exportZip2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(writer, options) {
        var zipEntry, zipWriter;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              zipEntry = this;
              _context9.next = 3;
              return Promise.all([initReaders(zipEntry), (0, _io.initStream)(writer)]);
            case 3:
              zipWriter = new _zipWriter.ZipWriter(writer, options);
              _context9.next = 6;
              return _exportZip(zipWriter, zipEntry, getTotalSize([zipEntry], "uncompressedSize"), options);
            case 6:
              _context9.next = 8;
              return zipWriter.close();
            case 8:
              return _context9.abrupt("return", writer.getData ? writer.getData() : writer.writable);
            case 9:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this);
      }));
      function exportZip(_x9, _x10) {
        return _exportZip2.apply(this, arguments);
      }
      return exportZip;
    }()
  }, {
    key: "getChildByName",
    value: function getChildByName(name) {
      var children = this.children;
      for (var childIndex = 0; childIndex < children.length; childIndex++) {
        var child = children[childIndex];
        if (child.name == name) {
          return child;
        }
      }
    }
  }]);
  return ZipDirectoryEntry;
}(ZipEntry);
var FS = /*#__PURE__*/function () {
  function FS() {
    _classCallCheck(this, FS);
    resetFS(this);
  }
  _createClass(FS, [{
    key: "children",
    get: function get() {
      return this.root.children;
    }
  }, {
    key: "remove",
    value: function remove(entry) {
      detach(entry);
      this.entries[entry.id] = null;
    }
  }, {
    key: "move",
    value: function move(entry, destination) {
      if (entry == this.root) {
        throw new Error("Root directory cannot be moved");
      } else {
        if (destination.directory) {
          if (!destination.isDescendantOf(entry)) {
            if (entry != destination) {
              if (destination.getChildByName(entry.name)) {
                throw new Error("Entry filename already exists");
              }
              detach(entry);
              entry.parent = destination;
              destination.children.push(entry);
            }
          } else {
            throw new Error("Entry is a ancestor of target entry");
          }
        } else {
          throw new Error("Target entry is not a directory");
        }
      }
    }
  }, {
    key: "find",
    value: function find(fullname) {
      var path = fullname.split("/");
      var node = this.root;
      for (var index = 0; node && index < path.length; index++) {
        node = node.getChildByName(path[index]);
      }
      return node;
    }
  }, {
    key: "getById",
    value: function getById(id) {
      return this.entries[id];
    }
  }, {
    key: "getChildByName",
    value: function getChildByName(name) {
      return this.root.getChildByName(name);
    }
  }, {
    key: "addDirectory",
    value: function addDirectory(name) {
      return this.root.addDirectory(name);
    }
  }, {
    key: "addText",
    value: function addText(name, text) {
      return this.root.addText(name, text);
    }
  }, {
    key: "addBlob",
    value: function addBlob(name, blob) {
      return this.root.addBlob(name, blob);
    }
  }, {
    key: "addData64URI",
    value: function addData64URI(name, dataURI) {
      return this.root.addData64URI(name, dataURI);
    }
  }, {
    key: "addHttpContent",
    value: function addHttpContent(name, url, options) {
      return this.root.addHttpContent(name, url, options);
    }
  }, {
    key: "addReadable",
    value: function addReadable(name, readable) {
      return this.root.addReadable(name, readable);
    }
  }, {
    key: "addFileSystemEntry",
    value: function addFileSystemEntry(fileSystemEntry) {
      return this.root.addFileSystemEntry(fileSystemEntry);
    }
  }, {
    key: "addData",
    value: function addData(name, params) {
      return this.root.addData(name, params);
    }
  }, {
    key: "importBlob",
    value: function () {
      var _importBlob2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(blob, options) {
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              resetFS(this);
              _context10.next = 3;
              return this.root.importBlob(blob, options);
            case 3:
            case "end":
              return _context10.stop();
          }
        }, _callee10, this);
      }));
      function importBlob(_x11, _x12) {
        return _importBlob2.apply(this, arguments);
      }
      return importBlob;
    }()
  }, {
    key: "importData64URI",
    value: function () {
      var _importData64URI2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(dataURI, options) {
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              resetFS(this);
              _context11.next = 3;
              return this.root.importData64URI(dataURI, options);
            case 3:
            case "end":
              return _context11.stop();
          }
        }, _callee11, this);
      }));
      function importData64URI(_x13, _x14) {
        return _importData64URI2.apply(this, arguments);
      }
      return importData64URI;
    }()
  }, {
    key: "importUint8Array",
    value: function () {
      var _importUint8Array2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(array, options) {
        return _regeneratorRuntime().wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              resetFS(this);
              _context12.next = 3;
              return this.root.importUint8Array(array, options);
            case 3:
            case "end":
              return _context12.stop();
          }
        }, _callee12, this);
      }));
      function importUint8Array(_x15, _x16) {
        return _importUint8Array2.apply(this, arguments);
      }
      return importUint8Array;
    }()
  }, {
    key: "importHttpContent",
    value: function () {
      var _importHttpContent2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(url, options) {
        return _regeneratorRuntime().wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              resetFS(this);
              _context13.next = 3;
              return this.root.importHttpContent(url, options);
            case 3:
            case "end":
              return _context13.stop();
          }
        }, _callee13, this);
      }));
      function importHttpContent(_x17, _x18) {
        return _importHttpContent2.apply(this, arguments);
      }
      return importHttpContent;
    }()
  }, {
    key: "importReadable",
    value: function () {
      var _importReadable2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(readable, options) {
        return _regeneratorRuntime().wrap(function _callee14$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              resetFS(this);
              _context14.next = 3;
              return this.root.importReadable(readable, options);
            case 3:
            case "end":
              return _context14.stop();
          }
        }, _callee14, this);
      }));
      function importReadable(_x19, _x20) {
        return _importReadable2.apply(this, arguments);
      }
      return importReadable;
    }()
  }, {
    key: "exportBlob",
    value: function exportBlob(options) {
      return this.root.exportBlob(options);
    }
  }, {
    key: "exportData64URI",
    value: function exportData64URI(options) {
      return this.root.exportData64URI(options);
    }
  }, {
    key: "exportUint8Array",
    value: function exportUint8Array(options) {
      return this.root.exportUint8Array(options);
    }
  }, {
    key: "exportWritable",
    value: function exportWritable(writable, options) {
      return this.root.exportWritable(writable, options);
    }
  }]);
  return FS;
}();
var fs = {
  FS: FS,
  ZipDirectoryEntry: ZipDirectoryEntry,
  ZipFileEntry: ZipFileEntry
};
exports.fs = fs;
function getTotalSize(entries, propertyName) {
  var size = 0;
  entries.forEach(process);
  return size;
  function process(entry) {
    size += entry[propertyName];
    if (entry.children) {
      entry.children.forEach(process);
    }
  }
}
function getZipBlobReader(options) {
  return /*#__PURE__*/function (_Reader) {
    _inherits(_class, _Reader);
    var _super4 = _createSuper(_class);
    function _class(entry) {
      var _this4;
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      _classCallCheck(this, _class);
      _this4 = _super4.call(this);
      _this4.entry = entry;
      _this4.options = options;
      return _this4;
    }
    _createClass(_class, [{
      key: "init",
      value: function () {
        var _init = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15() {
          var zipBlobReader, data;
          return _regeneratorRuntime().wrap(function _callee15$(_context15) {
            while (1) switch (_context15.prev = _context15.next) {
              case 0:
                _get(_getPrototypeOf(_class.prototype), "init", this).call(this);
                zipBlobReader = this;
                zipBlobReader.size = zipBlobReader.entry.uncompressedSize;
                _context15.next = 5;
                return zipBlobReader.entry.getData(new _io.BlobWriter(), Object.assign({}, zipBlobReader.options, options));
              case 5:
                data = _context15.sent;
                zipBlobReader.data = data;
                zipBlobReader.blobReader = new _io.BlobReader(data);
              case 8:
              case "end":
                return _context15.stop();
            }
          }, _callee15, this);
        }));
        function init() {
          return _init.apply(this, arguments);
        }
        return init;
      }()
    }, {
      key: "readUint8Array",
      value: function readUint8Array(index, length) {
        return this.blobReader.readUint8Array(index, length);
      }
    }]);
    return _class;
  }(_io.Reader);
}
function initReaders(_x21) {
  return _initReaders.apply(this, arguments);
}
function _initReaders() {
  _initReaders = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(entry) {
    var _iterator, _step, child, reader;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          if (!entry.children.length) {
            _context16.next = 25;
            break;
          }
          _iterator = _createForOfIteratorHelper(entry.children);
          _context16.prev = 2;
          _iterator.s();
        case 4:
          if ((_step = _iterator.n()).done) {
            _context16.next = 17;
            break;
          }
          child = _step.value;
          if (!child.directory) {
            _context16.next = 11;
            break;
          }
          _context16.next = 9;
          return initReaders(child);
        case 9:
          _context16.next = 15;
          break;
        case 11:
          reader = child.reader = new child.Reader(child.data);
          _context16.next = 14;
          return (0, _io.initStream)(reader);
        case 14:
          child.uncompressedSize = reader.size;
        case 15:
          _context16.next = 4;
          break;
        case 17:
          _context16.next = 22;
          break;
        case 19:
          _context16.prev = 19;
          _context16.t0 = _context16["catch"](2);
          _iterator.e(_context16.t0);
        case 22:
          _context16.prev = 22;
          _iterator.f();
          return _context16.finish(22);
        case 25:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[2, 19, 22, 25]]);
  }));
  return _initReaders.apply(this, arguments);
}
function detach(entry) {
  var children = entry.parent.children;
  children.forEach(function (child, index) {
    if (child.id == entry.id) {
      children.splice(index, 1);
    }
  });
}
function _exportZip(_x22, _x23, _x24, _x25) {
  return _exportZip3.apply(this, arguments);
}
function _exportZip3() {
  _exportZip3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee21(zipWriter, entry, totalSize, options) {
    var selectedEntry, entryOffsets, process, _process;
    return _regeneratorRuntime().wrap(function _callee21$(_context21) {
      while (1) switch (_context21.prev = _context21.next) {
        case 0:
          _process = function _process3() {
            _process = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20(zipWriter, entry) {
              var exportChild, _exportChild, processChild, _processChild;
              return _regeneratorRuntime().wrap(function _callee20$(_context20) {
                while (1) switch (_context20.prev = _context20.next) {
                  case 0:
                    _processChild = function _processChild3() {
                      _processChild = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(child) {
                        var name;
                        return _regeneratorRuntime().wrap(function _callee19$(_context19) {
                          while (1) switch (_context19.prev = _context19.next) {
                            case 0:
                              name = options.relativePath ? child.getRelativeName(selectedEntry) : child.getFullname();
                              _context19.next = 3;
                              return zipWriter.add(name, child.reader, Object.assign({
                                directory: child.directory
                              }, Object.assign({}, options, {
                                onprogress: function () {
                                  var _onprogress = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(indexProgress) {
                                    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
                                      while (1) switch (_context18.prev = _context18.next) {
                                        case 0:
                                          if (!options.onprogress) {
                                            _context18.next = 9;
                                            break;
                                          }
                                          entryOffsets.set(name, indexProgress);
                                          _context18.prev = 2;
                                          _context18.next = 5;
                                          return options.onprogress(Array.from(entryOffsets.values()).reduce(function (previousValue, currentValue) {
                                            return previousValue + currentValue;
                                          }), totalSize);
                                        case 5:
                                          _context18.next = 9;
                                          break;
                                        case 7:
                                          _context18.prev = 7;
                                          _context18.t0 = _context18["catch"](2);
                                        case 9:
                                        case "end":
                                          return _context18.stop();
                                      }
                                    }, _callee18, null, [[2, 7]]);
                                  }));
                                  function onprogress(_x31) {
                                    return _onprogress.apply(this, arguments);
                                  }
                                  return onprogress;
                                }()
                              })));
                            case 3:
                              _context19.next = 5;
                              return process(zipWriter, child);
                            case 5:
                            case "end":
                              return _context19.stop();
                          }
                        }, _callee19);
                      }));
                      return _processChild.apply(this, arguments);
                    };
                    processChild = function _processChild2(_x30) {
                      return _processChild.apply(this, arguments);
                    };
                    _exportChild = function _exportChild3() {
                      _exportChild = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17() {
                        var _iterator2, _step2, child;
                        return _regeneratorRuntime().wrap(function _callee17$(_context17) {
                          while (1) switch (_context17.prev = _context17.next) {
                            case 0:
                              if (!options.bufferedWrite) {
                                _context17.next = 5;
                                break;
                              }
                              _context17.next = 3;
                              return Promise.all(entry.children.map(processChild));
                            case 3:
                              _context17.next = 22;
                              break;
                            case 5:
                              _iterator2 = _createForOfIteratorHelper(entry.children);
                              _context17.prev = 6;
                              _iterator2.s();
                            case 8:
                              if ((_step2 = _iterator2.n()).done) {
                                _context17.next = 14;
                                break;
                              }
                              child = _step2.value;
                              _context17.next = 12;
                              return processChild(child);
                            case 12:
                              _context17.next = 8;
                              break;
                            case 14:
                              _context17.next = 19;
                              break;
                            case 16:
                              _context17.prev = 16;
                              _context17.t0 = _context17["catch"](6);
                              _iterator2.e(_context17.t0);
                            case 19:
                              _context17.prev = 19;
                              _iterator2.f();
                              return _context17.finish(19);
                            case 22:
                            case "end":
                              return _context17.stop();
                          }
                        }, _callee17, null, [[6, 16, 19, 22]]);
                      }));
                      return _exportChild.apply(this, arguments);
                    };
                    exportChild = function _exportChild2() {
                      return _exportChild.apply(this, arguments);
                    };
                    _context20.next = 6;
                    return exportChild();
                  case 6:
                  case "end":
                    return _context20.stop();
                }
              }, _callee20);
            }));
            return _process.apply(this, arguments);
          };
          process = function _process2(_x28, _x29) {
            return _process.apply(this, arguments);
          };
          selectedEntry = entry;
          entryOffsets = new Map();
          _context21.next = 6;
          return process(zipWriter, entry);
        case 6:
        case "end":
          return _context21.stop();
      }
    }, _callee21);
  }));
  return _exportZip3.apply(this, arguments);
}
function _addFileSystemEntry(_x26, _x27) {
  return _addFileSystemEntry2.apply(this, arguments);
}
function _addFileSystemEntry2() {
  _addFileSystemEntry2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee23(zipEntry, fileSystemEntry) {
    var entry, addDirectory, _addDirectory, getChildren;
    return _regeneratorRuntime().wrap(function _callee23$(_context24) {
      while (1) switch (_context24.prev = _context24.next) {
        case 0:
          getChildren = function _getChildren(fileEntry) {
            return new Promise(function (resolve, reject) {
              var entries = [];
              if (fileEntry.isDirectory) {
                readEntries(fileEntry.createReader());
              }
              if (fileEntry.isFile) {
                resolve(entries);
              }
              function readEntries(directoryReader) {
                directoryReader.readEntries(function (temporaryEntries) {
                  if (!temporaryEntries.length) {
                    resolve(entries);
                  } else {
                    entries = entries.concat(temporaryEntries);
                    readEntries(directoryReader);
                  }
                }, reject);
              }
            });
          };
          _addDirectory = function _addDirectory3() {
            _addDirectory = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee22(zipEntry, fileEntry) {
              var children, _iterator3, _step3, _loop;
              return _regeneratorRuntime().wrap(function _callee22$(_context23) {
                while (1) switch (_context23.prev = _context23.next) {
                  case 0:
                    _context23.next = 2;
                    return getChildren(fileEntry);
                  case 2:
                    children = _context23.sent;
                    _iterator3 = _createForOfIteratorHelper(children);
                    _context23.prev = 4;
                    _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
                      var child;
                      return _regeneratorRuntime().wrap(function _loop$(_context22) {
                        while (1) switch (_context22.prev = _context22.next) {
                          case 0:
                            child = _step3.value;
                            if (!child.isDirectory) {
                              _context22.next = 6;
                              break;
                            }
                            _context22.next = 4;
                            return addDirectory(zipEntry.addDirectory(child.name), child);
                          case 4:
                            _context22.next = 8;
                            break;
                          case 6:
                            _context22.next = 8;
                            return new Promise(function (resolve, reject) {
                              child.file(function (file) {
                                var childZipEntry = zipEntry.addBlob(child.name, file);
                                childZipEntry.uncompressedSize = file.size;
                                resolve(childZipEntry);
                              }, reject);
                            });
                          case 8:
                          case "end":
                            return _context22.stop();
                        }
                      }, _loop);
                    });
                    _iterator3.s();
                  case 7:
                    if ((_step3 = _iterator3.n()).done) {
                      _context23.next = 11;
                      break;
                    }
                    return _context23.delegateYield(_loop(), "t0", 9);
                  case 9:
                    _context23.next = 7;
                    break;
                  case 11:
                    _context23.next = 16;
                    break;
                  case 13:
                    _context23.prev = 13;
                    _context23.t1 = _context23["catch"](4);
                    _iterator3.e(_context23.t1);
                  case 16:
                    _context23.prev = 16;
                    _iterator3.f();
                    return _context23.finish(16);
                  case 19:
                  case "end":
                    return _context23.stop();
                }
              }, _callee22, null, [[4, 13, 16, 19]]);
            }));
            return _addDirectory.apply(this, arguments);
          };
          addDirectory = function _addDirectory2(_x32, _x33) {
            return _addDirectory.apply(this, arguments);
          };
          if (!fileSystemEntry.isDirectory) {
            _context24.next = 10;
            break;
          }
          entry = zipEntry.addDirectory(fileSystemEntry.name);
          _context24.next = 7;
          return addDirectory(entry, fileSystemEntry);
        case 7:
          return _context24.abrupt("return", entry);
        case 10:
          return _context24.abrupt("return", new Promise(function (resolve, reject) {
            return fileSystemEntry.file(function (file) {
              return resolve(zipEntry.addBlob(fileSystemEntry.name, file));
            }, reject);
          }));
        case 11:
        case "end":
          return _context24.stop();
      }
    }, _callee23);
  }));
  return _addFileSystemEntry2.apply(this, arguments);
}
function resetFS(fs) {
  fs.entries = [];
  fs.root = new ZipDirectoryEntry(fs);
}
function addChild(parent, name, params, directory) {
  if (parent.directory) {
    return directory ? new ZipDirectoryEntry(parent.fs, name, params, parent) : new ZipFileEntry(parent.fs, name, params, parent);
  } else {
    throw new Error("Parent entry is not a directory");
  }
}
},{"./io.js":"../node_modules/@zip.js/zip.js/lib/core/io.js","./zip-reader.js":"../node_modules/@zip.js/zip.js/lib/core/zip-reader.js","./zip-writer.js":"../node_modules/@zip.js/zip.js/lib/core/zip-writer.js","process":"../node_modules/process/browser.js"}],"../node_modules/@zip.js/zip.js/lib/zip-fs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  configure: true,
  getMimeType: true,
  initShimAsyncCodec: true,
  terminateWorkers: true
};
Object.defineProperty(exports, "configure", {
  enumerable: true,
  get: function () {
    return _configuration.configure;
  }
});
Object.defineProperty(exports, "getMimeType", {
  enumerable: true,
  get: function () {
    return _defaultMimeType.getMimeType;
  }
});
Object.defineProperty(exports, "initShimAsyncCodec", {
  enumerable: true,
  get: function () {
    return _streamCodecShim.initShimAsyncCodec;
  }
});
Object.defineProperty(exports, "terminateWorkers", {
  enumerable: true,
  get: function () {
    return _codecPool.terminateWorkers;
  }
});
var _configuration = require("./core/configuration.js");
var _zWorkerInline = require("./z-worker-inline.js");
var _defaultMimeType = require("./core/util/default-mime-type.js");
var _streamCodecShim = require("./core/util/stream-codec-shim.js");
var _codecPool = require("./core/codec-pool.js");
var _io = require("./core/io.js");
Object.keys(_io).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _io[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _io[key];
    }
  });
});
var _zipReader = require("./core/zip-reader.js");
Object.keys(_zipReader).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _zipReader[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _zipReader[key];
    }
  });
});
var _zipWriter = require("./core/zip-writer.js");
Object.keys(_zipWriter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _zipWriter[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _zipWriter[key];
    }
  });
});
var _zipFsCore = require("./core/zip-fs-core.js");
Object.keys(_zipFsCore).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _zipFsCore[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _zipFsCore[key];
    }
  });
});
/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var baseURL;
try {
  baseURL = import.meta.url;
} catch (_error) {
  // ignored
}
(0, _configuration.configure)({
  baseURL: baseURL
});
(0, _zWorkerInline.configureWebWorker)(_configuration.configure);
},{"./core/configuration.js":"../node_modules/@zip.js/zip.js/lib/core/configuration.js","./z-worker-inline.js":"../node_modules/@zip.js/zip.js/lib/z-worker-inline.js","./core/util/default-mime-type.js":"../node_modules/@zip.js/zip.js/lib/core/util/default-mime-type.js","./core/util/stream-codec-shim.js":"../node_modules/@zip.js/zip.js/lib/core/util/stream-codec-shim.js","./core/codec-pool.js":"../node_modules/@zip.js/zip.js/lib/core/codec-pool.js","./core/io.js":"../node_modules/@zip.js/zip.js/lib/core/io.js","./core/zip-reader.js":"../node_modules/@zip.js/zip.js/lib/core/zip-reader.js","./core/zip-writer.js":"../node_modules/@zip.js/zip.js/lib/core/zip-writer.js","./core/zip-fs-core.js":"../node_modules/@zip.js/zip.js/lib/core/zip-fs-core.js"}],"../node_modules/@zip.js/zip.js/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "BlobReader", {
  enumerable: true,
  get: function () {
    return _zipFs.BlobReader;
  }
});
Object.defineProperty(exports, "BlobWriter", {
  enumerable: true,
  get: function () {
    return _zipFs.BlobWriter;
  }
});
Object.defineProperty(exports, "Data64URIReader", {
  enumerable: true,
  get: function () {
    return _zipFs.Data64URIReader;
  }
});
Object.defineProperty(exports, "Data64URIWriter", {
  enumerable: true,
  get: function () {
    return _zipFs.Data64URIWriter;
  }
});
Object.defineProperty(exports, "ERR_BAD_FORMAT", {
  enumerable: true,
  get: function () {
    return _zipFs.ERR_BAD_FORMAT;
  }
});
Object.defineProperty(exports, "ERR_CENTRAL_DIRECTORY_NOT_FOUND", {
  enumerable: true,
  get: function () {
    return _zipFs.ERR_CENTRAL_DIRECTORY_NOT_FOUND;
  }
});
Object.defineProperty(exports, "ERR_DUPLICATED_NAME", {
  enumerable: true,
  get: function () {
    return _zipFs.ERR_DUPLICATED_NAME;
  }
});
Object.defineProperty(exports, "ERR_ENCRYPTED", {
  enumerable: true,
  get: function () {
    return _zipFs.ERR_ENCRYPTED;
  }
});
Object.defineProperty(exports, "ERR_EOCDR_LOCATOR_ZIP64_NOT_FOUND", {
  enumerable: true,
  get: function () {
    return _zipFs.ERR_EOCDR_LOCATOR_ZIP64_NOT_FOUND;
  }
});
Object.defineProperty(exports, "ERR_EOCDR_NOT_FOUND", {
  enumerable: true,
  get: function () {
    return _zipFs.ERR_EOCDR_NOT_FOUND;
  }
});
Object.defineProperty(exports, "ERR_EOCDR_ZIP64_NOT_FOUND", {
  enumerable: true,
  get: function () {
    return _zipFs.ERR_EOCDR_ZIP64_NOT_FOUND;
  }
});
Object.defineProperty(exports, "ERR_EXTRAFIELD_ZIP64_NOT_FOUND", {
  enumerable: true,
  get: function () {
    return _zipFs.ERR_EXTRAFIELD_ZIP64_NOT_FOUND;
  }
});
Object.defineProperty(exports, "ERR_HTTP_RANGE", {
  enumerable: true,
  get: function () {
    return _zipFs.ERR_HTTP_RANGE;
  }
});
Object.defineProperty(exports, "ERR_INVALID_COMMENT", {
  enumerable: true,
  get: function () {
    return _zipFs.ERR_INVALID_COMMENT;
  }
});
Object.defineProperty(exports, "ERR_INVALID_ENCRYPTION_STRENGTH", {
  enumerable: true,
  get: function () {
    return _zipFs.ERR_INVALID_ENCRYPTION_STRENGTH;
  }
});
Object.defineProperty(exports, "ERR_INVALID_ENTRY_COMMENT", {
  enumerable: true,
  get: function () {
    return _zipFs.ERR_INVALID_ENTRY_COMMENT;
  }
});
Object.defineProperty(exports, "ERR_INVALID_ENTRY_NAME", {
  enumerable: true,
  get: function () {
    return _zipFs.ERR_INVALID_ENTRY_NAME;
  }
});
Object.defineProperty(exports, "ERR_INVALID_EXTRAFIELD_DATA", {
  enumerable: true,
  get: function () {
    return _zipFs.ERR_INVALID_EXTRAFIELD_DATA;
  }
});
Object.defineProperty(exports, "ERR_INVALID_EXTRAFIELD_TYPE", {
  enumerable: true,
  get: function () {
    return _zipFs.ERR_INVALID_EXTRAFIELD_TYPE;
  }
});
Object.defineProperty(exports, "ERR_INVALID_PASSWORD", {
  enumerable: true,
  get: function () {
    return _zipFs.ERR_INVALID_PASSWORD;
  }
});
Object.defineProperty(exports, "ERR_INVALID_SIGNATURE", {
  enumerable: true,
  get: function () {
    return _zipFs.ERR_INVALID_SIGNATURE;
  }
});
Object.defineProperty(exports, "ERR_INVALID_VERSION", {
  enumerable: true,
  get: function () {
    return _zipFs.ERR_INVALID_VERSION;
  }
});
Object.defineProperty(exports, "ERR_ITERATOR_COMPLETED_TOO_SOON", {
  enumerable: true,
  get: function () {
    return _zipFs.ERR_ITERATOR_COMPLETED_TOO_SOON;
  }
});
Object.defineProperty(exports, "ERR_LOCAL_FILE_HEADER_NOT_FOUND", {
  enumerable: true,
  get: function () {
    return _zipFs.ERR_LOCAL_FILE_HEADER_NOT_FOUND;
  }
});
Object.defineProperty(exports, "ERR_SPLIT_ZIP_FILE", {
  enumerable: true,
  get: function () {
    return _zipFs.ERR_SPLIT_ZIP_FILE;
  }
});
Object.defineProperty(exports, "ERR_UNSUPPORTED_COMPRESSION", {
  enumerable: true,
  get: function () {
    return _zipFs.ERR_UNSUPPORTED_COMPRESSION;
  }
});
Object.defineProperty(exports, "ERR_UNSUPPORTED_ENCRYPTION", {
  enumerable: true,
  get: function () {
    return _zipFs.ERR_UNSUPPORTED_ENCRYPTION;
  }
});
Object.defineProperty(exports, "ERR_UNSUPPORTED_FORMAT", {
  enumerable: true,
  get: function () {
    return _zipFs.ERR_UNSUPPORTED_FORMAT;
  }
});
Object.defineProperty(exports, "HttpRangeReader", {
  enumerable: true,
  get: function () {
    return _zipFs.HttpRangeReader;
  }
});
Object.defineProperty(exports, "HttpReader", {
  enumerable: true,
  get: function () {
    return _zipFs.HttpReader;
  }
});
Object.defineProperty(exports, "Reader", {
  enumerable: true,
  get: function () {
    return _zipFs.Reader;
  }
});
Object.defineProperty(exports, "SplitDataReader", {
  enumerable: true,
  get: function () {
    return _zipFs.SplitDataReader;
  }
});
Object.defineProperty(exports, "SplitDataWriter", {
  enumerable: true,
  get: function () {
    return _zipFs.SplitDataWriter;
  }
});
Object.defineProperty(exports, "SplitZipReader", {
  enumerable: true,
  get: function () {
    return _zipFs.SplitZipReader;
  }
});
Object.defineProperty(exports, "SplitZipWriter", {
  enumerable: true,
  get: function () {
    return _zipFs.SplitZipWriter;
  }
});
Object.defineProperty(exports, "TextReader", {
  enumerable: true,
  get: function () {
    return _zipFs.TextReader;
  }
});
Object.defineProperty(exports, "TextWriter", {
  enumerable: true,
  get: function () {
    return _zipFs.TextWriter;
  }
});
Object.defineProperty(exports, "Uint8ArrayReader", {
  enumerable: true,
  get: function () {
    return _zipFs.Uint8ArrayReader;
  }
});
Object.defineProperty(exports, "Uint8ArrayWriter", {
  enumerable: true,
  get: function () {
    return _zipFs.Uint8ArrayWriter;
  }
});
Object.defineProperty(exports, "Writer", {
  enumerable: true,
  get: function () {
    return _zipFs.Writer;
  }
});
Object.defineProperty(exports, "ZipReader", {
  enumerable: true,
  get: function () {
    return _zipFs.ZipReader;
  }
});
Object.defineProperty(exports, "ZipWriter", {
  enumerable: true,
  get: function () {
    return _zipFs.ZipWriter;
  }
});
Object.defineProperty(exports, "configure", {
  enumerable: true,
  get: function () {
    return _zipFs.configure;
  }
});
Object.defineProperty(exports, "fs", {
  enumerable: true,
  get: function () {
    return _zipFs.fs;
  }
});
Object.defineProperty(exports, "getMimeType", {
  enumerable: true,
  get: function () {
    return _mimeType.getMimeType;
  }
});
Object.defineProperty(exports, "initShimAsyncCodec", {
  enumerable: true,
  get: function () {
    return _zipFs.initShimAsyncCodec;
  }
});
Object.defineProperty(exports, "terminateWorkers", {
  enumerable: true,
  get: function () {
    return _codecPool.terminateWorkers;
  }
});
var _deflate = require("./lib/core/streams/codecs/deflate.js");
var _inflate = require("./lib/core/streams/codecs/inflate.js");
var _configuration = require("./lib/core/configuration.js");
var _mimeType = require("./lib/core/util/mime-type.js");
var _codecPool = require("./lib/core/codec-pool.js");
var _zipFs = require("./lib/zip-fs.js");
/// <reference types="./index.d.ts" />

/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(0, _configuration.configure)({
  Deflate: _deflate.Deflate,
  Inflate: _inflate.Inflate
});
},{"./lib/core/streams/codecs/deflate.js":"../node_modules/@zip.js/zip.js/lib/core/streams/codecs/deflate.js","./lib/core/streams/codecs/inflate.js":"../node_modules/@zip.js/zip.js/lib/core/streams/codecs/inflate.js","./lib/core/configuration.js":"../node_modules/@zip.js/zip.js/lib/core/configuration.js","./lib/core/util/mime-type.js":"../node_modules/@zip.js/zip.js/lib/core/util/mime-type.js","./lib/core/codec-pool.js":"../node_modules/@zip.js/zip.js/lib/core/codec-pool.js","./lib/zip-fs.js":"../node_modules/@zip.js/zip.js/lib/zip-fs.js"}],"modules/zipreader.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getZip = void 0;
var _index = require("../../node_modules/@zip.js/zip.js/index.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var getZip = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(blob) {
    var zipFileBlob, zipFileReader, unzippedTextWriter, zipReader, firstEntry, fileSize, unzippedText;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          zipFileBlob = blob; // ----
          // Read the zip file
          // ----
          // Creates a BlobReader object used to read `zipFileBlob`.
          zipFileReader = new _index.BlobReader(zipFileBlob); // Creates a TextWriter object where the content of the first entry in the zip
          // will be written.
          unzippedTextWriter = new _index.TextWriter(); // Creates a ZipReader object reading the zip content via `zipFileReader`,
          // retrieves metadata (name, dates, etc.) of the first entry, retrieves its
          // content via `helloWorldWriter`, and closes the reader.
          zipReader = new _index.ZipReader(zipFileReader);
          _context.next = 6;
          return zipReader.getEntries();
        case 6:
          firstEntry = _context.sent.shift();
          fileSize = firstEntry.uncompressedSize;
          _context.next = 10;
          return firstEntry.getData(unzippedTextWriter);
        case 10:
          unzippedText = _context.sent;
          _context.next = 13;
          return zipReader.close();
        case 13:
          return _context.abrupt("return", {
            unzippedText: unzippedText,
            fileSize: fileSize
          });
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getZip(_x) {
    return _ref.apply(this, arguments);
  };
}();
exports.getZip = getZip;
},{"../../node_modules/@zip.js/zip.js/index.js":"../node_modules/@zip.js/zip.js/index.js"}],"app.js":[function(require,module,exports) {
var define;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DOM = exports.APP = void 0;
var _home = require("./modules/home.js");
var _info = require("./modules/info.js");
var _utilities = require("./modules/utilities.js");
var _zipreader = require("./modules/zipreader.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var DOM = {
  home: document.getElementsByClassName("home")[0],
  info: document.getElementsByClassName("info")[0],
  homeUpload: document.getElementsByClassName("home__upload")[0],
  homeExamples: document.getElementsByClassName("home__examples")[0],
  readGpxBtn: document.getElementsByClassName("upload__button")[0],
  uploadInput: document.getElementsByClassName("upload__input")[0],
  statisticsObject: document.getElementsByClassName("stats")[0],
  uploadText: document.getElementsByClassName("upload__text")[0],
  uploadUndertext: document.getElementsByClassName("upload__undertext")[0],
  uploadError: document.getElementsByClassName("upload__error")[0],
  uploadErrorHint: document.getElementsByClassName("upload__error-hint")[0],
  file_1: document.getElementsByClassName("examples__tile-1")[0],
  file_2: document.getElementsByClassName("examples__tile-2")[0],
  file_3: document.getElementsByClassName("examples__tile-3")[0],
  statsTable: document.getElementsByClassName("stats__table")[0]
};
exports.DOM = DOM;
var APP = function () {
  // Variables
  var stopTime = 10; // Time interval [s] when we consider user stopped.
  var stopSpeed = 0.3; // Slowest speed [m/s] considered a movement.
  var numberSmoothing = 3;
  var maxFileSize = 1e6;
  var gradientBoundaries = [-3, 1.5, 6];
  var gpxFile;
  var gpxFileContent;
  var gpxFileSize;
  var gpxText;
  var parser;
  var isUploadValid = false;
  var stats;
  _utilities.UTIL.StateManager.getStateManager(); // Initialization.
  _utilities.UTIL.StateManager.storeDom('home_baseState', DOM);
  _home.HOME.createStates();
  console.log(_utilities.UTIL.storedStates);

  //Here we prevent unwanted behaviour before loading the DOM:
  document.addEventListener("DOMContentLoaded", function () {
    console.log('DOM loaded.');
    DOM.home.classList.remove("no-click");
    // UTIL.StateManager.setState('home_domContentLoaded');		
  });

  // UTIL.StateManager.setState('home_domContentLoaded');
  _home.HOME.init();
  var validateUpload = function validateUpload() {
    return new Promise(function (resolve, reject) {
      DOM.uploadInput.addEventListener('change', checkUpload, false);
      DOM.uploadUndertext.addEventListener('click', displayHint, false);
      DOM.file_1.addEventListener('click', loadFile, false);
      DOM.file_2.addEventListener('click', loadFile, false);
      DOM.file_3.addEventListener('click', loadFile, false);
      function checkUpload(event) {
        console.log('Upload is being validated.');
        gpxFile = event.target.files[0];
        var extension = gpxFile.name.split('.')[1];
        if (extension != 'gpx') {
          // On wrong extension do that:
          isUploadValid = false;
          _utilities.UTIL.StateManager.setState('home_uploadError');
          setTimeout(function () {
            displayHint();
          }, 3000);
          reject(Error('This tool accepts only .gpx files.'));
        } else {
          isUploadValid = true;
          console.log('File is valid.');
          var reader = new FileReader();
          gpxFileSize = gpxFile.size;
          if (gpxFile) {
            reader.readAsText(gpxFile);
          }
          reader.addEventListener("load", function () {
            // this will then display a text file
            // console.log(reader.result);
            gpxFileContent = reader.result;
            resolve('File is valid.');
          }, false);
        }
      }
      function displayHint() {
        _utilities.UTIL.StateManager.setState('home_uploadErrorHint');
      }
      function loadFile(_x) {
        return _loadFile.apply(this, arguments);
      }
      function _loadFile() {
        _loadFile = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(event) {
          var response, zippedBlob, unzippedBlob;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                event.preventDefault();
                gpxFile = event.target.href;
                _context.next = 4;
                return fetch(event.target.href);
              case 4:
                response = _context.sent;
                _context.next = 7;
                return response.blob();
              case 7:
                zippedBlob = _context.sent;
                _context.next = 10;
                return (0, _zipreader.getZip)(zippedBlob);
              case 10:
                unzippedBlob = _context.sent;
                gpxFileContent = unzippedBlob.unzippedText;
                gpxFileSize = unzippedBlob.fileSize;
                console.log(gpxFileContent);
                console.log(gpxFileSize);
                resolve('File is valid.');
              case 16:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }));
        return _loadFile.apply(this, arguments);
      }
    }, isUploadValid);
  };
  validateUpload().then(function () {
    console.log(gpxFileSize);
    _home.HOME.processGpx(gpxFileContent, gpxFileSize);
    _info.INFO.initMap();
    localStorage.clear();
    // And optionally, display a loading screen in the meantime.
  }).then(function () {
    _info.INFO.createPolyline(_home.HOME.trackPointObjects);
    stats = _info.INFO.calculateStats(_home.HOME.trackPointObjects, gpxFileSize);
    _utilities.UTIL.StateManager.setState('info_baseState');
  }).then(function () {
    _info.INFO.setupMap();
  }).then(function () {
    _info.INFO.addMapTiles();
    _info.INFO.displayAllStats(stats);
    console.log('displaying charts');
    _info.INFO.prepareElevationGraph(_home.HOME.trackPointObjects, 30);
    _info.INFO.prepareSpeedGraph(_home.HOME.trackPointObjects, 30);
    _info.INFO.prepareGradientsGraph(_home.HOME.trackPointObjects);
  }).then(function () {});

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
  }
  ;
  return {
    gpxFile: gpxFile,
    gpxText: gpxText,
    parser: parser,
    stopTime: stopTime,
    stopSpeed: stopSpeed,
    maxFileSize: maxFileSize,
    gpxFileSize: gpxFileSize,
    numberSmoothing: numberSmoothing,
    gradientBoundaries: gradientBoundaries
  };
}();
exports.APP = APP;
},{"./modules/home.js":"modules/home.js","./modules/info.js":"modules/info.js","./modules/utilities.js":"modules/utilities.js","./modules/zipreader.js":"modules/zipreader.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50890" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map