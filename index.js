var express = require("express");
var app = express();
var bodyParser = require("body-parser");

//Static
//app.use(express.static("static"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require("./routes/outside")(app);

app.listen(8080, function() {
    console.log("Server started on port: 8080");
});