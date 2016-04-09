module.exports = function(objectRepository) {
    var teamModel = objectRepository.teams;

    return function(req, res, next) {
        //A body alapján létrehoz egy csapatot, és azt elmenti a teamModel segítségével.
        if (req.method == "POST") {
            teamModel.createTeam(req.body);
            return res.redirect("/team/successfulCreate");
        } else {
            res.tpl = {
                title: "Új csapat létrehozása"
            };
            return next();
        }
    }
};