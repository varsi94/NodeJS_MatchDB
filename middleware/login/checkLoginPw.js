module.exports = function(objectRepository) {
    return function (req, res, next) {
        //ellenőrzi, hogy jó-e a felhasználónév és a jelszó
        res.jsonResult = {
            success: false,
            errorMessage: "Hibás felhasználói név vagy jelszó!"
        };

        if (objectRepository.adminUser.userName === req.body.username
            && objectRepository.adminUser.password === req.body.password) {
            res.jsonResult.success = true;
            res.jsonResult.errorMessage = "";

            req.session.isLoggedIn = true;
            req.session.userName = req.body.username;
        }
        return next();
    }
};