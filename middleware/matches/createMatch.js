module.exports = function(objectRepository) {
    var matchModel = objectRepository.matches;
    return function (req, res, next) {
        //Létrehozzuk az új meccset a bodyban lévő adatok alapján, beszúrjuk az adatbázisba.
        return next();
    }
};
