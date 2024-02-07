let user_id
let users = []

let messages = []

function addMessage(username, messageText, color, isIncoming) {
    // Construct the message HTML
    var messageHTML = `
      <div class="message ${isIncoming ? 'in-msg' : 'out-msg' }" style="box-shadow: 0 0 15px 10px #${color.toString(16)};" >
        <p class="message-user">${username}</p>
        <p class="message-text">${messageText}</p>
      </div>`;
  
    // Find the chats container and append the new message HTML
    var chatsContainer = document.querySelector('.chats');
    chatsContainer.innerHTML += messageHTML;
  
    // Scroll to the bottom of the chat container
    window.scrollTo(0, document.body.scrollHeight);

    messages.push(messageText);
  }

function addJoinMessage(userName) {
  var joinHTML = "<p class='join-msg'>" + userName + " joined the room </p>"

  var chatsContainer = document.querySelector('.chats');
  chatsContainer.innerHTML += joinHTML;

  window.scrollTo(0, document.body.scrollHeight);
  
}
  

document.addEventListener('DOMContentLoaded', function(){

  const websocketClient = new WebSocket("ws://localhost:13261/");
  
  const messagesContainer = document.querySelector("#message_container");
  
  const messageInput = document.querySelector("[class=input-box]");
  
  const sendMessageButton = document.querySelector("[class=send]")
  
  websocketClient.onopen = function() {
    console.log("Client connected!")
    const url_data_raw = window.location.search.replace("?","").split('&')
    console.log(url_data_raw)

    if (url_data_raw.length == 1) {
      user = url_data_raw[0].replace("u=", "")
      const data = {
        "type": "login",
        "uuid": user,
      }
      websocketClient.send(JSON.stringify(data))
    }

    else {
      const data = {
        "type": "auth",
        "name": url_data_raw[0].replace("n=",""),
        "color": url_data_raw[1].replace("c=", "")
      }
      websocketClient.send(JSON.stringify(data))
    }
    
  };

  messageInput.addEventListener('keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
      data = {
        "type": "message",
        "user": user,
        "content": messageInput.value
      }
      websocketClient.send(JSON.stringify(data))
      messageInput.value = ''
    }
  });
  
  websocketClient.onmessage = function(message) {
    data = JSON.parse(message.data)
    console.log("Packet received:")
    console.log(data)
    console.log()
    switch (data["type"]) {
      case "message":
        console.log(user)
        console.log(data["user"])
        addMessage(data["name"], data["content"], data["color"], data["user"] != user)
        break
      
      case "join":
        users[data["id"]] = data["content"]
        console.log("Join packet received from UUID " + data["id"])
        addJoinMessage(data["content"]["name"])
        break

      case "auth":
        user = data["uuid"]
        console.log("Auth packet received, UUID is", user)
        //window.location.search = "?u=" + user'
        break

    }
  };
  
  }, false);