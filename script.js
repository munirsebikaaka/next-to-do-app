"use strict";
const newTask = document.querySelector(".task");
const compTask = document.querySelector(".inner-cell");
const inputToDo = document.getElementById("type-input");
const addBtn = document.querySelector(".todobtn");

//create input arrays
const newTodos = ["go", "come", "write", "why"];
const completed = ["what", "impos", "run", "gym"];
const cancelled = ["fool", "fight", "tsap", "guy"];
//check if input.value, create function that add input.value to new todos
addBtn.addEventListener("click", () => {
  if (inputToDo.value) {
    newTodos.push(inputToDo.value);
    console.log(newTodos);
  } else {
    console.log("false");
  }
});
newTask.innerHTML = "";
const newToDosElments = (arr) => {
  arr.forEach((el) => {
    const htmlCode = `
    <div class="inner-cell">
${el}
    <div>
      <button class="check-tick">
      <ion-icon name="checkmark-outline"></ion-icon>
        </button>
      <button class="check">
      <ion-icon name="close-outline"></ion-icon>
        </button>
        </div>
      </div>`;
    newTask.insertAdjacentHTML("afterbegin", htmlCode);
  });
};
newToDosElments(newTodos);
const addToComlete = () => {
  if ([...newTodos]) {
    for (let i = 0; i < newTodos.length; i++) {
      completed.push(newTodos[i]);
      newTodos.pop(newTodos[i]);
      console.log(completed);
    }
  }
};
addToComlete();
const addToCancelled = () => {
  if ([...completed]) {
    for (let i = 0; i < completed.length; i++) {
      cancelled.push(completed[i]);
      completed.pop(completed[i]);
      console.log(cancelled);
    }
  }
};
addToCancelled();

//check which button is clicked, if tic button is clicked add new todo to the complete else to the cancelled
//in the complete if any btn is clicked and complete to the cancelled
//in the cancelled if tic is clicked add to the new todos else delete the todo
