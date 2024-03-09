const UtilFuncs = {

    conv: {

        objToUrl: objectToUrlEncoded,
        strToUrl: strToUrlEncoded,
        arrayToUrl: arrayToUrlEncoded,

    },

    rand: {

        randRange: randRange,
        arrayPickRand: pickRandomInArray
        
    },

    time: {
        date : getCurrentDate,
        previousDate : getPreviousDate
    }


};

function objectToUrlEncoded(data) {

    let res = "";
    
    const keys = Object.keys(data);
    const values = Object.values(data);

    for (let i = 0; i < keys.length; i++) {

        let encodedValue = strToUrlEncoded(values[i]);
        let encodedKey = strToUrlEncoded(keys[i]);

        res += `${encodedKey}=${encodedValue}`;
        res += i + 1 < keys.length ? "&" : "";

    }

    return res;

}

function strToUrlEncoded(string) {
    
    let res = "";

    for (let i = 0; i < string.length; i++) {

        res += string[i] == " " ? "%20" : string[i];

    }

    return res;

}

function arrayToUrlEncoded(array) {

    let res = "";

    for (let i = 0; i < array.length; i++) {

        let encodedValue = strToUrlEncoded(array[i]);
        res += `${encodedValue}`;
        res += i + 1 < array.length ? "%20" : "";

    }

    return res;

}


function randRange(start, end) {

    return Math.floor(Math.random() * (end-start)) + start;

}

function pickRandomInArray(array) {

    const index = Math.floor(Math.random() * array.length);

    return array[index];

}

async function getCurrentDate(args = ["France","Lille", "dd/MM/yyyy"]){

    let [country, city, format,_] = args;
    if (!city || !country) {return;}
    const data = await fetch(`https://tools.aimylogic.com/api/now?tz=${country}/${city}&format=${format}`);
    const response = await data.json();

    return response.formatted;

}

function getPreviousDate(){

    let date = new Date();
                      
    date.setDate(date.getDate() - 1);

    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    if (day < 10){

        day = `0${day}`;
    }

    if (month < 10){

        month = `0${month}`;
    }
    
    return `${year}-${month}-${day}`;

}




export default UtilFuncs;