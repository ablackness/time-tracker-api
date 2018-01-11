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
    var d = new Date();
    company.created_date = d;
    company.modified_date = d;
    company.CompanyID = null;
    db.Company
    .create(company)
    .then( company => {
        handleResponse(company.CompanyID, req, res);
    })
})

router.put('/:id', checkJwt, jwtAuthz(['write:info']), function(req, res) {
    var company = req.body;
    const d = new Date();
    company.modified_date = d;
    db.Company
    .update(company, {
        where: {CompanyID: req.params.id}
    })
    .then( result => {
        if(result[0] === 0) {
            res.status(404).json(result[0]);
        } else {
            res.status(200).json(result[0]);
        }
    })
})

router.delete('/:id', checkJwt, jwtAuthz(['delete:info']), function(req, res) {
    db.Company
    .findById(req.params.id)
    .then( company => {
        if (!company) {
            res.status(404).send(0);
        } else {
            company.destroy()
            .then( result => {
                res.status(200).json(1);
            })
        }  
    })
})

module.exports = router;