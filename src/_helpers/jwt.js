const expressJwt = require('express-jwt');


module.exports = jwt;

function jwt() {
    const secret = process.env.SECRET;
    console.log('SECRET -> secret');
    return expressJwt({ secret }).unless({
        path: [
            // public routes that don't require authentication
            '/api/user/login',
            '/api/user/register',
            '/',
            'api'
        ]
    });
}
