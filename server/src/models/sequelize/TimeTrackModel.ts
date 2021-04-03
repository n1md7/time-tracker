import BaseModelSequelize from '../BaseModelSequelize';
import model, {tableName} from '../../database/sequelize/schema/TimeTrack';
import logWrite from '../../logger';


export enum TimeTrackStatus {
  tracking = 1,
  ended
}

export default class TaskModel extends BaseModelSequelize<typeof model> {

  constructor() {
    super(model, tableName);
  }

}
