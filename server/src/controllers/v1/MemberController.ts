import BaseController from './BaseController';
import {inviteIdSchema, inviteKeySchema, inviteMemberSchema} from './validators/MemberRequestValidator';
import {HttpCode} from '../../types/errorHandler';
import {MyContext} from '../../types/koa';
import {InvitationEmailNotFoundException, RequestValidationException, TeamNotFoundException} from '../../exceptions';
import Joi from 'joi';
import InvitationModel, {InvitationStatus, RequestInvitationType} from '../../models/sequelize/InvitationModel';
import UserModel from '../../models/sequelize/UserModel';
import NotificationModel, {
  NotificationStatus,
  NotificationType,
  RequestNotificationType,
} from '../../models/sequelize/NotificationModel';
import TeamModel from '../../models/sequelize/TeamModel';
import StringUtils from '../../helpers/StringUtils';
import MemberModel from '../../models/sequelize/MemberModel';
import {Env} from "../../types";
import '../../helpers/prototypes';

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
    const invitation = await inviteModel.createInvitation(
      validation.value,
      ctx.store.userId,
      invitationStatus,
      invitationKey,
    );
    const notificationRequestParams: RequestNotificationType = {
      text: `"${ctx.store.email}" has invited you to join team "${team.name}"`,
      email: inviteeEmail,
      type: NotificationType.invitation,
      status: NotificationStatus.active,
      linkId: invitation.id,
    };
    await notification.createNotification(notificationRequestParams);
    // TODO: remove this once Mail service is added
    if(process.env.NODE_ENV.equalTo(Env.Dev)){
      console.log(`Invitation link: http://localhost:3000/sign-up/${invitation.invitationKey}`);
    }

    ctx.status = HttpCode.created;
  }

  public async getInvitationByEmail(ctx: MyContext): Promise<void> {
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

  private static async updateInvitationStatus(ctx: MyContext): Promise<{ email: string, id: number }> {
    const validation = inviteIdSchema.validate({id: ctx.params.id});
    if (validation.error as Joi.ValidationError) {
      throw new RequestValidationException(validation.error.details);
    }

    return {
      email: ctx.store.email,
      id: validation.value.id,
    };
  }

  public async acceptInvitationByInviteId(ctx: MyContext): Promise<void> {

    const {id, email} = await MemberController.updateInvitationStatus(ctx);
    const inviteModel = new InvitationModel();
    const notificationModel = new NotificationModel();
    await inviteModel.updateStatusByEmail(email, id, InvitationStatus.approved);
    const invitation = await inviteModel.getInvitationById(id);
    // Mark as seen when declined or accepted
    await notificationModel.updateStatusByLinkId(id, NotificationStatus.seen, email);
    const memberModel = new MemberModel();
    const member = await memberModel.addNewMember({
      userId: ctx.store.userId,
      teamId: invitation.teamId,
    }, invitation.createdBy);

    ctx.status = HttpCode.noContent;
  }

  public async declineInvitationByInviteId(ctx: MyContext): Promise<void> {

    const {id, email} = await MemberController.updateInvitationStatus(ctx);
    const inviteModel = new InvitationModel();
    const notificationModel = new NotificationModel();

    await inviteModel.updateStatusByEmail(email, id, InvitationStatus.declined);
    await notificationModel.updateStatusByLinkId(id, NotificationStatus.seen, email);

    ctx.status = HttpCode.noContent;
  }

}

export default new MemberController;
