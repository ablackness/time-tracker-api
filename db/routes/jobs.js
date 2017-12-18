const express = require('express');
const router = expres.Router();
const db = require('../models/index');
const checkJwt = require('../../server/app');
const jwtAuthz = require('express-jwt-authz');

router.get('/', checkJwt, jwtAuthz(['read:info']), function (req, res) {
    db.Job
    .findAll()
        .then(jobs => {
            res.status(200).json(jobs);
        })
})

router.get('/:id', checkJwt, jwtAuthz(['read:info']),function (req, res) {
    db.Job
    .findById(req.params.id)
    .then( job => {
        if(!job) {
            res.status(404).send('No job found');
        } else {
            res.status(200).json(job);
        }
    })
})

router.post('/', checkJwt, jwtAuthz(['write:info']), function (req, res) {
    var job = req.body;
    db.Job
    .create(job)
    .then( job => {
        console.log('ID:', job.JobID);
        res.status(201).json(job.JobID);
    })
})

router.put('/:id', checkJwt, jwtAuthz(['write:info']), function(req, res) {
    var job = req.body;
    db.Job
    .update(job, {
        where: {id: req.params.id}
    })
    .then( job => {
        if (!job) {
            res.status(404).send('No job found. Invalid ID.');
        } else {
            res.status(204).json(job);
        }    
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