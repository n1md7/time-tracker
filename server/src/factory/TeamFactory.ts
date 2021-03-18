import mocker from 'mocker-data-generator';
import {RequestTeamType} from "../models/sequelize/TeamModel";

export default class TeamFactory {

    public async generate(requestParam?: RequestTeamType): Promise<RequestTeamType> {
        if (requestParam) {
            return requestParam;
        }

        const generatedData = await mocker()
            .schema('teams', {
                name: {
                    casual: 'title'
                },
                description: {
                    faker: 'lorem.paragraph'
                },
                projectId: {
                    faker: 'random.number'
                }
            }, 1).build();

        return generatedData.teams.pop();
    }
}
