module.exports = function(objectRepository) {
    var matchModel = objectRepository.matches;
    return function(req, res, next) {
        //keresünk a meccsek között
        matchModel.searchMatches(req.params.keyword, function(err, data) {
            if (!err) {
                res.tpl = {
                    title: "Keresés",
                    matches: JSON.parse(JSON.stringify(data))
                };
                return next();
            }
        });
    }
};