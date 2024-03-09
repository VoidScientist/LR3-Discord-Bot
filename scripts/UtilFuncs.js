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
        previousDate : getPreviousDate,
        getTimeDif: getTimeDifference

    },

    alcuin: {
        icsFileToList: getEventsFromIcs
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

async function getTimeDifference(args = ["France","Lille", "dd/MM/yyyy"]){

    let [country, city, format,_] = args;
    if (!city || !country) {return;}
    const data = await fetch(`https://tools.aimylogic.com/api/now?tz=${country}/${city}&format=${format}`);
    const response = await data.json();
    let date = new Date();

    return response.hour - date.getHours();

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

async function getEventsFromIcs(file){
    const events = []; 
    let event = {};
    const timeDifference = await getTimeDifference();

    for (let line of file){

        if (line == 'BEGIN:VEVENT\r'){event = {subject:"", location:"", date:{}, start:{}, end:{}};} 

        else if (line == 'END:VEVENT\r'){events.push(event);}

        else if(line.includes("SUMMARY")){event.subject = line.slice(8, line.length-1);}

        else if(line.includes("LOCATION")){event.location = line.slice(9, line.length-1);}

        else if(line.includes("DTSTART")){

            event.date.year = line.slice(8,12);
            event.date.month = line.slice(12, 14);
            event.date.day = line.slice(14,16);
            event.date.dateFr = event.date.day + "/" + line.slice(12, 14) + "/" + line.slice(8,12);
            event.start.hour = (line.slice(17,19) - timeDifference).toString();
            event.start.minutes = line.slice(19,21);

        }

        else if(line.includes("DTEND")){

            event.end.hour = (line.slice(15,17) - timeDifference).toString();
            event.end.minutes = line.slice(17,19);

        }
        
    }

    return events;
}




export default UtilFuncs;