import { InputType } from "../../app/custom-hooks/CustomFormHook";

interface IProps {
    inputs: InputType,
    onChange: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void,
    clientsOptions: JSX.Element,
    usersOptions: JSX.Element
}

export const ProjectForm = (props: IProps) => {

    return (
        <>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                    type="text"
                    required
                    className="form-control"
                    id="name"
                    placeholder="Name"
                    name="name"
                    value={props.inputs.name}
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

            <div className="mb-3">
                <label htmlFor="client" className="form-label">Client</label>
                <select className="form-control" value={props.inputs.client} name="client" id="client" onChange={props.onChange}>
                    <option key='-1' value='-1'>
                        --- Select option ---
                    </option>
                    {props.clientsOptions}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="teamLead" className="form-label">Team Lead</label>
                <select className="form-control" value={props.inputs.teamLead} name="teamLead" id="teamLead" onChange={props.onChange}>
                    <option key='-1' value='-1'>
                        --- Select option ---
                    </option>
                    {props.usersOptions}
                </select>
            </div>
        </>
    )
}