import { AuthUser } from '~/auth.server';

const baseUrl = 'https://discord.com/api';
const imageBaseUrl = 'https://cdn.discordapp.com';

async function _fetch(route: string, token: string): Promise<any>
{
    const response = await fetch(`${baseUrl}${route}`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    return response.json();
}

export type Guild = {
    id: string,
    name: string,
    icon: string,
    owner: boolean,
    permission: number,
    features: Array<any>,
    permissionsNew: string,
};

export async function getGuilds(user: AuthUser): Promise<Guild[]>
{
    const guilds: Array<any> = await _fetch('/users/@me/guilds', user.token);

    return guilds.map(g => ({
        id: g.id,
        name: g.name,
        icon: `${imageBaseUrl}/icons/${g.id}/${g.icon}.webp`,
        owner: g.owner,
        permission: g.permission,
        features: g.features,
        permissionsNew: g.permissions_new,
    }));
}