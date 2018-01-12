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
var Seqeulize = require('sequelize');

var employeeCache = {};
employeeCache.needsToUpdate = true;
var cacheRefreshTime = 86400;

//route to get all employees from DB -  will use cache if it is available and not expired
router.get('/', _jwt2.default, jwtAuthz(['read:info']), function (req, res) {
    if (Date.now() - employeeCache.updatedTime > cacheRefreshTime) {
        employeeCache.needsToUpdate = true;
    }
    if (employeeCache && !employeeCache.needsToUpdate) {
        console.log('getting data from cache');
        (0, _handleResponse2.default)(employeeCache.employees, req, res);
    } else {
        console.log('hitting DB');
        _index2.default.Employee.findAll().then(function (employees) {
            employeeCache.employees = employees;
            employeeCache.updatedTime = Date.now();
            employeeCache.needsToUpdate = false;
            (0, _handleResponse2.default)(employees, req, res);
        });
    }
});

router.get('/clockedIn', _jwt2.default, jwtAuthz(['read:info']), function (req, res) {
    _index2.default.sequelize.query('exec GetClockedInEmployees', { type: _index2.default.sequelize.QueryTypes.SELECT }).then(function (employees) {
        if (req.headers.origin) {
            res.status(200).json(employees);
        } else {
            res.status(200).json({ value: employees });
        }
    });
});

router.get('/clockedOut', _jwt2.default, jwtAuthz(['read:info']), function (req, res) {
    _index2.default.sequelize.query('exec GetClockedOutEmployees', { type: _index2.default.sequelize.QueryTypes.SELECT }).then(function (employees) {
        if (req.headers.origin) {
            res.status(200).json(employees);
        } else {
            res.status(200).json({ value: employees });
        }
    });
});

router.get('/:id', _jwt2.default, jwtAuthz(['read:info']), function (req, res) {
    _index2.default.Employee.findById(req.params.id).then(function (employee) {
        (0, _handleResponse2.default)(employee, req, res);
    });
});

router.post('/', _jwt2.default, jwtAuthz(['write:info']), function (req, res) {
    var employee = req.body;
    var d = new Date();
    employee.created_date = d;
    employee.modified_date = d;
    employee.EmployeeID = null;
    _index2.default.Employee.create(employee).then(function (employee) {
        employeeCache.needsToUpdate = true;
        (0, _handleResponse2.default)(employee.EmployeeID, req, res);
    });
});

router.put('/:id', _jwt2.default, jwtAuthz(['write:info']), function (req, res) {
    var employee = req.body;
    var d = new Date();
    employee.modified_date = d;
    _index2.default.Employee.update(employee, {
        where: { EmployeeID: req.params.id }
    }).then(function (result) {
        if (result[0] === 0) {
            res.status(404).json(result[0]);
        } else {
            employeeCache.needsToUpdate = true;
            res.status(200).json(result[0]);
        }
    });
});

router.delete('/:id', _jwt2.default, jwtAuthz(['delete:info']), function (req, res) {
    _index2.default.Employee.findById(req.params.id).then(function (employee) {
        if (!employee) {
            // to log later
            res.status(404).send(0);
        } else {
            employee.destroy().then(function (result) {
                employeeCache.needsToUpdate = true;
                res.status(200).json(1);
            });
        }
    });
});

module.exports = router;