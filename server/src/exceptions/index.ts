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

export class TeamNotFoundException extends Error {
    constructor(message: string) {
        super(message);
        this.name = ExceptionType.teamNotFoundException;
    }
}

export class InvitationEmailNotFoundException extends Error {
    constructor(message: string) {
        super(message);
        this.name = ExceptionType.invitationEmailNotFoundException;
    }
}

export class EmailAlreadyTakenException extends Error {
    constructor(message: string) {
        super(message);
        this.name = ExceptionType.emailAlreadyTakenException;
    }
}
