module.exports = (sequelize, DataTypes) => {
    const List = sequelize.define("list", {
      name: {
        type: DataTypes.STRING
      }
    });
  
    return List;
  };