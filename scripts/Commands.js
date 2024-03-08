import UtilFuncs from "./UtilFuncs.js";

const hidden = ["konami", "sis", "rin"];

const Commands = {
    
    "help": getCommands,
    "cat" : getCatUrl,
    "dog" : getDogImage,
    "crackhead" : getCrackhead,
    "rin" : getRintarou,
    "sis" : getHotChick,
    "konami": getKonami,
    "joke": getJoke,
    "chuckfact" : getChuckFact,
    "translate": getTranslation

};

function getCommands() {

    let keys = Object.keys(Commands);
    
    let res = "__Here are the commands:__\n";

    for (let i = 0; i < keys.length; i++) {

        if (hidden.includes(keys[i])) { continue; }

        res += `- !${keys[i]}`;
        res += i + 1 < keys.length ? "\n" : ""; 

    }

    return res;

}

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

    const faces = [
        "https://media.licdn.com/dms/image/D5603AQEvSpL_oIWQoQ/profile-displayphoto-shrink_200_200/0/1697897875335?e=1715212800&v=beta&t=0dnrdFpaVr1t1sJM3YKI4CqFHvDAWmRuO6fWLAmtTic",
        "https://media.licdn.com/dms/image/D4E03AQFSGsJr7pE48g/profile-displayphoto-shrink_200_200/0/1707837249716?e=1715212800&v=beta&t=X3xOv16pcSdn4hKEbM1RmiANSeoWhYLtGYW-EhYQtmU",
        "https://media.licdn.com/dms/image/D4E03AQF5lsrAlEkO8A/profile-displayphoto-shrink_200_200/0/1708981094314?e=1715212800&v=beta&t=eWGWYEfHW-6M3hwAfKtdX6o6LTWCoV8kVvfavMpj5aI"
    ];

    return UtilFuncs.rand.arrayPickRand(faces);

}

function getRintarou(){

    return "https://i1.sndcdn.com/avatars-000290781095-i22idu-t240x240.jpg";

}

function getHotChick(){

    return "https://media.licdn.com/dms/image/D4E03AQEOfGLK6QLPMw/profile-displayphoto-shrink_100_100/0/1696966619616?e=1715212800&v=beta&t=msuJjcpLUojZRgvV-i3hk-CYP_wDO3tR2s1Ly7aalgU";

}

function getKonami() {

    // TODO: MAKE IT SO THAT USER IS ADDED TO A DATABASE

    return "Thou hast successfully transcended the realm of humanity.";

}

async function getJoke(){

    const response = await fetch("https://v2.jokeapi.dev/joke/Any");

    const joke = await response.json();

    if (joke.error === true) { return; }

    if (joke.type === "single") { return joke.joke; }

    return joke.setup + '\n' + joke.delivery;

}

async function getChuckFact(){

    const response = await fetch("https://api.chucknorris.io/jokes/random");

    const fact = await response.json();

    if (fact.error === true) {return;}

    return fact.value;

}

async function getTranslation(args) {

    const languages = ["yoda", "oldenglish", "pirate", "minions", "morse", "russian-accent"]

    const language = args[0];

    const encodedMessage = UtilFuncs.conv.arrayToUrl(args.splice(1));

    if(!languages.includes(language)) { return "Language not supported. Try: " + languages[Math.floor(Math.random() * (languages.length - 1))];}

    let link = "https://api.funtranslations.com/translate/" + language + "?text=";
    
    const response = await fetch(link + encodedMessage);

    const translate = await response.json();

    if (translate.error.code === 429){return translate.error.message}

    return translate.contents.translated;
}

export default Commands;


