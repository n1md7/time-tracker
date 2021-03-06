import {INTEGER, STRING, BIGINT} from 'sequelize';
import mysql from '../Sequelize';

export const tableName = 'notifications';
export default mysql.define(tableName, {
  id: {
    type: BIGINT({decimals: 11}),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  text: {
    type: STRING(512),
    allowNull: true,
    defaultValue: null,
  },
  linkId: {
    type: INTEGER({decimals: 11}),
    allowNull: true,
    defaultValue: -1,
  },
  email: {
    type: STRING(128),
    allowNull: true,
    defaultValue: null,
  },
  type: {
    type: INTEGER({decimals: 2}),
    allowNull: false,
  },
  status: {
    type: INTEGER({decimals: 2}),
    allowNull: false,
  },
}, {
  tableName,
  timestamps: true,
});
