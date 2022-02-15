import { Form, useLoaderData, Link, LoaderFunction } from 'remix';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

type LoaderData = {
    messages: Array<{
        author: string,
        message: string,
    }>,
};

export const loader: LoaderFunction = async () =>
{
    return {
        messages: new Array(1000).fill({ author: 'Chris', message: 'KAAS' }),
    } as LoaderData;
};

export default function Channel()
{
    const { messages } = useLoaderData<LoaderData>();

    return <div className="channel">
        {messages.map((m, i) => <div key={i}>
            <Link to="#">{m.author}</Link>
            <p>{m.message}</p>
        </div>)}

        <Form>
            <button><FontAwesomeIcon icon={faPlus} /></button>
            <input name="message" />
        </Form>
    </div>;
}