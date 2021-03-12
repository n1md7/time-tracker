import BaseController from './BaseController';
import {Context} from 'koa';
import User from "./User";
import UserModel from "../../models/UserModel";
import UserModelMySql from "../../models/UserModelMySql";

class UserController extends BaseController implements User {
    public async user(ctx: Context): Promise<void> {
        const model = new UserModelMySql();
        ctx.body = await model.getOneUser();
    }

    public async users(ctx: Context): Promise<void> {
        const model = new UserModel();
        ctx.body = await model.getAllUsers();
    }
}

export default new UserController;
