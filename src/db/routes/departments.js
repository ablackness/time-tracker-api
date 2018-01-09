const express = require('express');
const router = express.Router();
const jwtAuthz = require('express-jwt-authz');
import handleResponse from '../utils/handleResponse';
import checkJwt from '../utils/jwt';
import db from '../models/index';

router.get('/', checkJwt, jwtAuthz(['read:info']), function (req, res) {
    db.Department
    .findAll()
        .then(departments => {
            handleResponse(departments, req, res);
        })
})

router.get('/:id', checkJwt, jwtAuthz(['read:info']),function (req, res) {
    db.Department
    .findById(req.params.id)
    .then( department => {
        handleResponse(department, req, res);
    })
})

router.post('/', checkJwt, jwtAuthz(['write:info']), function (req, res) {
    var department = req.body;
    var d = new Date();
    department.created_date = d;
    department.modified_date = d;
    department.DepartmentID = null;
    db.Department
    .create(department)
    .then( department => {
        handleResponse(department.DepartmentID, req, res);
    })
})

router.put('/:id', checkJwt, jwtAuthz(['write:info']), function(req, res) {
    var department = req.body;
    const d = new Date();
    department.modified_date = d;
    db.Department
    .update(department, {
        where: {id: req.params.id}
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
    db.Department
    .findById(req.params.id)
    .then( department => {
        if (!department) {
            res.status(404).send(0);
        } else {
            department.destroy()
            .then( result => {
                res.status(200).json(1);
            })
        }  
    })
})

module.exports = router;