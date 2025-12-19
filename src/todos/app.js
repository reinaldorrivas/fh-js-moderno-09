import todoStore from "../store/todo.store";
import html from "./app.html?raw";
import { todoBuilder } from "./use-cases";

const ElementNames = {
  TodoList: ".todo-list",
  NewTodoInput: "#new-todo-input",
};

/**
 *
 * @param {string} elementId
 */
export const App = (elementId) => {
  const renderTodos = () => {
    const todos = todoStore.getTodos(todoStore.getCurrentFilter());

    todoBuilder(ElementNames.TodoList, todos);
  };

  (() => {
    const app = document.body.querySelector(elementId);
    app.innerHTML = html;

    renderTodos();
  })();

  // HTML References
  const newDescriptionInput = document.querySelector(ElementNames.NewTodoInput);
  const todoListUL = document.querySelector(ElementNames.TodoList);

  // listeners
  newDescriptionInput.addEventListener("keyup", (event) => {
    if (event.keyCode !== 13 || !event.target.value.trim()) return;

    todoStore.addTodo(event.target.value);
    renderTodos();
    event.target.value = "";
  });

  todoListUL.addEventListener("click", (event) => {
    const parentElement = event.target.closest("[data-id]");

    if (event.target.className === "toogle") {
      todoStore.toggleTodo(parentElement.dataset.id);
    }

    if (event.target.className === "destroy") {
      todoStore.deleteTodo(parentElement.dataset.id);
    }

    renderTodos();
  });
};
