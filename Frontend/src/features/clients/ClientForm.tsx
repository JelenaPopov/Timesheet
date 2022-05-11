import { InputType } from "../../app/custom-hooks/CustomFormHook"

interface IProps {
    inputs: InputType,
    onChange: (event: React.FormEvent<HTMLInputElement>) => void
}

export const ClientForm = (props: IProps) => {

    return (
        <>
            <div className="mb-3">
                <div className="row">
                    <div className="col-6">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            id="firstName"
                            placeholder="First Name"
                            name="firstName"
                            value={props.inputs.firstName}
                            onChange={props.onChange} />
                    </div>
                    <div className="col-6">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            id="lastName"
                            placeholder="Last Name"
                            name="lastName"
                            value={props.inputs.lastName}
                            onChange={props.onChange} />
                    </div>
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="country" className="form-label">Country</label>
                <input
                    type="text"
                    className="form-control"
                    id="country"
                    placeholder="Country"
                    name="country"
                    value={props.inputs.country}
                    onChange={props.onChange} />
            </div>
            <div className="mb-3">
                <div className="row">
                    <div className="col-4">
                        <label htmlFor="postalCode" className="form-label">Postal Code</label>
                        <input
                            type="text"
                            className="form-control"
                            id="postalCode"
                            placeholder="Postal Code"
                            name="postalCode"
                            value={props.inputs.postalCode}
                            onChange={props.onChange} />
                    </div>
                    <div className="col-8">
                        <label htmlFor="city" className="form-label">City</label>
                        <input
                            type="text"
                            className="form-control"
                            id="city"
                            placeholder="City"
                            name="city"
                            value={props.inputs.city}
                            onChange={props.onChange} />
                    </div>
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="street" className="form-label">Street</label>
                <input
                    type="text"
                    className="form-control"
                    id="street"
                    placeholder="Street"
                    name="street"
                    value={props.inputs.street}
                    onChange={props.onChange} />
            </div>
        </>
    )
}