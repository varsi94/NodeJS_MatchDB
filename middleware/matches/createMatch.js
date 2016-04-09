module.exports = function(objectRepository) {
    var matchModel = objectRepository.matches;
    var teamModel = objectRepository.teams;
    return function (req, res, next) {
        //Létrehozzuk az új meccset a bodyban lévő adatok alapján, beszúrjuk az adatbázisba.
        if (req.method == "POST") {
            //Itt már jó a meccs.
            var match = req.body;
            match.homeTeam = teamModel.getTeamById(match.homeTeam);
            match.awayTeam = teamModel.getTeamById(match.awayTeam);
            match.date = Date.parse(match.date + " " + match.time);
            matchModel.createMatch(match);
            return res.redirect("/match/successfulCreate");
        } else {
            //Ha nem POST, akkor kitesszük a felületet.
            res.tpl = {
                defaultData: {
                    matchType: "",
                    homeTeam: teamModel.getTeamById(1),
                    awayTeam: teamModel.getTeamById(2),
                    homeScore: 0,
                    awayScore: 0,
                    spectators: 0,
                    date: matchModel.dateFormat(new Date(), "yyyy-mm-dd"),
                    time: "20:00",
                    stadium: "",
                    referee: ""
                },
                title: "Új meccs létrehozása",
                teams: teamModel.getTeams(),
                action: "/match/create"
            };
            return next();
        }
    }
};
