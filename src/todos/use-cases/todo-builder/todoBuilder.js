import { buildTodoHTML } from "../";

let element;

/**
 *
 * @param {string} elementName
 * @param {Todo} todo
 */
export const todoBuilder = (elementName, todos = []) => {
  if (!element) {
    element = document.body.querySelector(elementName);
  }

  if (!element) {
    throw new Error(`Element ${elementName} not found`);
  }

  element.innerHTML = "";

  todos.forEach((todo) => {
    element.append(buildTodoHTML(todo));
  });
};
