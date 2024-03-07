import UtilFuncs from "./UtilFuncs.js";

const Commands = {
    
    "cat" : getCatUrl,
    "dog" : getDogImage

};


function getCatUrl(content){

    if (content && content.length > 0 && content instanceof Array) {

        let text = UtilFuncs.conv.arrayToUrl(content);

        return `https://cataas.com/cat/says/${text}?fontColor=white&fontSize=50`;

    }
    

    return `https://cataas.com/cat`;


}

async function getDogImage(message) {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const dogs = await response.json();
    if (dogs.status === "success") {
        return dogs.message
    }
}


export default Commands;

