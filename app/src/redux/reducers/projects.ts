import {ProjectType} from "../../types";

export enum ProjectAction {
    update = 'project-update'
}

type ProjectActionType = {
    type: ProjectAction;
}

const projects = (state: ProjectType = {
    all: []
}, {type, ...rest}: ProjectActionType) => {
    switch (type) {
        case ProjectAction.update:
            return {
                ...state,
                ...rest
            };
        default:
            return state;
    }
}

export default projects;
