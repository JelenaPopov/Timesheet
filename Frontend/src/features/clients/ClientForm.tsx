import { InputType } from "../../app/custom-hooks/CustomFormHook"

interface IProps {
    inputs: InputType,
    onChange: (event: React.FormEvent<HTMLInputElement>) => void
}

export const ClientForm = ({inputs, onChange}: IProps) => {

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
                            value={inputs.firstName}
                            onChange={onChange} />
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
                            value={inputs.lastName}
                            onChange={onChange} />
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
                    value={inputs.country}
                    onChange={onChange} />
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
                            value={inputs.postalCode}
                            onChange={onChange} />
                    </div>
                    <div className="col-8">
                        <label htmlFor="city" className="form-label">City</label>
                        <input
                            type="text"
                            className="form-control"
                            id="city"
                            placeholder="City"
                            name="city"
                            value={inputs.city}
                            onChange={onChange} />
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
                    value={inputs.street}
                    onChange={onChange} />
            </div>
        </>
    )
}