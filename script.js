'use strict';
const newTask = document.querySelector('.task');
const compTask = document.querySelector('.inner-cell');
const inputToDo = document.getElementById('type-input');
const addBtn = document.querySelector('.todobtn');

//create input arrays
const newTodos = ['go', 'come', 'write', 'why'];
const completed = ['what', 'impos', 'run', 'gym'];
const cancelled = ['fool', 'fight', 'tsap', 'guy'];
//check if input.value, create function that add input.value to new todos
// addBtn.addEventListener('click', () => {
//   if (inputToDo.value) {
//     newTodos.push(inputToDo.value);
//     console.log(newTodos);
//   } else {
//     console.log('false');
//   }
// });

newTask.innerHTML = '';
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
    newTask.insertAdjacentHTML('afterbegin', htmlCode);
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

const TODOs = {
  NEW: 'newToDo',
  COMPLETED: 'completedToDo',
  CANCELLED: 'cancelledToDo',
};

const newTodoBtn = document.getElementById('newTodoBtn');
const newTodosIdUl = document.getElementById(TODOs.NEW);
const completedIdUl = document.getElementById(TODOs.COMPLETED);
const cancelledIdUl = document.getElementById(TODOs.CANCELLED);

const todos = {
  newTodos: [],
  completed: [],
  cancelled: [],
};

console.log('newTodosIdUl', newTodosIdUl.innerHTML);

document.getElementById('inputWrapper').innerHTML = `
<form id="newTodoForm" class='todo-form'">
<input type="text" class='type-input' id="toInput"  placeholder="Add to do" />
<button class="todobtn" id="newTodoBtn" type="submit">Add</button>
</form>
`;

function onSubmitHandler(e) {
  e.preventDefault();
  const todoInput = document.getElementById('toInput');
  const todo = todoInput.value;
  if (todos.newTodos.length < 1) {
    document.getElementById('notodowrapper-new').style.display = 'none';
  }
  const index = todos.newTodos.indexOf(todo);
  if (index !== -1) {
    alert('Todo already exist');
    return;
  }
  todos.newTodos.push(todo);
  newTodosIdUl.innerHTML += `
  <li class="list-item">
                <div class="list-item-title">${todo}</div>
                <div class="list-item-actions">
                  <button class="btn btn-1" onClick="onCompleteHandler('${todo}', '${TODOs.NEW}')">
                    <ion-icon name="checkmark-outline"></ion-icon>
                  </button>
                  <button class="btn btn-2" onClick="onCancelHandler('${todo}', '${TODOs.NEW}')">
                    <ion-icon name="close-outline"></ion-icon>
                  </button>
                </div>
    </li>
  `;
  todoInput.value = '';
}

document.getElementById('newTodoForm').addEventListener('submit', onSubmitHandler);

function updateDomWithNewArray(todoArray, ul) {
  const ulElement = document.getElementById(ul);
  ulElement.innerHTML = '';
  todoArray.forEach((todo) => {
    ulElement.innerHTML += `
    <li class="list-item">
                <div class="list-item-title">${todo}</div>
                <div class="list-item-actions">
                  <button class="btn btn-1" onClick="onCompleteHandler('${todo}', '${ul}')">
                    <ion-icon name="checkmark-outline"></ion-icon>
                  </button>
                  <button class="btn btn-2" onClick="onCancelHandler('${todo}', '${ul}')">
                    <ion-icon name="close-outline"></ion-icon>
                  </button>
                </div>
    </li>
    `;
  });
}

function onCompleteHandler(todo, section) {
  if (section === TODOs.NEW) {
    const index = todos.newTodos.indexOf(todo);
    todos.newTodos.splice(index, 1);
    updateDomWithNewArray(todos.newTodos, TODOs.NEW);
    if (todos.newTodos.length < 1) {
      document.getElementById(TODOs.NEW).innerHTML =
        '<li class="notodo-wrapper" id="notodowrapper-new">No Todos Available</li>';
    }
    todos.completed.push(todo);
    updateDomWithNewArray(todos.completed, TODOs.COMPLETED);
  } else if (section === TODOs.COMPLETED) {
    const index = todos.completed.indexOf(todo);
    todos.completed.splice(index, 1);
    updateDomWithNewArray(todos.completed, TODOs.COMPLETED);
    if (todos.completed.length < 1) {
      document.getElementById(TODOs.COMPLETED).innerHTML =
        '<li class="notodo-wrapper" id="notodowrapper-completed">No Todos Available</li>';
    }
    todos.cancelled.push(todo);
    updateDomWithNewArray(todos.cancelled, TODOs.CANCELLED);
  } else if (section === TODOs.CANCELLED) {
    const index = todos.cancelled.indexOf(todo);
    todos.cancelled.splice(index, 1);
    updateDomWithNewArray(todos.cancelled, TODOs.CANCELLED);
    if (todos.completed.length < 1) {
      document.getElementById(TODOs.CANCELLED).innerHTML =
        '<li class="notodo-wrapper" id="notodowrapper-cancelled">No Todos Available</li>';
    }
    todos.newTodos.push(todo);
    updateDomWithNewArray(todos.newTodos, TODOs.NEW);
  }
}
function onCancelHandler(todo, section) {
  if (section === TODOs.NEW) {
    const index = todos.newTodos.indexOf(todo);
    todos.newTodos.splice(index, 1);
    updateDomWithNewArray(todos.newTodos, TODOs.NEW);
    todos.cancelled.push(todo);
    updateDomWithNewArray(todos.cancelled, TODOs.CANCELLED);
  } else if (section === TODOs.COMPLETED) {
    const index = todos.completed.indexOf(todo);
    todos.completed.splice(index, 1);
    updateDomWithNewArray(todos.completed, TODOs.COMPLETED);
    todos.cancelled.push(todo);
    updateDomWithNewArray(todos.cancelled, TODOs.CANCELLED);
  } else if (section === TODOs.CANCELLED) {
    const index = todos.cancelled.indexOf(todo);
    todos.cancelled.splice(index, 1);
    updateDomWithNewArray(todos.cancelled, TODOs.CANCELLED);
  }
}
