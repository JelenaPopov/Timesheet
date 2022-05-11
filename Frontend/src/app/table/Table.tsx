import './Table.css';

interface IProps {
    title: String,
    addModalId: String,
    header: JSX.Element,
    body: JSX.Element,
    page: number,
    totalPages: number,
    onSetPage: (page: number) => void
}


const Table = (props: IProps) => {
    return (
        <div className="card">
            <div className="card-header container">
                <div className="row">
                    <div className="col-10">
                        <h4 className="card-title">{props.title}</h4>
                    </div>
                    <div className="col-2">
                        <button className="btn btn-md add-btn" data-bs-toggle="modal" data-bs-target={props.addModalId}>Create New</button>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <table className="table table-striped">
                    <thead>
                        {props.header}
                    </thead>
                    <tbody>
                        {props.body}
                    </tbody>
                </table>

                <div className="container">
                    <div className="row">
                        <div className="col-2">
                            {props.page > 1 && <button className="btn bold" onClick={() => props.onSetPage(props.page - 1)}>&lt; Previous</button>}
                        </div>
                        <div className="col-8">
                            <span className="current-page bold">{props.page} of {props.totalPages} </span>
                        </div>
                        <div className="col-2">
                            {props.page < props.totalPages && <button className="btn bold next-btn" onClick={() => props.onSetPage(props.page + 1)}>Next &gt;</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Table;