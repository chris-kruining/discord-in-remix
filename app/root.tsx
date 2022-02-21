import {
    Links,
    LinksFunction,
    LiveReload,
    LoaderFunction,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useTransition,
    MetaFunction,
} from 'remix';
import { useLoaderData } from '@remix-run/react';
import { useRemixI18Next } from 'remix-i18next';
import { i18n } from '~/i18n.server';
import styleHref from '~/style/style.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import fontAwesome from '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false;

type LoaderData = {
    servers: Array<{
        id: number,
        name: string,
        icon: string,
    }>,
    locale: string,
};

export const links: LinksFunction = () =>
{
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

export const meta: MetaFunction = () =>
{
    return { title: 'Discord in remix' };
};

export const loader: LoaderFunction = async ({ request }) =>
{
    return {
        locale: await i18n.getLocale(request),
    };
};

export default function App()
{
    const { locale } = useLoaderData<LoaderData>();
    const transition = useTransition();

    let changingPages = transition.state !== 'idle';

    useRemixI18Next(locale);

    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body className={changingPages ? 'loading' : ''}>
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}
