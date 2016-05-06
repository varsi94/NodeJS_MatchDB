module.exports = function(objectRepository) {
    var teamModel = objectRepository.teams;

    return function(req, res, next) {
        //A body alapján létrehoz egy csapatot, és azt elmenti a teamModel segítségével.
        if (req.method == "POST" && res.error.length == 0) {
            teamModel.createTeam(req.body, function(err) {
                if (!err) {
                    return res.redirect("/team/successfulCreate");
                } else {
                    return res.redirect("/team/createFailed");
                }
            });
        } else {
            res.tpl = {
                title: "Új csapat létrehozása",
                isModify: false,
                error: res.error,
                data: {
                    name: "",
                    nationality: ""
                }
            };

            if (req.method == "POST") {
                res.tpl.data = req.body;
            }
            return next();
        }
    }
};