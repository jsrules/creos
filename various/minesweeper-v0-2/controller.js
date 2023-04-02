////////////////////////////////////////////////////////// controller ///////////////////////////////////////////////////////////////////////////////////////////////////////////// 
'use strict';

// alert(554)

function stopEvent(event) {
    if (event.preventDefault != undefined)
        event.preventDefault();
    if (event.stopPropagation != undefined)
        event.stopPropagation();
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


function imgClickHandler(img) {
    // alert(554);
    // img.src = MARKED_SQWARE_IMG;// 'img/marked-square.jpg'

    let id = img.id;
    let x = breakId(id)[0]
    let y = breakId(id)[1]

    if (getFilenameFromURL(img.src) != getFilenameFromURL(START_SQWARE_IMG)) {
        return
    }
    if (isThereAMineAt(x, y)) {
        redrawBoard(false)
        myAlert('BANG !!!')
    } else {  //showing neighbourhood
        // img.src = EMPTY_SQWARE_IMG;
        let numberOfNeighbourhoodMines = findNumberOfNeighbourhoodMines(x, y)
        img.src = EMPTY_SQWARE_WITH_NUMBER_IMG_FIRST_PART + String(numberOfNeighbourhoodMines) + EMPTY_SQWARE_WITH_NUMBER_IMG_LAST_PART;


        if (numberOfNeighbourhoodMines !== 0) {
            return;
        }

        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {

                if (i == 0 && j == 0) {
                    continue;
                }

                try {
                    let currNeighborhoodImgId = createId(x + i, y + j)
                    let currNeighborhoodImg = $(currNeighborhoodImgId)
                    // currNeighborhoodImg.src = START_SQWARE_IMG;
                    // log(getFilenameFromURL(currNeighborhoodImg.src))

                    if (getFilenameFromURL(currNeighborhoodImg.src) == getFilenameFromURL(START_SQWARE_IMG) && (!isThereAMineAt(x + i, y + j))) {
                        // currNeighborhoodImg.click();
                        setTimeout(() => {
                            currNeighborhoodImg.click();
                        }, 1);
                    }


                    // var currValue = modelArr[modelArrWidth + i][modelArrHeight + j]
                } catch (error) {
                    // log('EXCEPTION!! : ' + error)
                }

                // total += (!isNaN(currValue) ? currValue : 0);
            }
        }
    }

    // let nGumberOfNeighbourhoodMines = findNumberOfNeighbourhoodMines(x, y)
    // alert(numberOfNeighbourhoodMines)

}

function documentDoubleClick(e) {
    // alert(554);
    // img.src = MARKED_SQWARE_IMG;// 'img/marked-square.jpg'
    alert(e)
}

