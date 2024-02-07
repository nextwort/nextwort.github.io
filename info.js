const nextWordInfoButton = document.getElementById("next-word-info-button");
const wordCompInfoButton = document.getElementById("word-comp-info-button");

nextWordInfoButton.addEventListener("click", function() {
  const dropdownValue = document.getElementById("next-word-model-dropdown").value;
  window.location.href = "/frontend/info/" + dropdownValue + ".html"
});

wordCompInfoButton.addEventListener("click", function() {
  const dropdownValue = document.getElementById("word-comp-model-dropdown").value;
  window.location.href = "/frontend/info/" + dropdownValue + ".html"
})

