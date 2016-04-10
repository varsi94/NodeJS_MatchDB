module.exports = function() {
    return function(req, res, next) {
        //kijelentkezteti a felhasználót.
        req.session.destroy(function(err) {
            console.log(err);
        });
        return next();
    }
};