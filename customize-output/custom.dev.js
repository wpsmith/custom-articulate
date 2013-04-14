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
	/*
	jsReadyCount++;
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
	var bookmark = _getVar('bookmark');
	var currentSlide = getCurrentSlide();
	
	
	if ( bookmark < currentSlide ) {
		_setVar('bookmark',currentSlide);
	}
}

/**
 * Gets Current Slide Number based on the 'CurrentSlide'.
 *
 */
function getCurrentSlide() {
	"use strict";
	var currentSlide = _getVar('currentSlide');
	
	return currentSlide;
}

/**
 * Gets Previous Slide Number based on the previousSlide global.
 *
 */
function getPreviousSlideNumber() {
	"use strict";
	previousSlide = _getVar('previousSlide');
	
	return previousSlide;
}

function setPreviousSlideNumber() {
	"use strict";
	_setVar('previousSlide',getPreviousSlideNumber());
}

/**
 * Gets the Current Slide Number in the Scene
 *
 * @param currentSlideNumber Current Slide Number (e.g., 2.01).
 */
function getCurrentSceneNumber() {
	"use strict";
	var currentSlideNum = getCurrentSlide();
		
	currentScene = Math.floor(currentSlideNum);
	
	return currentScene;
}

function setCurrentSceneNumber() {
	"use strict";
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
	var currentSlideNum = getCurrentSlide();
	
	currentScene = getCurrentSceneNumber(currentSlideNum);
		
	var slideNum = currentSlideNum - currentScene;
	slideNum = Math.floor(precise_round(slideNum,2) * 100);
	
	return slideNum;
}

function setCurrentSceneSlideNumber() {
	"use strict";
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
	var numScenes = _getVar('numScenes');
	var s,x;
	
	scenes = [];
	for( var i=0; i<numScenes; i++ ){
		x=i+1;
		s = 'scene'+x;
		scenes[s] = _getVar(s);
	}
	
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
	
	currentSlide = _getVar('currentSlide');
	
	// Calculate Current Slide Number
	currentSlideNumber = 0;
	scenes = getScenes();

	
	currentScene = getCurrentSceneNumber(currentSlide);
	
	
	// Total Slides from previous scenes, scene 1 = scene[0]
	for (var i = 0; i < currentScene - 1; i++) {
		x = 'scene'+(i+1);
		currentSlideNumber += parseInt(scenes[x]);
	}

	// Add Scene Slide Number
	var c = getCurrentSceneSlideNumber(currentSlide);
	currentSlideNumber += parseInt(c);
	
	
	return currentSlideNumber;
}

/**
 * Sets Current Slide Number
 *
 * @uses getCurrentSlideNumber() Gets Current Slide Number.
 */
function setCurrentSlideNumber() {
	"use strict";
	var currentSlideNum = getCurrentSlideNumber();
	
	_setVar('currentSlideNumber',currentSlideNum);
	_setVar('slideNumber',currentSlideNum);
}

/**
 * Sets total slides in file.
 */
function setTotalSlides() {
	"use strict";
	var i,totalSlides;
	i = totalSlides = 0;
	scenes = getScenes();
	
	// Total Slides from previous scenes, scene 1 = 0
	for (i in scenes) {
		if (scenes.hasOwnProperty(i)) {
			totalSlides += scenes[i];
		}
	}
	
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
	setupPlayer();
	player.SetVar(artVar,artVal);
}

/**
 * Get Articulate Variable
 *
 * @param string artVar Articulate Variable to set.
 */
function _getVar(artVar) {
	"use strict";
	setupPlayer();
	var _var = player.GetVar(artVar);
	return _var;
}

/**
 * Setup Global Articulate Player API Variable
 */
function setupPlayer() {
	"use strict";
	jsReady = true;
	if ( 'undefined' === typeof player ) {
		player = GetPlayer();
	}
	
}