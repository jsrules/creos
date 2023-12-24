function getHTMLStringOfTheBoard() {
    // savedInitialColorsArr = []
    let htmlToAdd = '    <table class="chessboard-table">';
    let imgToDraw = null;
    let gameOverMsg = null;
    let bgColor = null;

    for (let index1 = 0; index1 < FIELD_HEIGHT + 1; index1++) {
        let numberOfRow = (FIELD_HEIGHT - index1)
        htmlToAdd += '  <tr><th> ' + (numberOfRow ? numberOfRow : '') + ' </th>'
        for (let index = 0; index < FIELD_WIDTH; index++) {

            let startTag = ''
            let endTag = ''
            let fieldContent = '';
            let letter = '' + HORIZONTAL_FIELD_LETTERS.charAt(index);

            let id = letter + numberOfRow
            let idStr = 'id="' + id + '"'


            if (index1 < FIELD_HEIGHT) {
                bgColor = getInvertedFieldColor(bgColor);
                startTag = '<td onclick="fieldClickHandler(this)"  ' + idStr + ' style=" background-color: ' + bgColor + '" ' + '>'   // +id
                endTag = '</td>'
                fieldContent = getImgHtml(index1, index)      //'<img src="img/wK.png">';
                // savedInitialColorsArr[id] = bgColor
                // log(savedInitialColorsArr[id] )

            } else {
                startTag = '<th>'
                endTag = '</th>'
                fieldContent = '' + letter //HORIZONTAL_FIELD_LETTERS.charAt(index);
                //  log(7)
            }
            // fieldContent = index > FIELD_HEIGHT ? : ''

            // let idToUse = createId(index, index1)
            htmlToAdd += startTag + fieldContent + endTag
            // '<img id="' + idToUse + '" style="display:inline; Font-Size:0px; Line-Height: 0px; width:30px;height:30px;margin: 0px;  padding: 0px;border: none;" border="0" src="' + imgToDraw +
            //     '" alt="" onClick="imgClickHandler(this)" oncontextmenu="imgRightClickHandler(this)"  role="button"  tabIndex="0" />';

        }


        htmlToAdd += '</tr>'
        bgColor = getInvertedFieldColor(bgColor);
    }
    htmlToAdd += ' </table>'
    // $('fieldDivId').innerHTML = htmlToAdd
    // gameOverMsg && myAlert(gameOverMsg)

    // log(htmlToAdd)
    return htmlToAdd
}

function getInvertedFieldColor(bgColor) {
    return bgColor != FIRST_LEFT_UPPER_FIELD_COLOR ? FIRST_LEFT_UPPER_FIELD_COLOR : OPPOSING_LEFT_UPPER_FIELD_COLOR;
}

function getImgHtml(number, letter) {
    if (currentModel.boardArr[number][letter] == EMPTY) {
        return EMPTY_STR
    }
    let piece = currentModel.boardArr[number][letter].type
    let color = currentModel.boardArr[number][letter].color ? 'w' : 'b'

    log(currentModel.boardArr[number][letter].color)

    return '<img src="img/' + color + piece + '.png">';


    // let pieceImgSrc = null;
    // switch (piece) {
    //     case KING: pieceImgSrc =
    //     log(55555555555555555555555555555555555)
    //     return '<img src="img/bK.png">'

    //         break;
    //     case QUEEN: putPieceOn(new Q(color), index1, index);
    //         break;
    //     case ROOK: putPieceOn(new R(color), index1, index);
    //         break;
    //     case BISHOP: putPieceOn(new B(color), index1, index);
    //         break;
    //     case KNIGHT: putPieceOn(new N(color), index1, index);
    //         break;
    //     case PAWN: putPieceOn(new P(color), index1, index);
    //         break;
    //     default:  return EMPTY_STR//alert('Unknown piece.. in fillModelFtomView()' + piece)

    // }

}