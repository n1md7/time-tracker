import {INTEGER, STRING, BIGINT, DATE} from "sequelize";
import mysql from "../Sequelize";

export const tableName = "users";
export default mysql.define(tableName, {
    id: {
        type: BIGINT({decimals: 11}),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: STRING(32),
    lastName: STRING(32),
    personalNumber: STRING(11),
    jobPosition: STRING(128),
    email: {
        type: STRING(128),
        allowNull: false,
        unique: true
    },
    password: STRING(512),
    birthday: {
        type: DATE,
        allowNull: true
    },
    role: INTEGER({decimals: 2}),
    status: INTEGER({decimals: 2}),
}, {
    tableName,
    timestamps: true
});
