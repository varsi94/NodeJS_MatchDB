module.exports = function(objectRepository) {
    var matchModel = objectRepository.matches;
    return function(req, res, next) {
        //keresünk a meccsek között
        res.tpl = {
            title: "Keresés",
            matches: matchModel.searchMatches(req.params.keyword)
        };
        return next();
    }
};