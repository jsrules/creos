//////////////////////////////////////////////////////////  NOT FINISHED ///////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////// chess.js independent module ///////////////////////////////////////////////////////////////////////////////////////////////////////////// 
'use strict';

// const EMPTY_STR = '';
const BOARD_SIZE = 8;
const LETTERS_ON_THE_REAL_BOARD = 'abcdefgh'
let chessBoardArray = null;
const EMPTY = 0;
const EMPTY_FIELD_VISUALIZATION = '0';
const WHITE_COLOR = 1;
const BLACK_COLOR = 2;
const KING = 'K';
const QUEEN = 'Q';
let ROOK = 'R'
let BISHOP = 'B'
let KNIGHT = 'N'
let PAWN = 'P'
let didKingMove = [false, false]  //first is w, second is b
let didRookHmove = [false, false]  //first is w, second is b
let didRookAmove = [false, false]  //first is w, second is b
let SAVED_VALUE_OF_didKingMove = [null, null]  //first is w, second is b
let SAVED_VALUE_OF_didRookHmove = [null, null]  //first is w, second is b
let SAVED_VALUE_OF_didRookAmove = [null, null]  //first is w, second is b





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
    chessBoardArray[number][letter] = piece;
    if (EMPTY != piece) {
        piece.number = number;
        piece.letter = letter;
    }
}

///////////////  TODO: chk it and use it
function putPieceOnThisID(piece, tdIdTo) {

    log(tdIdTo.charAt(1))
    let letterNumberTO = getLetterNumberFromTheLetterOnTheRealBoard('' + tdIdTo.charAt(1))
    log(letterNumberTO)

    log(tdIdTo.charAt(0))
    let NnumberNumberTO = getNumberFromNumberOnTheRealBoardFrom('' + tdIdTo.charAt(0))
    log(NnumberNumberTO)

    l(tdIdTo + '=' + letterNumberTO + '; ' + letterNumberTO)
    putPieceOn(piece, letterNumberTO, letterNumberTO)
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
//TODO: change name to  smth like addToAnArrayIfNotNull_andReturn false if field not empty
function addToAnArrayIfNotNull(arr, number, letter) {
    let possible1 = checkIfFieldExists(number, letter);
    if (null != possible1) {
        arr.push(possible1);
        return chessBoardArray[number][letter] == EMPTY ? true : false
    }

}

///////////////
function addToAnArrayIfNotNullAndThereAintNoThisColorsPiece(arr, number, letter, myColor) {
    let possible1 = checkIfFieldExists(number, letter);
    if (null != possible1) {

        if (chessBoardArray[number][letter] == EMPTY || chessBoardArray[number][letter].color != myColor) {
            arr.push(possible1);
        }


        // return chessBoardArray[number][letter] == EMPTY ? true : false
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

    this.getAllATTACKEDMovesOnREALBoard = function () {
        return this.getAllPossibleMovesOnEmptyBoard();
    }

    this.getAllPOSSIBLEMovesOnREALBoard = function () {
        let result = this.getAllPossibleMovesOnEmptyBoard();

        for (let index1 = 0; index1 < BOARD_SIZE; index1++) {
            let visualization = '';
            for (let index = 0; index < BOARD_SIZE; index++) {
                let piece = chessBoardArray[index1][index];
                if (piece == EMPTY) {
                    visualization += EMPTY_FIELD_VISUALIZATION
                    continue;
                }
                let currColor = piece.color
                if (currColor == this.color) {
                    //del if there's this color piece or even SELF.. cause u can't move on the file u r standing :)
                    removeSubarray(result, [index1, index])
                    continue;
                }
                // let opposingColor=piece.getOpposingColor(currColor)
                let allATTACKEDMovesOnREALBoard = piece.getAllATTACKEDMovesOnREALBoard();
                for (let index = 0; index < allATTACKEDMovesOnREALBoard.length; index++) {
                    const element = allATTACKEDMovesOnREALBoard[index];
                    removeSubarray(result, element)
                }

                // l(allATTACKEDMovesOnREALBoard.length+'  !!!111111111111111')
                // if (includesArray(result, [index, index1])) {
                //     l('found prohibited !!!!!!!!!!!!!!!!!!!!!!!11111111111111111')
                // }

                visualization += piece.toString();
            }
            l(visualization)

        }

        return result;
    }

    //TODO:
    this.toString = function () {
        return this.type;
    }
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

        //DIAGONAL lines (BISHOP-like):
        for (let index = 1; index < BOARD_SIZE; index++) {
            addToAnArrayIfNotNull(result, this.number - index, this.letter - index);
        }

        for (let index = 1; index < BOARD_SIZE; index++) {
            addToAnArrayIfNotNull(result, this.number - index, this.letter + index);
        }

        for (let index = 1; index < BOARD_SIZE; index++) {
            addToAnArrayIfNotNull(result, this.number + index, this.letter - index);
        }

        for (let index = 1; index < BOARD_SIZE; index++) {
            addToAnArrayIfNotNull(result, this.number + index, this.letter + index);
        }

        //STRAIGHT lines (rook-like):
        for (let index = 1; index < BOARD_SIZE; index++) {
            addToAnArrayIfNotNull(result, this.number - index, this.letter);
        }

        for (let index = 1; index < BOARD_SIZE; index++) {
            addToAnArrayIfNotNull(result, this.number + index, this.letter);
        }

        for (let index = 1; index < BOARD_SIZE; index++) {
            addToAnArrayIfNotNull(result, this.number, this.letter - index);
        }

        for (let index = 1; index < BOARD_SIZE; index++) {
            addToAnArrayIfNotNull(result, this.number, this.letter + index);
        }

        return result;
    }

    this.getAllATTACKEDMovesOnREALBoard = function () {
        return this.getAllPOSSIBLEMovesOnREALBoard();
    }

    this.getAllPOSSIBLEMovesOnREALBoard = function () {

        let result = []


        //DIAGONAL lines (BISHOP-like):

        for (let index = 1; index < BOARD_SIZE; index++) {
            // addToAnArrayIfNotNull(result, this.number - index, this.letter - index);
            if (false === addToAnArrayIfNotNull(result, this.number - index, this.letter - index)) {
                break;
            }
        }

        for (let index = 1; index < BOARD_SIZE; index++) {
            // addToAnArrayIfNotNull(result, this.number - index, this.letter + index);
            if (false === addToAnArrayIfNotNull(result, this.number - index, this.letter + index)) {
                break;
            }
        }

        for (let index = 1; index < BOARD_SIZE; index++) {
            // addToAnArrayIfNotNull(result, this.number + index, this.letter - index);
            if (false === addToAnArrayIfNotNull(result, this.number + index, this.letter - index)) {
                break;
            }
        }

        for (let index = 1; index < BOARD_SIZE; index++) {
            // addToAnArrayIfNotNull(result, this.number + index, this.letter + index);
            if (false === addToAnArrayIfNotNull(result, this.number + index, this.letter + index)) {
                break;
            }
        }

        //STRAIGHT lines (rook-like):

        for (let index = 1; index < BOARD_SIZE; index++) {
            // addToAnArrayIfNotNull(result, this.number - index, this.letter);
            if (false === addToAnArrayIfNotNull(result, this.number - index, this.letter)) {
                break;
            }
        }

        for (let index = 1; index < BOARD_SIZE; index++) {
            // addToAnArrayIfNotNull(result, this.number + index, this.letter);
            // if (EMPTY!=chessBoardArray[this.number + index][this.letter]){
            //     break
            // }
            if (false === addToAnArrayIfNotNull(result, this.number + index, this.letter)) {
                break;
            }
        }

        for (let index = 1; index < BOARD_SIZE; index++) {
            // addToAnArrayIfNotNull(result, this.number, this.letter - index);
            if (false === addToAnArrayIfNotNull(result, this.number, this.letter - index)) {
                break;
            }
        }

        for (let index = 1; index < BOARD_SIZE; index++) {
            // addToAnArrayIfNotNull(result, this.number, this.letter + index);
            if (false === addToAnArrayIfNotNull(result, this.number, this.letter + index)) {
                break;
            }
        }

        return result;
    }

    //TODO:
    //TODO:
    this.toString = function () {
        return this.type;
    }
}
//TODO:
// King.toString=function(){
//     return 'K';
// }




/////////////////////////////////////////////////////// "class" ///////////////////////////////////////////////////////////////////////

function R(color) { //TODO: parent class, inherit etc. !!!!!!!!!!111111111111
    this.type = ROOK;
    this.number = -1;
    this.letter = -1;
    this.color = color;


    //TODO !!!!!!!!!!!!!!!!111111111111111
    this.getAllPossibleMovesOnEmptyBoard = function () {
        let result = []

        //STRAIGHT lines (rook-like):
        for (let index = 1; index < BOARD_SIZE; index++) {
            addToAnArrayIfNotNull(result, this.number - index, this.letter);
        }

        for (let index = 1; index < BOARD_SIZE; index++) {
            addToAnArrayIfNotNull(result, this.number + index, this.letter);
        }

        for (let index = 1; index < BOARD_SIZE; index++) {
            addToAnArrayIfNotNull(result, this.number, this.letter - index);
        }

        for (let index = 1; index < BOARD_SIZE; index++) {
            addToAnArrayIfNotNull(result, this.number, this.letter + index);
        }

        return result;
    }

    this.getAllATTACKEDMovesOnREALBoard = function () {
        return this.getAllPOSSIBLEMovesOnREALBoard();
    }

    this.getAllPOSSIBLEMovesOnREALBoard = function () {

        let result = []


        //STRAIGHT lines (rook-like):

        for (let index = 1; index < BOARD_SIZE; index++) {
            // addToAnArrayIfNotNull(result, this.number - index, this.letter);
            if (false === addToAnArrayIfNotNull(result, this.number - index, this.letter)) {
                break;
            }
        }

        for (let index = 1; index < BOARD_SIZE; index++) {
            // addToAnArrayIfNotNull(result, this.number + index, this.letter);
            // if (EMPTY!=chessBoardArray[this.number + index][this.letter]){
            //     break
            // }
            if (false === addToAnArrayIfNotNull(result, this.number + index, this.letter)) {
                break;
            }
        }

        for (let index = 1; index < BOARD_SIZE; index++) {
            // addToAnArrayIfNotNull(result, this.number, this.letter - index);
            if (false === addToAnArrayIfNotNull(result, this.number, this.letter - index)) {
                break;
            }
        }

        for (let index = 1; index < BOARD_SIZE; index++) {
            // addToAnArrayIfNotNull(result, this.number, this.letter + index);
            if (false === addToAnArrayIfNotNull(result, this.number, this.letter + index)) {
                break;
            }
        }

        return result;
    }

    //TODO:
    //TODO:
    this.toString = function () {
        return this.type;
    }
}
//TODO:
// King.toString=function(){
//     return 'K';
// }

/////////////////////////////////////////////////////// "class" ///////////////////////////////////////////////////////////////////////
function B(color) { //TODO: parent class, inherit etc. !!!!!!!!!!111111111111
    this.type = BISHOP;
    this.number = -1;
    this.letter = -1;
    this.color = color;


    //TODO !!!!!!!!!!!!!!!!111111111111111
    this.getAllPossibleMovesOnEmptyBoard = function () {
        let result = []

        //DIAGONAL lines (BISHOP-like):
        for (let index = 1; index < BOARD_SIZE; index++) {
            addToAnArrayIfNotNull(result, this.number - index, this.letter - index);
        }

        for (let index = 1; index < BOARD_SIZE; index++) {
            addToAnArrayIfNotNull(result, this.number - index, this.letter + index);
        }

        for (let index = 1; index < BOARD_SIZE; index++) {
            addToAnArrayIfNotNull(result, this.number + index, this.letter - index);
        }

        for (let index = 1; index < BOARD_SIZE; index++) {
            addToAnArrayIfNotNull(result, this.number + index, this.letter + index);
        }

        return result;
    }

    this.getAllATTACKEDMovesOnREALBoard = function () {
        return this.getAllPOSSIBLEMovesOnREALBoard();
    }

    this.getAllPOSSIBLEMovesOnREALBoard = function () {

        let result = []


        //DIAGONAL lines (BISHOP-like):

        for (let index = 1; index < BOARD_SIZE; index++) {
            // addToAnArrayIfNotNull(result, this.number - index, this.letter - index);
            if (false === addToAnArrayIfNotNull(result, this.number - index, this.letter - index)) {
                break;
            }
        }

        for (let index = 1; index < BOARD_SIZE; index++) {
            // addToAnArrayIfNotNull(result, this.number - index, this.letter + index);
            if (false === addToAnArrayIfNotNull(result, this.number - index, this.letter + index)) {
                break;
            }
        }

        for (let index = 1; index < BOARD_SIZE; index++) {
            // addToAnArrayIfNotNull(result, this.number + index, this.letter - index);
            if (false === addToAnArrayIfNotNull(result, this.number + index, this.letter - index)) {
                break;
            }
        }

        for (let index = 1; index < BOARD_SIZE; index++) {
            // addToAnArrayIfNotNull(result, this.number + index, this.letter + index);
            if (false === addToAnArrayIfNotNull(result, this.number + index, this.letter + index)) {
                break;
            }
        }

        //STRAIGHT lines (rook-like):


        return result;
    }

    //TODO:
    //TODO:
    this.toString = function () {
        return this.type;
    }
}
//TODO:
// King.toString=function(){
//     return 'K';
// }

/////////////////////////////////////////////////////// "class" ///////////////////////////////////////////////////////////////////////
//copied from King
function P(color) {  //TODO: parent class, inherit etc. !!!!!!!!!!111111111111
    this.type = PAWN
    this.number = -1;
    this.letter = -1;
    this.color = color;
    this.opposingColor = getOpposingColor(color);



    this.getAllPossibleMovesOnEmptyBoard = function () {
        let result = []
        let direction = this.color == WHITE_COLOR ? -1 : 1;
        let pawnsStartPosition = this.color == WHITE_COLOR ? 6 : 1;

        if (chessBoardArray[this.number + direction][this.letter] == EMPTY) {
            addToAnArrayIfNotNull(result, this.number + direction, this.letter);
        }


        if (this.number == pawnsStartPosition && chessBoardArray[this.number + direction][this.letter] == EMPTY && chessBoardArray[this.number + direction * 2][this.letter] == EMPTY) {
            addToAnArrayIfNotNull(result, this.number + direction * 2, this.letter);

        }

        return result;
    }

    this.getAllATTACKEDMovesOnREALBoard = function () {
        let result = []
        let direction = this.color == WHITE_COLOR ? -1 : 1;
        addToAnArrayIfNotNull(result, this.number + direction, this.letter + 1);
        addToAnArrayIfNotNull(result, this.number + direction, this.letter - 1);
        return result;
        // return this.getAllPossibleMovesOnEmptyBoard();
    }

    this.getAllPOSSIBLEMovesOnREALBoard = function () {
        let result = this.getAllPossibleMovesOnEmptyBoard();

        let attackedFields = this.getAllATTACKEDMovesOnREALBoard();
        for (let index = 0; index < attackedFields.length; index++) {
            const element = attackedFields[index];
            let attackedFielDNumber = element[0]
            let attackedFielLetter = element[1]
            if (chessBoardArray[attackedFielDNumber][attackedFielLetter] != EMPTY || chessBoardArray[attackedFielDNumber][attackedFielLetter].color == this.opposingColor) {
                result.push(element)
            }
        }

        return result;  //TODO: del this !!!!!!!!!!!1111111111111111111111111111111111111


    }

    //TODO:
    this.toString = function () {
        return this.type;
    }
}
//TODO:
// King.toString=function(){
//     return 'K';
// }



/////////////////////////////////////////////////////// "class" ///////////////////////////////////////////////////////////////////////
function N(color) { //TODO: parent class, inherit etc. !!!!!!!!!!111111111111
    this.type = KNIGHT;
    this.number = -1;
    this.letter = -1;
    this.color = color;


    //TODO !!!!!!!!!!!!!!!!111111111111111
    this.getAllPossibleMovesOnEmptyBoard = function () {
        let result = []

        addToAnArrayIfNotNull(result, this.number + 1, this.letter + 2);
        addToAnArrayIfNotNull(result, this.number + 2, this.letter + 1);

        addToAnArrayIfNotNull(result, this.number - 1, this.letter - 2);
        addToAnArrayIfNotNull(result, this.number - 2, this.letter - 1);

        addToAnArrayIfNotNull(result, this.number - 1, this.letter + 2);
        addToAnArrayIfNotNull(result, this.number - 2, this.letter + 1);

        addToAnArrayIfNotNull(result, this.number + 1, this.letter - 2);
        addToAnArrayIfNotNull(result, this.number + 2, this.letter - 1);

        return result;
    }

    this.getAllATTACKEDMovesOnREALBoard = function () {
        return this.getAllPossibleMovesOnEmptyBoard();
    }

    this.getAllPOSSIBLEMovesOnREALBoard = function () {

        let result = [] // this.getAllATTACKEDMovesOnREALBoard()
        let myColor = this.color

        //these checks are _seemingly_ NOT NECESSARY here, thry're made in VIEW part.. ie checvks that he can't capture his own piece
        // addToAnArrayIfNotNullAndThereAintNoThisColorsPiece()



        addToAnArrayIfNotNullAndThereAintNoThisColorsPiece(result, this.number + 1, this.letter + 2, myColor);
        addToAnArrayIfNotNullAndThereAintNoThisColorsPiece(result, this.number + 2, this.letter + 1, myColor);

        addToAnArrayIfNotNullAndThereAintNoThisColorsPiece(result, this.number - 1, this.letter - 2, myColor);
        addToAnArrayIfNotNullAndThereAintNoThisColorsPiece(result, this.number - 2, this.letter - 1, myColor);

        addToAnArrayIfNotNullAndThereAintNoThisColorsPiece(result, this.number - 1, this.letter + 2, myColor);
        addToAnArrayIfNotNullAndThereAintNoThisColorsPiece(result, this.number - 2, this.letter + 1, myColor);

        addToAnArrayIfNotNullAndThereAintNoThisColorsPiece(result, this.number + 1, this.letter - 2, myColor);
        addToAnArrayIfNotNullAndThereAintNoThisColorsPiece(result, this.number + 2, this.letter - 1, myColor);

        return result;
    }

    //TODO:
    //TODO:
    this.toString = function () {
        return this.type;
    }
}
//TODO:
// King.toString=function(){
//     return 'K';
// }






function thereAintCheck() {
    l('whoMoves: ' + whoMoves);
    let colorToUse = whoMoves == WHITE ? WHITE_COLOR : BLACK_COLOR
    l('colorToUse: ' + colorToUse);
    let opposingColorToUse = whoMoves == WHITE ? BLACK_COLOR : WHITE_COLOR

    for (let index1 = 0; index1 < BOARD_SIZE; index1++) {
        let visualization = '';
        for (let index = 0; index < BOARD_SIZE; index++) {
            let piece = chessBoardArray[index1][index];
            if (piece == EMPTY) {
                visualization += EMPTY_FIELD_VISUALIZATION
                continue;
            }
            let currColor = piece.color
            if (currColor == colorToUse) {
                // removeSubarray(result, [index1, index])
                continue;
            }
            // let opposingColor=piece.getOpposingColor(currColor)
            let allATTACKEDMovesOnREALBoard = piece.getAllATTACKEDMovesOnREALBoard();
            for (let index = 0; index < allATTACKEDMovesOnREALBoard.length; index++) {
                const element = allATTACKEDMovesOnREALBoard[index];
                let n = element[0]
                let lett = element[1]
                let field = chessBoardArray[n][lett]
                if (field != EMPTY && field.color == colorToUse && field.type == KING) {
                    return false
                }

                // removeSubarray(result, element)
            }

            // l(allATTACKEDMovesOnREALBoard.length+'  !!!111111111111111')
            // if (includesArray(result, [index, index1])) {
            //     l('found prohibited !!!!!!!!!!!!!!!!!!!!!!!11111111111111111')
            // }

            visualization += piece.toString();
        }
        l(visualization)
    }
    return true
}

//g1 aint working
//TODO:
function isFieldAttacked(fieldId) {  //fieldId is like 'g1'

    // 
    // 
    l(fieldId)

    let fN = getNumberFromNumberOnTheRealBoardFrom(fieldId.charAt(0))
    let fL = getLetterNumberFromTheLetterOnTheRealBoard(fieldId.charAt(1))
    l('NNNNNNNNNNNNNNNNNNNNNNNNNNNNNN' + fN + '; ' + fL)
    l(fN)
    l(fL)

    l('whoMoves: ' + whoMoves);
    let colorToUse = whoMoves == WHITE ? WHITE_COLOR : BLACK_COLOR
    l('colorToUse: ' + colorToUse);
    let opposingColorToUse = whoMoves == WHITE ? BLACK_COLOR : WHITE_COLOR

    for (let index1 = 0; index1 < BOARD_SIZE; index1++) {
        let visualization = '';
        for (let index = 0; index < BOARD_SIZE; index++) {
            let piece = chessBoardArray[index1][index];
            if (piece == EMPTY) {
                visualization += EMPTY_FIELD_VISUALIZATION
                continue;
            }
            let currColor = piece.color
            if (currColor == currColor) {
                // removeSubarray(result, [index1, index])
                continue;
            }
            // let opposingColor=piece.getOpposingColor(currColor)
            let allATTACKEDMovesOnREALBoard = piece.getAllATTACKEDMovesOnREALBoard();
            for (let index = 0; index < allATTACKEDMovesOnREALBoard.length; index++) {
                const element = allATTACKEDMovesOnREALBoard[index];
                let n = element[0]
                let lett = element[1]
                let field = chessBoardArray[n][lett]
                if (     /* field != EMPTY */ /*&& field.color == opposingColorToUse */       fN == n && fL == lett) {         //fN == lett && fL == n) {  
                    l('colorToUse: ' + colorToUse);
                    l('opposingColorToUse: ' + opposingColorToUse);
                    l('piece: ' + piece);
                    l('currColor: ' + currColor);

                    return true
                }

                // removeSubarray(result, element)
            }

            // l(allATTACKEDMovesOnREALBoard.length+'  !!!111111111111111')
            // if (includesArray(result, [index, index1])) {
            //     l('found prohibited !!!!!!!!!!!!!!!!!!!!!!!11111111111111111')
            // }

            visualization += piece.toString();
        }
        l(visualization)
    }
    return false
}



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


function makeMoveIfPossible(tdFrom, tdTo, restoreInitialBoardInAnyCase = false) {


    if (!restoreInitialBoardInAnyCase) {
        saveGlobalVars();
        savedHTMLofTheBoard = $('chessBoardId').innerHTML
    }

    // fillModelFtomView()
    let tdIdFrom = tdFrom.id;
    log('!!!!!!!!!!!!1111111111 tdIdFrom:' + tdIdFrom)
    let tdIdTo = tdTo.id;
    log('!!!!!!!!!!!!1111111111 tdIdFrom:' + tdIdTo)

    tdIdToInnerHTMLSaved = tdTo.innerHTML;
    tdIdFromInnerHTMLSaved = tdFrom.innerHTML;
    //local func:
    const restore = function () {
        tdTo.innerHTML = tdIdToInnerHTMLSaved
        tdFrom.innerHTML = tdIdFromInnerHTMLSaved
    }
    log(tdIdFrom.charAt(1))
    let letterNumberFROM = getLetterNumberFromTheLetterOnTheRealBoard('' + tdIdFrom.charAt(1))
    log(letterNumberFROM)

    log(tdIdFrom.charAt(0))
    let NnumberNumberFROM = getNumberFromNumberOnTheRealBoardFrom('' + tdIdFrom.charAt(0))
    log(NnumberNumberFROM)

    log(tdIdTo.charAt(1))
    let letterNumberTO = getLetterNumberFromTheLetterOnTheRealBoard('' + tdIdTo.charAt(1))
    log(letterNumberTO)

    log(tdIdTo.charAt(0))
    let NnumberNumberTO = getNumberFromNumberOnTheRealBoardFrom('' + tdIdTo.charAt(0))
    log(NnumberNumberTO)

    //getAllPossibleMovesOnEmptyBoard
    let piece = chessBoardArray[letterNumberFROM][NnumberNumberFROM];


    //to avoid a weird rare bug:  (or maybe create EMPTY as a piece returning [] in its getAllPOSSIBLEMovesOnREALBoard())
    if (piece == EMPTY) {
        lastClickedTD = null;
        restoreInitialColorsOfFields();
        return false
    }

    log(piece)
    let possibleMovesOnEmptyBoard = piece.getAllPOSSIBLEMovesOnREALBoard();         //getAllPossibleMovesOnEmptyBoard()
    log(possibleMovesOnEmptyBoard.length)


    //castle white short---------------------------------------------------------------- >
    if (
        piece.type == KING && piece.color == WHITE_COLOR && tdIdFrom == 'e1' && tdIdTo == 'g1' && $('f1').innerHTML == EMPTY_STR && $('g1').innerHTML == EMPTY_STR && didKingMove[0] == false && didRookHmove[0] == false
        && thereAintCheck()
    ) {
        l('//castle white short.. final checks..');
        tdId_h1_InnerHTMLSaved = $('h1').innerHTML

        const restorePositionBeforeCastle = function () {
            // tdTo.innerHTML = tdIdToInnerHTMLSaved
            tdFrom.innerHTML = tdIdFromInnerHTMLSaved
            $('f1').innerHTML = EMPTY_STR
            $('g1').innerHTML = EMPTY_STR
            $('h1').innerHTML = tdId_h1_InnerHTMLSaved

        }
        $('f1').innerHTML = tdIdFromInnerHTMLSaved
        fillModelFtomView();
        if (!thereAintCheck()) {
            log('field F1 under attack..  NOT possible!..')
            restorePositionBeforeCastle()
            return false
        }
        $('g1').innerHTML = tdIdFromInnerHTMLSaved
        fillModelFtomView();
        if (!thereAintCheck()) {
            log('field G1 under attack..  NOT possible!..')
            restorePositionBeforeCastle()
            return false
        }
        l('//castle white short is OK ');
        restorePositionBeforeCastle()
        fillModelFtomView();
        $('e1').innerHTML = EMPTY_STR
        $('g1').innerHTML = tdIdFromInnerHTMLSaved
        $('f1').innerHTML = tdId_h1_InnerHTMLSaved
        $('h1').innerHTML = EMPTY_STR
        fillModelFtomView();
        didKingMove[piece.color == WHITE_COLOR ? 0 : 1] = true;
        didRookHmove[piece.color == WHITE_COLOR ? 0 : 1] = true;
        changeWhomovesVar();
        return true;
    }

    //castle white LONG      <--------------------------------------------------------------- 
    if (
        piece.type == KING && piece.color == WHITE_COLOR && tdIdFrom == 'e1' && tdIdTo == 'c1' && $('d1').innerHTML == EMPTY_STR && $('c1').innerHTML == EMPTY_STR && $('b1').innerHTML == EMPTY_STR && didKingMove[0] == false && didRookAmove[0] == false
        && thereAintCheck()
    ) {
        l('//castle white LONG.. final checks..');

        //TODO: A1 in the var name
        tdId_h1_InnerHTMLSaved = $('a1').innerHTML

        const restorePositionBeforeCastle = function () {
            // tdTo.innerHTML = tdIdToInnerHTMLSaved
            tdFrom.innerHTML = tdIdFromInnerHTMLSaved
            $('d1').innerHTML = EMPTY_STR
            $('c1').innerHTML = EMPTY_STR
            $('b1').innerHTML = EMPTY_STR
            $('a1').innerHTML = tdId_h1_InnerHTMLSaved

        }
        $('d1').innerHTML = tdIdFromInnerHTMLSaved
        fillModelFtomView();
        if (!thereAintCheck()) {
            log('field d1 under attack..  NOT possible!..')
            restorePositionBeforeCastle()
            return false
        }
        $('c1').innerHTML = tdIdFromInnerHTMLSaved
        fillModelFtomView();
        if (!thereAintCheck()) {
            log('field c1 under attack..  NOT possible!..')
            restorePositionBeforeCastle()
            return false
        }
        l('//castle white LONG is OK ');
        restorePositionBeforeCastle()
        fillModelFtomView();
        $('e1').innerHTML = EMPTY_STR
        $('c1').innerHTML = tdIdFromInnerHTMLSaved
        $('d1').innerHTML = tdId_h1_InnerHTMLSaved
        $('b1').innerHTML = EMPTY_STR
        $('a1').innerHTML = EMPTY_STR
        fillModelFtomView();
        didKingMove[piece.color == WHITE_COLOR ? 0 : 1] = true;
        didRookAmove[piece.color == WHITE_COLOR ? 0 : 1] = true;
        changeWhomovesVar();
        return true;
    }

    //castle BLACK short---------------------------------------------------------------- >
    if (
        piece.type == KING && piece.color == BLACK_COLOR && tdIdFrom == 'e8' && tdIdTo == 'g8' && $('f8').innerHTML == EMPTY_STR && $('g8').innerHTML == EMPTY_STR && didKingMove[1] == false && didRookHmove[1] == false
        && thereAintCheck()
    ) {
        l('//castle white short.. final checks..');
        tdId_h1_InnerHTMLSaved = $('h8').innerHTML

        const restorePositionBeforeCastle = function () {
            // tdTo.innerHTML = tdIdToInnerHTMLSaved
            tdFrom.innerHTML = tdIdFromInnerHTMLSaved
            $('f8').innerHTML = EMPTY_STR
            $('g8').innerHTML = EMPTY_STR
            $('h8').innerHTML = tdId_h1_InnerHTMLSaved

        }
        $('f8').innerHTML = tdIdFromInnerHTMLSaved
        fillModelFtomView();
        if (!thereAintCheck()) {
            log('field F8 under attack..  NOT possible!..')
            restorePositionBeforeCastle()
            return false
        }
        $('g8').innerHTML = tdIdFromInnerHTMLSaved
        fillModelFtomView();
        if (!thereAintCheck()) {
            log('field G8 under attack..  NOT possible!..')
            restorePositionBeforeCastle()
            return false
        }
        l('//castle white short is OK ');
        restorePositionBeforeCastle()
        fillModelFtomView();
        $('e8').innerHTML = EMPTY_STR
        $('g8').innerHTML = tdIdFromInnerHTMLSaved
        $('f8').innerHTML = tdId_h1_InnerHTMLSaved
        $('h8').innerHTML = EMPTY_STR
        fillModelFtomView();
        didKingMove[piece.color == WHITE_COLOR ? 0 : 1] = true;
        didRookHmove[piece.color == WHITE_COLOR ? 0 : 1] = true;
        changeWhomovesVar();
        return true;
    }

    //castle black LONG      <--------------------------------------------------------------- 
    if (
        piece.type == KING && piece.color == BLACK_COLOR && tdIdFrom == 'e8' && tdIdTo == 'c8' && $('d8').innerHTML == EMPTY_STR && $('c8').innerHTML == EMPTY_STR && $('b8').innerHTML == EMPTY_STR && didKingMove[1] == false && didRookAmove[1] == false
        && thereAintCheck()
    ) {
        l('//castle white LONG.. final checks..');

        //TODO: A1 in the var name
        tdId_h1_InnerHTMLSaved = $('a8').innerHTML

        const restorePositionBeforeCastle = function () {
            // tdTo.innerHTML = tdIdToInnerHTMLSaved
            tdFrom.innerHTML = tdIdFromInnerHTMLSaved
            $('d8').innerHTML = EMPTY_STR
            $('c8').innerHTML = EMPTY_STR
            $('b8').innerHTML = EMPTY_STR
            $('a8').innerHTML = tdId_h1_InnerHTMLSaved

        }
        $('d8').innerHTML = tdIdFromInnerHTMLSaved
        fillModelFtomView();
        if (!thereAintCheck()) {
            log('field d8 under attack..  NOT possible!..')
            restorePositionBeforeCastle()
            return false
        }
        $('c8').innerHTML = tdIdFromInnerHTMLSaved
        fillModelFtomView();
        if (!thereAintCheck()) {
            log('field c8 under attack..  NOT possible!..')
            restorePositionBeforeCastle()
            return false
        }
        l('//castle white LONG is OK ');
        restorePositionBeforeCastle()
        fillModelFtomView();
        $('e8').innerHTML = EMPTY_STR
        $('c8').innerHTML = tdIdFromInnerHTMLSaved
        $('d8').innerHTML = tdId_h1_InnerHTMLSaved
        $('b8').innerHTML = EMPTY_STR
        $('a8').innerHTML = EMPTY_STR
        fillModelFtomView();
        didKingMove[piece.color == WHITE_COLOR ? 0 : 1] = true;
        didRookAmove[piece.color == WHITE_COLOR ? 0 : 1] = true;
        changeWhomovesVar();
        return true;
    }

    l('previousMoveWasPawnJumpBLACK' + previousMoveWasPawnJumpBLACK)
    l(' piece.type' + piece.type)
    l('piece.color ' + piece.color)
    l('tdIdFrom' + tdIdFrom)
    l('tdIdTo' + tdIdTo)
    l('previousMovePawnJumpFIELD_forBLACK' + previousMovePawnJumpFIELD_forBLACK)


    //en passant  white captures BLACK jumped pawn
    if (previousMoveWasPawnJumpBLACK && piece.type == PAWN && piece.color == WHITE_COLOR && tdIdFrom.charAt(1) == '5' && tdIdTo == previousMovePawnJumpFIELD_forBLACK && isNeighborhoodLetter(tdIdFrom.charAt(0), previousMovePawnJumpFIELD_forBLACK.charAt(0))) {
        tdTo.innerHTML = tdFrom.innerHTML;
        tdFrom.innerHTML = EMPTY_STR
        previousMovePawnMoveFIELD_forBLACK.innerHTML = EMPTY_STR
        // alert(56)
        changeWhomovesVar();
        fillModelFtomView();
        previousMoveWasPawnJumpBLACK = false
        previousMovePawnJumpFIELD_forBLACK = null
        previousMovePawnMoveFIELD_forBLACK = null
        prevMoveWasEnPassantCapturing = true
        // alert('set')
        // setTimeout(() => {
        //     fillModelFtomView();

        // }, 100);
        l('return true;')
        return true;
    }

    //en passant  black captures white jumped pawn
    if (previousMoveWasPawnJumpWHITE && piece.type == PAWN && piece.color == BLACK_COLOR && tdIdFrom.charAt(1) == '4' && tdIdTo == previousMovePawnJumpFIELD_forWHITE && isNeighborhoodLetter(tdIdFrom.charAt(0), previousMovePawnJumpFIELD_forWHITE.charAt(0))) {
        tdTo.innerHTML = tdFrom.innerHTML;
        tdFrom.innerHTML = EMPTY_STR
        previousMovePawnMoveFIELD_forWHITE.innerHTML = EMPTY_STR
        // alert(56)
        changeWhomovesVar();
        fillModelFtomView();
        previousMoveWasPawnJumpWHITE = false
        previousMovePawnJumpFIELD_forWHITE = null
        previousMovePawnMoveFIELD_forWHITE = null
        prevMoveWasEnPassantCapturing = true

        // setTimeout(() => {
        //     fillModelFtomView();

        // }, 100);
        l('return true;')
        return true;
    }

    // else{
    //     l(  'return false'           )
    //     return false
    // }

    // const includesArray = (data, arr) => {
    //     return data.some(e => Array.isArray(e) && e.every((o, i) => Object.is(arr[i], o)));
    // }
    // if (possibleMovesOnEmptyBoard.includes([NnumberNumberTO, letterNumberTO])){
    if (includesArray(possibleMovesOnEmptyBoard, [letterNumberTO, NnumberNumberTO])) {
        log('POSSIBLE !!')
        tdTo.innerHTML = tdFrom.innerHTML;
        tdFrom.innerHTML = EMPTY_STR
        fillModelFtomView();
        if (thereAintCheck()) {
            log('No check!! Totally possible!..')
            //    restore()
            changeWhomovesVar();
            redrawViewFromModel()

            if (piece.type == KING) {
                didKingMove[piece.color == WHITE_COLOR ? 0 : 1] = true;
            }

            if (piece.type == ROOK && (tdIdFrom == 'h1' || tdIdFrom == 'h8')) {
                didRookHmove[piece.color == WHITE_COLOR ? 0 : 1] = true;
            }

            if (piece.type == ROOK && (tdIdFrom == 'a1' || tdIdFrom == 'a8')) {
                didRookAmove[piece.color == WHITE_COLOR ? 0 : 1] = true;
            }

            //white pawn promotion
            if (!restoreInitialBoardInAnyCase)
                if (piece.type == PAWN && piece.color == WHITE_COLOR && tdIdFrom.charAt(1) == '7' && tdIdTo.charAt(1) == 8) {
                    isPromotionSelectMoving = false
                    $('promotionSelectIdWHITE').style.display = 'inline'
                    $('promotionSelectIdBLACK').style.display = 'none'
                    $('promotionSelectId').style.display = 'inline'
                    savedIdOfPromotionFMoveTO = tdIdTo
                    return true
                }

            //black pawn promotion
            if (!restoreInitialBoardInAnyCase)
                if (piece.type == PAWN && piece.color == BLACK_COLOR && tdIdFrom.charAt(1) == '2' && tdIdTo.charAt(1) == 1) {
                    isPromotionSelectMoving = false
                    $('promotionSelectIdBLACK').style.display = 'inline'
                    $('promotionSelectIdWHITE').style.display = 'none'
                    $('promotionSelectId').style.display = 'inline'
                    savedIdOfPromotionFMoveTO = tdIdTo
                    return true
                }


            //en passant pre-sets - when BLACK jumped
            if (!restoreInitialBoardInAnyCase)
                if (piece.type == PAWN && piece.color == BLACK_COLOR && tdIdFrom.charAt(1) == '7' && tdIdTo.charAt(1) == '5') {
                    previousMoveWasPawnJumpBLACK = true
                    previousMovePawnJumpFIELD_forBLACK = tdIdFrom.charAt(0) + '6'
                    previousMovePawnMoveFIELD_forBLACK = tdTo
                    prevMoveWasEnPassantCapturing = true
                    l('SET!!!!!!!!!!1111111 ' + previousMovePawnJumpFIELD_forBLACK)
                } else {
                    previousMoveWasPawnJumpBLACK = false
                    previousMovePawnJumpFIELD_forBLACK = null
                    previousMovePawnMoveFIELD_forBLACK = null
                }

            //en passant pre-sets - when WHITE jumped
            if (!restoreInitialBoardInAnyCase)
                if (piece.type == PAWN && piece.color == WHITE_COLOR && tdIdFrom.charAt(1) == '2' && tdIdTo.charAt(1) == '4') {
                    previousMoveWasPawnJumpWHITE = true
                    previousMovePawnJumpFIELD_forWHITE = tdIdFrom.charAt(0) + '3'
                    previousMovePawnMoveFIELD_forWHITE = tdTo
                    prevMoveWasEnPassantCapturing = true
                    l('SET!!!!!!!!!!1111111 ' + previousMovePawnJumpFIELD_forBLACK)
                } else {
                    previousMoveWasPawnJumpWHITE = false
                    previousMovePawnJumpFIELD_forWHITE = null
                    previousMovePawnMoveFIELD_forWHITE = null
                }

            //  l( 'isNeighborhoodLetter: '  + isNeighborhoodLetter('d','c')  )

            if (restoreInitialBoardInAnyCase) {
                changeWhomovesVar()
                // redrawViewFromModel()
                restore()
                fillModelFtomView()

            }

            return true
        }
        else {
            log('CHECK!! ACTIALLY _NOT_ possible!..')
            restore()
            fillModelFtomView()
            return false
        }
    }
    else {
        log('impossible..')
        fillModelFtomView()
        return false;
    }
}


let counterDELME = 0;
function thereArePossibleMoves() {
    // let result = false;
    l('whoMoves: ' + whoMoves);
    let colorToUse = whoMoves == WHITE ? WHITE_COLOR : BLACK_COLOR
    l('colorToUse: ' + colorToUse);
    let opposingColorToUse = whoMoves == WHITE ? BLACK_COLOR : WHITE_COLOR

    for (let index1 = 0; index1 < BOARD_SIZE; index1++) {
        let visualization = '';
        for (let index = 0; index < BOARD_SIZE; index++) {
            let piece = chessBoardArray[index1][index];
            if (piece == EMPTY) {
                visualization += EMPTY_FIELD_VISUALIZATION
                continue;
            }
            let pieceLetter = getLetterOnTheRealBoardFromLetterNumber(piece.letter)
            let pieceNumber = getNumberOnTheRealBoardFromNumber(piece.number)

            // if(counterDELME!=0){
            //     debugger
            // }
            // counterDELME++

            let currColor = piece.color
            if (currColor != colorToUse) {
                // removeSubarray(result, [index1, index])
                continue;
            }
            // let opposingColor=piece.getOpposingColor(currColor)
            let allATTACKEDMovesOnREALBoard = piece.getAllPOSSIBLEMovesOnREALBoard();

            for (let index = 0; index < allATTACKEDMovesOnREALBoard.length; index++) {
                const element = allATTACKEDMovesOnREALBoard[index];
                let n = element[0]
                let lett = element[1]
                let field = chessBoardArray[n][lett]

                if (chessBoardArray[n][lett] != EMPTY && chessBoardArray[n][lett].color == colorToUse) {
                    continue
                }

                let moveLetter = getLetterOnTheRealBoardFromLetterNumber(lett)
                let moveNumber = getNumberOnTheRealBoardFromNumber(n)
                // debugger

                // if(counterDELME!=0){
                //     debugger
                // }
                // counterDELME++
                // continue; //TODO: del this !!!!!!!!!!!!!!!!!!!11111111111111

                let tdIdFrom = pieceLetter + pieceNumber;
                log('!!!!!!!!!!!!1111111111 tdIdFrom:' + tdIdFrom)
                let tdIdTo = moveLetter + moveNumber
                log('!!!!!!!!!!!!1111111111 tdIdFrom:' + tdIdTo)
                let tdFrom = $(tdIdFrom)
                let tdTo = $(tdIdTo)

                //  tdIdToInnerHTMLSaved_inthereArePossibleMoves = tdTo.innerHTML;
                //  tdIdFromInnerHTMLSaved_inthereArePossibleMoves = tdFrom.innerHTML;
                // //local func:
                // const restore = function () {
                //     tdTo.innerHTML = tdIdToInnerHTMLSaved_inthereArePossibleMoves
                //     tdFrom.innerHTML = tdIdFromInnerHTMLSaved_inthereArePossibleMoves
                // }

                if (makeMoveIfPossible(tdFrom, tdTo, true)) {

                    // setTimeout(() => {
                    // restore()
                    // redrawViewFromModel()
                    // }, 300);
                    l('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!' + tdIdFrom + '->' + tdIdTo)
                    fillModelFtomView()
                    return true
                }

                // if (field != EMPTY && field.color == colorToUse && field.type == KING) {
                //     return false
                // }

                // removeSubarray(result, element)
            }

            // l(allATTACKEDMovesOnREALBoard.length+'  !!!111111111111111')
            // if (includesArray(result, [index, index1])) {
            //     l('found prohibited !!!!!!!!!!!!!!!!!!!!!!!11111111111111111')
            // }

            visualization += piece.toString();
        }
        l(visualization)
    }
    return false
}