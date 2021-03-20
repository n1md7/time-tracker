import React from "react";

type Project = {
    name: string;
    description: string;
}
type Projects = {
    projects: Project[]
};
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
                    <Row key={key} index={key} name={project.name} description={project.description}/>)
            }
            </tbody>
        </table>
    );
}

function Row({name, description, index}: Project & { index: number }) {

    return (
        <tr>
            <th scope="row">{index + 1}</th>
            <td>{name}</td>
            <td>
                {description}
            </td>
            <td className="text-right">
                <button className="btn btn-sm btn-outline-primary mr-md-1">edit</button>
                <button className="btn btn-sm btn-outline-danger">remove</button>
            </td>
        </tr>
    );
}