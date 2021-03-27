import {httpClient} from '../services/HttpClient';
import {AxiosResponse} from 'axios';
import {UserInfoType} from '../types';
import {useEffect, useState} from 'react';
import Alert, {AlertType} from '../components/Alert';


export default function useUserInfo(): [UserInfoType, boolean] {
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<UserInfoType>({
    notification: 0,
    userInfo: {
      id: -1,
      email: '',
      firstName: '',
      lastName: '',
    },
  });

  useEffect(() => {
    httpClient
      .get<AxiosResponse, AxiosResponse<UserInfoType>>('v1/user/info')
      .then((response) => setInfo(response.data))
      .catch(({message}) => Alert(message, AlertType.ERROR))
      .finally(() => setLoading(false));
  }, []);

  return [info, loading];
}