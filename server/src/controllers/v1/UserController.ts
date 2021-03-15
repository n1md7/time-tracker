import BaseController from './BaseController';
import {Context} from 'koa';
import UserInterface from "./UserInterface";
import UserModel from "../../models/mongo/UserModel";
import UserModelSequelize, {UserType} from "../../models/sequelize/UserModel";
import {authUserSchema, createUserSchema} from './validators/UserRequestValidator';
import {HttpCode} from '../../types/errorHandler';
import JsonWebToken from 'jsonwebtoken';
import {MyContext} from '../../types/koa';
import Joi from 'joi';

export type JwtPayload = {
    username: string;
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
            }
        );
    }

    public async user(ctx: Context): Promise<void> {
        ctx.body = 'ups...';
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
            username: ctx.store.username,
            email: ctx.store.email
        });
    }

    public async users(ctx: Context): Promise<void> {
        const model = new UserModel();
        ctx.body = await model.getAllUsers();
    }

    // User registration
    public async createNewUser(ctx: Context): Promise<void> {
        const validation = createUserSchema.validate(ctx.request.body);
        if (validation.error as Joi.ValidationError) {
            throw new Error(validation.error.details.pop().message);
        }
        if (validation.value.password !== validation.value.confirmPassword) {
            throw new Error("'password' and 'confirmPassword' didn't match!");
        }
        const model = new UserModelSequelize();
        await model.addNewUser(validation.value);

        ctx.status = HttpCode.created;
    }

    // User authentication
    public async authenticateUser(ctx: Context): Promise<void | typeof ctx.status> {
        const validation = authUserSchema.validate(ctx.request.body);
        if (validation.error as Joi.ValidationError) {
            throw new Error(validation.error.details.pop().message);
        }
        const model = new UserModelSequelize();
        const user = await model.credentialsAreValid(validation.value) as UserType;
        if (!user) {
            return ctx.status = HttpCode.unauthorized;
        }

        // Generate JsonWebToke for authentication
        ctx.body = UserController.generateNewJWT({
            userId: user.id,
            username: user.username,
            email: user.email
        });
    }
}

export default new UserController;
