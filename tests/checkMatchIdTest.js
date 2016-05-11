var expect = require("chai").expect;
var checkMatchIdMW = require("../middleware/matches/checkMatchId");

var matchModel = {
    matches: [{
        "_id": 1,
        "homeTeam": "Real Madrid"
    }],

    checkMatchId: function(id, callback) {
        for (var i = 0; i < this.matches.length; i++) {
            if (this.matches[i]._id == id) {
                return callback(true);
            }
            callback(false);
        }
    }
};

var objRepo = {
    matches: matchModel
};

describe("checkMatchId middleware", function(){
    it ("should return 404", function() {
        var req = { params: {
            matchId: 2
        }};
        var res = {tpl: {}, redirect: function(s) {
            expect(s).to.eql("/error/404");
        }};


        checkMatchIdMW(objRepo)(req, res, function() {}, 0);
    });

    it ("should call next", function(done) {
        var req = { params: {
            matchId: 1
        }};

        var res = {tpl: {}, redirect: function(s) {
            throw new Error();
        }};

        checkMatchIdMW(objRepo)(req, res, function() {
            done();
        }, 0);
    });
});