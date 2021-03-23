import React from "react";
import {Team} from "../../../types";
import TableRow from "./TableRow";
import InlineLoading from '../../../components/InlineLoading';
import NoData from '../../../components/NoData';

type Teams = {
  teams: Team[],
  fetching: boolean
};
export default function TeamTable({teams, fetching}: Teams) {
  if (fetching) {
    return <InlineLoading/>;
  }
  if (!teams.length) {
    return <NoData text={'You don\'t have any teams created!'}/>;
  }

  return (
    <table className="table">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">name</th>
        <th scope="col">description</th>
        <th scope="col">{/**/}</th>
      </tr>
      </thead>
      <tbody>
      {
        teams.map((team, key) =>
          <TableRow
            key={team.id}
            index={key}
            id={team.id}
            name={team.name}
            description={team.description}
          />)
      }
      </tbody>
    </table>
  );
}
