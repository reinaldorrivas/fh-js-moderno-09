import { buildTodoHTML } from "../";

/**
 *
 * @param {string} elementName
 * @param {Todo} todo
 */
export const todoBuilder = (elementName, todos = []) => {
  // TODO: Referencia
  const element = document.body.querySelector(elementName);

  todos.forEach((todo) => {
    element.append(buildTodoHTML(todo));
  });
};
