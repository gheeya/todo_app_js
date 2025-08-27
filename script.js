/**
 * {
 *      id:,
 *      todo:,
 *      active:true/false
 * }
 */
const todos = [];

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
  tCheckInput.setAttribute("type", "checkbox");
  tInput.readOnly = true;
  todoEle.appendChild(tForm);
  tForm.appendChild(tInputContainer);
  tForm.appendChild(tBtnContainer);
  tInputContainer.appendChild(tCheckInput);
  tInputContainer.appendChild(tInput);
  tInputContainer.classList.add("container");
  tBtnContainer.classList.add("container");
  todoEle.classList.add("todo-element");
  tForm.classList.add("t-form");
  tInput.classList.add("t-input");
  todoEle.dataset.key = id;
  todoEle.dataset.status = active;
  tInput.value = todo;
  todoContainer.appendChild(todoEle);
}

// Add functionality
function addTodo(value) {
  const todo = {
    id: String(new Date()).slice(1),
    todo: value,
    active: true,
  };
  createTodo(todo);
  todos.push(todo);
}

// Event Listener
todoForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  todoInput.value && addTodo(todoInput.value);
  todoInput.value = "";
});
