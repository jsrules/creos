////////////////////////////////////////////////////////// commons ///////////////////////////////////////////////////////////////////////////////////////////////////////////// 
'use strict';


const hexes = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
const MIN_COLOR = 0;
const MAX_COLOR = 255;



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
function l(s) {
    log(s)
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
function randomBoolean() {
    return Math.random() < 0.5;
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

///////////////////////////////////////////////////////////////
const includesArray = (data, arr) => {
    return data.some(e => Array.isArray(e) && e.every((o, i) => Object.is(arr[i], o)));
}


function removeSubarray(array1, subarray) {
    for (var x = 0; x < array1.length; x++) {
        if (array1[x][0] == subarray[0] && array1[x][1] == subarray[1])
            array1.splice(x, 1);
    }
}

// let data = []
// let arr = [3, 5]
// removeSubarray(data, arr)

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

/////////////////////////////////////////////////////
//TODO: del
function decimalToCOLORHexString(number) {
    if (number < 0) {
        return '#000000';
       // number = 0xFFFFFFFF + number + 1;
    }


    let colorStr = number.toString(16).toUpperCase().padStart(6, '0');
    // if (colorStr.length < 6){

    // }
    return '#'+ colorStr;
}

// l(decimalToCOLORHexString(256))


function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

// alert(rgbToHex(0, 51, 255)); // #0033ff

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
  
//   alert(hexToRgb("#0033ff").g); // "51";

// alert(hexToRgb("#0079D0").g); // "51";

