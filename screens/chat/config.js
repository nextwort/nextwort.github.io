document.getElementById('config-div').style.display = 'none';

document.getElementById('configToggleButton').addEventListener('click', function() {
    var content = document.getElementById('config-div');
    if (content.style.display === 'none') {
      content.style.display = 'block';
      this.textContent = 'Hide config ▲'; // Change the arrow direction
    } else {
      content.style.display = 'none';
      this.textContent = 'Show config ▼'; // Change the arrow direction
    }
  });