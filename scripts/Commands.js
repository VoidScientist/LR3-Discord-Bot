import UtilFuncs from "./UtilFuncs.js";
import { EmbedBuilder, formatEmoji } from "discord.js";

const hidden = ["konami", "sis", "rin", "kurisutina", "help", "bocchi"];

const Commands = {
    
    "help": getCommands,
    "random" : pickRandom,
    "konami": getKonami,
    "rin" : getRintarou,
    "sis" : getHotChick,
    "kurisutina" : getKurisutina,
    "bocchi" : getBocchi,
    "cat" : getCatUrl,
    "dog" : getDogImage,
    "crackhead" : getCrackhead,
    "joke": getJoke,
    "chuckfact" : getChuckFact,
    "translate": getTranslation,
    "pokemon": getPokemonEmbed ,
    "stock" : getStockRate

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

function pickRandom(){

    let keys = Object.keys(Commands).slice(hidden.length + 1);
    let selected = UtilFuncs.rand.arrayPickRand(keys);

    return Commands[selected]();


}

function getCatUrl(content = "Look! You can print out text..."){

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

function getKurisutina(){

    return "https://www.meme-arsenal.com/memes/1257953f667bc33671caf8855adc0e23.jpg";

}

function getHotChick(){

    return "https://media.licdn.com/dms/image/D4E03AQEOfGLK6QLPMw/profile-displayphoto-shrink_100_100/0/1696966619616?e=1715212800&v=beta&t=msuJjcpLUojZRgvV-i3hk-CYP_wDO3tR2s1Ly7aalgU";

}

function getBocchi(){

    let faces = [
        "https://i0.wp.com/anitrendz.net/news/wp-content/uploads/2023/03/hitori-gotou-dead.png?resize=650%2C366&ssl=1",
        "https://preview.redd.it/omori-inspired-bocchi-meme-i-made-a-few-months-ago-v0-ncfpj91oy7ja1.jpg?width=640&crop=smart&auto=webp&s=14bb1b5878a69ad24cc7c80c57293c42d7d7277b",
        "https://cdn.epicstream.com/images/ncavvykf/epicstream/dbfc4525f1e24613c4edd4607d1a441abb2af670-1280x720.jpg?rect=0,24,1280,672&w=1200&h=630&auto=format"
    ];

    return UtilFuncs.rand.arrayPickRand(faces);

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

async function getTranslation(args = ["morse", "Maybe a konami code is hiding somewhere..."]) {

    const languages = ["yoda", "oldenglish", "pirate", "minion", "morse", "russian-accent", "german-accent"]

    const language = args[0];

    const encodedMessage = UtilFuncs.conv.arrayToUrl(args.splice(1));

    if(!languages.includes(language)) {return "Language not supported. Try: " + languages[UtilFuncs.rand.randRange(0, languages.length-1)];}

    let link = "https://api.funtranslations.com/translate/" + language + "?text=";
    
    const response = await fetch(link + encodedMessage);

    const translate = await response.json();

    if (translate.hasOwnProperty("error")) {return translate.error.message;}

    return translate.contents.translated;
}

async function getPokemonEmbed(args = ["charizard"]) {
    

    let [name, _] = args;

    name = name.toLowerCase();

    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

    const pokemonData = await pokemon.json();

    if (pokemonData == "Not Found") {return;}

    const pokemonFormUrl = pokemonData.forms[0].url;

    const pokemonForm = await fetch(pokemonFormUrl);

    const pokemonFormData = await pokemonForm.json();

    const sprite = pokemonFormData.sprites.front_default;

    const exampleEmbed = new EmbedBuilder()
	.setColor(0xed2c28)
	.setTitle(name)
	.setThumbnail(sprite)
    .addFields(
        {name: "HP", value: pokemonData.stats[0].base_stat.toString()}
    );

    return {embeds: [exampleEmbed]};

}

async function getStockRate(args){

    let [stock,_] = args


    const apiKey = "aqlJ4KAyAUR0r_ludhGGyti_nRpJhDxD";

    const formattedDate = UtilFuncs.time.previousDate()

    const response = await fetch(`https://api.polygon.io/v1/open-close/${stock}/${formattedDate}?adjusted=true&apiKey=${apiKey}`);

    const data = await response.json();
    
    if (data.status === "NOT_FOUND" || data.open === undefined) {return `${stock} either isn't on the stockmarket or doesn't exist.`}

    return `Data for ${stock} on ${formattedDate}:\nOpen : ${data.open}$\nClosing : ${data.close}$.` ; 

}

async function getSchedule() {

    const response = await fetch("https://connecteur.alcuin.com/ADS/ESME.mvc/api/ics/4391a35b-ae5b-4062-9091-40575b66dc0c");

    const icsFile = await response.text();

    let parsed = icsFile.split("\n");

    let schedule = UtilFuncs.alcuin.icsFileToList(parsed);
    console.log(schedule);

}

export default Commands;


