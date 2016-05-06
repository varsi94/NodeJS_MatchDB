//Login requires
var checkLoginMW = require("../middleware/login/checkLoginPw");
var checkLoggedInMW = require("../middleware/login/checkIsLoggedIn");
var logoutMW = require("../middleware/login/logout");
var setIsLoggedInMW = require("../middleware/login/setIsLoggedIn");

//Match requires
var checkMatchIdMW = require("../middleware/matches/checkMatchId");
var getMatchesMW = require("../middleware/matches/getMatches");
var searchMatchesMW = require("../middleware/matches/searchMatches");
var formatMatchDateMW = require("../middleware/matches/formatMatchDate");

//common requires
var render = require("../middleware/common/render");
var renderJson = require("../middleware/common/renderJson");
var setTitleMW = require("../middleware/common/setTitle");

//model requires
var objRepo = require("../model/objectRepository");

module.exports = function (app) {
    //admin autentikáció
    app.use("/login",
        checkLoginMW(objRepo),
        setIsLoggedInMW(),
        renderJson()
    );

    app.use("/logout",
        checkLoggedInMW(app),
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
        formatMatchDateMW(objRepo),
        setIsLoggedInMW(),
        render(objRepo, "matches/listMatches")
    );

    app.use("/search/:keyword",
        searchMatchesMW(objRepo),
        formatMatchDateMW(objRepo),
        setIsLoggedInMW(),
        render(objRepo, "matches/listMatches")
    );

    app.get("/", function(req, res, next) {
        return res.redirect("/matches/");
    });

    //hiba
    app.use("/error/404",
        setTitleMW("404 - a lap nem található"),
        function(req, res, next) {
            res.status = 404;
            return next();
        },
        setIsLoggedInMW(),
        render(objRepo, "error/404")
    );
};