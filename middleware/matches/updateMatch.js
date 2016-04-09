module.exports = function(objectRepository) {
    var matchModel = objectRepository.matches;
    var teamModel = objectRepository.teams;
    return function(req, res, next) {
        //módosítjuk az URL-paraméterben lévő meccset.
        if (req.method == "POST") {
            var match = req.body;
            match.homeTeam = teamModel.getTeamById(match.homeTeam);
            match.awayTeam = teamModel.getTeamById(match.awayTeam);
            match.date = Date.parse(match.date + " " + match.time);
            matchModel.modifyMatch(req.params.matchId, match);
            return res.redirect("/matches/");
        } else {
            var match = matchModel.getMatchById(req.params.matchId);
            var date = match.date;
            match.date = matchModel.dateFormat(date, "yyyy-mm-dd");
            match.time = matchModel.dateFormat(date, "HH:MM");
            res.tpl = {
                title: "Meccs szerkesztése",
                teams: teamModel.getTeams(),
                defaultData: match,
                action: "/match/" + req.params.matchId  + "/edit"
            }
        }
        return next();
    }
};