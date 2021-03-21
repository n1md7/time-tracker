import React from "react";
import {Projects} from "../../../types";
import TableRow from "./TableRow";

export default function ProjectTable({projects}: Projects) {

  if (!projects.length) {
    return (
      <div className="row mt-3 justify-content-center no-gutters">
        <div className="col-12">
          <h6 className="my-3 text-center text-muted">You don't have any projects created!</h6>
        </div>
      </div>
    );
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
            key={key}
            index={key}
            id={project.id}
            name={project.name}
            description={project.description}
          />)
      }
      </tbody>
    </table>
  );
}
