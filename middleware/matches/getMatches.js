module.exports = function(objectRepository) {
    var matchModel = objectRepository.matches;
    return function(req, res, next) {
        //Lekérjük az összes adatbázisban lévő meccset.
        return next();
    }
};