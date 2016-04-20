module.exports = function(objectRepository) {
    var matchModel = objectRepository.matches;
    var teamModel = objectRepository.teams;
    return function(req, res, next) {
        //módosítjuk az URL-paraméterben lévő meccset.
        if (req.method == "POST") {
            var match = req.body;
            match.date = Date.parse(match.date + " " + match.time);
            matchModel.modifyMatch(req.params.matchId, match, function(success) {
                if (success) {
                    return res.redirect("/match/successfulEdit");
                } else {
                    res.status(500);
                    return res.end("Internal server error");
                }
            });
        } else {
            matchModel.getMatchById(req.params.matchId, function(match) {
                var match = JSON.parse(JSON.stringify(match));
                var date = match.date;
                match.date = matchModel.dateFormat(date, "yyyy-mm-dd");
                match.time = matchModel.dateFormat(date, "HH:MM");
                teamModel.getTeams(function(err, teams) {
                    if (err) {
                        return res.redirect("/match/editFailed");
                    } else {
                        res.tpl = {
                            title: "Meccs szerkesztése",
                            teams: teams,
                            defaultData: match,
                            action: "/match/" + req.params.matchId + "/edit"
                        }
                        return next();
                    }
                });
            });
        }
    }
};