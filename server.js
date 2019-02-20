const express = require('express');
require('dotenv').config();
const jwt = require('express-jwt'); // Validate JWT and set req.user
const jwks = require('jwks-rsa'); // Retrieve RSA keys from a JSON Web Key set (JWKS) endpoint
const checkScopes = require('express-jwt-authz'); // Validate scopes

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://dev-cy1r30w3.auth0.com/.well-known/jwks.json"
    }),
    audience: 'http://localhost:3001',
    issuer: "https://dev-cy1r30w3.auth0.com/",
    algorithms: ['RS256']
});

const app = express();

app.get('/public', function(req, res) {
    res.json({
        message: "Hello from a public api"
    })
});

app.get('/private', jwtCheck, function(req, res) {
    res.json({
        message: "Hello from a private api"
    })
});

app.get('/courses', jwtCheck, checkScopes(['read:courses']), function(req, res) {
    res.json({
        courses: [
            { id: 1, title: "Building React Apps with Redux" },
            { id: 2, title: "Creating reusable React Components" },
            { id: 3, title: "React Redux" }
        ]
    })
});

app.listen(3001);

console.log("Api server listening on " + process.env.REACT_APP_AUTH0_AUDIENCE);
