import {Context, Next} from "koa";
import {ErrorType, ErrorText, ErrorCode} from "../types/errorHandler";

export default class ErrorHandler {
    static async handle(ctx: Context, next: Next): Promise<void> {
        await next().catch(error => {
            ErrorHandler.sendErrorResponse(error, ctx);
        });
    }

    private static buildErrorMessage(error: Error, ctx: Context) {
        const status: number = ctx.status || ErrorCode.internalServerError;
        const errorMessage: string = error.message || ErrorText.internalServerError;

        return `[${error.name}]:[${status} - ${errorMessage}]`;
    }

    private static sendErrorResponse(error: Error, ctx: Context) {

        switch (error.name) {
            case ErrorType.typeError:
            case ErrorType.castError:
                ctx.status = ErrorCode.badRequest;
                ctx.body = ErrorText.noContent;
                break;
            default:
                ctx.status = ErrorCode.internalServerError;
                ctx.body = ErrorText.internalServerError;
        }

        ctx.app.emit('error', ErrorHandler.buildErrorMessage(error, ctx));
    }
}
