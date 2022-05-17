import { useState } from 'react';
import { Client, useDeleteClientMutation, useGetClientsQuery } from './clientsSlice';
import { toast } from 'react-toastify';
import Table from '../../app/table/Table';
import { AddClientModal } from './AddClientModal';
import { EditClientModal } from './EditClientModal';

export const ClientsList = () => {
    const [page, setPage] = useState(1);
    const {
        data = {
            clients: [],
            totalPages: 0
        }
    } = useGetClientsQuery(page);
    const [deleteClient] = useDeleteClientMutation();

    const [selectedClient, setSelectedClient] = useState<Client | undefined>(undefined);
    const [showEditForm, setShowEditForm] = useState(false);

    const onSelectClient = (client: Client) => {
        setSelectedClient(client);
        setShowEditForm(true);
    }

    const onDeleteClient = async (client: Client) => {
        try {
            await deleteClient(client.id).unwrap()
        } catch (err) {
            toast.error("Failed to delete the client!", {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    const renderedClients = <>
        {data.clients.map((client: Client) => (
            <tr key={client.id} >
                <td>{client.firstName} {client.lastName}</td>
                <td>{client.country}</td>
                <td>{client.city}</td>
                <td>{client.street}</td>
                <td>{client.postalCode}</td>
                <td className="edit-delete-container">
                    <button onClick={() => onSelectClient(client)} className="edit-btn">
                        <i
                            className="bi bi-pencil-square edit-icon">
                        </i>
                    </button>
                    <button onClick={() => onDeleteClient(client)} className="delete-btn">
                        <i
                            className="bi bi-trash delete-icon">
                        </i>
                    </button>
                </td>
            </tr>
        ))}
    </>

    const tableHeader = <tr className="header">
        <th scope="col">Name</th>
        <th scope="col">Country</th>
        <th scope="col">City</th>
        <th scope="col">Street</th>
        <th scope="col">Postal Code</th>
        <th scope="col">&nbsp;</th>
    </tr>

    return (
        <>
            <Table title="Client List" addModalId="#addClientModal" header={tableHeader} body={renderedClients} page={page}
                totalPages={data.totalPages} onSetPage={(currentPage: number) => setPage(currentPage)} />
            <AddClientModal />
            {(showEditForm && selectedClient) && <EditClientModal show={showEditForm} client={selectedClient} onClose={() => {setShowEditForm(false); setSelectedClient(undefined);}} />}
        </>
    )
}
