module.exports = function() {
    return function(req, res, next) {
        //Elhelyezi a template-ben azt az információt, hogy be van-e jelentkezve a felhasználó.
        if (res.tpl === undefined) {
            res.tpl = {};
        }
        res.tpl.isLoggedIn = req.session.isLoggedIn;
        res.tpl.userName = req.session.userName;
        if (req.query.login === undefined) {
            res.tpl.showLogin = false;
        } else {
            res.tpl.showLogin = req.query.login;
        }
        return next();
    };
};