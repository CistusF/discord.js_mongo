import { MessageEmbed } from 'discord.js';
import moment from 'moment-timezone';
import { model } from 'mongoose';
import { Command, MemoInterface } from '../../interface';
import { memoSchema } from '../../Schemas/Schema';

const command: Command = {
    description: "Memo something to the database",
    synonym: [],
    management: false,
    run: (client, message, args) => {
        const Memo = model<MemoInterface>('Memo', memoSchema);
        Memo.findOne({
            userId: message.author.id
        }).exec()
            .then(data => {
                if (!data) {
                    if (!args[0]) return message.reply("Couldn't save null memo.");
                    const memo = new Memo({
                        memo: args.join(" "),
                        userId: message.author.id
                    });

                    memo.save().catch(e => {
                        throw new Error(e);
                    }).then(() => {
                        message.reply("Successfully saved your memo.");
                    });
                } else {
                    let embed = new MessageEmbed({
                        title: "Memo",
                        description: data.memo,
                        footer: {
                            text: moment(data.updatedAt ?? new Date()).tz("Asia/Seoul").format("YYYY/MM/DD")
                        }
                    });
                    
                    if (!args[0]) return message.reply({ embeds: [embed] });
                    data.updateOne({ 'memo': args.join(" ") }).then(() => {
                        message.reply("Successfully updated your memo.");
                    }).catch(e => {
                        throw new Error(e);
                    });
                };
            });
    }
};

export default command;