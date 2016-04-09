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
var setTitleMW = require("../middleware/common/setTitle");

//model requires
var objRepo = require("../model/objectRepository");

//team requires
var createTeamMW = require("../middleware/teams/createTeam");
var validateTeamMW = require("../middleware/teams/validateTeam");

module.exports = function(app) {
    //meccsek
    app.use("/match/:matchId/edit",
        checkLoggedInMW(app),
        checkMatchIdMW(objRepo),
        validateMatchMW(objRepo),
        updateMatchMW(objRepo),
        render(objRepo, "matches/matchForm")
    );

    app.use("/match/successfulEdit",
        checkLoggedInMW(app),
        setTitleMW("Sikeres módosítás"),
        render(objRepo, "matches/editSuccessful")
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

    app.use("/match/successfulCreate/",
        checkLoggedInMW(app),
        setTitleMW("Sikeres létrehozás"),
        render(objRepo, "matches/createSuccessful")
    );

    //csapatok
    app.use("/team/create",
        checkLoggedInMW(app),
        validateTeamMW(objRepo),
        createTeamMW(objRepo),
        render(objRepo, "teams/create")
    );

    app.use("/team/successfulCreate",
        checkLoggedInMW(app),
        setTitleMW("Sikeres létrehozás"),
        render(objRepo, "teams/createSuccessful")
    );
};