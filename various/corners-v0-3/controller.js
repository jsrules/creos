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
        // lastClickedTD.style.backgroundColor = lastClickedTDSavedColor
        restoreInitialColorsOfFields()
        return
    } else if (lastClickedTD != null  /* && lastMoveFromTd==null */) {


        if ((!POSSIBLE_TO_CAPTURE) && td.innerHTML != '') {
            restoreInitialColorsOfFields()
            return;
        }

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
        // lastStateOfTheBoard = $('chessBoardId').innerHTML
        $('undoLastMoveLinkId').style.color = 'blue'

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



function documentDoubleClick(e) {
    // alert(554);
    // img.src = MARKED_SQWARE_IMG;// 'img/marked-square.jpg'
    alert(e)
}

function undoLastMove() {
    // alert(undoLastMove)
    if (lastStateOfTheBoard != null) {
        $('chessBoardId').innerHTML = lastStateOfTheBoard
        lastStateOfTheBoard = null
        restoreInitialColorsOfFields()
        $('undoLastMoveLinkId').style.color = 'grey'
        // if (lastClickedTD != null) {
        //     lastClickedTD.style.backgroundColor = lastClickedTDSavedColor
        //     log(454545)
        // }
    }

}