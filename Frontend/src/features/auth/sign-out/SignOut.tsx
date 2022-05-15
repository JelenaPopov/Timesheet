import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { setNewValue } from "../authSlice";
import './SignOut.css';

export const SignOut = () => {
    const dispatch = useAppDispatch();

    const signOut = () => {
        window.localStorage.removeItem('token');
        dispatch(setNewValue(null));
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
