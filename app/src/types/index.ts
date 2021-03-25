export enum Token {
  name = "token"
}

export interface JoyErrorItem {
  context: {
    key: string;
    label: string;
    value: string;
  };
  message: string;
  path: string[];
  type: string
}

export interface ConfirmModalType {
  header?: string;
  body?: string | any;
  confirmText?: string;
  confirmButtonVariant?: ButtonVariant;
  show?: boolean;
  confirmDisabled?: boolean;
  closeHandler?: () => void;
  confirmHandler?: () => void;
}

export enum ButtonVariant {
  primary = 'primary',
  secondary = 'secondary',
  danger = 'danger'
}


export type Project = {
  id: number;
  name: string;
  description: string;
}

export type ProjectType = {
  all: Array<Project>
}

export type Team = {
  id: number;
  name: string;
  description: string;
}

export type TeamType = {
  all: Array<Team>
}