import BaseModelSequelize from '../BaseModelSequelize';
import model, {tableName} from '../../database/sequelize/schema/Project';
import {MysqlUpdateException} from "../../exceptions";

export type RequestProjectType = {
    name: string;
    description: string;
};

export type ProjectType = {
    id: number;
    name: string;
    description: string;
    createdBy: number;
    status: ProjectStatus;
    createdAt: Date;
    updatedAt: Date;
};

export enum ProjectStatus {
    active = 1,
    disabled,
}

export default class ProjectModel extends BaseModelSequelize<typeof model> {

    constructor() {
        super(model, tableName);
    }

    public async addNewProject(requestParam: RequestProjectType, userId: number): Promise<ProjectType> {

        return await this.model.create({
            name: requestParam.name,
            description: requestParam.description,
            createdBy: userId,
            status: ProjectStatus.active,
        });
    }

    public async getProjectsByUserId(userId: number): Promise<ProjectType[]> {

        return await this.model.findAll({
            where: {
                createdBy: userId
            }
        });
    }

    public async updateNameById(id: number, name: string): Promise<void> {
        const [affectedRows] = await this.model.update({name}, {
            where: {id}
        });

        if (affectedRows === 0) {
            throw new MysqlUpdateException(`updateNameById(${name}, where: ${id}) didn't modify the record`);
        }
    }

    public async updateDescriptionById(id: number, description: string): Promise<void> {
        const [affectedRows] = await this.model.update({description}, {
            where: {id}
        });

        if (affectedRows === 0) {
            throw new MysqlUpdateException(`updateDescriptionById(${description}, where: ${id}) didn't modify the record`);
        }
    }
}
