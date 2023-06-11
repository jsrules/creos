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

    // log('in fieldClickHandler()')


    td_in_fieldClickHandler = td;
    saved_lastClickedTD = lastClickedTD;

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

        //pawn Promotion WHITE
        if (lastClickedTD.innerHTML.includes('wP') && td.id.includes('8')) {

            // let answer = null
            // do {
            //     answer = prompt('Q, R, N, B?').toUpperCase()
            // } while (answer != 'Q' && answer != 'R' && answer != 'N' && answer != 'B');
            // putPiece(lastClickedTD.id, 'w' + answer);


            //CODE TO LEAVE !!!!!!!!!!!!!!!!!!!!!!!!!!1111111111111111111111111111111111111
            // lastStateOfTheBoard = $('chessBoardId').innerHTML
            // alert(5454)
            savedInnerHTMLOfPromotionFMoveFROM = lastClickedTD.innerHTML
            isPromotionSelectMoving = false;
            $('promotionSelectIdBLACK').style.display = 'none'
            $('promotionSelectIdWHITE').style.display = 'inline'
            $('promotionSelectId').style.display = 'inline'
            return;

            //CODE TO LEAVE !!!!!!!!!!!!!!!!!!!!!!!!!!1111111111111111111111111111111111111
            //THINK ABOVE THE BELOW CODE:
            // let fromNumber = lastClickedTD.id.charAt(1);
            // let fromLetter = lastClickedTD.id.charAt(0);
            // let toNumber = td.id.charAt(1)
            // let toLetter = td.id.charAt(0);
            // let possibleOpposingPawnPosition = toLetter + '5';
            // let fromLetterNumber = fromLetter.charCodeAt()
            // // log(fromLetterNumber)
            // let toLetterNumber = toLetter.charCodeAt()
            // // log(toLetterNumber)
            // let diff = Math.abs(fromLetterNumber - toLetterNumber)
            // // log(diff)
            // if (fromNumber == '5' && toNumber == '6' && lastClickedTD.innerHTML.includes('wP') && diff == 1 && $(possibleOpposingPawnPosition).innerHTML.includes('bP')) {// && td.id == 'c8') {  //&& td.innerHTML.includes('bP')
            //     // log(455455543)
            //     // inTheMiddleOfCastle = true
            //     // td.innerHTML = lastClickedTD.innerHTML;
            //     // lastClickedTD.innerHTML=''
            //     $(possibleOpposingPawnPosition).innerHTML = ''
            // }
        }


        //pawn Promotion BLACK
        if (lastClickedTD.innerHTML.includes('bP') && td.id.includes('1')) {


            // let answer = null
            // do {
            //     answer = prompt('Q, R, N, B?').toUpperCase()
            // } while (answer != 'Q' && answer != 'R' && answer != 'N' && answer != 'B');
            // putPiece(lastClickedTD.id, 'b' + answer);


            //CODE TO LEAVE !!!!!!!!!!!!!!!!!!!!!!!!!!1111111111111111111111111111111111111
            // lastStateOfTheBoard = $('chessBoardId').innerHTML
            savedInnerHTMLOfPromotionFMoveFROM = lastClickedTD.innerHTML
            isPromotionSelectMoving = false;
            $('promotionSelectIdBLACK').style.display = 'inline'
            $('promotionSelectIdWHITE').style.display = 'none'
            $('promotionSelectId').style.display = 'inline'
            return;

            //CODE TO LEAVE !!!!!!!!!!!!!!!!!!!!!!!!!!1111111111111111111111111111111111111
            //THINK ABOVE THE BELOW CODE:
            // let fromNumber = lastClickedTD.id.charAt(1);
            // let fromLetter = lastClickedTD.id.charAt(0);
            // let toNumber = td.id.charAt(1)
            // let toLetter = td.id.charAt(0);
            // let possibleOpposingPawnPosition = toLetter + '5';
            // let fromLetterNumber = fromLetter.charCodeAt()
            // // log(fromLetterNumber)
            // let toLetterNumber = toLetter.charCodeAt()
            // // log(toLetterNumber)
            // let diff = Math.abs(fromLetterNumber - toLetterNumber)
            // // log(diff)
            // if (fromNumber == '5' && toNumber == '6' && lastClickedTD.innerHTML.includes('wP') && diff == 1 && $(possibleOpposingPawnPosition).innerHTML.includes('bP')) {// && td.id == 'c8') {  //&& td.innerHTML.includes('bP')
            //     // log(455455543)
            //     // inTheMiddleOfCastle = true
            //     // td.innerHTML = lastClickedTD.innerHTML;
            //     // lastClickedTD.innerHTML=''
            //     $(possibleOpposingPawnPosition).innerHTML = ''
            // }
        }

        //pawn Promotion WHITE
        // if (lastClickedTD.innerHTML.includes('wP') && td.id.includes('8')) {}


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
            // whoMoves = !whoMoves;


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
            // whoMoves = !whoMoves;

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


        //stupid adhoc solution to fix undo bug after caturing promoted piece right away:
        if (
            (td.id == savedIdOfPromotionFMoveTO && (td.id.includes(8) && getColorOfPieceOnTd(lastClickedTD) == 'b'))
            ||
            (td.id == savedIdOfPromotionFMoveTO && (td.id.includes(1) && getColorOfPieceOnTd(lastClickedTD) == 'w'))

        ) {
            isCapturedPromotedPiece = true
            // log(5555555555555)
        } else {
            isCapturedPromotedPiece = false

        }


        //THE BLOCK BELOW COPIPASTED TO pawnPromotionTdClickHandler()
        if (!inTheMiddleOfCastle) {
            td.innerHTML = lastClickedTD.innerHTML
            whoMoves = !whoMoves;
            isUndoNowPossible = true
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

        if (inTheMiddleOfCastle) {
            whoMoves = !whoMoves;
            inTheMiddleOfCastle = false
            isUndoNowPossible = true
        }

        // log('move over')

        return;
    }


    // if (lastMoveToTd == null) {
    // lastStateOfTheBoard = $('chessBoardId').innerHTML
    // }

    // restoreInitialColorsOfFields()
    //check move order
    if (whoMoves == WHITE && getColorOfPieceOnTd(td) != 'w') {
        return
    }
    if (whoMoves == BLACK && getColorOfPieceOnTd(td) != 'b') {
        return
    }



    //FIXME TODO: THINK HOW TO DO THIS !!!!!!!!!!!!!!!!!!!!!!!
    // savedIdOfPromotionFMoveFROM = null


    lastClickedTDSavedColor = null;
    lastClickedTD = td
    lastClickedTDSavedColor = td.style.backgroundColor;
    lastStateOfTheBoard = $('chessBoardId').innerHTML
    td.style.backgroundColor = COLOR_OF_FIELD_WITH_PIECE_TO_MOVE




    // savedIdOfPromotionFMoveTO = null
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
    // restoreInitialColorsOfFields()
    if (isUndoNowPossible && lastStateOfTheBoard != null) {

        whoMoves = !whoMoves
        $('chessBoardId').innerHTML = lastStateOfTheBoard
        lastStateOfTheBoard = null
        restoreInitialColorsOfFields()
        $('undoLastMoveLinkId').style.color = 'grey'
        if (savedIdOfPromotionFMoveFROM != null && savedInnerHTMLOfPromotionFMoveFROM != null && (!isCapturedPromotedPiece)) {
            // log(savedInnerHTMLOfPromotionFMoveFROM)
            $(savedIdOfPromotionFMoveFROM).innerHTML = savedInnerHTMLOfPromotionFMoveFROM;
            savedInnerHTMLOfPromotionFMoveFROM = null;
        }
        isUndoNowPossible = false
        savedIdOfPromotionFMoveFROM = null
        savedIdOfPromotionFMoveTO = null

        // if (lastClickedTD != null) {
        //     lastClickedTD.style.backgroundColor = lastClickedTDSavedColor
        //     log(454545)
        // }
    }
}

// function restoreInitialColorsOfFields() {
//     lastClickedTD = null;
//     lastClickedTDSavedColor = null;
//     clickProcessed = true;
//     for (var key in savedInitialColorsArr) {
//         // console.log(savedInitialColorsArr[key]);
//         $(key).style.backgroundColor = savedInitialColorsArr[key];
//     }
// }

function pawnPromotionTdClickHandler(td) {

    // lastMoveWasPromotion=true;

    restoreInitialColorsOfFields();



    let html = td.innerHTML
    $('promotionSelectId').style.display = 'none';


    // saved_lastClickedTD.innerHTML = html

    // alert(html)

    saved_lastClickedTD.innerHTML = html

    setTimeout(() => {
        savedIdOfPromotionFMoveFROM = saved_lastClickedTD.id
        savedIdOfPromotionFMoveTO = td_in_fieldClickHandler.id

        saved_lastClickedTD.click();
        // td_in_fieldClickHandler.click();
        $(savedIdOfPromotionFMoveTO).click()
        isPromotionSelectMoving = true;

    }, 10);


    // setTimeout(() => {
    //     lastStateOfTheBoard = $('chessBoardId').innerHTML
    //     // alert(445)

    // }, 500);

    // let piece = getColorOfPieceInHtml(html)

    // let saved_lastClickedTD = lastClickedTD;
    let saved_lastClickedTDSavedColor = lastClickedTDSavedColor;

    // setTimeout(() => {
    //     // restoreInitialColorsOfFields();
    //     // saved_lastClickedTD.click();
    //     td_in_fieldClickHandler.click();

    // }, 100);


    // alert( piece)
}

function pawnPromotionTdMouseOverHandler(td) {
    td.style.backgroundColor = COLOR_OF_LAST_MOVE_TO
}

function pawnPromotionTdMouseOutHandler(td) {
    td.style.backgroundColor = COLOR_OF_PAWN_PROMOTION_SELECT
}


