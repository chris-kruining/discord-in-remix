import { Form } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { LoaderFunction } from 'remix';
import { i18n } from '~/i18n.server';

export let loader: LoaderFunction = async ({ request }) => {
    return {
        i18n: await i18n.getTranslations(request, [ 'common', 'index' ]),
    };
};


export default function Index() {
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
