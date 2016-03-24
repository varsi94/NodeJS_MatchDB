var matchModel = require("./matchModel");
var teamModel = require("./teamModel");

module.exports = {
    adminUser: {
        userName: "admin",
        password: "admin"
    },

    matches: matchModel,
    teams: teamModel
};