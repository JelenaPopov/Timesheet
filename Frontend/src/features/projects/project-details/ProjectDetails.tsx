import { useState } from 'react'
import { EmployeeOnProject, useGetEmployeesOnProjectQuery, useGetProjectQuery } from '../projectsSlice';
import { useParams } from 'react-router-dom';
import ProjectDetailsTable from './ProjectDetailsTable';

export const ProjectDetails = () => {
    const { projectId = '-1' } = useParams();
    const { data: project } = useGetProjectQuery(projectId);

    const [page, setPage] = useState(1);
    const {
        data = {
            employeesOnProject: [],
            totalPages: 0
        }
    } = useGetEmployeesOnProjectQuery({ "pageNo": page, "projectId": parseInt(projectId) });

    const tableHeader = <tr className="header">
        <th scope="col">Employee</th>
        <th scope="col">Start Date</th>
        <th scope="col">End Date</th>
    </tr>;

    const renderedEmployeesOnProject = <>
        {data.employeesOnProject.map((employeeOnProject: EmployeeOnProject) => (
            <tr key={employeeOnProject.id}>
                <td className="employee-on-project-td">{employeeOnProject.employee?.firstName} {employeeOnProject.employee?.lastName}</td>
                <td className="employee-on-project-td">{employeeOnProject.startDate}</td>
                <td className="employee-on-project-td">{employeeOnProject.endDate ? employeeOnProject.endDate : ""}</td>
            </tr>
        ))}
    </>;

    return (
        <>
            {project && <ProjectDetailsTable title={project.name} header={tableHeader} body={renderedEmployeesOnProject} page={page}
                totalPages={data.totalPages} onSetPage={(currentPage: number) => setPage(currentPage)} />}
        </>
    )
}
