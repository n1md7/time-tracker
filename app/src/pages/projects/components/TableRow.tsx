import React, {useEffect} from 'react';
import {ButtonVariant, ConfirmModalType, Project} from '../../../types';
import {useDispatch} from 'react-redux';
import {resetModal, updateModal} from '../../../redux/actions';
import useRemove from '../../../hooks/modal/useRemove';
import Alert, {AlertType} from '../../../components/Alert';
import useFetchProjects from '../../../hooks/project/useFetchProjects';
import {VscChromeClose} from 'react-icons/vsc';
import {FiEdit} from 'react-icons/fi';
import ProjectUpdate from './ProjectUpdate';

export default function TableRow(props: Project & { index: number }) {
  const dispatch = useDispatch();
  const [removeRequest, removed, removeError, responseModified, disabled] = useRemove();
  const [fetchProjects] = useFetchProjects();
  const notEditable = props.createdBy !== props.userId;

  const removeHandler = () => {
    dispatch(updateModal({
      header: `Are you sure?`,
      body: `"${props.name}" is about to remove`,
      confirmButtonVariant: ButtonVariant.danger,
      confirmText: 'Confirm',
      show: true,
      closeHandler: () => dispatch(resetModal()),
      confirmHandler: async () => {
        dispatch(updateModal({confirmDisabled: true} as ConfirmModalType));
        await removeRequest(`v1/project/${props.id}`);
        dispatch(updateModal({confirmDisabled: false} as ConfirmModalType));
      },
    }));
  };

  const editHandler = () => {
    dispatch(updateModal({
      header: 'Update project',
      show: true,
      confirmButtonVariant: ButtonVariant.primary,
      confirmText: 'Update',
      body: <ProjectUpdate id={props.id} name={props.name} description={props.description}/>,
      closeHandler: () => dispatch(resetModal()),
      // This triggers submit in ProjectUpdate component
      // confirmDisabled change is being listened by top level component
      confirmHandler: () => dispatch(updateModal({confirmDisabled: true})),
    } as ConfirmModalType));
  };

  useEffect(() => {
    if (removed) {
      Alert(`Project "${props.name}" has been removed`, AlertType.SUCCESS);
      fetchProjects();
      dispatch(resetModal());
    }
    removeError && Alert(removeError, AlertType.ERROR);
  }, [responseModified]);


  return (
    <tr>
      <th scope="row">{props.index + 1}</th>
      <td>{props.name}</td>
      <td>
        {props.description}
      </td>
      <td colSpan={notEditable ? 2 : 1}>
        {props.teamName || (<del className="text-muted">not assigned</del>)}
      </td>
      {
        !notEditable && (
          <td className="text-right">
            <button className="btn btn-sm text-warning mr-md-1" title={'Edit'} onClick={editHandler}>
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