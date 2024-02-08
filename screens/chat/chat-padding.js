// Function to update the padding-bottom of the body
function updateBodyPadding() {
    var bottomAreaHeight = document.querySelector('.bottom-area').offsetHeight;
    document.body.style.paddingBottom = bottomAreaHeight + 'px';
}

// Call the function initially and whenever the window is resized
updateBodyPadding();
window.addEventListener('resize', updateBodyPadding);
