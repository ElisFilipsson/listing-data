module.exports = (sequelize, DataTypes) => {
  const Home = sequelize.define(
    "home",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        unique: true,
        type: DataTypes.STRING,
      },
    },
    {
      classMethods: {
        associate: models => {
          Home.hasMany(models.Room, {
            foreignKey: "homeId",
          });
        },
      },
    }
  );
  return Home;
};
