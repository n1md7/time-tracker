import React, {useEffect, useState} from 'react';
import Alert, {AlertType} from '../../../components/Alert';
import useInputChange from '../../../hooks/useChange';
import useFetchProjects from '../../../hooks/project/useFetchProjects';
import Required from '../../../components/Required';
import {useDispatch, useSelector} from 'react-redux';
import {RootReducer} from '../../../redux/reducers';
import useUpdateProject from '../../../hooks/project/useUpdateProject';
import {resetModal} from '../../../redux/actions';

enum Field {
  name = 'name',
  description = 'description'
}

type ProjectUpdateType = {
  name: string;
  description: string;
  id: number;
}

export default function ProjectUpdate(props: ProjectUpdateType) {
  const [name, setName, resetName] = useInputChange(props.name);
  const [description, setDescription, resetDescription] = useInputChange(props.description);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [updateProjectHandler, isOk, authError, responseModified, disabled, errorFields] = useUpdateProject();
  const [fetchProjects] = useFetchProjects();
  const confirmDisabled = useSelector((store: RootReducer) => store.modal.confirmDisabled);
  const dispatch = useDispatch();

  const submitHandler = async () => {
    await updateProjectHandler({id: props.id, name, description});
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
    if (confirmDisabled) {
      submitHandler().then(() => dispatch(resetModal()));
    }
  }, [confirmDisabled]);

  useEffect(() => {
    if (isOk) {
      Alert('Project updated successfully');
      resetName();
      resetDescription();
    }
    authError && Alert(authError, AlertType.ERROR);
  }, [responseModified]);

  return (
    <>
      <div className="row mt-3 justify-content-center no-gutters">
        <div className="col-12">
          <div className="form-group">
            <small className="form-text text-muted">Project name <Required/></small>
            <input
              type="text"
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
            <input
              onChange={setDescription} type="text"
              value={description}
              className={showError(Field.description)} placeholder="Description"/>
            <div className="invalid-feedback">
              Max characters allowed 512
            </div>
          </div>
        </div>
      </div>
    </>
  );
}