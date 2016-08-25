var socket = io.connect('/');

var name;

socket.on('message', function(data){
  data = JSON.parse(data);
  if(data.username){
    if(data.username == name){
      $('#messages').append('<div class="username"><b>me</b></div><div class="'+data.type+'">' + data.message + '</div>');
    }else{
      $('#messages').append('<div class="username"><b>'+data.username+'</b></div><div class="'+data.type+'">' + data.message + '</div>');
    }

  }else{
      $('#messages').append('<div class="'+data.type+'">' + data.message + '</div>');
  }

});

socket.on('name_set', function(data){
  $('#nameform').hide();
  $('#messages').append('<div class="systemMessage">'+ 'Hello ' + data.username +'</div>');
  $('#send').click(function(){
    var data = {
      message: $('#message').val(),
      type: 'userMessage',
      username: name
    };
    socket.send(JSON.stringify(data));
    $('#message').val('');
  });
});

// On document.ready
$(function(){
  $('#setname').click(function(){
    name = $('#nickname').val();
    socket.emit("set_name", {username: name});
  });
});
