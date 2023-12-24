function fieldClickHandler(td) {
    log(td.id)
    if (lastClickTd == null) {
        if (currentModel.getBoardArrElementForThisId(td.id) == EMPTY) {
            return;
        }
        lastClickTd = td
        td.style.backgroundColor = COLOR_OF_LAST_MOVE_FROM
    } else {
        td.style.backgroundColor = COLOR_OF_LAST_MOVE_TO
        log(currentModel.getBoardArrElementForThisId(lastClickTd.id))

        if (currentModel.getBoardArrElementForThisId(lastClickTd.id).color != currentModel.getBoardArrElementForThisId(td.id).color) {
            saveCurrentModel();
            currentModel.putPiece(td.id, currentModel.getBoardArrElementForThisId(lastClickTd.id))
            currentModel.makeFieldEmpty(lastClickTd.id)

            //TODO: pawn promotion for white
            if (currentModel.getBoardArrElementForThisId(td.id).color === WHITE_COLOR && currentModel.getBoardArrElementForThisId(td.id).type === PAWN && td.id.includes('8')) {
                let answer = null;
                do {
                    answer = prompt("Queen {q), Rook (r), Knight (n), Bishop (b) ?").toUpperCase()
                } while (answer != 'Q' && answer != 'R' && answer != 'N' && answer != 'B');
                let piece = eval('new ' + answer + '(WHITE_COLOR)')
                currentModel.putPiece(td.id, piece)
            }


            //TODO: pawn promotion for black
            if (currentModel.getBoardArrElementForThisId(td.id).color === BLACK_COLOR && currentModel.getBoardArrElementForThisId(td.id).type === PAWN && td.id.includes('1')) {
                let answer = null;
                do {
                    answer = prompt("Queen {q), Rook (r), Knight (n), Bishop (b) ?").toUpperCase()
                } while (answer != 'Q' && answer != 'R' && answer != 'N' && answer != 'B');
                let piece = eval('new ' + answer + '(BLACK_COLOR)')
                currentModel.putPiece(td.id, piece)
            }
        }

        updateViewFromModel();
        lastClickTd = null
    }

    // if (lastClickTd == td){
    //     lastClickTd = null
    //     $('chessBoardId').innerHTML = getHTMLStringOfTheBoard()
    // }

}

function undoLastMove() {
    currentModel = savedModels.pop();
    updateViewFromModel();
}


///////////////////////////////////////////////////////// ALL CODE BELOW IS TODO !!!!!!!!!!!!!!!111111111111111111111
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
