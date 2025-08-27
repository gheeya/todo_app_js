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
});
