var expect = require("chai").expect;
var createMatchMW = require("../middleware/matches/createMatch");

var matchModel = {
    matches: [],

    createMatch: function(match, callback) {
        this.matches.push(match);
        return callback(true);
    },

    dateFormat: function(date, pattern) {
        return "xy";
    }
};

var teamModel = {
    teams: [{
        "_id": 1,
        name: "Real Madrid",
        nationality: "spanyol"
    },{
        "_id": 2,
        name: "Atletico Madrid",
        nationality: "spanyol"
    }],

    getTeams: function(callback) {
        return callback(null, this.teams);
    }
}

var objRepo = {
    matches: matchModel,
    teams: teamModel
};

describe("createMatch middleware", function(){
    it ("should create template", function(done) {
        var req = { method: "GET"};
        var res = {
            tpl: {},
            error: []
        };

        createMatchMW(objRepo)(req, res, function() {
            expect(res.tpl).to.eql({
                defaultData: {
                    matchType: "",
                    homeTeam: null,
                    awayTeam: null,
                    homeScore: 0,
                    awayScore: 0,
                    spectators: 0,
                    date: matchModel.dateFormat(new Date(), "yyyy-mm-dd"),
                    time: "20:00",
                    stadium: "",
                    referee: ""
                },
                title: "Új meccs létrehozása",
                teams: teamModel.teams,
                action: "/match/create",
                error: res.error
            });
            done();
        }, 0);
    });

    it("should create match", function(done) {
        var req = {
            method: "POST",
            body: {
                "_id": 1,
                homeTeam: "asd1",
                awayTeam: "asd2",
                date: "1994-5-22",
                time: "20:45"
            }
        };

        var res = {
            tpl: {},
            error: [],
            redirect: function(s) {
                expect(s).to.eql("/match/successfulCreate");
                expect(objRepo.matches.matches.length).to.eql(1);
                expect(objRepo.matches.matches[0]).to.eql({
                    "_id": 1,
                    homeTeam: "asd1",
                    awayTeam: "asd2",
                    time: "20:45",
                    date: Date.parse("1994-5-22 20:45")
                });
                done();
            }
        };

        createMatchMW(objRepo)(req, res, function() { }, 0);
    });

    it("should restore default data", function(done) {
        var req = {
            method: "POST",
            body: {
                matchType: "asd",
                homeTeam: "x",
                awayTeam: "y",
                homeScore: 2,
                awayScore: 0,
                spectators: -1,
                date: matchModel.dateFormat(new Date(), "yyyy-mm-dd"),
                time: "20:00",
                stadium: "asd",
                referee: "fgh"
            }
        };
        var res = {
            tpl: {},
            error: [0]
        };

        createMatchMW(objRepo)(req, res, function() {
            expect(res.tpl).to.eql({
                defaultData: {
                    matchType: "asd",
                    homeTeam: "x",
                    awayTeam: "y",
                    homeScore: 2,
                    awayScore: 0,
                    spectators: -1,
                    date: matchModel.dateFormat(new Date(), "yyyy-mm-dd"),
                    time: "20:00",
                    stadium: "asd",
                    referee: "fgh"
                },
                title: "Új meccs létrehozása",
                teams: teamModel.teams,
                action: "/match/create",
                error: res.error
            });
            done();
        }, 0);
    });
});