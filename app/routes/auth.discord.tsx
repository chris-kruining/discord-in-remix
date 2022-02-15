import { ActionFunction, Form, LoaderFunction, useLoaderData } from 'remix';
import { auth, sessionStorage } from '~/auth.server.js';
import { i18n } from '~/i18n.server.js';

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

export default function AuthDiscord()
{
    const { error } = useLoaderData();

    return <Form method="post">
        {error ? <div>{error.message}</div> : null}
        <button>Login</button>
    </Form>;
}