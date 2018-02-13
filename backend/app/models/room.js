module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define(
    "room",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: DataTypes.STRING,
      temperature: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      humidity: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
    },
    {
      classMethods: {
        associate: models => {
          Room.belongsTo(models.Home, {
            foreignKey: "homeId",
          });
        },
      },
    }
  );
  return Room;
};
