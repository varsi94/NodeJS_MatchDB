module.exports = function(objectRepository, viewName) {
    return function(req, res, next) {
        //rendereli a megfelelő névvel ellátott oldalt
        if (res.statusCode == 404) {
            return res.end("404 - Not found");
        } else if (res.tpl === undefined) {
            res.render(viewName, null);
        } else {
            res.render(viewName, res.tpl);
        }
    }
};