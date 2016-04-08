//Login requires
var checkLoginMW = require("../middleware/login/checkLoginPw");
var checkLoggedInMW = require("../middleware/login/checkIsLoggedIn");
var logoutMW = require("../middleware/login/logout");

//Match requires
var checkMatchIdMW = require("../middleware/matches/checkMatchId");
var getMatchesMW = require("../middleware/matches/getMatches");
var searchMatchesMW = require("../middleware/matches/searchMatches");

//common requires
var render = require("../middleware/common/render");

//model requires
var objRepo = require("../model/objectRepository");

module.exports = function (app) {
    //admin autentikáció
    app.use("/login",
        checkLoggedInMW(app),
        checkLoginMW(objRepo),
        render(objRepo, "Login failed")
    );

    app.use("/logout",
        logoutMW(),
        function(req, res, next) {
            res.redirect("/")
        }
    );

    app.param("keyword",
        function(req, res, next, id) {
            return next();
        }
    );
    app.param("matchId",
        checkMatchIdMW(objRepo)
    );

    //meccsek
    app.use("/matches/",
        getMatchesMW(objRepo),
        render(objRepo, "matches/listMatches")
    );

    app.use("/search/:keyword",
        searchMatchesMW(objRepo),
        render(objRepo, "matches/listMatches")
    );
};