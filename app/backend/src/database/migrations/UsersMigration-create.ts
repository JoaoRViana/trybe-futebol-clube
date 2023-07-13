'use strict';
module.exports = {
  up: async (queryInterface:any, Sequelize:any) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface:any, _Sequelize:any) => {
    await queryInterface.dropTable('users');
  }
};