import {ButtonVariant, ConfirmModalType} from "../../types";

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
    console.log('You just clicked pre-configured close button');
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
