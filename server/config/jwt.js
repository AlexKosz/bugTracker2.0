const jwt = require("jsonwebtoken");
const secret = "ketchupIsASmoothie"

module.exports.secret = secret;

module.exports.authen = (req, res, next) => {
    jwt.verify(req.cookies.usertoken, secret, (err, payload) => {
        if (err) {
            res.status(401).json({ verified: false })
        } else {
            next();
        }
    });
}