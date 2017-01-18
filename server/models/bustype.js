"use strict";

module.exports = function (sequelize, DataTypes) {
  var Bustype = sequelize.define("Bustype", {
    title: { type: DataTypes.STRING, allowNull: false, unique: true },
    path: { type: DataTypes.STRING, allowNull: false },
  }, {
      classMethods: {
        associate: function (models) {
          Bustype.hasMany(models.Bus, { foreignKey: "idbustype", allowNull: false });
        }
      }
    });
  return Bustype;
};