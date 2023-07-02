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

        addToAnArrayIfNotNull(result, this.number + direction, this.letter);
        if (this.number == pawnsStartPosition) {
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






function thereAintCheck(  ) {
    l( 'whoMoves: '+ whoMoves);
    let colorToUse = whoMoves==WHITE ? WHITE_COLOR : BLACK_COLOR
    l( 'colorToUse: '+ colorToUse);
    let opposingColorToUse = whoMoves==WHITE ? BLACK_COLOR  : WHITE_COLOR

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
                if (field != EMPTY && field.color==colorToUse  && field.type==KING){
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
                if (     /* field != EMPTY */ /*&& field.color == opposingColorToUse */ fN == n && fL == lett) {
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