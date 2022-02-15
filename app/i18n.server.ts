import { RemixI18Next } from 'remix-i18next';
import { Backend } from 'remix-i18next';
import localeEn from '~/locale/en.json';
import localeNl from '~/locale/nl.json';

class InMemoryBackend implements Backend
{
    constructor(
        private readonly data: {
            [locale: string]: {
                [namespace: string]: {
                    [key: string]: string;
                };
            };
        },
    )
    {
    }

    async getTranslations(namespace: string, locale: string)
    {
        return this.data[locale][namespace];
    }
}

const backend = new InMemoryBackend({
    en: localeEn,
    nl: localeNl,
});

export let i18n = new RemixI18Next(backend, {
    fallbackLng: 'en',
    supportedLanguages: [ 'en', 'nl' ],
});