module.exports = function(objectRepository) {
    var matchModel = objectRepository.matches;
    return function (req, res, next, id) {
        //Ha nincs ilyen azonosítójú meccs, akkor 404, egyébként pedig next
        return matchModel.checkMatchId(req.params.matchId, function(isValid) {
            if (!isValid) {
                return res.redirect("/error/404");
            } else {
                return next();
            }
        });
    }
};