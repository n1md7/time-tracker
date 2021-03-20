import {ButtonVariant, ConfirmModalType} from "../../types";

export enum ModalAction {
    update = 'update'
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
    },
    confirmHandler: () => {
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
