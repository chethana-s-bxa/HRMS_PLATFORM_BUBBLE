import React, { useState, useRef, useEffect } from 'react';
import { filterCities } from '../../constants/countriesData';

const CityAutocomplete = ({
  country = '',
  state = '',
  value = '',
  onChange,
  onBlur,
  placeholder = 'Select city',
  disabled = false,
  className = '',
}) => {
  const [input, setInput] = useState(value);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Update input when value prop changes
  useEffect(() => {
    setInput(value);
  }, [value]);

  // Reset when country changes
  useEffect(() => {
    setInput('');
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedIndex(-1);
  }, [country]);

  // Update suggestions when state changes
  useEffect(() => {
    if (!country || !state || !input.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = filterCities(country, state, input);
    setSuggestions(filtered);
    if (input.trim()) {
      setShowSuggestions(true);
    }
  }, [country, state]);

  const handleInputChange = (e) => {
    const text = e.target.value;
    setInput(text);
    setSelectedIndex(-1);

    if (!country || !state) {
      setSuggestions([]);
      setShowSuggestions(false);
      onChange({
        target: { name: 'city', value: text },
      });
      return;
    }

    if (text.trim()) {
      const filtered = filterCities(country, state, text);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }

    // Call parent onChange
    onChange({
      target: { name: 'city', value: text },
    });
  };

  const handleSelectSuggestion = (suggestion) => {
    setInput(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedIndex(-1);

    onChange({
      target: { name: 'city', value: suggestion },
    });
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSelectSuggestion(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
      default:
        break;
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll into view for selected index
  useEffect(() => {
    if (selectedIndex >= 0 && suggestionsRef.current) {
      const items = suggestionsRef.current.querySelectorAll('div[role="option"]');
      if (items[selectedIndex]) {
        items[selectedIndex].scrollIntoView({
          block: 'nearest',
        });
      }
    }
  }, [selectedIndex]);

  return (
    <div className="position-relative">
      <input
        ref={inputRef}
        type="text"
        className={`form-control ${className} ${!state ? 'opacity-50' : ''}`}
        placeholder={placeholder}
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => state && input.trim() && suggestions.length > 0 && setShowSuggestions(true)}
        onBlur={onBlur}
        disabled={disabled || !state}
        autoComplete="off"
      />
      {!state && (
        <small className="text-muted d-block mt-1">
          Please select a state first
        </small>
      )}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="position-absolute top-100 start-0 end-0 bg-white border border-secondary rounded mt-1 shadow-sm"
          style={{
            maxHeight: '200px',
            overflowY: 'auto',
            zIndex: 1000,
          }}
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion}
              role="option"
              onClick={() => handleSelectSuggestion(suggestion)}
              className={`ps-3 pe-3 py-2 cursor-pointer ${
                index === selectedIndex ? 'bg-light' : 'bg-white'
              }`}
              style={{
                backgroundColor: index === selectedIndex ? '#e9ecef' : 'white',
                cursor: 'pointer',
              }}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CityAutocomplete;
