import React, {useEffect} from "react";
import {ConfirmModalType, Project} from "../../../types";
import {useDispatch} from "react-redux";
import {updateModal} from "../../../redux/actions";
import useRemove from "../../../hooks/modal/useRemove";
import Alert, {AlertType} from "../../../components/Alert";
import useFetchProjects from "../../../hooks/project/useFetchProjects";
import {VscChromeClose} from 'react-icons/vsc';
import {FiEdit} from 'react-icons/fi';
import ProjectUpdate from './ProjectUpdate';

export default function TableRow({name, description, index, id}: Project & { index: number }) {
  const dispatch = useDispatch();
  const [removeRequest, removed, removeError, responseModified, disabled] = useRemove();
  const [fetchProjects] = useFetchProjects();

  const removeHandler = () => {
    dispatch(updateModal({
      header: `Are you sure?`,
      body: `"${name}" is about to remove`,
      show: true,
      closeHandler: () => dispatch(updateModal({show: false})),
      confirmHandler: async () => {
        dispatch(updateModal({confirmDisabled: true} as ConfirmModalType));
        await removeRequest(`v1/project/${id}`);
        dispatch(updateModal({confirmDisabled: false} as ConfirmModalType));
      }
    }));
  };

  const editHandler = () => {
    dispatch(updateModal({
      header: 'Update project',
      show: true,
      body: <ProjectUpdate id={id} name={name} description={description}/>,
      closeHandler: () => dispatch(updateModal({show: false})),
      // This triggers submit in ProjectUpdate component
      confirmHandler: () => dispatch(updateModal({confirmDisabled: true}))
    } as ConfirmModalType));
  };

  useEffect(() => {
    if (removed) {
      Alert(`Project "${name}" has been removed`, AlertType.SUCCESS);
      fetchProjects();
      dispatch(updateModal({show: false} as ConfirmModalType));
    }
    removeError && Alert(removeError, AlertType.ERROR);
  }, [responseModified]);


  return (
    <tr>
      <th scope="row">{index + 1}</th>
      <td>{name}</td>
      <td>
        {description}
      </td>
      <td className="text-right">
        <button className="btn btn-sm text-warning mr-md-1" title={'Edit'} onClick={editHandler}>
          <FiEdit/>
        </button>
        <button className="btn btn-sm text-danger" title={'Remove'} onClick={removeHandler}>
          <VscChromeClose/>
        </button>
      </td>
    </tr>
  );
}