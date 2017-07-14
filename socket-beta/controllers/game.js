/**
 * Created by mothw on 7/10/2017.
 */

var playerDB = [];
var gameDB = [];


/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 **/
function shuffle(array)
{
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

// Not sure we really need this.  We COULD validate the player AND look which game the player is in.
// A separate function, game.validate(player) checks that game for that player and that player's credential integrity.
function validate(player) {
    var bool = false;
    gameDB.forEach(function(game){
            if(game.validate(player)===true)
                {
                    //console.log('rawr');
                    bool = true;
                    //console.log(bool);
                }
            }
        );
    return bool;
}

        // I'm not using ids directly.  The name properties can be used to go to and from the database with proper
        // orm setup.
function Game(gameName) {
//function Game(gameId,gameName) {
//    this.id = gameId;
    this.name = gameName;
    this.players = [];
    this.playArea = [];
    this.deck = [];
    this.numPlayers = 0;
//    this.numPlayers = 4;
//    this.deck = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
    this.turns = [];
    this.turnNum = 0; // = turns.length
    this.judge = 0; // = turns.length%numPlayers
    this.adjDeck = shuffle(['happy','grumpy','sleepy','dopey','sneezy','doc','bashful']);
    this.turnState = 'none'; // play, judge,  (recap - optional state)

    this.addPlayer = function (player) {
        if (this.players.indexOf(player) < 0 && this.players.length < 6) {
            this.players.push(player);
            player.game = this;
            this.numPlayers++;
        }
    };

    for (var i=0; i < this.numPlayers; i++)
    {
        this.playArea[i]='';
    }

    this.placeCard = function(player,card){
        this.playArea[this.players.indexOf(player)]=card;
        player.canPlay = false;

            // If no one needs to play a card...
        if(this.players.every(function(item){return (item.canPlay===false); }) )
        {
                // ...advance to judge phase of game.
            this.turnState = 'judge';
        }

    };

    // ideally, a separate function would invite players, and they would choose whether to join.
/*    this.invite = function(player) {
    };*/


    this.makeDeck = function() {

        //  Real game will use something else...
        var st = 'C';
        var suit = 'club';
        for(i=0; i<4; i++)
        {
            if(i==0)
                {suit = 'clubs';
                st = 'C';}
            else if(i==1) {suit = 'spades';
            st = 'S';}
            else if(i==2) {suit = 'hearts';
            st = 'H';}
            else if(i==3) {suit = 'diamonds';
            st = 'D';}
        this.deck.push(new Card('2'+st,'Two'+' of '+suit));
        this.deck.push(new Card('3'+st,'Three'+' of '+suit));
        this.deck.push(new Card('4'+st,'Four'+' of '+suit));
        this.deck.push(new Card('5'+st,'Five'+' of '+suit));
        this.deck.push(new Card('6'+st,'Six'+' of '+suit));
        this.deck.push(new Card('7'+st,'Seven'+' of '+suit));
        this.deck.push(new Card('8'+st,'Eight'+' of '+suit));
        this.deck.push(new Card('9'+st,'Nine'+' of '+suit));
        this.deck.push(new Card('10'+st,'Ten'+' of '+suit));
        this.deck.push(new Card('11'+st,'Jack'+' of '+suit));
        this.deck.push(new Card('12'+st,'Queen'+' of '+suit));
        this.deck.push(new Card('13'+st,'King'+' of '+suit));
        this.deck.push(new Card('14'+st,'Ace'+' of '+suit));
        }

        this.shuffleDeck();
        console.log('Before dealing:',this.deck);
    };

    this.dealCards = function(){
        game = this;
        // initially draw 5 cards
        this.players.forEach(function(player){
            player.drawFrom(game.deck);
            player.drawFrom(game.deck);
            player.drawFrom(game.deck);
            player.drawFrom(game.deck);
            player.drawFrom(game.deck);
            console.log(player.name,player.hand);
        });
    };

    this.validate = function(player) {
//        var playerGameIndex = -1;
//        console.log('Validating',player.name,player.game,player.password);
        if (this.players.some
            (function(item) {
                    if (item.name === player.name && item.password === player.password)
                        return true;
                    else return false;
                    }))
            {
                    console.log('Valid player in the game '+this.name+'!');
                    return true;
            }
            else {
                   console.log('Invalid player for the game',this.name); //,':',player);
//                   console.log('Invalid player for the game',this.name,':',player);
                   //console.log(this);
                   return false;
                   ;}


    };

    this.shuffleDeck = function()
    {
        this.deck = shuffle(this.deck);
    };

        // increment turn and judge at end of turn.
    this.endTurn = function() {
        this.turnNum++;
        this.judge = this.turnNum%this.numPlayers;  // 0,1,2,3,0,1,2,3, ...
        this.newTurn();
//        this.turns.push(new Turn(this.turnNum,this,j));
    };

    this.newTurn = function() {
        this.turns.push(new Turn(this));
        this.turnState = 'play';

        // Turn starts in "play phase".  Players choose to play noun, EXCEPT for judge.
        this.players.forEach(function(item){item.canPlay=true});
        this.players[this.judge].canPlay=false;
    };

        // Make sure you have enough players first?
    this.start = function() {
        this.judge = 0; // = turns.length%numPlayers
        this.turns = [];
        this.turnNum = 0;
        this.playArea = [];


        this.adjDeck = shuffle(['happy','grumpy','sleepy','dopey','sneezy','doc','bashful']);
        this.makeDeck();
        this.dealCards();
        this.newTurn();
    };
}

//function Turn(number,game,judge) {
function Turn(game) {
        // Store this first...
    this.game = game;

    this.number = this.game.turnNum;
    this.judge = this.game.judge;
    this.state = 'playCard'; // 'judgeCard', 'over'
    this.winner = -1;
    this.cardsPlayed = [];
//    this.adj = '';
    this.adj = this.game.adjDeck[this.game.adjDeck.length-1];
    this.game.adjDeck.pop();


    for(i=0; i<game.numPlayers ; i++)
    {
        this.cardsPlayed.push('');
    }


}

function Player(playerName,playerPassword) {
//function Player(playerId,playerName,playerPassword) {
//    this.id = playerId;
    this.name = playerName;
    this.password = playerPassword;
    this.game = '';
    this.hand = [];
    this.score = 0;

    this.drawFrom = function(deck) {
        var card = deck[deck.length - 1];
        deck.pop();
        this.hand.push(card);
    }
}

function Card(cardName, cardDesc) {
//function Card(cardId, cardName, cardDesc) {
//    this.id = cardId;
    this.text ='Default text';
    this.faceup = false;
    this.desc = cardDesc;
    this.text = cardName;
}

// Set up card to be shown to a specific player.
function DispCard(dispCard,dispType) {
    this.type = dispType;
    this.card = dispCard;

    this.judge=false;
    this.faceUp=false;
    this.faceDown=false;
    this.empty=false;
    this.isNull=false;
    this.winner=false;

    if(dispType==='judge'){this.judge=true;}
    if(dispType==='faceUp'){this.faceUp=true;}
    if(dispType==='faceDown'){this.faceDown=true;}
    if(dispType==='empty'){this.empty=true;}
    if(dispType==='null'){this.isNull=true;}
    if(dispType==='winner'){this.winner=true;}

    console.log(dispCard);
//    this.card = '';
    if(this.type === 'faceUp' && this.card.text && this.card.desc) {
        //this.card = dispCard;
        this.text = dispCard.text;
        this.desc = dispCard.desc;
    }
    else
    {
        this.text = '';
        this.desc = '';
    }
}





// Sample games and players

var game1 = new Game('game1');
//var game1 = new Game(1,'game1');
var game2 = new Game('game2');
//var game2 = new Game(2,'game2');

var mattB = new Player('Matt B','pass1');
var mattT = new Player('Matt T','pass2');
var kevin = new Player('Kevin','pass3');
var connor = new Player('Connor','pass4');
var rhegi = new Player('Rhegi','pass5');
var evilKevin = new Player('Evil Kevin','traitor');


playerDB = [mattB,mattT,kevin,connor,rhegi,evilKevin];
gameDB = [game1,game2];

game1.addPlayer(mattT);
game1.addPlayer(kevin);
game1.addPlayer(mattB);
game1.addPlayer(rhegi);
game2.addPlayer(connor);
game2.addPlayer(evilKevin);
game1.start();
game2.start();
console.log('Game 1 deck:',game1.deck);
//console.log('Game 2 deck:',game2.deck);


/*

console.log('Matt T');
showPlayPhaseCards(game1,mattT);
console.log('Kevin');
showPlayPhaseCards(game1,kevin);



console.log('Kevin plays ',kevin.hand[2],'...');

game1.placeCard(kevin,kevin.hand[2]);
kevin.drawFrom(game1.deck);

console.log('Matt T');
showPlayPhaseCards(game1,mattT);
console.log('Kevin');
showPlayPhaseCards(game1,kevin);
console.log('Matt B');
showPlayPhaseCards(game1,mattB);

console.log('These cards are actually in play:',game1.playArea);

game1.placeCard(mattB,mattB.hand[1]);
mattB.drawFrom(game1.deck);

console.log('These cards are actually in play:',game1.playArea);
var mattBCardsInPlay = new showPlayPhaseCards(game1,mattB);

console.log(mattBCardsInPlay.inPlay);

game1.placeCard(rhegi,rhegi.hand[3]);
*/




// console.log('Let\'s look by string for (game1,mattB)...)');
// console.log(getGamePlayer('game1','Matt B'));

/*function isGame(gameStr,game) {
    if(gameStr == game.name) {
        console.log(gameStr,game.name,'true');
        return true;}
    else {
        console.log(gameStr,game.name,'false');
        return false;
    }
}

function isPlayer(players,playerStr) {
    if(players[i].name == playerStr) {return true;}
    else return false;
}*/

function getGamePlayer(gameStr,playerStr) {
    var gameFound = '';
    var playerFound ='';

    gameDB.forEach(function(item) {
        if (item.name == gameStr) {
            gameFound = item;
//            console.log('Found game', gameStr, '=', item)
           }
        });

    if(gameFound != '')
    {
        gameFound.players.forEach(function(item) {
            if (item.name == playerStr) {
                playerFound = item;
    //            console.log('Found player', playerStr, '=', item)
                }
            });
    }

    if(playerFound != '')
        {console.log('getGamePlayer',{game:gameFound.name, player:playerFound.name});}
    else{ console.log('Failed to find',gameStr,playerStr);}

    this.game = gameFound;
    this.player = playerFound;
    return this;
}

//  Adjective is visible.
//  Players are choosing card to play.
//  Cards in play are visible only to whomever played them.
//  Cards in hand are playble if you haven't played yet.
//  Judge is waiting.
function showPlayPhaseCards(game,player) {
//function showPlayPhaseCards(game,player) {

    this.players = game.players;
    this.inPlay = [];
    this.inHand = player.hand;
    this.playerIndex = game.players.indexOf(player);
    this.adj = game.turns[game.turnNum].adj;
//    this.adjective = game.turns[Turn].adj;

    this.canPlay = player.canPlay;

    this.scores = [];
    for(var i=0; i<game.players.length;i++)
    {
        this.scores.push({score: this.players[i].score, player:this.players[i].name});
    }

    if(this.canPlay){this.inHand.forEach(function(item){item.playable = true;});}
        else {this.inHand.forEach(function(item){item.playable = false;});}

    // cards in play
    for(var i=0; i<6; i++)
    {
        var card = game.playArea[i];
        if(!card) {card ='';}
        if (game.judge == i)
        {
            this.inPlay.push(new DispCard('judge','judge'));
            this.inPlay[this.inPlay.length-1].playerName = this.players[i].name;
        }
        else if (i == this.playerIndex && game.judge != i && card != '')
        {
            this.inPlay.push(new DispCard(card,'faceUp'));
            this.inPlay[this.inPlay.length-1].playerName = this.players[i].name;
        }
        else if (game.judge != i && card == '' && i<game.numPlayers)
        {
            this.inPlay.push(new DispCard('','empty'));
            this.inPlay[this.inPlay.length-1].playerName = this.players[i].name;
        }
        else if(game.judge !=i && card != '' && i<game.numPlayers)
        {
            this.inPlay.push(new DispCard('','faceDown'));
            this.inPlay[this.inPlay.length-1].playerName = this.players[i].name;
        }
        else if (i>=game.numPlayers)
        {
            this.inPlay.push(new DispCard('','null'));
            this.inPlay[this.inPlay.length-1].playerName = 'No one...';
        }
    }
    console.log('Adjective:',this.adj);
    console.log(player.name,'sees these cards in play:',this.inPlay);
    console.log(player.name,'has these cards in hand:',this.inHand);

    return this;
}


//  Adjective is visible.
//  Cards in play are visible.
//  Names are HIDDEN from cards in play.
//  Judge is judging.
//  Cards in hand are NOT playable.
function showJudgePhaseCards(game,player) {

/*    console.log('wtf mate');
    console.log('wtf mate');
    console.log('wtf mate');
    console.log('wtf mate');
    console.log('wtf mate');
    console.log('wtf mate');
    console.log('wtf mate');*/
    this.players = game.players;
    this.inPlay = [];
    this.inHand = player.hand;
    this.playerIndex = game.players.indexOf(player);
    this.adj = game.turns[game.turnNum].adj;
    this.judge = game.players[game.judge];
    this.isJudge = (this.judge == player);
//    this.adjective = game.turns[Turn].adj;

    this.scores = [];
    for(var i=0; i<this.players.length;i++)
    {
        this.scores.push({score: this.players[i].score, player:this.players[i].name});
    }

            // No one can play cards from hand.  Separate logic for cards in play.
    this.canPlay = false; //player.canPlay;

    if(this.canPlay){this.inHand.forEach(function(item){item.playable = true;});}
        else {this.inHand.forEach(function(item){item.playable = false;});}

/*    if(this.judge == player) {console.log('I think I am the judge this turn');}
        else{ console.log('I am not the judge...');}*/
    if(this.isJudge) {console.log('I think I am the judge this turn');}
        else{ console.log('I am not the judge...');}

    // cards in play
    for(var i=0; i<6; i++)
    {
        var card = game.playArea[i];
        if(!card) {card ='';}
        if (game.judge === i)
        {
            this.inPlay.push(new DispCard('judge','judge'));
            this.inPlay[this.inPlay.length-1].playerName = this.players[i].name;
        }
        else if (i === this.playerIndex && game.judge !== i && card !== '')
        {
            this.inPlay.push(new DispCard(card,'faceUp'));
                    //  I can still see my own card!
            this.inPlay[this.inPlay.length-1].playerName = this.players[i].name;
        }
            //////////////////
            // Shouldn't be possible to get to judge phase in this case...
        else if (game.judge !== i && card === '' && i<game.numPlayers)
        {
            this.inPlay.push(new DispCard('','empty'));
            this.inPlay[this.inPlay.length-1].playerName = '????????'; //this.players[i].name;
        }
            //////////////////

        else if(game.judge !==i && card !== '' && i<game.numPlayers)
            // Need to see it to judge it...
        {
            this.inPlay.push(new DispCard(card,'faceUp'));
            this.inPlay[this.inPlay.length-1].playerName = '????????'; //this.players[i].name;
            // I need to be able to judge this!
            if(this.isJudge){this.inPlay[this.inPlay.length-1].playable = true;}
        }
        else if (i>=game.numPlayers)
        {
            this.inPlay.push(new DispCard('','null'));
            this.inPlay[this.inPlay.length-1].playerName = 'No one...';
        }
    }
        //  We don't want to reveal who played what.
    this.inPlay = shuffle(this.inPlay);

    console.log('Adjective:',this.adj);
//    console.log(player.name,'sees these cards in play:',this.inPlay);
//    console.log(player.name,'has these cards in hand:',this.inHand);

    return this;
}

//  Find a card in your hand
function findPlayerCard(cardStr,playerStr,gameStr) {
    var str = cardStr;
    var thisGame = getGamePlayer(gameStr,playerStr).game;
    var thisPlayer = getGamePlayer(gameStr,playerStr).player;

    var playerIndex=-1;
    for(var i=0;i<thisGame.players.length;i++)
    {
        if(thisPlayer === thisGame.players[i]) {playerIndex = i;}
    }

    var cardIndex=-1;
    for(var i=0;i<thisPlayer.hand.length;i++)
    {
        if(str === thisPlayer.hand[i].text) {cardIndex = i;}
    }


//    var playerIndex = thisGame.players.indexOf(function(player){
//            player.hand.indexOf(function(card){return (card.text === cardStr)});
//    });
//    var cardIndex = thisPlayer.hand.indexOf(function(card){return (card.text == cardStr);});
//    var cardIndex = thisPlayer.hand.indexOf(function(card){return (card.text == cardStr);});

    if(cardIndex!==-1 && playerIndex!==-1)
    {
        console.log('player number:',playerIndex,'player name:',thisPlayer.name);
        console.log('card number:',cardIndex,'card name:',thisPlayer.hand[cardIndex].text);

        return {player: thisPlayer, card:thisPlayer.hand[cardIndex]};
    }
    else {return '';}

}

function likeThisCard(game,player,card) {

}


// Export!
var gameObj = {
    validate: validate,
    games: gameDB,
    players: playerDB,
    whenDone: whenDone,
    done: done,
    getGamePlayer: getGamePlayer,
    showPlayPhaseCards: showPlayPhaseCards,
    showJudgePhaseCards: showJudgePhaseCards,
    likeThisCard: likeThisCard,
    findPlayerCard: findPlayerCard
};


        //  If this game server were supposed to scale to a large number of users, done and to do should be factored into the Game Object.
var toDo = [];

function whenDone(socket,call,game){
    toDo.push({socket:socket, call:call, game:game});
    console.log('Tracking task...');
}

function done(param) {
    console.log('Passed ',param,'attempt callbacks');
    console.log('This is supposed to fire callbacks!!!');
    toDo.forEach(
        function(item,index,array){
            // if (game is associated with player's socket)
            // {
            console.log('Callback now?');
            item.call(item.game);
                // We should get rid of the used callbacks in the queue...
            item.call = function(){};
            // }
        }
    );
        // Don't need memory leak?
    toDo = [];
}


module.exports = gameObj;