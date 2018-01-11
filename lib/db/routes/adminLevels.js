'use strict';

var _handleResponse = require('../utils/handleResponse');

var _handleResponse2 = _interopRequireDefault(_handleResponse);

var _jwt = require('../utils/jwt');

var _jwt2 = _interopRequireDefault(_jwt);

var _index = require('../models/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();
var jwtAuthz = require('express-jwt-authz');


router.get('/', _jwt2.default, jwtAuthz(['read:info']), function (req, res) {
    _index2.default.AdminLevel.findAll().then(function (adminLevels) {
        (0, _handleResponse2.default)(adminLevels, req, res);
    });
});

router.get('/:id', _jwt2.default, jwtAuthz(['read:info']), function (req, res) {
    _index2.default.AdminLevel.findById(req.params.id).then(function (adminLevel) {
        (0, _handleResponse2.default)(adminLevel, req, res);
    });
});

router.post('/', _jwt2.default, jwtAuthz(['write:info']), function (req, res) {
    var adminLevel = req.body;
    adminLevel.admin_level_id = null;
    _index2.default.AdminLevel.create(adminLevel).then(function (adminLevel) {
        (0, _handleResponse2.default)(adminLevel.admin_level_id, req, res);
    });
});

router.put('/:id', _jwt2.default, jwtAuthz(['write:info']), function (req, res) {
    var adminLevel = req.body;
    _index2.default.AdminLevel.update(adminLevel, {
        where: { admin_level_id: req.params.id }
    }).then(function (result) {
        if (result[0] === 0) {
            res.status(404).json(result[0]);
        } else {
            res.status(200).json(result[0]);
        }
    });
});

router.delete('/:id', _jwt2.default, jwtAuthz(['delete:info']), function (req, res) {
    _index2.default.AdminLevel.findById(req.params.id).then(function (adminLevel) {
        if (!adminLevel) {
            res.status(404).send(0);
        } else {
            adminLevel.destroy().then(function (result) {
                res.status(200).json(1);
            });
        }
    });
});

module.exports = router;