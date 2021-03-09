import BaseController from './BaseController';
import {Context} from 'koa';

class UserController extends BaseController{
    public static async user(ctx: Context): Promise<void>{
        ctx.body = {
            name: 'nimda'
        };
    }

    public static async users(ctx: Context): Promise<void>{
        ctx.body = ['nimda', 'admin', 'koa'];
    }
}

export default UserController;