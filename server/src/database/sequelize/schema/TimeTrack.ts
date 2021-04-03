import {INTEGER, STRING, BIGINT, DATE} from 'sequelize';
import mysql from '../Sequelize';


export const tableName = 'timeTracks';
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
  userId: {
    type: INTEGER({decimals: 11}),
    allowNull: true,
    defaultValue: null,
  },
  taskId: {
    type: INTEGER({decimals: 11}),
    allowNull: true,
    defaultValue: null,
  },
  stated: {
    type: DATE,
    allowNull: true,
    defaultValue: null,
  },
  ended: {
    type: DATE,
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
