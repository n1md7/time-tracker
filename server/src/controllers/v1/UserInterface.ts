import {MyContext} from '../../types/koa';

export default interface UserInterface {
    createNewUser: (ctx: MyContext) => Promise<void>,
    authenticateUser: (ctx: MyContext) => Promise<void | typeof ctx.status>,
}