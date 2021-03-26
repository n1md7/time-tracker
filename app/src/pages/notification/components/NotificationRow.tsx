import React from 'react';
import {Link} from 'react-router-dom';
import {Notification} from '../Notifications';


export default function NotificationRow(props: Notification) {

  return (
    <tr>
      <td className={'text-center'}>
        {props.text}
        <Link className="ml-3" to={{pathname: '/invitations'}}>
          View invitation
        </Link>
      </td>
    </tr>
  );
}
