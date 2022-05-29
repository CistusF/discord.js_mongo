import { Command } from '../../interface';

const command: Command = {
    description: "Check the bot's latency.",
    synonym: [],
    management: false,
    run: (client, message, args) => {
        message.reply("Pong!");
    }
};

export default command;