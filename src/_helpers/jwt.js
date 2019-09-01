const expressJwt = require('express-jwt');


module.exports = jwt;

//  Function to set JWT authentication and public routes without it
function jwt() {
    const secret = process.env.SECRET;
    return expressJwt({ secret }).unless({
        path: [
            // public routes that don't require authentication
            '/api/user/login',
            '/api/user/login/trainer',
            '/api/user/register',
            '/api/status'
        ]
    });
}
