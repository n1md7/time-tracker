import {TeamType} from "../../types";

export enum TeamAction {
    update = 'team-update'
}

type TeamActionType = {
    type: TeamAction;
}

const teams = (state: TeamType = {
    all: []
}, {type, ...rest}: TeamActionType) => {
    switch (type) {
        case TeamAction.update:
            return {
                ...state,
                ...rest
            };
        default:
            return state;
    }
}

export default teams;
