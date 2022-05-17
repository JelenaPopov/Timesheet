import useCustomForm from "../../app/custom-hooks/CustomFormHook";
import EditModal from "../../app/modals/EditModal";
import { Category, useEditCategoryMutation } from "./categoriesSlice";
import { toast } from 'react-toastify';
import { CategoryForm } from "./CategoryForm";

interface IProps {
    category: Category,
    show: boolean,
    onClose: () => void
}

export const EditCategoryModal = (props: IProps) => {
    const category = props.category;
    const [editCategory] = useEditCategoryMutation();

    const onSaveCategoryClicked = async () => {
        if ([inputs.name].every(Boolean)) {
            try {
                await editCategory({ id: category?.id, version: category?.version, name: inputs.name }).unwrap();
                handleResetForm();
                props.onClose();
            } catch (err) {
                toast.error("Category with same name already exists!", {
                    position: toast.POSITION.TOP_CENTER
                });
                handleResetForm();
            }
        }
    }

    const { inputs, handleInputChange, handleSubmit, handleResetForm} = useCustomForm(onSaveCategoryClicked, props.category);
    const canSave = [inputs.name].every(Boolean);
   
    return (
        <EditModal
            children={<CategoryForm inputs={inputs} onChange={handleInputChange} />}
            show={props.show}
            onSave={handleSubmit}
            onClose={props.onClose}
            canSave={canSave}
            title="Edit Category"
            cssClasses="modal-dialog-md" />
    )
}