import React, {useEffect} from "react";
import {ConfirmModalType, Project} from "../../../types";
import {useDispatch} from "react-redux";
import {updateModal} from "../../../redux/actions";
import useRemove from "../../../hooks/modal/useRemove";
import Alert, {AlertType} from "../../../components/Alert";
import useFetchProject from "../../../hooks/project/useFetchProject";
import {VscChromeClose} from 'react-icons/vsc';

export default function TableRow({name, description, index, id}: Project & { index: number }) {
  const dispatch = useDispatch();
  const [removeRequest, removed, removeError, responseModified, disabled] = useRemove();
  const [fetchProjects] = useFetchProject();

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
        {/*<button className="btn btn-sm btn-outline-primary mr-md-1">Edit</button>*/}
        <button className="btn btn-sm text-danger" title={'Remove'} onClick={removeHandler}>
          <VscChromeClose/>
        </button>
      </td>
    </tr>
  );
}