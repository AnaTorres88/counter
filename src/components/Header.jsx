import React, { useState } from 'react';
import "./Header.css";
import NumberDisplay from './NumberDisplay';
import { roundsError } from '../helpers/helpers.js';
export default function Header({
  title = '',
  errorMessage = '',
  type = 'rounds',
  displayedTxt = null,
  action,
}) {
  const [rounds, setRounds] = useState(0);
  function test(e) {
    const value = e.target.value;
    setRounds(value);
    action(e);
  }
  return (
    <header class="container p-1 m-15 mx-auto">
        <h2 className="text-3xl font-bold text-center font-sans uppercase">Round:</h2>
        <div className="rounds-display flex justify-center items-center">
          <NumberDisplay
            className="w-1/2"
            displayedTxt={displayedTxt}
            action={test}
            errorMessage={roundsError}
          />
          <div className="text-center tracking-wide">
            /{rounds}
          </div>
        </div>
    </header>
  );
}
