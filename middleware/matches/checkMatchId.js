module.exports = function(objectRepository) {
    var matchModel = objectRepository.matches;
    return function (req, res, next, id) {
        //Ha nincs ilyen azonosítójú meccs, akkor 404, egyébként pedig next
        if (matchModel.checkMatchId(req.params.matchId)) {
            return next();
        } else {
            res.status(404);
            return next();
        }
    }
};