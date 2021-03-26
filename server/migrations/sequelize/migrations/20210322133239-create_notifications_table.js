'use strict';

// eslint-disable-next-line no-undef
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('notifications', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      text: Sequelize.STRING(512),
      email: Sequelize.STRING(128),
      linkId: Sequelize.INTEGER(11),
      type: {
        type: Sequelize.INTEGER(2),
        allowNull: false
      },
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

    await queryInterface.addIndex('notifications', ['email', 'type', 'status', 'linkId']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('notifications');
  }
};
