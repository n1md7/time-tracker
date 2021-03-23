import useInputChange from "../hooks/useChange";
import React, {FormEvent, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router";
import Alert, {AlertType} from "../components/Alert";
import {Link} from "react-router-dom";
import useRegister from "../hooks/useRegister";
import logo from "../img/logo.png";
import {Spinner} from "react-bootstrap";
import Required from "../components/Required";
import useInvite from '../hooks/useInvite';
import Loading from '../components/Loading';

enum Field {
  email = 'email',
  firstName = 'firstName',
  lastName = 'lastName',
  jobPosition = 'jobPosition',
  personalNumber = 'personalNumber',
  password = 'password',
  confirmPassword = 'confirmPassword',
  termsAgreed = 'termsAgreed'
}

export default function Registration() {
  const [firstName, setFirstName] = useInputChange('');
  const [lastName, setLastName] = useInputChange('');
  const [password, setPassword] = useInputChange('');
  const [email, setEmail] = useInputChange('');
  const [personalNumber, setPersonalNumber] = useInputChange('');
  const [jobPosition, setJobPosition] = useInputChange('');
  const [confirmPassword, setConfirmPassword] = useInputChange('');
  const [termsAgreed, setTermsAgreed] = useState<boolean>(false);
  const [regHandler, isOk, regError, responseModified, disabled, errorFields] = useRegister();
  const [fetchEmailByInviteKey, inviteIsOk, inviteError, fetchingInviteInfo, fetchedEmail, fetchModified] = useInvite();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const history = useHistory();
  const params = useParams<{ invitationKey: string }>();

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
      jobPosition,
      termsAgreed
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
    if (inviteError) {
      Alert(inviteError, AlertType.ERROR);
    }
    if (inviteIsOk) {
      setEmail({currentTarget: {value: fetchedEmail}} as React.FormEvent<HTMLInputElement>);
    }
  }, [fetchModified]);

  useEffect(() => {
    if (params.invitationKey) {
      fetchEmailByInviteKey(params.invitationKey);
    }
    if (isOk) {
      Alert('You have signed up successfully!');
      history.push('/sign-in');
    }
    regError && Alert(regError, AlertType.ERROR);
  }, [responseModified]);

  if (params.invitationKey && fetchingInviteInfo) {
    return <Loading/>;
  }

  return (
    <div className="container">
      <div className="row mt-5 justify-content-center">
        <div className="col-lg-6 text-center">
          <img className="App-logo" src={logo} alt="logo.png"/>
        </div>
        <div className="col-12">{/**/}</div>
        <div className="col-lg-5">
          <h3 className="my-3 text-center">User Registration</h3>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <small className="form-text text-muted">Enter your E-mail <Required/></small>
              <input
                onChange={setEmail} disabled={inviteIsOk} value={email}
                className={showError(Field.email)} placeholder="E-mail"/>
              <div className="invalid-feedback">
                Please use valid E-mail address
              </div>
            </div>
            <div className="form-group">
              <small className="form-text text-muted">Enter your password <Required/></small>
              <input
                onChange={setPassword} type="password" value={password}
                className={showError(Field.password)} placeholder="Password"/>
              <div className="invalid-feedback">
                Minimum 8 and maximum 128 characters
              </div>
            </div>
            <div className="form-group">
              <small className="form-text text-muted">Confirm your password <Required/></small>
              <input
                onChange={setConfirmPassword} type="password" value={confirmPassword}
                className={showError(Field.confirmPassword)} placeholder="Confirm password"/>
              <div className="invalid-feedback">
                Minimum 8 and maximum 128 characters
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-lg-6">
                <small className="form-text text-muted">Enter your First Name</small>
                <input
                  onChange={setFirstName} value={firstName}
                  className={showError(Field.firstName)} placeholder="First name"/>
                <div className="invalid-feedback">
                  Minimum 2 and maximum 32 alphabetic characters
                </div>
              </div>
              <div className="form-group col-lg-6">
                <small className="form-text text-muted">Enter your Last Name</small>
                <input
                  onChange={setLastName} value={lastName}
                  className={showError(Field.lastName)} placeholder="Last name"/>
                <div className="invalid-feedback">
                  Minimum 2 and maximum 32 alphabetic characters
                </div>
              </div>
            </div>
            <div className="form-group">
              <small className="form-text text-muted">Enter your Job Position</small>
              <input
                onChange={setJobPosition} value={jobPosition}
                className={showError(Field.jobPosition)} placeholder="Job position"/>
              <div className="invalid-feedback">
                Minimum 2 and maximum 128 alphabetic characters
              </div>
            </div>
            <div className="form-group">
              <small className="form-text text-muted">Enter your Personal Number</small>
              <input
                onChange={setPersonalNumber} value={personalNumber}
                className={showError(Field.personalNumber)} placeholder="Personal number"/>
              <div className="invalid-feedback">
                Should be 11 numbers long. e.g 01234567890
              </div>
            </div>
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox" id="terms"
                onClick={() => setTermsAgreed(!termsAgreed)}
                className={`${showError(Field.termsAgreed)} custom-control-input`}
              />
              <label className="custom-control-label" htmlFor="terms">
                I agree terms and conditions <Required/>
              </label>
              <div className="invalid-feedback">
                You need to agree terms and conditions
              </div>
            </div>
            <div className="form-group text-center mt-4">
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
