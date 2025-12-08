import todoStore from "../store/todo.store";
import html from "./app.html?raw";
import { todoBuilder } from "./models/use-cases";

const ElementNames = {
  TodoList: ".todo-list",
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
};
