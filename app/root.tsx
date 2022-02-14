import {
    json,
    Links,
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

export const meta: MetaFunction = () => {
    return { title: 'Discord in remix' };
};

export let loader: LoaderFunction = async ({ request }) => {
    return {
        locale: await i18n.getLocale(request)
    };
};

export default function App() {
    const { locale } = useLoaderData<{ locale: string }>();
    useRemixI18Next(locale);

    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width,initial-scale=1"/>
            <Meta/>
            <Links/>
        </head>
        <body>
        <Menu servers={ [ { id: 0, name: 'remix' } ] }/>
        <Outlet/>
        <ScrollRestoration/>
        <Scripts/>
        <LiveReload/>
        </body>
        </html>
    );
}
