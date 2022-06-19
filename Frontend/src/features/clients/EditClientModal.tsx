import useCustomForm from "../../app/custom-hooks/CustomFormHook";
import EditModal from "../../app/modals/EditModal";
import { Client, useEditClientMutation } from "./clientsSlice";
import { toast } from 'react-toastify';
import { ClientForm } from "./ClientForm";

interface IProps {
    client: Client,
    show: boolean,
    onClose: () => void
}

export const EditClientModal = ({client, show, onClose}: IProps) => {
    const [editClient] = useEditClientMutation();

    const onSaveClientClicked = async () => {
        if ([inputs.firstName, inputs.lastName].every(Boolean)) {
            try {
                await editClient({
                    id: client?.id, version: client?.version, firstName: inputs.firstName,
                    lastName: inputs.lastName, country: inputs.country, city: inputs.city, street: inputs.street, postalCode: inputs.postalCode
                }).unwrap();
                handleResetForm();
                onClose();
            } catch (err) {
                toast.error("Something goes wrong. Please try again!", {
                    position: toast.POSITION.TOP_CENTER
                });
                handleResetForm();
            }
        }
    }

    const { inputs, handleInputChange, handleSubmit, handleResetForm} = useCustomForm(onSaveClientClicked, client);
    const canSave = [inputs.firstName, inputs.lastName].every(Boolean);
    
    return (
        <EditModal
            children={<ClientForm inputs={inputs} onChange={handleInputChange} />}
            show={show}
            onSave={handleSubmit}
            onClose={onClose}
            canSave={canSave}
            title="Edit Client"
            cssClasses="modal-dialog-lg" />
    )
}