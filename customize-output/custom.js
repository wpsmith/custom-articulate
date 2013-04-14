/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, jquery:true, indent:4, maxerr:50 */

//currentSlide = 2.01;
var player,currentSlideNumber,currentScene,sceneSlide,scenes,jsReady,ts_debug,previousSlide,currentSlide;
ts_debug = true;

// For lte IE8 & debugging
// document.addEventListener available in > IE8
if( ! document.addEventListener ){
	if (!window.console) { 
		console = {log: function() {}}; 
	}
}

/**
 * Writes debug based on whether debug is set.
 */
function writeDebug(s) {
	"use strict";
	jsReady = true;
	if ( true === ts_debug ) {
		console.log(s);
	}
}

/**
 * Writes debug based on whether debug is set.
 */
function isDebug() {
	"use strict";
	writeDebug("JS: isDebug called");
	writeDebug("ts_debug: "+ts_debug);
	if ( 'undefined' === typeof ts_debug ) {
		ts_debug = false;
	}
	
	return Boolean(ts_debug);
}

/**
 * Calls a set of Scripts.
 */
function callScripts() {
	"use strict";
	jsReady = true;
	setTotalSlides();
	setPreviousSlideNumber();
	setCurrentSceneNumber();
	setCurrentSceneSlideNumber();
	setCurrentSlideNumber();
}

/**
 * Rounds a number.
 *
 * @param float num Number to round.
 * @param int decimals Number of decimals.
 */
function precise_round(num,decimals){
	return Math.round(num*Math.pow(10,decimals))/Math.pow(10,decimals);
}

/**
 * Determines whether JS is ready to execute.
 */
function isReady() {
	"use strict";
	writeDebug("JS: isReady called");
	writeDebug("jsReady: "+jsReady);
	/*
	jsReadyCount++;
	writeDebug("jsReadyCount: "+jsReadyCount);
	if ( 2 <= jsReadyCount ) {
		Script1();
		jsReady = true;
	}
	*/
	if ( 'undefined' === typeof jsReady ) {
		jsReady = false;
	}
	
	return Boolean(jsReady);
}

function setCourseBookmark() {
	"use strict";
	writeDebug('JS: setCourseBookmark called');
	var bookmark = _getVar('bookmark');
	var currentSlide = getCurrentSlide();
	
	writeDebug('JS: bookmark: '+bookmark);
	writeDebug('JS: currentSlide: '+currentSlide);
	
	if ( bookmark < currentSlide ) {
		writeDebug('JS: Setting bookmark');
		_setVar('bookmark',currentSlide);
	}
}

/**
 * Gets Current Slide Number based on the 'CurrentSlide'.
 *
 */
function getCurrentSlide() {
	"use strict";
	writeDebug('JS: getCurrentSlide called');
	var currentSlide = _getVar('currentSlide');
	
	writeDebug('JS: currentSlide: '+currentSlide);
	return currentSlide;
}

/**
 * Gets Previous Slide Number based on the previousSlide global.
 *
 */
function getPreviousSlideNumber() {
	"use strict";
	writeDebug("JS: getPreviousSlideNumber called");
	previousSlide = _getVar('previousSlide');
	
	writeDebug('JS: previousSlide: '+previousSlide);
	return previousSlide;
}

function setPreviousSlideNumber() {
	"use strict";
	writeDebug("JS: getPreviousSlideNumber called");
	_setVar('previousSlide',getPreviousSlideNumber());
}

/**
 * Gets the Current Slide Number in the Scene
 *
 * @param currentSlideNumber Current Slide Number (e.g., 2.01).
 */
function getCurrentSceneNumber() {
	"use strict";
	writeDebug('JS: getCurrentSceneNumber called');
	var currentSlideNum = getCurrentSlide();
		
	currentScene = Math.floor(currentSlideNum);
	
	writeDebug('JS: currentScene: '+currentScene);
	return currentScene;
}

function setCurrentSceneNumber() {
	"use strict";
	writeDebug("JS: setCurrentSceneNumber called");
	_setVar('currentScene',getCurrentSceneNumber());
}

/**
 * Gets the Current Scene Slide Number
 *
 * @uses getCurrentSceneNumber() Gets the Current Slide Number in the Scene.
 * @param currentSlideNumber Current Slide Number (e.g., 2.01).
 */
function getCurrentSceneSlideNumber() {
	"use strict";
	writeDebug('JS: getCurrentSceneSlideNumber called');
	var currentSlideNum = getCurrentSlide();
	writeDebug('JS: currentSlideNum: '+currentSlideNum);
	
	currentScene = getCurrentSceneNumber(currentSlideNum);
	writeDebug('JS: currentScene: '+currentScene);
		
	var slideNum = currentSlideNum - currentScene;
	writeDebug('JS: currentSlideNum - currentScene: '+slideNum);
	slideNum = Math.floor(precise_round(slideNum,2) * 100);
	
	writeDebug('JS: slideNum: '+slideNum);
	return slideNum;
}

function setCurrentSceneSlideNumber() {
	"use strict";
	writeDebug("JS: setCurrentSceneSlideNumber called");
	_setVar('currentSceneSlide',getCurrentSceneSlideNumber());
}

/**
 * Gets Scenes
 *
 * Based on the Number of Scenes set using 'numScenes' variable
 * this function will get all the total slides from the 'scene*'
 * variables.
 *
 * @uses GetPlayer() Articulate function to GetVar/SetVar.
 */
function getScenes() {
	"use strict";
	writeDebug('JS: getScenes called');
	var numScenes = _getVar('numScenes');
	var s,x;
	writeDebug('JS: numScenes: '+numScenes);
	
	scenes = [];
	for( var i=0; i<numScenes; i++ ){
		x=i+1;
		s = 'scene'+x;
		writeDebug('Get var: '+s);
		scenes[s] = _getVar(s);
		writeDebug(s+': '+scenes[s]);
	}
	
	writeDebug('JS: scenes');
	writeDebug(scenes);
	return scenes;
}

/**
 * Gets Current Slide Number
 *
 * Based on the 'currentSlide' variable (Articulate Slide ID), this
 * returns the sequential slide number.
 *
 * @uses GetPlayer() Articulate function to GetVar/SetVar.
 * @uses getScenes() Gets Scenes.
 * @uses getCurrentSceneSlideNumber() Gets Current Scene Slide Number.
 */
function getCurrentSlideNumber() {
	"use strict";
	var x;
	
	writeDebug('JS: getCurrentSlideNumber called');
	currentSlide = _getVar('currentSlide');
	writeDebug('JS: currentSlide: '+currentSlide);
	
	// Calculate Current Slide Number
	currentSlideNumber = 0;
	scenes = getScenes();

	writeDebug('JS scenes next');
	writeDebug(scenes);
	
	currentScene = getCurrentSceneNumber(currentSlide);
	
	writeDebug('JS: currentSlideNumber: '+currentSlideNumber);
	writeDebug('JS: currentScene: '+currentScene);
	
	// Total Slides from previous scenes, scene 1 = scene[0]
	for (var i = 0; i < currentScene - 1; i++) {
		x = 'scene'+(i+1);
		currentSlideNumber += parseInt(scenes[x]);
		writeDebug('scenes["scene"+i]: '+scenes['scene'+i]);
		writeDebug('JS: currentSlideNumber: '+currentSlideNumber);
	}

	// Add Scene Slide Number
	var c = getCurrentSceneSlideNumber(currentSlide);
	currentSlideNumber += parseInt(c);
	
	writeDebug('JS: getCurrentSceneSlideNumber: '+c);
	writeDebug('JS: currentSlideNumber: '+currentSlideNumber);
	
	return currentSlideNumber;
}

/**
 * Sets Current Slide Number
 *
 * @uses getCurrentSlideNumber() Gets Current Slide Number.
 */
function setCurrentSlideNumber() {
	"use strict";
	writeDebug('JS: setCurrentSlideNumber called');
	var currentSlideNum = getCurrentSlideNumber();
	
	writeDebug('JS: Setting currentSlideNum: '+currentSlideNum);
	_setVar('currentSlideNumber',currentSlideNum);
	_setVar('slideNumber',currentSlideNum);
}

/**
 * Sets total slides in file.
 */
function setTotalSlides() {
	"use strict";
	writeDebug('JS: setTotalSlides called');
	var i,totalSlides;
	i = totalSlides = 0;
	scenes = getScenes();
	writeDebug(scenes);
	
	// Total Slides from previous scenes, scene 1 = 0
	for (i in scenes) {
		if (scenes.hasOwnProperty(i)) {
			totalSlides += scenes[i];
			writeDebug(totalSlides);
		}
	}
	
	writeDebug('JS: Setting totalSlides: '+totalSlides);
	_setVar('totalSlides',totalSlides);
}

/**
 * Set Articulate Variable
 *
 * @param string artVar Articulate Variable to set.
 * @param mixed artVal Value to assign to Articulate Variable.
 */
function _setVar(artVar,artVal) {
	"use strict";
	writeDebug('JS: _setVar called');
	setupPlayer();
	player.SetVar(artVar,artVal);
	writeDebug('JS: '+artVar+' Set');
}

/**
 * Get Articulate Variable
 *
 * @param string artVar Articulate Variable to set.
 */
function _getVar(artVar) {
	"use strict";
	writeDebug('JS: _getVar called');
	writeDebug('JS: _getVar artVar: '+ artVar);
	setupPlayer();
	var _var = player.GetVar(artVar);
	writeDebug('JS: artVar: '+artVar+': '+_var);
	return _var;
}

/**
 * Setup Global Articulate Player API Variable
 */
function setupPlayer() {
	"use strict";
	jsReady = true;
	writeDebug('JS: setupPlayer called');
	if ( 'undefined' === typeof player ) {
		writeDebug('JS: Getting player');
		player = GetPlayer();
	}
	
	writeDebug('JS: player: '+player);
}