import {
  ADD_NEW_MATCH,
  REMOVE_MATCH,
  INCREMENT,
  DECREMENT,
  RESET,
} from "./actionIdentifiers.js";

//action creators
const addMatch = () => {
  return {
    type: ADD_NEW_MATCH,
  };
};

const increment = (index, incrementValue) => {
  return {
    type: INCREMENT,
    payload: {
      index,
      incrementValue,
    },
  };
};

const decrement = (index, decrementValue) => {
  return {
    type: DECREMENT,
    payload: {
      index,
      decrementValue,
    },
  };
};

const removeMatch = (matchIndex) => {
  return {
    type: REMOVE_MATCH,
    payload: {
      index: matchIndex,
    },
  };
};

const reset = () => {
  return {
    type: RESET,
  };
};

export { addMatch, removeMatch, increment, decrement, reset };
