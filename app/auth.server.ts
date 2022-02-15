import { createCookieSessionStorage } from 'remix';
import { Authenticator, StrategyVerifyCallback  } from 'remix-auth';
import { OAuth2Profile, OAuth2StrategyVerifyParams, OAuth2Strategy } from 'remix-auth-oauth2';
import { User } from 'discord.js';

export const sessionStorage = createCookieSessionStorage({
    cookie: {
        name: '__session',
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secrets: [ 's3cret' ], // This should be an env variable
        secure: process.env.NODE_ENV === 'production',
    },
});

interface DiscordStrategyOptions
{
    domain: string;
    clientId: string;
    clientSecret: string;
    callbackUrl: string;
    scopes?: string[],
}

interface DiscordExtraParams extends Record<string, string | number>
{
    scope: string,
}

type DiscordProfile = OAuth2Profile & Pick<User, 'accentColor'|'avatar'|'banner'|'bot'|'createdAt'|'createdTimestamp'|'discriminator'|'defaultAvatarURL'|'dmChannel'|'flags'|'hexAccentColor'|'id'|'partial'|'system'|'tag'|'username'>;

class DiscordStrategy<TUser> extends OAuth2Strategy<TUser, DiscordProfile, DiscordExtraParams>
{
    public name = 'Discord';

    readonly #userInfoURL: string;
    readonly #scopes: string[];

    // We receive our custom options and our verify callback
    constructor(
        options: DiscordStrategyOptions,
        verify: StrategyVerifyCallback<TUser, OAuth2StrategyVerifyParams<DiscordProfile, DiscordExtraParams>>,
    )
    {
        super(
            {
                authorizationURL: `https://${options.domain}/oauth2/authorize`,
                tokenURL: `https://${options.domain}/oauth2/token`,
                clientID: options.clientId,
                clientSecret: options.clientSecret,
                callbackURL: options.callbackUrl,
            },
            verify
        );

        this.#userInfoURL = `https://${options.domain}/users/@me`;
        this.#scopes = options.scopes ?? [ 'identify' ];
    }

    protected authorizationParams()
    {
        return new URLSearchParams({
            response_type: 'code',
            scope: this.#scopes.join(' '),
        });
    }

    protected async userProfile(accessToken: string): Promise<DiscordProfile>
    {
        let response = await fetch(this.#userInfoURL, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        let data: User = await response.json();

        return {
            ...data,
            provider: 'discord',
        } as DiscordProfile;
    }
}

export const auth = new Authenticator<{}>(sessionStorage);

auth.use(new DiscordStrategy<DiscordProfile>(
    {
        domain: 'discord.com/api',
        clientId: process.env.DISCORD_CLIENT_ID!,
        clientSecret: process.env.DISCORD_CLIENT_SECRET!,
        callbackUrl: 'http://localhost:3000/auth/redirect',
    },
    async (args) => args as unknown as DiscordProfile,
));
