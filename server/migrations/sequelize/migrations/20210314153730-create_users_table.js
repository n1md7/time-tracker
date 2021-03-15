'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.createTable('users', {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            firstName: Sequelize.STRING(32),
            lastName: Sequelize.STRING(32),
            password: Sequelize.STRING(512),
            email: Sequelize.STRING(128),
            personalNumber: Sequelize.STRING(11),
            jobPosition: Sequelize.STRING(128),
            role: Sequelize.INTEGER(2),
            birthday: {
                type: Sequelize.DATE,
                defaultValue: null,
                allowNull: true
            },
            status: Sequelize.INTEGER(2),
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
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.dropTable('users');
    }
};
