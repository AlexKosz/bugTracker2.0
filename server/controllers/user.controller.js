const User = require("../models/user.model");
const Bug = require("../models/bug.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/jwt");


class UserController {
    register(req, res) {
        const user = new User(req.body)
        user.save()
            .then(() => {
                res.cookie("usertoken", jwt.sign({ _id: user.id }, secret), { httpOnly: true })
                    .json({ msg: "succ created user", user: user })
            })
            .catch(err => res.json(err))
    }

    addBug(req, res) {
        const bug = new Bug(req.body)
        bug.save()
            .then(() => {
                res.json({ msg: "succ created bug", bug: bug })
            })
            .catch(err => res.json(err))
    }

    updateBug(req, res) {
        Bug.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
        )
            .then(() => {
                res.json({ msg: "updated", bug: bug })
            })
            .catch(err => res.json(err))
    }

    register(req, res) {
        const user = new User(req.body)
        user.save()
            .then(() => {
                res.cookie("usertoken", jwt.sign({ _id: user.id }, secret), { httpOnly: true })
                    .json({ msg: "succ created user", user: user })
            })
            .catch(err => res.json(err))
    }


    connectin(req, res) {
        User.findOne({ email: req.body.email })
            .then(user => {
                if (user === null) {
                    res.json({ msg: "Invalid login attempt - email" })
                }
                else {
                    bcrypt.compare(req.body.password, user.password)
                        .then(passwordIsValid => {
                            if (passwordIsValid) {
                                res.cookie("usertoken", jwt.sign({ _id: user.id }, secret), { httpOnly: true })
                                    .json({ msg: "succ" });
                            }
                            else {
                                res.json({ msg: "Failure - pass" })
                            }
                        })
                        .catch(err => res.json({ msg: "invalid attempt" }, err))
                }
            })
            .catch(err => res.json(err))
    }

    getLoggedInUser(req, res) {
        const decoded = jwt.decode(req.cookies.usertoken, { complete: true });
        User.findById(decoded.payload._id)
            .then(user => res.json(user))
            .catch(err => res.json(err))
    }

    getUsersBugs(req, res) {
        const decoded = jwt.decode(req.cookies.usertoken, { complete: true });
        Bug.find({ userId: decoded.payload._id })
            .then(bugs => res.json(bugs))
            .catch(err => res.json(err))
    }

    logout(req, res) {
        res.cookie("usertoken", jwt.sign({ _id: "" }, secret), { httpOnly: true, maxAge: 0 }).json({ msg: "ok boomer" })
    }





}

module.exports = new UserController()