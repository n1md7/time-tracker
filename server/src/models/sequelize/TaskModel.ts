import BaseModelSequelize from '../BaseModelSequelize';
import taskModel from '../../database/sequelize/schema/Task';
import logWrite from '../../logger';


export enum TaskStatus {
  active = 1,
  deleted
}

export default class TaskModel extends BaseModelSequelize<typeof taskModel> {

  constructor() {
    super(taskModel, taskModel.tableName);
  }

}
