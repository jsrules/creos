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
function t(s) {
    console.table(s)
}

/////////////////////////////////////////////////////   
function myAlert(s) {
    setTimeout("alert('" + s + "')", 200);
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