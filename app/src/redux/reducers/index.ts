import {combineReducers} from "redux";
import user from "./user";
import modal from "./modal";
import projects from "./projects";
import {ConfirmModalType, ProjectType} from "../../types";

export interface RootReducer {
    user: {
        name: string|null,
        email: string|null,
        isAdmin: boolean
    },
    modal: ConfirmModalType,
    projects: ProjectType
}

export default combineReducers({
    user,
    modal,
    projects
});
