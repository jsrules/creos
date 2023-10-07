////////////////////////////////////////////////////////// view ///////////////////////////////////////////////////////////////////////////////////////////////////////////// 
'use strict';


function draw() {

    
const MAX_HUE = 360;
const STEP = MAX_HUE/END_Y
l(STEP)

    let currH = 0;
    for (let index = 0; index < END_Y; index+=1) {
        let x = currX  //randomInteger(0, END_X-1)
        let y = index //randomInteger(0, END_Y-1)
        let alfa = 255
        // dot(x, y, currH, 0, 0, alfa)
        dotHSL(x, y, currH)
        currH = currH < MAX_HUE ? currH + STEP : 0;
    }

    if (currX < END_X) {
        currX++
    } else {
        isOver = true
        currX = 0
        // currGreen = 255
    }

    return

    // l(currRGBcolor--)








    // debugger

    // for (let thisTime = 0; thisTime < 500; thisTime++) {


    //rgb rbg grb gbr bgr brg 
    //rrb rrg grr brr rbr rgr
    //ggb ggr bgg rgg gbg grg
    //bbg bbr gbb rbb brb bgb
    //rrr ggg bbb

    for (let index = 0; index < END_Y; index++) {

        let currRGBcolorStr = decimalToCOLORHexString(Math.round(currRGBcolor))
        let rgbArr = hexToRgb(currRGBcolorStr);
        let r = rgbArr.b//randomInteger(0, 255)
        let g = rgbArr.b //currGreen + 1 //  currGreen < 255 ? currGreen + 1 : 0  //randomInteger(0, 255)  //randomInteger(0, 255)
        let b = rgbArr.b//randomInteger(0, 255)
        let alfa = 255
        l(currRGBcolor + '=' + currRGBcolorStr)
        l(currRGBcolorStr)
        l(r + ',' + g + ',' + b)

        let x = currX  //randomInteger(0, END_X-1)
        let y = index //randomInteger(0, END_Y-1)
        dot(x, y, r, g, b, alfa)

        currRGBcolor = currRGBcolor - 1 // (MAX_HTML_COLOR / END_X)

        // if (currRGBcolor < (999/1000) *  MAX_HTML_COLOR  ) {
        //     alert('Done')
        //     isOver = true
        //     return
        // }
    }
    // }




    // currRGBcolor = currRGBcolor - (MAX_HTML_COLOR / END_X)
    // currGRAYcolor = currGRAYcolor - (255 / END_X)

    if (currX < END_X) {
        currX++
    } else {
        isOver = true
        currX = 0
        // currGreen = 255
    }
    // currX = currX < END_X ? currX + 1 : 0

    // verticalLine(currX, 0, END_Y, r, g, b, alfa);
    // verticalLine(0, 0, END_Y, r, g, b, alfa);
    // verticalLine(END_X, 0, END_Y, r, g, b, alfa);
    // horizontalLine(10, END_X - 10, 10, r, g, b, alfa)


    // for (let x = 0; x < img1picWidth / 1; x++) {
    //     // saved[x] = []
    //     // img1pic += '['
    //     for (let y = 0; y < img1picHeight / 1; y++) {
    //         // const element = array[index];
    //         //   const data = context.getImageData(x, y, 1, 1).data;
    //         const RED = img1pic[x][y][0]
    //         const GREEN = img1pic[x][y][1]
    //         const BLUE = img1pic[x][y][2]
    //         const ALPHA = 255//data[3]

    //         let r = RED
    //         let g = GREEN
    //         let b = BLUE

    //         dot(x, y, r, g, b, alfa) 

    //         //   saved[x][y] = [r, g, b]
    //         //   img1pic += '[' + r + ',' + g + ',' + b + '],';

    //     }
    //     // img1pic += '],'
    // }
    // //   img1pic += ']'


    return

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

