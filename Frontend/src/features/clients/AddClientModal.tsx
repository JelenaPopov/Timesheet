import useCustomForm from "../../app/custom-hooks/CustomFormHook";
import AddModal from "../../app/modals/AddModal";
import { useAddNewClientMutation } from "./clientsSlice";
import { toast } from 'react-toastify';
import { ClientForm } from "./ClientForm";

export const AddClientModal = () => {
    const [addNewClient] = useAddNewClientMutation();

    const onSaveClientClicked = async () => {
        if ([inputs.firstName, inputs.lastName].every(Boolean)) {
            try {
                await addNewClient(inputs).unwrap()
                handleResetForm()
            } catch (err) {
                toast.error("Something goes wrong. Please try again!", {
                    position: toast.POSITION.TOP_CENTER
                });
                handleResetForm()
            }
        }
    }

    const { inputs, handleInputChange, handleSubmit, handleResetForm } = useCustomForm(onSaveClientClicked, { "firstName": "", "lastName": "", "country": "", "city": "", "street": "", "postalCode": "" });
    const canSave = [inputs.firstName, inputs.lastName].every(Boolean);

    return (
        <AddModal
            children={<ClientForm inputs={inputs} onChange={handleInputChange} />}
            onSave={handleSubmit}
            onClose={handleResetForm}
            canSave={canSave}
            title="New Client"
            id="addClientModal" 
            cssClasses="modal-dialog-lg"/>
    )
}