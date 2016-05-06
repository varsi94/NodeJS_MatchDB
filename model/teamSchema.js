module.exports = function(mongoose) {
    return mongoose.model("Team", {
        id: mongoose.Schema.Types.ObjectId,
        name: String,
        nationality: String
    }, "Teams");
};