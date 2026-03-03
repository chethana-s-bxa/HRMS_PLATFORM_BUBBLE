import React, { useState, useRef, useEffect } from 'react';
import { getAllCountries, filterCountries } from '../../constants/countriesData';

const CountryDropdown = ({
  value = '',
  onChange,
  placeholder = 'Select country',
  disabled = false,
  className = '',
}) => {
  const [input, setInput] = useState(value);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    setInput(value);
  }, [value]);

  const handleInputChange = (e) => {
    const text = e.target.value;
    setInput(text);
    setSelectedIndex(-1);

    if (text.trim()) {
      const filtered = filterCountries(text);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }

    onChange({
      target: { name: 'country', value: text },
    });
  };

  const handleSelectSuggestion = (suggestion) => {
    setInput(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedIndex(-1);

    onChange({
      target: { name: 'country', value: suggestion },
    });
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const countries = getAllCountries();
        setSuggestions(countries);
        setShowSuggestions(true);
        setSelectedIndex(0);
      }
      return;
    }

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
        className={`form-control ${className}`}
        placeholder={placeholder}
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (!input.trim()) {
            const countries = getAllCountries();
            setSuggestions(countries);
            setShowSuggestions(true);
          } else if (suggestions.length > 0) {
            setShowSuggestions(true);
          }
        }}
        disabled={disabled}
        autoComplete="off"
      />
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
              className={`ps-3 pe-3 py-2 cursor-pointer`}
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

export default CountryDropdown;
