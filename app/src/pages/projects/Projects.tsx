import React, {FormEvent, useEffect, useState} from "react";
import NavBar from "../../components/NavBar";
import useCreate from "../../hooks/project/useCreate";
import Alert, {AlertType} from "../../components/Alert";
import useInputChange from "../../hooks/useChange";
import ProjectTable from "./components/ProjectTable";
import useFetch from "../../hooks/project/useFetch";
import {Spinner} from "react-bootstrap";
import Required from "../../components/Required";

enum Field {
    name = 'name',
    description = 'description'
}

export default function Projects() {
    const [name, setName, resetName] = useInputChange('');
    const [description, setDescription, resetDescription] = useInputChange('');
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [createProjectHandler, isOk, authError, responseModified, disabled, errorFields] = useCreate();
    const [fetchProjects, projects] = useFetch();

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();
        await createProjectHandler({name, description});
        fetchProjects();
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
        fetchProjects();
    }, []);

    useEffect(() => {
        if (isOk) {
            Alert('New project created successfully');
            resetName();
            resetDescription();
        }
        authError && Alert(authError, AlertType.ERROR);
    }, [responseModified]);

    return (
        <NavBar>
            <div className="row">{/**/}</div>
            <div className="row mt-3 justify-content-center no-gutters">
                <div className="col-md-5">
                    <h3 className="my-3 text-center">Create project</h3>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <small className="form-text text-muted">New project name <Required/></small>
                            <input type="text"
                                   onChange={setName}
                                   className={showError(Field.name)}
                                   value={name}
                                   placeholder="Name"/>
                            <div className="invalid-feedback">
                                Please use at least 2 characters and max 32
                            </div>
                        </div>
                        <div className="form-group">
                            <small className="form-text text-muted">New project description</small>
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
                                {
                                    disabled? (
                                        <Spinner className="align-self-center" animation="border" variant="secondary" size="sm"/>
                                    ): 'Create'
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="row mt-3 justify-content-center no-gutters">
                <div className="col-md-5">
                    <h3 className="my-3 text-center">My projects</h3>
                    <ProjectTable projects={projects}/>
                </div>
            </div>
        </NavBar>
    );
}