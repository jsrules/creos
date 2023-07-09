////////////////////////////////////////////////////////// commons ///////////////////////////////////////////////////////////////////////////////////////////////////////////// 
'use strict';


const hexes = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
const MIN_COLOR = 0;
const MAX_COLOR = 255;


//////////// OLDER VERSION IN  commonsSAVED.js /////////////////////////////////////////   
function isNeighborhoodLetter(thisLetter, checkLetter) {

    let result = []

    if (thisLetter != 'a') {
        let pos = HORIZONTAL_FIELD_LETTERS.indexOf(thisLetter)
        result.push(HORIZONTAL_FIELD_LETTERS.charAt(pos - 1))
    }

    if (thisLetter != 'h') {
        let pos = HORIZONTAL_FIELD_LETTERS.indexOf(thisLetter)
        result.push(HORIZONTAL_FIELD_LETTERS.charAt(pos + 1))
    }

    return result.includes(checkLetter);
}


//////////// OLDER VERSION IN  commonsSAVED.js /////////////////////////////////////////   
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

//////////// OLDER VERSION IN  commonsSAVED.js /////////////////////////////////////////   
function getColorOfPieceInHtml(html) {
    // if (x.innerHTML == '') {
    //     return null
    // }
    // let html = x.innerHTML

    var rx = /.*(\w)\w\.png/g;
    var arr = rx.exec(html);
    // log(arr[1])
    return arr[1];

}
// log (getPieceInHtml('<img src="img/bK.png">'))

//////////// OLDER VERSION IN  commonsSAVED.js /////////////////////////////////////////   

function getPieceInHtml(html) {
    // if (x.innerHTML == '') {
    //     return null
    // }
    // let html = x.innerHTML

    var rx = /.*\w(\w)\.png/g;
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

///////////////////////////////////////////////////////////////
// const removeSubarray = (data, arr) => {
//     data = data.filter(function (e) {
//         return !arr.some(function (s) {
//             return s[0] === e[0] && s[1] === e[1];
//         });
//     });
//     return data
// }

function removeSubarray(array1, subarray) {
    for (var x = 0; x < array1.length; x++) {
        if (array1[x][0] == subarray[0] && array1[x][1] == subarray[1])
            array1.splice(x, 1);
    }
}



/////////////////////////////////////////////////////   
function saveGlobalVars() {
    SAVED_VALUE_OF_previousMoveWasPawnJumpBLACK = previousMoveWasPawnJumpBLACK
    SAVED_VALUE_OF_previousMovePawnJumpFIELD_forBLACK = previousMovePawnJumpFIELD_forBLACK
    SAVED_VALUE_OF_previousMovePawnMoveFIELD_forBLACK = previousMovePawnMoveFIELD_forBLACK
    SAVED_VALUE_OF_previousMoveWasPawnJumpWHITE = previousMoveWasPawnJumpWHITE
    SAVED_VALUE_OF_previousMovePawnJumpFIELD_forWHITE = previousMovePawnJumpFIELD_forWHITE
    SAVED_VALUE_OF_previousMovePawnMoveFIELD_forWHITE = previousMovePawnMoveFIELD_forWHITE

    tdIdToInnerHTMLSaved = null
    tdIdFromInnerHTMLSaved = null;
    tdId_h1_InnerHTMLSaved = null

    SAVED_VALUE_OF_didKingMove = [didKingMove[0], didKingMove[1]]  //first is w, second is b
    SAVED_VALUE_OF_didRookHmove = [didRookHmove[0], didRookHmove[1]]  //first is w, second is b
    SAVED_VALUE_OF_didRookAmove = [didRookAmove[0], didRookAmove[1]]  //first is w, second is b
}

/////////////////////////////////////////////////////   
function restoreGlobalVars() {
    previousMoveWasPawnJumpBLACK = SAVED_VALUE_OF_previousMoveWasPawnJumpBLACK
    previousMovePawnJumpFIELD_forBLACK = SAVED_VALUE_OF_previousMovePawnJumpFIELD_forBLACK
    previousMovePawnMoveFIELD_forBLACK = SAVED_VALUE_OF_previousMovePawnMoveFIELD_forBLACK
    previousMoveWasPawnJumpWHITE = SAVED_VALUE_OF_previousMoveWasPawnJumpWHITE
    previousMovePawnJumpFIELD_forWHITE = SAVED_VALUE_OF_previousMovePawnJumpFIELD_forWHITE
    previousMovePawnMoveFIELD_forWHITE = SAVED_VALUE_OF_previousMovePawnMoveFIELD_forWHITE

    tdIdToInnerHTMLSaved = null
    tdIdFromInnerHTMLSaved = null;
    tdId_h1_InnerHTMLSaved = null

    didKingMove = [SAVED_VALUE_OF_didKingMove[0], SAVED_VALUE_OF_didKingMove[1]]
    didRookHmove = [SAVED_VALUE_OF_didRookHmove[0], SAVED_VALUE_OF_didRookHmove[1]]
    didRookAmove = [SAVED_VALUE_OF_didRookAmove[0], SAVED_VALUE_OF_didRookAmove[1]]
}


let data = []
let arr = [3, 5]
l('chevk!!1111 begin=' + data)
removeSubarray(data, arr)

l('chevk!!1111 RESULT=' + data)