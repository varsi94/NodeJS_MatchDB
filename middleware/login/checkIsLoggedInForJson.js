//Ellenőrzi, hogy be van-e jelentkezve a felhaszánló

module.exports = function(app) {
    return function(req, res, next) {
        //Ha be van jelentkezve: redirect a főoldalra, egyébként pedig next
        if (req.session.isLoggedIn) {
            return next();
        } else {
            res.status(403);
            return res.end();
        }
    }
};