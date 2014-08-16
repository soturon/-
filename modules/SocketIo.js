var socketio = require('socket.io');

exports.socketIoListen = function(server) {
  // Socket.IO
  var io = socketio.listen(server);
  io.set('log level', 1);
  io.set('transports', [ 'websocket' ]);



  // 接続
  io.sockets.on('connection', function(socket) {
    //var address = socket.handshake.address.address;

    socket.on('room', function(event) {
      var room = event.room;
      socket.set('room',room);
      socket.join(room);
      socket.emit('push', room + "へ入室");
    } );

    socket.on('send', function(event) {
      var message = event.message;
	socket.get('room', function(err, _room) {
	room=_room;
        io.sockets.to(room).emit('push' , message);
       });
    } );

    // 切断
    socket.on("disconnect", function() {
    
    });
  });
}

