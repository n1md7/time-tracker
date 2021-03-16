import Router from '@koa/router';
import {Context} from 'koa';

const infoRouter = new Router();

infoRouter.get('/info/auth', (ctx: Context) => {
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
});


export default infoRouter;
