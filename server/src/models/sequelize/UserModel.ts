import BaseModelSequelize from '../BaseModelSequelize';
import model, {tableName} from '../../database/sequelize/schema/User';
import StringUtils from '../../helpers/StringUtils';
import {MysqlUpdateException} from "../../exceptions";

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

  public async updateRoleById(id: number, role: UserRole): Promise<void> {
    const [affectedRows] = await this.model.update({role}, {
      where: {id}
    });

    if (affectedRows === 0) {
      throw new MysqlUpdateException(`updateRoleById(${id}, where: ${role}) didn't modify the record`);
    }
  }

  public async updateStatusById(id: number, status: UserStatus): Promise<void> {
    const [affectedRows] = await this.model.update({status}, {
      where: {id}
    });

    if (affectedRows === 0) {
      throw new MysqlUpdateException(`updateStatusById(${id}, where: ${status}) didn't modify the record`);
    }
  }

  public async userExist(email: string): Promise<boolean | UserType> {
    const resultRow = await this.model.findOne({where: {email}});
    if (!resultRow) {
      return false;
    }

    return resultRow.dataValues as UserType;
  }

  public async getUserByEmail(email: string): Promise<boolean | UserType> {
    return this.userExist(email);
  }
}