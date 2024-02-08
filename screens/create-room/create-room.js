let color = "000000"
const colorButtons = document.querySelectorAll(".color")

function newRoom() {
    const room = Math.floor(Math.random() * 10000);
    const name = document.querySelector(".user-name").value
    if (room && name) {
        window.location.replace("/screens/show-room-id/show-room-id.html?n=" + name + "&c=" + color + "&r=" + room)
    }
    else {
        alert("Please enter a name")
    }
}

function setColor(color) {
    color = color;
}

function deselectAllColors() {
    colorButtons.forEach((button) => {
        button.classList.remove("color-selected")
    })
}

function selectColor(event) {
    deselectAllColors()
    event.target.classList.add("color-selected")
    color = rgbStringToHex(event.target.style.backgroundColor);
}

// Add event listeners to color buttons
document.addEventListener('DOMContentLoaded', () => {
    colorButtons.forEach(button => {
      button.addEventListener('click', selectColor);
    });
});


// RGB to hex
function componentToHex(c) {
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return componentToHex(r) + componentToHex(g) + componentToHex(b);
}
function rgbStringToHex(rgbString) {
    // Extract the integers from the rgb string using a regular expression.
    const rgbArray = rgbString.match(/\d+/g).map(Number);

    // Assuming the array contains three elements: red, green, and blue.
    if (rgbArray.length === 3) {
        const [r, g, b] = rgbArray;
        return rgbToHex(r, g, b);
    } else {
        throw new Error('Invalid RGB string format');
    }
}