//match requires
var createMatchMW = require("../middleware/matches/createMatch");
var deleteMatchMW = require("../middleware/matches/deleteMatch");
var updateMatchMW = require("../middleware/matches/updateMatch");
var validateMatchMW = require("../middleware/matches/validateMatch");
var checkMatchIdMW = require("../middleware/matches/checkMatchId");

//Login
var checkLoggedInMW = require("../middleware/login/checkIsLoggedIn");

//common requires
var render = require("../middleware/common/render");
var renderJSON = require("../middleware/common/renderJson");

//model requires
var objRepo = require("../model/objectRepository");

//team requires
var createTeamMW = require("../middleware/teams/createTeam");

module.exports = function(app) {
    //meccsek
    app.use("/match/:matchId/edit",
        checkLoggedInMW(app),
        checkMatchIdMW(objRepo),
        validateMatchMW(objRepo),
        updateMatchMW(objRepo),
        render(objRepo, "matches/matchForm")
    );

    app.use("/match/:matchId/delete",
        checkLoggedInMW(app),
        checkMatchIdMW(objRepo),
        deleteMatchMW(objRepo),
        renderJSON()
    );

    app.use("/match/create/",
        checkLoggedInMW(app),
        validateMatchMW(objRepo),
        createMatchMW(objRepo),
        render(objRepo, "matches/matchForm")
    );

    //csapatok
    app.use("/team/create",
        checkLoggedInMW(app),

        createTeamMW(objRepo),
        render(objRepo, "teams/create")
    );
};