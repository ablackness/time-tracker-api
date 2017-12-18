const express = require('express');
const router = expres.Router();
const db = require('../models/index');
const checkJwt = require('./jwt');
const jwtAuthz = require('express-jwt-authz');

router.get('/', checkJwt, jwtAuthz(['read:info']), function (req, res) {
    db.User
    .findAll()
        .then(users => {
            res.status(200).json(users);
        })
})

router.get('/:id', checkJwt, jwtAuthz(['read:info']),function (req, res) {
    db.User
    .findById(req.params.id)
    .then( user => {
        if(!user) {
            res.status(404).send('No users found');
        } else {
            res.status(200).json(user);
        }
    })
})

router.post('/', checkJwt, jwtAuthz(['write:info']), function (req, res) {
    var user = req.body;
    db.User
    .create(user)
    .then( user => {
        console.log('ID:', user.user_id);
        res.status(201).json(user.user_id);
    })
})

router.put('/:id', checkJwt, jwtAuthz(['write:info']), function(req, res) {
    var user = req.body;
    db.User
    .update(user, {
        where: {id: req.params.id}
    })
    .then( user => {
        if (!user) {
            res.status(404).send('No user found. Invalid ID.');
        } else {
            res.status(204).json(user);
        }    
    })
})

router.delete('/:id', checkJwt, jwtAuthz(['delete:info']), function(req, res) {
    db.User
    .findById(req.params.id)
    .then( user => {
        if (!user) {
            res.status(404).send('No user found. Invalid ID.');
        } else {
            user.destroy()
            res.status(200).json(user);
        }  
    })
})

module.exports = router;