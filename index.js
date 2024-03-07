import { ActivityType, Client, Events, GatewayIntentBits } from 'discord.js';
import CONFIG from './config.json' with {type: "json"};
import Commands from './scripts/Commands.js';

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

    let identifier = parsed[0].slice(1);

    let args = parsed.slice(1);

    let func = Commands[identifier];

    if (!func) {
        message.reply(`"!${identifier}" command does not exist.`);
        return;
    }

    message.channel.send(await func(args));

    message.delete(1000);
    
}

client.on(Events.MessageCreate, handleMessage);
client.once(Events.ClientReady, onClientReady);


