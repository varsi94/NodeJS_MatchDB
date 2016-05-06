module.exports = function(mongoose) {
    return mongoose.model("Match", {
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
};