import {ButtonVariant, ConfirmModalType} from "../../types";
import {store} from "../../index";
import {updateModal} from '../actions';

export enum ModalAction {
  update = 'modal-update'
}

type ModalActionType = {
  type: ModalAction;
}

const modal = (state: ConfirmModalType = {
  header: '...',
  body: '...',
  confirmText: 'Confirm',
  confirmButtonVariant: ButtonVariant.danger,
  show: false,
  confirmDisabled: false,
  closeHandler: () => {
    store.dispatch(updateModal({show: false} as ConfirmModalType));
  },
  confirmHandler: () => {
    console.log('You just clicked pre-configured confirm button');
  }
}, {type, ...rest}: ModalActionType) => {
  switch (type) {
    case ModalAction.update:
      return {
        ...state,
        ...rest
      };
    default:
      return state;
  }
}

export default modal;
