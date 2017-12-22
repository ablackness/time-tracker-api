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

var employeeCache = {};
var cacheRefreshTime = 86400;

//route to get all employees from DB -  will use cache if it is available and not expired
router.get('/', _jwt2.default, jwtAuthz(['read:info']), function (req, res) {
    if (employeeCache && Date.now() - employeeCache.updatedTime < cacheRefreshTime) {
        console.log('getting data from cache');
        (0, _handleResponse2.default)(employeeCache.employees, req, res);
    } else {
        console.log('hitting DB');
        _index2.default.Employee.findAll().then(function (employees) {
            employeeCache.employees = employees;
            employeeCache.updatedTime = Date.now();
            (0, _handleResponse2.default)(employees, req, res);
        });
    }
});

router.get('/:id', _jwt2.default, jwtAuthz(['read:info']), function (req, res) {
    _index2.default.Employee.findById(req.params.id).then(function (employee) {
        (0, _handleResponse2.default)(employee, req, res);
    });
});

router.post('/', _jwt2.default, jwtAuthz(['write:info']), function (req, res) {
    var employee = req.body;
    _index2.default.Employee.create(employee).then(function (employee) {
        console.log('ID:', employee.EmployeeID);
        (0, _handleResponse2.default)(employee.EmployeeID, req, res);
    });
});

router.put('/:id', _jwt2.default, jwtAuthz(['write:info']), function (req, res) {
    var employee = req.body;
    _index2.default.Employee.update(employee, {
        where: { id: req.params.id }
    }).then(function (employee) {
        (0, _handleResponse2.default)(employee, req, res);
    });
});

router.delete('/:id', _jwt2.default, jwtAuthz(['delete:info']), function (req, res) {
    _index2.default.Employee.findById(req.params.id).then(function (employee) {
        if (!employee) {
            res.status(404).send('No employee found.');
        } else {
            employee.destroy();
            res.status(200).json(employee);
        }
    });
});

module.exports = router;