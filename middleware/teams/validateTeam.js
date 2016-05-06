module.exports = function(objectRepository) {
    return function(req, res, next) {
        //itt validáljuk a beérkezett csapat entitást.
        res.error = [];
        if (req.method == "POST") {
            var team = req.body;
            if (team.name == "") {
                res.error.push("name");
            }

            if (team.nationality == "") {
                res.error.push("nationality");
            }
            return next();
        } else {
            return next();
        }
    };
};