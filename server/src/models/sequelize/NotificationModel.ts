import BaseModelSequelize from '../BaseModelSequelize';
import model, {tableName} from '../../database/sequelize/schema/Notification';
import {MysqlUpdateException} from '../../exceptions';

export type RequestNotificationType = {
  text: string;
  email: string;
  type: NotificationType;
  status: NotificationStatus;
  linkId?: number;
};

export type NotificationType_ = {
  id: number;
  text: string;
  email: string;
  linkId: number;
  type: NotificationType;
  status: NotificationStatus;
  createdAt: Date;
  updatedAt: Date;
};

export enum NotificationStatus {
  active = 1,
  seen
}

export enum NotificationType {
  invitation = 1,
}

export default class NotificationModel extends BaseModelSequelize<typeof model> {

  constructor() {
    super(model, tableName);
  }

  public async createNotification(requestParam: RequestNotificationType): Promise<NotificationType_> {

    const {dataValues} = await this.model.create({
      text: requestParam.text,
      email: requestParam.email,
      type: requestParam.type,
      status: requestParam.status,
      linkId: requestParam.linkId,
    });

    if (!dataValues) {
      throw new MysqlUpdateException(`createNotification(${JSON.stringify(requestParam)}) didn't add a new record`);
    }

    return dataValues as NotificationType_;
  }

  public async getNotificationsByUserEmail(email: string): Promise<NotificationType_[]> {

    return await this.model.findAll({
      where: {
        email,
      },
    });
  }

  public async updateStatusById(id: number, status: NotificationStatus, email: string): Promise<void> {
    const [affectedRows] = await this.model.update({status}, {
      where: {id, email},
    });

    if (affectedRows === 0) {
      throw new MysqlUpdateException(`updateStatusById(${status}, where: ${id}, ${email}) didn't modify the record`);
    }
  }

  public async updateStatusByLinkId(linkId: number, status: NotificationStatus, email: string): Promise<void> {
    const [affectedRows] = await this.model.update({status}, {
      where: {linkId, email},
    });

    if (affectedRows === 0) {
      throw new MysqlUpdateException(`updateStatusById(${status}, where: ${linkId}, ${email}) didn't modify the record`);
    }

  }

  public async removeNotificationById(id: number, userId: number): Promise<void> {
    const destroyed = await this.model.destroy({
      where: {id, createdBy: userId},
    });

    if (!destroyed) {
      throw new MysqlUpdateException(
        `removeNotificationById(${id}, ${userId}) didn't remove the record`);
    }
  }
}
