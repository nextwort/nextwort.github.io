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