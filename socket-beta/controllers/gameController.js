var express = require("express");
var bodyParser = require('body-parser');

//express.redirect=false;

var router = express.Router();
router.use(bodyParser.json());


// Import the model (cat.js) to use its database functions.
var gameObj = require('./game.js');
var pageloads = 0;

router.get("/", function(req, res) {

    var public = [{
        text: ''
    }];

    var mine = [{
        text: ''
    }
    ];

        res.render("index1", {public: public, mine: mine});
    //  });
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

    res.render("index1", {public: public, mine: mine});

    //  });
});


// router.get("/game", function(req, res) {
 router.post("/game", function(req, res) {

//    post
    var playerToken = req.body;

    console.log(playerToken.card,'Hey look at this card!!!!');
    console.log(playerToken);
// get
//  console.log(req.query,'query');
//     var player = req.query;

    pageloads++;

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

    console.log('Still judge/play phase');

    var public = cardShower.inPlay;
    var mine = cardShower.inHand;
    var adj = cardShower.adj;
     var scores = cardShower.scores;

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

    if(game.turnState === 'play' && cardRef != '' && player.canPlay)
     {
         console.log(cardRef);
         console.log(cardRef);
         game.placeCard(player,cardRef.card);
//         game.placeCard(cardRef.player, cardRef.card);
     }


    return res.render("index2", {player:player, public:public, mine:mine, pageloads:pageloads, adj:adj, scores: scores} ,function(err, html){
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
