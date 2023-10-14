////////////////////////////////////////////////////////// output ///////////////////////////////////////////////////////////////////////////////////////////////////////////// 
'use strict';

/////////////////////////////////////////////////////  
//solution from https://stackoverflow.com/questions/4899799/whats-the-best-way-to-set-a-single-pixel-in-an-html5-canvas
function dot(x, y, r, g, b, alfa) {
    ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + (alfa / 255) + ")";
    ctx.fillRect(x, y, 1, 1);
}

/////////////////////////////////////////////////////  
//solution from https://stackoverflow.com/questions/4899799/whats-the-best-way-to-set-a-single-pixel-in-an-html5-canvas
function dotHSL(x, y, h) {
    ctx.fillStyle = 'hsl('+h+', 100%, 50%)';
    ctx.fillRect(x, y, 1, 1);
}

/////////////////////////////////////////////////////      
function clearCanvas() {
    ctx.clearRect(0, 0, END_X, END_Y);
}