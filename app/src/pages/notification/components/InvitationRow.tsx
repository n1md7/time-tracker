import React, {useState} from 'react';
import {Notification, NotificationStatus} from '../Notifications';
import {httpClient} from '../../../services/HttpClient';
import {AxiosResponse} from 'axios';
import Alert, {AlertType} from '../../../components/Alert';
import useUserInfo from '../../../hooks/useUserInfo';


export default function InvitationRow(props: Notification) {
  const [seen, setSeen] = useState(props.status === NotificationStatus.seen);
  const fetchUserInfo = useUserInfo();

  const acceptHandler = () => {
    httpClient.put<AxiosResponse, AxiosResponse<string>>(`/v1/member/accept/invite/${props.linkId}`)
      .then(response => {
        if (response.status === 204) {
          Alert('Accepted');
          fetchUserInfo().then(() => setSeen(true));
        }
      });
  };

  const declineHandler = () => {
    httpClient.put<AxiosResponse, AxiosResponse<string>>(`/v1/member/decline/invite/${props.linkId}`)
      .then(response => {
        if (response.status === 204) {
          Alert('Declined', AlertType.WARNING);
          fetchUserInfo().then(() => setSeen(true));
        }
      });
  };

  return (
    <tr>
      <td className={'text-center'}>
        {
          seen ? <del>{props.text}</del> : (
            <>
              {props.text}
              <button onClick={acceptHandler} className="btn btn-success btn-sm ml-3">Accept</button>
              <button onClick={declineHandler} className="btn btn-outline-danger btn-sm ml-1">Decline</button>
            </>
          )
        }
      </td>
    </tr>
  );
}
