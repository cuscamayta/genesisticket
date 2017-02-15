var models = require('./../models');
var express = require('express');
var router = express.Router();
var common = require('./common');
var nodeExcel = require('excel-export');
var uuid = require('node-uuid');

router.post('/forselect', common.isAuthenticate, function (request, response) {

    models.Salesbook.findAll({
        include: [{ model: models.Office }],
        where: {
            dateregister: {
                $between: [common.formatDate(request.body.dateinit), common.formatDate(request.body.dateend)]
            },
            idoffice: request.body.idoffice, status: 1
        },
        order: 'numberinvoice ASC'
    }).then(function (res) {
        response.send(common.response(res));
    }).catch(function (err) {
        response.send(common.response(err.name, err.message, false));
    });
});

router.post('/voidedinvoice', common.isAuthenticate, function (request, response) {

    models.Salesbook.findAll({
        include: [{ model: models.Office }],
        where: {
            dateregister: common.formatDate(request.body.dateregister),
            idoffice: request.body.idoffice, status: 0
        },
        order: 'numberinvoice ASC'
    }).then(function (res) {
        response.send(common.response(res));
    }).catch(function (err) {
        response.send(common.response(err.name, err.message, false));
    });
});

router.post('/Excel', function (request, response) {
    var conf = {};
    conf.cols = [{
        caption: 'Fecha',
        type: 'string',
        captionStyleIndex: 1
    }, {
        caption: 'Nro Orden',
        type: 'number'
    }, {
        caption: 'Código de Control',
        type: 'string'
    }, {
        caption: 'Nro de Factura',
        type: 'number'
    }, {
        caption: 'Nombre',
        type: 'string'
    }, {
        caption: 'Nro NIT',
        type: 'number'
    }, {
        caption: 'Importe',
        type: 'number'
    }, {
        caption: 'Sucursal',
        type: 'string'
    }];

    var dataList = JSON.parse(request.body.list);

    conf.rows = [];

    for (var i = 0; i < dataList.length; i++) {
        var rowData = new Array(
            dataList[i].dateregister,
            dataList[i].numberorder,
            dataList[i].numbercontrol,
            dataList[i].numberinvoice,
            dataList[i].numberid,
            dataList[i].fullname,
            dataList[i].amountinvoice,
            dataList[i].Office.title);
        conf.rows.push(rowData);
    }

    var result = nodeExcel.execute(conf);
    response.setHeader('Content-Type', 'application/vnd.openxmlformats');
    response.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
    response.end(result, 'binary');
});

module.exports = router;