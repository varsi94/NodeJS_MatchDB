module.exports = function(objectRepository) {
    var matchModel = objectRepository.matches;
    return function(req, res, next) {
        //Lekérjük az összes adatbázisban lévő meccset.
        res.tpl = {
            title: "Főoldal",
            matches: matchModel.getMatches()
        };
        return next();
    }
};