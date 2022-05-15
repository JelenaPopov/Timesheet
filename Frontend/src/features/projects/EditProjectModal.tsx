import { useEffect } from "react"
import useCustomForm from "../../app/custom-hooks/CustomFormHook";
import EditModal from "../../app/modals/EditModal";
import { toast } from 'react-toastify';
import { Project, useEditProjectMutation } from "./projectsSlice";
import { Client, useGetAllClientsQuery } from "../clients/clientsSlice";
import { useGetAllUsersQuery, User } from "../auth/usersSlice";
import { ProjectForm } from "./ProjectForm";

interface IProps {
    project: Project | undefined,
    show: boolean,
    onClose: () => void
}

export const EditProjectModal = (props: IProps) => {
    const project = props.project;
    const [editProject] = useEditProjectMutation();
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
                const client = clients.find((el: Client) => el.id === parseInt(inputs.client));
                const teamLead = users.find((el: User) => el.id === parseInt(inputs.teamLead));

                await editProject({
                    id: project?.id, version: project?.version, name: inputs.name,
                    description: inputs.description, client: client, teamLead: teamLead
                }).unwrap();
                handleResetForm();
                props.onClose();
            } catch (err) {
                toast.error("Something goes wrong. Please try again!", {
                    position: toast.POSITION.TOP_CENTER
                });
                handleResetForm();
            }
        }
    }

    const { inputs, handleInputChange, handleSubmit, handleResetForm, setEditValues } = useCustomForm(onSaveProjectClicked, { "name": "", "description": "", "client": '-1', "teamLead": '-1' });
    const canSave = [inputs.name, inputs.client, inputs.teamLead].every(Boolean) && inputs.client !== '-1' && inputs.teamLead !== '-1';

    useEffect(
        () => {
            if (props.show && project) {
                setEditValues({ name: project.name, description: project.description, client: project.client.id, teamLead: project.teamLead.id });
            }
            else {
                handleResetForm();
            }
        },
        [
            props.show, project
        ]
    );

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
        <EditModal
            children={<ProjectForm inputs={inputs} onChange={handleInputChange}
                clientsOptions={clientsOptions} usersOptions={usersOptions} />}
            show={props.show}
            onSave={handleSubmit}
            onClose={props.onClose}
            canSave={canSave}
            title="Edit Project"
            cssClasses="modal-dialog-lg" />
    )
}