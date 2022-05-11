import { CategoriesList } from "./features/categories/CategoriesList";
import { ClientsList } from "./features/clients/ClientsList";
import { ProjectsList } from "./features/projects/ProjectsList";
import { TimeSheet } from "./features/timesheet/Timesheet";

export enum Tabs {
    TIMESHEET = "Timesheet",
    CLIENTS = "Clients",
    PROJECTS = "Projects",
    CATEGORIES = "Categories"
}

export enum Roles {
    ADMIN = "admin",
    EMPLOYEE = "employee",
}

var routes = [
    {
        path: "/",
        name: "Timesheet",
        key: Tabs.TIMESHEET,
        icon: "bi bi-calendar2-check icon",
        component: <TimeSheet/>,
        roles: [Roles.ADMIN, Roles.EMPLOYEE]
    },
    {
        path: "/clients",
        name: "Clients",
        key: Tabs.CLIENTS,
        icon: "bi bi-building icon",
        component: <ClientsList/>,
        roles: [Roles.ADMIN]
    },
    {
        path: "/projects",
        name: "Projects",
        key: Tabs.PROJECTS,
        icon: "bi bi-archive icon",
        component: <ProjectsList/>,
        roles: [Roles.ADMIN]
    },
    {
        path: "/categories",
        name: "Categories",
        key: Tabs.CATEGORIES,
        icon: "bi bi-list-ul icon",
        component: <CategoriesList/>,
        roles: [Roles.ADMIN]
    },
];

export default routes;
