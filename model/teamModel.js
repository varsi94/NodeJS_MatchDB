module.exports = function(mongoose) {
    var Team = mongoose.model("Team", {
        id: mongoose.Schema.Types.ObjectId,
        name: String,
        nationality: String
    }, "Teams");

    return {
        getTeamById: function (id, callback) {
            //visszaadja a megadott ID-hoz tartozó csapatot
            return Team.findOne({"_id": id}, callback);
        },

        getTeams: function (callback) {
            return Team.find({}, callback);
        },

        createTeam: function (team, callback) {
            //létrehozza, és tárolja az adatbázisban a megadott csapatot
            var currTeam = new Team(team);
            return currTeam.save(callback);
        },

        searchTeams: function(keyword, callback) {
            return Team.find({name: new RegExp(keyword, "i")}, function(err, data) {
                if (err) {
                    callback([]);
                } else {
                    var result = [];
                    for (var i = 0; i < data.length; i++) {
                        result.push(data[i]._id);
                    }
                    callback(result);
                }
            });
        }
    };
};