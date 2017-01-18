"use strict";

module.exports = function (sequelize, DataTypes) {
  var Destination = sequelize.define("Destination", {
    title: { type: DataTypes.STRING, allowNull: false, unique: true },
    short: {
      type: DataTypes.STRING, allowNull: false,
      set: function (val) {
        this.setDataValue('short', val.toUpperCase());
      }
    }
  }, {
      classMethods: {
        associate: function (models) {
          Destination.hasMany(models.Course, { foreignKey: "iddestination", allowNull: false });
          Destination.hasMany(models.Course, { foreignKey: "idorigin", allowNull: false});
          Destination.hasMany(models.Office, { foreignKey: "idorigin", allowNull: false });
        }
      }
    });
  return Destination;
};