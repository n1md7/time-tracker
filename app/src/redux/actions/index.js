import {ModalAction} from "../reducers/modal";
import {TeamAction} from "../reducers/teams";
import {ProjectAction} from "../reducers/projects";

export const updateUser = data => ({
    type: 'UPDATE',
    ...data
});

export const updateModal = data => ({
    type: ModalAction.update,
    ...data
});

export const updateProjects = data => ({
    type: ProjectAction.update,
    ...data
});

export const updateTeams = data => ({
    type: TeamAction.update,
    ...data
});
