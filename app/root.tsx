import {
    json,
    Links, LinksFunction,
    LiveReload,
    LoaderFunction,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration
} from 'remix';
import type { MetaFunction } from 'remix';
import { Menu } from '~/component/menu';
import { useLoaderData } from '@remix-run/react';
import { useRemixI18Next } from 'remix-i18next';
import { i18n } from '~/i18n.server';
import styleHref from '~/style/style.css';
// import * as Style from '~/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core'
import fontAwesome from '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

type LoaderData = {
    servers: Array<{
        id: number,
        name: string,
        icon: string,
    }>,
    locale: string,
};

export const links: LinksFunction = () => {
    return [
        {
            rel: 'stylesheet',
            href: fontAwesome,
        },
        {
            rel: 'stylesheet',
            href: styleHref,
        },
    ];
};

export const meta: MetaFunction = () => {
    return { title: 'Discord in remix' };
};

export let loader: LoaderFunction = async ({ request }) => {
    return {
        servers: [
            { id: 0, name: 'remix', icon: 'https://images.unsplash.com/photo-1547989453-11e67ffb3885?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80' },
            { id: 1, name: 'W.@.v.e' },
            { id: 2, name: 'Casa di papi', icon: 'https://images.unsplash.com/photo-1547989453-11e67ffb3885?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80' },
            { id: 3, name: 'Corpse corp', icon: 'https://images.unsplash.com/photo-1547989453-11e67ffb3885?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80' },
            { id: 4, name: 'fun and games', icon: 'https://images.unsplash.com/photo-1547989453-11e67ffb3885?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80' },
            { id: 5, name: 'campzone', icon: 'https://images.unsplash.com/photo-1547989453-11e67ffb3885?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80' },
        ],
        locale: await i18n.getLocale(request)
    };
};

export default function App() {
    const { servers, locale } = useLoaderData<LoaderData>();
    useRemixI18Next(locale);

    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body>
                <Menu servers={ servers } />
                <main>
                    <Outlet />
                </main>
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}
