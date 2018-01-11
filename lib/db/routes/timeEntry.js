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


router.get('/', /* checkJwt, jwtAuthz(['read:info']), */function (req, res) {
    _index2.default.TimeEntry.findAll().then(function (timeEntries) {
        (0, _handleResponse2.default)(timeEntries, req, res);
    });
});

router.get('/:id', _jwt2.default, jwtAuthz(['read:info']), function (req, res) {
    _index2.default.TimeEntry.findById(req.params.id).then(function (timeEntry) {
        (0, _handleResponse2.default)(timeEntry, req, res);
    });
});

router.post('/', /* checkJwt, jwtAuthz(['write:info']),*/function (req, res) {
    var timeEntry = req.body;
    var d = new Date();
    timeEntry.created_date = d;
    timeEntry.modified_date = d;
    timeEntry.TimeEntryID = null;
    _index2.default.TimeEntry.create(timeEntry).then(function (timeEntry) {
        (0, _handleResponse2.default)(timeEntry.TimeEntryID, req, res);
    });
});

router.put('/:id', /* checkJwt, jwtAuthz(['write:info']), */function (req, res) {
    var timeEntry = req.body;
    var d = new Date();
    timeEntry.modified_date = d;
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

router.delete('/:id', /* checkJwt, jwtAuthz(['delete:info']),*/function (req, res) {
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