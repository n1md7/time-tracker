import React, {useEffect} from "react";
import {ConfirmModalType, Team} from "../../../types";
import {useDispatch} from "react-redux";
import {updateModal} from "../../../redux/actions";
import useRemove from "../../../hooks/modal/useRemove";
import Alert, {AlertType} from "../../../components/Alert";
import useFetchTeam from "../../../hooks/team/useFetchTeam";

export default function TableRow({name, description, index, id}: Team & { index: number }) {
  const dispatch = useDispatch();
  const [removeRequest, removed, removeError, responseModified, disabled] = useRemove();
  const [fetchTeams] = useFetchTeam();

  const removeHandler = () => {
    dispatch(updateModal({
      header: `Are you sure?`,
      body: `"${name}" is about to remove`,
      show: true,
      closeHandler: () => dispatch(updateModal({show: false} as ConfirmModalType)),
      confirmHandler: async () => {
        dispatch(updateModal({confirmDisabled: disabled} as ConfirmModalType));
        await removeRequest(`v1/team/${id}`);
      }
    }));
  };

  useEffect(() => {
    if (removed) {
      Alert(`Team "${name}" has been removed`, AlertType.SUCCESS);
      fetchTeams();
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
        <button className="btn btn-sm btn-outline-primary mr-md-1">edit</button>
        <button className="btn btn-sm btn-outline-danger" onClick={removeHandler}>remove</button>
      </td>
    </tr>
  );
}