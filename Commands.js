import UtilFuncs from "./UtilFuncs.js";

const Commands = {
    
    "cat" : getCatUrl

};


function getCatUrl(content){

    if (content.length > 1) {

        let text = UtilFuncs.conv.arrayToUrl(content);

        return `https://cataas.com/cat/says/${text}?fontColor=white&fontSize=50`;

    }
    

    return `https://cataas.com/cat`;


}


export default Commands;

