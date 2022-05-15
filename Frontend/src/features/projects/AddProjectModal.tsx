import useCustomForm from "../../app/custom-hooks/CustomFormHook";
import { useAddNewProjectMutation } from "./projectsSlice";
import { toast } from 'react-toastify';
import { ProjectForm } from "./ProjectForm";
import { Client, useGetAllClientsQuery } from "../clients/clientsSlice";
import AddModal from "../../app/modals/AddModal";
import { useGetAllUsersQuery, User } from "../auth/usersSlice";

export const AddProjectModal = () => {
    const [addNewProject] = useAddNewProjectMutation();
    const {
        data: clients = []
    } = useGetAllClientsQuery(null);

    const {
        data: users = []
    } = useGetAllUsersQuery(null);

    const onSaveProjectClicked = async () => {
        if ([inputs.name, inputs.client, inputs.teamLead].every(Boolean)
            && inputs.client !== '-1'
            && inputs.teamLead !== '-1') {
            try {

                const data = { ...inputs };
                const client = clients.find((el: Client) => el.id === parseInt(data.client));
                const teamLead = users.find((el: User) => el.id === parseInt(data.teamLead));
                data.client = client;
                data.teamLead = teamLead;

                await addNewProject(data).unwrap();
                handleResetForm();
            } catch (err) {
                toast.error("Something goes wrong. Please try again!", {
                    position: toast.POSITION.TOP_CENTER
                });
                handleResetForm();
            }
        }
    }

    const { inputs, handleInputChange, handleSubmit, handleResetForm } = useCustomForm(onSaveProjectClicked, { "name": "", "description": "", "client": '-1', "teamLead": '-1' });
    const canSave = [inputs.name, inputs.client, inputs.teamLead].every(Boolean) && inputs.client !== '-1' && inputs.teamLead !== '-1';

    const clientsOptions =
        <>
            {clients.map((client: Client) => (
                <option key={client.id} value={client.id}>
                    {client.firstName} {client.lastName}
                </option>
            ))}
        </>;

    const usersOptions =
        <>
            {users.map((user: User) => (
                <option key={user.id} value={user.id}>
                    {user.firstName} {user.lastName}
                </option>
            ))}
        </>;

    return (
        <AddModal
            children={<ProjectForm inputs={inputs} onChange={handleInputChange}
                clientsOptions={clientsOptions} usersOptions={usersOptions} />}
            onSave={handleSubmit}
            onClose={handleResetForm}
            canSave={canSave}
            title="New Project"
            id="addProjectModal"
            cssClasses="modal-dialog-lg" />
    )
}