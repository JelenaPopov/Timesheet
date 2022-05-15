import useCustomForm from "../../../app/custom-hooks/CustomFormHook";
import { Project, useAddEmployeeOnProjectMutation} from "../projectsSlice";
import { toast } from 'react-toastify';
import { EmployeeOnProjectForm } from "./EmployeeOnProjectForm";
import { useGetAllUsersQuery, User } from "../../auth/usersSlice";
import EditModal from "../../../app/modals/EditModal";

interface IProps {
    project: Project | undefined,
    show: boolean,
    onClose: () => void
}

export const AddEmployeeOnProject = (props: IProps) => {
    const project = props.project;
    const [addEmployeeOnProject] = useAddEmployeeOnProjectMutation();

    const {
        data: users = []
    } = useGetAllUsersQuery(null);

    const onSaveProjectClicked = async () => {
        if ([inputs.employee, inputs.startDate, inputs.endDate].every(Boolean)
            && inputs.employee !== '-1') {
            try {
                const employee = users.find((el: User) => el.id === parseInt(inputs.employee));
                const data = {"id":null, "projectId": project?.id, "employee": employee,
                "startDate": inputs.startDate, "endDate": inputs.endDate};
                await addEmployeeOnProject(data).unwrap();

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

    const { inputs, handleInputChange, handleSubmit, handleResetForm } = useCustomForm(onSaveProjectClicked, { "employee": '-1', "startDate": "", "endDate": ""});
    const canSave = [inputs.employee, inputs.startDate, inputs.endDate].every(Boolean) && inputs.employee !== '-1';

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
            children={<EmployeeOnProjectForm inputs={inputs} onChange={handleInputChange} usersOptions={usersOptions} />}
            show={props.show}
            onSave={handleSubmit}
            onClose={props.onClose}
            canSave={canSave}
            title="New Project"
            cssClasses="modal-dialog-lg" />
    )
}