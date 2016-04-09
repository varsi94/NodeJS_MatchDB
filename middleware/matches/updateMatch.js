module.exports = function(objectRepository) {
    var matchModel = objectRepository.matches;
    var teamModel = objectRepository.teams;
    return function(req, res, next) {
        //módosítjuk az URL-paraméterben lévő meccset.
        if (req.method == "POST") {
            //TODO: meccs szerkesztése
            return res.redirect("/matches/");
        } else {
            var match = matchModel.getMatchById(req.params.matchId);
            var date = match.date;
            match.date = matchModel.dateFormat(date, "yyyy-mm-dd");
            match.time = matchModel.dateFormat(date, "HH:MM");
            res.tpl = {
                title: "Meccs szerkesztése",
                teams: teamModel.getTeams(),
                defaultData: match
            }
        }
        return next();
    }
};