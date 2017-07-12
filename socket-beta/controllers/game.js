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
                    console.log('rawr');
                    bool = true;
                    console.log(bool);
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
    this.numPlayers = 3;
//    this.deck = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
    this.turns = [];
    this.turnNum = 0; // = turns.length
    this.judge = 0; // = turns.length%numPlayers
    this.adjDeck = shuffle(['happy','grumpy','sleepy','dopey','sneezy','doc','bashful']);

    this.addPlayer = function (player) {
        if (this.players.indexOf(player) < 0 && this.players.length < 8) {
            this.players.push(player);
            player.game = this;
        }
    };

    for (var i=0; i < this.numPlayers; i++)
    {
        this.playArea[i]='';
    }

    this.placeCard = function(player,card){
        this.playArea[this.players.indexOf(player)]=card;
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
        console.log('Validating',player.name,player.game,player.password);
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
            else {return false;}

        console.log('Invalid player for the game',this.name,':',player);
        console.log(this);
        return false;
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
    };

        // Make sure you have enough players first?
    this.start = function() {
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
    this.card = '';
    if(this.type == 'faceUp') {
        this.card = dispCard;
    }
    else
    {
        this.card = '';
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
var reggie = new Player('Reggie','pass5');
var evilKevin = new Player('Evil Kevin','traitor');


playerDB = [mattB,mattT,kevin,connor,reggie,evilKevin];
gameDB = [game1,game2];

game1.addPlayer(mattT);
game1.addPlayer(kevin);
game1.addPlayer(mattB);
game2.addPlayer(reggie);
game2.addPlayer(connor);
game2.addPlayer(evilKevin);
game1.start();
game2.start();
console.log('Game 1 deck:',game1.deck);
console.log('Game 2 deck:',game2.deck);

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
showPlayPhaseCards(game1,mattB);




// players are choosing card to play
function showPlayPhaseCards(game,player) {

    this.inPlay = [];
    this.inHand = player.hand;
    this.playerIndex = game.players.indexOf(player);
    this.adj = game.turns[game.turnNum].adj;

    // cards in play
    for(var i=0; i<8; i++)
    {
        var card = game.playArea[i];
        if (game.judge == i)
        {
            this.inPlay.push(new DispCard('judge','judge'));
        }
        else if (i == this.playerIndex && game.judge != i && card != '')
        {
            this.inPlay.push(new DispCard(card,'faceUp'));
        }
        else if (game.judge != i && card == '' && i< game.numPlayers)
        {
            this.inPlay.push(new DispCard('','empty'));
        }
        else if(game.judge !=i && card != '')
        {
            this.inPlay.push(new DispCard('','faceDown'));
        }
        else if (i>game.numPlayers)
        {
            this.inPlay.push(new DispCard('','null'));
        }
    }
    console.log('Adjective:',this.adj);
    console.log(player.name,'sees these cards in play:',this.inPlay);
    console.log(player.name,'has these cards in hand:',this.inHand);
}


// Export!
var gameObj = {
    validate: validate,
    games: gameDB,
    players: playerDB,
    whenDone: whenDone,
    done: done
};

var toDo = [];

function whenDone(socket,call){
    toDo.push({socket:socket, call:call});
    console.log('Tracking task...');
}

function done(game) {
    toDo.forEach(
        function(item,index,array){
            // if (game is associated with player's socket)
            // {
            console.log('Callback now?');
            item.call(item.socket);
            item.call = function(sckt){};
            // }
        }
    );
}


module.exports = gameObj;