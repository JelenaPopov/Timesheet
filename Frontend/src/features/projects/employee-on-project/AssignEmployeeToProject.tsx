import useCustomForm from "../../../app/custom-hooks/CustomFormHook";
import { Project, useAssignEmployeeToProjectMutation} from "../projectsSlice";
import { toast } from 'react-toastify';
import { AssignEmployeeToProjectForm} from "./AssignEmployeeToProjectForm";
import { useGetAllUsersQuery, User } from "../../auth/usersSlice";
import EditModal from "../../../app/modals/EditModal";

interface IProps {
    project: Project | undefined,
    show: boolean,
    onClose: () => void
}

export const AssignEmployeeToProject = ({project, show, onClose}: IProps) => {
    const [assignEmployeeToProject] = useAssignEmployeeToProjectMutation();

    const {
        data: users = []
    } = useGetAllUsersQuery(null);

    const onSaveProjectClicked = async () => {
        if ([inputs.employee, inputs.startDate].every(Boolean)
            && inputs.employee !== '-1') {
            try {
                const employee = users.find((el: User) => el.id === parseInt(inputs.employee));
                const data = {"id":null, "projectId": project?.id, "employee": employee,
                "startDate": inputs.startDate, "endDate": inputs.endDate};
                await assignEmployeeToProject(data).unwrap();

                handleResetForm();
                onClose();
            } catch (err) {
                toast.error("Something goes wrong. Please try again!", {
                    position: toast.POSITION.TOP_CENTER
                });
                handleResetForm();
            }
        }
    }

    const { inputs, handleInputChange, handleSubmit, handleResetForm } = useCustomForm(onSaveProjectClicked, { "employee": '-1', "startDate": "", "endDate": ""});
    const canSave = [inputs.employee, inputs.startDate].every(Boolean) && inputs.employee !== '-1';

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
            children={<AssignEmployeeToProjectForm inputs={inputs} onChange={handleInputChange} usersOptions={usersOptions} />}
            show={show}
            onSave={handleSubmit}
            onClose={onClose}
            canSave={canSave}
            title="Assign Employee"
            cssClasses="modal-dialog-lg" />
    )
}