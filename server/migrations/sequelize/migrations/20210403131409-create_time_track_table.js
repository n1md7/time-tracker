'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('timeTracks', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      userId: Sequelize.INTEGER(11),
      projectId: Sequelize.INTEGER(11),
      taskId: Sequelize.INTEGER(11),
      started: Sequelize.DATE,
      ended: Sequelize.DATE,
      status: {
        type: Sequelize.INTEGER(2),
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    }, {
      charset: 'utf8',
      collate: 'utf8_general_ci'
    });

    await queryInterface.addIndex('timeTracks', ['userId', 'projectId', 'status', 'taskId']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('timeTracks');
  }
};
