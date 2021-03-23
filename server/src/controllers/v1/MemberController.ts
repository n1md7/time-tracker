import BaseController from './BaseController';
import {inviteKeySchema, inviteMemberSchema} from './validators/MemberRequestValidator';
import {HttpCode} from '../../types/errorHandler';
import {MyContext} from '../../types/koa';
import {InvitationEmailNotFoundException, RequestValidationException, TeamNotFoundException} from "../../exceptions";
import Joi from 'joi';
import InvitationModel, {
    InvitationStatus,
    RequestInvitationType
} from "../../models/sequelize/InvitationModel";
import UserModel from "../../models/sequelize/UserModel";
import NotificationModel, {
    NotificationStatus,
    NotificationType,
    RequestNotificationType
} from "../../models/sequelize/NotificationModel";
import TeamModel from "../../models/sequelize/TeamModel";
import StringUtils from "../../helpers/StringUtils";
import {Context} from "koa";

class MemberController extends BaseController {

    public async inviteNewMember(ctx: MyContext): Promise<void> {
        const validation = inviteMemberSchema.validate(ctx.request.body);
        if (validation.error as Joi.ValidationError) {
            throw new RequestValidationException(validation.error.details);
        }

        const {email: inviteeEmail, teamId} = validation.value as RequestInvitationType;
        const teamModel = new TeamModel();
        const team = await teamModel.getTeamById(teamId);
        if (!team) {
            throw new TeamNotFoundException(`Team Id: ${teamId} doesn't exist`);
        }

        const userModel = new UserModel();
        const inviteModel = new InvitationModel();
        const notification = new NotificationModel();

        let invitationStatus = InvitationStatus.pendingApproval;
        if (!await userModel.userExist(inviteeEmail)) {
            // TODO: Send email to invitee with registration link
            invitationStatus = InvitationStatus.pendingRegistration as InvitationStatus;
        }

        const invitationKey = StringUtils.randomChars(16);
        await inviteModel.createInvitation(
            validation.value,
            ctx.store.userId,
            invitationStatus,
            invitationKey
        );
        const notificationRequestParams: RequestNotificationType = {
            text: `"${ctx.store.email}" has invited you to join team "${team.name}"`,
            email: inviteeEmail,
            type: NotificationType.invitation,
            status: NotificationStatus.active
        };
        await notification.createNotification(notificationRequestParams);

        ctx.status = HttpCode.created;
    }

    public async getInvitationByEmail(ctx: Context): Promise<void> {
        const validation = inviteKeySchema.validate({key: ctx.params.key});
        if (validation.error as Joi.ValidationError) {
            throw new RequestValidationException(validation.error.details);
        }

        const inviteModel = new InvitationModel();
        const invite = await inviteModel.getInvitationByKey(validation.value.key);
        if (!invite) {
            throw new InvitationEmailNotFoundException(`No such invitation key: ${validation.value.key}`);
        }
        ctx.body = invite.email;
    }

    /*public async getUserMembers(ctx: MyContext): Promise<void> {
        const model = new MemberModelSequelize();
        const projects = await model.getMembersByUserId(ctx.store.userId);
        ctx.body = projects.sort().reverse();
    }

    public async removeMemberById(ctx: MyContext): Promise<void> {
        const id = Number(ctx.params.id);
        const validation = removeMemberSchema.validate({id});
        if (validation.error as Joi.ValidationError) {
            throw new RequestValidationException(validation.error.details);
        }
        const model = new MemberModelSequelize();
        await model.removeMemberById(validation.value.id, ctx.store.userId);

        ctx.status = HttpCode.accepted;
    }*/
}

export default new MemberController;
