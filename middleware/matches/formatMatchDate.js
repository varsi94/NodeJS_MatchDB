module.exports = function(objectRepository) {
    var matchModel = objectRepository.matches;
    return function(req, res, next) {
        for (var i = 0; i < res.tpl.matches.length; i++) {
            //Idő beállítása
            res.tpl.matches[i].date = matchModel.dateFormat(res.tpl.matches[i].date, "basic");
        }
        return next();
    }
};