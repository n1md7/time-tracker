import React, {FormEvent, useEffect} from "react";
import NavBar from "../../components/NavBar";
import useInputChange from "../../hooks/useChange";
import {Form} from "react-bootstrap";
import {useParams} from 'react-router';
import useFetchTeamById from '../../hooks/team/useFetchTeamById';
import Loading from '../../components/Loading';

enum Field {
  name = 'name',
  description = 'description',
  projectId = 'projectId'
}

type GetParamType = {
  teamId: string
}

export default function Team() {
  const {teamId} = useParams<GetParamType>();
  const [fetch, info, fetching] = useFetchTeamById();
  const [name, setName] = useInputChange('');
  const [description, setDescription] = useInputChange('');
  const [project, setProject] = useInputChange<number>(-1);

  useEffect(() => {
    fetch(teamId);
  }, []);

  useEffect(() => {
    if (info) {
      setName({currentTarget: {value: info.name}} as React.FormEvent<HTMLInputElement>);
      setDescription({currentTarget: {value: info.description}} as React.FormEvent<HTMLInputElement>);
      // setProject({currentTarget: {value: info.projectId as number}} as React.FormEvent<HTMLInputElement>);
    }
  }, [info]);

  if (fetching) {
    return <Loading/>;
  }

  return (
    <NavBar>
      <div className="row">{/**/}</div>
      <div className="row mt-3 justify-content-center no-gutters">
        <div className="col-lg-5">
          <h3 className="my-3 text-center">Team information</h3>
          <form>
            <div className="form-group">
              <small className="form-text text-muted">Team name</small>
              <input
                value={name}
                type="text" className={'form-control'}
                placeholder="Name"/>
              <div className="invalid-feedback">
                Please use at least 2 characters and max 32
              </div>
            </div>
            <div className="form-group">
              <small className="form-text text-muted">Attach project</small>
              <Form.Control
                value={project}
                as="select"
                className={'form-control'}
                custom>
                <option value="">{'Select project'}</option>
              </Form.Control>
              <div className="invalid-feedback">
                Please select the field
              </div>
            </div>
            <div className="form-group">
              <small className="form-text text-muted">Team description</small>
              <input
                value={description}
                type="text" className={'form-control'}
                placeholder="Description"/>
              <div className="invalid-feedback">
                Please use at least 2 characters and max 32
              </div>
            </div>
            <div className="form-group text-center">
              <button type="submit"
                      className="btn btn-primary w-100">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </NavBar>
  );
}