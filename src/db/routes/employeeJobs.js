const express = require('express');
const router = express.Router();
const jwtAuthz = require('express-jwt-authz');
import handleResponse from '../utils/handleResponse';
import checkJwt from '../utils/jwt';
import db from '../models/index';

router.get('/', checkJwt, jwtAuthz(['read:info']), function (req, res) {
    db.EmployeeJob
    .findAll()
        .then(employeeJobs => {
            handleResponse(employeeJobs, req, res);
        })
})

router.get('/:id', checkJwt, jwtAuthz(['read:info']),function (req, res) {
    db.EmployeeJob
    .findById(req.params.id)
    .then( employeeJob => {
        handleResponse(employeeJob, req, res);
    })
})

router.post('/', checkJwt, jwtAuthz(['write:info']), function (req, res) {
    var employeeJob = req.body;
    var d = new Date();
    employeeJob.created_date = d;
    employeeJob.modified_date = d;
    db.EmployeeJob
    .create(employeeJob)
    .then( employeeJob => {
        handleResponse(employeeJob.EmployeeJobID, req, res);
    })
})

router.put('/:id', checkJwt, jwtAuthz(['write:info']), function(req, res) {
    var employeeJob = req.body;
    const d = new Date();
    employeeJob.modified_date = d;
    db.EmployeeJob
    .update(employeeJob, {
        where: {id: req.params.id}
    })
    .then( result => {
        if(result[0] === 0) {
            res.status(404).send('No employee job found');
        } else {
            res.status(200).send('Employee Job with ID ' + req.params.id + ' updated!');
        }
        // handleResponse(job, req, res);  
    })
})

router.delete('/:id', checkJwt, jwtAuthz(['delete:info']), function(req, res) {
    db.EmployeeJob
    .findById(req.params.id)
    .then( employeeJob => {
        if (!employeeJob) {
            res.status(404).send('No employee job found. Invalid ID.');
        } else {
            employeeJob.destroy()
            res.status(200).json(job);
        }  employeeJob
    })
})

module.exports = router;