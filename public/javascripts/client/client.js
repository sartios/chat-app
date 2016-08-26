(function(){
  var socket = io.connect('/chatInFra');

  // On document.ready
  $(function(){
    var name;
    var users = $('#users');
    var messages = $('#messages');
    var namePopup = $('#nameform');
    var message = $('#message');

    message.keyup(function(key){
      if(key.which==13){
        sendMessage();
      }
    });

    $(window).load(function(){
      $('#nameform').show();
    });

    $('#setname').click(setName);
    function setName(){
      name = $('#nickname').val();
      socket.emit("set_name", {username: name});
    }

    socket.on('update_users', handleUpdateUsers);
    socket.on('message', handleMessage);
    socket.on('name_set', handleNameSet);

    function handleMessage(data){
     data = JSON.parse(data);
     if(data.username){
       if(data.username == name){
         messages.append('<div class="username"><b>me</b></div><div class="'+data.type+'">' + data.message + '</div>');
       }else{
         messages.append('<div class="username"><b>'+data.username+'</b></div><div class="'+data.type+'">' + data.message + '</div>');
       }
     }else{
         messages.append('<div class="'+data.type+'">' + data.message + '</div>');
     }
   }

    function handleUpdateUsers(data){
      var html = '<ul class="list-group">';
      for(var i = 0; i < data.length; i++){
        html += '<li class="list-group-item"><span class="glyphicon glyphicon-user">'+data[i]+'</span></li>';
      }
      html += '</ul>';
      users.html(html);
    }

    function handleNameSet(data){
      namePopup.hide();
      messages.append('<div class="systemMessage">'+ 'Hello ' + data.username +'</div>');
      $('#send').click(sendMessage);
    }

    function sendMessage(){
      var data = {
        message: $('#message').val(),
        type: 'userMessage'
      };
      socket.send(JSON.stringify(data));
      $('#message').val('');
    }
  });

})();
