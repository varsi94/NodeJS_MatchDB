/**
 * Created by varsi on 2016. 05. 06..
 */
module.exports = function(objectRepository) {
    return function(req, res, next) {
        objectRepository.teams.getTeams(function(err, data) {
            if (err || !data) {
                res.tpl = {
                    hasError: true,
                };
            } else {
                res.tpl = {
                    hasError: false,
                    teams: data
                };
            }
            res.tpl.title = "Csapatok kezelése";
            return next();
        });
    };
};