import React, {FormEvent, useEffect, useState} from 'react';
import NavBar from '../components/NavBar';
import {Form} from 'react-bootstrap';
import useFetchTeams from '../hooks/team/useFetchTeams';
import {httpClient} from '../services/HttpClient';
import {AxiosResponse} from 'axios';
import {JoyErrorItem} from '../types';
import Alert from '../components/Alert';

enum Field {
  teamId = 'teamId',
  email = 'email'
}

export default function Members() {
  const [fetchTeams, teams, fetching] = useFetchTeams();
  const [teamId, setTeamId] = useState<number>();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [email, setEmail] = useState<string>();
  const [errorFields, setErrorFields] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setSubmitted(true);
    httpClient
      .post<AxiosResponse, AxiosResponse<string | JoyErrorItem[]>>('v1/member/invite', {
        email, teamId,
      })
      .then((response) => {
        if (response.status === 201) {
          setErrorFields([]);
          Alert('Member invited');
          setEmail('');
          setTeamId(-1);
        } else {
          if (response.data instanceof Array) {
            const joyErrorItem = response.data as JoyErrorItem[];
            setErrorFields(joyErrorItem.map(({context: {key}}) => key));
          } else {
            setError(response.data as string);
            setErrorFields([]);
          }
        }
      })
      .catch(({message}) => {
        setError(message);
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
    fetchTeams();
  }, []);


  return (
    <NavBar>
      <div className="row mt-3 justify-content-center no-gutters">
        <div className="col-lg-5">
          <h3 className="my-3 text-center">Invite members</h3>
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <Form.Control
                disabled={fetching}
                value={teamId}
                as="select"
                className={showError(Field.teamId)}
                onChange={({target: {value}}) => setTeamId(Number(value))}
                custom>
                <option value="">{fetching ? 'Loading...' : 'Select team'}</option>
                {
                  teams.map(project => (
                    <option key={project.id} value={project.id}>{project.name}</option>
                  ))
                }
              </Form.Control>
              <div className="invalid-feedback">
                Please select the field
              </div>
            </div>
            <div className="form-group">
              <input
                placeholder={'Invitee email address'}
                value={email} onChange={({target: {value}}) => setEmail(value)}
                     type="text" className={showError(Field.email)}/>
              <div className="invalid-feedback">
                Please add a valid E-mail address
              </div>
            </div>
            <div className="form-group">
              <input type="submit" className="form-control btn btn-outline-primary" value="Invite"/>
            </div>
          </form>
        </div>
      </div>
    </NavBar>
  );
}