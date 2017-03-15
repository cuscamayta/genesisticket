var models = require('./../models');
var express = require('express');
var router = express.Router();
var common = require('./common');

router.post('/dailycash', common.isAuthenticate, function (request, response) {
    models.Sale.findAll({
        include: [{ model: models.User }],
        where: {
            dateregister: {
                $between: [common.formatDate(request.body.dateinit), common.formatDate(request.body.dateend)]
            },
            iduser: request.body.iduser, status: 1
        },
        order: 'idschedule ASC'
    }).then(function (res) {
        response.send(common.response(res));
    }).catch(function (err) {
        response.send(common.response(err.name, err.message, false));
    });
});

router.post('/dailybus', common.isAuthenticate, function (request, response) {
    models.Sale.findAll({
        include: [{ model: models.Schedule, where: { idbus: request.body.idbus } }],
        where: {
            dateregister: {
                $between: [common.formatDate(request.body.dateinit), common.formatDate(request.body.dateend)]
            },
            status: 1
        },
        order: 'idschedule ASC'
    }).then(function (res) {
        response.send(common.response(res));
    }).catch(function (err) {
        response.send(common.response(err.name, err.message, false));
    });
});

router.post('/countpassenger', common.isAuthenticate, function (request, response) {
    models.Ticket.count({
        where: { status: 1 }
    }).then(function (res) {
        response.send(common.response(res));
    }).catch(function (err) {
        response.send(common.response(err.name, err.message, false));
    });
});

router.post('/countpassengercuerrent', common.isAuthenticate, function (request, response) {
    models.Ticket.count({
        include: [{ model: models.Salesdetail, include: [{ model: models.Sale, where: { dateregister: common.formatDate(request.body.currentdate) } }] }],
        where: { status: 1 }
    }).then(function (res) {
        response.send(common.response(res));
    }).catch(function (err) {
        response.send(common.response(err.name, err.message, false));
    });
});

router.post('/countuser', common.isAuthenticate, function (request, response) {
    models.User.count().then(function (res) {
        response.send(common.response(res));
    }).catch(function (err) {
        response.send(common.response(err.name, err.message, false));
    });
});

router.post('/invoice', common.isAuthenticate, function (request, response) {

    return models.sequelize.transaction(function (t) {
        return models.Setting.findOne({ attributes: ["title", "numberid", "note"] }, { transaction: t }).then(function (setting) {
            if (setting) {
                return models.Orderbook.findOne({
                    attributes: ["numberorder", "idoffice", "deadline"],
                    where: { idoffice: request.body.idoffice, status: 2, type: 1 }
                }, { transaction: t }).then(function (orderbook) {
                    if (orderbook) {
                        return models.Salesbook.findOne({
                            attributes: ["numberorder", "numbercontrol", "numberid", "fullname", "numberinvoice", "dateregister", "amountinvoice", "idoffice"],
                            include: [{
                                model: models.Office,
                                attributes: ["title", "address", "phone", "detail"]
                            },
                            {
                                model: models.Sale,
                                attributes: ["total"],
                                include: [{
                                    model: models.Schedule,
                                    attributes: ["arrival", "departure", "dateregister"]
                                }, {
                                    model: models.User,
                                    attributes: ["username"]
                                }, {
                                    model: models.Ticket,
                                    where: { status: 1 },
                                    attributes: ["numberid", "fullname", "price", "number", "numberbaggage", "weightbaggage", "origin", "destination", "typebus"]
                                }]
                            }],
                            where: { status: 1, numberinvoice: request.body.numberinvoice, numberorder: orderbook.dataValues.numberorder }
                        }, { transaction: t }).then(function (invoice) {
                            var data = { invoice: invoice, setting: setting, orderbook: orderbook };
                            response.send(common.response(data));
                        });
                    } else {
                        throw new Error("No existe libro de orden");
                    }
                });
            } else {
                throw new Error("No existe configuración de la empresa");
            }
        });

    }).catch(function (err) {
        response.send(common.response(err.name, err.message, false));
    });
});

module.exports = router;