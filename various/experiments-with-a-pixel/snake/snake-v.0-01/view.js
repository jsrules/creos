////////////////////////////////////////////////////////// view ///////////////////////////////////////////////////////////////////////////////////////////////////////////// 
'use strict';

function redraw() {


    // putBoldPixel(100, 100, 255, 0, 0, 255);
    // alert(55)
    // return

    let r = 0//randomInteger(0, 255)
    let g = 0// randomInteger(0, 255)
    let b = 0//randomInteger(0, 255)
    let alfa = 255
    //    line(0, 100, END_X, 0, r, g, b, alfa)


    // r = randomInteger(0, 255)
    // g = randomInteger(0, 255)
    // b = randomInteger(0, 255)


    // hor:
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

    putBoldPixel(currX, currY, 255, 0, 0, 255)



    //RAMKA:
    // horizontalLine(10, END_X - 10, 10, r, g, b, alfa)
    // horizontalLine(10, END_X - 10, END_Y-10, r, g, b, alfa)
    // verticalLine(END_X-10, 10, END_Y-10,  r, g, b, alfa)
    // verticalLine(10, 10, END_Y-10,  r, g, b, alfa)


    // for (let x = 0; x < END_X; x++) {
    //     let r = randomInteger(0, 255)
    //     let g = randomInteger(0, 255)
    //     let b = randomInteger(0, 255)
    //     let alfa = 255
    //     for (let y = 0; y < END_Y; y++) {
    //         dot(x, y, r, g, b, alfa)
    //     }
    // }
}