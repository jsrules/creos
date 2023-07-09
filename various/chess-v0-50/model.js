////////////////////////////////////////////////////////// model ///////////////////////////////////////////////////////////////////////////////////////////////////////////// 
'use strict';

function initModel() {

    modelArr = new Array(FIELD_WIDTH);
    for (let i = 0; i < modelArr.length; i++) {
        modelArr[i] = new Array(FIELD_HEIGHT);
        modelArr[i].fill(0)
    }

    // console.log(modelArr);

    for (let i = 0; i < NUMBER_OF_MINES; i++) {
        do {
            var widthRand = randomInteger(0, FIELD_WIDTH - 1);
            var heightRand = randomInteger(0, FIELD_HEIGHT - 1);
        } while (modelArr[widthRand][heightRand] !== 0)
        modelArr[widthRand][heightRand] = 1;
    }
}


function findNumberOfNeighbourhoodMines(modelArrWidth, modelArrHeight) {
    let total = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {

            if (i == 0 && j == 0) {
                continue;
            }

            try {
                var currValue = modelArr[modelArrWidth + i][modelArrHeight + j]
            } catch (error) {
                currValue = 0;
            }

            total += (!isNaN(currValue) ? currValue : 0);
        }
    }
    return total;
}

function getModelArrWithNumberOfNeighbours() {
    // let resultArr = []

    //NB: similar name as global var!!!
    let modelArrCopy = new Array(FIELD_WIDTH);
    for (let i = 0; i < modelArrCopy.length; i++) {
        modelArrCopy[i] = new Array(FIELD_HEIGHT);
        modelArrCopy[i].fill(0)
    }

    for (let index1 = 0; index1 < FIELD_HEIGHT; index1++) {
        for (let index = 0; index < FIELD_WIDTH; index++) {
            modelArrCopy[index][index1] = findNumberOfNeighbourhoodMines(index, index1)
        }
    }
    // console.log(modelArrCopy)
    return modelArrCopy
}

function isThereAMineAt(modelArrWidth, modelArrHeight) {
    return modelArr[modelArrWidth][modelArrHeight] !== 0;
}



function fillModelFtomView() {

    log('fillModelFtomView() 000000000000000000000000000')
    // log($('e5'))
    // log (getColorOfPieceInHtml($('e5')))


    for (let index1 = 0; index1 < BOARD_SIZE; index1++) {
        for (let index = 0; index < BOARD_SIZE; index++) {
            let letter = getLetterOnTheRealBoardFromLetterNumber(index); //HORIZONTAL_FIELD_LETTERS.charAt(BOARD_SIZE - index1 -1)       
            let number = getNumberOnTheRealBoardFromNumber(index1)                 //"" + (index + 1)  
            // log(number)
            let currFieldName = letter + number;
            log(index1 + ';' + index + '=' + currFieldName)
            // boardArr[index][index1] = $(currFieldName)
            let currFieldContent = $(currFieldName).innerHTML;

            if (currFieldContent == EMPTY_STR) {
                putPieceOn(EMPTY, index1, index);
                continue;
            }

            let color = getColorOfPieceInHtml(currFieldContent) == 'w' ? WHITE_COLOR : BLACK_COLOR;
            let piece = getPieceInHtml(currFieldContent)
            switch (piece) {
                case KING: putPieceOn(new K(color), index1, index);
                    break;
                case QUEEN: putPieceOn(new Q(color), index1, index);
                    break;
                case ROOK: putPieceOn(new R(color), index1, index);
                    break;
                case BISHOP: putPieceOn(new B(color), index1, index);
                    break;
                case KNIGHT: putPieceOn(new N(color), index1, index);
                    break;
                case PAWN: putPieceOn(new P(color), index1, index);
                    break;
                default: alert('Unknown piece.. in fillModelFtomView()' + piece)

            }


            log(currFieldContent + color)

            // boardArr[index][index1] =  lem
        }
    }

    // log(boardArr)

    //   alert(  $('a1').innerHTML  )
    // return $('a1').innerHTML

    // log(4545555)
    // log(chessBoardArray)

    // log(chessBoardArray[7][3])
}


function findAllMovesOnEmptyBoardForRook(fieldOnWhichStandsTheRook) {
    var res = []

    alert(545)

    let letter = fieldOnWhichStandsTheRook.charAt(0)
    let number = fieldOnWhichStandsTheRook.charAt(1)

    number = parseInt(number) + 1

    let moveeee = "" + letter + (number)
    res.push(moveeee)        //moveeee
    return res

}

function fillStartPosition() {

    //TODO: stuff like this:
    // putPieceOnThisID(new B(color),'c1')


    let color = WHITE_COLOR;
    for (let index = 0; index < FIELD_WIDTH; index++) {
        putPieceOn(new P(color), 6, index);

    }
    putPieceOn(new K(color), 7, 4);
    putPieceOn(new Q(color), 7, 3);
    putPieceOn(new R(color), 7, 0);
    putPieceOn(new N(color), 7, 1);
    putPieceOn(new B(color), 7, 2);
    putPieceOn(new N(color), 7, 6);
    putPieceOn(new B(color), 7, 5);
    putPieceOn(new R(color), 7, 7);

    color = BLACK_COLOR;
    for (let index = 0; index < FIELD_WIDTH; index++) {
        putPieceOn(new P(color), 1, index);
    }
    putPieceOn(new K(color), 0, 4);
    putPieceOn(new Q(color), 0, 3);
    putPieceOn(new R(color), 0, 0);
    putPieceOn(new N(color), 0, 1);
    putPieceOn(new B(color), 0, 2);
    putPieceOn(new N(color), 0, 6);
    putPieceOn(new B(color), 0, 5);
    putPieceOn(new R(color), 0, 7);

    // putPieceOn(new P(color), 6, 1);




    //ROOKS
    // putPiece('a1', 'wR')
    // putPiece('h1', 'wR')
    // putPiece('a8', 'bR')
    // putPiece('h8', 'bR')

    // //KNIGHTS
    // putPiece('b1', 'wN')
    // putPiece('g1', 'wN')
    // putPiece('b8', 'bN')
    // putPiece('g8', 'bN')

    // //BISHOPS
    // putPiece('c1', 'wB')
    // putPiece('f1', 'wB')
    // putPiece('c8', 'bB')
    // putPiece('f8', 'bB')



/**
 * chk Tanya-like game:
     let color = WHITE_COLOR;
    putPieceOn(new K(color), 7, 4);
    putPieceOn(new R(color), 7, 3);
    putPieceOn(new R(color), 7, 7);

    // putPieceOn(new P(color), 1, 1);
    putPieceOn(new P(color), 6, 7);
    putPieceOn(new P(color), 3, 6);
    putPieceOn(new P(color), 3, 5);

        color = BLACK_COLOR;
    putPieceOn(new K(color), 0, 4);
    // putPieceOn(new P(color), 6, 4);
    putPieceOn(new R(color), 0, 0);
    putPieceOn(new R(color), 0, 7);

    putPieceOn(new P(color), 6, 0);
    putPieceOn(new P(color), 1, 7);
    putPieceOn(new P(color), 4, 6);


 */


}