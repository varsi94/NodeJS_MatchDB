var express = require("express");
var app = express();

app.use(express.static("static"));

require("./routes/outside")(app);
app.listen(8080, function() {
    console.log("Server started on port: 8080");
});