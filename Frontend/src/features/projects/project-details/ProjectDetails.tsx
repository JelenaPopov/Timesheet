import { useState } from 'react'
import { EmployeeOnProject, useGetEmployeesOnProjectQuery, useGetProjectQuery} from '../projectsSlice';
import { useParams } from 'react-router-dom';
import ProjectDetailsTable from './ProjectDetailsTable';
import { Spinner } from '../../../app/spinner/Spinner';

export const ProjectDetails = () => {
    const { projectId = '-1' } = useParams();
    const { data: project, isFetching, isSuccess } = useGetProjectQuery(projectId);

    const [page, setPage] = useState(1);
    const {
        data = {
            employeesOnProject: [],
            totalPages: 0
        },
        isFetching: isFetchingEmployees,
        isSuccess: isSuccessFetchingEmployees
    } = useGetEmployeesOnProjectQuery({ "pageNo": page, "projectId": parseInt(projectId) });

    let content = <Spinner/>;
    if (isFetching || isFetchingEmployees) {
        content = <Spinner/>;
    } else if (isSuccess || isSuccessFetchingEmployees) {
        const tableHeader = <tr className="header">
            <th scope="col">Employee</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
        </tr>;

        const renderedEmployeesOnProject = <>
            {data.employeesOnProject.map((employeeOnProject: EmployeeOnProject) => (
                <tr key={employeeOnProject.id}>
                    <td>{employeeOnProject.employee?.firstName} {employeeOnProject.employee?.lastName}</td>
                    <td>{employeeOnProject.startDate}</td>
                    <td>{employeeOnProject.endDate}</td>
                </tr>
            ))}
        </>;

        content = (
            <ProjectDetailsTable title={project.name} header={tableHeader} body={renderedEmployeesOnProject} page={page}
                totalPages={data.totalPages} onSetPage={(currentPage: number) => setPage(currentPage)} />
        )
    }

    return (
        <>
            {content}
        </>
    )
}
