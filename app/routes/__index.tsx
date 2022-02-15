import { Outlet, LoaderFunction, useLoaderData, useTransition } from 'remix';
import { Menu } from '~/component/menu';
import { i18n } from '~/i18n.server';

type LoaderData = {
    error: { message: string } | null;
    servers: Array<{
        id: number,
        name: string,
        icon: string,
    }>,
};

export const loader: LoaderFunction = async ({ request }) =>
{
    // const user = await auth.isAuthenticated(request, { failureRedirect: '/auth/discord' });
    //
    // console.log(user);

    return {
        servers: [
            {
                id: 0,
                name: 'remix',
                icon: 'https://images.unsplash.com/photo-1547989453-11e67ffb3885?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80',
            },
            { id: 1, name: 'W.@.v.e' },
            {
                id: 2,
                name: 'Casa di papi',
                icon: 'https://images.unsplash.com/photo-1547989453-11e67ffb3885?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80',
            },
            {
                id: 3,
                name: 'Corpse corp',
                icon: 'https://images.unsplash.com/photo-1547989453-11e67ffb3885?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80',
            },
            {
                id: 4,
                name: 'fun and games',
                icon: 'https://images.unsplash.com/photo-1547989453-11e67ffb3885?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80',
            },
            {
                id: 5,
                name: 'campzone',
                icon: 'https://images.unsplash.com/photo-1547989453-11e67ffb3885?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80',
            },
        ],
        i18n: await i18n.getTranslations(request, [ 'common', 'index' ]),
    };
};

export default function Index()
{
    const { servers } = useLoaderData<LoaderData>();

    return <>
        <Menu servers={servers} />
        <main>
            <Outlet />
        </main>
    </>;
}
