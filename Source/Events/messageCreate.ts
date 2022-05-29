import { Event } from '../interface';
import { Message } from 'discord.js';
import config from '../Config';

const event: Event = {
    once: false,
    execute: (client, message: Message) => {
        if (!message.content.startsWith(config.prefix) || message.author.bot) return;

        let args = message.content.slice(config.prefix.length).trim().split(" ");
        let command = args.shift()!.toLocaleLowerCase();
        try {
            let file = client.commands.find(i => i.synonym.find(i => i.includes(command)) !== null)!;
            file.run(client, message, args);
        } catch (e) {
            console.log(e);
        };
    }
};

export default event;