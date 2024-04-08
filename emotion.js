const emotion_p = document.getElementById("emotion");


document.addEventListener('DOMContentLoaded', function() {
    const inputElement = document.querySelector('.nwp-input');
    
    inputElement.addEventListener('input', async function() {
        const currentText = inputElement.value;
        let data = await getEmotion(currentText);
        console.log("emotion: ", data);
        setEmotionLabel(data);
    });
});

async function getEmotion(text) {
    try {
        const response = await fetch('https://actively-feat-makes-tm.trycloudflare.com:443/get_emotion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: text,
            }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

function setEmotionLabel(emotion){
    if (emotion == null) {
        emotion = "unknown";
    }
    emotion_p.textContent = "Emotion: " + emotion
}