import { useLoaderData } from '@remix-run/react';
import { Link, LoaderFunction } from 'remix';

type LoaderData = {
    messages: Array<{
        author: string,
        message: string,
    }>,
};

export const loader: LoaderFunction = async () => {
    return {
        messages: new Array(1000).fill({ author: 'Chris', message: 'KAAS' }),
    } as LoaderData
};

export default function Channel()
{
    const { messages } = useLoaderData<LoaderData>();

    return <div className="channel">
        {messages.map((m,i) => <div key={i}>
            <Link to="#">{m.author}</Link>
            <p>{m.message}</p>
        </div>)}
    </div>
}

