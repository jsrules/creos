////////////////////////////////////////////////////////// controller ///////////////////////////////////////////////////////////////////////////////////////////////////////////// 
'use strict';

// alert(554)

function stopEvent(event) {
    if (event.preventDefault != undefined)
        event.preventDefault();
    if (event.stopPropagation != undefined)
        event.stopPropagation();
}



function fieldClickHandler(td) {

    if (td.innerHTML == '' && lastClickedTD == null) {
        return;
    }

    // log(td.id)
    if (lastClickedTD == td) {
        lastClickedTD.style.backgroundColor = lastClickedTDSavedColor
        lastClickedTD = null;
        lastClickedTDSavedColor = null;
        clickProcessed = true;
        return
    } else if (lastClickedTD != null  /* && lastMoveFromTd==null */) {

        td.innerHTML = lastClickedTD.innerHTML
        lastClickedTD.innerHTML = ''
        lastClickedTD.style.backgroundColor = lastClickedTDSavedColor

        lastMoveFromTdSavedColor = lastClickedTD.style.backgroundColor
        lastMoveToTdSavedColor = td.style.backgroundColor
        lastClickedTD.style.backgroundColor = COLOR_OF_LAST_MOVE_FROM
        td.style.backgroundColor = COLOR_OF_LAST_MOVE_TO
        lastMoveFromTd = lastClickedTD
        lastMoveToTd = td

        // lastMoveToTd = null
        // lastMoveFromTd = null
        lastClickedTDSavedColor = null;
        // lastMoveFromTdSavedColor = null
        // lastMoveToTdSavedColor = null

        lastClickedTD = null

        clickProcessed = true;
        return;
    }

    // if (lastMoveToTd == null) {
    // lastStateOfTheBoard = $('chessBoardId').innerHTML
    // }
    lastClickedTDSavedColor = null;
    lastClickedTD = td
    lastClickedTDSavedColor = td.style.backgroundColor;
    lastStateOfTheBoard = $('chessBoardId').innerHTML
    td.style.backgroundColor = COLOR_OF_FIELD_WITH_PIECE_TO_MOVE
    // log(td)
    if (lastMoveFromTd != null) {
        lastMoveFromTd.style.backgroundColor = lastMoveFromTdSavedColor
        lastMoveToTd.style.backgroundColor = lastMoveToTdSavedColor
        lastMoveToTd = null
        lastMoveFromTd = null
        lastMoveFromTdSavedColor = null
        lastMoveToTdSavedColor = null
    }
    clickProcessed = true;
}

function imgRightClickHandler(img) {
    // alert(100000000)
    if (getFilenameFromURL(img.src) != getFilenameFromURL(START_SQWARE_IMG) && getFilenameFromURL(img.src) != getFilenameFromURL(MARKED_SQWARE_IMG)) {
        return
    }


    // img.src = getFilenameFromURL(img.src) != getFilenameFromURL(MARKED_SQWARE_IMG) ? MARKED_SQWARE_IMG : START_SQWARE_IMG;


    if (getFilenameFromURL(img.src) != getFilenameFromURL(MARKED_SQWARE_IMG)) {
        img.src = MARKED_SQWARE_IMG
        minesLeft--
    } else {
        img.src = START_SQWARE_IMG
        minesLeft++
    }
    redrawMinesLeft()

    if (minesLeft == 0) {
        isGameOver = true;
        redrawBoard(false)
        // alert('Done!')
    }


    return false
}


// function imgClickHandler(img) {
//     // alert(554);
//     // img.src = MARKED_SQWARE_IMG;// 'img/marked-square.jpg'

//     let id = img.id;
//     let x = breakId(id)[0]
//     let y = breakId(id)[1]

//     if (getFilenameFromURL(img.src) != getFilenameFromURL(START_SQWARE_IMG)) {
//         return
//     }
//     if (isThereAMineAt(x, y)) {
//         redrawBoard(false)
//         myAlert('BANG !!!')
//     } else {  //showing neighbourhood
//         // img.src = EMPTY_SQWARE_IMG;
//         let numberOfNeighbourhoodMines = findNumberOfNeighbourhoodMines(x, y)
//         img.src = EMPTY_SQWARE_WITH_NUMBER_IMG_FIRST_PART + String(numberOfNeighbourhoodMines) + EMPTY_SQWARE_WITH_NUMBER_IMG_LAST_PART;


//         if (numberOfNeighbourhoodMines !== 0) {
//             return;
//         }

//         for (let i = -1; i < 2; i++) {
//             for (let j = -1; j < 2; j++) {

//                 if (i == 0 && j == 0) {
//                     continue;
//                 }

//                 try {
//                     let currNeighborhoodImgId = createId(x + i, y + j)
//                     let currNeighborhoodImg = $(currNeighborhoodImgId)
//                     // currNeighborhoodImg.src = START_SQWARE_IMG;
//                     // log(getFilenameFromURL(currNeighborhoodImg.src))

//                     if (getFilenameFromURL(currNeighborhoodImg.src) == getFilenameFromURL(START_SQWARE_IMG) && (!isThereAMineAt(x + i, y + j))) {
//                         // currNeighborhoodImg.click();
//                         setTimeout(() => {
//                             currNeighborhoodImg.click();
//                         }, 1);
//                     }


//                     // var currValue = modelArr[modelArrWidth + i][modelArrHeight + j]
//                 } catch (error) {
//                     // log('EXCEPTION!! : ' + error)
//                 }

//                 // total += (!isNaN(currValue) ? currValue : 0);
//             }
//         }
//     }

//     // let nGumberOfNeighbourhoodMines = findNumberOfNeighbourhoodMines(x, y)
//     // alert(numberOfNeighbourhoodMines)

// }

function documentDoubleClick(e) {
    // alert(554);
    // img.src = MARKED_SQWARE_IMG;// 'img/marked-square.jpg'
    alert(e)
}

function undoLastMove() {
    // alert(undoLastMove)
    if (lastStateOfTheBoard != null) {
        $('chessBoardId').innerHTML = lastStateOfTheBoard
        if (lastClickedTD != null) {
            lastClickedTD.style.backgroundColor = lastClickedTDSavedColor
            log(454545)
        }
    }

}