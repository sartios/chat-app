var io = require('socket.io');

exports.initialize = function(server){
  io = io.listen(server);
  var chatInFra = io.of('/chatInFra').on('connection', handleSocket);
  var chatCom = io.of('/chatCom').on('connection', handleSocket);
};

var handleSocket = function(socket){
  handleMessage(socket);
  handleSetName(socket);
};

var handleMessage = function(socket){
  socket.on('message', function(message){
    message = JSON.parse(message);
    if(message.type == 'userMessage'){
        message.username = message.username;
        socket.broadcast.send(JSON.stringify(message));
        message.type = "myMessage";
        socket.send(JSON.stringify(message));
      }
  });
};

var handleSetName = function(socket){
  socket.on("set_name", function(data){
    socket.emit('name_set', data);
    socket.send(JSON.stringify({type:'serverMessage',
      message: 'Welcome to the most interesting char roon on earth!!'
    }));
  });
};
