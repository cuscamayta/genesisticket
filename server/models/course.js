"use strict";

module.exports = function (sequelize, DataTypes) {
  var Course = sequelize.define("Course", {
    numberid: {
      type: DataTypes.STRING, allowNull: false, unique: true,
      set: function (val) {
        this.setDataValue('numberid', val.toUpperCase());
      }
    },
    detail: { type: DataTypes.STRING, allowNull: true }
  },
    {
      classMethods: {
        associate: function (models) {
          Course.belongsTo(models.Destination, { foreignKey: "iddestination", allowNull: false });
          Course.belongsTo(models.Destination, { foreignKey: "idorigin", allowNull: false });
          Course.hasMany(models.Travel, { foreignKey: "idcourse", allowNull: false });
        }
      }
    }
  );
  return Course;
};