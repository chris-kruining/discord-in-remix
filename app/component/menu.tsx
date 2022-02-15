import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCompass } from '@fortawesome/free-solid-svg-icons';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { PropsWithChildren } from 'react';
import { Link } from 'remix';

type Server = {
    id: number,
    name: string,
    icon?: string,
};

export type MenuProps = {
    servers: any[],
};

export function Menu({ servers }: MenuProps) {
    return <nav className="main">
        <Item to="/"><FontAwesomeIcon className="home" icon={faDiscord} /></Item>
        <hr />
        { servers.map(server => <Item key={ server.id } to={`/${server.name}`}>{server.icon ? <img src={server.icon} /> : server.name}</Item>) }
        <Item to="/server/new"><FontAwesomeIcon icon={faPlus} /></Item>
        <Item to="/explore"><FontAwesomeIcon icon={faCompass} /></Item>
    </nav>;
}

function Item({ to, children }: PropsWithChildren<{ to: string }>)
{
    return <Link className="main__item" to={to}>
        <span>{children}</span>
    </Link>
}