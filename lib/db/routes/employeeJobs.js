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
    _index2.default.EmployeeJob.findAll().then(function (employeeJobs) {
        (0, _handleResponse2.default)(employeeJobs, req, res);
    });
});

router.get('/:id', _jwt2.default, jwtAuthz(['read:info']), function (req, res) {
    _index2.default.EmployeeJob.findById(req.params.id).then(function (employeeJob) {
        (0, _handleResponse2.default)(employeeJob, req, res);
    });
});

router.post('/', _jwt2.default, jwtAuthz(['write:info']), function (req, res) {
    var employeeJob = req.body;
    var d = new Date();
    employeeJob.created_date = d;
    employeeJob.modified_date = d;
    employeeJob.EmployeeJobID = null;
    _index2.default.EmployeeJob.create(employeeJob).then(function (employeeJob) {
        (0, _handleResponse2.default)(employeeJob.EmployeeJobID, req, res);
    });
});

router.put('/:id', _jwt2.default, jwtAuthz(['write:info']), function (req, res) {
    var employeeJob = req.body;
    var d = new Date();
    employeeJob.modified_date = d;
    _index2.default.EmployeeJob.update(employeeJob, {
        where: { EmployeeJobID: req.params.id }
    }).then(function (result) {
        if (result[0] === 0) {
            res.status(404).json(result[0]);
        } else {
            res.status(200).json(result[0]);
        }
    });
});

router.delete('/:id', _jwt2.default, jwtAuthz(['delete:info']), function (req, res) {
    _index2.default.EmployeeJob.findById(req.params.id).then(function (employeeJob) {
        if (!employeeJob) {
            res.status(404).send(0);
        } else {
            employeeJob.destroy().then(function (result) {
                res.status(200).json(1);
            });
        }
    });
});

module.exports = router;