const UtilFuncs = {

    conv: {

        objToUrl: objectToUrlEncoded,
        strToUrl: strToUrlEncoded,
        arrayToUrl: arrayToUrlEncoded,
        icsFileToList: getEventsFromIcs

    },

    rand: {

        randRange: randRange,
        arrayPickRand: pickRandomInArray
        
    },

    time: {

        date : getDateAt,
        yesterday : getYesterday,
        getTimeDif: getTimeDifference,
        isEuDate: isEuropeanDate,
        getTimezone: findFrenchTimezone

    },

    location: {
        coordinates: getCoordinates,
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

async function getDateAt(args = ["France","Lille", "dd/MM/yyyy"]){

    let [country, city, format, _] = args;

    if (!city || !country) {return;}

    const data = await fetch(`https://tools.aimylogic.com/api/now?tz=${country}/${city}&format=${format}`);
    
    const response = await data.json();
    
    return response.formatted;

}

function isEuropeanDate(dateStr) {

    const [day, month, year] = dateStr.split("/");

    return !isNaN(Date.parse(month, day, year)); 

}

function getTimeDifference(date){
    return -findFrenchTimezone(date);
}

function getYesterday(){

    let date = new Date();
                      
    date.setDate(date.getDate() - 1);

    let day = date.getDate().toString().padStart(2, "0");
    let month = date.getMonth().toString().padStart(2, "0");
    let year = date.getFullYear();
    
    return `${year}-${month}-${day}`;

}

function findFrenchTimezone(args){
    let date = args === undefined ? new Date() : new Date(args);
    let month = date.getMonth();
    if (month == 2 || month == 9){
        let firstToLastSunday = {1:29, 2:30, 3:31, 4:25, 5:26, 6:27, 7:28};
        let firstSunday = (date.getDate()+7-date.getDay())%7;
        let lastSunday = firstToLastSunday[firstSunday];
        return date.getDate() < lastSunday ? [1,2][+(month == 9)] : [2,1][+(month == 9)];
    }
    if ([0,1,10,11].includes(month)){
        return 1;
    }
    return 2;
}

// TODO: too much slicing, make it clearer.
async function getEventsFromIcs(file) {

    const events = []; 
    let event = {};

    for (let line of file){

        if (line == 'BEGIN:VEVENT\r') {
            event = {
                subject: "",
                location: "",
                date: {},
                start: {},
                end:{}
            };
        } 

        else if (line == 'END:VEVENT\r') { events.push(event);}

        else if (line.includes("SUMMARY")) { event.subject = line.slice(8, line.length-1);}

        else if (line.includes("LOCATION")) {
            event.location = (line.slice(9, line.length-1)).replaceAll("\\n", " ");
        }

        else if (line.includes("DTSTART")) {
            
            const timeDifference = getTimeDifference(new Date(event.date.year, event.date.month-1, event.date.day));
            event.start.hour = (line.slice(17,19) - timeDifference).toString();
            event.start.minutes = line.slice(19,21);

        }

        else if (line.includes("DTEND")) {

            event.date.year = line.slice(6,10);
            event.date.month = line.slice(10, 12);
            event.date.day = line.slice(12,14);
            event.date.dateFr = event.date.day + "/" + event.date.month + "/" + event.date.year;
            const timeDifference = getTimeDifference(new Date(event.date.year, event.date.month-1, event.date.day));
            event.end.hour = (line.slice(15,17) - timeDifference).toString();
            event.end.minutes = line.slice(17,19);

        }
        
    }

    return events;
}

async function getCoordinates(location){

    const response  = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}`);

    const data = await response.json();

    if(data.hasOwnProperty("results")){return [data.results[0].latitude, data.results[0].longitude];}

    return ["",""];

}


export default UtilFuncs;