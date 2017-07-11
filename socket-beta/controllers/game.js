/**
 * Created by mothw on 7/10/2017.
 */

var playerDB = [];
var gameDB = [];

function shuffle(array)
{
    /**
     * Randomize array element order in-place.
     * Using Durstenfeld shuffle algorithm.
     */
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

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


function Game(gameId,gameName) {
    this.id = gameId;
    this.name = gameName;
    this.players = [];
    this.playArea = [];
    this.deck = [];
//    this.deck = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];

    this.addPlayer = function(player){
        if(this.players.indexOf(player)<0 && this.players.length<8)
        {   this.players.push(player);
            player.game = this;
        }
    }

    this.placeCard = function(card){
        playArea.push(card);
    }

    this.invite = function(player) {

    }

    this.makeDeck = function() {

        this.deck.push(new Card(2,'2','Two'));
        this.deck.push(new Card(3,'3','Three'));
        this.deck.push(new Card(4,'4','Four'));
        this.deck.push(new Card(5,'5','Five'));
        this.deck.push(new Card(6,'6','Six'));
        this.deck.push(new Card(7,'7','Seven'));
        this.deck.push(new Card(8,'8','Eight'));
        this.deck.push(new Card(9,'9','Nine'));
        this.deck.push(new Card(10,'10','Ten'));
        this.deck.push(new Card(11,'11','Jack'));
        this.deck.push(new Card(12,'12','Queen'));
        this.deck.push(new Card(13,'13','King'));
        this.deck.push(new Card(14,'14','Ace'));
        this.shuffleDeck();
        this.players.forEach(function(player){
            player.drawFrom(this.deck);
            player.drawFrom(this.deck);
            player.drawFrom(this.deck);
        });

    }


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
                    console.log('Valid player!');
                    return true;
            }
            else {return false;}

        console.log('Invalid player',player);
        console.log(this);
        return false;
    }

    this.shuffleDeck = function()
    {
        this.deck = shuffle(this.deck);
    }



    this.makeDeck();

}

function Player(playerId,playerName,playerPassword) {
    this.id = playerId;
    this.name = playerName;
    this.password = playerPassword;
    this.game = '';
    this.hand = [];

    this.drawFrom = function(deck) {
        var card = deck[deck.length - 1];
        deck.pop();
        this.hand.push(card);
    }
}

function Card(cardId, cardName, cardDesc) {
    this.id = cardId;
    this.text ='Default text';
    this.faceup = false;
    this.desc = cardDesc;
    this.text = cardName;
}

var game1 = new Game(1,'game1');
var game2 = new Game(2,'game2');

var mattB = new Player(1,'Matt B','pass1');
var mattT = new Player(2,'Matt T','pass2');
var kevin = new Player(3,'Kevin','pass3');
var connor = new Player(4,'Connor','pass4');
var reggie = new Player(5,'Reggie','pass5');
var evilKevin = new Player(6,'Evil Kevin','traitor');

playerDB = [mattB,mattT,kevin,connor,reggie,evilKevin];
gameDB = [game1,game2];

game1.addPlayer(mattT);
game1.addPlayer(kevin);
game1.addPlayer(mattB);
game2.addPlayer(reggie);
game2.addPlayer(connor);



var gameObj = {
    validate: validate,
    games: gameDB,
    players: playerDB
};

module.exports = gameObj;