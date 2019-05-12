const expressJwt = require('express-jwt');


module.exports = jwt;

function jwt() {
    const secret = process.env.SECRET;
    return expressJwt({ secret }).unless({
        path: [
            // public routes that don't require authentication
            '/api/login',
            '/api/register'
        ]
    });
}
