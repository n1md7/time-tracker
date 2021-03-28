import {UserRole, UserInfoType} from '../../types';

export enum UserAction {
  reset = 'user-reset',
  notificationUpdate = 'user-notification-update',
  infoUpdate = 'user-info-update'
}

type UserActionType = {
  type: UserAction;
  data: UserInfoType;
};

const defaultState: UserInfoType = {
  notification: 0,
  userInfo: {
    id: -1,
    email: '',
    firstName: '',
    lastName: '',
    role: UserRole.basic,
  },
};

const userInfo = (state: UserInfoType = defaultState, action: UserActionType) => {
  const {type, data} = action;
  switch (type) {
    case UserAction.notificationUpdate:
      return {
        ...state,
        notification: data.notification,
      };
    case UserAction.infoUpdate:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          ...data.userInfo,
        },
      };
    case UserAction.reset:
      return defaultState;
    default:
      return state;
  }
};

export default userInfo;
