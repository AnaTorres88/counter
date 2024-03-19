import React from 'react';
import './Button.css';
export default function Button({ text, onclick, style = 'timer-btn' }) {
  return (
    <>
      <button className={`btn ${style}`} onClick={onclick}>
        {text}
      </button>
    </>
  );
}
