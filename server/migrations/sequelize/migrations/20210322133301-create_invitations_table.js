'use strict';

// eslint-disable-next-line no-undef
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('invitations', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      email: Sequelize.STRING(128),
      teamId: Sequelize.INTEGER(11),
      createdBy: Sequelize.INTEGER(11),
      invitationKey: Sequelize.STRING(128),
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

    await queryInterface.addIndex('invitations', ['createdBy', 'teamId', 'email', 'status']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('invitations');
  }
};
