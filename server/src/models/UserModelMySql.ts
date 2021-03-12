import {UserType} from "../types/user"
import BaseModelMySql from "./BaseModelMySql";

export default class UserModelMySql extends BaseModelMySql {

    public async getOneUser(): Promise<UserType[]> {
        const [rows, fields] = await this.query("SELECT * FROM Users Limit 1");

        return rows.pop();
    }
}