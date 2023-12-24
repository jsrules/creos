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
