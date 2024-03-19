import React, { useState } from 'react';
import './Input.css';
export default function Input({ errorMessage, placeholder = '', keydown }) {
  const [showError, setShowError] = useState(false);
  const [errorType, setErrorType] = useState(null);
  const validateInput = (e) => {
    if (e.key === 'Enter') {
      const value = parseInt(e.target.value);
      console.log(e);
      if (value > 60) {
        setShowError(true);
        setErrorType('exceeds');
      } else if (value < 0 || value === NaN) {
        setShowError(true);
        setErrorType('less');
      } else {
        setShowError(false);
        keydown(e);
      }
    }
  };

  const showTypeError = () => {
    if (showError) {
      return <span className="input-error">{errorMessage[errorType]}</span>;
    }
  };
  return (
    <>
      {showTypeError()}
      <input
        class="number-input"
        type="number"
        placeholder={placeholder}
        onKeyDown={validateInput}
      />
    </>
  );
}
