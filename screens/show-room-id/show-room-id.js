const roomIDP = document.querySelector(".room-id");
const copyAndOpenButton = document.getElementById("copy-and-open");

function getRoomID() {
    const urlParams = new URLSearchParams(window.location.search);
    const rValue = urlParams.get('r'); // This is the room ID
    return rValue;
}

roomIDP.textContent = getRoomID().toString();

copyAndOpenButton.addEventListener('click', () => {
    // Copy the room ID to the clipboard
    navigator.clipboard.writeText(getRoomID()).then(() => {
        console.log('Room ID copied to clipboard');
    }).catch(err => {
        console.error('Failed to copy room ID: ', err);
    });

    // Get the current page's query parameters
    const queryParams = window.location.search;

    // Redirect to the new page with the same query parameters
    window.location.replace(`/screens/chat/chat.html${queryParams}`);
});