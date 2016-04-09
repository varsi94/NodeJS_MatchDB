module.exports = function(objectRepository) {
    var matchModel = objectRepository.matches;
    var teamModel = objectRepository.teams;
    return function (req, res, next) {
        //Létrehozzuk az új meccset a bodyban lévő adatok alapján, beszúrjuk az adatbázisba.
        console.log(req.method);
        if (req.method == "POST") {
            console.log(req.body);
            return res.redirect("/match/create");
        } else {
            //Ha nem POST, akkor kitesszük a felületet.
            res.tpl = {
                isCreate: true,
                title: "Új meccs létrehozása",
                teams: teamModel.getTeams()
            };
            return next();
        }
    }
};
