import { Form, useLoaderData, Link, LoaderFunction } from 'remix';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faHashtag, faGift, faNoteSticky, faFaceGrin, faVideo } from '@fortawesome/free-solid-svg-icons';

type LoaderData = {
    channel: {
        name: string,
        messages: Array<{
            author: string,
            message: string,
        }>,
    },
};

export const loader: LoaderFunction = async ({ params }) =>
{
    return {
        channel: {
            name: params.channel,
            messages: new Array(100).fill(null).map((_, i) => ({ id: i, author: 'Chris', message: `KAAS ${i}` })).reverse(),
        },
    } as LoaderData;
};

export default function Channel()
{
    const { channel } = useLoaderData<LoaderData>();

    return <div className="channel">
        <header>
            <FontAwesomeIcon icon={faHashtag} />

            <span>{channel.name}</span>
        </header>

        <main>
            {channel.messages.map(m => <div key={m.id} className="message">
                <a href="#">{m.author}</a>
                <p>{m.message}</p>
            </div>)}
        </main>

        <footer>
            <Form>
                <button><FontAwesomeIcon icon={faPlus} /></button>

                <input name="message" />

                <button><FontAwesomeIcon icon={faGift} /></button>
                <button><FontAwesomeIcon icon={faVideo} /></button>
                <button><FontAwesomeIcon icon={faNoteSticky} /></button>
                <button><FontAwesomeIcon icon={faFaceGrin} /></button>
            </Form>
        </footer>

        <aside>
            them peeps
        </aside>
    </div>;
}