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
    _index2.default.Job.findAll().then(function (jobs) {
        (0, _handleResponse2.default)(jobs, req, res);
    });
});

router.get('/:id', _jwt2.default, jwtAuthz(['read:info']), function (req, res) {
    _index2.default.Job.findById(req.params.id).then(function (job) {
        (0, _handleResponse2.default)(job, req, res);
    });
});

router.post('/', _jwt2.default, jwtAuthz(['write:info']), function (req, res) {
    var job = req.body;
    _index2.default.Job.create(job).then(function (job) {
        (0, _handleResponse2.default)(job.JobID, req, res);
    });
});

router.put('/:id', _jwt2.default, jwtAuthz(['write:info']), function (req, res) {
    var job = req.body;
    _index2.default.Job.update(job, {
        where: { id: req.params.id }
    }).then(function (job) {
        (0, _handleResponse2.default)(job, req, res);
    });
});

router.delete('/:id', _jwt2.default, jwtAuthz(['delete:info']), function (req, res) {
    _index2.default.Job.findById(req.params.id).then(function (job) {
        if (!job) {
            res.status(404).send('No job found. Invalid ID.');
        } else {
            job.destroy();
            res.status(200).json(job);
        }
    });
});

module.exports = router;