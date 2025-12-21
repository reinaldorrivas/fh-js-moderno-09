import todoStore, { Filters } from "../store/todo.store";
import html from "./app.html?raw";
import { todoBuilder } from "./use-cases";

const ElementNames = {
  TodoList: ".todo-list",
  NewTodoInput: "#new-todo-input",
  ClearCompleted: ".clear-completed",
  FiltersList: ".filters",
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
  const clearCompletedBtn = document.querySelector(ElementNames.ClearCompleted);
  const filtersUL = document.querySelector(ElementNames.FiltersList);

  // listeners
  newDescriptionInput.addEventListener("keyup", (event) => {
    if (event.keyCode !== 13 || !event.target.value.trim()) return;

    todoStore.addTodo(event.target.value);
    renderTodos();
    event.target.value = "";
  });

  todoListUL.addEventListener("click", (event) => {
    const parentElement = event.target.closest("[data-id]");

    switch (event.target.className) {
      case "toggle":
        todoStore.toggleTodo(parentElement.dataset.id);
        break;

      case "destroy":
        todoStore.deleteTodo(parentElement.dataset.id);
        break;
    }

    renderTodos();
  });

  filtersUL.addEventListener("click", (event) => {
    const selectedElement = event.target.getAttribute("href");
    const ulChildrenElements = filtersUL.querySelectorAll(".filtro");

    ulChildrenElements.forEach((ulChildElement) => {
      const hrefToCompare = ulChildElement.getAttribute("href");

      if (selectedElement === hrefToCompare) {
        ulChildElement.classList.add("selected");
      } else {
        ulChildElement.classList.remove("selected");
      }
    });

    switch (selectedElement) {
      case "#/":
        todoStore.setFilter(Filters.All);
        break;

      case "#/active":
        todoStore.setFilter(Filters.Pending);
        break;

      case "#/completed":
        todoStore.setFilter(Filters.Completed);
        break;
    }

    renderTodos();
  });

  clearCompletedBtn.addEventListener("click", () => {
    todoStore.deleteCompleted();

    renderTodos();
  });
};
