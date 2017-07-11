var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

var port = 3000;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.

app.use(express.static("public"));
//app.use("public", express.static("/assets/css"));

app.use(bodyParser.urlencoded({ extended: false }));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.

// Need to change catsController.js to cardController.js
var routes = require("./controllers/catsController.js");

app.use("/", routes);

app.get("/", function(req, res) {
    connection.query("SELECT * FROM userinfo;", function(err, data) {
        if (err) {
            throw err;
        }
        res.render("home", { userinfo: data });
    });
});

app.get("/login", function(req, res) {
    console.log("hey");
        res.render("login");
  //  });
});

app.listen(port);
