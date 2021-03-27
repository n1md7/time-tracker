import BaseController from './BaseController';
import {MyContext} from '../../types/koa';

export type JwtPayload = {
  email: string;
  userId: number;
  iat?: number;
  exp?: number;
};

class InfoController extends BaseController {

  public async authInfo(ctx: MyContext): Promise<void> {
    const expInMillis = Number(process.env.JWT_EXPIRES_IN);
    const expInSec = Math.ceil(expInMillis / 1000);
    const expInMin = Math.ceil(expInSec / 60);

    ctx.body = {
      expiresIn: {
        milliseconds: expInMillis,
        seconds: expInSec,
        minutes: expInMin
      },
      headerName: process.env.JWT_HEADER_NAME
    };
  }

}

export default new InfoController;
