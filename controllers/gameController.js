var express = require("express");
var bodyParser = require('body-parser');

//express.redirect=false;

var router = express.Router();
router.use(bodyParser.json());

// From Main
// USERINFO
var userinfo = require("../models/userinfo.js");

// Create all our routes and set up logic within those routes where required.

var gameObj = require('./game.js');
var pageloads = 0;

router.get("/", function(req, res) {
    /*userinfo.all(function(data) {
        var hbsObject = {
            userinfo: data
        };
        console.log(hbsObject);*/
        res.render("home"/*, hbsObject*/);
    //});
});

// PROFILE
var profile = require("../models/profile.js");

// Create all our routes and set up logic within those routes where required.
router.get("/profile", function(req, res) {
    /*profile.all(function(data) {
        var hbsObject = {
            profile: data
        };
        console.log(hbsObject);*/
        res.render("profile"/*, hbsObject*/);
    //});
});

router.post("/", function(req, res) {
    /*profile.create([
        "user_name", "user_password"
    ], [
        req.body.user_name, req.body.user_password
    ], function() {*/
        res.redirect("/");
    //});
});

// End from Main

router.get("/login", function(req, res) {

    var public = [{
        text: ''
    }];

    var mine = [{
        text: ''
    }
    ];
        res.render("login", {public: public, mine: mine});
});


// Create all our routes and set up logic within those routes where required.
router.get("/login", function(req, res) {

//    console.log(req.query);

    var public = [{
        text: ''
    }];

    var mine = [{
        text: '',
        playable:false
    }
    ];

    res.render("login", {public: public, mine: mine});

    //  });
});


router.post("/game", function(req, res) {

//    post
    var playerToken = req.body;

//    console.log(playerToken.card,'Hey look at this card!!!!');
//    console.log(playerToken);

//    pageloads++;

    var finder = new gameObj.getGamePlayer(playerToken.game,playerToken.name);

    var game = finder.game;
    var player = finder.player;
    var cardShower = '';

    console.log(game.judge);
    console.log('Turn state:',game.turnState);

    //    var cardShower = new gameObj.showPlayPhaseCards(game,player,true);
    if (game.turnState === 'play')
    {console.log('play phase');
        cardShower = new gameObj.showPlayPhaseCards(game,player);}
    else if (game.turnState === 'judge')
    {console.log('judge phase');
        cardShower = new gameObj.showJudgePhaseCards(game,player);}
    else {console.log('Unable to process game state...');}

//    console.log('Still judge/play phase');

    var public = cardShower.inPlay;
    var mine = cardShower.inHand;
    var adj = cardShower.adj;
    var scores = cardShower.scores;

    var history = new gameObj.showPrevTurns(game);

    //    var names = cardShower.players;

    /*   var public = gameObj.showPlayPhaseCards(game,player,true).inPlay;
     var mine = gameObj.showPlayPhaseCards(game,player,true).inHand;*/

//    var public = getGamePlayer(playerToken);



    console.log('Player to log in:', player);
    console.log(gameObj.validate(player));

    console.log('gameObj.done(player.game);');
//    gameObj.done(player.game);
    gameObj.done(playerToken);

    console.log(playerToken.card,playerToken.name,playerToken.game);
    console.log(playerToken.card,playerToken.name,playerToken.game);
    console.log(playerToken.card,playerToken.name,playerToken.game);
    console.log(playerToken.card,playerToken.name,playerToken.game);

    var cardRef = '';
    cardRef = gameObj.findPlayerCard(playerToken.card,playerToken.name,playerToken.game);

    console.log('game.turnState:',game.turnState,'playerToken.card',playerToken.card,'game[game.judge]',game.players[game.judge]);


    if(game.turnState === 'play' && cardRef != '' && player.canPlay)
    {
//        console.log(cardRef);
        console.log(cardRef.text);
        game.placeCard(player,cardRef.card);
//         game.placeCard(cardRef.player, cardRef.card);
    }

    else if (game.turnState === 'judge' && playerToken.card != '' && game.players[game.judge] === player)
    {
        gameObj.likeThisCard(playerToken.card);
        console.log('Did this happen?');
    }

    console.log(adj);
    console.log(adj);
    console.log(adj);
    console.log(adj);
    console.log(adj);
    console.log(adj);
    console.log(adj);
    console.log(history);
    console.log(history.dispTurns);
    console.log(history.dispTurns[0]);
    console.log(history.dispTurns[1]);
    console.log(history.dispTurns[2]);

    return res.render("index2", {player:player, public:public, mine:mine, pageloads:pageloads, adj:adj, scores: scores, prevTurns:history.dispTurns} ,function(err, html){
        if (err) {
            console.log("ERR", err);

            // An error occurred, stop execution and return 500
            return res.status(500).send();
        }

//        console.log(html);
        // Return the HTML of the View
        return res.send(html);
    });

});


// Export routes for server.js to use.
module.exports = router;
