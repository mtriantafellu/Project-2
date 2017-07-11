var express = require("express");
var bodyParser = require('body-parser');

//express.redirect=false;

var router = express.Router();
router.use(bodyParser.json());


// Import the model (cat.js) to use its database functions.
var cat = require("../models/cat.js");
var gameObj = require('./game.js');

router.get("/", function(req, res) {

    if(req.query)
    {

    }
    console.log(req.query,'query');
//    console.log(req,'req');
//    console.log(res,'res');

    var public = [{
        text: '???'
    }];

    var mine = [{
        text: 'WHARRGARBL!!!'
    },
        {
            text: 'um ok'
        }];

        console.log(req.params);
        res.render("index1", {public: public, mine: mine});
    //  });
});

// Create all our routes and set up logic within those routes where required.
router.get("/login", function(req, res) {

    console.log(req.query);

    var public = [{
        text: '???'
    }];

    var mine = [{
        text: 'WHARRGARBL!!!'
    },
        {
          text: 'um ok'
        }];

    res.render("index1", {public: public, mine: mine});

    //  });
});

router.get("/page", function(req, res) {


    console.log(req.query,'query');
    console.log(req.query,'query');
    console.log(req.query);
    var player = req.query;

    var public = [{
        text: '???'
    }];

    var mine = [{
        text: 'WHARRGARBL!!!'
    },
        {
          text: 'what???'
        }
    ];

    console.log('Player to log in:', player);
    console.log(gameObj.validate(player));

//    res.redirect('/');
    res.render("index2", {player:player, public:public, mine:mine},function(err, html){
        if (err) {
            console.log("ERR", err);

            // An error occurred, stop execution and return 500
            return res.status(500).send();
        }

        console.log('aethtehaetheth');
        console.log(html);
        // Return the HTML of the View
        return res.send(html);
    });

});


// Export routes for server.js to use.
module.exports = router;
