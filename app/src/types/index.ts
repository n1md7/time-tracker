
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
    header: string;
    body: string;
    confirmText: string;
    confirmButtonVariant: ButtonVariant;
    show: boolean;
    confirmDisabled: boolean;
    closeHandler: () => void;
    confirmHandler: () => void;
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

export type Projects = {
    projects: Project[]
};

export type ProjectType = {
    all: Array<Project>
}

export type Team = {
    id: number;
    name: string;
    description: string;
}

export type Teams = {
    teams: Team[]
};

export type TeamType = {
    all: Array<Team>
}