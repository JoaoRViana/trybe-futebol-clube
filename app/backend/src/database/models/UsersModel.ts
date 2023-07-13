module.exports = (sequelize:any, DataTypes:any) => {
  const userTable = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING,
    password: DataTypes.STRING,

  }, {
    timestamps: false,
    modelName: 'users',
    tableName: 'users',
  });
  return userTable;
};
