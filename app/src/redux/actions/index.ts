import {ModalAction} from '../reducers/modal';
import {TeamAction} from '../reducers/teams';
import {ProjectAction} from '../reducers/projects';
import {UserAction, UserActionType} from '../reducers/user';
import {UserType} from '../../types';
import {Dispatch} from 'react';

export const updateUserNotification = (notification: number) => (dispatch: Dispatch<UserActionType | any>) => {
  return dispatch({
    type: UserAction.notificationUpdate,
    data: {
      notification,
    },
  });
};

export const updateUserInfo = (userInfo: UserType) => ({
  type: UserAction.infoUpdate,
  data: {
    userInfo,
  },
});

export const updateModal = (data: any) => ({
  type: ModalAction.update,
  ...data,
});

export const resetModal = () => ({
  type: ModalAction.reset,
});

export const updateProjects = (data: any) => ({
  type: ProjectAction.update,
  ...data,
});

export const updateTeams = (data: any) => ({
  type: TeamAction.update,
  ...data,
});
