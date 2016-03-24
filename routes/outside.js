var loginpwModel = require("../models/loginpw");
var checkLoginMW = require("../middleware/checkLoginPw");

module.exports = function (app) {
    app.use("/login",
        function(req, res, next) {
            //ha be van lépve átirányít
            next();
        },
        checkLoginMW(),
        function(req, res, next) {
            //html render
            console.log("html");
            res.send("html");
        }
    );
};