var loginpwmodel = require("../models/loginpw");

module.exports = function() {
    return function(req, res, next) {
        console.log(req.query.pw);
        console.log(loginpwmodel.getPassword() === req.query.pw);
        console.log("joeajelszo");
        return next();
    }
}