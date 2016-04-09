module.exports = function(title) {
    return function(req, res, next) {
        res.tpl = {
            title: title
        }
        return next();
    }
};