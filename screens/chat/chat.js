let user_id
let users = []

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
  }
  
// Example usage:
addMessage('Naveen', 'Hello this is a test message', 0xFFFF00, true); // For outgoing messages
addMessage('Sarah', 'Hey Naveen, got your message!', 0xAAFF00, false); // For incoming messages

document.addEventListener('DOMContentLoaded', function(){

  const websocketClient = new WebSocket("ws://localhost:8765/");
  
  const messagesContainer = document.querySelector("#message_container");
  
  const messageInput = document.querySelector("[class=input-box]");
  
  const sendMessageButton = document.querySelector("[class=send]")
  
  websocketClient.onopen = function() {
    console.log("Client connected!")
    const url_data_raw = window.location.search.replace("?","").split('&')
    const data = {
      "type": "auth",
      "name": url_data_raw[0].replace("n=",""),
      "color": url_data_raw[1].replace("c=", "")
    }
    websocketClient.send(JSON.stringify(data))
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
    switch (data["type"]) {
      case "message":
        addMessage(users[data["user"]]["name"], data["content"], users[data["user"]]["name"], data["user"] != user)
      
      case "join":
        users[data["id"]] = data["content"]
        console.log("Join packet received from UUID " + data["id"])

      case "auth":
        user = data["uuid"]

    }
  };
  
  }, false);