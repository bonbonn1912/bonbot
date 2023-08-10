import * as tmi from "tmi.js";



export function getTwitchClient(channels: string[], clientId: string, accessToken: string): tmi.Client{
    const client = new tmi.Client({
        options: { debug: true },
        identity: {
            username: clientId,
            password: accessToken
        },
        channels: [""]
    });

    return client;
} 



