import { MessageEmbed } from 'discord.js';
import { Command } from '../../interface';

const command: Command = {
    description: "Export user from server.",
    usage: "@Jhon#1234",
    synonym: ["kicks"],
    management: true,
    run: (client, message, args) => {
        if (!message.mentions.members) return message.reply("Please mention the user to be kicked from the server with the command.");

        let members: string[] = [];

        message.mentions.members.forEach(m => {
            members.push(m.nickname ?? m.user.username);
            m.kick("Kick by Bot");
        });

        let embed = new MessageEmbed({
            title: "Users evicted from the server",
            description: members.join(" ,")
        });

        message.reply({ content: "Users have been kicked out.", embeds: [embed] });
    }
};

export default command;