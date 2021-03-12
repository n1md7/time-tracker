import { Context } from "koa";

export default interface User {
    user: (ctx: Context) => Promise<void>,
    users: (ctx: Context) => Promise<void>,
}