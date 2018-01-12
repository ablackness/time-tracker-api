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
    _index2.default.TimeEntry.findAll().then(function (timeEntries) {
        (0, _handleResponse2.default)(timeEntries, req, res);
    });
});

router.get('/:id', _jwt2.default, jwtAuthz(['read:info']), function (req, res) {
    _index2.default.TimeEntry.findById(req.params.id).then(function (timeEntry) {
        (0, _handleResponse2.default)(timeEntry, req, res);
    });
});

router.post('/', _jwt2.default, jwtAuthz(['write:info']), function (req, res) {
    var body = req.body;
    var d = new Date();
    var timeEntry = {
        TimeEntryID: null,
        created_by: body.created_by,
        created_date: d,
        modified_by: body.modified_by,
        modified_date: d,
        StartTime: d,
        Active: 1
    };
    console.log('body', body.EmployeeJobID, body);
    if (body.employeeJobID === null) {
        console.log('employee job ID is null');
        var employeeJob = {
            EmployeeID: body.EmployeeID,
            JobID: body.JobID,
            created_by: body.created_by,
            created_date: d,
            modified_by: body.modified_by,
            modified_date: d
        };
        console.log('employee job', employeeJob);
        _index2.default.EmployeeJob.create(employeeJob).then(function (employeeJob) {
            timeEntry.EmployeeJobID = employeeJob.EmployeeJobID;
            timeEntry.EmployeeID = employeeJob.EmployeeID;
            timeEntry.JobID = employeeJob.JobID;
            console.log('time entry', timeEntry);
            _index2.default.TimeEntry.create(timeEntry).then(function (timeEntry) {
                (0, _handleResponse2.default)(timeEntry.TimeEntryID, req, res);
            });
        });
    } else {
        timeEntry.EmployeeJobID = body.EmployeeJobID;
        timeEntry.EmployeeID = body.EmployeeID;
        timeEntry.JobID = body.JobID;
        console.log('time entry, empJobID not null', timeEntry);
        _index2.default.TimeEntry.create(timeEntry).then(function (timeEntry) {
            (0, _handleResponse2.default)(timeEntry.TimeEntryID, req, res);
        });
    }
});

router.put('/:id', _jwt2.default, jwtAuthz(['write:info']), function (req, res) {
    var d = new Date();
    var timeEntry = req.body;
    timeEntry.modified_date = d;
    timeEntry.EndTime = d;
    timeaEntry.IsClockedIn = 0;
    _index2.default.TimeEntry.update(timeEntry, {
        where: { TimeEntryID: req.params.id }
    }).then(function (result) {
        if (result[0] === 0) {
            res.status(404).json(result[0]);
        } else {
            res.status(200).json(result[0]);
        }
    });
});

router.delete('/:id', _jwt2.default, jwtAuthz(['delete:info']), function (req, res) {
    _index2.default.TimeEntry.findById(req.params.id).then(function (timeEntry) {
        if (!timeEntry) {
            res.status(404).send(0);
        } else {
            timeEntry.destroy().then(function (result) {
                res.status(200).json(1);
            });
        }
    });
});

module.exports = router;