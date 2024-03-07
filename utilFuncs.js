const UtilFuncs = {

    conv: {

        ObjToUrl: objectToUrlEncoded,

    },


};

function objectToUrlEncoded(data) {

    let res = "";
    
    const keys = Object.keys(data);
    const values = Object.values(data);

    for (let i = 0; i < keys.length; i++) {

        res += `${keys[i]}=${values[i]}`;
        res += i + 1 < keys.length ? "%20" : "";

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

export default utilFuncs