const express = require('express');
const router = express.Router();
const jwtAuthz = require('express-jwt-authz');
import handleResponse from '../utils/handleResponse';
import handleBooleanResponse from '../utils/handleBooleanResponse';
import checkJwt from '../utils/jwt';
import db from '../models/index';

router.get('/', checkJwt, jwtAuthz(['read:info']), function (req, res) {
    db.TimeEntry
    .findAll()
        .then(timeEntries => {
            handleResponse(timeEntries, req, res);
        })
})

router.get('/:id', checkJwt, jwtAuthz(['read:info']),function (req, res) {
    db.TimeEntry
    .findById(req.params.id)
    .then( timeEntry => {
        handleResponse(timeEntry, req, res);
    })
})

router.post('/', checkJwt, jwtAuthz(['write:info']), function (req, res) {
    var body = req.body;
    var d = new Date();
    var timeEntry = {
        TimeEntryID: null,
        created_by: body.created_by,
        created_date: d,
        modified_by: body.modified_by,
        modified_date: d,
        StartTime: d,
        Active: 1
    }
    console.log('body', body.EmployeeJobID, body)
    if (body.employeeJobID === null) {
        console.log('employee job ID is null');
        var employeeJob = {
            EmployeeID: body.EmployeeID,
            JobID: body.JobID,
            created_by: 'Mobile Clock In',
            created_date: d,
            modified_by: 'Mobile Clock In',
            modified_date: d
        }
        console.log('employee job',employeeJob);
        db.EmployeeJob
        .create(employeeJob)
        .then( employeeJob => {
            timeEntry.EmployeeJobID = employeeJob.EmployeeJobID;
            timeEntry.EmployeeID = employeeJob.EmployeeID;
            timeEntry.JobID = employeeJob.JobID;
            console.log('time entry', timeEntry);
            db.TimeEntry
            .create(timeEntry)
            .then( timeEntry => {
                handleBooleanResponse(timeEntry, req, res);
                // if (!timeEntry) {
                //     res.status(404).send(0);
                // } else {
                //     timeEntry.destroy()
                //     .then( result => {
                //         res.status(200).json(1);
                //     })
                // }
            })
        })
    } else {
        timeEntry.EmployeeJobID = body.EmployeeJobID;
        timeEntry.EmployeeID = body.EmployeeID;
        timeEntry.JobID = body.JobID;
        console.log('time entry, empJobID not null', timeEntry);
        db.TimeEntry
        .create(timeEntry)
        .then( timeEntry => {
            handleBooleanResponse(timeEntry, req, res);
            // if (!timeEntry) {
            //     res.status(404).send(0);
            // } else {
            //     timeEntry.destroy()
            //     .then( result => {
            //         res.status(200).json(1);
            //     })
            // }
        })
    }   
})

router.put('/', checkJwt, jwtAuthz(['write:info']), function(req, res) {
    const d = new Date();
    var timeEntry = req.body;
    timeEntry.modified_date = d;
    timeEntry.EndTime = d;
    timeaEntry.IsClockedIn = 0;
    db.TimeEntry
    .update(timeEntry, {
        where: {EmployeeJobID: body.EmployeeJobID, IsClockedIn: 1 }
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
    db.TimeEntry
    .findById(req.params.id)
    .then( timeEntry => {
        handleBooleanResponse(timeEntry, req, res);
        // if (!timeEntry) {
        //     res.status(404).send(0);
        // } else {
        //     timeEntry.destroy()
        //     .then( result => {
        //         res.status(200).json(1);
        //     })
        // }
    })
})

module.exports = router;