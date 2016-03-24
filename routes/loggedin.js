//match requires
var createMatchMW = require("../middleware/matches/createMatch");
var deleteMatchMW = require("../middleware/matches/deleteMatch");
var updateMatchMW = require("../middleware/matches/updateMatch");

//Login
var checkLoggedInMW = require("../middleware/login/checkIsLoggedIn");

//common requires
var render = require("../middleware/common/render");
var renderJSON = require("../middleware/common/renderJson");

//model requires
var objRepo = require("../model/objectRepository");

//team requires
var createTeamMW = require("../middleware/teams/createTeam");
var getTeamsMW = require("../middleware/teams/getTeams");

module.exports = function(app) {
    //meccsek
    app.use("/match/:matchId/edit",
        checkLoggedInMW(app),
        updateMatchMW(objRepo),
        render(objRepo, "matchEdit")
    );

    app.use("/match/:matchId/delete",
        checkLoggedInMW(app),
        deleteMatchMW(objRepo),
        render(objRepo, "matchDelete")
    );

    app.use("/match/create/",
        checkLoggedInMW(app),
        createMatchMW(objRepo),
        render(objRepo, "matchCreate")
    );

    //csapatok
    app.use("/teams/",
        checkLoggedInMW(app),
        getTeamsMW(objRepo),
        renderJSON()
    );

    app.use("/team/create",
        checkLoggedInMW(app),
        createTeamMW(objRepo),
        render(objRepo, "createTeam")
    );
};