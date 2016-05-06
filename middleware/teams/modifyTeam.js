/**
 * Created by varsi on 2016. 05. 06..
 */
module.exports = function(objectRepository) {
    return function(req, res, next) {
        //A body alapján létrehoz egy csapatot, és azt elmenti a teamModel segítségével.
        if (req.method == "POST") {
            objectRepository.teams.updateTeam(req.body, req.params.teamId, function(err) {
                if (!err) {
                    return res.redirect("/team/successfulEdit");
                } else {
                    return res.redirect("/team/editFailed");
                }
            });
        } else {
            res.tpl = {
                title: "Csapat módosítása",
                data: res.teamData,
                isModify: true
            };
            return next();
        }
    };
};