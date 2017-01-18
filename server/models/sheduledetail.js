"use strict";

module.exports = function (sequelize, DataTypes) {
    var Scheduledetail = sequelize.define("Scheduledetail", {
        drivertype: { type: DataTypes.STRING, allowNull: true }
    },
        {
            classMethods: {
                associate: function (models) {                    
                    Scheduledetail.belongsTo(models.Driver, { foreignKey: "iddriver", allowNull: false });
                    Scheduledetail.belongsTo(models.Schedule, { foreignKey: "idschedule", allowNull: false });
                }
            }
        }
    );
    return Scheduledetail;
};