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


function Game(gameId,gameName){
    this.id = gameId;
    this.name = gameName;
    this.players = [];
    this.playArea = [];
    this.deck = [];
    this.makeDeck();
//    this.deck = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];

    function addPlayer(player){
        if(this.players.indexOf(player)<0 && this.players.length<8)
        {   players.push(player);
            player.game = this;
        }
    }

    function placeCard(card){
        playArea.push(card);
    }

    function invite(player) {

    }

    function makeDeck() {

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
    }

    function validate(player) {
        if(this.players.indexOf(player)>0 && player.password == this.players[this.indexOf(player)].password){ return true;}
        else {
            console.log('Invalid player',player);
            return false;}
    }

    function shuffleDeck()
    {
        this.deck = shuffle(this.deck);
    }

}

function Player(playerId,playerName,playerPassword) {
    this.id = playerId;
    this.name = 'playerName';
    this.password = playerPassword;
    this.game = '';
    this.hand = [];

    function draw(deck) {
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
game2.addPlayer(reggie);
game2.addPlayer(connor);

