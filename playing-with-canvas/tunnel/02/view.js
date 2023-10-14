////////////////////////////////////////////////////////// view ///////////////////////////////////////////////////////////////////////////////////////////////////////////// 
'use strict';



// l(7777777)

/////////////////////////////////////////////////////    
function getWidth() {
    return END_X;
};

/////////////////////////////////////////////////////    
function getHeight() {
    return END_Y;
};

/////////////////////////////////////////////////////    
function getHalfWidth() {
    return parseInt(getWidth() / 2);
};

/////////////////////////////////////////////////////    
function getHalfHeight() {
    return parseInt(getHeight() / 2);
};

/////////////////////////////////////////////////////    
function polarCoordsCalculateX(r, fita) {
    return r * Math.cos(fita);
};

/////////////////////////////////////////////////////    
function polarCoordsCalculateY(r, fita) {
    return r * Math.sin(fita);
};

///////////////////////////////////////////////////// 
//shortcut for Math.floor(n)       
function fl(n) {
    return Math.floor(n);
}


function draw() {
    let R = 10;
    const STEP_POLAR_COORDINATES =  .0025; //  VERY IMPORTAN CONST - FOR POLAR COORDS
    //  -- DEFINED AS GLOBAL VAR
    let N = 3;  // -- DEFINED AS GLOBAL VAR
    let coef_1 = 10;
    let tmp = 0;
    // const b = 60 * coef_1;


    let r = randomInteger(0,255);
    let g = randomInteger(0,255);
    let b = randomInteger(0,255);

    for (let f = -2 * Math.PI; f <= 1 * Math.PI; f += STEP_POLAR_COORDINATES /* +coef_1 */) {  //0

        tmp = f;


        //circle v1: 
        // putPixel( polarCoordsCalculateX(R, f) + getHalfWidth(),  /* coef_1*  */   polarCoordsCalculateY(R, f)  + getHalfHeight()  , /* color: */ 67, 29 ,40 );

        //pascal's lamicon:
        // let R = b + Math.cos(f);

        //Rose
        // let R =   b*( Math.sin((rose_n_value/rose_d_value)*f) );

        //RegularPolygon:  (solution from http://stob2.narod.ru/27s.htm )

        // let L = 400;  -- DEFINED AS GLOBAL VAR
        //  let N=8;  -- DEFINED AS GLOBAL VAR

        let R = L / Math.cos(2 * (Math.PI / N) * ((0.5 * fl(N * f / Math.PI)) - fl(0.5 * fl(N * f / Math.PI))) - f + ((Math.PI / N) * fl(N * f / Math.PI)));



        dot(polarCoordsCalculateX(R, f) + getHalfWidth(),  /* coef_1*  */   polarCoordsCalculateY(R, f) + getHalfHeight(), /* color: */ r,g,b,255);



        // putBoldPixel( getX(polarCoordsCalculateX(R, f)),  /* coef_1*  */   getY(polarCoordsCalculateY(R, f))    , /* color: */ 67, 29 ,40 );

    }   // for (let f = 0; f < 2*Math.PI; f+=STEP_POLAR_COORDINATES /* +coef_1 */) { 
        L++;

    return

    // let x1 = 0
    // let y1 = 0
    // let x2 = 700
    // let y2 = 700
    // let r = 0
    // let g = 0
    // let b = 0
    // let alfa = 255
    // line(x1, y1, x2, y2, r, g, b, alfa)

    // const DELTA = 50
    // x1+=DELTA
    // // y1+=DELTA
    // // x2+=DELTA
    // // y2+=DELTA
    // line(x1, y1, x2, y2, r, g, b, alfa)

    // x1-=DELTA*2
    // // line(x1, y1, x2, y2, r, g, b, alfa)
    // putLineStandard(x1, y1, x2, y2) 
    // return

    const MAX_HUE = 360;
    const STEP = 10; //  MAX_HUE/END_Y 

    // l(66)
    circleStandardNOTFilled(
        END_X / 2,
        END_Y,
        R,
        //  randColor()
        "hsl(" + currX + "deg 100% 50%)")

    if (currX < END_X / 2) {
        R++
        currX++
        currHue += STEP;
    } else {
        isOver = true
        currX = 0
        // currGreen = 255
    }


    //  if (currH < MAX_HUE ){
    //     if (randomInteger(0,100)>98){
    //         SIGN*=-1
    //     }
    //     currH =  currH + ( SIGN * STEP )
    // } else{
    //     currH =  0;
    //     // SIGN*=-1
    // }

    return

    // const MAX_HUE = 360;
    // const STEP = 1; // MAX_HUE/END_Y
    // l(STEP)

    let currH = MAX_HUE;
    let SIGN = 1;  //randomBoolean() ? 1 : -1;
    for (let index = 0; index < END_Y; index += 1) {
        let x = currX  //randomInteger(0, END_X-1)
        let y = index //randomInteger(0, END_Y-1)
        let alfa = 255
        // dot(x, y, currH, 0, 0, alfa)
        dotHSL(x, y, currH)
        // currH = currH < MAX_HUE ? currH - SIGN * STEP  : 0;

        if (currH < MAX_HUE) {
            if (randomInteger(0, 100) > 98) {
                SIGN *= -1
            }
            currH = currH + (SIGN * STEP)
        } else {
            currH = 0;
            // SIGN*=-1
        }

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

