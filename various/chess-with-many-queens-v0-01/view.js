////////////////////////////////////////////////////////// view ///////////////////////////////////////////////////////////////////////////////////////////////////////////// 
'use strict';

function setDefaultColorsOnAllBoard() {
    //TODO
}

/////////////////////////////////////////////////////
function myAlert(s) {
    setTimeout("alert('" + s + "')", 200);
}

/////////////////////////////////////////////////////
function myAlertAndReloadThePage(s) {
    setTimeout("alert('" + s + "');  location.reload();", 200);
}

/////////////////////////////////////////////////////
//gets 1 and 3 and returns string "1,3"
function createId(first, second) {
    return first + second;
}

/////////////////////////////////////////////////////
//gets string like "1,3" and returns array [1,3]
function breakId(id) {
    var pos = id.indexOf(COMMA);
    return [parseInt(id.slice(0, pos)), parseInt(id.slice(pos + 1, id.length))];
}

function redrawMinesLeft() {
    $('spanWithNumberOfminesLeftId').innerHTML = minesLeft;
}

// function redrawBoard(isStart) {
//     let htmlToAdd = '';
//     let imgToDraw = null;
//     let gameOverMsg = null;

//     for (let index1 = 0; index1 < FIELD_HEIGHT; index1++) {

//         for (let index = 0; index < FIELD_WIDTH; index++) {

//             if (isStart) {
//                 imgToDraw = START_SQWARE_IMG
//             }
//             else {
//                 let numberOfNeighbourhoodMines = findNumberOfNeighbourhoodMines(index, index1)
//                 let imgToUse = EMPTY_SQWARE_WITH_NUMBER_IMG_FIRST_PART + String(numberOfNeighbourhoodMines) + EMPTY_SQWARE_WITH_NUMBER_IMG_LAST_PART;
//                 imgToDraw = modelArr[index][index1] == 0 ? imgToUse : MINE_SQWARE_IMG;
//                 if (isGameOver) {
//                     gameOverMsg != 'Fail' && (gameOverMsg = 'Success!!! Congrats, you won.')
//                     let imgOnTheExistingBoard = $(createId(index, index1))
//                     if (getFilenameFromURL(imgOnTheExistingBoard.src) == getFilenameFromURL(MARKED_SQWARE_IMG) && !isThereAMineAt(index, index1)) {
//                         imgToDraw = FALSELY_MARKED_SQWARE_IMG;
//                         gameOverMsg = 'Fail'
//                     }
//                 }
//             }

//             let idToUse = createId(index, index1)
//             htmlToAdd += '<img id="' + idToUse + '" style="display:inline; Font-Size:0px; Line-Height: 0px; width:30px;height:30px;margin: 0px;  padding: 0px;border: none;" border="0" src="' + imgToDraw +
//                 '" alt="" onClick="imgClickHandler(this)" oncontextmenu="imgRightClickHandler(this)"  role="button"  tabIndex="0" />';

//         }

//         htmlToAdd += '<br>'
//     }
//     $('fieldDivId').innerHTML = htmlToAdd
//     gameOverMsg && myAlert(gameOverMsg)
// }

function getInvertedFieldColor(bgColor) {
    return bgColor != FIRST_LEFT_UPPER_FIELD_COLOR ? FIRST_LEFT_UPPER_FIELD_COLOR : OPPOSING_LEFT_UPPER_FIELD_COLOR;
}

function getHTMLStringOfTheBoar(isStart) {
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
                fieldContent = '';
                savedInitialColorsArr[id] = bgColor
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

function getHTMLStringOfPromotionSelectSUBFUNCTION(color) {

    let htmlToAdd = '<tr id="' + (color == 'w' ? 'promotionSelectIdWHITE' : 'promotionSelectIdBLACK') + '"  >';
    let picesToAdd = ['Q', 'R', 'N', 'B']
    for (let index = 0; index < picesToAdd.length; index++) {
        const element = picesToAdd[index];
        let fileName = color + element + '.png'
        let strToAdd = ' <td style=" cursor: pointer;" onclick="pawnPromotionTdClickHandler(this)" onmouseover="pawnPromotionTdMouseOverHandler(this)" onmouseout="pawnPromotionTdMouseOutHandler(this)"> <img src="img/' + fileName + '"> </td>   '
        // log(strToAdd)
        htmlToAdd += strToAdd
    }
    htmlToAdd += ' </tr>'
    return htmlToAdd
}

function getHTMLStringOfPromotionSelect() {
    // savedInitialColorsArr = []  --  15 mins because of this copypaste !!!!!!!!!!!!!!!!!!!1111111111111
    let htmlToAdd = ' Please select: <table>';
    let imgToDraw = null;
    let gameOverMsg = null;
    let bgColor = null;

    // for (let index1 = 0; index1 < FIELD_HEIGHT + 1; index1++) {

    // htmlToAdd += '</tr>'
    // bgColor = getInvertedFieldColor(bgColor);
    // }


    htmlToAdd += getHTMLStringOfPromotionSelectSUBFUNCTION('w')
    htmlToAdd += getHTMLStringOfPromotionSelectSUBFUNCTION('b')


    htmlToAdd += ' </table>'
    // $('fieldDivId').innerHTML = htmlToAdd
    // gameOverMsg && myAlert(gameOverMsg)

    // log(htmlToAdd)
    return htmlToAdd
}

{/* <table>

<tr>
<td onclick="pawnPromotionTdClickHandler(this)" onmouseover="pawnPromotionTdMouseOverHandler(this)" onmouseout="pawnPromotionTdMouseOutHandler(this)"> <img src="img/wQ.png"> </td>   <td>     <img src="img/wR.png"> </td>   <td>      <img src="img/wB.png">   </td>    <td>   <img src="img/wK.png"> </td> 
</tr>

</table> */}

function putPiece(id, imgSrc) {
    // log(fillStartPosition)
    $(id).innerHTML = '<img src="img/' + imgSrc + '.png">'
}

//this is done in getHTMLStringOfTheBoar() method
function saveInitialColors() {
    // // log(44)
    // let color = savedInitialColorsArr['a1']
    // log(color + '!!!')
    // color = savedInitialColorsArr['a2']
    // log(color + '!!!')
}

function restoreInitialColorsOfFields() {
    // log('in restoreInitialColorsOfFields !!!!!!!!!!111111111')
    lastClickedTD = null;
    lastClickedTDSavedColor = null;
    clickProcessed = true;
    // log(savedInitialColorsArr.length)
    for (var key in savedInitialColorsArr) {
        // log('in loop')
        // console.log(savedInitialColorsArr[key]);
        $(key).style.backgroundColor = savedInitialColorsArr[key];
    }
}

function fillStartPosition() {


    // 00000000000000000000000000000000000000000   CORNERS     000000000000000000000000000000000000000000000000000000000000
    // let shashkaW = 'bP'
    // for (let index = 0; index < 3; index++) {
    //     for (let index2 = 4; index2 < 7; index2++) {
    //         putPiece(HORIZONTAL_FIELD_LETTERS.charAt(index) + '' + (index2 + 2), shashkaW)

    //     }
    // }
    // shashkaW = 'wP'
    // for (let index = 0; index < 3; index++) {
    //     for (let index2 = 4; index2 < 7; index2++) {
    //         putPiece(HORIZONTAL_FIELD_LETTERS.charAt(index + 5) + '' + (index2 + 2 - 5), shashkaW)

    //     }
    // }

    // 00000000000000000000000000000000000000000   CHESS     000000000000000000000000000000000000000000000000000000000000
    // log(fillStartPosition)

    //joke:
    for (let index = 0; index < FIELD_WIDTH; index++) {
        // putPiece(HORIZONTAL_FIELD_LETTERS.charAt(index) + '7', 'bQ')
        putPiece(HORIZONTAL_FIELD_LETTERS.charAt(index) + '8', 'bQ')

        // putPiece(HORIZONTAL_FIELD_LETTERS.charAt(index) + '6', 'bP')
        // putPiece(HORIZONTAL_FIELD_LETTERS.charAt(index) + '5', 'bP')

        // putPiece(HORIZONTAL_FIELD_LETTERS.charAt(index) + '2', 'wQ')
        putPiece(HORIZONTAL_FIELD_LETTERS.charAt(index) + '1', 'wQ')

        // putPiece(HORIZONTAL_FIELD_LETTERS.charAt(index) + '3', 'wP')
        // putPiece(HORIZONTAL_FIELD_LETTERS.charAt(index) + '4', 'wP')
    }


    //ROOKS
    // putPiece('a1', 'wR')
    // putPiece('h1', 'wR')
    // putPiece('a8', 'bR')
    // putPiece('h8', 'bR')

    // //KNIGHTS
    // putPiece('b1', 'wN')
    // putPiece('g1', 'wN')
    // putPiece('b8', 'bN')
    // putPiece('g8', 'bN')

    // //BISHOPS
    // putPiece('c1', 'wB')
    // putPiece('f1', 'wB')
    // putPiece('c8', 'bB')
    // putPiece('f8', 'bB')

    // //KINGS & QUEENS:
    putPiece('e1', 'wK')
    // putPiece('d1', 'wQ')
    putPiece('e8', 'bK')
    // putPiece('d8', 'bQ')

    /*
    //PAWNS:
    for (let index = 0; index < FIELD_WIDTH; index++) {
        putPiece(HORIZONTAL_FIELD_LETTERS.charAt(index) + '7', 'bP')
        // putPiece(HORIZONTAL_FIELD_LETTERS.charAt(index) + '6', 'bP')
        // putPiece(HORIZONTAL_FIELD_LETTERS.charAt(index) + '5', 'bP')

        putPiece(HORIZONTAL_FIELD_LETTERS.charAt(index) + '2', 'wP')
        // putPiece(HORIZONTAL_FIELD_LETTERS.charAt(index) + '3', 'wP')
        // putPiece(HORIZONTAL_FIELD_LETTERS.charAt(index) + '4', 'wP')
    }


    
   */


    //delme:
    // putPiece('e5', 'wR')

    // putPiece('e5', 'wP')
    // putPiece('d5', 'bP')

    // putPiece('g4', 'wP')
    // putPiece('h4', 'bP')



    /*

    //joke with kings:
    for (let index = 0; index < FIELD_WIDTH; index++) {
        putPiece(HORIZONTAL_FIELD_LETTERS.charAt(index) + '8', 'bK')
        putPiece(HORIZONTAL_FIELD_LETTERS.charAt(index) + '7', 'bK')
        putPiece(HORIZONTAL_FIELD_LETTERS.charAt(index) + '6', 'bK')

        putPiece(HORIZONTAL_FIELD_LETTERS.charAt(index) + '3', 'wK')
        putPiece(HORIZONTAL_FIELD_LETTERS.charAt(index) + '2', 'wK')
        putPiece(HORIZONTAL_FIELD_LETTERS.charAt(index) + '1', 'wK')


    }

*/

    /*
        //joke with queens:
        for (let index = 0; index < FIELD_WIDTH; index++) {
            putPiece(HORIZONTAL_FIELD_LETTERS.charAt(index) + '8', 'bQ')
            putPiece(HORIZONTAL_FIELD_LETTERS.charAt(index) + '7', 'bQ')
            putPiece(HORIZONTAL_FIELD_LETTERS.charAt(index) + '6', 'bQ')
    
            putPiece(HORIZONTAL_FIELD_LETTERS.charAt(index) + '3', 'wQ')
            putPiece(HORIZONTAL_FIELD_LETTERS.charAt(index) + '2', 'wQ')
            putPiece(HORIZONTAL_FIELD_LETTERS.charAt(index) + '1', 'wQ')
    
    
        }
    */

    /*
//joke with rooks:
for (let index = 0; index < FIELD_WIDTH; index++) {
    putPiece(HORIZONTAL_FIELD_LETTERS.charAt(index) + '8', 'bR')
    putPiece(HORIZONTAL_FIELD_LETTERS.charAt(index) + '7', 'bR')
    putPiece(HORIZONTAL_FIELD_LETTERS.charAt(index) + '6', 'bR')

    putPiece(HORIZONTAL_FIELD_LETTERS.charAt(index) + '3', 'wR')
    putPiece(HORIZONTAL_FIELD_LETTERS.charAt(index) + '2', 'wR')
    putPiece(HORIZONTAL_FIELD_LETTERS.charAt(index) + '1', 'wR')
}
*/

    /*
        //joke with BISHOPS:
        for (let index = 0; index < FIELD_WIDTH; index++) {
            putPiece(HORIZONTAL_FIELD_LETTERS.charAt(index) + '8', 'bB')
            putPiece(HORIZONTAL_FIELD_LETTERS.charAt(index) + '7', 'bB')
            putPiece(HORIZONTAL_FIELD_LETTERS.charAt(index) + '6', 'bB')
    
            putPiece(HORIZONTAL_FIELD_LETTERS.charAt(index) + '3', 'wB')
            putPiece(HORIZONTAL_FIELD_LETTERS.charAt(index) + '2', 'wB')
            putPiece(HORIZONTAL_FIELD_LETTERS.charAt(index) + '1', 'wB')
         }
        */

         /*
    //joke with knights:
    for (let index = 0; index < FIELD_WIDTH; index++) {
        putPiece(HORIZONTAL_FIELD_LETTERS.charAt(index) + '8', 'bN')
        putPiece(HORIZONTAL_FIELD_LETTERS.charAt(index) + '7', 'bN')
        putPiece(HORIZONTAL_FIELD_LETTERS.charAt(index) + '6', 'bN')

        putPiece(HORIZONTAL_FIELD_LETTERS.charAt(index) + '3', 'wN')
        putPiece(HORIZONTAL_FIELD_LETTERS.charAt(index) + '2', 'wN')
        putPiece(HORIZONTAL_FIELD_LETTERS.charAt(index) + '1', 'wN')
    }
    */

    // putPiece('a1', 'bK')
    // putPiece('a3', 'wK')
    // putPiece('b3', 'wQ')
    // putPiece('b1', 'bQ')


    /*

    //2 queens and many kings:
    putPiece('e4', 'wQ')
    putPiece('e4', 'wR')
    putPiece('h5', 'bR')
    putPiece('a5', 'bQ')

    putPiece('e5', 'wN')


    putPiece('c4', 'wB')
    putPiece('f4', 'wB')
    putPiece('a4', 'bB')
    putPiece('h4', 'bB')


    putPiece('e2', 'wK')
    putPiece('c2', 'wK')
    putPiece('g2', 'wK')
    putPiece('d4', 'wK')
    putPiece('g4', 'wQ')
    putPiece('b7', 'wK')
    putPiece('g6', 'bK')
    */





    fillModelFtomView()   //WORKH

}



function draw() {
    // return

    // alert(5)
    // $('fieldDivId').innerHTML ='fieldDivId !!!1111' + new Date()


    // alert( $('fieldDivId').innerHTML )

    redrawBoard(true)
    return;

    // let r = 0//randomInteger(0, 255)
    // let g = 0// randomInteger(0, 255)
    // let b = 0//randomInteger(0, 255)
    // let alfa = 255


    currX = currX < END_X ? currX + 1 : 0;
    // currY = currY < END_Y ? currY + 1 : 0;
    currR = currR < 255 ? currR + 1 : 0;


    let r = 255 // randomInteger(0, 255)
    let g = 255 //randomInteger(0, 255)  //randomInteger(0, 255)
    let b = randomInteger(0, 255)
    let alfa = 255

    verticalLine(currX, 0, END_Y, r, g, b, alfa);
    // horizontalLine(0, END_X, currY, r, g, b, alfa);


    // //copypasted from verticalLine()
    // for (let index = 0; index <= END_X; index++) {
    //     const currX = index;
    //     // putPixel(currX,  (((k * currX) + b)))  // add  var "b" (kx+b)
    //     let r = randomInteger(0, 255)
    //     let g = randomInteger(0, 255)
    //     let b = randomInteger(0, 255)
    //     dot(currX, currY, r, g, b, alfa)
    // }



    // // hor:
    // line(0, 100, END_X, 50, r, g, b, alfa)
    // line(0, 100, END_X, 100, r, g, b, alfa)
    // line(0, 100, END_X, 250, r, g, b, alfa)
    // line(0, 100, END_X, 270, r, g, b, alfa)
    // line(0, 100, END_X, 300, r, g, b, alfa)
    // line(0, 100, END_X, 150, r, g, b, alfa)
    // line(0, 100, END_X, 25, r, g, b, alfa)
    // line(0, 100, END_X, 50, r, g, b, alfa)
    // line(0, 100, END_X, 0, r, g, b, alfa)

    // // vert:
    // line(100, 0, 100, END_Y, r, g, b, alfa)
    // line(100, 0, 200, END_Y, r, g, b, alfa)



    //RAMKA:
    // horizontalLine(10, END_X - 10, 10, r, g, b, alfa)
    // horizontalLine(10, END_X - 10, END_Y-10, r, g, b, alfa)
    // verticalLine(END_X-10, 10, END_Y-10,  r, g, b, alfa)
    // verticalLine(10, 10, END_Y-10,  r, g, b, alfa)


}