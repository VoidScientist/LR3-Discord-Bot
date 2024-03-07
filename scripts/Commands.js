import UtilFuncs from "./UtilFuncs.js";

const Commands = {
    
    "cat" : getCatUrl,
    "dog" : getDogImage,
    "crackhead" : getCrackhead

};


function getCatUrl(content){

    if (content && content.length > 0 && content instanceof Array) {

        let text = UtilFuncs.conv.arrayToUrl(content);

        return `https://cataas.com/cat/says/${text}?fontColor=white&fontSize=50`;

    }

    return `https://cataas.com/cat`;

}

async function getDogImage() {

    const response = await fetch("https://dog.ceo/api/breeds/image/random");

    const dogs = await response.json();

    if (dogs.status !== "success") { return "Dog API can't be reached."; }

    return dogs.message;

}

function getCrackhead(){

    return "https://media.licdn.com/dms/image/D4E03AQFSGsJr7pE48g/profile-displayphoto-shrink_200_200/0/1707837249716?e=1715212800&v=beta&t=X3xOv16pcSdn4hKEbM1RmiANSeoWhYLtGYW-EhYQtmU";

}


export default Commands;

