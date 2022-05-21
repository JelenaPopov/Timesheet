import useCustomForm from "../../app/custom-hooks/CustomFormHook";
import { useAddNewLoggedHoursMutation } from "./loggedHoursSlice";
import { toast } from 'react-toastify';
import { LoggedHoursForm } from "./LoggedHoursForm";
import AddModal from "../../app/modals/AddModal";
import { useGetAllUserProjectsQuery, Project} from "../projects/projectsSlice";
import {useGetAllCategoriesQuery, Category} from "../categories/categoriesSlice";

interface IProps {
    day: string | null
}

export const AddLoggedHoursModal = (props: IProps) => {
    const [addNewLoggedHours] = useAddNewLoggedHoursMutation();
    const {
        data: projects = []
    } = useGetAllUserProjectsQuery(null);

    const {
        data: categories = []
    } = useGetAllCategoriesQuery(null);

    const onSaveLoggedHoursClicked = async () => {
        if ([inputs.hours, inputs.category, inputs.project].every(Boolean)
            && inputs.category !== '-1'
            && inputs.project !== '-1') {
            try {

                const data = { ...inputs };
                const category = categories.find((el: Category) => el.id === parseInt(data.category));
                const project = projects.find((el: Project) => el.id === parseInt(data.project));
                data.category = category;
                data.project = project;
                data.created = props.day;
                await addNewLoggedHours(data).unwrap();
                handleResetForm();
            } catch (err) {
                toast.error("Something goes wrong. Please try again!", {
                    position: toast.POSITION.TOP_CENTER
                });
                handleResetForm();
            }
        }
    }

    const { inputs, handleInputChange, handleSubmit, handleResetForm } = useCustomForm(onSaveLoggedHoursClicked, { "hours": "", "description": "", "project": '-1', "category": '-1'});
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
        <AddModal
            children={<LoggedHoursForm inputs={inputs} onChange={handleInputChange}
                projectsOptions={projectsOptions} categoriesOptions={categoriesOptions} />}
            onSave={handleSubmit}
            onClose={handleResetForm}
            canSave={canSave}
            title="New Logged Hours"
            id="addLoggedHoursModal"
            cssClasses="modal-dialog-lg" />
    )
}