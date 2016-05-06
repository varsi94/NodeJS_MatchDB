var matchModel = require("./matchModel");
var teamModel = require("./teamModel");
var mongoose = require("mongoose");

var teamSchema = require("./teamSchema");
var matchSchema = require("./matchSchema");

mongoose.connect("mongodb://localhost/DH5ZT5", function(err) {
    if (err) {
        console.log("Connection to database failed!");
    } else {
        console.log("Connection to database estabilished!");
    }
});

var Team = teamSchema(mongoose);
var Match = matchSchema(mongoose);
var teamModelInstance = teamModel(mongoose, Team, Match);
var matchModelInstance = matchModel(mongoose, teamModelInstance, Match);

module.exports = {
    adminUser: {
        userName: "admin",
        password: "admin"
    },

    teams: teamModelInstance,
    matches: matchModelInstance
};