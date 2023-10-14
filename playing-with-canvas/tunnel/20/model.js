////////////////////////////////////////////////////////// model ///////////////////////////////////////////////////////////////////////////////////////////////////////////// 
'use strict';

function initModel() {


}

///////////////////////////////////////////////////// 
//from https://stackoverflow.com/questions/60142547/i-need-help-using-recursion-to-navigate-every-element-in-the-dom
// Call with a document or HTML element
function checkBodyElements(node) {

    // Recursive function
    function traverseBody(node) {

        let result = '';

        if (node.childNodes.length) {

            // Loop over every child node
            node.childNodes.forEach(child => {

                if (child.tagName == 'BR') {
                    result += '\n'
                }

                // If it's a type 1, call the function recursively
                if (child.nodeType == 1) {
                    console.log('/' + child.tagName + '/', child.nodeType)

                    if (child.tagName == 'H1') {
                        // alert(55)
                        result += 'BIG: ' + child.innerHTML;   //WORKHERR !!!!!!!!!!!!!!!1111111111111
                    }

                    traverseBody(child);
                } else {
                    if (child.nodeName == '#text') {
                        result += 'norm: ' + child.nodeValue;
                    }
                    // debugger
                    // l(child.tagName)
                    // l(child.nodeType)
                    // l(child)
                }
            });
        }


        // alert(result)

        return result;
    }

    // Get the body element      
    let body = node.querySelector('body');

    let result = '';

    // If a body element was found, traverse its children
    if (body) {
        result = traverseBody(body);
    }

    return result;
}


/////////////////////////////////////////////////////
function render() {
    let bodyInnerHTML = document.body.innerHTML;


    bodyInnerHTML = checkBodyElements(document);

    //remove all SCRIPT tags with their content:
    bodyInnerHTML = bodyInnerHTML.replace(/<script>.*<.script>/, '')
    document.body.innerHTML = '';  //I highly doubt that.. Maybe find all bbody's children and makw them display:none
    // alert(bodyInnerHTML)
    document.write(' <canvas id="canvas">');
    canvas = $('canvas');
    ctx = canvas.getContext('2d');
    // alert(ctx)
    END_X = parseInt(canvas.width = document.body.clientWidth) /*    *WORKAREA_ZOOM    */;
    END_Y = parseInt(canvas.height = document.body.clientHeight) /*    *WORKAREA_ZOOM    */;
    // alert(END_X)

    ////////////////OPENING STUFF:
    let cw = canvas.width;
    let ch = canvas.height;
    let id = ctx.getImageData(0, 0, 1, 1);
    //  ctx.clearRect(0, 0, cw, ch);
    id.data[3] = 255;
    ctx.beginPath();

    ////////////////////////////// DRAWING:
    let x1 = 0;
    let y1 = 0;
    let x2 = 100;
    let y2 = 100;
    ctx.moveTo(x1, y1);    // Передвигает перо в точку (30, 50)
    ctx.lineTo(x2, y2);  // Рисует линию до точки (150, 100)
    ctx.strokeStyle = '#ff0000'; // DEFAULT_COLOR;
    ctx.stroke();          // Отображает путь

    ctx.font = "48px serif";

    var lineheight = 50;
    var lines = bodyInnerHTML.split('\n');
    for (var i = 0; i < lines.length; i++)
        ctx.fillText(lines[i], x2, y2 + (i * lineheight));
    // ctx.fillText(bodyInnerHTML, 10, 50);



    ////////////////CLOSING STUFF:
    ctx.closePath();
    ctx.fill();
    ctx.textAlign = 'center';

}

