import TeamModel, {TeamType} from "../../models/sequelize/TeamModel";
import TeamFactory from "../TeamFactory";

export default async function createTeam(projectId: number, userId: number): Promise<TeamType> {
    const generatedProject = await new TeamFactory().generate({
        name: 'My team',
        description: 'My team description',
        projectId
    });
    const projectModel = new TeamModel();

    return await projectModel.addNewTeam(generatedProject, userId);
}
