import {UserRole, UserInfoType} from '../../types';

export enum UserAction {
  reset = 'user-reset',
  notificationUpdate = 'user-notification-update',
  infoUpdate = 'user-info-update',
  timeUpdate = 'user-time-tracker-update',
  titleUpdate = 'user-time-tracker-title-update',
  isTrackingToggle = 'user-time-tracker-is-tracking-toggle'
}

export type UserActionType = {
  type: UserAction;
  data: UserInfoType;
};

const defaultState: UserInfoType = {
  timeTracker: {
    isTracking: false,
    time: 0,
    title: document.title,
  },
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
    case UserAction.isTrackingToggle:
      return {
        ...state,
        timeTracker: {
          ...state.timeTracker,
          isTracking: !state.timeTracker?.isTracking,
        },
      };
    case UserAction.timeUpdate:
      return {
        ...state,
        timeTracker: {
          ...state.timeTracker,
          time: data.timeTracker?.time,
        },
      };
    case UserAction.titleUpdate:
      return {
        ...state,
        timeTracker: {
          ...state.timeTracker,
          title: data.timeTracker?.title,
        },
      };
    case UserAction.reset:
      return defaultState;
    default:
      return state;
  }
};

export default userInfo;
