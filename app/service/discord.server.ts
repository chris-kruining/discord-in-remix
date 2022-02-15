import Discord, { Intents } from 'discord.js';
import { auth } from '~/auth.server';

const client = new Discord.Client({
    intents: [ Intents.FLAGS.GUILDS ],
});
// client.login()

export async function getGuilds()
{

}

async function getClient()
{

}