module.exports = function(objectRepository) {
    var matchModel = objectRepository.matches;
    var teamModel = objectRepository.teams;
    return function (req, res, next) {
        //Létrehozzuk az új meccset a bodyban lévő adatok alapján, beszúrjuk az adatbázisba.
        if (req.method == "POST") {
            //Itt már jó a meccs.
            var match = req.body;
            match.date = Date.parse(match.date + " " + match.time);
            matchModel.createMatch(match, function(success) {
                if (success) {
                    return res.redirect("/match/successfulCreate");
                } else {
                    return res.redirect("/match/createFailed");
                }
            });
        } else {
            //Ha nem POST, akkor kitesszük a felületet.
            teamModel.getTeams(function(err, data) {
                if (err) {

                } else {
                    res.tpl = {
                        defaultData: {
                            matchType: "",
                            homeTeam: null,
                            awayTeam: null,
                            homeScore: 0,
                            awayScore: 0,
                            spectators: 0,
                            date: matchModel.dateFormat(new Date(), "yyyy-mm-dd"),
                            time: "20:00",
                            stadium: "",
                            referee: ""
                        },
                        title: "Új meccs létrehozása",
                        teams: data,
                        action: "/match/create"
                    };
                    return next();
                }
            });
        }
    }
};
