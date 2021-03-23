import BaseModelSequelize from '../BaseModelSequelize';
import model, {tableName} from '../../database/sequelize/schema/Member';
import {MysqlUpdateException} from "../../exceptions";

export type RequestMemberType = {
    userId: number;
    teamId?: number;
};

export type MemberType = {
    id: number;
    userId: number;
    teamId: number;
    createdBy: number;
    status: MemberStatus;
    createdAt: Date;
    updatedAt: Date;
};

export enum MemberStatus {
    active = 1,
    disabled,
    pendingApproval,
    pendingRegistration
}

export default class MemberModel extends BaseModelSequelize<typeof model> {

    constructor() {
        super(model, tableName);
    }

    public async addNewMember(requestParam: RequestMemberType, createdBy: number): Promise<MemberType> {

        return await this.model.create({
            userId: requestParam.userId,
            teamId: requestParam.teamId || null,
            createdBy: createdBy,
            status: MemberStatus.active,
        });
    }

    public async getMembersByProjectId(projectId: number): Promise<MemberType[]> {

        return await this.model.findAll({
            where: {projectId}
        });
    }

    public async updateProjectIdByMemberId(teamId: number, projectId: number): Promise<void> {
        const [affectedRows] = await this.model.update({projectId}, {
            where: {
                id: teamId
            }
        });

        if (affectedRows === 0) {
            throw new MysqlUpdateException(`updateProjectIdByMemberId(${teamId}, where: ${projectId}) didn't modify the record`);
        }
    }

}
