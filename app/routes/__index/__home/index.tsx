import { Form, Outlet } from '@remix-run/react';
import { LoaderFunction, useLoaderData } from 'remix';
import { useTranslation } from 'react-i18next';
import { i18n } from '~/i18n.server';


type LoaderData = {
    error: { message: string } | null;
};

export const loader: LoaderFunction = async ({ request }) =>
{
    // const user = await auth.isAuthenticated(request, { failureRedirect: '/auth/discord' });
    //
    // console.log(user);

    return {
        i18n: await i18n.getTranslations(request, [ 'common', 'index' ]),
    };
};

export default function Index()
{
    const { t } = useTranslation('index');

    return <div>FRIENDS</div>;
}