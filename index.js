async function populateModelDropdown() {
    try {
        const response = await fetch('http://localhost:13232/get_next_word_models', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ msg: "text" }), // Make sure the body matches your server's expected format
        });
        
    const data = await response.json();
      const dropdown = document.getElementById('next-word-model-dropdown');
      
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
  populateModelDropdown();