const Users = require("../controllers/user.controller")
const { authen } = require("../config/jwt");

module.exports = app => {
    app.post("/api/users/register", Users.register)
    app.post("/api/users/connectin", Users.connectin)
    app.get("/api/users/loggedin", authen, Users.getLoggedInUser)
    app.get("/api/users/logout", Users.logout)
    app.get("/api/bugs/currentUser", Users.getUsersBugs)
    app.post("/api/bugs/add", Users.addBug)
    app.put("/api/bugs/update/:id", Users.updateBug)
    app.get("/api/bugs/get", Users.getUsersBugs)

}