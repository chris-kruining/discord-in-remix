import { LoaderFunction } from 'remix';
import { auth } from '~/auth.server.js';

export const loader: LoaderFunction = async ({ request }) => {
    return await auth.authenticate('Discord', request, {
        failureRedirect: '/auth/discord',
        successRedirect: '/',
    });
};