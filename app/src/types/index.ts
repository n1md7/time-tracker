export enum Token {
  name = 'token'
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

export enum ProjectStatus {
  active = 1,
  disabled,
}

export type Project = {
  id: number;
  name: string;
  userId: number;
  description: string;
  createdBy: number;
  status: ProjectStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type ProjectType = {
  all: Array<Project>
}

export type Team = {
  id: number;
  name: string;
  userId: number;
  createdBy: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TeamType = {
  all: Array<Team>
}

export enum UserRole {
  basic = 1,
  admin
}

export type UserType = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole,
}

export type UserInfoType = {
  notification: number;
  userInfo: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  }
}