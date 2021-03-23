import React, {FormEvent, useEffect, useState} from "react";
import NavBar from "../../components/NavBar";
import useInputChange from "../../hooks/useChange";
import useCreateTeam from "../../hooks/team/useCreateTeam";
import useFetchTeams from "../../hooks/team/useFetchTeams";
import useFetchProjects from "../../hooks/project/useFetchProjects";
import Alert, {AlertType} from "../../components/Alert";
import TeamTable from "../teams/components/TeamTable";
import {Form, Spinner} from "react-bootstrap";
import Required from "../../components/Required";
import {useParams} from 'react-router';

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

  useEffect(() => {
    console.log(teamId)
  }, [])

  return (
    <NavBar>
      <div className="row">{/**/}</div>
      <div className="row mt-3 justify-content-center no-gutters">
        <div className="col-lg-5">
          <h3 className="my-3 text-center">Team information</h3>
          id {teamId}
          <form>
            <div className="form-group">
              <small className="form-text text-muted">Team name</small>
              <input
                type="text" className={'form-control'}
                placeholder="Name"/>
              <div className="invalid-feedback">
                Please use at least 2 characters and max 32
              </div>
            </div>
            <div className="form-group">
              <small className="form-text text-muted">Attach project</small>
              <Form.Control
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