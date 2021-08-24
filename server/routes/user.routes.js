const UserController = require("../controllers/user.controller");
const { authenticate } = require("../config/jwt.config");

module.exports = function (app) {
    app.post('/api/users/register', UserController.register)
    app.post('/api/users/login', UserController.login)

    app.get('/api/users/loggedin', authenticate, UserController.getLoggedInUser)
    app.get('/api/users/logout', UserController.logout)
}