import {
  ADD_NEW_MATCH,
  REMOVE_MATCH,
  INCREMENT,
  DECREMENT,
  RESET,
} from "./actionIdentifiers.js";

//states
const initialState = {
  matchNo: 1,
  totals: [0],
};

//reducer
const reducer = function (state = initialState, action) {
  if (action.type === ADD_NEW_MATCH) {
    return {
      ...state,
      matchNo: state.matchNo + 1,
      totals: [...state.totals, 0],
    };
  }

  // increment total
  else if (action.type === INCREMENT) {
    return {
      ...state,
      totals: state.totals.map((val, index) => {
        if (index === action.payload.index) {
          const total = val + action.payload.incrementValue;
          return total < 0 ? 0 : total;
        } else return val;
      }),
    };
  }

  //decrement total
  else if (action.type === DECREMENT) {
    return {
      ...state,
      totals: state.totals.map((val, index) => {
        if (index === action.payload.index) {
          const total = val - action.payload.decrementValue;
          return total < 0 ? 0 : total;
        } else return val;
      }),
    };
  }

  // remove a match
  else if (action.type === REMOVE_MATCH) {
    return {
      ...state,
      matchNo: state.matchNo - 1,
      totals: state.totals.toSpliced(action.payload.index, 1),
    };
  }

  //reset all match
  else if (action.type === RESET) {
    return {
      ...state,
      totals: [...state.totals].fill(0),
    };
  }

  //default
  else return state;
};

//store
const store = Redux.createStore(reducer);

export default store;
