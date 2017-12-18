const express = require('express');
const router = express.Router();
const db = require('../db/models/index');

router.get('/', checkJwt, jwtAuthz(['read:info']), function (req, res) {
    db.Employee
    .findAll()
        .then(employees => {
            res.status(200).json(employees);
        })
})

router.get('/:id', checkJwt, jwtAuthz(['read:info']),function (req, res) {
    db.Employee
    .findById(req.params.id)
    .then( employee => {
        if(!employee) {
            res.status(404).send('No employee found');
        } else {
            res.status(200).json(employee);
        }
    })
})

router.post('/', checkJwt, jwtAuthz(['write:info']), function (req, res) {
    var employee = req.body;
    db.Employee
    .create(employee)
    .then( employee => {
        console.log('ID:', employee.EmployeeID);
        res.status(201).json(employee.EmployeeID);
    })
})

router.put('/:id', checkJwt, jwtAuthz(['write:info']), function(req, res) {
    var employee = req.body;
    db.Employee
    .update(employee, {
        where: {id: req.params.id}
    })
    .then( employee => {
        if (!employee) {
            res.status(404).send('No employee found. Invalid ID.');
        } else {
            res.status(204).json(employee);
        }    
    })
})

router.delete('/:id', checkJwt, jwtAuthz(['delete:info']), function(req, res) {
    db.Employee
    .findById(req.params.id)
    .then( employee => {
        if (!employee) {
            res.status(404).send('No employee found. Invalid ID.');
        } else {
            employee.destroy()
            res.status(200).json(employee);
        }  
    })
})