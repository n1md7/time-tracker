import useInputChange from "../hooks/useChange";
import React, {FormEvent, useEffect, useState} from "react";
import useAuthenticate from "../hooks/useAuthenticate";
import {useHistory} from "react-router";
import Alert, {AlertType} from "../components/Alert";
import {Link} from "react-router-dom";
import logo from "../img/logo.png";

enum Field {
    email = 'email',
    password = 'password'
}

export default function Authentication() {
    const [email, setEmail] = useInputChange('');
    const [password, setPassword] = useInputChange('');
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [authHandler, isOk, authError, responseModified, disabled, errorFields] = useAuthenticate();
    const history = useHistory();

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();
        authHandler({email, password});
        setSubmitted(true);
    };

    const showError = (field: Field): string => {
        if (submitted) {
            if (errorFields.includes(field)) {
                return 'form-control is-invalid';
            }
        }

        return 'form-control';
    };

    useEffect(() => {
        if (isOk) {
            return history.push('/');
        }
        authError && Alert(authError, AlertType.ERROR);
    }, [responseModified]);

    return (
        <div className="container">
            <div className="row mt-5 justify-content-center">
                <div className="col-md-5 text-center">
                    <img className="App-logo" src={logo} alt="logo.png"/>
                </div>
                <div className="col-12">{/**/}</div>
                <div className="col-md-5">
                    <h3 className="my-3 text-center">User Authentication</h3>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <small className="form-text text-muted">Enter your E-mail address</small>
                            <input type="email"
                                   onChange={setEmail}
                                   className={showError(Field.email)}
                                   placeholder="E-mail"/>
                            <div className="invalid-feedback">
                                Please use valid E-mail address
                            </div>
                        </div>
                        <div className="form-group">
                            <small className="form-text text-muted">Enter your password</small>
                            <input onChange={setPassword} type="password"
                                   className={showError(Field.password)} placeholder="Password"/>
                            <div className="invalid-feedback">
                                Password must be at least 8 characters long
                            </div>
                        </div>
                        <div className="form-group text-center">
                            <button disabled={disabled} type="submit"
                                    className="btn btn-primary w-100">
                                Authenticate
                            </button>
                        </div>
                        <div className="form-group text-center">
                            <Link className="create-account" to={{
                                pathname: "/sign-up"
                            }}>No account? Create one.</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
