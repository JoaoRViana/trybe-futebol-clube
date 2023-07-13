import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import Matches from './Matches';

class TeamsModel extends Model<InferAttributes<TeamsModel>,
InferCreationAttributes<TeamsModel>> {
  declare id: CreationOptional<number>;

  declare teamName :string;
}
TeamsModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName:{
    type:DataTypes.STRING,
    allowNull:false,
  }
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});
TeamsModel.hasMany(Matches,{foreignKey:'id',as:'awayTeamId'})
TeamsModel.hasMany(Matches,{foreignKey:'id',as:'homeTeamId'})

export default TeamsModel;
