'use strict';
module.exports = {
  up: async (queryInterface:any, Sequelize:any) => {
    await queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      home_team_id: {
        type: Sequelize.INTEGER
      },
      home_team_goals: {
        type: Sequelize.INTEGER
      },
      away_team_id: {
        type: Sequelize.INTEGER
      },
      away_team_goals: {
        type: Sequelize.INTEGER
      },
      in_progress:{
        type: Sequelize.BOOLEAN
      }
    });
  },
  down: async (queryInterface:any, _Sequelize:any) => {
    await queryInterface.dropTable('matches');
  }
};