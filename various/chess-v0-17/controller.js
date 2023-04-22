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

    let inTheMiddleOfCastle = false;

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

        if ((POSSIBLE_TO_CAPTURE) && td.innerHTML != '') {

            let toColor = getColorOfPieceOnTd(td)
            let fromColor = getColorOfPieceOnTd(lastClickedTD)

            // restoreInitialColorsOfFields()
            if (toColor == fromColor) {
                return;
            }
        }

        //castle white short  //TODO: checks empties etc
        if (lastClickedTD.id == 'e1' && td.id == 'g1' && $('f1').innerHTML == '' && $('g1').innerHTML == '') {
            inTheMiddleOfCastle = true
            $('g1').innerHTML = $('e1').innerHTML
            $('e1').innerHTML = ''
            $('f1').innerHTML = $('h1').innerHTML
            $('h1').innerHTML = ''

            setTimeout(() => {
                $('e1').style.backgroundColor = COLOR_OF_LAST_MOVE_FROM
                $('g1').style.backgroundColor = COLOR_OF_LAST_MOVE_TO
            }, 1);

            $('undoLastMoveLinkId').style.color = 'blue'
            // return
        }

        //castle white long  //TODO: checks empties etc
        if (lastClickedTD.id == 'e1' && td.id == 'c1' && $('b1').innerHTML == '' && $('c1').innerHTML == '' && $('d1').innerHTML == '') {
            inTheMiddleOfCastle = true
            $('c1').innerHTML = $('e1').innerHTML
            $('e1').innerHTML = ''
            $('d1').innerHTML = $('a1').innerHTML
            $('a1').innerHTML = ''

            setTimeout(() => {
                $('e1').style.backgroundColor = COLOR_OF_LAST_MOVE_FROM
                $('c1').style.backgroundColor = COLOR_OF_LAST_MOVE_TO
            }, 1);

            $('undoLastMoveLinkId').style.color = 'blue'
            // return
        }


        //castle black short  //TODO: checks empties etc
        if (lastClickedTD.id == 'e8' && td.id == 'g8' && $('f8').innerHTML == '' && $('g8').innerHTML == '') {
            inTheMiddleOfCastle = true
            $('g8').innerHTML = $('e8').innerHTML
            $('e8').innerHTML = ''
            $('f8').innerHTML = $('h8').innerHTML
            $('h8').innerHTML = ''

            setTimeout(() => {
                $('e8').style.backgroundColor = COLOR_OF_LAST_MOVE_FROM
                $('g8').style.backgroundColor = COLOR_OF_LAST_MOVE_TO
            }, 8);

            $('undoLastMoveLinkId').style.color = 'blue'
            // return
        }

        //castle black long  //TODO: checks empties etc
        if (lastClickedTD.id == 'e8' && td.id == 'c8' && $('b8').innerHTML == '' && $('c8').innerHTML == '' && $('d8').innerHTML == '') {
            inTheMiddleOfCastle = true
            $('c8').innerHTML = $('e8').innerHTML
            $('e8').innerHTML = ''
            $('d8').innerHTML = $('a8').innerHTML
            $('a8').innerHTML = ''

            setTimeout(() => {
                $('e8').style.backgroundColor = COLOR_OF_LAST_MOVE_FROM
                $('c8').style.backgroundColor = COLOR_OF_LAST_MOVE_TO
            }, 1);

            $('undoLastMoveLinkId').style.color = 'blue'
            // return
        }

        //pawn En passant WHITE - https://en.wikipedia.org/wiki/En_passant
        if (lastClickedTD.innerHTML.includes('wP')) {
            let fromNumber = lastClickedTD.id.charAt(1);
            let fromLetter = lastClickedTD.id.charAt(0);
            let toNumber = td.id.charAt(1)
            let toLetter = td.id.charAt(0);
            let possibleOpposingPawnPosition = toLetter + '5';
            let fromLetterNumber = fromLetter.charCodeAt()
            // log(fromLetterNumber)
            let toLetterNumber = toLetter.charCodeAt()
            // log(toLetterNumber)
            let diff = Math.abs(fromLetterNumber - toLetterNumber)
            // log(diff)
            if (fromNumber == '5' && toNumber == '6' && lastClickedTD.innerHTML.includes('wP') && diff == 1 && $(possibleOpposingPawnPosition).innerHTML.includes('bP')) {// && td.id == 'c8') {  //&& td.innerHTML.includes('bP')
                // log(455455543)
                // inTheMiddleOfCastle = true
                // td.innerHTML = lastClickedTD.innerHTML;
                // lastClickedTD.innerHTML=''
                $(possibleOpposingPawnPosition).innerHTML = ''
            }
        }


        //pawn En passant BLACK - https://en.wikipedia.org/wiki/En_passant
        if (lastClickedTD.innerHTML.includes('bP')) {
            let fromNumber = lastClickedTD.id.charAt(1);
            let fromLetter = lastClickedTD.id.charAt(0);
            let toNumber = td.id.charAt(1)
            let toLetter = td.id.charAt(0);
            let possibleOpposingPawnPosition = toLetter + '4';
            let fromLetterNumber = fromLetter.charCodeAt()
            // log(fromLetterNumber)
            let toLetterNumber = toLetter.charCodeAt()
            // log(toLetterNumber)
            let diff = Math.abs(fromLetterNumber - toLetterNumber)
            // log(diff)
            if (fromNumber == '4' && toNumber == '3' && lastClickedTD.innerHTML.includes('bP') && diff == 1 && $(possibleOpposingPawnPosition).innerHTML.includes('wP')) {// && td.id == 'c8') {  //&& td.innerHTML.includes('bP')
                // log(455455543)
                // inTheMiddleOfCastle = true
                // td.innerHTML = lastClickedTD.innerHTML;
                // lastClickedTD.innerHTML=''
                $(possibleOpposingPawnPosition).innerHTML = ''
            }
        }

        if (!inTheMiddleOfCastle) {
            td.innerHTML = lastClickedTD.innerHTML
        }

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