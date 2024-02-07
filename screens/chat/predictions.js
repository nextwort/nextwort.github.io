async function populateModelDropdown(url, dropdownId) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
      const dropdown = document.getElementById(dropdownId);
  
      // Clear the dropdown before adding the new model names
      dropdown.innerHTML = '';
  
      data.model_names.forEach(modelName => {
        const option = document.createElement('option');
        option.text = modelName;
        dropdown.add(option);
      });
    } catch (error) {
      console.error('Error fetching model names:', error);
    }
}

// Call the async function to populate the dropdown
populateModelDropdown('http://localhost:13232/get_next_word_models', 'next-word-model-dropdown');
populateModelDropdown('http://localhost:13232/get_complete_word_models', 'word-comp-model-dropdown');





const next_word_model_dropdown = document.getElementById("next-word-model-dropdown");
const word_comp_model_dropdown = document.getElementById("word-comp-model-dropdown");
const pred_words = document.querySelectorAll(".pred-word");
const pred_word_div = document.querySelector(".pred-words");
const error_msg = document.querySelector(".error-msg");
setErrorMessage("Could not connect to backend");


next_word_model_dropdown.addEventListener('change', async function() {
    const currentText = inputElement.value;
    let data = await getNextWords(currentText);
    showNextWords(data);
});


document.addEventListener('DOMContentLoaded', function() {
    const inputElement = document.querySelector('.nwp-input');
    
    inputElement.addEventListener('input', async function() {
        const currentText = inputElement.value;
        let data = await getNextWords(currentText);
        showNextWords(data);
    });
});



async function getNextWords(text) {
    let next_word_model = next_word_model_dropdown.value;
    let word_comp_model = word_comp_model_dropdown.value;
    try {
        const response = await fetch('http://localhost:13232/make_pred', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: text,
                prev_messages: messages,
                next_word_model: next_word_model,
                word_comp_model: word_comp_model
            }), // Make sure the body matches your server's expected format
        });
        console.log("got answer");

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        setErrorMessage(null);

        return data;
        // Update the DOM or take other actions here with data.next_word
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        setErrorMessage("Could not complete fetch");
    }

}

const predWords = document.querySelectorAll(".pred-word");

function showNextWords(data) {
    // return lenght of predWords
    console.log("got data: ", data);

    // Show error if present
    if ("error" in data) {
        setErrorMessage(data.error);
        return
    }

    for (let i = 0; i < data.words.length; i++) {
        predWords[i].textContent = data.words[i][0];
    }
    // clear teh unset predWords
    for (let i = data.words.length; i < predWords.length; i++) {
        predWords[i].textContent = "";
    }
    console.log(data.model_type);
    setActiveModel(data.model_type);
}

function setErrorMessage(errorMessage){
    if (errorMessage == null) {
        error_msg.style.display = "none";
        pred_word_div.style.display = "block";
    } else {
        error_msg.style.display = "block";
        pred_word_div.style.display = "none";
        
        // Set text
        error_msg.textContent = errorMessage;
    }
    setActiveModel(null);
}

function setActiveModel(model) {
    // Remove the classes
    next_word_model_dropdown.classList.remove("model-dropdown-inactive");
    next_word_model_dropdown.classList.remove("model-dropdown-active");

    word_comp_model_dropdown.classList.remove("model-dropdown-inactive");
    word_comp_model_dropdown.classList.remove("model-dropdown-active");

    if (model == "next_word") {
        // Set for next word
        next_word_model_dropdown.classList.add("model-dropdown-active");
        word_comp_model_dropdown.classList.add("model-dropdown-inactive");
    } else if (model == "complete_word") {
        // Set for next word
        next_word_model_dropdown.classList.add("model-dropdown-inactive");
        word_comp_model_dropdown.classList.add("model-dropdown-active");
    }
}