const express = require('express');
const router = express.Router();
const jwtAuthz = require('express-jwt-authz');
import handleResponse from '../utils/handleResponse';
import checkJwt from '../utils/jwt';
import db from '../models/index';

router.get('/', checkJwt, jwtAuthz(['read:info']), function (req, res) {
    db.User
    .findAll()
        .then(users => {
            handleResponse(users, req, res);
        })
})

router.get('/:id', checkJwt, jwtAuthz(['read:info']),function (req, res) {
    db.User
    .findById(req.params.id)
    .then( user => {
        handleResponse(user, req, res);
    })
})

router.post('/', checkJwt, jwtAuthz(['write:info']), function (req, res) {
    var user = req.body;
    var d = new Date();
    user.created_date = d;
    user.modified_date = d;
    user.user_id = null;
    db.User
    .create(user)
    .then( user => {
        handleResponse(user.user_id, req, res);
    })
})

router.put('/:id', checkJwt, jwtAuthz(['write:info']), function(req, res) {
    var user = req.body;
    const d = new Date();
    user.modified_date = d;
    db.User
    .update(user, {
        where: {id: req.params.id}
    })
    .then( user => {
        if(result[0] === 0) 
        {
            res.status(404).send('No employee found');
        } else {
            res.status(200).send('User with ID ' + req.params.id + ' updated!');
        }
        // handleResponse(user, req, res);   
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