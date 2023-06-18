////////////////////////////////////////////////////////// chess.js independent module ///////////////////////////////////////////////////////////////////////////////////////////////////////////// 
'use strict';

// const EMPTY_STR = '';
const BOARD_SIZE = 8;
const LETTERS_ON_THE_REAL_BOARD = 'abcdefgh'
let chessBoardArray = null;
const EMPTY = 0;
const WHITE_COLOR = 1;
const BLACK_COLOR = 2;
const KING = 'K';
const QUEEN = 'Q';
let ROOK = 'R'


///////////////
function getLetterOnTheRealBoardFromLetterNumber(letter) {
    return LETTERS_ON_THE_REAL_BOARD.charAt(letter)
}

///////////////
function getNumberOnTheRealBoardFromNumber(number) {
    return EMPTY_STR + (8 - number)
}

///////////////
function getLetterNumberFromTheLetterOnTheRealBoard(letterOnTheRealBoard) {
    return BOARD_SIZE - letterOnTheRealBoard 
}

///////////////
function getNumberFromNumberOnTheRealBoardFrom(numberOnTheRealBoard) {
    return LETTERS_ON_THE_REAL_BOARD.indexOf(numberOnTheRealBoard)
}

///////////////
function putPieceOn(piece, number, letter) {
    chessBoardArray[number][letter] = piece
    piece.number = number;
    piece.letter = letter;
}

///////////////
function movePieceTo(piece, number, letter) {
    chessBoardArray[piece.number][piece.letter] = EMPTY
    putPiceOn(piece, number, letter)
}

///////////////
function checkIfFieldExists(number, letter) {
    if (number >= 0 && number < BOARD_SIZE && letter >= 0 && letter < BOARD_SIZE) {
        return [number, letter]
    } else {
        return null;
    }
}

///////////////
function addToAnArrayIfNotNull(arr, number, letter) {
    let possible1 = checkIfFieldExists(number, letter);
    if (null != possible1) {
        arr.push(possible1);
    }
}

///////////////
function getOpposingColor(color) {
    if (color === WHITE_COLOR) {
        return BLACK_COLOR
    }
    if (color === BLACK_COLOR) {
        return WHITE_COLOR
    }
    throw new Error("Invalid color passed to getOpposingColor()")
}

/////////////////////////////////////////////////////// "class" ///////////////////////////////////////////////////////////////////////
function K(color) {  //TODO: parent class, inherit etc. !!!!!!!!!!111111111111
    this.type = KING;
    this.number = -1;
    this.letter = -1;
    this.color = color;


    this.getAllPossibleMovesOnEmptyBoard = function () {
        let result = []
        addToAnArrayIfNotNull(result, this.number - 1, this.letter - 1);
        addToAnArrayIfNotNull(result, this.number - 1, this.letter + 0);
        addToAnArrayIfNotNull(result, this.number - 1, this.letter + 1);
        addToAnArrayIfNotNull(result, this.number + 0, this.letter - 1);
        addToAnArrayIfNotNull(result, this.number + 0, this.letter + 1);
        addToAnArrayIfNotNull(result, this.number + 1, this.letter - 1);
        addToAnArrayIfNotNull(result, this.number + 1, this.letter + 0);
        addToAnArrayIfNotNull(result, this.number + 1, this.letter + 1);
        return result;
    }

    //TODO:
    // function toString() {
    //     return 'K';
    // }    
    // this.toString = function () {
    //     return 'K';
    // }
}
//TODO:
// King.toString=function(){
//     return 'K';
// }

/////////////////////////////////////////////////////// "class" ///////////////////////////////////////////////////////////////////////
function Q(color) { //TODO: parent class, inherit etc. !!!!!!!!!!111111111111
    this.type = QUEEN;
    this.number = -1;
    this.letter = -1;
    this.color = color;


    //TODO !!!!!!!!!!!!!!!!111111111111111
    this.getAllPossibleMovesOnEmptyBoard = function () {
        let result = []
        // addToAnArrayIfNotNull(result, this.number - 1, this.letter - 1);
        // addToAnArrayIfNotNull(result, this.number - 1, this.letter + 0);
        // addToAnArrayIfNotNull(result, this.number - 1, this.letter + 1);
        // addToAnArrayIfNotNull(result, this.number + 0, this.letter - 1);
        // addToAnArrayIfNotNull(result, this.number + 0, this.letter + 1);
        // addToAnArrayIfNotNull(result, this.number + 1, this.letter - 1);
        // addToAnArrayIfNotNull(result, this.number + 1, this.letter + 0);
        // addToAnArrayIfNotNull(result, this.number + 1, this.letter + 1);
        return result;
    }

    //TODO:
    // function toString() {
    //     return 'K';
    // }    
    // this.toString = function () {
    //     return 'K';
    // }
}
//TODO:
// King.toString=function(){
//     return 'K';
// }



function init(event) {
    chessBoardArray = new Array(BOARD_SIZE);
    for (let i = 0; i < chessBoardArray.length; i++) {
        chessBoardArray[i] = new Array(BOARD_SIZE);
        chessBoardArray[i].fill(EMPTY)
    }
}

init()



// log(55555555555)
// log(chessBoardArray)
// log(7777777777777)
// chessBoardArray[0][4] = new King(0, 4, BLACK_COLOR)
// let moves = chessBoardArray[0][4].getAllPossibleMovesOnEmptyBoard();
// log(moves)
// log(888888888888)
// let color = getNumberOnTheRealBoardFromNumber(7)
// log(color)
// log(999999999999)


// log(55555555555)
// log(chessBoardArray)
// log(7777777777777)

// putPieceOn(new King(BLACK_COLOR),0,0)
// log(chessBoardArray)


// let moves = chessBoardArray[4][4].getAllPossibleMovesOnEmptyBoard();
// log(moves)
// log(888888888888)