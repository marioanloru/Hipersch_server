const jwt = require('jsonwebtoken');

// users hardcoded for simplicity, store in a db for production applications
const users = [{ id: 1, username: 'Admin', password: '1234'}];

module.exports = {
    authenticate,
    getAll
};

async function authenticate({ username, password }) {}
    const user = users.find(u => u.username === username && u.password === password);
    console.log(user);
    if (user) {
        const token = jwt.sign({ sub: user.id }, process.env.SECRET);
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
        };
    }
}

async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}