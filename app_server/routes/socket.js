var io = require('socket.io');

var users = [];
var connections = [];


exports.initialize = function(server){
  io = io.listen(server);
  var chatInFra = io.of('/chatInFra').on('connection', handleSocket);
  var chatCom = io.of('/chatCom').on('connection', handleSocket);
};

var handleSocket = function(socket){
  connections.push(socket);
  console.log('Connected: %s sockets connected', connections.length);
  handleMessage(socket);
  handleSetName(socket);
  handleDisconnect(socket);
};

var handleDisconnect = function(socket){
  socket.on('disconnect', function(data){
    connections.splice(connections.indexOf(socket), 1);
    console.log('Disconnected: %s sockects connected', connections.length);
  });
};

var handleMessage = function(socket){
  socket.on('message', function(message){
    message = JSON.parse(message);
    if(message.type == 'userMessage'){
        message.username = socket.username;
        socket.broadcast.send(JSON.stringify(message));
        message.type = "myMessage";
        socket.send(JSON.stringify(message));
      }
  });
};

var handleSetName = function(socket){
  socket.on("set_name", function(data){
    var index = connections.indexOf(socket);
    if(index > -1){
      socket.username = data.username;
      connections[index] = socket;
      users.push(socket.username);
    }
    socket.emit('name_set', data);
    socket.send(JSON.stringify({type:'serverMessage',
      message: 'Welcome to the most interesting char roon on earth!!'
    }));
  });
};
