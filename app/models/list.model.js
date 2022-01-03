module.exports = (sequelize, DataTypes) => {
    const List = sequelize.define("list", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING
      }
    });
  
    return List;
  };