import {combineReducers} from "redux";
import user from "./user";
import modal from "./modal";
import projects from "./projects";
import teams from "./teams";
import {ConfirmModalType, ProjectType, TeamType} from "../../types";

export interface RootReducer {
    user: {
        name: string|null,
        email: string|null,
        isAdmin: boolean
    },
    modal: ConfirmModalType,
    projects: ProjectType,
    teams: TeamType,
}

export default combineReducers({
    user,
    modal,
    projects,
    teams
});
