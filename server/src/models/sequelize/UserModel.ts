import BaseModelSequelize from '../BaseModelSequelize';
import model, {tableName} from '../../database/sequelize/schema/User';
import StringUtils from '../../helpers/StringUtils';

export type RequestAuthType = {
    email: string;
    password: string;
};

export type RequestUserType = {
    firstName: string;
    lastName: string;
    jobPosition: string;
    personalNumber: string;
    confirmPassword: string;
    email: string;
} & RequestAuthType;

export type UserType = {
    id: number;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    role: number;
    status: number;
    birthday: Date | null;
    createdAt: Date;
    updatedAt: Date;
};

export enum UserRole {
    basic = 1,
    admin,
}

export enum UserStatus {
    active = 1,
    disabled,
    blocked,
    pendingVerification,
    pendingPayment
}

export default class UserModel extends BaseModelSequelize<typeof model> {

    constructor() {
        super(model, tableName);
    }

    public async addNewUser(requestParam: RequestUserType): Promise<UserType> {
        const resultRow = await this.model.findOne({
            where: {
                email: requestParam.email
            }
        });

        if (resultRow) {
            throw new Error(`such email already taken`);
        }

        const passwordHash = await StringUtils.hashPassword(requestParam.password);
        return await this.model.create({
            firstName: requestParam.firstName,
            lastName: requestParam.lastName,
            jobPosition: requestParam.jobPosition,
            personalNumber: requestParam.personalNumber,
            password: passwordHash,
            email: requestParam.email,
            role: UserRole.basic,
            status: UserStatus.pendingVerification
        });
    }

    public async credentialsAreValid(requestParam: RequestAuthType): Promise<boolean | UserType> {
        const resultRow = await this.model.findOne({
            where: {
                email: requestParam.email,
            }
        });
        // No such user record in the Database
        if (!resultRow) {
            return false;
        }
        const user = resultRow.dataValues as UserType;
        const hash = user.password;
        const isValid = await StringUtils.hashCompare(requestParam.password, hash);

        if (!isValid) {
            return false;
        }

        return user;
    }

    public async updateRoleById(id: number, role: UserRole): Promise<Array<number>> {
        return await this.model.update({role}, {
            where: {id}
        });
    }

    public async updateStatusById(id: number, status: UserStatus): Promise<Array<number>> {
        return await this.model.update({status}, {
            where: {id}
        });
    }
}