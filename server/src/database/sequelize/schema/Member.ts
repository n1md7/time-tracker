import {INTEGER, STRING, BIGINT} from "sequelize";
import mysql from "../Sequelize";

export const tableName = "members";
export default mysql.define(tableName, {
    id: {
        type: BIGINT({decimals: 11}),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: INTEGER({decimals: 11}),
        allowNull: true,
        defaultValue: null
    },
    teamId: {
        type: INTEGER({decimals: 11}),
        allowNull: true,
        defaultValue: null
    },
    createdBy: {
        type: INTEGER({decimals: 11}),
        allowNull: false
    },
    status: INTEGER({decimals: 2}),
}, {
    tableName,
    timestamps: true
});
