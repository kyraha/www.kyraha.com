// Magic vector, obtained statistically on correct texts
const frequencies = { "Ҕ":0, "ҕ":50, "Ҥ":0, "ҥ":39, "Ү":15, "ү":249, "Һ":0, "һ":127, "Ө":2, "ө":87 };

// Various mappings of correct (Unicode) encodings onto incorrect (private) ones
const mappings = [
    { "ҕ":"ҕ", "ҥ":"ҥ", "ө":"ө", "һ":"һ", "ү":"ү", "Ҕ":"Ҕ", "Ҥ":"Ҥ", "Ө":"Ө", "Һ":"Һ", "Ү":"Ү" }, // No convert
    { "ҕ":"±", "ҥ":"І", "ө":"і", "һ":"ґ", "ү":"µ", "Ҕ":"Ў", "Ҥ":"ў", "Ө":"Ј", "Һ":"¤", "Ү":"Ґ" }, // Times_uni ?ҔҤ?
    { "ҕ":"і", "ҥ":"µ", "ө":"є", "һ":"Ї", "ү":"ў", "Ҕ":"І", "Ҥ":"Μ", "Ө":"Є", "Һ":"ї", "Ү":"Ў" }, // Yak_uni ?ҔҤҺ?
    { "ҕ":"є", "ҥ":"Ѕ", "ө":"№", "һ":"»", "ү":"ј", "Ҕ":"Є", "Ҥ":String.fromCharCode(173), "Ө":"©", "Һ":"«", "Ү":"¬" }, // Saxa_uni ?ҔҤ?
    { "ҕ":"±", "ҥ":"²", "ө":"³", "һ":"´", "ү":"µ", "Ҕ":"¡", "Ҥ":"¢", "Ө":"£", "Һ":"¤", "Ү":"¥" }, // Dabyl
    { "ҕ":"±", "ҥ":"²", "ө":"³", "һ":"´", "ү":"°", "Ҕ":"¡", "Ҥ":"¢", "Ө":"£", "Һ":"¤", "Ү":"¥" }, // Lazurski
];

function convertText(formObj) {
    var inputElm = formObj.getElementsByTagName("textarea")[0];
    var radioObj = formObj.elements['encodingNum'];
    var mapIndex;
    for( var i=0; i<radioObj.length; i++ ) {
        if(radioObj[i].checked) mapIndex = radioObj[i].value;
    }
    if( mapIndex == undefined || mapIndex == 0 ) {
        // Try to guess mapIndex and check the corresponding radio button
        mapIndex = analyzeEncoding(inputElm.value);
        for( var i=0; i < radioObj.length; i++ ) {
            radioObj[i].checked = radioObj[i].value == mapIndex
                ? true : false;
        }
    }
    if( mapIndex > 0 ) inputElm.value = doConvert( inputElm.value, mapIndex );
}

function analyzeEncoding(current) {
    var cosines = new Array();
    for( var i = 0; i < mappings.length; i++ ) {
        var occurrance = {};
        for( var key in mappings[i] ) {
            if( mappings[i].hasOwnProperty(key) ) {
                var patt = new RegExp(mappings[i][key],"g");
                var matches = current.match(patt);
                occurrance[key] = matches ? matches.length : 0;
            }
            cosines[i] =  cosineVec(occurrance,frequencies)
        }
    }
    var maxcos=0, candidate=0;
    for( i = 0; i < cosines.length; i++ ) {
        if( cosines[i] > maxcos ) {
            candidate = i;
            maxcos = cosines[i];
        }
    }
    return candidate;
}

function doConvert( current, mapIndex ) {
    for( var key in mappings[mapIndex] ) {
        var patt = new RegExp( mappings[mapIndex][key],"g" );
        current = current.replace( patt, key );
    }
    return current;
}

function cosineVec( vec1, vec2 ) {
    var ort = {};
    var key, dot=0, magn1=0, magn2=0;
    for( key in vec1 ) {
        ort[key] = 1;
        magn1 += vec1[key] * vec1[key];
    }
    for( key in vec2 ) {
        ort[key] = 1;
        magn2 += vec2[key] * vec2[key];
    }
    if( magn1 == 0 || magn2 == 0 ) return 0;
    for( key in ort ) dot += (vec1[key]||0)*(vec2[key]||0);
    return dot / Math.sqrt( magn1 * magn2 );
}
