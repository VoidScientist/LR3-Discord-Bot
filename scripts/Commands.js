import UtilFuncs from "./UtilFuncs.js";
import { EmbedBuilder, formatEmoji, ActionRowBuilder,ButtonBuilder, ButtonStyle} from "discord.js";
import * as fs from "fs";
import { PokeCard } from "../pokemonCardGame/PokeCard.js";

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
    "itiswhatitis" : getShrug,
    "joke": getJoke,
    "chuckfact" : getChuckFact,
    "translate": getTranslation,
    "pokemon": getPokemonEmbed ,
    "stock" : getStockRate,
    "schedule": getSchedule,
    "setschedule": setSchedule,
    "unsetschedule": unsetSchedule,
    "character" : getRandomCharacter,
    "trivia" : getTrivia,
    "weather": getWeather,
    "getsmarter" : getSmarter

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
        "https://media.licdn.com/dms/image/v2/D5603AQEvSpL_oIWQoQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1697897875335?e=1733356800&v=beta&t=szXVjalWujZzUszkJAJE8ILoT10HAovHrIKhnbnHgQQ",
        "https://media.licdn.com/dms/image/v2/D4E03AQFSGsJr7pE48g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1707837249716?e=1733356800&v=beta&t=QHcJaMa3JfnES32hbWPSwwFOHKjC5iy9eUBUGWqPrCw",
        "https://media.licdn.com/dms/image/v2/D4E03AQF5lsrAlEkO8A/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1708981094314?e=1733356800&v=beta&t=kPZgh1O9qGfEAsohKvAiHQxrBQwU3Z6mPkXwUZeCGzE",
        "https://cdn.discordapp.com/attachments/1184200623529410611/1216769735467864094/IMG_20240311_112822.jpg?ex=6601981f&is=65ef231f&hm=753b247d360dbdecfdff2a563b91204dd5db874b7d5b4db941d33eebdf4b2cca&"
    ];

    return UtilFuncs.rand.arrayPickRand(faces);

}

function getShrug(){

    return '¯\\\_(ツ)\_/¯'

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

function getKonami(args, message) {

    const jsonFile = "./storage.json";

    const jsonData = fs.readFileSync(jsonFile);

    const data = JSON.parse(jsonData);

    if (data["konami"].includes(message.author.id)){return;}

    else{data.konami.push(message.author.id);}

    fs.writeFileSync(jsonFile, JSON.stringify(data));

    return "Thou hast successfully transcended the realm of humanity. ";

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

    if (fact.error === true) return;

    return fact.value;

}

async function getTranslation(args = ["morse", "Maybe a konami code is hiding somewhere..."]) {

    const languages = [
            "yoda", 
            "oldenglish",
            "pirate",
            "minion",
            "morse",
            "russian-accent",
            "german-accent"
        ]

    const language = args[0];

    const encodedMessage = UtilFuncs.conv.arrayToUrl(args.splice(1));

    if(!languages.includes(language)) {

        const randLanguage = languages[UtilFuncs.rand.randRange(0, languages.length-1)];

        return "Language not supported. Try: " + randLanguage;

    }

    let link = "https://api.funtranslations.com/translate/" + language + "?text=";
    
    const response = await fetch(link + encodedMessage);

    const translate = await response.json();

    if (translate.hasOwnProperty("error")) {return translate.error.message;}

    return translate.contents.translated;
}

async function getPokemonEmbed(args) {
    
    if (args.length === 0) {args = ["charizard"];}

    let [name, _] = args;

    name = name.toLowerCase();

    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    
    let pokemonData;

    try {

        pokemonData = await pokemon.json();

    } catch(err) {

        return "An error occurred, try again.";

    }

    const pokemonFormUrl = pokemonData.forms[0].url;

    const pokemonForm = await fetch(pokemonFormUrl);

    const pokemonFormData = await pokemonForm.json();

    const sprite = pokemonFormData.sprites.front_default;

    const card = new PokeCard(name, sprite)

    const embed = card.generateEmbed();

    return {embeds: [embed]};

}

async function getStockRate(args){

    let [stock, _] = args;

    const apiKey = "aqlJ4KAyAUR0r_ludhGGyti_nRpJhDxD";

    const formattedDate = UtilFuncs.time.yesterday();

    const response = await fetch(`https://api.polygon.io/v1/open-close/${stock}/${formattedDate}?adjusted=true&apiKey=${apiKey}`);

    const data = await response.json();
    
    if (data.status === "NOT_FOUND" || data.open === undefined) {
        return `${stock} either isn't on the stockmarket or doesn't exist.`;
    }

    const colors = ["#7f219c", "#d96f8d","#6cc45a","#2b30c2"];

    const exampleEmbed = new EmbedBuilder()
	.setColor(UtilFuncs.rand.arrayPickRand(colors))
	.setTitle(stock)
	.setThumbnail("https://img.freepik.com/vecteurs-libre/concept-marche-boursier-degrade_23-2149166910.jpg?size=626&ext=jpg&ga=GA1.1.632798143.1708041600&semt=ais")
    .addFields(
        {name : "Time", value: formattedDate},
        {name: "Open", value: `${data.open}$`},
        {name: "Close", value: `${data.close}$`}
    );

    return {embeds : [exampleEmbed]}; 

}

async function getSchedule(args = "04/04/2024") {
    
    const [date, _] = args.length === 0 ? [await UtilFuncs.time.date()] : args;

    if (!UtilFuncs.time.isEuDate(date)) return "Please, enter date in format: dd/mm/yyyy";
    
    const response = await fetch("https://connecteur.alcuin.com/ADS/ESME.mvc/api/ics/4391a35b-ae5b-4062-9091-40575b66dc0c");

    const icsFile = await response.text();

    const parsed = icsFile.split("\n");

    const schedule = await UtilFuncs.conv.icsFileToList(parsed);

    const Embeds = [];

    for(let event of schedule) {

        if(event.date.dateFr === date) {

            const start = event.start.hour + ":" + event.start.minutes;
            const end = event.end.hour + ":" + event.end.minutes;
            const date = "(" + event.date.dateFr + ")";
            let lessonName = "";
            let type = "";
            let color = 0;
            const colors = {
                "default":0xa0a0a0, 
                "Travaux pratiques": 0xffa726, 
                "Cours Magistral": 0x66bb6a, 
                "Travaux dirigés": 0x7e57c2
            }
            
            if(event.subject.includes(" Anglophone - ")){
                const lesson = event.subject.split(" Anglophone - ");
                type = lesson[0];
                lessonName = lesson[1];
                color = colors[type] != undefined ? colors[type] : colors["default"];
            }
            else {
                lessonName = event.subject;
                color = colors["default"];
            }
            
            const eventEmbed = new EmbedBuilder()
            .setColor(color)
            .setTitle(lessonName)
            .setThumbnail("https://campuschartrons-bordeaux.com/wp-content/uploads/2023/10/Logo-ESME-Bordeaux.webp")
            .addFields(
                {name: "🕓  Time:", value: start + " - " + end + " " + date},
                {name: "📍 Room:", value: event.location === '' ? "N/A" : event.location},
                {name: "📖  Type:", value: type === "" ? "Other" : type}
            );

            Embeds.push(eventEmbed);

        }
    
    }

    if (Embeds.length === 0) {
        return "No events scheduled on " + date;
    }

    // EXPERIMENTAL CONTENT (current system doesn't allow for it to work)

    // const leftButton = new ButtonBuilder().setCustomId("left").setStyle(ButtonStyle.Primary).setEmoji("👈");
    // const rightButton = new ButtonBuilder().setCustomId("right").setStyle(ButtonStyle.Primary).setEmoji("👉");
    
    return {embeds: Embeds, /*components: [new ActionRowBuilder().addComponents(leftButton, rightButton)]*/};

}

function setSchedule(args, message){

    const serverId = message.guildId;
    const channelId = message.channelId;

    const jsonFile = "./storage.json";

    const jsonData = fs.readFileSync(jsonFile);

    const data = JSON.parse(jsonData);

    data.autoScheduleChannels[serverId] = channelId;

    fs.writeFileSync(jsonFile, JSON.stringify(data));

    return "This channel has been set to display the schedule."

}

function unsetSchedule(args, message){

    const serverId = message.guildId;

    const jsonFile = "./storage.json";

    const jsonData = fs.readFileSync(jsonFile);

    const data = JSON.parse(jsonData);

    delete data.autoScheduleChannels[serverId];

    fs.writeFileSync(jsonFile, JSON.stringify(data));

    return "This channel has been unset to display the schedule."
}

function getRandomCharacter(args){

    let [name, classes, illness,_] = args.toString().split("/");

    const selectedName = UtilFuncs.rand.arrayPickRand(name.split(","));
    const selectedCLass = UtilFuncs.rand.arrayPickRand(classes.split(","));
    const selectedIll = UtilFuncs.rand.arrayPickRand(illness.split(","));

    const card = new EmbedBuilder()
    .setColor("#9b32a8")
    .setTitle(selectedName)
    .setThumbnail("https://images.assetsdelivery.com/compings_v2/tarasdubov/tarasdubov2211/tarasdubov221100361.jpg")
    .addFields(
        {name: "Class", value: selectedCLass},
        {name: "Illness", value: selectedIll}
    )

    return {embeds : [card]}

}

async function getTrivia(){

    const response = await fetch("https://the-trivia-api.com/v2/questions/");

    const trivia = await response.json();

    if(!trivia[0].question.text) {return;}

    let res;

    return "**" + trivia[0].question.text + "**" + "\n" + "||" + trivia[0].correctAnswer + "||";    

}

async function getWeather(args){

    const [location, _] = args.length === 0 ? ["Lille"] : args;

    const [latitude, longitude] = await UtilFuncs.location.coordinates(location);

    if(latitude === "" || longitude === ""){return "The location is not registered"}

    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max&timezone=auto`);
                                 
    const weather = await response.json();

    const weatherIconsURL = {
        "sunny": "https://em-content.zobj.net/source/microsoft-teams/337/sun_2600-fe0f.png",
        "sunny/cloudy": "https://em-content.zobj.net/source/microsoft/379/sun-behind-cloud_26c5.png",
        "cloudy": "https://em-content.zobj.net/source/microsoft/379/cloud_2601-fe0f.png",
        "sunny/rainy": "https://em-content.zobj.net/source/microsoft/379/sun-behind-rain-cloud_1f326-fe0f.png",
        "rainy": "https://em-content.zobj.net/source/microsoft/379/cloud-with-rain_1f327-fe0f.png",
        "thunder": "https://em-content.zobj.net/source/microsoft/379/cloud-with-lightning-and-rain_26c8-fe0f.png",
        "snow": "https://em-content.zobj.net/source/microsoft/379/cloud-with-snow_1f328-fe0f.png",
        "snow/rain": "https://cdn3d.iconscout.com/3d/premium/thumb/windy-weather-7814453-6267527.png?f=webp",
        "fog": "https://cdn3d.iconscout.com/3d/premium/thumb/foggy-weather-7375366-5979320.png?f=webp",
        "undetermined": "https://icons.iconarchive.com/icons/microsoft/fluentui-emoji-3d/512/Red-Question-Mark-3d-icon.png"
    }

    const embedList = [];

    for (let i = 0; i<weather.daily.time.length; i++){

        const date = new Date(weather.daily.time[i]);
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        
        const code = weather.daily.weather_code[i];

        let icon = "";

        if (code == 0){
            icon = weatherIconsURL["sunny"];
        }
        else if ([1, 2].includes(code)){
            icon = weatherIconsURL["sunny/cloudy"];
        }
        else if (code === 3) {
            icon = weatherIconsURL["cloudy"];
        }
        else if ([45, 48].includes(code)){
            icon = weatherIconsURL["fog"];
        }
        else if ([51, 53, 55].includes(code)){
            icon = weatherIconsURL["sunny/rainy"];
        }
        else if ([61, 63, 65, 80, 81, 82].includes(code)){
            icon = weatherIconsURL["rainy"];
        }
        else if ([56, 57, 66, 67].includes(code)){
            icon = weatherIconsURL["snow/rain"];
        }
        else if ([71, 73, 75, 77, 85, 86].includes(code)){
            icon = weatherIconsURL["snow"];
        }
        else if ([95, 96, 99].includes(code)){
            icon = weatherIconsURL["thunder"];
        }
        else {
            icon = weatherIconsURL["undetermined"];
        }

        const sunset = weather.daily.sunset[i].split("T")[1];
        const sunrise = weather.daily.sunrise[i].split("T")[1];

        const weatherEmbed = new EmbedBuilder()
        .setColor(0x34aeeb)
        .setThumbnail(icon)
        .setTitle(`Weather at ${location} on the ${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`)
        .addFields(
            {name: "🌡️ Min/max:", value: weather.daily.temperature_2m_min[i].toString() + "/" + weather.daily.temperature_2m_max[i].toString() + "°C", inline: true},
            {name: "🌧️ Rain prob:", value: `${weather.daily.precipitation_probability_max[i]}%`, inline: true},
            {name: "☀️ UV Index", value: weather.daily.uv_index_max[i].toString(), inline: true},
            {name: "🌅 Sunrise:", value: sunrise, inline: true},
            {name: "🌇 Sunset:", value: sunset, inline: true},
            {name: "Weather code:", value: code.toString(), inline: true}
        );
        
        embedList.push(weatherEmbed);

    }

    return {embeds: embedList};

}

async function getSmarter(args){

    const response = await fetch("https://inspirobot.me/api?generate=true");

    const image = await response.text();

    return image;

}

export default Commands;