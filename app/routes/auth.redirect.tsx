import { LoaderFunction } from 'remix';
import { auth } from '~/auth.server.js';

export const loader: LoaderFunction = async ({ request }) => {
    return auth.authenticate('Discord', request, {
        failureRedirect: '/',
        successRedirect: '/explore',
    });
};