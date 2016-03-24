module.exports = function() {
    return function(req, res, next) {
        //kijelentkezteti a felhasználót.
        return next();
    }
}