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

router.get('/Excel', function (request, response) {
    var conf = {};
    conf.cols = [{
        caption: 'Fecha',
        type: 'date',
        captionStyleIndex: 1,
        beforeCellWrite: function () {
            var originDate = new Date(Date.UTC(1899, 11, 30));
            return function (row, cellData, eOpt) {
                if (cellData === null) {
                    eOpt.cellType = 'string';
                    return 'N/A';
                } else
                    return (cellData - originDate) / (24 * 60 * 60 * 1000);
            }
        } ()
        //, width: 20.85        
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
    }];
    conf.rows = request.body.list;

    //for (var i = 0; i < request.body.list; i++) {

    //}

    //conf.rows = [


    //['pi', new Date(Date.UTC(2013, 4, 1)), true, 3.14159],
    //["e", new Date(2012, 4, 1), false, 2.7182],
    //["M&M<>'", new Date(Date.UTC(2013, 6, 9)), false, 1.61803],
    //["null date", null, true, 1.414]
    //];
    var result = nodeExcel.execute(conf);
    response.setHeader('Content-Type', 'application/vnd.openxmlformats');
    response.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
    response.end(result, 'binary');
});

module.exports = router;