/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:false */
/*global GetPlayer() */

/**************
Custom Articulate LMS Libary

Version 1.0.0
**************/

// Instantiate Articulate Player
var tsAPI = parent;
var tsPlayer = '';
document.addEventListener( "DOMContentLoaded", function() {
	tsPlayer = tsGetPlayer();
});

/**
 * Safe way to Articulate's GetPlayer().
 */
function tsGetPlayer() {
	"use strict";
	
	if ( 'function' === typeof GetPlayer ) {
		tsPlayer = GetPlayer();
	}
	else if ( 'function' === typeof window.scormdriver_content.GetPlayer ) {
		tsPlayer = window.scormdriver_content.GetPlayer();
	}
	
	return tsPlayer;
}

/**
 * Gets Articulate Variable Value
 */
function tsGetVar( articulateVar ) {
	"use strict";
	tsPlayer.GetVar( articulateVar )
}

/**
 * Sets Articulate Variable Value
 */
function tsSetVar( articulateVar, value ) {
	"use strict";
	tsPlayer.SetVar( articulateVar, value )
}


/*****
UTILITY FUNCTIONS
*****/

/**
 * Executes function from a string
 *
 * @link http://stackoverflow.com/questions/359788/how-to-execute-a-javascript-function-when-i-have-its-name-as-a-string
 * Examples:
 *   executeFunctionByName("My.Namespace.functionName", window, arguments);
 *   executeFunctionByName("Namespace.functionName", My, arguments);
 */
function tsExecuteFunctionByName(functionName, context /*, args */) {
	var args = Array.prototype.slice.call(arguments).splice(2);
	var namespaces = functionName.split(".");
	var func = namespaces.pop();
	for ( var i = 0; i < namespaces.length; i++ ) {
		context = context[namespaces[i]];
	}
	return context[func].apply( this, args );
}

// Speed up calls to hasOwnProperty
var hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * Checks whether parameter is empty
 * True for '', [], {}
 * Custom check: is_empty({length: 0, custom_property: []})
 * @uses hasOwnProperty
 * @param param mixed Can be anything.
 */
function tsIsEmpty( param ) {
	"use strict";
	
    // null and undefined are empty
    if ( null == param )
		return true;
	
    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if ( param.length && 0 < param.length ) {
		return false;
	}
	
    if ( 0 === param.length ) {
		return true;
	}

    for (var key in param) {
        if ( hasOwnProperty.call( param, key ) ) {
			return false;
		}
    }

    return true;
}

/**
 * Merges default and function args over-writing defaults.
 *
 * @param {array}  args     Array of args.
 * @param {array}  defaults Array of default args.
 * @return {array} args     Merged array of args.
 */
function tsMergeArgs( args, defaults ) {
	"use strict";
	
    for ( var i in defaults ) {
    	if ( "undefined" == typeof args[i] ) {
			args[index] = defaults[i];
		}
   }
   
   return args;
}

/**
 * Prints Current Slide
 */
function tsPrint() {
	window.print();
}


/*****
STUDENT FUNCTIONS
*****/

// Creates Student Object
var student = {};
/**
 * Initializes Student Object
 *
 * @uses tsIsEmpty() 
 * @uses tsAPI
 * @return {object} student Student Object
 */
function tsGetStudentData() {
	"use strict";
	
	if ( tsIsEmpty( student ) ) {
		// LMS ID
		student.ID = tsAPI.GetStudentID();
		
		// Name formatted: Last Name, First Name
		student.rawname = tsAPI.GetStudentName();
		
		// Name formatted: First Name Last Name
		student.name = tsAPI.ReverseNameSequence( tsAPI.GetStudentName() );
	}
	
	return student;
}

/**
 * Checks if student has property & adds if not
 * Does not over-ride current property
 *
 * @param {string} property      Property to be added to student object.
 * @param {string} articulateVar Pulls Variable Value from Articulate.
 */
function tsStudentAddProperty( property, articulateVar ){
	"use strict";
	
	if ( ! student.hasOwnProperty( property ) ) { 
		student[property] = tsPlayer.GetVar( articulateVar );
	}
}

/**
 * Over-rides current property & updates
 *
 * @param {string} property      Property to be added to student object.
 * @param {string} articulateVar Pulls Variable Value from Articulate.
 */
function tsStudentUpdateProperty( property, articulateVar ){
	"use strict";
	
	student[property] = tsPlayer.GetVar( articulateVar );
}

/**
 * Over-rides current property & updates
 *
 * @param {string} property      Property to be added to student object.
 * @param {string} articulateVar Pulls Variable Value from Articulate.
 */
function tsStudentDeleteProperty( property ){
	"use strict";
	
	delete student[property];
}

