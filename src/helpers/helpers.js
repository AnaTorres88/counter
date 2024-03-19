export const secondsError = {
  exceeds:
    'Quantity exceeds the number of seconds in a minute!. Enter a valid time',
  less: "Quantity shouldn't be negative or empty. Enter a valid time",
};

export const minutesError = {
  exceeds:
    'Quantity exceeds the number of minuts in an hour!. Enter a valid time',
  less: "Quantity shouldn't be negative or empty. Enter a valid time",
};
export const roundsError = {
  less: "Quantity shouldn't be negative or empty. Enter a valid time",
};
export function handleInputs(type, value, setMins = '', setSecs = '') {
  if (type === 'seconds') {
    if (value === 60) {
      setMins(1);
      setSecs(0);
    } else {
      setSecs(value);
    }
  } else {
    if (value === 60) {
      setMins(1);
      setSecs(0);
    } else {
      setMins(value);
    }
  }
}

export function handleRounds(value, setRoundCount) {
  setRoundCount({ roundsSetted: value, rounds: 0 });
}
export function setRoundsToZero(setRoundCount) {
  setRoundCount((prevRoundState) => {
    return {
      ...prevRoundState,
      rounds: 0,
    };
  });
}
export function incrementRound(setRoundCount, roundCount) {
  if (roundCount.roundsSetted === 0) {
    setRoundsToZero(setRoundCount);
  } else {
    setRoundCount((prevRoundState) => {
      return {
        ...prevRoundState,
        rounds: prevRoundState.rounds + 1,
      };
    });
  }
}
