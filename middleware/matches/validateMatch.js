module.exports = function(objectRepository) {
    return function(req, res, next) {
        //Itt validáljuk a meccset.
        res.error = [];
        if (req.method != "POST") {
            return next();
        }

        var match = req.body;
        if (match.homeScore.valueOf() < 0) {
            res.error.push("homeScore");
        }

        if (match.awayScore.valueOf() < 0) {
            res.error.push("awayScore");
        }

        if (match.stadium == "") {
            res.error.push("stadium");
        }

        if (match.referee == "") {
            res.error.push("referee");
        }

        if (match.spectators.valueOf() < 0) {
            res.error.push("spectators");
        }

        if (match.matchType == "") {
            res.error.push("matchType");
        }

        return next();
    }
};