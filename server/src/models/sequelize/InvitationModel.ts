import BaseModelSequelize from '../BaseModelSequelize';
import model, {tableName} from '../../database/sequelize/schema/Invitation';
import {MysqlUpdateException} from "../../exceptions";

export type RequestInvitationType = {
    email: string;
    teamId: number;
};

export type InvitationType = {
    id: number;
    email: string;
    teamId: number;
    createdBy: number;
    invitationKey: string;
    status: InvitationStatus;
    createdAt: Date;
    updatedAt: Date;
};

export enum InvitationStatus {
    pendingApproval = 1,
    pendingRegistration,
    approved,
    declined
}

export default class InvitationModel extends BaseModelSequelize<typeof model> {

    constructor() {
        super(model, tableName);
    }

    public async createInvitation(
        requestParam: RequestInvitationType,
        userId: number,
        status: InvitationStatus,
        invitationKey: string): Promise<InvitationType> {

        const {dataValues} = await this.model.create({
            email: requestParam.email,
            teamId: requestParam.teamId,
            createdBy: userId,
            status: status,
            invitationKey
        });

        if (!dataValues) {
            throw new MysqlUpdateException(`createInvitation(${JSON.stringify(requestParam)}, ${userId}, ${status}) didn't add a new record`);
        }

        return dataValues as InvitationType;
    }

    public async getInvitationsByUserId(userId: number): Promise<InvitationType[]> {

        return await this.model.findAll({
            where: {
                createdBy: userId
            }
        });
    }

    public async getInvitationByKey(key: string): Promise<InvitationType | null> {
        const invitation = await this.model.findOne({
            where: {
                invitationKey: key
            }
        });

        if (!invitation) {
            return null;
        }

        return invitation.dataValues as InvitationType;
    }

    public async getInvitationByEmail(email: string): Promise<InvitationType | null> {
        const invitation = await this.model.findOne({
            where: {
                email
            }
        });

        if (!invitation) {
            return null;
        }

        return invitation.dataValues as InvitationType;
    }

    public async updateStatusByEmail(email: string, status: InvitationStatus): Promise<void> {
        const [affectedRows] = await this.model.update({status}, {
            where: {email}
        });

        if (affectedRows === 0) {
            throw new MysqlUpdateException(`updateStatusByEmail(${status}, where: ${email}) didn't modify the record`);
        }
    }

    public async removeInvitationById(id: number, userId: number): Promise<void> {
        const destroyed = await this.model.destroy({
            where: {id, createdBy: userId}
        });

        if (!destroyed) {
            throw new MysqlUpdateException(`removeInvitationById(${id}, ${userId}) didn't remove the record`);
        }
    }
}
