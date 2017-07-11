/**
 * Created by mothw on 7/9/2017.
 */



//console.log('Hello console!');
var socket = io();
//console.log(socket);

$(function () {

    event.preventDefault();
    if(sessionStorage.player)
    {console.log('Login:',sessionStorage.player);}
    var socket = io();
    $('form').submit(function(){
        socket.emit('chat message', 'This is Major Tom to the console.');
            //  The following line would terminate the default form response POST route:
        //        return false;
    });

    socket.on('chat message', function(msg){
        console.log(msg);
    });

    function makeButton(name,text,action)
    {
        var button = $("<button>");
        button.attr('btn-name',name).text(text);
        $('#button-row').append(button);
        button.click(action);
//            button.click(function(){console.log('Clicked',button.attr('btn-name'),button.text())});
    }

//    makeButton('new-user','Create profile', login);

    makeButton('login', 'Log in', login);

//    makeButton('logout', 'Log out', login);
//    makeButton('browse', 'Browse profiles', login);


    function login() {
//        event.preventDefault();
        var player = {};
//        player.name = $('#username').val();
        player.name = $('#name').val();
        player.password = $('#password').val();
        player.game = $('#game').val();
        player.url = '/page';
/*        player.img = $('#img').val();
        player.about = $('#about').val();*/
//        sessionStorage.player = JSON.stringify({name: "minotaur",place:"labyrinth"});
        sessionStorage.player = JSON.stringify(player);
//        console.log('Logged in to sessionStorage:',sessionStorage.player);
//        console.log(player);
//        event.preventDefault();
        $.get("/page", player, function(){console.log('???');} );
//        $.get("/page1", player);
    }

});

