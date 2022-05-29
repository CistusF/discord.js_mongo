import { Client, ClientOptions, Collection, Intents } from 'discord.js';
import {connect}  from 'mongoose';
import { readdirSync } from 'fs';
import { Command, Event } from './interface';
import config from './Config';

connect(config.mongodbUrl).then(() => {
    console.log('Successfully connected to mongodb');
}).catch(() => {
    throw new Error("Mongoose failed to connect to mongodb.")
});

export class newClient extends Client {
    public commands: Collection<String, Command>;
    constructor(clientOptions: ClientOptions) {
        super(clientOptions);
        this.commands = new Collection();
        this.loadCommands();
        this.loadEvents();
    };

    private loadCommands(): void {
        const commandFolders = readdirSync('./Commands', { 'withFileTypes': true }).filter(i => i.isDirectory());
        commandFolders.forEach((f) => {
            let commandFiles = readdirSync('./Commands/' + f.name).filter((file) => file.endsWith('.js') || file.endsWith('.ts'));
            if (commandFiles.length > 25) throw new Error("명령어 타입은 25개를 넘길 수 없습니다.");
            commandFiles.forEach((c) => {
                const command = require('./Commands/' + f.name + '/' + c) as { default: Command };
                c = c.replace(".js", "").replace(".ts", "");
                command.default.name = c;
                command.default.synonym.unshift(c);
                command.default.type = f.name;
                this.commands.set(c, command.default);
            });
        });
    };

    private loadEvents(): void {
        const eventFiles = readdirSync(`./Events`).filter((f) => f.endsWith('.js') || f.endsWith('.ts'));
        for (let file of eventFiles) {
            file = file.replace(".js", "").replace(".ts", "");
            if (file === "debug" && !config.debug) {
            } else {
                const event = require(`./Events/${file}`) as { default: Event };
                if (event.default.once) {
                    this.once(file, (...args) => event.default.execute(this, ...args));
                } else {
                    this.on(file, (...args) => event.default.execute(this, ...args));
                };
            }
        };
    };
};

const client = new newClient({
    intents: Object.values(Intents.FLAGS),
    partials: ["CHANNEL", "GUILD_MEMBER", "GUILD_SCHEDULED_EVENT", "MESSAGE", "REACTION", "USER"]
});

client.login(config.token);