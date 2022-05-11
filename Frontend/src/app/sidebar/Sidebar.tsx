import { Link, To } from 'react-router-dom';
import routes, { Roles, Tabs } from '../../routes';
import './Sidebar.css';

interface Props {
    activeTab: Tabs,
    role: string,
    signOutComponent: React.ReactNode
}

const Sidebar = (props: Props) => {
    const activeTab = props.activeTab;

    const liItem = (tab: Tabs, linkTo: To, iconClassName: string) => {
        return (
            <Link to={linkTo} key={tab} className="text-white link">
                <li className={activeTab === tab ? "nav-link text-white active" : "nav-link text-white"}>
                    <i className={iconClassName} /> {tab}
                </li>
            </Link >
        )
    }

    const liItems = routes.filter(route => route.roles.includes(props.role as Roles)).map((route) => (
        liItem(route.key, route.path, route.icon)
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