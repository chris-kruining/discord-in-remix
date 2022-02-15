import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faHashtag, faMicrophone, faHeadphones, faCog } from '@fortawesome/free-solid-svg-icons';
import { Outlet, useLoaderData } from '@remix-run/react';
import { Link, LoaderFunction } from 'remix';

type LoaderData = {
    name: string,
    categories: Array<{
        id: number,
        name: string,
        open: boolean,
        channels: Array<{
            id: number,
            name: string,
        }>,
    }>,
};

export const loader: LoaderFunction = async ({ params }) => {
    return {
        name: params.guild,
        categories: [
            {
                id: 0,
                name: 'Remix',
                open: true,
                channels: [
                    { id: 0, name: 'general' },
                    { id: 1, name: 'help' },
                    { id: 2, name: 'contributing' },
                ],
            },
            {
                id: 1,
                name: 'Topics',
                open: true,
                channels: [
                    { id: 0, name: 'accessibility' },
                    { id: 1, name: 'react-router' },
                    { id: 2, name: 'typescript' },
                ],
            },
        ],
    } as LoaderData
};

export default function Guild()
{
    const { name, categories } = useLoaderData<LoaderData>();

    return <div className="guild">
        <header>
            <h1>{ name }</h1>

            <button><FontAwesomeIcon icon={faEllipsisV} /></button>
        </header>

        <nav>
            {categories.map(c => <details key={c.id} open={c.open}>
                <summary>{c.name}</summary>

                <section>
                    {c.channels.map(c => <Link to={`/${name}/${c.id}`} key={c.id}>
                        <FontAwesomeIcon icon={faHashtag} />

                        {c.name}
                    </Link>)}
                </section>
            </details>)}
        </nav>

        <main>
            <Outlet />
        </main>

        <footer>
            <span>Chris</span>

            <button><FontAwesomeIcon icon={faMicrophone} /></button>

            <button><FontAwesomeIcon icon={faHeadphones} /></button>

            <button><FontAwesomeIcon icon={faCog} /></button>
        </footer>
    </div>
}