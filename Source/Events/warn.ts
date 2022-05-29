import { Event } from '../interface';
import { newClient } from '../index';

const event: Event = {
    once: false,
    execute: (client: newClient, Message: string) => {
        console.warn(Message);
    }
};

export default event;