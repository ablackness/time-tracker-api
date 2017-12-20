'use strict';

var jwt = require('express-jwt');
var jwksRsa = require('jwks-rsa');

var checkJwt = jwt({
    // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://codeblack.auth0.com/.well-known/jwks.json'
    }),

    // Validate the audience and the issuer.
    audience: 'http://localhost:8080',
    issuer: 'https://codeblack.auth0.com/',
    algorithms: ['RS256']
});

module.exports = checkJwt;