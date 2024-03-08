const UtilFuncs: Object = {

    conv: {

        objToUrl: objectToUrlEncoded,
        strToUrl: strToUrlEncoded,
        arrayToUrl: arrayToUrlEncoded,

    },

    rand: {

        randRange: randRange,
        arrayPickRand: pickRandomInArray
        
    }


};

function objectToUrlEncoded(data: Object): string {

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

function strToUrlEncoded(string: string): string {
    
    let res = "";

    for (let i = 0; i < string.length; i++) {

        res += string[i] == " " ? "%20" : string[i];

    }

    return res;

}

function arrayToUrlEncoded(array: Array<string>): string {

    let res = "";

    for (let i = 0; i < array.length; i++) {

        let encodedValue = strToUrlEncoded(array[i]);
        res += `${encodedValue}`;
        res += i + 1 < array.length ? "%20" : "";

    }

    return res;

}


function randRange(start: number, end: number): number {

    if (end-start < 0) {
        throw new Error("negative range not allowed");
    }

    return Math.floor(Math.random() * (end-start)) + start;

}

function pickRandomInArray(array: Array<any>): any {

    const index = Math.floor(Math.random() * array.length);

    return array[index];

}

export default UtilFuncs