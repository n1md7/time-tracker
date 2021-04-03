import {INTEGER, STRING, BIGINT} from 'sequelize';
import mysql from '../Sequelize';

export const tableName = 'tasks';
export default mysql.define(tableName, {
  id: {
    type: BIGINT({decimals: 11}),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  projectId: {
    type: INTEGER({decimals: 11}),
    allowNull: true,
    defaultValue: null,
  },
  description: {
    type: STRING(512),
    allowNull: true,
    defaultValue: null,
  },
  status: {
    type: INTEGER({decimals: 2}),
    allowNull: false,
  },
}, {
  tableName,
  timestamps: true,
});
