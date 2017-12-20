const express = require('express');
const router = express.Router();
const jwtAuthz = require('express-jwt-authz');
import handleResponse from '../utils/handleResponse';
import checkJwt from '../utils/jwt';
import db from '../models/index';

router.get('/', checkJwt, jwtAuthz(['read:info']), function (req, res) {
    db.Company
    .findAll()
        .then(companies => {
            handleResponse(companies, req, res);
        })
})

router.get('/:id', checkJwt, jwtAuthz(['read:info']),function (req, res) {
    db.Company
    .findById(req.params.id)
    .then( company => {
        handleResponse(company, req, res);
    })
})

router.post('/', checkJwt, jwtAuthz(['write:info']), function (req, res) {
    var company = req.body;
    db.Company
    .create(company)
    .then( company => {
        handleResponse(company.CompanyID, req, res);
    })
})

router.put('/:id', checkJwt, jwtAuthz(['write:info']), function(req, res) {
    var company = req.body;
    db.Company
    .update(company, {
        where: {id: req.params.id}
    })
    .then( company => {
        handleResponse(company, req, res);  
    })
})

router.delete('/:id', checkJwt, jwtAuthz(['delete:info']), function(req, res) {
    db.Company
    .findById(req.params.id)
    .then( company => {
        if (!company) {
            res.status(404).send('No company found. Invalid ID.');
        } else {
            company.destroy()
            res.status(200).json(company);
        }  
    })
})

module.exports = router;