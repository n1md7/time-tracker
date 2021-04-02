import {combineReducers} from 'redux';
import user from './user';
import modal from './modal';
import projects from './projects';
import teams from './teams';
import {ConfirmModalType, ProjectType, TeamType, UserInfoStateType} from '../../types';

export interface RootReducer {
  user: UserInfoStateType,
  modal: ConfirmModalType,
  projects: ProjectType,
  teams: TeamType,
}

export default combineReducers({
  user,
  modal,
  projects,
  teams,
});
