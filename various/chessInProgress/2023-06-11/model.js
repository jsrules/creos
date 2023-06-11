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
    console.log(modelArrCopy)
    return modelArrCopy
}

function isThereAMineAt(modelArrWidth, modelArrHeight) {
    return modelArr[modelArrWidth][modelArrHeight] !== 0;
}



function fillModelFtomView() {

    for (let index1 = 0; index1 < FIELD_HEIGHT; index1++) {
        for (let index = 0; index < FIELD_WIDTH; index++) {
            let letter = HORIZONTAL_FIELD_LETTERS.charAt(index1)       // boardArr[index][index1] ;
            let number = "" + (index + 1)  //  HORIZONTAL_FIELD_LETTERS.charAt(index1) 
            // log(number)
            let currFieldName = letter + number;
            // log(currFieldName)
            boardArr[index][index1] = $(currFieldName)

            // boardArr[index][index1] =  lem
        }
    }

    log(boardArr)

    //   alert(  $('a1').innerHTML  )
    // return $('a1').innerHTML
}


function findAllMovesOnEmptyBoardForRook(fieldOnWhichStandsTheRook) {
    var res = []

    alert(545)

    let letter = fieldOnWhichStandsTheRook.charAt(0)
    let number = fieldOnWhichStandsTheRook.charAt(1)

number=parseInt(number)+1

    let moveeee = "" + letter + (number)
    res.push(moveeee)        //moveeee
    return res

}

