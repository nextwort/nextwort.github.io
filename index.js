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
populateModelDropdown('https://all-tell-skirt-gourmet.trycloudflare.com:443/get_next_word_models', 'next-word-model-dropdown');
populateModelDropdown('https://all-tell-skirt-gourmet.trycloudflare.com:443/get_complete_word_models', 'word-comp-model-dropdown');