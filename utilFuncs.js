const utilFuncs = {

    conv: {

        objToUrl: objectToUrlEncoded,
        strToUrl: strToUrlEncoded,

    },


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

export default utilFuncs