var io = require('socket.io');

var users = [];
var connections = [];
var rooms = [];

var chatInFra, chatCom;


exports.initialize = function(server){
  io = io.listen(server);
  chatInFra = io.of('/chatInFra');
  chatInFra.on('connection', handleSocket);
  chatCom = io.of('/chatCom');
  chatCom.on('connection', handleSocket);
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
        socket.to(message.room).broadcast.send(JSON.stringify(message));
        //socket.broadcast.send(JSON.stringify(message));
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

    rooms.push(data.room);
    socket.join(data.room);
    socket.emit('name_set', data);
    socket.send(JSON.stringify({type:'serverMessage',
      message: '<h3>'+data.room+'</h3><br/>Welcome to the most interesting char room on earth!!'
    }));
    updateUsers();
  });
};

var updateUsers = function(){
  chatInFra.emit('update_users', users);
  chatCom.emit('update_users', users);
};
