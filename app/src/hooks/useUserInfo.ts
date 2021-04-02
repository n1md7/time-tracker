import {httpClient} from '../services/HttpClient';
import {AxiosResponse} from 'axios';
import {UserInfoType, UserType} from '../types';
import Alert, {AlertType} from '../components/Alert';
import {useDispatch} from 'react-redux';
import {updateUserInfo, updateUserNotification} from '../redux/actions';


export default function useUserInfo(): () => Promise<void> {
  const dispatch = useDispatch();

  return (): Promise<void> => {
    return httpClient
      .get<AxiosResponse, AxiosResponse<UserInfoType>>('v1/user/info')
      .then((response) => {
        dispatch(updateUserNotification(response.data.notification as number));
        dispatch(updateUserInfo(response.data.userInfo as UserType));
      }).catch(({message}) => Alert(message, AlertType.ERROR));
  };
}