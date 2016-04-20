module.exports = function(objectRepository) {
    var matchModel = objectRepository.matches;
    return function(req, res, next) {
        //Lekérjük az összes adatbázisban lévő meccset.
        //Ha POST, akkor kerestünk, és átirányítjuk:
        if (req.method == "POST") {
            return res.redirect("/search/" + req.body.keyword);
        }

        return matchModel.getMatches(function(err, data) {
            if (err) {
                //TODO: hiba
            } else {
                res.tpl = {
                    title: "Főoldal",
                    matches: JSON.parse(JSON.stringify(data))
                };
                return next();
            }
        });
    }
};