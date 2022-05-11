import { useSignInMutation } from '../../../app/apiSlice';
import useCustomForm from '../../../app/custom-hooks/CustomFormHook';
import { toast } from 'react-toastify';
import './SignIn.css';
import jwt_decode from "jwt-decode";

interface Props {
    setToken: React.Dispatch<React.SetStateAction<any>>,
    setUser: React.Dispatch<React.SetStateAction<any>>
}

export const SignIn = (props: Props) => {

    const [signIn] = useSignInMutation();

    const onSignIn = async () => {
        if ([inputs.username, inputs.password].every(Boolean)) {
            try {
                const payload = await signIn({ username: inputs.username, password: inputs.password }).unwrap();
                if (payload.token) {
                    props.setToken(payload.token)
                    props.setUser(jwt_decode(payload.token))
                }
            } catch (err) {
                toast.error("Invalid username or password", {
                    position: toast.POSITION.TOP_CENTER
                });
                handleResetForm()
            }
        }
    }

    const { inputs, handleInputChange, handleSubmit, handleResetForm } = useCustomForm(onSignIn, { "username": "", "password": "" });
    const canSave = [inputs.username, inputs.password].every(Boolean)

    return (
        <div className="row height-100 m-0 center-align sign-in-container">
            <div className="col-3 p-0">
                <div className="card">
                    <div className="sign-in-card-header container">
                        <h4 className="sign-in-card-title">Login</h4>
                    </div>
                    <div className="sign-in-card-body">
                        <div className="mb-3">
                            <input
                                type="text"
                                required
                                className="form-control"
                                id="username"
                                placeholder="Username"
                                name="username"
                                value={inputs.username}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                required
                                className="form-control"
                                id="password"
                                placeholder="Password"
                                name="password"
                                value={inputs.password}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="pt-3">
                            <button
                                type="button"
                                className="btn btn-primary confirm-btn"
                                disabled={!canSave}
                                onClick={handleSubmit}>
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
