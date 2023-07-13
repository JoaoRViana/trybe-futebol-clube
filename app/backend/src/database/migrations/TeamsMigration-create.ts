'use strict';
module.exports = {
  up: async (queryInterface:any, Sequelize:any) => {
    await queryInterface.createTable('teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      team_name: {
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface:any, _Sequelize:any) => {
    await queryInterface.dropTable('teams');
  }
};