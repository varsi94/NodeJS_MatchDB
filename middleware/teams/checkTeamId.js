//Ellenőrzi, hogy van-e ilyen ID-jú csapat.
module.exports = function(objectRepository) {
    return function(req, res, next) {
        return objectRepository.teams.getTeamById(req.params.teamId, function(err, data) {
            if (err || !data){
                res.status(404);
                return res.end("Not found");
            } else {
                res.teamData = data;
                next();
            }
        });
    };
};