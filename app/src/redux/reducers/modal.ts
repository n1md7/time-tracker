import {ButtonVariant, ConfirmModalType} from '../../types';

export enum ModalAction {
  update = 'modal-update',
  reset = 'modal-reset',
}

type ModalActionType = {
  type: ModalAction;
}

const modalDefaultState = {
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
  },
};

const modal = (state: ConfirmModalType = modalDefaultState, {type, ...rest}: ModalActionType) => {
  switch (type) {
    case ModalAction.update:
      return {
        ...state,
        ...rest,
      };
    case ModalAction.reset:
      return modalDefaultState;
    default:
      return state;
  }
};

export default modal;
