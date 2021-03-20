import React, {FormEvent, useEffect, useState} from "react";
import NavBar from "../../components/NavBar";
import useInputChange from "../../hooks/useChange";
import useCreate from "../../hooks/team/useCreate";
import useFetch from "../../hooks/team/useFetch";
import useFetchProjects from "../../hooks/project/useFetch";
import Alert, {AlertType} from "../../components/Alert";
import TeamTable from "../teams/components/TeamTable";
import {Form} from "react-bootstrap";
import {useSelector} from "react-redux";
import {RootReducer} from "../../redux/reducers";

enum Field {
    name = 'name',
    description = 'description',
    projectId = 'projectId'
}

export default function Teams() {
    const [name, setName, resetName] = useInputChange('');
    const [description, setDescription, resetDescription] = useInputChange('');
    const [projectId, setProjectId, resetProjectId] = useInputChange<number, any>(0);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [createTeamHandler, isOk, authError, responseModified, disabled, errorFields] = useCreate();
    const [fetchTeams, teams] = useFetch();
    const [fetchProjects, projects] = useFetchProjects();

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();
        await createTeamHandler({name, description, projectId});
        fetchTeams();
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
        fetchTeams();
        fetchProjects();
    }, []);

    useEffect(() => {
        if (isOk) {
            Alert('New team created successfully');
            resetName();
            resetDescription();
            resetProjectId();
        }
        authError && Alert(authError, AlertType.ERROR);
    }, [responseModified]);

    return (
        <NavBar>
            <div className="row">{/**/}</div>
            <div className="row mt-3 justify-content-center no-gutters">
                <div className="col-md-5">
                    <h3 className="my-3 text-center">Create team</h3>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <small className="form-text text-muted">New team name *</small>
                            <input type="text"
                                   onChange={setName}
                                   className={showError(Field.name)}
                                   value={name}
                                   placeholder="Name"/>
                            <div className="invalid-feedback">
                                Please use at least 2 characters and max 32
                            </div>
                        </div>
                        <Form.Group controlId="exampleForm.SelectCustomSizeSm">
                            <small className="form-text text-muted">Attach project *</small>
                            <Form.Control
                                value={projectId}
                                as="select"
                                className={showError(Field.projectId)}
                                onChange={setProjectId}
                                custom>
                                <option value="">Select project</option>
                                {
                                    projects.map(project => (
                                        <option key={project.id} value={project.id}>{project.name}</option>
                                    ))
                                }
                            </Form.Control>
                            <div className="invalid-feedback">
                                {
                                    projects.length ? 'Please select the field' : 'Create a project first'
                                }
                            </div>
                        </Form.Group>
                        <div className="form-group">
                            <small className="form-text text-muted">New team description</small>
                            <input onChange={setDescription} type="text"
                                   value={description}
                                   className={showError(Field.description)} placeholder="Description"/>
                            <div className="invalid-feedback">
                                Max characters allowed 512
                            </div>
                        </div>
                        <div className="form-group text-center">
                            <button disabled={disabled} type="submit"
                                    className="btn btn-primary w-100">
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="row mt-3 justify-content-center no-gutters">
                <div className="col-md-5">
                    <h3 className="my-3 text-center">My teams</h3>
                    <TeamTable teams={teams}/>
                </div>
            </div>
        </NavBar>
    );
}