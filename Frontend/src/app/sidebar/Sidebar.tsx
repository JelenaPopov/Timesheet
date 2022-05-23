import { Link } from 'react-router-dom';
import routes, { Roles, Tabs } from '../../routes';
import './Sidebar.css';

interface Props {
    activeTab: Tabs,
    role: string,
    signOutComponent: React.ReactNode
}

const Sidebar = (props: Props) => {
    const activeTab = props.activeTab;

    const liItems = routes.filter(route => route.roles.includes(props.role as Roles)).map((route) => (
        <Link to={route.path} key={route.key} className="text-white link">
            <li className={activeTab === route.key ? "nav-link text-white active" : "nav-link text-white"}>
                <i className={route.icon} /> {route.key}
            </li>
        </Link >
    ));

    return (
        <main className="height-100">
            <div className="flex-shrink-0 p-3 text-white bg-dark width-100" >
                <span className="fs-4">
                    <Link to="/" className="text-white link"> <i className="bi bi-calendar3 main-icon" />Timesheet</Link>
                </span>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto nav-container">
                    {liItems}
                    {props.signOutComponent}
                </ul>
            </div>
        </main>
    )
}

export default Sidebar