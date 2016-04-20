var dateFormat = require("dateformat");
dateFormat.masks.basic = "yyyy mmmm dS, HH:MM";

module.exports = function(mongoose, teamModel) {
    var Match = mongoose.model("Match", {
        id: mongoose.Schema.Types.ObjectId,
        matchType: String,
        homeTeam: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team"
        },
        awayTeam: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team"
        },
        homeScore: Number,
        awayScore: Number,
        spectators: Number,
        date:  {
            type: Date,
            default: Date.now()
        },
        stadium: String,
        referee: String
    }, "Matches");

    return {
        dateFormat: dateFormat,
        getMatches: function(callback) {
            //visszaadja az összes meccset
            return Match.find({}).populate("homeTeam").populate("awayTeam").exec(callback);
        },

        getMatchById: function (id, callback) {
            return Match.find({"_id": id}, function(err, data) {
                if (err) {
                    callback(null);
                } else {
                    callback(data[0]);
                }
            });
        },

        searchMatches : function(keyword, callback) {
            //visszaadja az összes meccset, aminek a bajnokság nevében, vagy valamelyik csapat nevében részleges
            //egyezést talál
            var searchedTeams = teamModel.searchTeams(keyword, function(teams) {
                return Match.find({ $or: [
                        {homeTeam: {$in: teams}},
                        {matchType: new RegExp(keyword, "i")},
                        {awayTeam: {$in: teams}}
                    ]})
                    .populate("homeTeam")
                    .populate("awayTeam")
                    .exec(callback);
            });
        },

        deleteMatch : function(id, callback) {
            //törli a megadott azonosítóval rendelkező meccset
            Match.remove({"_id": id}, function(err) {
                return callback(!err);
            });
        },

        modifyMatch : function(id, match, callback) {
            //módosítja a megadott azonosítóval rendelkező meccset a kapott paraméterre
            Match.update({"_id": id}, match, {upsert: false}, function(err) {
                return callback(!err);
            });
        },

        createMatch : function(match, callback) {
            //létrehozza a meccset
            var currMatch = new Match(match);
            currMatch.save(function(err) {
                return callback(!err);
            });
        },

        checkMatchId : function(id, callback) {
            //visszaadja, hogy létezik-e ilyen meccs azonosító
            return Match.find({"_id": id}, function(err, data) {
                if (err) {
                    callback(false);
                } else {
                    callback(true);
                }
            });
        },
    }
};