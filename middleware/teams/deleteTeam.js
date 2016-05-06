module.exports = function(objectRepository) {
    return function(req, res, next) {
        //kitöröljük az adatbázisból az URL-paraméterben lévő azonosítóval ellátott
        //csapatot.
        return objectRepository.teams.deleteTeam(req.params.teamId, function(success) {
            if (!success) {
                res.status(400);
                return res.end();
            } else {
                res.jsonResult = {
                    success: success
                };
                return next();
            }
        });
    };
} ;