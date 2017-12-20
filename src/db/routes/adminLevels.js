const express = require('express');
const router = express.Router();
const jwtAuthz = require('express-jwt-authz');
import handleResponse from '../utils/handleResponse';
import checkJwt from '../utils/jwt';
import db from '../models/index';

router.get('/', checkJwt, jwtAuthz(['read:info']), function (req, res) {
    db.AdminLevel
    .findAll()
        .then(adminLevels => {
            handleResponse(adminLevels, req, res);
        })
})

router.get('/:id', checkJwt, jwtAuthz(['read:info']),function (req, res) {
    db.AdminLevel
    .findById(req.params.id)
    .then( adminLevel => {
        handleResponse(adminLevel, req, res);
    })
})

router.post('/', checkJwt, jwtAuthz(['write:info']), function (req, res) {
    var adminLevel = req.body;
    db.AdminLevel
    .create(adminLevel)
    .then( adminLevel => {
        handleResponse(adminLevel.admin_level_id, req, res);
    })
})

router.put('/:id', checkJwt, jwtAuthz(['write:info']), function(req, res) {
    var adminLevel = req.body;
    db.AdminLevel
    .update(adminLevel, {
        where: {id: req.params.id}
    })
    .then( adminLevel => {
        handleResponse(adminLevel, req, res);   
    })
})

router.delete('/:id', checkJwt, jwtAuthz(['delete:info']), function(req, res) {
    db.AdminLevel
    .findById(req.params.id)
    .then( adminLevel => {
        if (!adminLevel) {
            res.status(404).send('No adminLevel found. Invalid ID.');
        } else {
            adminLevel.destroy()
            res.status(200).json(adminLevel);
        }  
    })
})

module.exports = router;