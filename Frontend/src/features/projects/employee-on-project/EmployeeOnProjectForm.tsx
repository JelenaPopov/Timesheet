import { InputType } from "../../../app/custom-hooks/CustomFormHook";

interface IProps {
    inputs: InputType,
    onChange: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void,
    usersOptions: JSX.Element
}

export const EmployeeOnProjectForm = (props: IProps) => {

    return (
        <>
            <div className="mb-3">
                <label htmlFor="employee" className="form-label">Employee</label>
                <select className="form-control" value={props.inputs.employee} name="employee" id="employee" onChange={props.onChange}>
                    <option key='-1' value='-1'>
                        --- Select option ---
                    </option>
                    {props.usersOptions}
                </select>
            </div>
            <div className="mb-3">
                <div className="row">
                    <div className="col-6">
                        <label htmlFor="startDate" className="form-label">Start Date</label>
                        <input
                            type="date"
                            required
                            className="form-control"
                            id="startDate"
                            name="startDate"
                            value={props.inputs.startDate}
                            onChange={props.onChange} />
                    </div>
                    <div className="col-6">
                        <label htmlFor="endDate" className="form-label">End Date</label>
                        <input
                            type="date"
                            required
                            className="form-control"
                            id="endDate"
                            name="endDate"
                            value={props.inputs.endDate}
                            onChange={props.onChange} />
                    </div>
                </div>
            </div>

        </>
    )
}