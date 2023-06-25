////////////////////////////////////////////////////////// commons ///////////////////////////////////////////////////////////////////////////////////////////////////////////// 
'use strict';


const hexes = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
const MIN_COLOR = 0;
const MAX_COLOR = 255;



/////////////////////////////////////////////////////   
function getColorOfPieceOnTd(x) {
    if (x.innerHTML == '') {
        return null
    }
    let html = x.innerHTML

    var rx = /.*(\w)\w\.png/g;
    var arr = rx.exec(html);
    // log(arr[1])
    return arr[1];

}

/////////////////////////////////////////////////////   
function getColorOfPieceInHtml(html) {
    // if (x.innerHTML == '') {
    //     return null
    // }
    // let html = x.innerHTML

    var rx = /.*\w(\w)\.png/g;
    var arr = rx.exec(html);
    // log(arr[1])
    return arr[1];

}
// log (getPieceInHtml('<img src="img/bK.png">'))

/////////////////////////////////////////////////////   

function getPieceInHtml(html) {
    // if (x.innerHTML == '') {
    //     return null
    // }
    // let html = x.innerHTML

    var rx = /.*(\w)\w\.png/g;
    var arr = rx.exec(html);
    // log(arr[1])
    return arr[1];

}

/////////////////////////////////////////////////////   
function opposingColor(x) {
    return x == 'w' ? 'b' : 'w'

}

/////////////////////////////////////////////////////    solution from https://stackoverflow.com/questions/979975/get-the-values-from-the-get-parameters-javascript
function getUrlParam(param) {
    var url_string = self.location.href; //"http://www.example.com/t.html?a=1&b=3&c=m2-m3-m4-m5"; //window.location.href
    var url = new URL(url_string);
    var c = url.searchParams.get(param);
    // console.log('Param-param:'+c);
    return c;
}

/////////////////////////////////////////////////////   
function w(x) {
    return document.write(x);

}

/////////////////////////////////////////////////////   
function $(x) {
    return document.getElementById(x);

}

/////////////////////////////////////////////////////   
function log(s) {
    console.log(s)
}

/////////////////////////////////////////////////////
function ctg(x) { return 1 / Math.tan(x); }

/////////////////////////////////////////////////////
function arcctg(x) { return Math.PI / 2 - Math.atan(x); }

/////////////////////////////////////////////////////   
function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

/////////////////////////////////////////////////////   
function randHexDigit() {
    return hexes[randomInteger(0, 15)];
}

/////////////////////////////////////////////////////   
function randColor() {
    return "#" + randHexDigit() + randHexDigit() + randHexDigit() + randHexDigit() + randHexDigit() + randHexDigit();
}

/////////////////////////////////////////////////////   
function randShadeOfRed() {
    return "#" + randHexDigit() + randHexDigit() + '0000';
}

/////////////////////////////////////////////////////   
function randShadeOfGreen() {
    return "#00" + randHexDigit() + randHexDigit() + '00';
}

/////////////////////////////////////////////////////   
function randShadeOfBlues() {
    return "#0000" + randHexDigit() + randHexDigit();
}

/////////////////////////////////////////////////////   
function getFilenameFromURL(url) {
    return url.substring(url.lastIndexOf('/') + 1);
}

////////////////////////////Stack//////////////////////////
function Stack() {
    this._size = 0;
    this._storage = {};
}
Stack.prototype.push = function (data) {
    var size = ++this._size;
    this._storage[size] = data;
};
Stack.prototype.pop = function () {
    var size = this._size,
        deletedData;
    if (size) {
        deletedData = this._storage[size];
        delete this._storage[size];
        this._size--;
        return deletedData;
    }
}; 