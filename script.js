/**
 * {
 *      id:,
 *      todo:,
 *      active:true/false
 * }
 */
let todos = [];

const todoForm = document.querySelector("form");
const todoInput = document.querySelector(".todo-input");
const todoContainer = document.querySelector(".todo-container");

// Create Todo Element
function createTodo({ id, todo, active }) {
  const todoEle = document.createElement("div");
  const tForm = document.createElement("form");
  const tInputContainer = document.createElement("div");
  const tBtnContainer = document.createElement("div");
  const tCheckInput = document.createElement("input");
  const tInput = document.createElement("input");
  const editBtn = document.createElement("span");
  const deleteBtn = document.createElement("span");
  editBtn.innerHTML = "&#128393;";
  deleteBtn.innerHTML = "&#128465;";
  editBtn.classList.add("edit-btn");
  deleteBtn.classList.add("delete-btn");
  tCheckInput.setAttribute("type", "checkbox");
  tInput.readOnly = true;
  todoEle.appendChild(tForm);
  tForm.appendChild(tInputContainer);
  tForm.appendChild(tBtnContainer);
  tInputContainer.appendChild(tCheckInput);
  tInputContainer.appendChild(tInput);
  tBtnContainer.appendChild(editBtn);
  tBtnContainer.appendChild(deleteBtn);
  tInputContainer.classList.add("container");
  tBtnContainer.classList.add("btn-container");
  todoEle.classList.add("todo-element");
  tForm.classList.add("t-form");
  tInput.classList.add("t-input");
  tCheckInput.classList.add("t-input-checkbox");
  tCheckInput.setAttribute("name", "input-checkbox");
  tInput.setAttribute("name", "input-todo");
  todoEle.dataset.key = id;
  todoEle.dataset.status = active;
  tInput.value = todo;
  todoContainer.appendChild(todoEle);
}

function removeTodo(id) {
  const todoArr = [...document.querySelectorAll(".todo-element")];
  todoArr.forEach((todo) => {
    if (todo.dataset.key === id) {
      todoContainer.removeChild(todo);
    }
  });
}

function updateTodo(id, body) {
  const todoArr = [...document.querySelectorAll(".todo-element")];
  todoArr.forEach((todo) => {
    if (todo.dataset.key === id) {
      const tInput = todo.querySelector(".t-input");
      tInput.value = body;
    }
  });
}

// Add functionality
function addTodo(value) {
  const todo = {
    id: String(Date.now()).slice(1),
    todo: value,
    active: true,
  };
  createTodo(todo);
  todos.push(todo);
}

// Delete Funtionality
function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  removeTodo(id);
}

// Edit Functionality
function editTodo(id, body) {
  todos = todos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, todo: body };
    }
    return todo;
  });
  updateTodo(id, body);
}

// Event Listener
todoForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  todoInput.value && addTodo(todoInput.value);
  todoInput.value = "";
  todoInput.blur();
});

todoContainer.addEventListener("click", function (evt) {
  const todo = evt.target.closest(".todo-element");
  if (evt.target.classList.contains("delete-btn")) {
    deleteTodo(todo.dataset.key);
  }
  if (evt.target.classList.contains("edit-btn")) {
    const tInput = todo.querySelector(".t-input");
    const tCheckInput = todo.querySelector(".t-input-checkbox");
    tCheckInput.disabled = !tCheckInput.disabled;
    tInput.readOnly = !tInput.readOnly;
    tInput.classList.toggle("active");
  }
});

todoContainer.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const todo = evt.target.closest(".todo-element");
  const tInput = todo.querySelector(".t-input");
  const tCheckInput = todo.querySelector(".t-input-checkbox");

  const formData = new FormData(evt.target);
  const data = [];
  for (let value of formData) {
    data.push(value);
  }
  editTodo(todo.dataset.key, data[0][1]);
  tInput.readOnly = !tInput.readOnly;
  tCheckInput.disabled = !tCheckInput.disabled;
  tInput.classList.toggle("active");
  tInput.blur();
});
