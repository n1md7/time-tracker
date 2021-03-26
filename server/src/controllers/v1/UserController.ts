import BaseController from './BaseController';
import {Context} from 'koa';
import UserInterface from './interfaces/UserInterface';
import UserModel, {UserStatus, UserType} from '../../models/sequelize/UserModel';
import {authUserSchema, createUserSchema} from './validators/UserRequestValidator';
import {HttpCode} from '../../types/errorHandler';
import JsonWebToken from 'jsonwebtoken';
import {MyContext} from '../../types/koa';
import Joi from 'joi';
import {EmailAlreadyTakenException, PasswordsNotMatchException, RequestValidationException} from '../../exceptions';
import InvitationModel, {InvitationStatus} from '../../models/sequelize/InvitationModel';
import NotificationModel from '../../models/sequelize/NotificationModel';
import createProject from '../../factory/seeders/CreateProject';
import createTeam from '../../factory/seeders/CreateTeam';

export type JwtPayload = {
  email: string;
  userId: number;
  iat?: number;
  exp?: number;
};

class UserController extends BaseController implements UserInterface {
  private static generateNewJWT(payload: JwtPayload): string {

    return JsonWebToken.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );
  }

  // Provide user JWT expiration status
  public async status(ctx: MyContext): Promise<void> {
    const currentTimeSec = Math.ceil(new Date().valueOf() / 1000);
    // Expires in [seconds] return as response body
    ctx.body = ctx.store.exp - currentTimeSec;
  }

  public async refreshToken(ctx: MyContext): Promise<void> {
    ctx.body = UserController.generateNewJWT({
      userId: ctx.store.userId,
      email: ctx.store.email,
    });
  }

  // User registration
  public async createNewUser(ctx: Context): Promise<void> {
    const validation = createUserSchema.validate(ctx.request.body);
    if (validation.error as Joi.ValidationError) {
      throw new RequestValidationException(validation.error.details);
    }
    if (validation.value.password !== validation.value.confirmPassword) {
      throw new PasswordsNotMatchException('Passwords didn\'t match!');
    }
    const {email} = validation.value;
    const userModel = new UserModel();
    const inviteModel = new InvitationModel();
    if (await userModel.userExist(email)) {
      throw new EmailAlreadyTakenException(`E-mail: "${email}" already taken`);
    }
    const user = await userModel.addNewUser(validation.value);
    const invite = await inviteModel.getInvitationByEmail(email);
    if (invite) {
      // Activate user immediately since invitation went through the email so its valid
      await userModel.updateStatusById(user.id, UserStatus.active);
      await inviteModel.updateStatusByEmail(email, invite.id, InvitationStatus.pendingApproval);
    }

    const project = await createProject(user.id);
    await createTeam(project.id, user.id);

    ctx.status = HttpCode.created;
  }

  // User authentication
  public async authenticateUser(ctx: Context): Promise<void | typeof ctx.status> {
    const validation = authUserSchema.validate(ctx.request.body);
    if (validation.error as Joi.ValidationError) {
      throw new RequestValidationException(validation.error.details);
    }
    const model = new UserModel();
    const user = await model.credentialsAreValid(validation.value) as UserType;
    if (!user) {
      return ctx.status = HttpCode.unauthorized;
    }

    // Generate JsonWebToke for authentication
    ctx.body = UserController.generateNewJWT({
      userId: user.id,
      email: user.email,
    });
  }

  public async userNotifications(ctx: MyContext): Promise<void> {
    const notificationModel = new NotificationModel();

    ctx.body = await notificationModel.getNotificationsByUserEmail(ctx.store.email);
  }
}

export default new UserController;
