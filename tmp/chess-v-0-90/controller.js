function fieldClickHandler(td) {
    log(td.id)


    if (lastClickTd == null) {
        lastClickTd = td
        td.style.backgroundColor = COLOR_OF_LAST_MOVE_FROM
    } else {
        td.style.backgroundColor = COLOR_OF_LAST_MOVE_TO
        log(currentModel.getBoardArrElementForThisId(lastClickTd.id))
        currentModel.putPiece(td.id, currentModel.getBoardArrElementForThisId(lastClickTd.id))
        currentModel.makeFieldEmpty(lastClickTd.id)
        $('chessBoardId').innerHTML = getHTMLStringOfTheBoard()
        lastClickTd = null
    }

    // if (lastClickTd == td){
    //     lastClickTd = null
    //     $('chessBoardId').innerHTML = getHTMLStringOfTheBoard()
    // }

}