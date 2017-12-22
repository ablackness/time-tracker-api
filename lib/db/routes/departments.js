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
    _index2.default.Department.findAll().then(function (departments) {
        (0, _handleResponse2.default)(departments, req, res);
    });
});

router.get('/:id', _jwt2.default, jwtAuthz(['read:info']), function (req, res) {
    _index2.default.Department.findById(req.params.id).then(function (department) {
        (0, _handleResponse2.default)(department, req, res);
    });
});

router.post('/', _jwt2.default, jwtAuthz(['write:info']), function (req, res) {
    var department = req.body;
    _index2.default.Department.create(department).then(function (department) {
        (0, _handleResponse2.default)(department.DepartmentID, req, res);
    });
});

router.put('/:id', _jwt2.default, jwtAuthz(['write:info']), function (req, res) {
    var department = req.body;
    _index2.default.Department.update(department, {
        where: { id: req.params.id }
    }).then(function (department) {
        (0, _handleResponse2.default)(department, req, res);
    });
});

router.delete('/:id', _jwt2.default, jwtAuthz(['delete:info']), function (req, res) {
    _index2.default.Department.findById(req.params.id).then(function (department) {
        if (!department) {
            res.status(404).send('No department found. Invalid ID.');
        } else {
            department.destroy();
            res.status(200).json(department);
        }
    });
});

module.exports = router;