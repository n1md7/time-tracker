import BaseModelSequelize from '../BaseModelSequelize';
import model, {tableName} from '../../database/sequelize/schema/Project';
import {MysqlUpdateException} from '../../exceptions';
import logWrite from '../../logger';

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

    const {dataValues} = await this.model.create({
      name: requestParam.name,
      description: requestParam.description,
      createdBy: userId,
      status: ProjectStatus.active,
    });

    if (!dataValues) {
      throw new MysqlUpdateException(`addNewProject(${JSON.stringify(requestParam)}, ${userId}) didn't add a new record`);
    }

    return dataValues as ProjectType;
  }

  public async getProjectsByUserId(userId: number): Promise<ProjectType[]> {

    return await this.model.findAll({
      where: {
        createdBy: userId,
      },
    });
  }

  public async updateNameById(id: number, createdBy: number, name: string): Promise<void> {
    const [affectedRows] = await this.model.update({name}, {
      where: {id, createdBy},
    });

    if (affectedRows === 0) {
      logWrite.warn(`updateNameById("${name}", where: ${id}, ${createdBy}) didn't modify the record`);
    }
  }

  public async updateDescriptionById(id: number, createdBy: number, description: string): Promise<void> {
    const [affectedRows] = await this.model.update({description}, {
      where: {id, createdBy},
    });

    if (affectedRows === 0) {
      logWrite.warn(`updateDescriptionById("${description}", where: ${id}, ${createdBy}) didn't modify the record`);
    }
  }

  public async removeProjectById(id: number, userId: number): Promise<void> {
    const destroyed = await this.model.destroy({
      where: {id, createdBy: userId},
    });

    if (!destroyed) {
      throw new MysqlUpdateException(`removeProjectById(${id}, ${userId}) didn't remove the record`);
    }
  }
}
