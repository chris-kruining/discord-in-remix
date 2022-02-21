import { Outlet, LoaderFunction, useLoaderData, useTransition } from 'remix';
import { auth, AuthUser } from '~/auth.server';
import { Menu } from '~/component/menu';
import { i18n } from '~/i18n.server';
import { getGuilds, Guild } from '~/service/discord.server';

type LoaderData = {
    error: { message: string } | null;
    user: AuthUser,
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
    const { guilds } = useLoaderData<LoaderData>();

    return <>
        <Menu guilds={guilds} />
        <main>
            <Outlet />
        </main>
    </>;
}
