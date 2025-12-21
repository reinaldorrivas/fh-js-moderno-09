import todoStore, { Filters } from "../../../store/todo.store";

let element;

/**
 *
 * @param {string} elementName
 */
export const renderPendings = (elementName) => {
  if (!element) {
    element = document.body.querySelector(elementName);
  }

  if (!element) {
    throw new Error(`Element ${elementName} not found`);
  }

  element.innerHTML = todoStore.getTodos(Filters.Pending).length;
};
