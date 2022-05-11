import { useRef } from 'react';
import './Modal.css';

interface IProps {
    children: JSX.Element,
    onSave:  (event: React.MouseEvent<HTMLButtonElement>) => void,
    onClose:  (event: React.MouseEvent<HTMLButtonElement>) => void,
    title: String,
    id: string,
    canSave: boolean,
    cssClasses: String
}

const AddModal = (props: IProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={modalRef} className="modal" tabIndex={-1} id={props.id}>
            <div className={`modal-dialog ${props.cssClasses}`}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h4>{props.title}</h4>
                        <button 
                            type="button" 
                            className="btn-close" 
                            data-bs-dismiss="modal"
                            onClick={props.onClose} 
                            aria-label="Close">
                        </button>
                    </div>
                    <div className="modal-body">
                        {props.children}
                    </div>
                    <div className="modal-footer">
                        <button 
                            type="button" 
                            className="btn save-btn"
                            data-bs-dismiss="modal"
                            disabled={!props.canSave}
                            onClick={props.onSave}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddModal;