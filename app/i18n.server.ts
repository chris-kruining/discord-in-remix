import { RemixI18Next } from 'remix-i18next';
import { FileSystemBackend } from 'remix-i18next';

let backend = new FileSystemBackend('./public/locales');

export let i18n = new RemixI18Next(backend, {
    fallbackLng: 'en',
    supportedLanguages: [ 'en', 'nl' ],
});