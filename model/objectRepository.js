var matchModel = require("./matchModel");
var teamModel = require("./teamModel");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/DH5ZT5", function(err) {
    if (err) {
        console.log("Connection to database failed!");
    } else {
        console.log("Connection to database estabilished!");
    }
});

var teamModelInstance = teamModel(mongoose);
var matchModelInstance = matchModel(mongoose, teamModelInstance);

module.exports = {
    adminUser: {
        userName: "admin",
        password: "admin"
    },

    teams: teamModelInstance,
    matches: matchModelInstance
};