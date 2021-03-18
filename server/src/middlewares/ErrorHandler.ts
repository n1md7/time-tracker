import {Context, Next} from "koa";
import {
    ErrorType,
    HttpText,
    HttpCode,
    ExceptionType,
} from "../types/errorHandler";


class ErrorHandler {
    static async handle(ctx: Context, next: Next): Promise<void> {
        await next().catch(error => {
            ErrorHandler.modifyContextAccordingly(error, ctx);
        });
    }

    private static buildErrorMessage(error: Error, ctx: Context) {
        const status: number = ctx.status || HttpCode.internalServerError;
        const errorMessage: string = error.message || HttpText.internalServerError;

        return `[${error.name}]:[${status} - ${errorMessage}]`;
    }


    private static modifyContextAccordingly(error: Error, ctx: Context) {

        switch (error.name) {
            case ExceptionType.validationErrorException:
            case ExceptionType.requestValidationException:
                ctx.status = HttpCode.badRequest;
                ctx.body = error.message;
                break;
            case ErrorType.jsonWebTokenError:
            case ErrorType.tokenExpiredError:
                ctx.status = HttpCode.unauthorized;
                ctx.body = error.message;
                break;
            case ErrorType.typeError:
            case ErrorType.castError:
                ctx.status = HttpCode.badRequest;
                ctx.body = HttpText.badRequest;
                break;
            default:
                ctx.status = HttpCode.internalServerError;
                ctx.body = HttpText.internalServerError;
        }

        ctx.app.emit('error:server', ErrorHandler.buildErrorMessage(error, ctx));
    }
}

export default ErrorHandler.handle;