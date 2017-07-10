/**
 * Created by mothw on 7/9/2017.
 */



//console.log('Hello console!');
var socket = io();
//console.log(socket);

$(function () {
    var socket = io();
    $('form').submit(function(){
        socket.emit('chat message', 'This is Major Tom to the console.');
            //  The following line would terminate the default form response POST route:
        //        return false;
    });

    socket.on('chat message', function(msg){
        console.log(msg);
    });

});