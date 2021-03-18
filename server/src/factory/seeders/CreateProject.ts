import ProjectModel, {ProjectType} from "../../models/sequelize/ProjectModel";
import ProjectFactory from "../ProjectFactory";

export default async function createProject(userId: number): Promise<ProjectType> {
    const generatedProject = await new ProjectFactory().generate({
        name: 'My default project',
        description: 'You can edit this or create new one',
    });
    const projectModel = new ProjectModel();

    return await projectModel.addNewProject(generatedProject, userId);
}
