import { newClient } from './index';
import { ObjectId } from 'mongoose';
import { Awaitable, Message } from 'discord.js';

export type Command = {
    name?: string;
    description: string;
    usage?: string;
    management: boolean;
    type?: string;
    synonym: string[];
    run: (client: newClient, message: Message, args: string[]) => void;
};

export interface Event {
    once: boolean;
    execute: (client: newClient, ...args: any) => Awaitable<void>;
};

export type MemoInterface = {
    _id: ObjectId;
    userId: string;
    memo: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
};