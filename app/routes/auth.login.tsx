import { ActionFunction, Form, LinksFunction, LoaderFunction, useLoaderData } from 'remix';
import { auth, sessionStorage } from '~/auth.server.js';
import { i18n } from '~/i18n.server.js';
import styles from '~/style/auth.login.css';

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: styles },
];

export const action: ActionFunction = async ({ request }) => {
    return auth.authenticate('Discord', request, {
        failureRedirect: '/auth/discord',
        successRedirect: '/',
    });
};

export const loader: LoaderFunction = async ({ request }) =>
{
    await auth.isAuthenticated(request, { successRedirect: '/' });

    const session = await sessionStorage.getSession(request.headers.get('Cookie'));

    return {
        error: session.get(auth.sessionErrorKey),
        i18n: await i18n.getTranslations(request, [ 'common', 'index' ]),
    };
};

export default function AuthLogin()
{
    const { error } = useLoaderData();

    return <section className="login">
        <dialog open>
            <p>
                This application is developed as a coding exercise.<br />
                The login is just your typical OAuth2 login, I do not store or log your data in any way.<br />
                If you feel uneasy logging in: just don't, use the official client instead.
            </p>

            <p>
                The source code for this discord client can be found at <a href="https://github.com/chris-kruining/discord-in-remix" target="_blank">Github</a>
            </p>
        </dialog>

        <Form method="post">
            {error ? <div>{error.message}</div> : null}
            <button className="submit">Login</button>
        </Form>
    </section>;
}