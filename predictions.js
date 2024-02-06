const next_word_model_dropdown = document.querySelector(".model-dropdown");
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
    let model_name = next_word_model_dropdown.value;
    try {
        const response = await fetch('http://localhost:13232/make_pred', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: text,
                prev_messages: [],
                model_name: model_name
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
    for (let i = 0; i < predWords.length; i++) {
        predWords[i].textContent = data[i][0];
    }
    // clear teh unset predWords
    for (let i = data.length; i < predWords.length; i++) {
        predWords[i].textContent = "";
    }
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
}