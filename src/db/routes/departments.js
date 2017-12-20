const express = require('express');
const router = express.Router();
const jwtAuthz = require('express-jwt-authz');
import handleResponse from '../utils/handleResponse';
import checkJwt from '../utils/jwt';
import db from '../models/index';

router.get('/', /*checkJwt, jwtAuthz(['read:info']),*/ function (req, res) {
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
    db.Department
    .create(department)
    .then( department => {
        handleResponse(department.DepartmentID, req, res);
    })
})

router.put('/:id', checkJwt, jwtAuthz(['write:info']), function(req, res) {
    var department = req.body;
    db.Department
    .update(department, {
        where: {id: req.params.id}
    })
    .then( department => {
        handleResponse(department, req, res);   
    })
})

router.delete('/:id', checkJwt, jwtAuthz(['delete:info']), function(req, res) {
    db.Department
    .findById(req.params.id)
    .then( department => {
        if (!department) {
            res.status(404).send('No department found. Invalid ID.');
        } else {
            department.destroy()
            res.status(200).json(department);
        }  
    })
})

module.exports = router;