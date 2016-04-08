var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var dateFormat = require("dateformat");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.use("/static", express.static("static"));

//nem igényel bejelentkezést
require("./routes/outside")(app);

//igényel bejelentkezést
require("./routes/loggedin")(app);

app.listen(8080, function() {
    console.log("Server started on port: 8080");
});