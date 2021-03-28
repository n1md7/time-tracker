import {combineReducers} from 'redux';
import user from './user';
import modal from './modal';
import projects from './projects';
import teams from './teams';
import {ConfirmModalType, ProjectType, TeamType, UserInfoType} from '../../types';

export interface RootReducer {
  user: UserInfoType,
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
