import React, { createContext, useState, useEffect } from 'react';
import SpeechRecognitionSupport from './speechRecognition.js';
import SessionStorage from './helpers/sessionStorage.js';
import {
  secondsError,
  minutesError,
  handleInputs,
  handleRounds,
  incrementRound,
  setRoundsToZero,
  roundsError,
} from './helpers/helpers.js';
const support = new SpeechRecognitionSupport();
const SpeechClass = support.getSpeechRecognition();

import Button from './components/Button';
import NumberDisplay from './components/NumberDisplay';
import './App.css';
import './style.css';
import Header from './components/Header.jsx';
const sessionStorage = new SessionStorage();
export default function App() {
  const [roundCount, setRoundCount] = useState({
    roundSetted: 0,
    rounds: 0,
  }); // Object rounds counter vs round limit
  const [secs, setSecs] = useState(0);
  const [mins, setMins] = useState(0);
  const [isRunning, setIsRunning] = useState(null);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        if (mins == 0 && secs === 0) {
          incrementRound(setRoundCount, roundCount);
          changeRound();
        }
        if (mins > 0 && secs === 0) {
          setMins((min) => min - 1);
          setSecs(59);
        }
        if (secs > 0 && secs < 60) {
          setSecs((secs) => secs - 1);
        }
      }, 1000);
    } else if (secs === 0) {
      reset();
    }
    return () => clearInterval(interval);
  }, [isRunning, secs, mins, roundCount.rounds]);

  const inputSeconds = (e) => {
    let val = parseInt(e.target.value);
    handleInputs('seconds', val, setMins, setSecs);
  };

  const inputMins = (e) => {
    let val = parseInt(e.target.value);
    handleInputs('minutes', val, setMins, setSecs);
  };
  const inputRounds = (e) => {
    let val = parseInt(e.target.value);
    handleRounds(val, setRoundCount);
  };

  const start = () => {
    if (secs > 0 || mins > 0) {
      setMyWorkout();
      setIsRunning(true);
    } else {
      window.alert('Please, set the time');
    }
  };

  const setMyWorkout = () => {
    const workoutInfo = JSON.stringify({
      setRoundCount,
      mins,
      secs,
    });
    sessionStorage.setStorage('myWorkout', workoutInfo);
  };

  const stop = () => {
    setIsRunning(false);
  };

  const changeRound = () => {
    const resetRound = sessionStorage.getStorage('myWorkout');
    console.log(roundCount.rounds, roundCount.roundsSetted);
    if (roundCount.rounds === roundCount.roundsSetted) {
      reset();
      setIsRunning(false);
    } else {
      setSecs(resetRound.secs);
      setMins(resetRound.mins);
    }
  };

  const reset = () => {
    sessionStorage.deleteStorage('myWorkout');
    setIsRunning(false);
    setSecs(0);
    setMins(0);
    setRoundsToZero(setRoundCount);
  };

  return (
    <main className="app-container p-4">
      <Header
        displayedTxt={roundCount.rounds}
        action={inputRounds}
        errorMessage={roundsError}
      />{' '}
      <div className="display-container flex justify-center items-center">
        <NumberDisplay
          displayedTxt={mins}
          action={inputMins}
          errorMessage={minutesError}
        />
        :
        <NumberDisplay
          displayedTxt={secs}
          action={inputSeconds}
          errorMessage={secondsError}
        />
      </div>
      <footer id="button-container" className="flex justify-center items-center my-4 space-x-4">
        
      <div className="w-1/5">
        <Button style="stop" text="stop" onclick={stop} />

      </div>  
      <div className="w-1/5">
        <Button text="start" onclick={start} />

      </div>  
      <div className="w-1/5">
        <Button text="reset" onclick={reset} />
      </div>  
      </footer>
    </main>
  );
}
