var checkLoginMW = require("../middleware/login/checkLoginPw");
var checkLoggedInMW = require("../middleware/login/checkIsLoggedIn");
var render = require("../middleware/common/render");
var objRepo = require("../model/objectRepository");

module.exports = function (app) {
    app.use("/login",
        checkLoggedInMW(app),
        checkLoginMW(objRepo),
        render(objRepo, "Login failed")
    );
};