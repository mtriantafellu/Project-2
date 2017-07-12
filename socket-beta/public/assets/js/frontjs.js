/**
 * Created by mothw on 7/9/2017.
 */



//console.log('Hello console!');
var socket = io();
//console.log(socket);

$(function () {

    var player = '';
//    event.preventDefault();
    if(sessionStorage.player) {console.log('Login:',sessionStorage.player);}

    // goes here???
/*    var socket = io();
    var loggedIn = false;*/


    var socket = io();
    listenForReload();


    function listenForReload(){

//        var loggedIn = false;

        socket.on('server message', function(msg){
            if(sessionStorage.player)
            {
  //              loggedIn = true;
/*            }
            if(loggedIn == true)
            {*/

                console.log('Hello ground control...');

                // Refresh this page!!!
                $.get("/page", JSON.stringify(sessionStorage.player), function(){console.log('...');} ).done(function(data) {
                        /////////////////////////////////////////////////////////////////
                        /////  Firefox blocks this and Chrome throws a warning...
                        /////////////////////////////////////////////////////////////////
                        // document.write(data);
                        ////////////////////////////////////////////////////////////////
                        //  var newbody = $(data).body
                        var body = data.match(/<body[^>]*>[\s\S]*<\/body>/gi);
                        $('body').html(body);

                        console.log(msg,'(Wow, my page reloaded?)');
                        $('button').click(function(event){

                            event.preventDefault();

                            socket.emit('player action', 'I did something.  Reload?');
                            //  The following line would terminate the default form response POST route:
                            //        return false;

                            console.log('This button click should prompt reloads...');
                        });

                    }
                );
            }
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
//    makeButton('logan', 'Logan from the X-Men', logan);

//    function logan() {console.log('Wolverine');}

    $('form').submit(function(event){event.preventDefault()} );
    $('button').click(function(event){event.preventDefault()} );

    function login(event) {
        console.log('login button!!!');
//        event.preventDefault();
        var player = {};
//        player.name = $('#username').val();
        player.name = $('#name').val();
        player.password = $('#password').val();
        player.game = $('#game').val();
        player.url = '/page';
        sessionStorage.player = JSON.stringify(player);
        $.get("/page", player, function(){console.log('???');} ).done(function(data) {
            /////////////////////////////////////////////////////////////////
            /////  Firefox blocks this and Chrome throws a warning...
            /////////////////////////////////////////////////////////////////
           // document.write(data);
            ////////////////////////////////////////////////////////////////
          //  var newbody = $(data).body
            var body = data.match(/<body[^>]*>[\s\S]*<\/body>/gi);
            $('body').html(body);

//            console.log(body);
            $('button').click(function(event){

                event.preventDefault();

                ///// Socket!!!!
                listenForReload();
                //////////////////

                socket.emit('player action', 'I did something.');
                //  The following line would terminate the default form response POST route:
                //        return false;

                console.log('This should happen first, locally only');
            });
                }
            );
    }

});

