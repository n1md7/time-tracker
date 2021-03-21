import {Context, Next} from 'koa';

export default function delayResponse(delay: number): (ctx: Context, next: Next) => Promise<void> {
    return async (ctx: Context, next: Next): Promise<void> => {
        await (() => new Promise(resolve => setTimeout(resolve, delay)))();
        // After delay run next
        await next();
    }
}
