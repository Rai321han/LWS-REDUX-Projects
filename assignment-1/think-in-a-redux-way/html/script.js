import {
  addMatch,
  removeMatch,
  increment,
  decrement,
  reset,
} from "./actionCreators.js";
import store from "./store.js";

//selectors
const matchsContainer = document.querySelector(".all-matches");
const addMatchBtn = document.querySelector(".lws-addMatch");
const resetBtn = document.querySelector(".lws-reset");

const addNewMatch = function () {
  const matchState = store.getState();
  const matchNo = matchState.matchNo;

  const newMatch = `<div class="match">
  <div class="wrapper" >
    <button class="lws-delete">
      <img src="./image/delete.svg" alt="" class="delete-btn"/>
    </button>
    <h3 class="lws-matchName">Match ${matchNo}</h3>
  </div>
  <div class="inc-dec">
    <form class="incrementForm">
      <h4>Increment</h4>
      <input type="number" name="increment" class="lws-increment" />
    </form>
    <form class="decrementForm">
      <h4>Decrement</h4>
      <input type="number" name="decrement" class="lws-decrement" />
    </form>
  </div>
  <div class="numbers">
    <h2 class="lws-singleResult">0</h2>
  </div>
</div>`;
  matchsContainer.insertAdjacentHTML("beforeend", newMatch);
};

// UI update
const updateTotal = function () {
  const state = store.getState();
  const totals = document.querySelectorAll(".lws-singleResult");
  totals.forEach((total, index) => {
    total.innerHTML = `${state.totals[index]}`;
  });
};

const updateMatchNumbers = function () {
  const allMatches = document.querySelectorAll(".match");
  let count = 1;
  allMatches.forEach((match) => {
    match.querySelector(".lws-matchName").innerHTML = `MATCH ${count++}`;
  });
};

updateTotal(); // initial UI update

// render when state updates
store.subscribe(updateTotal);
store.subscribe(updateMatchNumbers);

// ----------EVENT HANDLERS------------
// function to run when submitting the form
const handleIncrementSubmit = (match, index, e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    let incrementValue = Number(match.querySelector(".lws-increment").value);
    store.dispatch(increment(index, incrementValue));
  }
};

const handleDecrementSubmit = (match, index, e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    let decrementValue = Number(match.querySelector(".lws-decrement").value);
    store.dispatch(decrement(index, decrementValue));
  }
};

// deleting a match
const handleDeleteMatch = function (match, index, e) {
  if (!e.target.classList.contains("delete-btn")) return;
  match.remove();
  store.dispatch(removeMatch(index));
};

// reseting matches
const handleResetMatches = () => {
  const incrementInput = document.querySelectorAll(".lws-increment");
  const decrementInput = document.querySelectorAll(".lws-decrement");

  incrementInput.forEach((input) => {
    input.value = "";
  });

  decrementInput.forEach((input) => {
    input.value = "";
  });
  store.dispatch(reset());
};

// ----------------ADDING EVENT LISTENERS---------------------
// adding a new match
addMatchBtn.addEventListener("click", () => {
  store.dispatch(addMatch());
  addNewMatch();
});

// Event delegation to handle form submission
matchsContainer.addEventListener("keydown", (e) => {
  const match = e.target.closest(".match");
  if (match && e.target.classList.contains("lws-increment")) {
    const index = Array.from(matchsContainer.children).indexOf(match);
    handleIncrementSubmit(match, index, e);
  } else if (match && e.target.classList.contains("lws-decrement")) {
    const index = Array.from(matchsContainer.children).indexOf(match);
    handleDecrementSubmit(match, index, e);
  } else return;
});

matchsContainer.addEventListener("click", (e) => {
  const match = e.target.closest(".match");
  if (match) {
    const index = Array.from(matchsContainer.children).indexOf(match);
    handleDeleteMatch(match, index, e);
  }
});

resetBtn.addEventListener("click", handleResetMatches);
