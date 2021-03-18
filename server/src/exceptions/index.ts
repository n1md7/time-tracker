import {ExceptionType} from '../types/errorHandler';
import Joi from "joi";

export class MysqlUpdateException extends Error {
    constructor(message: string) {
        super(message);
        this.name = ExceptionType.mysqlUpdateException;
    }
}

export class PasswordsNotMatchException extends Error {
    constructor(message: string) {
        super(message);
        this.name = ExceptionType.passwordsNotMatchException;
    }
}

export class RequestValidationException extends Error {
    constructor(message: Joi.ValidationErrorItem[]) {
        super(JSON.stringify(message));
        this.name = ExceptionType.requestValidationException;
    }
}
