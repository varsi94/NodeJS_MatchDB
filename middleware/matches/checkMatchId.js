module.exports = function(objectRepository) {
    var matchModel = objectRepository.matches;
    return function (req, res, next, id) {
        //Ha nincs ilyen azonosítójú meccs, akkor 404, egyébként pedig next
        return matchModel.checkMatchId(req.params.matchId, function(isValid) {
            if (!isValid) {
                res.status(404);
                return res.end("Not found");
            } else {
                return next();
            }
        });
    }
};