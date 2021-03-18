import {INTEGER, STRING, BIGINT} from "sequelize";
import mysql from "../Sequelize";

export const tableName = "projects";
export default mysql.define(tableName, {
    id: {
        type: BIGINT({decimals: 11}),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: STRING(128),
        allowNull: false
    },
    description: STRING(512),
    createdBy: {
        type: INTEGER({decimals: 11}),
        allowNull: false
    },
    status: INTEGER({decimals: 2}),
}, {
    tableName,
    timestamps: true
});
