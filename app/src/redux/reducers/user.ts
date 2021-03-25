import {UserRole, UserType} from '../../types';

export enum UserAction {
  update = 'user-update',
  reset = 'user-reset',
}

type UserActionType = {
  type: UserAction;
}

const userDefaultState: UserType = {
  id: -1,
  email: '',
  firstName: '',
  lastName: '',
  role: UserRole.basic,
};

const user = (state: UserType = userDefaultState, {type, ...rest}: UserActionType) => {
  switch (type) {
    case UserAction.update:
      return {
        ...state,
        ...rest,
      };
    case UserAction.reset:
      return userDefaultState;
    default:
      return state;
  }
};

export default user;
