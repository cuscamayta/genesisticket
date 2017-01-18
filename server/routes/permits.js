var models = require('./../models');
var express = require('express');
var router = express.Router();
var common = require('./common');

function createDetail(request, index) {
    return {
        idrole: request.body.details[index].idrole,
        idpage: request.body.details[index].idpage
    };
}

router.post('/create', common.isAuthenticate, function(request, response) {
    return models.sequelize.transaction(function(t) {
        var promises = []
        for (var index = 0; index < request.body.details.length; index++) {
            var newPromise = models.Permit.create(createDetail(request, index), { transaction: t });
            promises.push(newPromise);
        }
        return Promise.all(promises);
    }).then(function(res) {
        response.send(common.response(null, "Se guardo correctamente"));
    }).catch(function(err) {
        response.send(common.response(err.name, err.message, false));
    });
});

router.get('/', common.isAuthenticate, function(request, response) {
    models.Permit.findAll({
        include: [{ model: models.Role }, { model: models.Page }]
    }).then(function(res) {
        response.send(common.response(res));
    }).catch(function(err) {
        response.send(common.response(err.name, err.message, false));
    });
});

router.post('/destroy', common.isAuthenticate, function(request, response) {
    models.Permit.destroy({
        where: { id: request.body.id }
    }).then(function() {
        response.send(common.response("", "Se elimino correctamente"));
    }).catch(function(err) {
        response.send(common.response(err.name, err.message, false));
    });
});

module.exports = router;