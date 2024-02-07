const roomIDP = document.querySelector(".room-id");

function getRoomID() {
    const urlParams = new URLSearchParams(window.location.search);
    const rValue = urlParams.get('r'); // This is the room ID
    return rValue;
}

roomIDP.textContent = "ID: " + getRoomID().toString();