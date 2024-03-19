import React, { useState } from 'react';
import './NumberDisplay.css';
import Input from '../components/Input';

export default function NumberDisplay({
  style,
  errorMessage = '',
  type = 'seconds',
  displayedTxt = null,
  action,
}) {
  const [isClicked, setClicked] = useState(true);
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      action(e);
      changeAppearance();
    }
  };
  const changeAppearance = () => {
    setClicked((change) => !change);
  };
  return (
    <div className="number-container">
      {isClicked === true ? (
        <div className="number-display" onClick={changeAppearance}>
          {displayedTxt}
        </div>
      ) : (
        <Input
          type="number"
          keydown={handleKeyDown}
          errorMessage={errorMessage}
        />
      )}
    </div>
  );
}
