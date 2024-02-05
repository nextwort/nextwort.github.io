
// DOESNT WORK

/*const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const client = new net.Socket();

// Connect to the server
client.connect(8000, 'localhost', () => {
  console.log('Connected to the server');

  // Read input from the user and send it to the server
  rl.on('line', (input) => {
    client.write(input);
  });
});

// Receive messages from the server and display them
client.on('data', (data) => {
  console.log(data.toString());
  displayMessage(message)
});

// Handle server disconnection
client.on('close', () => {
  console.log('Connection closed');
});

// Event handler for sending messages
document.getElementById('send-button').addEventListener('click', () => {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
    if (message !== '') {
      // Send the message to the server
      socket.emit('message', message);
      // Clear the input field
      messageInput.value = '';
    }
  });
  
  // Function to display messages in the chat window
  function displayMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    document.getElementById('chat-window').appendChild(messageElement);
  }
*/


// doesnt work too


// const socket = io('http://localhost:8000');

// // Event handler for receiving messages from the server
// socket.on('message', (message) => {
//   console.log('Received message:', message);
//   // Display the message in the chat window
//   displayMessage(message);
// });

// // Event handler for sending messages
// document.getElementById('send-button').addEventListener('click', () => {
//   const messageInput = document.getElementById('message-input');
//   const message = messageInput.value.trim();
//   if (message !== '') {
//     // Send the message to the server
//     socket.emit('message', message);
//     // Clear the input field
//     messageInput.value = '';
//   }
// });

// // Function to display messages in the chat window
// function displayMessage(message) {
//   const messageElement = document.createElement('div');
//   messageElement.textContent = message;
//   document.getElementById('chat-window').appendChild(messageElement);
// }
