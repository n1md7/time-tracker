import useInputChange from "../hooks/useChange";
import React, {useEffect} from "react";
import {useHistory} from "react-router";
import Alert, {AlertType} from "../components/Alert";
import {Link} from "react-router-dom";
import useRegister from "../hooks/useRegister";
import logo from "../img/logo.png";

export default function Registration() {
    const [firstName, setFirstName] = useInputChange('');
    const [lastName, setLastName] = useInputChange('');
    const [password, setPassword] = useInputChange('');
    const [email, setEmail] = useInputChange('');
    const [personalNumber, setPersonalNumber] = useInputChange('');
    const [jobPosition, setJobPosition] = useInputChange('');
    const [confirmPassword, setConfirmPassword] = useInputChange('');
    const [regHandler, isOk, regError, responseModifed] = useRegister();
    const history = useHistory();

    const onSubmit = (e) => {
        e.preventDefault();
        regHandler({
            firstName,
            lastName,
            password,
            email,
            confirmPassword,
            personalNumber,
            jobPosition
        });
    };

    useEffect(() => {
        if (isOk) {
            Alert('You have signed up successfully!');
            history.push('/sign-in');
        }
        regError && Alert(regError, AlertType.ERROR);
    }, [responseModifed]);

    return (
        <div className="container">
            <div className="row mt-5 justify-content-center">
                <div className="col-md-5 text-center">
                    <img className="App-logo" src={logo} alt="logo.png"/>
                </div>
                <div className="col-12">{/**/}</div>
                <div className="col-md-5">
                    <h3 className="my-3 text-center">User Registration</h3>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <input minLength={5} onChange={setEmail}
                                   className="form-control" placeholder="E-mail"/>
                            <small className="form-text text-muted">Enter your E-mail</small>
                        </div>
                        <div className="form-group">
                            <input minLength={5} onChange={setFirstName}
                                   className="form-control" placeholder="First name"/>
                            <small className="form-text text-muted">Enter your First Name</small>
                        </div>
                        <div className="form-group">
                            <input minLength={5} onChange={setLastName}
                                   className="form-control" placeholder="Last name"/>
                            <small className="form-text text-muted">Enter your Last Name</small>
                        </div>
                        <div className="form-group">
                            <input minLength={5} onChange={setJobPosition}
                                   className="form-control" placeholder="Job position"/>
                            <small className="form-text text-muted">Enter your Job Position</small>
                        </div>
                        <div className="form-group">
                            <input minLength={5} onChange={setPersonalNumber}
                                   className="form-control" placeholder="Personal number"/>
                            <small className="form-text text-muted">Enter your Personal Number</small>
                        </div>
                        <div className="form-group">
                            <input minLength={8} onChange={setPassword} type="password"
                                   className="form-control" placeholder="Password"/>
                            <small className="form-text text-muted">Enter your password</small>
                        </div>
                        <div className="form-group">
                            <input minLength={8} onChange={setConfirmPassword} type="password"
                                   className="form-control" placeholder="Confirm password"/>
                            <small className="form-text text-muted">Confirm your password</small>
                        </div>
                        <div className="form-group text-center">
                            <button type="submit" className="btn btn-outline-secondary form-control">Sign up</button>
                        </div>
                        <div className="form-group text-center">
                            <Link className="create-account" to={{
                                pathname: "/sign-in"
                            }}>Already have an account? Sign in.</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
