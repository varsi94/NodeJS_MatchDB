module.exports = function() {
    return function(req, res, next) {
        //Az előző middleware-ekben betöltött objektumot írjuk ki JSON-ban.
        return res.json(res.jsonResult);
    }
}