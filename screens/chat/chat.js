const user = window.location.search.replace("?u=","")

function addMessage(username, messageText, isIncoming) {
    // Construct the message HTML
    var messageHTML = `
      <div class="message ${isIncoming ? 'in-msg' : 'out-msg'}">
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
addMessage('Linus', 'Hello this is a test message', true); // For outgoing messages
addMessage('Sarah', 'Hey Linus, got your message!', false); // For incoming messages

document.addEventListener('DOMContentLoaded', function(){

  const websocketClient = new WebSocket("ws://localhost:8765/");
  
  const messagesContainer = document.querySelector("#message_container");
  
  const messageInput = document.querySelector("[class=input-box]");
  
  const sendMessageButton = document.querySelector("[class=send]")
  
  websocketClient.onopen = function() {
    console.log("Client connected!")
  };

  messageInput.addEventListener('keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
      data = {
        "user": user,
        "content": messageInput.value
      }
      websocketClient.send(JSON.stringify(data))
      messageInput.value = ''
    }
  });
  
  websocketClient.onmessage = function(message) {
    data = JSON.parse(message.data)
    
    addMessage(data["user"], data["content"], data["user"] != user)
  };
  
  }, false);