import React, {useEffect} from 'react';
import {ConfirmModalType, Team} from '../../../types';
import {useDispatch} from 'react-redux';
import {updateModal} from '../../../redux/actions';
import useRemove from '../../../hooks/modal/useRemove';
import Alert, {AlertType} from '../../../components/Alert';
import useFetchTeams from '../../../hooks/team/useFetchTeams';
import {VscChromeClose} from 'react-icons/vsc';
import {Link} from 'react-router-dom';
import {FiEdit} from 'react-icons/fi';

export default function TableRow(props: Team & { index: number }) {
  const dispatch = useDispatch();
  const [removeRequest, removed, removeError, responseModified, disabled] = useRemove();
  const notEditable = props.createdBy !== props.userId;
  const [fetchTeams] = useFetchTeams();

  const removeHandler = () => {
    dispatch(updateModal({
      header: `Are you sure?`,
      body: `"${props.name}" is about to remove`,
      show: true,
      closeHandler: () => dispatch(updateModal({show: false} as ConfirmModalType)),
      confirmHandler: async () => {
        dispatch(updateModal({confirmDisabled: true} as ConfirmModalType));
        await removeRequest(`v1/team/${props.id}`);
        dispatch(updateModal({confirmDisabled: false} as ConfirmModalType));
      },
    }));
  };

  useEffect(() => {
    if (removed) {
      Alert(`Team "${props.name}" has been removed`, AlertType.SUCCESS);
      fetchTeams();
      dispatch(updateModal({show: false} as ConfirmModalType));
    }
    removeError && Alert(removeError, AlertType.ERROR);
  }, [responseModified]);


  return (
    <tr>
      <th scope="row">{props.index + 1}</th>
      <td>
        <Link className="" to={{pathname: `/team/${props.id}`}}>{props.name}</Link>
      </td>
      <td colSpan={notEditable ? 2 : 1}>
        {props.description}
      </td>
      {
        !notEditable && (
          <td className="text-right">
            <button className="btn btn-sm text-warning mr-md-1" title={'Edit'}>
              <FiEdit/>
            </button>
            <button className="btn btn-sm text-danger" title={'Remove'} onClick={removeHandler}>
              <VscChromeClose/>
            </button>
          </td>
        )
      }
    </tr>
  );
}