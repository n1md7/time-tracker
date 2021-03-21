import useInputChange from "../hooks/useChange";
import React, {FormEvent, useEffect, useState} from "react";
import {useHistory} from "react-router";
import Alert, {AlertType} from "../components/Alert";
import {Link} from "react-router-dom";
import useRegister from "../hooks/useRegister";
import logo from "../img/logo.png";
import {Spinner} from "react-bootstrap";
import Required from "../components/Required";

enum Field {
  email = 'email',
  firstName = 'firstName',
  lastName = 'lastName',
  jobPosition = 'jobPosition',
  personalNumber = 'personalNumber',
  password = 'password',
  confirmPassword = 'confirmPassword'
}

export default function Registration() {
  const [firstName, setFirstName] = useInputChange('');
  const [lastName, setLastName] = useInputChange('');
  const [password, setPassword] = useInputChange('');
  const [email, setEmail] = useInputChange('');
  const [personalNumber, setPersonalNumber] = useInputChange('');
  const [jobPosition, setJobPosition] = useInputChange('');
  const [confirmPassword, setConfirmPassword] = useInputChange('');
  const [regHandler, isOk, regError, responseModified, disabled, errorFields] = useRegister();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const history = useHistory();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setSubmitted(true);
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
      Alert('You have signed up successfully!');
      history.push('/sign-in');
    }
    regError && Alert(regError, AlertType.ERROR);
  }, [responseModified]);

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
              <small className="form-text text-muted">Enter your E-mail <Required/></small>
              <input onChange={setEmail}
                     className={showError(Field.email)} placeholder="E-mail"/>
              <div className="invalid-feedback">
                Please use valid E-mail address
              </div>
            </div>
            <div className="form-group">
              <small className="form-text text-muted">Enter your First Name</small>
              <input onChange={setFirstName}
                     className={showError(Field.firstName)} placeholder="First name"/>
              <div className="invalid-feedback">
                Minimum 2 and maximum 32 alphabetic characters
              </div>
            </div>
            <div className="form-group">
              <small className="form-text text-muted">Enter your Last Name</small>
              <input onChange={setLastName}
                     className={showError(Field.lastName)} placeholder="Last name"/>
              <div className="invalid-feedback">
                Minimum 2 and maximum 32 alphabetic characters
              </div>
            </div>
            <div className="form-group">
              <small className="form-text text-muted">Enter your Job Position</small>
              <input onChange={setJobPosition}
                     className={showError(Field.jobPosition)} placeholder="Job position"/>
              <div className="invalid-feedback">
                Minimum 2 and maximum 128 alphabetic characters
              </div>
            </div>
            <div className="form-group">
              <small className="form-text text-muted">Enter your Personal Number</small>
              <input onChange={setPersonalNumber}
                     className={showError(Field.personalNumber)} placeholder="Personal number"/>
              <div className="invalid-feedback">
                Should be 11 numbers long. e.g 01234567890
              </div>
            </div>
            <div className="form-group">
              <small className="form-text text-muted">Enter your password <Required/></small>
              <input onChange={setPassword} type="password"
                     className={showError(Field.password)} placeholder="Password"/>
              <div className="invalid-feedback">
                Minimum 8 and maximum 128 characters
              </div>
            </div>
            <div className="form-group">
              <small className="form-text text-muted">Confirm your password <Required/></small>
              <input onChange={setConfirmPassword} type="password"
                     className={showError(Field.confirmPassword)} placeholder="Confirm password"/>
              <div className="invalid-feedback">
                Minimum 8 and maximum 128 characters
              </div>
            </div>
            <div className="form-group text-center">
              <button disabled={disabled} type="submit"
                      className="btn btn-outline-secondary w-100">
                {
                  disabled ? (
                    <Spinner className="align-self-center" animation="border" variant="secondary" size="sm"/>
                  ) : 'Sign up'
                }
              </button>
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
