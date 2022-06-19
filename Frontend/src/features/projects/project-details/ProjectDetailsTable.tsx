import { useNavigate } from 'react-router-dom';
import './ProjectDetailsTable.css';

interface IProps {
    title: String,
    header: JSX.Element,
    body: JSX.Element,
    page: number,
    totalPages: number,
    onSetPage: (page: number) => void,
}

const ProjectDetailsTable = ({title, header, body, page, totalPages, onSetPage}: IProps) => {
    const navigate = useNavigate();

    return (
        <div className="card">
            <div className="card-header container">
                <div className="row">
                    <div className="col-2">
                        <button className="btn btn-md back-btn" title="Back to Project List" onClick={() => navigate("/projects")}> &lt;&lt; Back </button>
                    </div>
                    <div className="col-8">
                        <h2 className="project-title">'{title}' employees</h2>
                    </div>
                    <div className="col-2">
                        &nbsp;
                    </div>
                </div>
            </div>
            <div className="card-body">
                <table className="table table-striped">
                    <thead>
                        {header}
                    </thead>
                    <tbody>
                        {body}
                    </tbody>
                </table>

                <div className="container">
                    <div className="row">
                        <div className="col-2">
                            {page > 1 && <button className="btn bold" onClick={() => onSetPage(page - 1)}>&lt; Previous</button>}
                        </div>
                        <div className="col-8">
                            <span className="current-page bold">{page} of {totalPages} </span>
                        </div>
                        <div className="col-2">
                            {page < totalPages && <button className="btn bold next-btn" onClick={() => onSetPage(page + 1)}>Next &gt;</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ProjectDetailsTable;