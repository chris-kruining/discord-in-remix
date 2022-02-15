import { RemixI18Next } from 'remix-i18next';
import { FetchBackend, FileSystemBackend } from 'remix-i18next';
import os from 'os';

const ip = Object.values(os.networkInterfaces()).flat().find(ip => ip?.family == "IPv4" && !ip.internal)!

// const backend = new FileSystemBackend('./public/locales');
const backend = new FetchBackend({
    baseUrl: new URL(`http://${ip.address}:${process.env.PORT ?? 3000}`),
    pathPattern: '/locales/:locale/:namespace.json',
});

export let i18n = new RemixI18Next(backend, {
    fallbackLng: 'en',
    supportedLanguages: [ 'en', 'nl' ],
});