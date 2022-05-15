import './Spinner.css';

export const Spinner = () => {
    return (
        <div className="d-flex justify-content-center spinner-container">
            <div className="spinner-border spinner" role="status">
            </div>
        </div>
    )
}
