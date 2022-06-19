import { InputType } from "../../app/custom-hooks/CustomFormHook";

interface IProps {
    inputs: InputType,
    onChange: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void,
    clientsOptions: JSX.Element,
    usersOptions: JSX.Element
}

export const ProjectForm = ({inputs, onChange, clientsOptions, usersOptions}: IProps) => {

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
                    value={inputs.name}
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

            <div className="mb-3">
                <label htmlFor="client" className="form-label">Client</label>
                <select className="form-control" value={inputs.client} name="client" id="client" onChange={onChange}>
                    <option key='-1' value='-1'>
                        --- Select option ---
                    </option>
                    {clientsOptions}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="teamLead" className="form-label">Team Lead</label>
                <select className="form-control" value={inputs.teamLead} name="teamLead" id="teamLead" onChange={onChange}>
                    <option key='-1' value='-1'>
                        --- Select option ---
                    </option>
                    {usersOptions}
                </select>
            </div>
        </>
    )
}