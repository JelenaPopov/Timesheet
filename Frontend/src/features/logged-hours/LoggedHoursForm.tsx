import { InputType } from "../../app/custom-hooks/CustomFormHook";

interface IProps {
    inputs: InputType,
    onChange: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void,
    projectsOptions: JSX.Element,
    categoriesOptions: JSX.Element
}

export const LoggedHoursForm = (props: IProps) => {

    return (
        <>
             <div className="mb-3">
                <label htmlFor="project" className="form-label">Project</label>
                <select className="form-control" value={props.inputs.project} name="project" id="project" onChange={props.onChange}>
                    <option key='-1' value='-1'>
                        --- Select option ---
                    </option>
                    {props.projectsOptions}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <select className="form-control" value={props.inputs.category} name="category" id="category" onChange={props.onChange}>
                    <option key='-1' value='-1'>
                        --- Select option ---
                    </option>
                    {props.categoriesOptions}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Time</label>
                <input
                    type="number"
                    required
                    className="form-control"
                    id="hours"
                    placeholder="Time"
                    name="hours"
                    value={props.inputs.hours}
                    onChange={props.onChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                    className="form-control"
                    id="description"
                    placeholder="Description"
                    name="description"
                    value={props.inputs.description}
                    rows={3}
                    onChange={props.onChange} />
            </div>
        </>
    )
}