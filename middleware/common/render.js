module.exports = function(objectRepository, viewName) {
    return function(req, res, next) {
        res.end("Render: " + viewName);
    }
}