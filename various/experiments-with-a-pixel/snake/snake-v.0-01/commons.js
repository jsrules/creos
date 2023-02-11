////////////////////////////////////////////////////////// commons ///////////////////////////////////////////////////////////////////////////////////////////////////////////// 
'use strict';

//globals
let ctx = null;
let canvas = null;
let END_X = -1
let END_Y = -1
const TIMELOUT_OF_UPDATE_IN_MS = 1;
let currX = 0;
let currY = 0;
const MOVE_STEP = 10;


//NOT used for now:
let snakeLength = 2;
let SQUARE_SIZE = 10;
const LEADING_OR_FIRST_SQUARE_COLOR = '#0037ffff';
const TRACE_SQUARE_COLOR = '#bbdca5ff';
const EMPTY_SQUARE_COLOR = 'white';
const ENEMY_COLOR = 'red';
const FOOD_SQUARE_COLOR = 'green';


const hexes = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
const MIN_COLOR = 0;
const MAX_COLOR = 255;


/////////////////////////////////////////////////////   
function $(x) {
    return document.getElementById(x);

}

/////////////////////////////////////////////////////   
function log(s) {
    console.log(s)
}

/////////////////////////////////////////////////////
function ctg(x) { return 1 / Math.tan(x); }

/////////////////////////////////////////////////////
function arcctg(x) { return Math.PI / 2 - Math.atan(x); }

/////////////////////////////////////////////////////   
function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

/////////////////////////////////////////////////////   
function randHexDigit() {
    return hexes[randomInteger(0, 15)];
}

/////////////////////////////////////////////////////   
function randColor() {
    return "#" + randHexDigit() + randHexDigit() + randHexDigit() + randHexDigit() + randHexDigit() + randHexDigit();
}

/////////////////////////////////////////////////////   
function randShadeOfRed() {
    return "#" + randHexDigit() + randHexDigit() + '0000';
}

/////////////////////////////////////////////////////   
function randShadeOfGreen() {
    return "#00" + randHexDigit() + randHexDigit() + '00';
}

/////////////////////////////////////////////////////   
function randShadeOfBlues() {
    return "#0000" + randHexDigit() + randHexDigit();
}


