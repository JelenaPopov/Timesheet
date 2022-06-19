import { InputType } from "../../app/custom-hooks/CustomFormHook";

interface IProps {
    inputs: InputType,
    onChange: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void,
    projectsOptions: JSX.Element,
    categoriesOptions: JSX.Element
}

export const LoggedHoursForm = ({inputs, onChange, projectsOptions, categoriesOptions}: IProps) => {

    return (
        <>
             <div className="mb-3">
                <label htmlFor="project" className="form-label">Project</label>
                <select className="form-control" value={inputs.project} name="project" id="project" onChange={onChange}>
                    <option key='-1' value='-1'>
                        --- Select option ---
                    </option>
                    {projectsOptions}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <select className="form-control" value={inputs.category} name="category" id="category" onChange={onChange}>
                    <option key='-1' value='-1'>
                        --- Select option ---
                    </option>
                    {categoriesOptions}
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
                    value={inputs.hours}
                    onChange={onChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                    className="form-control"
                    id="description"
                    placeholder="Description"
                    name="description"
                    value={inputs.description}
                    rows={3}
                    onChange={onChange} />
            </div>
        </>
    )
}