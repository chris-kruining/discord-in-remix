import { Form } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { LoaderFunction, useLoaderData } from 'remix';
import { i18n } from '~/i18n.server';
import { auth, sessionStorage } from '~/auth.server.js';

type LoaderData = {
    error: { message: string } | null;

};

export const loader: LoaderFunction = async ({ request }) =>
{
    const user = await auth.isAuthenticated(request, { failureRedirect: '/auth/discord' });
    const session = await sessionStorage.getSession(request.headers.get('Cookie'));

    console.log(user);

    return {
        error: session.get(auth.sessionErrorKey),
        i18n: await i18n.getTranslations(request, [ 'common', 'index' ]),
    };
};

export default function Index()
{
    const { error } = useLoaderData<LoaderData>();
    const { t } = useTranslation('index');

    return <div>
        <nav>
            <Form>
                <input
                    placeholder={t('search')}
                />
            </Form>
        </nav>
    </div>;
}
