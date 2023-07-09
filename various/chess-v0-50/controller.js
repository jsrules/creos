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

    if (lastClickedTD == td) {
        // lastClickedTD.style.backgroundColor = lastClickedTDSavedColor
        restoreInitialColorsOfFields()
        //fillModelFtomView()
        return
    }

    if (lastClickedTD != null) {
        let firstClickTD = lastClickedTD;
        let secondClickTD = td;
        let firstClickTDid = lastClickedTD.id;
        let secondClickTDid = td.id;
        if (makeMoveIfPossible(firstClickTD, secondClickTD)) {
            lastClickedTD = null;
            restoreInitialColorsOfFields();
            redrawViewFromModel()
            return
        } else {
            restoreInitialColorsOfFields();
            lastClickedTD = null;
            return
        }
    }

    if (td.innerHTML == '' && lastClickedTD == null) {
        //fillModelFtomView()
        return;
    }

    let imgNameWhoMovesColor = whoMoves == WHITE ? 'w' : 'b'
    if (getColorOfPieceOnTd(td) != imgNameWhoMovesColor) {
        return;
    }


    td.style.backgroundColor = COLOR_OF_FIELD_WITH_PIECE_TO_MOVE


    lastClickedTD = td

    return

    ///////////////////////////////////////!!!!!!!!!!!!!111111111111111111111111111111111111111111

    // log('in fieldClickHandler()')
    // fillModelFtomView()

    td_in_fieldClickHandler = td;
    saved_lastClickedTD = lastClickedTD;

    let inTheMiddleOfCastle = false;

    if (td.innerHTML == '' && lastClickedTD == null) {
        //fillModelFtomView()
        return;
    }

    if (lastClickedTD == td) {
        // lastClickedTD.style.backgroundColor = lastClickedTDSavedColor
        restoreInitialColorsOfFields()
        //fillModelFtomView()
        return
    } else if (lastClickedTD != null) {




        if ((!POSSIBLE_TO_CAPTURE) && td.innerHTML != '') {
            restoreInitialColorsOfFields()
            //fillModelFtomView()
            return;
        }

        if ((POSSIBLE_TO_CAPTURE) && td.innerHTML != '') {

            let toColor = getColorOfPieceOnTd(td)
            let fromColor = getColorOfPieceOnTd(lastClickedTD)

            // restoreInitialColorsOfFields()
            if (toColor == fromColor) {
                //fillModelFtomView()
                return;
            }
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
    }


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


    // !!!!!!!!!!!!!!!!!!!11111111111111111111111111111111111111111111111111111111111111111111
    return



    let isWhiteKingMoveInProgress = false
    if (lastClickedTD != null && lastClickedTD.innerHTML.includes('wK')) {
        isWhiteKingMoveInProgress = true
    }
    let isBlackKingMoveInProgress = false
    if (lastClickedTD != null && lastClickedTD.innerHTML.includes('bK')) {
        isBlackKingMoveInProgress = true
    }


    // log(td.id)
    if (lastClickedTD == td) {
        // lastClickedTD.style.backgroundColor = lastClickedTDSavedColor
        restoreInitialColorsOfFields()
        //fillModelFtomView()
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
            //fillModelFtomView()
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
            //fillModelFtomView()
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
            //fillModelFtomView()
            return;
        }

        if ((POSSIBLE_TO_CAPTURE) && td.innerHTML != '') {

            let toColor = getColorOfPieceOnTd(td)
            let fromColor = getColorOfPieceOnTd(lastClickedTD)

            // restoreInitialColorsOfFields()
            if (toColor == fromColor) {
                //fillModelFtomView()
                return;
            }
        }

        /***************************    CASTLES POSSIBILITIES REMOVED     *************************************/

        /*
        //castle white short  //TODO: checks empties etc
        if (lastClickedTD.id == 'e1' && td.id == 'g1' && $('f1').innerHTML == '' && $('g1').innerHTML == '' && !didKingMove[0] 
                && !isFieldAttacked('e1') && !isFieldAttacked('f1') && !isFieldAttacked('g1')  ) {

            inTheMiddleOfCastle = true
            $('g1').innerHTML = $('e1').innerHTML
            $('e1').innerHTML = ''
            $('f1').innerHTML = $('h1').innerHTML
            $('h1').innerHTML = ''
            didKingMove[0]=true

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

        */

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
            if (isMovePossible(lastClickedTD, td)) {
                td.innerHTML = lastClickedTD.innerHTML
                // whoMoves = !whoMoves;
                changeWhomovesVar();
                isUndoNowPossible = true
            } else {
                return
            }
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
            changeWhomovesVar();
            inTheMiddleOfCastle = false
            isUndoNowPossible = true
        }

        if (isWhiteKingMoveInProgress) {
            didKingMove[0] = true
        }
        if (isBlackKingMoveInProgress) {
            didKingMove[1] = true
        }

        // log('move over')

        //fillModelFtomView()
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

function changeWhomovesVar() {
    whoMoves = !whoMoves
    $('whoMovesDivIdTextWithBlackOrWhite').style.color = whoMoves == WHITE ? 'grey' : 'black'
    $('whoMovesDivIdTextWithBlackOrWhite').innerHTML = whoMoves == WHITE ? 'White' : 'Black'

}

function documentDoubleClick(e) {
    // alert(554);
    // img.src = MARKED_SQWARE_IMG;// 'img/marked-square.jpg'
    alert(e)
}

function undoLastMove() {

    if (savedHTMLofTheBoard != EMPTY_STR) {
        // l(savedHTMLofTheBoard)
        restoreGlobalVars();
        $('chessBoardId').innerHTML = savedHTMLofTheBoard
        savedHTMLofTheBoard = EMPTY_STR

        setTimeout(() => {
            fillModelFtomView();
            restoreInitialColorsOfFields();
            changeWhomovesVar();
        }, 100);



    } else {
        return
    }

    return
    // alert(undoLastMove)
    // restoreInitialColorsOfFields()
    if (isUndoNowPossible && lastStateOfTheBoard != null) {

        changeWhomovesVar();
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
    isPromotionSelectMoving = true;
    $(savedIdOfPromotionFMoveTO).innerHTML = td.innerHTML;

    setTimeout(() => {
        fillModelFtomView();

    }, 100);

    // alert(html)
    return


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

function pawnPromotionTdMouseOverHandler(td) {
    td.style.backgroundColor = COLOR_OF_LAST_MOVE_TO
}



function isMovePossible(tdFrom, tdTo) {
    fillModelFtomView()
    let tdIdFrom = tdFrom.id;
    log('!!!!!!!!!!!!1111111111 tdIdFrom:' + tdIdFrom)
    let tdIdTo = tdTo.id;
    log('!!!!!!!!!!!!1111111111 tdIdFrom:' + tdIdTo)


    // let tdFrom = $(tdIdFrom)
    // let tdTo = $(tdIdTo)

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
    log(piece)
    let possibleMovesOnEmptyBoard = piece.getAllPOSSIBLEMovesOnREALBoard();         //getAllPossibleMovesOnEmptyBoard()
    log(possibleMovesOnEmptyBoard.length)

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
            restore()
            return true
        }
        else {
            log('CHECK!! ACTIALLY _NOT_ possible!..')
            restore()
            return false
        }
    }
    else {
        log('impossible..')
        return false;
    }

    //TODO:
    //dbl click == alert + e6 file blue !!!!!!!!!!!1111111111
    //-CHECK opponent's pieces if they ain't fight that field
    //-king capturing other king
    //-king capturing other pieces
    //-castles
    //-other pieces..
    //etc

    // for (let index1 = 0; index1 < BOARD_SIZE; index1++) {
    //     for (let index = 0; index < BOARD_SIZE; index++) {

    //         log(index+';'+index1);
    //         log(chessBoardArray[index1][index]);
    //         continue;

    //         let letter = getLetterOnTheRealBoardFromLetterNumber(index); //HORIZONTAL_FIELD_LETTERS.charAt(BOARD_SIZE - index1 -1)       
    //         let number = getNumberOnTheRealBoardFromNumber(index1)                 //"" + (index + 1)  
    //         // log(number)
    //         let currFieldName = letter + number;
    //         log(index1 + ';' + index + '=' + currFieldName)
    //         // boardArr[index][index1] = $(currFieldName)
    //         let currFieldContent = $(currFieldName).innerHTML;

    //         if (currFieldContent == EMPTY_STR) {
    //             continue;
    //         }

    //         let color = getColorOfPieceInHtml(currFieldContent) == 'w' ? WHITE_COLOR : BLACK_COLOR;
    //         let piece = getPieceInHtml(currFieldContent)
    //         switch (piece) {
    //             case KING: putPieceOn(new K(color), index1, index);
    //                 break;
    //             case QUEEN: putPieceOn(new Q(color), index1, index);
    //                 break;
    //             default: alert('Unknown piece.. in fillModelFtomView()')

    //         }
    //         log(currFieldContent + color)
    //         // boardArr[index][index1] =  lem
    //     }
    // }


    //TODO: !!!!!!!!!!!!!!!!1111111111111111111111
    // return true;
}

