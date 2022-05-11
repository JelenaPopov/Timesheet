import { Link } from "react-router-dom";
import './SignOut.css';

interface Props {
    setToken: React.Dispatch<React.SetStateAction<any>>,
    setUser: React.Dispatch<React.SetStateAction<any>>
}

export const SignOut = (props: Props) => {

    const signOut = () => {
        props.setUser(null);
        props.setToken(null);
    }


    return (
        <div className="sign-out-span">
            <hr />
            <Link to="/login" onClick={signOut} key="signOut" className="text-white link">
                <li className="nav-link text-white">
                    <i className="bi bi-power icon" />Sign Out
                </li>
            </Link >
        </div>
    )
}
