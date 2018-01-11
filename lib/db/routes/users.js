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
    _index2.default.User.findAll().then(function (users) {
        (0, _handleResponse2.default)(users, req, res);
    });
});

router.get('/:id', _jwt2.default, jwtAuthz(['read:info']), function (req, res) {
    _index2.default.User.findById(req.params.id).then(function (user) {
        (0, _handleResponse2.default)(user, req, res);
    });
});

router.post('/', _jwt2.default, jwtAuthz(['write:info']), function (req, res) {
    var user = req.body;
    var d = new Date();
    user.created_date = d;
    user.modified_date = d;
    user.user_id = null;
    _index2.default.User.create(user).then(function (user) {
        (0, _handleResponse2.default)(user.user_id, req, res);
    });
});

router.put('/:id', _jwt2.default, jwtAuthz(['write:info']), function (req, res) {
    var user = req.body;
    var d = new Date();
    user.modified_date = d;
    _index2.default.User.update(user, {
        where: { user_id: req.params.id }
    }).then(function (result) {
        if (result[0] === 0) {
            res.status(404).json(result[0]);
        } else {
            res.status(200).json(result[0]);
        }
    });
});

router.delete('/:id', _jwt2.default, jwtAuthz(['delete:info']), function (req, res) {
    _index2.default.User.findById(req.params.id).then(function (user) {
        if (!user) {
            res.status(404).send(0);
        } else {
            user.destroy().then(function (result) {
                res.status(200).json(1);
            });
        }
    });
});

module.exports = router;