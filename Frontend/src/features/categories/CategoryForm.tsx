import { InputType } from "../../app/custom-hooks/CustomFormHook"

interface IProps {
    inputs: InputType,
    onChange: (event: React.FormEvent<HTMLInputElement>) => void
}

export const CategoryForm = (props: IProps) => {

    return (
        <div className="mb-3">
            <label htmlFor="categoryName" className="form-label">Name</label>
            <input
                type="text"
                required
                className="form-control"
                id="categoryName"
                placeholder="Category name"
                name="name"
                value={props.inputs.name}
                onChange={props.onChange}
            />
        </div>
    )
}