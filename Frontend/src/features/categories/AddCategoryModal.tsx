import useCustomForm from "../../app/custom-hooks/CustomFormHook";
import AddModal from "../../app/modals/AddModal";
import { useAddNewCategoryMutation } from "./categoriesSlice";
import { toast } from 'react-toastify';
import { CategoryForm } from "./CategoryForm";

export const AddCategoryModal = () => {
    const [addNewCategory] = useAddNewCategoryMutation();

    const onSaveCategoryClicked = async () => {
        if ([inputs.name].every(Boolean)) {
            try {
                await addNewCategory(inputs).unwrap();
                handleResetForm();
            } catch (err) {
                toast.error("Category with same name already exists!", {
                    position: toast.POSITION.TOP_CENTER
                });
                handleResetForm();
            }
        }
    }

    const { inputs, handleInputChange, handleSubmit, handleResetForm } = useCustomForm(onSaveCategoryClicked, { "name": "" });
    const canSave = [inputs.name].every(Boolean);

    return (
        <AddModal
            children={<CategoryForm inputs={inputs} onChange={handleInputChange} />}
            onSave={handleSubmit}
            onClose={handleResetForm}
            canSave={canSave}
            title="New Category"
            id="addCategoryModal" 
            cssClasses="modal-dialog-md" />
    )
}