import { Event } from '../interface';
import { newClient } from '../index';

const event: Event = {
    once: false,
    execute: (client: newClient) => {
        console.log('Successfully logined to ' + client.user?.tag);
    }
};

export default event;