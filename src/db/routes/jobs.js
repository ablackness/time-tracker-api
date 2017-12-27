const express = require('express');
const router = express.Router();
const jwtAuthz = require('express-jwt-authz');
import handleResponse from '../utils/handleResponse';
import checkJwt from '../utils/jwt';
import db from '../models/index';

router.get('/', checkJwt, jwtAuthz(['read:info']), function (req, res) {
    db.Job
    .findAll()
        .then(jobs => {
            handleResponse(jobs, req, res);
        })
})

router.get('/:id', checkJwt, jwtAuthz(['read:info']),function (req, res) {
    db.Job
    .findById(req.params.id)
    .then( job => {
        handleResponse(job, req, res);
    })
})

router.post('/', checkJwt, jwtAuthz(['write:info']), function (req, res) {
    var job = req.body;
    var d = new Date();
    job.created_date = d;
    job.modified_date = d;
    db.Job
    .create(job)
    .then( job => {
        handleResponse(job.JobID, req, res);
    })
})

router.put('/:id', checkJwt, jwtAuthz(['write:info']), function(req, res) {
    var job = req.body;
    const d = new Date();
    job.modified_date = d;
    db.Job
    .update(job, {
        where: {id: req.params.id}
    })
    .then( result => {
        if(result[0] === 0) {
            res.status(404).send('No job found');
        } else {
            res.status(200).send('Job with ID ' + req.params.id + ' updated!');
        }
        // handleResponse(job, req, res);  
    })
})

router.delete('/:id', checkJwt, jwtAuthz(['delete:info']), function(req, res) {
    db.Job
    .findById(req.params.id)
    .then( job => {
        if (!job) {
            res.status(404).send('No job found. Invalid ID.');
        } else {
            job.destroy()
            res.status(200).json(job);
        }  
    })
})

module.exports = router;