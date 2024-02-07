let room
let user_id
let users = []

var messages = [];

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

function getRoomID() {
  const urlParams = new URLSearchParams(window.location.search);
  const rValue = urlParams.get('r'); // This is the room ID
  return rValue;
}

function getParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  const rValue = urlParams.get(param);
  return rValue.toString();
}
  

document.addEventListener('DOMContentLoaded', function(){

  const websocketClient = new WebSocket("wss://saved-guards-torture-scsi.trycloudflare.com:443/");
  
  const messagesContainer = document.getElementById("message_container");
  
  const messageInput = document.querySelector(".nwp-input");
  console.log(messageInput);
  
  const sendMessageButton = document.querySelector(".send")
  
  websocketClient.onopen = function() {
    console.log("Client connected!")
    const url_data_raw = window.location.search.replace("?","").split('&')
    console.log(url_data_raw)

    if (url_data_raw.length == 2) {
      const data = {
        "type": "login",
        "uuid": getParam("u"),
      }
      websocketClient.send(JSON.stringify(data))
    }

    else {
      const data = {
        "type": "auth",
        "name": getParam("n"),
        "color": getParam("c"),
        "room": getRoomID().toString(),
      }
      websocketClient.send(JSON.stringify(data))
    }
    
  };

  function sendMessage() {
    if (messageInput.value.trim() === '') {
      return
    }
    data = {
      "type": "message",
      "user": getParam("u"),
      "content": messageInput.value
    }
    websocketClient.send(JSON.stringify(data))
    messageInput.value = ''
  }

  messageInput.addEventListener('keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
      sendMessage()
    }
  });

  sendMessageButton.addEventListener('click', function (e) {
    sendMessage()
  })
  
  websocketClient.onmessage = function(message) {
    data = JSON.parse(message.data)
    console.log("Packet received:")
    console.log(data)
    console.log()
    switch (data["type"]) {
      case "message":
        console.log(data["user"])
        addMessage(data["name"], data["content"], data["color"], data["user"] != getParam("u"))
        break
      
      case "join":
        users[data["id"]] = data["content"]
        console.log("Join packet received from UUID " + data["id"])
        addJoinMessage(data["content"]["name"])
        break

      case "auth":
        user = data["uuid"]
        console.log("Auth packet received, UUID is", user)
        window.location.search = "?u=" + user + "&r=" + getRoomID()
        break

    }
  };
  
  }, false);