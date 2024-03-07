import { ActivityType, Client, Events, GatewayIntentBits } from 'discord.js';
import CONFIG from './config.json' with {type: "json"};

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

client.once(Events.ClientReady, client => 
    {
        console.log("Bot is ready!");
        self = client.user.id;
        client.user.setPresence(
            {
                activities: [{name: "🤖 AM AWAKE 🤖", type: ActivityType.Custom}],
                status: "online"
            }
        );
    }
);

client.on(Events.MessageCreate, message => 
    {
        let parsed = message.content.split(" ");
        let content = parsed.slice(1)
        let identifier = parsed[0]
        console.log(parsed);
        if (identifier !== "!cat") {return;}
        message.reply(`https://cataas.com/cat/says/${content.join("%20")}`);        
    }
);