import React, {useEffect, useState} from 'react';
import NavBar from '../../components/NavBar';
import NotificationRow from './components/NotificationRow';
import {httpClient} from '../../services/HttpClient';
import {AxiosResponse} from 'axios';
import Loading from '../../components/Loading';
import NoData from '../../components/NoData';
import InvitationRow from './components/InvitationRow';

export enum NotificationStatus {
  active = 1,
  seen
}

export enum NotificationType {
  invitation = 1,
}

export type Notification = {
  id: number;
  text: string;
  email: string;
  linkId: number;
  type: NotificationType;
  status: NotificationStatus;
  createdAt: Date;
  updatedAt: Date;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    httpClient
      .get<AxiosResponse, AxiosResponse<Notification[]>>(`/v1/user/notifications`)
      .then(response => {
        if (response.status === 200) {
          setNotifications(response.data as Notification[]);
        }
      }).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Loading/>;
  }


  return (
    <NavBar>
      <h1 className="text-center mt-5">Notifications</h1>
      {
        !isLoading && !notifications.length ?
          <NoData text={'You don\'t have any notification!'}/> : (
            <table className="table mt-3">
              <tbody>
              {
                notifications.map((notification) => {
                  switch (notification.type) {
                    case NotificationType.invitation:
                      return <InvitationRow
                        key={notification.id}
                        {...notification}
                      />;
                    default:
                      return <NotificationRow
                        key={notification.id}
                        {...notification}
                      />;
                  }
                })
              }
              </tbody>
            </table>
          )
      }
    </NavBar>
  );
}