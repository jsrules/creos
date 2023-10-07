////////////////////////////////////////////////////////// 2d ///////////////////////////////////////////////////////////////////////////////////////////////////////////// 
'use strict';

/////////////////////////////////////////////////////  
function line(x1, y1, x2, y2, r, g, b, alfa) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    let tan = dy / dx;
    let iterateOverX = Math.abs(tan) > 0.5;
    if (y1 == y2) {
        horizontalLine(x1, x2, y1, r, g, b, alfa);
        return;
    }
    if (x1 == x2) {
        verticalLine(x1, y1, y2, r, g, b, alfa);
        return;
    }
    if (iterateOverX && x2 < x1) {
        line(x2, y2, x1, y1, r, g, b, alfa);
        return;
    }
    if ((!iterateOverX) && y2 < y1) {
        line(x2, y2, x1, y1, r, g, b, alfa);
        return;
    }
    let ctan = dx / dy;
    let alfaCorner = Math.atan(tan);
    let betaCorner = (Math.PI / 2) - alfaCorner;
    let deltaXinTheLoop = .05;
    let lastY = null;
    let lastX = null;
    let setOfUsedY = new Set();

    if (iterateOverX)
        for (let index = x1; index < x2; index += deltaXinTheLoop) {
            const currX = index;
            //strictly dfiagonal:
            // dot(currX, currX, r, g, b, alfa);

            //arbitrary:
            // let currY = Math.round (y1 + ((Math.sin(alfaCorner) * (currX - x1)) / Math.sin(betaCorner)))         //Math.round  -NO BRCKTS !!
            // let currY = Math.round (y1 + ((Math.tan(alfaCorner) * (currX - x1)) )) 
            let currY = Math.round(y1 + ((tan * (currX - x1))))


            let deltaY = lastY == null ? 0 : Math.abs(currY - lastY);
            // if (deltaY > 1) {
            //     deltaXinTheLoop *= 0.01;
            // }
            if (true && !setOfUsedY.has(currY)) {
                dot(currX, currY, r, g, b, alfa);
                setOfUsedY.add(currY);
                // log(tan + '--' + currY)
            } else {
                // log("else")
            }
            lastY = currY;
        }

    if (!iterateOverX) {
        for (let index = y1; index < y2; index += deltaXinTheLoop) {
            const currY = index;
            //strictly dfiagonal:
            // dot(currX, currX, r, g, b, alfa);

            //arbitrary:
            // let currY = Math.round (y1 + ((Math.sin(alfaCorner) * (currX - x1)) / Math.sin(betaCorner)))         //Math.round  -NO BRCKTS !!
            // let currY = Math.round (y1 + ((Math.tan(alfaCorner) * (currX - x1)) )) 
            // let currY = y1 + tan * currX - tan * x1

            // let currY = y1 + ((tan * (currX - x1)))
            // currX = Math.round((y1 - currY - (tan * x1)) / tan)
            // let currY = Math.round(y1 + ((tan * (currX - x1))))
            let currX = Math.round(x1 + (ctan * (currY - y1)))

            let deltaX = lastX == null ? 0 : Math.abs(currX - lastX);
            // if (deltaY > 1) {
            //     deltaXinTheLoop *= 0.01;
            // }
            if (true && !setOfUsedY.has(currX)) {
                dot(currX, currY, r, g, b, alfa);
                setOfUsedY.add(currX);
                // log(tan + '--' + currX)
            } else {
                // log("else")
            }
            lastX = currX;
        }
        // log('done iterateOverY')
    }
}



/////////////////////////////////////////////////////  
function horizontalLine(x1, x2, y, r, g, b, alfa) {
    for (let index = x1; index <= x2; index++) {
        const currX = index;
        // putPixel(currX,  (((k * currX) + b)))  // add  var "b" (kx+b)
        dot(currX, y, r, g, b, alfa)
    }
}

/////////////////////////////////////////////////////  
function verticalLine(x, y1, y2, r, g, b, alfa) {
    for (let index = y1; index <= y2; index++) {
        const currY = index;
        // putPixel(currX,  (((k * currX) + b)))  // add  var "b" (kx+b)
        dot(x, currY, r, g, b, alfa)
    }
}

/////////////////////////////////////////////////////   
function putLineStandard(x1, y1, x2, y2) {
    ctx.lineWidth = 1;
    ctx.moveTo(x1, y1);    // Передвигает перо в точку (30, 50)
    ctx.lineTo(x2, y2);  // Рисует линию до точки (150, 100)
    ctx.strokeStyle = '#000000';   //randShadeOfRed(); // DEFAULT_COLOR;
    ctx.stroke();
}

/////////////////////////////////////////////////////   
function circleStandard(centerX, centerY, radius) {
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle =randColor() ;
    ctx.stroke();
    // ctx.lineWidth = 1;
    // ctx.moveTo(x1, y1);    // Передвигает перо в точку (30, 50)
    // ctx.lineTo(x2, y2);  // Рисует линию до точки (150, 100)
    // ctx.strokeStyle = '#000000';   //randShadeOfRed(); // DEFAULT_COLOR;
    // ctx.stroke();
}