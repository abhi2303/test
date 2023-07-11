import React, { useState } from 'react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    // Make the GET request to fetch suggestions from the API
    fetchSuggestions(newSearchTerm);
  };

  const fetchSuggestions = (term) => {
    if (term.length > 0) {
      fetch(`http://localhost:8080/api/entity/${term}`)
        .then((response) => response.json())
        .then((data) => setSuggestions(data));
    } else {
      setSuggestions([]);
    }
  };

  const handleOptionSelect = (option) => {
    // Add the selected option to the array of selected options
    setSelectedOptions([...selectedOptions, option]);

    // Clear the search term and suggestions
    setSearchTerm('');
    setSuggestions([]);
  };

  const handleOptionRemove = (option) => {
    // Remove the selected option from the array of selected options
    const updatedOptions = selectedOptions.filter((item) => item !== option);
    setSelectedOptions(updatedOptions);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      <ul>
        {suggestions.map((option) => (
          <li key={option.id} onClick={() => handleOptionSelect(option)}>
            {option.name}
          </li>
        ))}
      </ul>
      <div>
        {selectedOptions.map((option) => (
          <span key={option.id}>
            {option.name}
            <button onClick={() => handleOptionRemove(option)}>X</button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
