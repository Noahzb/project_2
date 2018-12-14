module.exports = function(sequelize, DataTypes) {
    var Auth = sequelize.define("Auth", {
      userName: DataTypes.TEXT,
      password: DataTypes.TEXT
    });
    return Auth;
  };

