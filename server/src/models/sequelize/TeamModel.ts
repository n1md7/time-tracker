import BaseModelSequelize from '../BaseModelSequelize';
import model, {tableName} from '../../database/sequelize/schema/Team';
import {MysqlUpdateException} from "../../exceptions";

export type RequestTeamType = {
  name: string;
  description: string;
  projectId: number;
};

export type TeamType = {
  id: number;
  name: string;
  description: string;
  createdBy: number;
  projectId: number;
  status: TeamStatus;
  createdAt: Date;
  updatedAt: Date;
};

export enum TeamStatus {
  active = 1,
  disabled,
}

export default class TeamModel extends BaseModelSequelize<typeof model> {

  constructor() {
    super(model, tableName);
  }

  public async addNewTeam(requestParam: RequestTeamType, userId: number): Promise<TeamType> {

    return await this.model.create({
      name: requestParam.name,
      description: requestParam.description,
      createdBy: userId,
      projectId: requestParam.projectId,
      status: TeamStatus.active,
    });
  }

  public async getTeamsByProjectId(projectId: number): Promise<TeamType[]> {

    return await this.model.findAll({
      where: {projectId}
    });
  }

  public async getTeamById(teamId: number): Promise<TeamType | null> {

    const team = await this.model.findOne({
      where: {id: teamId}
    });
    if (!team) {
      return null;
    }
    return team.dataValues as TeamType;
  }

  public async getTeamsByUserId(userId: number): Promise<TeamType[]> {

    return await this.model.findAll({
      where: {createdBy: userId}
    });
  }

  public async updateProjectIdByTeamId(teamId: number, projectId: number): Promise<void> {
    const [affectedRows] = await this.model.update({projectId}, {
      where: {
        id: teamId
      }
    });

    if (affectedRows === 0) {
      throw new MysqlUpdateException(`updateProjectIdByTeamId(${teamId}, where: ${projectId}) didn't modify the record`);
    }
  }

  public async removeTeamById(id: number, userId: number): Promise<void> {
    const destroyed = await this.model.destroy({
      where: {id, createdBy: userId}
    });

    if (!destroyed) {
      throw new MysqlUpdateException(`removeTeamById(${id}, ${userId}) didn't remove the record`);
    }
  }

}
