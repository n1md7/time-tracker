import {ModalAction} from "../reducers/modal";
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
