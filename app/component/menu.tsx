export type MenuProps = {
    servers: any[],
};

export function Menu({ servers }: MenuProps) {
    return <nav>
        <span>Home</span>
        <hr/>
        { servers.map(server => <span key={ server.id }>{ server.name }</span>) }
        <span>Add</span>
        <span>Explore</span>
    </nav>;
}