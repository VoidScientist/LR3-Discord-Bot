import { ActivityType, Client, ClientPresence, ClientUser, Events, GatewayIntentBits, Message } from 'discord.js';
import CONFIG from './config.json' with {type: "json"};
import Commands from './scripts/Commands.js';

let self: String;

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

function onClientReady(client: Client): void {

    console.log("Bot is ready!");

    if (!client.user) { 
        throw new Error("No client received when starting the bot."); 
    }

    self = client.user.id;

    client.user.setPresence(
        {
            activities: [
                {name: "🤖 AM AWAKE 🤖",
                 type: ActivityType.Custom
                }
            ],
            status: "online"
        }
     );

}

async function handleMessage(message: Message): Promise<void> {

    if (message.content[0] !== "!") {return;}
    
    let parsed: String[] = message.content.split(" ");

    let identifier: String = parsed[0].slice(1);

    let args: String[] = parsed.slice(1);

    let func: Function = Commands[identifier];

    if (!func) {
        message.reply(`"!${identifier}" command does not exist.`);
        return;
    }

    message.channel.send(await func(args));

    message.delete();
    
}

client.on(Events.MessageCreate, handleMessage);
client.once(Events.ClientReady, onClientReady);


