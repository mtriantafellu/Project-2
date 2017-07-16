/**
 * Created by mothw on 7/10/2017.
 */

var playerDB = [];
var gameDB = [];

var cardLog = {};

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

            ///////////////////////////////////////////////
            /////////// Adjectives!
    this.adjDeck = []; //shuffle(['happy','grumpy','sleepy','dopey','sneezy','doc','bashful']);
    this.adjData='Affluent***rich upscale well-to-do~~~Vivid***intense powerful full of life~~~Volatile***unstable explosive tempermental~~~Unprofessional***amateur untrained incompetent~~~Sympathetic***concerned compassionate supportive~~~Futuristic***advanced cutting edge ahead of the times~~~Inspiring***stirring uplifting encouraging~~~Pleasing***nice agreeable gratifying~~~Deceptive***dishonest deceitful misleading~~~Instructional***educational academic teaching~~~Ghostly***spectral spooky phantasmal~~~Placid***calm tranquil mild~~~Decorated***festooned beautified awarded~~~Rude***disrespetful impolite vulgar~~~Glistening***glossy gleaming lustrous~~~Innovative***creative inventive groundbreaking~~~Deranged***crazy demented unhinged~~~Odorous***producing odor having fragrance smelly~~~Amusing***entertaining diverting humorous~~~Curvaceous***rounded voluptuous shapely~~~Welcoming***inviting approachable accessible~~~Valiant***brave heroic noble~~~Tedious***monotonous boring uninteresting~~~Startling***surprising unexpected astonishing~~~Preposterous***absurd senseless utterly foolish~~~Fleshy***overweight meaty puply~~~Kissable***lovable inviting a kiss physically attractive~~~Chilling***frightening eerie horrifying~~~Pyschotic***mentally unstable demented intensely upset~~~Unwanted***rejected undesirable not wanted~~~Lifeless***lethargic spirtless without life~~~Snotty***snobbish arrogant smart-alecky~~~Gutless***cowardly timid chicken~~~Frayed***tattered frazzled unraveled~~~Dismal***dreary bleak gloomy~~~Ineffective***useless powerless unsuccessful~~~Bewitching***enchanting alluring enthralling~~~Sumptuous***luscious luxurious plush~~~Wholesome***decent pure healthful~~~Scratchy***prickly itchy raspy~~~Tiring***exhausting draining demanding~~~Muddy***dirty soiled swampy~~~Unanticipated***unforeseen out of the blue without warning~~~Ethical***moral principled honest~~~Reasonable***acceptable fair sensible~~~Ill-conceived***poorly planned half-baked not thought through~~~Limber***flexible lithe nible~~~Compelling***fascinating motivating irresistible~~~Heart-rending***heartbreaking tragic sad~~~Paranormal***supernatural mysterious occult~~~Downy***fluffy feathery fleecy~~~Moronic***idiotic supid foolish~~~Blunt***dull straightforward matter-of-fact~~~Hyper***frenetic excitable high-strung~~~Droopy***limp floppy saggy~~~Empty***bare vacant unfilled~~~Calming***appeasing pacifying soothing~~~Cuddlesome***cuddly lovable snuggly~~~Uncoordinated***awkward clumsy graceless~~~Egotistical***pompous self-absorbed conceited~~~Rejuvenating***revitalizing refreshing renewing~~~Horrendous***terrible dreadful atrocious~~~Unfriendly***antagonistic hostile nasty~~~Mainstream***widely accepted common established~~~Hellish***horrible fiendish unpleasant~~~Unethical***immoral unprincipled dishonest~~~Moldy***musty funky mildewed~~~Rickety***flimsy shaky ramshakle~~~Humid***muggy sticky sweltering~~~Merciless***heartless cruel ruthless~~~Electrifying***thrilling invigorating energizing~~~Buff***yellow-brown color muscular physically attractive~~~Childlike***innocent naive childish~~~Drippy***soggy drizzly sentimental~~~Unexplainable***baffling mystifying puzzling~~~';
//    console.log(adjData);
    this.adjData = this.adjData.split('~~~');
//    console.log(this.adjData);

    this.dataPairs = [];
    for(var i=0; i<this.adjData.length; i++)
        {console.log(this.adjData[i].split('***'));
            this.dataPairs[i] = {};
            this.dataPairs[i].text = this.adjData[i].split('***')[0];
            this.dataPairs[i].desc = this.adjData[i].split('***')[1];
        }
//    console.log(dataPairs);
    for(var j=0; j<this.dataPairs.length; j++)
        {
            this.adjDeck.push(this.dataPairs[j]);
//          this.adjDeck.push(new Card(dataPairs[j].text, dataPairs[j].desc));
        }
            ///////////////////////////////
    this.adjDeck = shuffle(this.adjDeck);


    this.turnState = 'none'; // play, judge,  (recap - optional state)

    this.addPlayer = function (player) {
        if (this.players.indexOf(player) < 0 && this.players.length < 6) {
            this.players.push(player);
            player.game = this;
            this.numPlayers++;
        }
    };

/*
    Refactored elsewhere.  (Once per turn, not once per game)
    for (var i=0; i < this.numPlayers; i++)
    {
        this.playArea[i]='';
    }*/

    this.placeCard = function(player,card){
        if(player.canPlay && player.hand.indexOf(card)!==-1)
        {
            /////////  Put this card into play
            this.playArea[this.players.indexOf(player)] = card;
            /////////////////////
            // Replace this card with the last card in your hand, then pop the extra copy of the last card.
            player.hand[player.hand.indexOf(card)] = player.hand[player.hand.length - 1];
            player.hand.pop();
            /////////////////////
            player.drawFrom(player.game.deck);

            player.canPlay = false;

            // If no one needs to play a card...
            if (this.players.every(function (item) {
                    return (item.canPlay === false);
                })) {
                // ...advance to judge phase of game.
                this.turnState = 'judge';
            }
        }
        else
            {
                if(!player.canPlay) {console.log(player.name,'cannot play, but click was received...');}
                if(player.hand.indexOf(card)==-1){console.log(player.name,'does not have the card',card.text);}
            }
    };

    // ideally, a separate function would invite players, and they would choose whether to join.
/*    this.invite = function(player) {
    };*/


    this.makeDeck = function() {

        var nounData='Bruno Mars***1985-, American singer-songwriter, dancer and producer.  Is there anything this Grammy-winner can\'t do? He even plays an Unorthodox Jukebox.~~~Class Warfare***One look at your bank balance should tell you which side you\'re on.~~~Sweaty Pits***\"Sometimes, when I get nervous, I stick my hands under my armpits and then I smell them like this!\" -Mary Katherine Gallagher, Superstar~~~Empire State Building***The static electricity buildup on the top of the building is so great that kissing can actually create sparks.~~~Alec Baldwin***1958-, award-winning actor from 30 Rock. Known for memorable appearances on SNL, as well as for clashes with the paparazzi.~~~A Filibuster***A process by which a piece of legislation can be stalled in the Senate.  Also known as \"talking a bill to death.\"~~~Sawed-Off Shotgun***The shorter barrel means a bigger bang for your buckshot.~~~Tony Stark***He is a self-proclaimed genius, billionaire, playboy, and philanthropist, but you and Robert Downey Jr. know him as Iron Man.~~~Phoenix***Arizona city named after a mythological bird that rises from the ashes of its predecessor.  It could happen in 120 summer heat.~~~Misspelled Tattoos***NO REGERTS~~~Shia LaBeouf***1986-, American actor and star of the Transformers film series. After accusations of plagiarism, he wore a paper bag that read: \"I am not famous anymore\".~~~Deep Sea Angler***Bony fish with wide, tooth-lined mouths and glowing lures projecting from their heads. Can live at depths of 14,000 feet... or swimming through your nightmares.~~~Grey\'s Anatomy***Prime time American medical TV series about the lives and loves of surgical interns and residents. Made \"McDreamy\" a household word.~~~Patton Oswalt***1969-, American comedian and actor who voiced Remy the rat in Ratatouille. He stands 5\'3\'\', but his geek-cred is off the charts.~~~Sundance Film Festival***Utah event that made indie films mainstream. If Robert Redford had played Mr. Cassidy, it might have been the Butch Film Festival.~~~Common Core***Educational standards ensuring that high school students are prepared to enter college or the workforce.~~~Koch Brothers***American billionaire siblings Charles (1935-) and David (1940-) use their wealth to support politically conservative causes and candidates.~~~Nails on a Chalkboard*** SKREEEEEEEEEEEEEE!!!~~~Rope Bridge***You go first.~~~Nanny Cams***\"I am the eye in the sky, looking at you, I can read your mind...\" -The Alan Parsons Project~~~Chopping Onions***It\'s a real tear-jerker.~~~Stuff Your Parents Like***Well, there goes something else that used to be cool.~~~Crate And Barrel***A retail store offering stylish furniture and housewares. Its goods were originally displayed on the containers in which they arrived, hence the name.~~~Bros***\"A Bro is always entitled to do something stupid, as long as the rest of his Bros are all doing it.\" -Barney Stinson, The Bro Code~~~Planetarium***A domed theater for presenting educational and entertaining shows about astronomy. A good place to go and space out.~~~Fighting Tooth and Nail***Sometimes you have to bite, scratch, and claw your way to the top.~~~Elon Musk***1971-, South African-born Canadian-American inventor, engineer, and visionary head of Tesla electric cars, SolarCity and SpaceX. He\'s making the future now.~~~A Harley***Harley-Davidson motorcycles. \"American by Birth. Rebel by Choice.\"~~~Moon Landing***We landed on the moon in 1969. When can we expect that \"giant leap for mankind\" we were promised?~~~Kevin Hart***1979-, comedian and star of the films Ride Along, The Wedding Ringer, and Get Hard. At 5 feet 4, he gets more laughs per inch than anyone.~~~Chum***A term for a \"friend\" or for bloody, ground-up fish used to attract sharks. Occasionally, the Mafia gets these confused.~~~Smashing Into a Wall***Crash test dummies make it look so easy.~~~Noobs***They get pwned.~~~Funnel Cakes***Deep fried doghnut batter covered with powdered sugar and your choice of toppings. It\'s not a carnival without one.~~~Black Ice***Clear ice that forms on roads. You\'ll be in a ditch before you see it.~~~She-Ra***When Pricess Aurora wields the Sword of Protection, she transforms into She-Ra: Princess of Power and gains incredible strength. SPOILER: Her twin brother is He-Man!~~~Minecraft***Wildly popular video game in which players explore, mine, and build whatever they can imagine. Bought by Microsoft for $2.5 billion.~~~Garlic Breath***Brush, gargle, rinse. Brush, gargle, rinse. Brush...~~~Hypnotists***Stare at the card. You are getting sleepy... Very sleepy... Now cluck like a chicken.~~~Quiche***A pastry crust filled with cheesy custard, meat, seafood or vegetables. Real men don\'t eat quiche, they inhale it.~~~HAL 9000***Artificial intelligence computer from the film 2001: A Space Odyssey. He had some control issues.~~~Yeti***The Creature Formerly Known as the Abominable Snowmen.~~~Corn Maze***A maze cut into a field of corn. If you get lost, you could always try to eat your way** out.~~~Street Meat***Hot dogs, sausages, and kabobs sold curbside by street venors. Not to be confused with road kill.~~~War Stories***We were surrounded...~~~Flying First Class***Would you care for a hot towel as you watch all the commoners head to the back of the plane~~~Emma Watson***1990-, English actress, model and activisit who gained fame playing Hermione Granger in the Harry Potter film series.~~~Mumuu***A loose Hawaiian dress or a cow in an echo chamber.~~~Multitasking***Save time! Screw up several things at once!~~~Kimye***Kim Kardashian + Kanye West = endless tabloid fodder.~~~Solar Flare***A brief eruption from the sun\'s surface that can disrupt communication transmissions and power grids. \"Can you hear me, now?\"~~~Clones***Organisms that are genetically identical to a single progenitor. The biotechnological equivalent of \"Copy and Paste.\"~~~Olivia Munn***1980-, American actress and author who has appeared on The Daily Show, HBO\'s Newsroom and was as Psylocke in X-Men:Apocalypse.~~~Gopro***Lightweight, wearable, high-definition camcorders, often used in extreme-action photography.~~~Blue-footed Boobies***Large marine birds with light-blue feet. While hunting for fish, they can plunge up to 82 feet below the water.~~~Sheldoon Cooper***Eccentric genius with almost no social skills on the TV sitcom The Big Bang Theory. Actor Jim Parsons has won 4 Primetime Emmy Awards for the role. Bazinga!~~~Minimum Wage***Of all the countries paying the highest minimum wage, the U.S. ranks 11th.~~~Oysters***People are always prying into their lives.~~~Tom Brady***1977-, American quarterback for the New England Patriots. After four Super Bowl victories, he\'s earned the nickname \"Tom Terrific.\"~~~Roomba***A robotic vacuum cleaner with sensors that detect dirt and avoid obstacles. Your cat will either attack it or ride it.~~~A Double-Dog Dare***The ultimate challenge. For use when a regular dare isn\'t enough to convince your buddy to moon a cop.~~~Adam Levine***1979-, lead singer-songwriter for the and Maroon 5 and a boach on TV\'s The Voice. Talk about Overexposed.~~~A Charlie Brown Christmas***Animated TV special in which the Peanuts gang learns the real meaning of Christmas with the help of a frail little Christmas tree.~~~Freezing Your Eggs***Woman use this process so their fertile eggs can be used later in life. They\'ve literally chosen to put all their eggs in one basket.~~~Fanboys***If you spend all your time on internet forums criticizing movie trailers instead of talking with girls... you might be a fanboy.~~~A Onesie***A bodysuit for infants with snaps at the crotch for easy diaper access. Available in adult sizes too.~~~Super Bowl Halftime Shows***The most important NFL championship football game interrupted by wardrobe malfunctions.~~~High Fructose Corn Syrup***An additive used to sweeten processed foods. It is also additive to your waistline.~~~Diabetes***A disease resulting in too much sugar in the blood. Ice cream or carrots? Snickers or celery? Slurpee or water? This isn\'t going to be easy!~~~Sia***1975-, Australian singer-songwriter. She sings songs about swinging from chandeliers, but prefers not to show her face.~~~Mom Jeans***The term \"mom jeans\" was coined on a fake Saturday Night Live commercial. \"I\'m not a woman anymore, I\'m a mom!\"Pink Unicorns***REALLY? The human race isn\'t confused enough?~~~Schoolhouse Rock***Short, animated films that aired on Saturday mornings, teaching grammar, science and history with songs like \"Conjunction Junction\" and \"I\'m Just a Bill.\"~~~A Home Invasion***Whether it\'s burglars or in-laws, they\'ll leave you feeling violated.~~~Alex Rodriguez***1975-, New York Yankee\'s third baseman, who was suspended one year for using performance enhancing steroids. Nickname: A-Rod.~~~Florida***America\'s 27th state is known as the Sunshine State. That\'s when the hurricanes aren\'t rolling through.~~~Tarot Cards***\"Last night I stayed up late playing poker with Tarot cards. I got a full house and four people died.\" -Steven Wright~~~Clearance Sale***Buying jeans other people didn\'t want and you don\'t need... but it\'s an incredible dead!~~~Captain of the Football Team***I hope he asks me to prom!!!~~~Sephora***A chain of cosmetics stores. The name comes from \"sephos,\" Greek for beauty, and \"Zipporah,\" the beautiful wife of Moses in the Old Testament.~~~Getting a Wedgie***It\'s not all it\'s cracked up to be.~~~Fancy Pants***\"Dressed up like a million dollar trooper, Trying hard to look like Gary Cooper, Super-duper!\" -Irving Berlin, \"Puttin\' on the Ritz\"~~~A Sock Monkey***A toy made from socks that looks like a monkey, if you forget to wash the socks, it also smells like a monkey.~~~No Bars***Great! No cell phone service AND no happy hour.~~~L. Ron Hubbard***1911-1986, founder of the Church of Scientology, the HBO film Going Clear focuses on the church\'s questionable practices.~~~Cowboy Hat***A hat worrn by cowboys... Duh!!!~~~Egg Sacks***A maternity ward for spiders.~~~Sign Spinners***They\'ve turned standing on street corners and twirling giant advertising arrows into an art form.~~~Moons Over My Hammy***Denny\'s classic ham and scrambled egg sandwich with Swiss and American chese on grilled sourdough. I\'m getting hungry just typing this!~~~Platypus***A furry, egg-laying animal with webbed forefeet. It\'s a bird...no, it\'s a reptile, no, it\'s a mammal...actually it\'s a marsupial.~~~Urchins***There are street urchins and there are sea urchins. One is wet behind the ears and the other is just plain wet.~~~Scooby Snacks***On TV\'s Scooby-Doo, these snacks were used to bribe Scooby and Shaggy into chasing villains. \"Would you do it for a Scooby snack?\"~~~A Spanking***Gives a whole new meaning to \"turning the other cheek.\"~~~Amanda Knox***1987-, an American student wrongly convicted and imprisoned for the 2007 murder of her roommate in Italy. She was finally exonerated in 2015.~~~Fortress of Solitude***Even Superman needs a man cave.~~~Taters***Potatoes just taste better when you call \'em taters.~~~Climate Change***\"the global warming outlook is much worse than originally predicted. Which is pretty bad when they originally predicted it would destroy the planet.~~~Cat Ladies***With all those cats in their home, they must be overcompensating for something. Maybe their lack of dogs.~~~Sewer Tunnels***We get flushed just thinking abou them.~~~Getting Hacked by North Korea***A new and effective way to promote a movie.~~~Foodies***Food lovers who start thinking about dinner before they finish breakfast. Let the eating adventure begin!~~~Adult diapers***We\'re gonna need a bigger changing table...~~~Noodling***Fishing for catfish with your bare hands. Just reach in to a catfish hole and when the fish swallows your hand, grab it by the gills. Seriously, this is a thing.~~~Libertarians***People whose political philosophy espouses little or not government oversight. It\'s like anarchy with etiquette.~~~Craft beers***Small, independent breweries that emphasize quality ingredients, flavor and brewing technique.~~~Taco Tuesday***Bet you can\'t eat just one!~~~People With No Rhythm***They might not be able to dance, but they sure are fun to watch.~~~Hot Air Balloon***If your idea of fun is hanging in a wicker basket thousands of feet in the air, hop in.~~~Poison Oak***It will leave you scratching your head. And everything else.~~~Ventriloquists***They\'ll put words in  your mouth.~~~Scratchers***The nickel you use to scratch this lottery ticket will be the only money you pocket on this deal.~~~A Sugar Rush***\"Oh, what a feeling, When we\'re dancing on the ceiling!\" - Lionel Richie~~~American Sniper***A highly-praised film about the life of Chris Kyle (1974-2013), who became the deadliest marksman in U.S. military history.~~~A Galaxy Far, Far Away***\"Punch it, Chewie!\" -Han Solo~~~Tax Loopholes***\"A tax loophole is something that benefits the other guy. If it benefits you, it is tax reform.\" - Russell B. Long~~~Collapsed Lung***Fortunately, you have a back-up.~~~Chelsea Handler***1975-, American comedian, author, activist and host of E! Network\'s Chelsea Lately.~~~Sydney***One of the Australia\'s largest cities. Known for its harbor-front Opera House featuring a distinctive shell-like design, G\'day, maestro!~~~Going Commando***The practive of not wearing underwear. Your mother would be horrified!~~~Frank Underwood***Ruthless politician played by Kevin Spacey in Netflix\'s House of Cards. \"Shake with your right hand, but hold a rock with your left.\"~~~Airbags***They pop up to save the day.~~~Nose Jobs***A few nose jobs: perfume sniffer, truffle hunter, nose job model.~~~M.C. Escher***1898-1972. Dutch artist known for his \"impossible structures,\" including Ascending and Descending. I can\'t tell if he\'s coming or going!~~~Sagrada Familia***Catholic church in Barcelona, Spain, designed by Antoni Gaudi. Its style celebrates nature, with hife-like spires and an interious resembling a petrified forest.';

        console.log(nounData);

        nounData = nounData.split('~~~');

//        console.log(data);

        var dataPairs = [];
        for(var i=0;i<nounData.length;i++)
        {console.log(nounData[i].split('***'));
            dataPairs[i] = {};
            dataPairs[i].text = nounData[i].split('***')[0];
            dataPairs[i].desc = nounData[i].split('***')[1];
        }

        for(var j=0; j<dataPairs.length;j++)
        {
            this.deck.push(new Card(dataPairs[j].text, dataPairs[j].desc));
        }

        //  Real game will use something else...

        /*
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

        */

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
        for (var i=0; i < this.numPlayers; i++)
        {
            this.playArea[i]='';
        }

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


//        this.adjDeck = shuffle(['happy','grumpy','sleepy','dopey','sneezy','doc','bashful']);
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
        logCard(card,this);
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

function logCard(card,player) {
    cardLog[card.text] = {card:card, player:player, game:player.game};
}


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
//  ***FAILS BY DESIGN IF THE CARD IS NO LONGER IN YOUR HAND.***
//
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

function isJudge(cardStr,playerStr,gameStr) {
    var find = findPlayerCard(cardStr,playerStr,gameStr);
    if(find.player && find.card)
        {
            if(find.player.game.judge === find.player) {return true;}
        }
    else return false;
}

function likeThisCard(cardText) {
    if(cardLog[cardText] != undefined)
        {
            var CLCT = cardLog[cardText];
            var player = CLCT.player;
            var game = CLCT.game;
            var card = CLCT.card;

            player.score++;
            console.log('card',card);
            console.log('player.score',player.score);
            game.turns[game.turnNum].winner = player;
            game.endTurn();
        }
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
    findPlayerCard: findPlayerCard,
    isJudge: isJudge
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
game1.addPlayer(connor);
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

/*
console.log(cardLog[mattB.hand[0].text]);
console.log('Card log success y/n?');  */

module.exports = gameObj;