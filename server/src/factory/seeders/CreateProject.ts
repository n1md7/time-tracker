import ProjectModel from "../../models/sequelize/ProjectModel";
import ProjectFactory from "../ProjectFactory";

export default async function createProject(userId: number): Promise<void> {
    const generatedProject = await new ProjectFactory().generate({
        name: 'My default project',
        description: 'You can edit this or create new one',
    });
    const projectModel = new ProjectModel();
    await projectModel.addNewProject(generatedProject, userId);
}
