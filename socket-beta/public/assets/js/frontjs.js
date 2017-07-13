/**
 * Created by mothw on 7/9/2017.
 */



//console.log('Hello console!');
//var socket = io();
//console.log(socket);

$(function () {

    $.ajaxSetup({ cache: false });
    var socket = io();
    var player = '';

    // listenForReload();

    //    event.preventDefault();
    if(sessionStorage.player)
    {console.log('Login:',sessionStorage.player);
        player = JSON.parse(sessionStorage.player);
    }

//    listenForReload();


    function listenForReload(){

//        var loggedIn = false;
        socket.on('server message', function(msg){
            console.log('Hello ground control. Your message was',msg);
//            console.log(JSON.parse(sessionStorage.player));
            // Refresh this page!!!
            $.post("/game", JSON.parse(sessionStorage.player) ).done(getGamePage);

        });
    }

    $('form').submit(function(event){

        event.preventDefault();

    });



    function makeButton(name,text,action)
    {
        var button = $("<button>");
        button.attr('btn-name',name).text(text);
        $('#button-row').append(button);
        button.click(action);
//            button.click(function(){console.log('Clicked',button.attr('btn-name'),button.text())});
    }


    makeButton('login', 'Log in', login);

    $('form').submit(function(event){event.preventDefault()} );
    $('button').click(function(event){event.preventDefault()} );

    function login(event) {
        console.log('login button!!!');
        event.preventDefault();
        var player = {};
//        player.name = $('#username').val();
        player.name = $('#name').val();
        player.password = $('#password').val();
        player.game = $('#game').val();
        player.url = '/game';
        player.card = '';
        sessionStorage.player = JSON.stringify(player);
            ///////////////////
        listenForReload();
            ///////////////////

        $.post("/game", player, function(){console.log('???');} ).done(getGamePage);
    }

    function getGamePage(data) {
            var body = data.match(/<body[^>]*>[\s\S]*<\/body>/gi);
            $('body').html(body);

//            console.log(body);
            $('button').click(function(event){

                event.preventDefault();

                //////////////////
                ///// Socket!!!!
                //////////////////

                socket.emit('player action', 'I did something.');
                //  The following line would terminate the default form response POST route:
                //        return false;

                console.log('This should happen first, locally only');

                $.post("/game", player, function(){console.log('???');} ).done(getGamePage);

            });
    }


});

