"use strict";

module.exports = function (sequelize, DataTypes) {
    var Permit = sequelize.define("Permit", {
    }, {
            classMethods: {
                associate: function (models) {
                    Permit.belongsTo(models.Role, { foreignKey: "idrole", primaryKey: true, allowNull: false });
                    Permit.belongsTo(models.Page, { foreignKey: "idpage", primaryKey: true, allowNull: false });
                }
            }
        }
    );
    return Permit;
};