import { useState } from 'react';
import { LoggedHours, useGetAllLoggedHoursQuery } from './loggedHoursSlice';
import Table from '../../app/table/Table';
import './LoggedHoursList.css';
import { useLocation } from 'react-router-dom';
import { AddLoggedHoursModal } from './AddLoggedHoursModal';
import moment from 'moment';
import { EditLoggedHoursModal } from './EditLoggedHoursModal';

export const LoggedHoursList = () => {
    const search = useLocation().search;
    const day = new URLSearchParams(search).get("day");
    const title = "Logged Hours - " + moment(day).format("DD.MM.YYYY.");

    const [page, setPage] = useState(1);
    const {
        data = {
            loggedHours: [],
            totalPages: 0
        }
    } = useGetAllLoggedHoursQuery({ pageNo: page, created: day });

    const [selectedLoggedHours, setSelectedLoggedHours] = useState<LoggedHours | undefined>(undefined);
    const [showEditForm, setShowEditForm] = useState(false);

    const onSelectLoggedHours = (loggedHours: LoggedHours) => {
        setSelectedLoggedHours(loggedHours);
        setShowEditForm(true);
    }

    const renderedLoggedHours = <>
        {data.loggedHours.map((loggedHours: LoggedHours) => (
            <tr key={loggedHours.id} >
                <td>{loggedHours.project.name}</td>
                <td>{loggedHours.category.name}</td>
                <td className="text-truncate description">{loggedHours.description}</td>
                <td className="hours">{loggedHours.hours}</td>
                <td className="edit-delete-container">
                    <button onClick={() => onSelectLoggedHours(loggedHours)} className="edit-btn">
                        <i
                            className="bi bi-pencil-square edit-icon">
                        </i>
                    </button>
                </td>
            </tr>
        ))}
    </>

    const tableHeader = <tr className="header">
        <th scope="col">Project</th>
        <th scope="col">Category</th>
        <th scope="col">Description</th>
        <th scope="col">Hours</th>
        <th scope="col">&nbsp;</th>
    </tr>

    return (
        <>
            <Table title={title} addModalId="#addLoggedHoursModal" header={tableHeader} body={renderedLoggedHours} page={page}
                totalPages={data.totalPages} onSetPage={(currentPage: number) => setPage(currentPage)} />
            <AddLoggedHoursModal day={day} />
            {(showEditForm && selectedLoggedHours) && <EditLoggedHoursModal day={day} show={showEditForm} loggedHours={selectedLoggedHours} onClose={() => { setShowEditForm(false); setSelectedLoggedHours(undefined); }} />}
        </>
    )
}
