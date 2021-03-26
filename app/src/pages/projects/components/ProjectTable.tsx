import React from 'react';
import {Project} from '../../../types';
import TableRow from './TableRow';
import NoData from '../../../components/NoData';
import InlineLoading from '../../../components/InlineLoading';

type Projects = {
  projects: Project[],
  fetching: boolean
};

export default function ProjectTable({projects, fetching}: Projects) {
  if (fetching) {
    return <InlineLoading/>;
  }
  if (!projects.length) {
    return <NoData text={'You don\'t have any projects created!'}/>;
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
        projects.map((project, key) =>
          <TableRow
            key={project.id}
            index={key}
            {...project}
          />)
      }
      </tbody>
    </table>
  );
}
