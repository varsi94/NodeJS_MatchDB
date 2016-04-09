module.exports = function(objectRepository) {
    var matchModel = objectRepository.matches;
    return function(req, res, next) {
        //kitöröljük az adatbázisból az URL-paraméterben lévő azonosítóval ellátott
        //meccset.
        var success = matchModel.deleteMatch(req.params.matchId);
        res.jsonResult = {
            success: success
        };
        return next();
    }
};