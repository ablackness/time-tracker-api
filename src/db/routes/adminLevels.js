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
    adminLevel.admin_level_id = null;
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
    .then( result => {
        if(result[0] === 0) 
        {
            res.status(404).json(result[0]);
        } else {
            res.status(200).json(result[0]);
        }
    })
})

router.delete('/:id', checkJwt, jwtAuthz(['delete:info']), function(req, res) {
    db.AdminLevel
    .findById(req.params.id)
    .then( adminLevel => {
        if (!adminLevel) {
            res.status(404).send(0);
        } else {
            adminLevel.destroy()
            .then( result => {
                res.status(200).json(1);
            })
        }  
    })
})

module.exports = router;