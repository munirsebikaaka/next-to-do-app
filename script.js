"use strict";
const tS = document.querySelector(".task");
const inputToDo = document.getElementById("type-input");
const inputTransferTo = document.querySelector(".form__input--to");
const addBtn = document.querySelector(".todobtn");
const str = inputToDo.value;
addBtn.addEventListener("click", () => {
  if (!str) {
    console.log("please add");
  } else {
    console.log(str);
  }
});

//create input arrays
const newTodos = ["go", "come", "write", "why"];
const completed = ["what", "impos", "run", "gym"];
const cancelled = ["fool", "fight", "tsap", "guy"];
if (cancelled[0] === inputTransferTo.value) {
  newTodos.push(cancelled[0]);
}
//check if input.value, create function that add input.value to new todos
tS.innerHTML = "";
const newToDosElments = () => {
  newTodos.forEach((el) => {
    const htmlCode = `
    <p class="inner-cell">
     ${el}
      <button class="main-btn">
        <span class="check-tick">TIC</span>
        <button class="check">EX</button>
      </button>
    </p>`;
    tS.insertAdjacentHTML("afterbegin", htmlCode);
  });
};
newToDosElments();

//check which button is clicked, if tic button is clicked add new todo to the complete else to the cancelled
//in the complete if any btn is clicked and complete to the cancelled
//in the cancelled if tic is clicked add to the new todos else delete the todo
