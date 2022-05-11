import { useEffect, useRef } from 'react';
import './Modal.css';

interface IProps {
    children: JSX.Element,
    show: boolean,
    onSave: (event: React.MouseEvent<HTMLButtonElement>) => void,
    onClose: (event: React.MouseEvent<HTMLButtonElement>) => void,
    title: String,
    canSave: boolean,
    cssClasses: String
}

const EditModal = (props: IProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(
        () => {
            if (modalRef && modalRef?.current) {
                if (props.show) {
                    modalRef.current.style.display = "block";
                    modalRef.current.classList.add("show");
                }
                else {
                    modalRef.current.style.display = "none";
                    modalRef.current.classList.remove("show");
                }
            }
        },
        [
            props.show
        ]
    );

    return (
        <div ref={modalRef} className="modal" tabIndex={-1}>
            <div className={`modal-dialog ${props.cssClasses}`}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h4>{props.title}</h4>
                        <button
                            type="button"
                            className="btn-close"
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

export default EditModal;