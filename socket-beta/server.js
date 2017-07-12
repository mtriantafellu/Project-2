var express = require("express");
var bodyParser = require("body-parser");
//var methodOverride = require("method-override");

var port = process.env.PORT || 3000;

var app = express();

var gameLogic = require('./controllers/game.js');


app.use(bodyParser.urlencoded({ extended: false }));

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));


// Override with POST having ?_method=DELETE
//app.use(methodOverride("_method"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/gameController.js");

app.use("/", routes);


//
//
//

var http = require('http').Server(app);
var io = require('socket.io')(http);
/*
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});*/

io.on('connection', function(socket)
{
    console.log('a user connected');
    socket.on('disconnect', function()
        {
            console.log('user disconnected');
        });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        io.emit('chat message','Hello, Major Tom. This is the server side console.');
    });
});



//
//
//



// app.listen(port);
