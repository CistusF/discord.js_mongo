import { Event } from '../interface';
import { newClient } from '../index';

const event: Event = {
    once: false,
    execute: (client: newClient, Message: string) => {
        console.log(Message);
    }
};

export default event;