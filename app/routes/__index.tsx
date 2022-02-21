import { User } from 'discord.js';
import { Outlet, LoaderFunction, useLoaderData, useTransition } from 'remix';
import { auth } from '~/auth.server';
import { Menu } from '~/component/menu';
import { i18n } from '~/i18n.server';
import { getGuilds, Guild } from '~/service/discord.server';

type LoaderData = {
    error: { message: string } | null;
    user: User,
    guilds: Guild[],
    servers: Array<{
        id: number,
        name: string,
        icon: string,
    }>,
};

export const loader: LoaderFunction = async ({ request }) =>
{
    const user = await auth.isAuthenticated(request, { failureRedirect: '/auth/login' });

    return {
        user,
        guilds: await getGuilds(user),
        i18n: await i18n.getTranslations(request, [ 'common', 'index' ]),
    };
};

export default function Index()
{
    const { guilds, user } = useLoaderData<LoaderData>();

    // https://cdn.discordapp.com/icons/921778276945502260/25536e8d918af7811927b5e9ff216176.webp?size=96

    return <>
        <Menu guilds={guilds} />
        <main>
            <Outlet />
        </main>
    </>;
}
