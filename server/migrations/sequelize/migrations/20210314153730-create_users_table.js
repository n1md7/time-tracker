'use strict';

// eslint-disable-next-line no-undef
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
            firstName: {
                type: Sequelize.STRING(32),
                allowNull: true,
                defaultValue: null
            },
            lastName: {
                type: Sequelize.STRING(32),
                allowNull: true,
                defaultValue: null
            },
            password: {
                type: Sequelize.STRING(512),
                allowNull: true,
                defaultValue: null
            },
            email: {
                type: Sequelize.STRING(128),
                allowNull: false
            },
            personalNumber: {
                type: Sequelize.STRING(11),
                allowNull: true,
                defaultValue: null
            },
            jobPosition: {
                type: Sequelize.STRING(128),
                allowNull: true,
                defaultValue: null
            },
            role: {
                type: Sequelize.INTEGER(2),
                allowNull: false
            },
            birthday: {
                type: Sequelize.DATE,
                defaultValue: null,
                allowNull: true
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

        // Add index BTREE to E-mail field
        await queryInterface.addIndex('users', ['email']);
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
