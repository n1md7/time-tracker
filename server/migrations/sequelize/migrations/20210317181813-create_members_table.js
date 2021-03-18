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
        await queryInterface.createTable('members', {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            userId: {
                type: Sequelize.INTEGER(11),
                allowNull: false
            },
            teamId: {
                type: Sequelize.INTEGER(11),
                allowNull: false
            },
            createdBy: {
                type: Sequelize.INTEGER(11),
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

        // Add index BTREE to E-mail field
        await queryInterface.addIndex('members', ['userId', 'teamId']);
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.dropTable('members');
    }
};
