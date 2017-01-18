"use strict";

module.exports = function (sequelize, DataTypes) {
  var Office = sequelize.define("Office", {
    title: { type: DataTypes.STRING, allowNull: false, unique: true },
    address: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    detail: { type: DataTypes.STRING, allowNull: true }
  }, 
    {
      classMethods: {
        associate: function (models) {
          Office.belongsTo(models.Destination, { foreignKey: "idorigin", allowNull: false });
          Office.hasMany(models.Useroffice, { foreignKey: "idoffice", allowNull: false });
          Office.hasMany(models.Orderbook, { foreignKey: "idoffice", allowNull: false });
          Office.hasMany(models.Sale, { foreignKey: "idoffice", allowNull: false });
          Office.hasMany(models.Salesbook, { foreignKey: "idoffice", allowNull: false });
          Office.hasMany(models.Ticket, { foreignKey: "idoffice", allowNull: false });
        }
      }
    }
  );
  return Office;
};