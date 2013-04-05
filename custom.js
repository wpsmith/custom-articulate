/**************
Custom Articulate LMS Libary

Version 1.0.0
**************/

// Instantiate Articulate Player
var tsAPI = parent;
var tsPlayer = '';
var student = {};
document.addEventListener( "DOMContentLoaded", function() {
	tsPlayer = GetPlayer();
});

// Correction to tsPlayer (if needed)
function tsGetPlayer() {
	if ( 'undefined' === typeof tsPlayer )
		tsPlayer = GetPlayer();
	else if ( null === tsPlayer )
		tsPlayer = GetPlayer();
	
	return tsPlayer;
}

// Speed up calls to hasOwnProperty
var hasOwnProperty = Object.prototype.hasOwnProperty;
/*
 * Checks whether parameter is empty
 * True for '', [], {}
 * Custom check: is_empty({length: 0, custom_property: []})
 * @uses hasOwnProperty
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

// Creates Student Object
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

/*
 * Checks if student has property & adds if not
 * Does not over-ride current property
 */
function tsStudentAddProperty( property, articulateVar ){
	if ( ! student.hasOwnProperty( property ) ) { 
		student[property] = tsPlayer.GetVar( articulateVar );
	}
}

/*
 * Over-rides current property & updates
 */
function tsStudentUpdateProperty( property, articulateVar ){
	student[property] = tsPlayer.GetVar( articulateVar );
}

