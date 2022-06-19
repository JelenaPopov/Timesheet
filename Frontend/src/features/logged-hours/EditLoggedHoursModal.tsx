import useCustomForm from "../../app/custom-hooks/CustomFormHook";
import EditModal from "../../app/modals/EditModal";
import { toast } from 'react-toastify';
import { useGetAllUserProjectsQuery, Project} from "../projects/projectsSlice";
import {useGetAllCategoriesQuery, Category} from "../categories/categoriesSlice";
import { LoggedHoursForm } from "./LoggedHoursForm";
import { LoggedHours, useEditLoggedHoursMutation } from "./loggedHoursSlice";
import moment from "moment";

interface IProps {
    loggedHours: LoggedHours,
    show: boolean,
    onClose: () => void,
    day: string | null
}

export const EditLoggedHoursModal = ({loggedHours, show, onClose, day}: IProps) => {
    let chosenLoggedHours = { id: loggedHours.id,version: loggedHours.version,
        hours: loggedHours.hours, description: loggedHours.description,
        project: loggedHours.project.id, category: loggedHours.category.id}

    const [editLoggedHours] = useEditLoggedHoursMutation();
    const {
        data: projects = []
    } = useGetAllUserProjectsQuery(day ? day : moment().format("yyyy-MM-DD"));

    const {
        data: categories = []
    } = useGetAllCategoriesQuery(null);

    const onSaveLoggedHoursClicked = async () => {
        if ([inputs.hours, inputs.category, inputs.project].every(Boolean)
            && inputs.category !== '-1'
            && inputs.project !== '-1') {
            try {
                const category = categories.find((el: Category) => el.id === parseInt(inputs.category));
                const project = projects.find((el: Project) => el.id === parseInt(inputs.project));

                await editLoggedHours({
                    id: loggedHours?.id, version: loggedHours?.version, hours: inputs.hours,
                    description: inputs.description, project: project, category: category, created: day
                }).unwrap();
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

    const { inputs, handleInputChange, handleSubmit, handleResetForm} = useCustomForm(onSaveLoggedHoursClicked, chosenLoggedHours);
    const canSave = [inputs.hours, inputs.category, inputs.project].every(Boolean) && inputs.category !== '-1' && inputs.project !== '-1';

    const projectsOptions =
        <>
            {projects.map((project: Project) => (
                <option key={project.id} value={project.id}>
                    {project.name}
                </option>
            ))}
        </>;

    const categoriesOptions =
        <>
            {categories.map((category: Category) => (
                <option key={category.id} value={category.id}>
                    {category.name}
                </option>
            ))}
        </>;

    return (
        <EditModal
            children={<LoggedHoursForm inputs={inputs} onChange={handleInputChange}
            projectsOptions={projectsOptions} categoriesOptions={categoriesOptions} />}
            show={show}
            onSave={handleSubmit}
            onClose={onClose}
            canSave={canSave}
            title="Edit Logged Hours"
            cssClasses="modal-dialog-lg" />
    )
}