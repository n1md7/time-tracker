import {RequestProjectType} from "../models/sequelize/ProjectModel";
import mocker from 'mocker-data-generator';

export default class ProjectFactory {

    public async generate(requestParam?: RequestProjectType): Promise<RequestProjectType> {
        if (requestParam) {
            return requestParam;
        }
        // Or generate new user by random data
        const generatedData = await mocker()
            .schema('projects', {
                name: {
                    casual: 'title'
                },
                description: {
                    faker: 'lorem.paragraph'
                }
            }, 1).build();

        return generatedData.projects.pop();
    }
}
