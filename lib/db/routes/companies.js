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


router.get('/', /* checkJwt, jwtAuthz(['read:info']),*/function (req, res) {
    _index2.default.Company.findAll().then(function (companies) {
        (0, _handleResponse2.default)(companies, req, res);
    });
});

router.get('/:id', _jwt2.default, jwtAuthz(['read:info']), function (req, res) {
    _index2.default.Company.findById(req.params.id).then(function (company) {
        (0, _handleResponse2.default)(company, req, res);
    });
});

router.post('/', _jwt2.default, jwtAuthz(['write:info']), function (req, res) {
    var company = req.body;
    var d = new Date();
    company.created_date = d;
    company.modified_date = d;
    _index2.default.Company.create(company).then(function (company) {
        (0, _handleResponse2.default)(company.CompanyID, req, res);
    });
});

router.put('/:id', _jwt2.default, jwtAuthz(['write:info']), function (req, res) {
    var company = req.body;
    var d = new Date();
    company.modified_date = d;
    _index2.default.Company.update(company, {
        where: { id: req.params.id }
    }).then(function (company) {
        if (result[0] === 0) {
            res.status(404).send('No company found');
        } else {
            res.status(200).send('Compnay with ID ' + req.params.id + ' updated!');
        }
        // handleResponse(company, req, res);  
    });
});

router.delete('/:id', _jwt2.default, jwtAuthz(['delete:info']), function (req, res) {
    _index2.default.Company.findById(req.params.id).then(function (company) {
        if (!company) {
            res.status(404).send('No company found. Invalid ID.');
        } else {
            company.destroy();
            res.status(200).json(company);
        }
    });
});

module.exports = router;