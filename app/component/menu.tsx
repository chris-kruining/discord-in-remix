import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCompass } from '@fortawesome/free-solid-svg-icons';
import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons';
import { PropsWithChildren } from 'react';
import { NavLink } from 'remix';

type Server = {
    id: number,
    name: string,
    icon?: string,
};

export type MenuProps = {
    servers: any[],
};

export function Menu({ servers }: MenuProps)
{
    return <nav className="main">
        <Item to="/"><FontAwesomeIcon className="home" icon={faDiscord} /></Item>
        <hr />
        {servers.map(server => <Item key={server.id} to={`/guild/${server.name.replace(/ +/g, '-')}`}>{server.icon
            ? <img src={server.icon} />
            : server.name}</Item>)}
        <Item to="/guild/new"><FontAwesomeIcon icon={faPlus} /></Item>
        <Item to="/explore"><FontAwesomeIcon icon={faCompass} /></Item>
        <Item to="https://github.com/chris-kruining/discord-in-remix"><FontAwesomeIcon icon={faGithub} /></Item>
    </nav>;
}

function Item({ className = '', to, children }: PropsWithChildren<{ className?: string, to: string }>)
{
    const content = <span>{children}</span>;
    return to.startsWith('http')
        ? <a href={to} className={`main__item ${className}`} target="_blank">{content}</a>
        : <NavLink className={`main__item ${className}`} to={to}>{content}</NavLink>;
}