import {INTEGER, STRING, BIGINT} from "sequelize";
import mysql from "../Sequelize";

export const tableName = "invitations";
export default mysql.define(tableName, {
    id: {
        type: BIGINT({decimals: 11}),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: STRING(128),
        allowNull: false,
    },
    invitationKey: {
        type: STRING(128),
        allowNull: false
    },
    teamId: {
        type: INTEGER({decimals: 11}),
        allowNull: false,
    },
    createdBy: {
        type: INTEGER({decimals: 12}),
        allowNull: false
    },
    status: {
        type: INTEGER({decimals: 2}),
        allowNull: false
    }
}, {
    tableName,
    timestamps: true
});
