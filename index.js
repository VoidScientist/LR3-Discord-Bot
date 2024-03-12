import { ActivityType, Client, Events, GatewayIntentBits } from 'discord.js';
import CONFIG from './config.json' with {type: "json"};
import Commands from './scripts/Commands.js';
import * as fs from "fs";

let self = -1;

const client = new Client( 
    {
        intents: 
        [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMessages
        ]
    } 
);

client.login(CONFIG.token);

function onClientReady(client) {

    console.log("Bot is ready!");

    self = client.user.id;

    client.user.setPresence(
        {
            activities: [{name: "🤖 AM AWAKE 🤖", type: ActivityType.Custom}],
            status: "online"
        }
     );

}

async function handleMessage(message) {

    if (message.content[0] !== "!") {return;}
    
    let parsed = message.content.split(" ");

    let identifier = parsed[0].slice(1).toLowerCase();

    let args = parsed.slice(1);

    let func = Commands[identifier];

    if (!func) {
        message.reply(`"!${identifier}" command does not exist.`);
        return;
    }

    message.channel.send(await func(args, message));

    message.delete(1000);
    
}

//TODO:Check that the bot can still access the channel he needs it to send the schedule

async function autoSchedule(){
    
    const date = new Date();

    if (date.getHours() != 6){return;}

    const jsonFile = "storage.json";

    const jsonData = fs.readFileSync(jsonFile);

    const data = JSON.parse(jsonData);

    for (let guildId in data.autoScheduleChannels){

        const guild = client.guilds.cache.get(guildId);
        
        const channel = guild.channels.cache.get(data.autoScheduleChannels[guildId]);

        let embedList = await Commands["schedule"]([])

        channel.send(embedList);

    }
    
}

client.on(Events.MessageCreate, handleMessage);
client.once(Events.ClientReady, onClientReady);
setInterval(autoSchedule, 3600000);