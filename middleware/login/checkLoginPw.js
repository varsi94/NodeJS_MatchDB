module.exports = function(objectRepository) {
    return function (req, res, next) {
        //ellenőrzi, hogy jó-e a felhasználónév és a jelszó
        if (objectRepository.adminUser.userName === req.body.userName
            && objectRepository.adminUser.password === req.body.password) {
            return res.redirect("/matches");
        } else {
            return next();
        }
    }
};