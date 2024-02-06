const next_word_model_dropdown = document.querySelector(".model-dropdown");
next_word_model_dropdown.addEventListener('change', async function() {
    const currentText = inputElement.value;
    let data = await getNextWords(currentText);
    showNextWords(data);
});



const pred_words = document.querySelectorAll(".pred-word");
const no_backend_error = document.querySelector(".no-backend-error");
setShowBackendError(true);


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
        const response = await fetch('http://localhost:13232/predict_next_word', {
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
        
        setShowBackendError(false);

        return data;
        // Update the DOM or take other actions here with data.next_word
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        setShowBackendError(true);
    }

}

const predWords = document.querySelectorAll(".pred-word");

function showNextWords(data) {
    // return lenght of predWords
    // console.log(predWords);
    for (let i = 0; i < predWords.length; i++) {
        predWords[i].textContent = data[i][0];
    }
    // clear teh unset predWords
    for (let i = data.length; i < predWords.length; i++) {
        predWords[i].textContent = "";
    }
}

function setShowBackendError(show){
    // Set vis of no_backend_error
    if (show) {
        no_backend_error.style.display = "block";
    } else {
        no_backend_error.style.display = "none";
    }

    // Set vis of pred_words
    if (show) {
        for (let i = 0; i < pred_words.length; i++) {
            pred_words[i].style.display = "none";
        }
    } else {
        for (let i = 0; i < pred_words.length; i++) {
            pred_words[i].style.display = "inline";
        }
    }

}