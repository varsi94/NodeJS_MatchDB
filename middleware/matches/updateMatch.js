module.exports = function(objectRepository) {
    var matches = objectRepository.matches;
    return function(req, res, next) {
        //módosítjuk az URL-paraméterben lévő meccset.
        return next();
    }
}