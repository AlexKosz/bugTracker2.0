const Users = require("../controllers/user.controller")
const { authen } = require("../config/jwt");

module.exports = app => {
    app.post("/api/register", Users.register)
    app.post("/api/login", Users.login)
    app.get("/api/users/loggedin", authen, Users.getLoggedInUser)
    app.get("/api/users/logout", Users.logout)
}